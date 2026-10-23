// The room's WebSocket to the Worker: sends `first` once open, passes on every message, and reports
// the close code unless this page closed it.
export const connectRoom = (first: ToRoom, onMessage: (message: FromRoom) => void, onClose: (code: number) => void) => {
  const ws = new WebSocket(location.origin.replace('http', 'ws') + ROOM_PATH)
  // Networks drop sockets that stay quiet; losing this one would end the call.
  const ping = setInterval(() => ws.readyState === WebSocket.OPEN && ws.send('ping'), 30_000)
  const stop = () => {
    clearInterval(ping)
    ws.onclose = null
  }
  ws.onopen = () => ws.send(JSON.stringify(first))
  ws.onmessage = event => event.data !== 'pong' && onMessage(JSON.parse(event.data))
  ws.onclose = (event) => {
    stop()
    onClose(event.code)
  }
  return {
    send: (message: ToRoom) => ws.send(JSON.stringify(message)),
    close: () => {
      stop()
      ws.close()
    },
  }
}

// The door as the Worker wrote it into this page (worker/room.ts). Absent under `nuxt dev`.
export const doorInPage = (): Door | undefined => {
  const content = document.querySelector<HTMLMetaElement>('meta[name="room-door"]')?.content
  return content ? JSON.parse(content) : undefined
}

// One call between a guest's browser and mine, and a data channel for the room. Both ends open the
// channel with the same id, so it needs no negotiation of its own. The servers come from the
// Worker; a TURN relay among them is used only if no direct path works.
export const createCall = (iceServers: IceServer[]) => {
  const pc = new RTCPeerConnection({ iceServers })
  const channel = pc.createDataChannel('room', { negotiated: true, id: 0 })
  return { pc, channel }
}

// A call's three slots, in the order the guest's offer opens them: voices both ways, a shared
// tab's audio from the guest, and the shared screen. All exist from the start, so sharing only
// fills a slot and never renegotiates.
export const slots = (pc: RTCPeerConnection) => {
  const [voice, audio, screen] = pc.getTransceivers()
  return { voice: voice!, audio: audio!, screen: screen! }
}

// This end's description with every network address already in it, so setting up a call takes
// one message each way through the Worker. It asks for stereo at 128 kbps: music, not just voices.
export const completeDescription = async (pc: RTCPeerConnection) => {
  await pc.setLocalDescription()
  await new Promise<void>((resolve) => {
    if (pc.iceGatheringState === 'complete') return resolve()
    pc.addEventListener('icegatheringstatechange', () => pc.iceGatheringState === 'complete' && resolve())
    // Relay addresses can take longer than direct ones on strict networks.
    setTimeout(resolve, 5000)
  })
  return pc.localDescription!.sdp.replace(/(a=fmtp:\d+ .*useinbandfec=1)/g, '$1;stereo=1;sprop-stereo=1;maxaveragebitrate=128000')
}

// One screen to one guest, kept within a megabit so a full room fits a home connection.
export const limitScreen = async ({ sender }: RTCRtpTransceiver) => {
  const parameters = sender.getParameters()
  for (const encoding of parameters.encodings) encoding.maxBitrate = 1_000_000
  await sender.setParameters(parameters)
}
