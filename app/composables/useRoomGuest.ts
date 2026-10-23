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
// this side only shows that copy and asks for two things: a raised hand and an open mic.
export const useRoomGuest = () => {
  // Read from the page, not fetched, so the first render matches what the Worker sent.
  const door = ref(import.meta.client ? doorInPage() : undefined)
  const refresh = async () => door.value = await $fetch<Door>(ROOM_PATH).catch(() => undefined)
  const phase = ref<Phase>('closed')
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
    if (phase.value === 'closed' || phase.value === 'door') return doorStatus(door.value ?? CLOSED_DOOR)
    if (!me.value) return 'Connecting to Sefa.'
    if (me.value.role === 'listener') return me.value.hand ? 'Your hand is raised. Sefa can see it.' : 'You\'re listening.'
    return mic.on.value ? 'You\'re speaking. Your mic is on.' : 'Sefa invited you to speak. Your mic is off.'
  })
  const action = computed(() => me.value?.role === 'listener'
    ? me.value.hand ? 'Lower hand' : 'Raise hand'
    : mic.on.value ? 'Turn mic off' : 'Turn mic on')

  // A door that can't be read reads as closed.
  watch(door, value => phase.value = value?.open ? 'door' : 'closed', { immediate: true })
  watch(mic.track, track => call?.pc.getSenders()[0]?.replaceTrack(track ?? null))
  watch(() => me.value?.role, (role, before) => {
    if (role === 'listener' && before === 'speaker') {
      mic.stop()
      notice.value = 'Sefa moved you to listeners. Your mic is off.'
    }
    if (role === 'speaker') notice.value = undefined
  })

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
        pc.addTransceiver('audio', { direction: 'sendrecv' })
        pc.ontrack = ({ track }) => sound.addTrack(track)
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
    call = socket = speaker = room.value = myId.value = undefined
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
  return { phase, status, room, me, action, join, act, leave }
}
