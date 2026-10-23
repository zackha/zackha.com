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

// A tab's audio or a screen, picked in the browser's share dialog. Browsers that can't share, as
// on most phones, don't get the buttons at all.
export const useCapture = () => {
  const canShare = import.meta.client && typeof navigator.mediaDevices?.getDisplayMedia === 'function'
  const tracks = shallowReactive<Partial<Record<Kind, MediaStreamTrack>>>({})
  const problem = ref<string>()
  // The sound captured with my screen. One capture means one "Sharing" bar in the browser, so this
  // sound is set aside rather than stopped while I'm not sending it, and leaves with the screen.
  let paired: MediaStreamTrack | undefined

  const keep = (kind: Kind, track: MediaStreamTrack) => {
    track.contentHint = kind === 'audio' ? 'music' : 'detail'
    track.onended = () => stop(kind)
    tracks[kind] = track
  }

  const share = async (requested: Kind) => {
    problem.value = undefined
    // During a screen share, sound comes from that capture: the one already there, or a new capture
    // of the screen with its sound, which replaces the old one.
    if (requested === 'audio' && tracks.screen && paired?.readyState === 'live') return keep('audio', paired)
    const kind = requested === 'audio' && tracks.screen ? 'screen' : requested
    const stream = await navigator.mediaDevices.getDisplayMedia(requests[kind]).catch((error: Error) => {
      // Closing the dialog is a choice, not a problem.
      if (error.name !== 'NotAllowedError') problem.value = 'This browser can\'t share a screen.'
    })
    if (!stream) return
    const [video] = stream.getVideoTracks()
    const [audio] = stream.getAudioTracks()
    // The dialog always captures a picture; for audio only the sound is kept.
    if (kind === 'audio') video?.stop()
    else if (video) {
      // One share, not two: a new screen replaces my old one and any audio I was sharing.
      stop('screen')
      stop('audio')
      keep('screen', video)
      paired = audio
    }
    if (audio) keep('audio', audio)
    else if (requested === 'audio') problem.value = 'No sound came with that share. On a computer, share a browser tab with "Also share tab audio" on.'
  }

  const stop = (kind: Kind) => {
    // My screen's own sound is only set aside while the screen goes on, so it can come back.
    if (kind === 'audio' && tracks.audio === paired && tracks.screen) return void (tracks.audio = undefined)
    // Without the screen, its sound goes on as an audio share if I'm sending it; set aside, it ends.
    if (kind === 'screen') {
      if (tracks.audio !== paired) paired?.stop()
      paired = undefined
    }
    tracks[kind]?.stop()
    tracks[kind] = undefined
  }

  // Leaving the room ends every share and forgets any problem.
  const reset = () => {
    stop('audio')
    stop('screen')
    problem.value = undefined
  }

  onScopeDispose(reset)
  return { canShare, tracks, problem, share, stop, reset }
}
