type Phase = 'closed' | 'door' | 'joining' | 'inside'

const UNREACHABLE = 'Couldn\'t reach Sefa. Your network may block direct calls. A different network, like your phone\'s, usually works.'

// Where a guest lands when the Worker closes their socket, and what they read there.
const endings: Record<number, [Phase, string]> = {
  [CloseCode.closed]: ['closed', 'Sefa isn\'t here right now.'],
  [CloseCode.gone]: ['closed', 'Sefa left, so the room closed. Thanks for stopping by.'],
  [CloseCode.removed]: ['closed', 'You were removed from the room. You can come back the next time it opens.'],
  [CloseCode.full]: ['door', `The room is full. ${ROOM_CAPACITY} people are inside. Try again in a few minutes.`],
}

// The room, as a guest. The host's browser holds the room and sends a copy whenever it changes;
// this side only shows that copy and asks for two things: a raised hand and an open mic.
export const useRoomGuest = () => {
  const { data: door, status: knock, refresh } = useFetch<Door>(ROOM_PATH, { server: false })
  const phase = ref<Phase>()
  const notice = ref<string>()
  const room = shallowRef<RoomState>()
  const myId = ref<string>()
  const mic = useMicrophone()
  let call: ReturnType<typeof createCall> | undefined
  let socket: ReturnType<typeof connectRoom> | undefined
  let speaker: HTMLAudioElement | undefined
  let timeout: ReturnType<typeof setTimeout> | undefined

  const me = computed(() => room.value?.people.find(person => person.id === myId.value))
  const status = computed(() => {
    if (mic.blocked.value) return 'Your microphone is blocked. Allow it from the address bar, then press Turn mic on.'
    if (notice.value) return notice.value
    if (!phase.value) return ''
    if (phase.value === 'closed') return 'Sefa isn\'t here right now.'
    if (phase.value === 'door') return `Sefa is here. ${door.value!.people > 1 ? `${door.value!.people} people are inside.` : 'Nobody else is inside yet.'}`
    if (!me.value) return 'Connecting to Sefa.'
    if (me.value.role === 'listener') return me.value.hand ? 'Your hand is raised. Sefa can see it.' : 'You\'re listening.'
    return mic.on.value ? 'You\'re speaking. Your mic is on.' : 'Sefa invited you to speak. Your mic is off.'
  })
  const action = computed(() => me.value?.role === 'listener'
    ? me.value.hand ? 'Lower hand' : 'Raise hand'
    : mic.on.value ? 'Turn mic off' : 'Turn mic on')

  // A door that can't be reached reads as closed.
  watch(knock, (value) => {
    if (value === 'success' || value === 'error') phase.value = door.value?.open ? 'door' : 'closed'
  })
  watch(mic.track, track => call?.pc.getSenders()[0]?.replaceTrack(track ?? null))
  watch(() => me.value?.role, (role, before) => {
    if (role === 'listener' && before === 'speaker') {
      mic.stop()
      notice.value = 'Sefa moved you to listeners. Your mic is off.'
    }
    if (role === 'speaker') notice.value = undefined
  })

  const join = async (name: string) => {
    notice.value = undefined
    phase.value = 'joining'
    call = createCall()
    const { pc, channel } = call
    pc.addTransceiver('audio', { direction: 'sendrecv' })
    // Started by the Join click, so the browser lets it play once the room's sound arrives.
    const sound = new MediaStream()
    speaker = Object.assign(new Audio(), { srcObject: sound })
    speaker.play().catch(() => {})
    pc.ontrack = ({ track }) => sound.addTrack(track)
    pc.onconnectionstatechange = () => pc.connectionState === 'failed' && end('door', UNREACHABLE)
    channel.onmessage = (event) => {
      room.value = JSON.parse(event.data)
      phase.value = 'inside'
    }
    socket = connectRoom({ type: 'offer', name, sdp: await completeDescription(pc) }, (message) => {
      if (message.type !== 'answer') return
      myId.value = message.id
      pc.setRemoteDescription({ type: 'answer', sdp: message.sdp })
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
    call = socket = speaker = room.value = myId.value = undefined
  }

  const end = (where: Phase, message: string) => {
    hangUp()
    phase.value = where
    notice.value = message
  }

  const leave = () => {
    hangUp()
    notice.value = undefined
    refresh()
  }

  // Chrome may open this page ahead of a click on its link; look at the door again when it is shown.
  onMounted(() => document.addEventListener('prerenderingchange', () => refresh(), { once: true }))
  onScopeDispose(hangUp)
  return { phase, status, room, me, action, join, act, leave }
}
