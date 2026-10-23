type Phase = 'closed' | 'door' | 'call'

const UNREACHABLE = 'Couldn\'t reach Sefa. Your network may block direct calls. A different network, like your phone\'s, usually works.'

// Where a guest lands when the Worker closes their socket, and what they read there.
const endings: Record<number, [Phase, string]> = {
  [CloseCode.closed]: ['closed', doorStatus(CLOSED_DOOR)],
  [CloseCode.gone]: ['closed', 'Sefa left, so the room closed. Thanks for stopping by.'],
  [CloseCode.removed]: ['closed', 'You were removed from the room. You can come back the next time it opens.'],
  [CloseCode.full]: ['door', `The room is full. ${ROOM_CAPACITY} people are inside. Try again in a few minutes.`],
}

// The room, as a guest. The host's browser holds the room and sends a copy whenever it changes;
// this side only shows that copy and asks: a raised hand, an open mic, a share.
export const useRoomGuest = () => {
  // Read from the page, not fetched, so the first render matches what the Worker sent.
  const door = ref(import.meta.client ? doorInPage() : undefined)
  const refresh = async () => door.value = await $fetch<Door>(ROOM_PATH).catch(() => undefined)
  const phase = ref<Phase>('closed')
  const notice = ref<string>()
  const room = shallowRef<RoomState>()
  const myId = ref<string>()
  const screen = shallowRef<MediaStream>()
  const mic = useMicrophone()
  const capture = useCapture()
  let call: ReturnType<typeof createCall> | undefined
  let socket: ReturnType<typeof connectRoom> | undefined
  let speaker: HTMLAudioElement | undefined
  let timeout: ReturnType<typeof setTimeout> | undefined

  const me = computed(() => room.value?.people.find(person => person.id === myId.value))
  const status = computed(() => {
    if (mic.blocked.value) return 'Your microphone is blocked. Allow it from the address bar, then press Turn mic on.'
    if (capture.problem.value) return capture.problem.value
    if (notice.value) return notice.value
    if (phase.value === 'closed' || phase.value === 'door') return doorStatus(door.value ?? CLOSED_DOOR)
    // In the room the lists say who is where; the line is only for news.
    return me.value ? '' : 'Connecting to Sefa.'
  })
  const action = computed(() => me.value?.role === 'listener'
    ? me.value.hand ? 'Lower hand' : 'Raise hand'
    : mic.on.value ? 'Turn mic off' : 'Turn mic on')

  // A door that can't be read reads as closed.
  watch(door, value => phase.value = value?.open ? 'door' : 'closed', { immediate: true })
  watch(mic.track, track => call && slots(call.pc).voice.sender.replaceTrack(track ?? null))
  watch(() => me.value?.role, (role, before) => {
    if (role === 'listener' && before === 'speaker') {
      mic.stop()
      notice.value = 'Sefa moved you to listeners. Your mic is off.'
    }
    if (role === 'speaker') notice.value = undefined
  })
  for (const kind of ['audio', 'screen'] as const) {
    // Send what I share, and ask the host for the room's slot.
    watch(() => capture.tracks[kind], (track) => {
      if (!call) return
      // Someone else holds the slot, say a screen brought its sound along: don't send what nobody hears.
      const holder = room.value?.sharing[kind]
      if (track && holder && holder !== myId.value) return capture.stop(kind)
      slots(call.pc)[kind].sender.replaceTrack(track ?? null)
      send({ [kind]: !!track })
    })
    // The host decides: mine ends when the slot goes to someone else or the host takes it back.
    watch(() => room.value?.sharing[kind], (now, before) => {
      if (!capture.tracks[kind] || now === myId.value || (before !== myId.value && !now)) return
      capture.stop(kind)
      if (before === myId.value && me.value?.role === 'speaker') notice.value = `Sefa stopped your ${kind === 'screen' ? 'screen' : 'audio'} share. You can still talk.`
    })
  }

  // Knock first: the Worker lets the guest in and hands over the servers the call may use.
  const join = (name: string) => {
    notice.value = undefined
    phase.value = 'call'
    // Started by the Join click, so the browser lets it play once the room's sound arrives.
    const sound = new MediaStream()
    speaker = Object.assign(new Audio(), { srcObject: sound })
    speaker.play().catch(() => {})
    socket = connectRoom({ type: 'join', name }, async (message) => {
      if (message.type === 'admitted') {
        myId.value = message.id
        call = createCall(message.iceServers)
        const { pc, channel } = call
        // The three slots the host's answer will match, in this order (see `slots`).
        pc.addTransceiver('audio', { direction: 'sendrecv' })
        pc.addTransceiver('audio', { direction: 'sendonly' })
        pc.addTransceiver('video', { direction: 'sendrecv' })
        pc.ontrack = ({ track }) => track.kind === 'audio' ? sound.addTrack(track) : screen.value = new MediaStream([track])
        pc.onconnectionstatechange = () => pc.connectionState === 'failed' && end('door', UNREACHABLE)
        channel.onmessage = event => room.value = JSON.parse(event.data)
        socket?.send({ type: 'offer', sdp: await completeDescription(pc) })
      }
      if (message.type === 'answer') call?.pc.setRemoteDescription({ type: 'answer', sdp: message.sdp })
    }, code => end(...endings[code] ?? ['door', UNREACHABLE]))
    timeout = setTimeout(() => !room.value && end('door', UNREACHABLE), 15_000)
  }

  const send = (request: GuestRequest) => call?.channel.readyState === 'open' && call.channel.send(JSON.stringify(request))

  const act = async () => {
    notice.value = undefined
    if (me.value?.role === 'listener') return send({ hand: !me.value.hand })
    await mic.toggle()
    send({ mic: mic.on.value })
  }

  const hangUp = () => {
    clearTimeout(timeout)
    socket?.close()
    call?.pc.close()
    speaker?.pause()
    mic.stop()
    capture.reset()
    call = socket = speaker = room.value = myId.value = screen.value = undefined
  }

  const end = (where: Phase, message: string) => {
    hangUp()
    phase.value = where
    notice.value = message
  }

  // I am still in the room, so the door is open; asking again only updates the count.
  const leave = () => {
    hangUp()
    notice.value = undefined
    phase.value = 'door'
    refresh()
  }

  // Chrome may open this page ahead of a click on its link; look at the door again when it is shown.
  onMounted(() => document.addEventListener('prerenderingchange', () => refresh(), { once: true }))
  onScopeDispose(hangUp)
  return {
    phase,
    status,
    room,
    me,
    action,
    capture,
    // Someone else's screen, to watch; my own I can already see.
    screen: computed(() => room.value?.sharing.screen && room.value.sharing.screen !== myId.value ? screen.value : undefined),
    join,
    act,
    leave,
  }
}
