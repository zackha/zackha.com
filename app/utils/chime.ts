// Someone came into the room: two soft rising notes, quiet enough to sit under the voices. Made on
// the spot with Web Audio, so there is no file to load.
let audio: AudioContext | undefined

export const chime = () => {
  audio ??= new AudioContext()
  for (const [frequency, start, length] of [[659.25, 0, 0.35], [880, 0.12, 0.5]] as const) {
    const at = audio.currentTime + start
    const note = new OscillatorNode(audio, { frequency })
    const gain = new GainNode(audio, { gain: 0 })
    gain.gain.setValueAtTime(0, at)
    gain.gain.linearRampToValueAtTime(0.12, at + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + length)
    note.connect(gain).connect(audio.destination)
    note.start(at)
    note.stop(at + length)
  }
}
