// The microphone, asked for only the first time someone turns it on.
export const useMicrophone = () => {
  const track = shallowRef<MediaStreamTrack>()
  const on = ref(false)
  const blocked = ref(false)
  let asks = 0

  const toggle = async () => {
    if (track.value) {
      on.value = track.value.enabled = !on.value
      return
    }
    const ask = ++asks
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => undefined)
    blocked.value = !stream
    // Stopped, say taken off stage or out of the room, while the browser was asking.
    if (ask !== asks) return stream?.getTracks().forEach(t => t.stop())
    track.value = stream?.getAudioTracks()[0]
    on.value = !!track.value
  }

  const stop = () => {
    asks++
    track.value?.stop()
    track.value = undefined
    on.value = blocked.value = false
  }

  onScopeDispose(stop)
  return { track, on, blocked, toggle, stop }
}
