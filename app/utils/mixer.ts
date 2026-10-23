// The host's sound desk. Everyone in the room, me included, has a seat with two inputs, a voice and a
// shared tab's audio, each silent until allowed: a voice while on stage, a tab while it is the room's
// one shared audio. Every input meets on one bus, and each seat hears the bus with its own inputs
// mixed back in upside down. The graph runs in lockstep, so those cancel exactly: nobody hears
// themself, and the desk needs one connection per person instead of one per pair.
type Input = 'voice' | 'tab'

export const createMixer = (hostId: string) => {
  const audio = new AudioContext()
  const bus = audio.createGain()
  const seats = new Map<string, ReturnType<typeof seat>>()
  const seat = (out: AudioNode) => {
    const voice = audio.createGain()
    const tab = audio.createGain()
    const self = audio.createGain()
    const meter = audio.createAnalyser()
    voice.gain.value = tab.gain.value = 0
    self.gain.value = -1
    for (const input of [voice, tab]) {
      input.connect(bus)
      input.connect(self)
    }
    bus.connect(out)
    self.connect(out)
    // Only a voice counts as talking; music shouldn't keep a name in bold.
    voice.connect(meter)
    return { voice, tab, self, meter, out, sources: {} as Partial<Record<Input, AudioNode>> }
  }
  // I hear the room through my speakers.
  seats.set(hostId, seat(audio.destination))
  const samples = new Float32Array(2048)
  const loud = (meter: AnalyserNode) => {
    meter.getFloatTimeDomainData(samples)
    return samples.some(sample => Math.abs(sample) > 0.02)
  }

  return {
    // A guest's seat. Returns what they will hear.
    add: (id: string) => {
      const mix = audio.createMediaStreamDestination()
      seats.set(id, seat(mix))
      const [track] = mix.stream.getAudioTracks()
      track!.contentHint = 'music'
      return track!
    },
    // What comes into a seat: a guest's voice or tab from their call, my microphone or tab.
    feed: (id: string, input: Input, track?: MediaStreamTrack) => {
      const place = seats.get(id)
      if (!place) return
      place.sources[input]?.disconnect()
      if (!track) return void delete place.sources[input]
      const stream = new MediaStream([track])
      // Chrome feeds a call's audio to Web Audio only while a media element is playing it too.
      Object.assign(new Audio(), { srcObject: stream, muted: true }).play().catch(() => {})
      place.sources[input] = audio.createMediaStreamSource(stream)
      place.sources[input].connect(place[input])
    },
    allow: (id: string, input: Input, on: boolean) => {
      const place = seats.get(id)
      if (place) place[input].gain.value = on ? 1 : 0
    },
    remove: (id: string) => {
      const place = seats.get(id)
      seats.delete(id)
      for (const node of [place?.voice, place?.tab, place?.self]) node?.disconnect()
      if (place) bus.disconnect(place.out)
    },
    // Who can be heard right now.
    talking: () => [...seats].filter(([, place]) => loud(place.meter)).map(([id]) => id),
    close: () => audio.close(),
  }
}
