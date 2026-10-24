// What everyone in the room does, the host included: show the room, ask for things (a hand, the
// mic, a share), send their own sound and screen, and go along with what the room decides. Only two
// things differ: where an ask goes (the host decides it on the spot, a guest sends it over the
// call) and where my sound and screen go (the host's desk, or a guest's call).
export const useRoomMember = (
  room: () => RoomState | undefined,
  me: () => string | undefined,
  ask: (request: Ask) => void,
  send: (out: Slot, track?: MediaStreamTrack) => void,
  incoming: (holder: string) => MediaStreamTrack | undefined,
) => {
  const mic = useMicrophone()
  const capture = useCapture()
  const notice = ref<string>()
  const person = computed(() => room()?.people.find(person => person.id === me()))
  const status = computed(() => {
    if (mic.blocked.value) return 'Your microphone is blocked. Allow it from the address bar, then press unmute.'
    return capture.problem.value ?? notice.value
  })
  const action = computed(() => person.value?.role === 'listener'
    ? person.value.hand ? 'lower hand' : 'raise hand'
    : mic.on.value ? 'mute' : 'unmute')
  // The room's one screen: mine straight from my capture, at no cost, or the one coming in.
  const screen = computed(() => {
    const holder = room()?.sharing.screen
    return holder === me() ? capture.tracks.screen : holder ? incoming(holder) : undefined
  })

  watch(mic.track, track => send('voice', track))
  // Someone new comes in: everyone already here hears it, in their own browser. The newcomer's
  // first copy of the room has nothing before it, so they don't hear themself arrive.
  watch(() => room()?.people.map(person => person.id), (now, before) => {
    if (before?.length && now?.some(id => !before.includes(id))) chime()
  })
  watch(() => person.value?.role, (role, before) => {
    if (role === 'listener' && before && before !== 'listener') {
      mic.stop()
      notice.value = 'Sefa moved you to listeners. Your mic is off.'
    }
    if (role === 'speaker') notice.value = undefined
  })
  for (const kind of ['audio', 'screen'] as const) {
    // Send what I share and ask for the room's slot; if someone else holds it, nobody would hear it.
    watch(() => capture.tracks[kind], (track) => {
      const holder = room()?.sharing[kind]
      if (track && holder && holder !== me()) return capture.stop(kind)
      send(kind, track)
      ask({ [kind]: !!track })
    })
    // The host decides: mine ends when the slot goes to someone else or the host takes it back.
    watch(() => room()?.sharing[kind], (now, before) => {
      if (!capture.tracks[kind] || now === me() || (before !== me() && !now)) return
      capture.stop(kind)
      if (before === me() && person.value?.role === 'speaker') notice.value = `Sefa stopped your ${kind} share. You can still talk.`
    })
  }

  // A hand while listening, the mic on stage.
  const act = async () => {
    notice.value = undefined
    if (person.value?.role === 'listener') return ask({ hand: !person.value.hand })
    await mic.toggle()
    ask({ mic: mic.on.value })
  }

  const reset = () => {
    mic.stop()
    capture.reset()
  }

  return { capture, notice, person, status, action, screen, act, reset }
}
