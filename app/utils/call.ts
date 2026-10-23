// A call's three slots, in the order the guest's offer opens them: voices both ways, a shared tab's
// audio from the guest, and the room's screen. All exist from the start, so sharing only fills a
// slot and never renegotiates.
export type Slot = 'voice' | 'audio' | 'screen'
const SLOTS: Slot[] = ['voice', 'audio', 'screen']

// One call between a guest's browser and mine, and a data channel for the room. Both ends open the
// channel with the same id, so it needs no negotiation of its own. The servers come from the
// Worker; a TURN relay among them is used only if no direct path works.
export const createCall = (iceServers: IceServer[], onTrack: (slot: Slot, track: MediaStreamTrack) => void) => {
  const pc = new RTCPeerConnection({ iceServers })
  const channel = pc.createDataChannel('room', { negotiated: true, id: 0 })
  const slot = (name: Slot) => pc.getTransceivers()[SLOTS.indexOf(name)]!
  pc.ontrack = ({ track, transceiver }) => onTrack(SLOTS[pc.getTransceivers().indexOf(transceiver)]!, track)

  // This end's description with every network address already in it, so setting up a call takes
  // one message each way through the Worker. It asks for stereo at 128 kbps: music, not just voices.
  const describe = async () => {
    await pc.setLocalDescription()
    await new Promise<void>((resolve) => {
      if (pc.iceGatheringState === 'complete') return resolve()
      pc.addEventListener('icegatheringstatechange', () => pc.iceGatheringState === 'complete' && resolve())
      // Relay addresses can take longer than direct ones on strict networks.
      setTimeout(resolve, 5000)
    })
    return pc.localDescription!.sdp.replace(/(a=fmtp:\d+ .*useinbandfec=1)/g, '$1;stereo=1;sprop-stereo=1;maxaveragebitrate=128000')
  }

  return {
    pc,
    channel,
    send: (name: Slot, track?: MediaStreamTrack | null) => slot(name).sender.replaceTrack(track ?? null),
    received: (name: Slot) => slot(name).receiver.track,
    // The guest's side: open the slots and ask.
    offer: () => {
      pc.addTransceiver('audio', { direction: 'sendrecv' })
      pc.addTransceiver('audio', { direction: 'sendonly' })
      pc.addTransceiver('video', { direction: 'sendrecv' })
      return describe()
    },
    // My side: take the guest's slots, fill mine, and answer. One screen to one guest stays within
    // a megabit, so a full room fits a home connection.
    answer: async (sdp: string, tracks: Partial<Record<Slot, MediaStreamTrack>>) => {
      await pc.setRemoteDescription({ type: 'offer', sdp })
      slot('voice').direction = slot('screen').direction = 'sendrecv'
      slot('audio').direction = 'recvonly'
      await Promise.all(SLOTS.map(name => tracks[name] && slot(name).sender.replaceTrack(tracks[name])))
      const answer = await describe()
      const { sender } = slot('screen')
      const parameters = sender.getParameters()
      for (const encoding of parameters.encodings) encoding.maxBitrate = 1_000_000
      await sender.setParameters(parameters)
      return answer
    },
    accept: (sdp: string) => pc.setRemoteDescription({ type: 'answer', sdp }),
  }
}
