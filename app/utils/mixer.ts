// The host's sound desk. Everyone has two inputs, a voice and a shared tab's audio, each silent until
// allowed: a voice while on stage, a tab while it is the room's one shared audio. Each guest hears
// every input but their own; I hear the guests' inputs, never mine.
export const createMixer = (hostId: string) => {
  const audio = new AudioContext()
  const inputs = () => {
    const voice = audio.createGain()
    const tab = audio.createGain()
    const meter = audio.createAnalyser()
    // Only a voice counts as talking; music shouldn't keep a name in bold.
    voice.connect(meter)
    return { voice, tab, meter, sinks: [] as HTMLAudioElement[] }
  }
  const me = inputs()
  const guests = new Map<string, ReturnType<typeof inputs> & { mix: MediaStreamAudioDestinationNode }>()
  const sources: Partial<Record<'microphone' | 'tab', MediaStreamAudioSourceNode>> = {}
  const samples = new Float32Array(me.meter.fftSize)
  const loud = (meter: AnalyserNode) => {
    meter.getFloatTimeDomainData(samples)
    return samples.some(sample => Math.abs(sample) > 0.02)
  }
  const wire = (from: ReturnType<typeof inputs>, to: AudioNode, on: boolean) => {
    for (const node of [from.voice, from.tab]) on ? node.connect(to) : node.disconnect(to)
  }

  return {
    // A new guest, silent until allowed. Returns what they will hear.
    add: (id: string) => {
      const guest = { ...inputs(), mix: audio.createMediaStreamDestination() }
      guest.voice.gain.value = guest.tab.gain.value = 0
      wire(guest, audio.destination, true)
      wire(me, guest.mix, true)
      for (const other of guests.values()) {
        wire(other, guest.mix, true)
        wire(guest, other.mix, true)
      }
      guests.set(id, guest)
      const [track] = guest.mix.stream.getAudioTracks()
      track!.contentHint = 'music'
      return track!
    },
    hear: (id: string, track: MediaStreamTrack, input: 'voice' | 'tab') => {
      const guest = guests.get(id)
      if (!guest) return
      const stream = new MediaStream([track])
      // Chrome feeds a call's audio to Web Audio only while a media element is playing it too.
      const sink = Object.assign(new Audio(), { srcObject: stream, muted: true })
      sink.play().catch(() => {})
      guest.sinks.push(sink)
      audio.createMediaStreamSource(stream).connect(guest[input])
    },
    allow: (id: string, input: 'voice' | 'tab', on: boolean) => {
      const guest = guests.get(id)
      if (guest) guest[input].gain.value = on ? 1 : 0
    },
    remove: (id: string) => {
      const guest = guests.get(id)
      if (!guest) return
      guests.delete(id)
      guest.voice.disconnect()
      guest.tab.disconnect()
      for (const sink of guest.sinks) sink.pause()
      wire(me, guest.mix, false)
      for (const other of guests.values()) wire(other, guest.mix, false)
    },
    // My own microphone and shared tab.
    play: (input: 'microphone' | 'tab', track?: MediaStreamTrack) => {
      sources[input]?.disconnect()
      sources[input] = track && audio.createMediaStreamSource(new MediaStream([track]))
      sources[input]?.connect(input === 'microphone' ? me.voice : me.tab)
    },
    // Who can be heard right now.
    talking: () => [
      ...loud(me.meter) ? [hostId] : [],
      ...[...guests].filter(([, guest]) => loud(guest.meter)).map(([id]) => id),
    ],
    close: () => audio.close(),
  }
}
