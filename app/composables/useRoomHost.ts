const HOST: Person = { id: 'host', name: 'Sefa', role: 'host', mic: false, hand: false }

// Why the Worker closed my socket, in a sentence.
const closings: Record<number, string> = {
  [CloseCode.unauthorized]: 'Wrong password. The room is still closed.',
  [CloseCode.replaced]: 'You opened the room in another tab, so this one let go of it.',
}

// Kept in this browser once the room opens with it, so the form comes filled next time.
const SAVED = 'room-password'

// Closing this tab closes the room, so the browser asks first.
const warn = (event: BeforeUnloadEvent) => event.preventDefault()

// The room, run from my browser. `room` is the one source of truth: the page renders it, every
// guest gets a copy whenever it changes, and the mixer and the shared screen follow it.
export const useRoomHost = () => {
  const room = reactive<RoomState>({ people: [], talking: [], sharing: {} })
  const closedWith = ref('The room is closed.')
  const password = ref<string>()
  const calls = new Map<string, ReturnType<typeof createCall>>()
  let socket: ReturnType<typeof connectRoom> | undefined
  let mixer: ReturnType<typeof createMixer> | undefined
  let listening: ReturnType<typeof setInterval> | undefined
  let iceServers: IceServer[] = []

  const isOpen = computed(() => room.people.length > 0)
  const find = (id: string) => room.people.find(person => person.id === id)
  // I am in the room like everyone else: my asks are decided right here, my voice and tab go to the
  // desk, and a speaker's screen comes in on their call.
  const member = useRoomMember(
    () => room,
    () => HOST.id,
    request => grant(HOST.id, request),
    (out, track) => out !== 'screen' && mixer?.feed(HOST.id, out === 'voice' ? 'voice' : 'tab', track),
    holder => calls.get(holder)?.received('screen'),
  )
  const title = computed(() => isOpen.value
    ? `Room (${room.people.length})${room.people.some(person => person.hand) ? ' · Hand raised' : ''}`
    : `Room host — ${SITE_NAME}`)

  watch(room, () => {
    const copy = JSON.stringify(room)
    for (const { channel } of calls.values()) if (channel.readyState === 'open') channel.send(copy)
  }, { deep: true })
  // A voice is heard while on stage, a tab while it is the room's one shared audio.
  watchEffect(() => room.people.forEach((person) => {
    mixer?.allow(person.id, 'voice', person.role !== 'listener')
    mixer?.allow(person.id, 'tab', room.sharing.audio === person.id)
  }))
  // Every guest gets the room's screen, except whoever shares it. Passing a speaker's screen on means
  // encoding it again here, so keep its text sharp as theirs was.
  watch(member.screen, (track) => {
    if (track) track.contentHint = 'detail'
    for (const [id, call] of calls) call.send('screen', id === room.sharing.screen ? null : track)
  })

  const open = (typed: string) => {
    if (socket) return
    password.value = typed
    mixer = createMixer(HOST.id)
    socket = connectRoom({ type: 'open', password: typed }, receive, (code) => {
      close(closings[code] ?? 'Your connection dropped, so the room closed.')
      if (code !== CloseCode.unauthorized) return
      password.value = undefined
      localStorage.removeItem(SAVED)
    })
  }

  const receive = (message: FromRoom) => {
    if (message.type === 'opened') {
      iceServers = message.iceServers
      room.people = [{ ...HOST }]
      listening = setInterval(listen, 150)
      addEventListener('beforeunload', warn)
      localStorage.setItem(SAVED, password.value!)
    }
    // One call per guest. An offer this browser can't take gets its sender sent out, not left on the list.
    if (message.type === 'offer' && !calls.has(message.id)) welcome(message).catch(() => remove(message.id))
    if (message.type === 'left') drop(message.id)
  }

  const welcome = async ({ id, name, sdp }: Extract<FromRoom, { type: 'offer' }>) => {
    // Their voice and shared tab go to the desk; their screen, if they share one, is passed on.
    const call = createCall(iceServers, (slot, track) => slot !== 'screen' && mixer?.feed(id, slot === 'voice' ? 'voice' : 'tab', track))
    calls.set(id, call)
    room.people.push({ id, name, role: 'listener', mic: false, hand: false })
    call.channel.onopen = () => call.channel.send(JSON.stringify(room))
    call.channel.onmessage = event => grant(id, JSON.parse(event.data))
    call.channel.onclose = () => drop(id)
    socket?.send({ type: 'answer', id, sdp: await call.answer(sdp, { voice: mixer!.add(id), screen: member.screen.value }) })
  }

  // A listener may raise a hand; on stage, the mic and a share are theirs to report, when free.
  const grant = (id: string, request: Ask) => {
    const person = find(id)
    if (person?.role === 'listener' && 'hand' in request) person.hand = request.hand === true
    if (!person || person.role === 'listener') return
    if ('mic' in request) person.mic = request.mic === true
    for (const kind of ['audio', 'screen'] as const) if (kind in request) claim(kind, id, request[kind] === true)
  }

  // One shared audio and one shared screen: the first to ask holds it until they let go.
  const claim = (kind: keyof Sharing, id: string, on: boolean) => {
    if (on && !room.sharing[kind]) room.sharing[kind] = id
    if (!on && room.sharing[kind] === id) delete room.sharing[kind]
  }

  const unshare = (id: string) => {
    claim('audio', id, false)
    claim('screen', id, false)
  }

  const setRole = (id: string, role: 'speaker' | 'listener') => {
    const person = find(id)
    if (person) Object.assign(person, { role, hand: false, mic: false })
    unshare(id)
  }

  const drop = (id: string) => {
    unshare(id)
    calls.get(id)?.pc.close()
    calls.delete(id)
    mixer?.remove(id)
    room.people = room.people.filter(person => person.id !== id)
  }

  const remove = (id: string) => {
    socket?.send({ type: 'remove', id })
    drop(id)
  }

  const listen = () => {
    const talking = mixer?.talking() ?? []
    if (talking.join() !== room.talking.join()) room.talking = talking
  }

  const close = (message = 'The room is closed.') => {
    socket?.close()
    for (const id of calls.keys()) drop(id)
    member.reset()
    mixer?.close()
    clearInterval(listening)
    removeEventListener('beforeunload', warn)
    socket = mixer = undefined
    Object.assign(room, { people: [], talking: [], sharing: {} })
    closedWith.value = message
  }

  // Read after hydration: the prerendered page has no password in it.
  onMounted(() => password.value = localStorage.getItem(SAVED) ?? undefined)
  // Following a link away closes the room as surely as closing the tab, so ask the same way.
  onBeforeRouteLeave(() => !isOpen.value || confirm('Leave this page? The room will close for everyone.'))
  onScopeDispose(() => close())
  return {
    room,
    member,
    isOpen,
    // While open, the room's news is the member's (see RoomInside); closed, it is why.
    status: closedWith,
    title,
    password,
    open,
    close,
    remove,
    unshare,
    invite: (id: string) => setRole(id, 'speaker'),
    demote: (id: string) => setRole(id, 'listener'),
  }
}
