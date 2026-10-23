// The host's sound desk. Each guest hears me and everyone on stage except themselves. A guest's
// voice passes only while they are on stage, whatever their own browser sends.
export const createMixer = (hostId: string) => {
  const audio = new AudioContext()
  const voice = () => {
    const gain = audio.createGain()
    const meter = audio.createAnalyser()
    gain.connect(meter)
    return { gain, meter }
  }
  const me = voice()
  const guests = new Map<string, ReturnType<typeof voice> & { mix: MediaStreamAudioDestinationNode, sink?: HTMLAudioElement }>()
  let microphone: MediaStreamAudioSourceNode | undefined
  const samples = new Float32Array(me.meter.fftSize)
  const loud = (meter: AnalyserNode) => {
    meter.getFloatTimeDomainData(samples)
    return samples.some(sample => Math.abs(sample) > 0.02)
  }

  return {
    // A new guest, silent until they are on stage. Returns what they will hear.
    add: (id: string) => {
      const guest = { ...voice(), mix: audio.createMediaStreamDestination() }
      guest.gain.gain.value = 0
      guest.gain.connect(audio.destination)
      me.gain.connect(guest.mix)
      for (const other of guests.values()) {
        other.gain.connect(guest.mix)
        guest.gain.connect(other.mix)
      }
      guests.set(id, guest)
      return guest.mix.stream.getAudioTracks()[0]!
    },
    hear: (id: string, track: MediaStreamTrack) => {
      const guest = guests.get(id)
      if (!guest) return
      const stream = new MediaStream([track])
      // Chrome feeds a call's audio to Web Audio only while a media element is playing it too.
      guest.sink = Object.assign(new Audio(), { srcObject: stream, muted: true })
      guest.sink.play().catch(() => {})
      audio.createMediaStreamSource(stream).connect(guest.gain)
    },
    stage: (id: string, on: boolean) => {
      const guest = guests.get(id)
      if (guest) guest.gain.gain.value = on ? 1 : 0
    },
    remove: (id: string) => {
      const guest = guests.get(id)
      if (!guest) return
      guests.delete(id)
      guest.gain.disconnect()
      guest.sink?.pause()
      me.gain.disconnect(guest.mix)
      for (const other of guests.values()) other.gain.disconnect(guest.mix)
    },
    microphone: (track?: MediaStreamTrack) => {
      microphone?.disconnect()
      microphone = track && audio.createMediaStreamSource(new MediaStream([track]))
      microphone?.connect(me.gain)
    },
    // Who can be heard right now.
    talking: () => [
      ...loud(me.meter) ? [hostId] : [],
      ...[...guests].filter(([, guest]) => loud(guest.meter)).map(([id]) => id),
    ],
    close: () => audio.close(),
  }
}
