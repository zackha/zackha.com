type Kind = keyof Sharing

// Shared sound arrives untouched by the processing browsers apply to microphones.
const MUSIC = { echoCancellation: false, noiseSuppression: false, autoGainControl: false }

// What the browser's own share dialog offers for each kind. Audio opens on the tab list without the
// whole screen. A screen may bring its sound along: the dialog offers it too.
const requests: Record<Kind, DisplayMediaStreamOptions & Record<string, unknown>> = {
  audio: {
    video: { displaySurface: 'browser' },
    audio: MUSIC,
    monitorTypeSurfaces: 'exclude',
    selfBrowserSurface: 'exclude',
    systemAudio: 'exclude',
  },
  screen: { video: { frameRate: { max: 15 } }, audio: MUSIC, systemAudio: 'include' },
}

// A tab's audio or a screen, picked in the browser's share dialog. One capture at a time, so the
// browser shows one "Sharing" bar: a new one replaces the last. A screen's sound is the room's audio;
// it can be set aside while the screen goes on, and goes on alone when the screen stops. Browsers
// that can't share, as on most phones, don't get the commands at all.
export const useCapture = () => {
  const canShare = import.meta.client && typeof navigator.mediaDevices?.getDisplayMedia === 'function'
  const held = shallowReactive<Partial<Record<Kind, MediaStreamTrack>>>({})
  const aside = ref(false)
  const problem = ref<string>()
  // What goes to the room.
  const tracks = reactive({
    audio: computed(() => aside.value ? undefined : held.audio),
    screen: computed(() => held.screen),
  })

  const drop = (kind: Kind) => {
    held[kind]?.stop()
    delete held[kind]
  }

  // Asks the browser for a new capture. Says whether it came with sound; nothing if closed.
  const capture = async (kind: Kind) => {
    const stream = await navigator.mediaDevices.getDisplayMedia(requests[kind]).catch((error: Error) => {
      // Closing the dialog is a choice, not a problem.
      if (error.name !== 'NotAllowedError') problem.value = 'This browser can\'t share a screen.'
    })
    if (!stream) return
    const [video] = stream.getVideoTracks()
    const [audio] = stream.getAudioTracks()
    drop('audio')
    drop('screen')
    aside.value = false
    // The dialog always captures a picture; for audio only the sound is kept.
    if (kind === 'audio') video?.stop()
    else if (video) held.screen = Object.assign(video, { contentHint: 'detail', onended: () => stop('screen') })
    if (audio) held.audio = Object.assign(audio, { contentHint: 'music', onended: () => drop('audio') })
    return !!audio
  }

  const share = async (kind: Kind) => {
    problem.value = undefined
    // A screen's sound set aside comes back without a dialog.
    if (kind === 'audio' && held.audio) return void (aside.value = false)
    // During a screen share, sound comes from capturing the screen again, with its sound this time.
    const sound = await capture(kind === 'audio' && held.screen ? 'screen' : kind)
    if (sound === false && kind === 'audio') problem.value = 'No sound came with that share. On a computer, share a browser tab with "Also share tab audio" on.'
  }

  const stop = (kind: Kind) => {
    if (kind === 'audio' && held.screen) return void (aside.value = true)
    if (kind === 'screen' && aside.value) drop('audio')
    drop(kind)
    aside.value = false
  }

  // Leaving the room ends every share and forgets any problem.
  const reset = () => {
    stop('screen')
    stop('audio')
    problem.value = undefined
  }

  onScopeDispose(reset)
  return { canShare, tracks, problem, share, stop, reset }
}
