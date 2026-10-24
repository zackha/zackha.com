// Someone came into the room: two rising notes, loud and bright enough to hear over music. Made on
// the spot with Web Audio, so there is no file to load. The first note has died away by the time the
// second peaks, so the two never add up past what the speakers can play.
let audio: AudioContext | undefined

export const chime = () => {
  audio ??= new AudioContext()
  for (const [frequency, start, length] of [[659.25, 0, 0.5], [880, 0.18, 0.9]] as const) {
    const at = audio.currentTime + start
    const note = new OscillatorNode(audio, { type: 'triangle', frequency })
    const gain = new GainNode(audio, { gain: 0 })
    gain.gain.setValueAtTime(0, at)
    // Close to the most a page can play; the rest is the device's own volume.
    gain.gain.linearRampToValueAtTime(0.9, at + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + length)
    note.connect(gain).connect(audio.destination)
    note.start(at)
    note.stop(at + length)
  }
}
