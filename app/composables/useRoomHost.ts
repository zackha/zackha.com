const HOST: Person = { id: 'host', name: 'Sefa', role: 'host', mic: false, hand: false }

// Why the Worker closed my socket, in a sentence.
const closings: Record<number, string> = {
  [CloseCode.unauthorized]: 'Wrong password. The room is still closed.',
  [CloseCode.replaced]: 'You opened the room in another tab, so this one let go of it.',
}

// Closing this tab closes the room, so the browser asks first.
const warn = (event: BeforeUnloadEvent) => event.preventDefault()

// The room, run from my browser. `room` is the one source of truth: the page renders it, every
// guest gets a copy whenever it changes, and the mixer follows who is on stage.
export const useRoomHost = () => {
  const room = reactive<RoomState>({ people: [], talking: [] })
  const isOpen = ref(false)
  const closedWith = ref('The room is closed.')
  const mic = useMicrophone()
  const calls = new Map<string, ReturnType<typeof createCall>>()
  let socket: ReturnType<typeof connectRoom> | undefined
  let mixer: ReturnType<typeof createMixer> | undefined
  let listening: ReturnType<typeof setInterval> | undefined

  const find = (id: string) => room.people.find(person => person.id === id)
  const hands = computed(() => room.people.filter(person => person.hand))
  const status = computed(() => {
    if (mic.blocked.value) return 'Your microphone is blocked. Allow it from the address bar, then press Turn mic on.'
    if (!isOpen.value) return closedWith.value
    if (room.people.length === 1) return 'The room is open. Nobody else is here yet.'
    if (hands.value.length) return `The room is open. ${hands.value.map(person => person.name).join(', ')} raised a hand.`
    return 'The room is open.'
  })
  const title = computed(() => isOpen.value
    ? `Room (${room.people.length})${hands.value.length ? ' · Hand raised' : ''}`
    : `Room host — ${SITE_NAME}`)

  watch(room, () => {
    const copy = JSON.stringify(room)
    for (const { channel } of calls.values()) if (channel.readyState === 'open') channel.send(copy)
  }, { deep: true })
  watchEffect(() => room.people.forEach(person => mixer?.stage(person.id, person.role === 'speaker')))
  watch(mic.track, track => mixer?.microphone(track))
  watch(mic.on, (on) => {
    const me = find(HOST.id)
    if (me) me.mic = on
  })

  const open = (password: string) => {
    if (socket) return
    mixer = createMixer(HOST.id)
    socket = connectRoom({ type: 'open', password }, receive, code => close(closings[code] ?? 'Your connection dropped, so the room closed.'))
  }

  const receive = (message: FromRoom) => {
    if (message.type === 'opened') {
      room.people = [{ ...HOST }]
      isOpen.value = true
      listening = setInterval(listen, 150)
      addEventListener('beforeunload', warn)
    }
    // An offer this browser can't take gets its sender sent out, not left on the list.
    if (message.type === 'offer') welcome(message).catch(() => remove(message.id))
    if (message.type === 'left') drop(message.id)
  }

  const welcome = async ({ id, name, sdp }: Extract<FromRoom, { type: 'offer' }>) => {
    const call = createCall()
    calls.set(id, call)
    room.people.push({ id, name, role: 'listener', mic: false, hand: false })
    const mix = mixer!.add(id)
    call.pc.ontrack = ({ track }) => mixer?.hear(id, track)
    call.channel.onopen = () => call.channel.send(JSON.stringify(room))
    call.channel.onmessage = event => grant(id, JSON.parse(event.data))
    call.channel.onclose = () => drop(id)
    await call.pc.setRemoteDescription({ type: 'offer', sdp })
    const [slot] = call.pc.getTransceivers()
    slot!.direction = 'sendrecv'
    await slot!.sender.replaceTrack(mix)
    socket?.send({ type: 'answer', id, sdp: await completeDescription(call.pc) })
  }

  // A guest may raise a hand while listening, and report their mic while on stage. Nothing else.
  const grant = (id: string, request: GuestRequest) => {
    const person = find(id)
    if (person?.role === 'listener' && 'hand' in request) person.hand = request.hand === true
    if (person?.role === 'speaker' && 'mic' in request) person.mic = request.mic === true
  }

  const setRole = (id: string, role: 'speaker' | 'listener') => {
    const person = find(id)
    if (person) Object.assign(person, { role, hand: false, mic: false })
  }

  const drop = (id: string) => {
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
    mixer?.close()
    mic.stop()
    clearInterval(listening)
    removeEventListener('beforeunload', warn)
    socket = mixer = undefined
    Object.assign(room, { people: [], talking: [] })
    isOpen.value = false
    closedWith.value = message
  }

  // Following a link away closes the room as surely as closing the tab, so ask the same way.
  onBeforeRouteLeave(() => !isOpen.value || confirm('Leave this page? The room will close for everyone.'))
  onScopeDispose(() => close())
  return {
    room,
    isOpen,
    status,
    title,
    micOn: mic.on,
    open,
    close,
    remove,
    toggleMic: mic.toggle,
    invite: (id: string) => setRole(id, 'speaker'),
    demote: (id: string) => setRole(id, 'listener'),
  }
}
