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
  const isOpen = ref(false)
  const closedWith = ref('The room is closed.')
  const password = ref<string>()
  const mic = useMicrophone()
  const capture = useCapture()
  const calls = new Map<string, ReturnType<typeof createCall>>()
  let socket: ReturnType<typeof connectRoom> | undefined
  let mixer: ReturnType<typeof createMixer> | undefined
  let listening: ReturnType<typeof setInterval> | undefined
  let iceServers: IceServer[] = []

  const find = (id: string) => room.people.find(person => person.id === id)
  const hands = computed(() => room.people.filter(person => person.hand))
  const status = computed(() => {
    if (mic.blocked.value) return 'Your microphone is blocked. Allow it from the address bar, then press Turn mic on.'
    if (capture.problem.value) return capture.problem.value
    if (!isOpen.value) return closedWith.value
    if (room.people.length === 1) return 'The room is open. Nobody else is here yet.'
    if (hands.value.length) return `The room is open. ${hands.value.map(person => person.name).join(', ')} raised a hand.`
    return 'The room is open.'
  })
  const title = computed(() => isOpen.value
    ? `Room (${room.people.length})${hands.value.length ? ' · Hand raised' : ''}`
    : `Room host — ${SITE_NAME}`)
  // The room's one screen: mine, or a speaker's that their call brings in.
  const screen = computed(() => {
    const id = room.sharing.screen
    const call = id && calls.get(id)
    return id === HOST.id ? capture.tracks.screen : call ? slots(call.pc).screen.receiver.track : undefined
  })

  watch(room, () => {
    const copy = JSON.stringify(room)
    for (const { channel } of calls.values()) if (channel.readyState === 'open') channel.send(copy)
  }, { deep: true })
  watchEffect(() => room.people.forEach((person) => {
    mixer?.allow(person.id, 'voice', person.role === 'speaker')
    mixer?.allow(person.id, 'tab', room.sharing.audio === person.id)
  }))
  // Every guest gets the room's screen, except whoever shares it. Passing a speaker's screen on means
  // encoding it again here, so keep its text sharp as theirs was.
  watch(screen, (track) => {
    if (track) track.contentHint = 'detail'
    for (const [id, call] of calls) slots(call.pc).screen.sender.replaceTrack(id === room.sharing.screen ? null : track ?? null)
  })
  watch(mic.track, track => mixer?.play('microphone', track))
  // My share follows the same rule as a speaker's: if the slot is taken, it isn't heard.
  watch(() => capture.tracks.audio, (track) => {
    if (!claim('audio', HOST.id, !!track) && track) return capture.stop('audio')
    mixer?.play('tab', track)
  })
  watch(() => capture.tracks.screen, track => claim('screen', HOST.id, !!track))
  watch(mic.on, (on) => {
    const me = find(HOST.id)
    if (me) me.mic = on
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
      isOpen.value = true
      listening = setInterval(listen, 150)
      addEventListener('beforeunload', warn)
      localStorage.setItem(SAVED, password.value!)
    }
    // One call per guest. An offer this browser can't take gets its sender sent out, not left on the list.
    if (message.type === 'offer' && !calls.has(message.id)) welcome(message).catch(() => remove(message.id))
    if (message.type === 'left') drop(message.id)
  }

  const welcome = async ({ id, name, sdp }: Extract<FromRoom, { type: 'offer' }>) => {
    const call = createCall(iceServers)
    calls.set(id, call)
    room.people.push({ id, name, role: 'listener', mic: false, hand: false })
    const mix = mixer!.add(id)
    call.pc.ontrack = ({ track, transceiver }) => {
      const { voice, audio } = slots(call.pc)
      if (transceiver === voice || transceiver === audio) mixer?.hear(id, track, transceiver === voice ? 'voice' : 'tab')
    }
    call.channel.onopen = () => call.channel.send(JSON.stringify(room))
    call.channel.onmessage = event => grant(id, JSON.parse(event.data))
    call.channel.onclose = () => drop(id)
    await call.pc.setRemoteDescription({ type: 'offer', sdp })
    const { voice, audio, screen: shared } = slots(call.pc)
    voice.direction = shared.direction = 'sendrecv'
    audio.direction = 'recvonly'
    await voice.sender.replaceTrack(mix)
    await shared.sender.replaceTrack(screen.value ?? null)
    socket?.send({ type: 'answer', id, sdp: await completeDescription(call.pc) })
    await limitScreen(shared)
  }

  // A guest may raise a hand while listening; on stage, report their mic and share when free.
  const grant = (id: string, request: GuestRequest) => {
    const person = find(id)
    if (person?.role === 'listener' && 'hand' in request) person.hand = request.hand === true
    if (person?.role !== 'speaker') return
    if ('mic' in request) person.mic = request.mic === true
    for (const kind of ['audio', 'screen'] as const) if (kind in request) claim(kind, id, request[kind] === true)
  }

  // One shared audio and one shared screen: the first to ask holds it until they let go. Says
  // whether they hold it now.
  const claim = (kind: keyof Sharing, id: string, on: boolean) => {
    if (on && !room.sharing[kind]) room.sharing[kind] = id
    if (!on && room.sharing[kind] === id) delete room.sharing[kind]
    return room.sharing[kind] === id
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
    capture.reset()
    mixer?.close()
    mic.stop()
    clearInterval(listening)
    removeEventListener('beforeunload', warn)
    socket = mixer = undefined
    Object.assign(room, { people: [], talking: [], sharing: {} })
    isOpen.value = false
    closedWith.value = message
  }

  // Read after hydration: the prerendered page has no password in it.
  onMounted(() => password.value = localStorage.getItem(SAVED) ?? undefined)
  // Following a link away closes the room as surely as closing the tab, so ask the same way.
  onBeforeRouteLeave(() => !isOpen.value || confirm('Leave this page? The room will close for everyone.'))
  onScopeDispose(() => close())
  return {
    room,
    isOpen,
    status,
    title,
    password,
    capture,
    // A speaker's screen, to watch; my own I can already see.
    screen: computed(() => room.sharing.screen !== HOST.id && screen.value ? new MediaStream([screen.value]) : undefined),
    sharing: computed(() => sharingSentence(room, HOST.id)),
    micOn: mic.on,
    open,
    close,
    remove,
    unshare,
    toggleMic: mic.toggle,
    invite: (id: string) => setRole(id, 'speaker'),
    demote: (id: string) => setRole(id, 'listener'),
  }
}
