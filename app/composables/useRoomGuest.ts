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
// this side shows that copy and asks over the call.
export const useRoomGuest = () => {
  // Read from the page, not fetched, so the first render matches what the Worker sent.
  const door = ref(import.meta.client ? doorInPage() : undefined)
  const refresh = async () => door.value = await $fetch<Door>(ROOM_PATH).catch(() => undefined)
  const phase = ref<Phase>('closed')
  const room = shallowRef<RoomState>()
  const myId = ref<string>()
  const incoming = shallowRef<MediaStreamTrack>()
  let call: ReturnType<typeof createCall> | undefined
  let socket: ReturnType<typeof connectRoom> | undefined
  let speaker: HTMLAudioElement | undefined
  let timeout: ReturnType<typeof setTimeout> | undefined

  const member = useRoomMember(
    () => room.value,
    () => myId.value,
    request => call?.channel.readyState === 'open' && call.channel.send(JSON.stringify(request)),
    (out, track) => call?.send(out, track),
    () => incoming.value,
  )
  const { notice } = member
  const status = computed(() => {
    if (member.status.value) return member.status.value
    if (phase.value === 'closed' || phase.value === 'door') return doorStatus(door.value ?? CLOSED_DOOR)
    // In the room the list says who is where; the line is only for news.
    return member.person.value ? '' : 'Connecting to Sefa.'
  })

  // A door that can't be read reads as closed.
  watch(door, value => phase.value = value?.open ? 'door' : 'closed', { immediate: true })

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
        // The room's sound plays; its screen is shown.
        call = createCall(message.iceServers, (slot, track) => slot === 'screen' ? incoming.value = track : sound.addTrack(track))
        const { pc, channel } = call
        pc.onconnectionstatechange = () => pc.connectionState === 'failed' && end('door', UNREACHABLE)
        channel.onmessage = event => room.value = JSON.parse(event.data)
        socket?.send({ type: 'offer', sdp: await call.offer() })
      }
      if (message.type === 'answer') call?.accept(message.sdp)
    }, code => end(...endings[code] ?? ['door', UNREACHABLE]))
    timeout = setTimeout(() => !room.value && end('door', UNREACHABLE), 15_000)
  }

  const hangUp = () => {
    clearTimeout(timeout)
    socket?.close()
    call?.pc.close()
    speaker?.pause()
    member.reset()
    call = socket = speaker = room.value = myId.value = incoming.value = undefined
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
    member,
    me: member.person,
    join,
    leave,
  }
}
