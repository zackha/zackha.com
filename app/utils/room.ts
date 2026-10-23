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

// One call between a guest's browser and mine: an audio slot each way, and a data channel for the
// room. Both ends open the channel with the same id, so it needs no negotiation of its own. The
// servers come from the Worker; a TURN relay among them is used only if no direct path works.
export const createCall = (iceServers: IceServer[]) => {
  const pc = new RTCPeerConnection({ iceServers })
  const channel = pc.createDataChannel('room', { negotiated: true, id: 0 })
  return { pc, channel }
}

// This end's description with every network address already in it, so setting up a call takes
// one message each way through the Worker.
export const completeDescription = async (pc: RTCPeerConnection) => {
  await pc.setLocalDescription()
  await new Promise<void>((resolve) => {
    if (pc.iceGatheringState === 'complete') return resolve()
    pc.addEventListener('icegatheringstatechange', () => pc.iceGatheringState === 'complete' && resolve())
    // Relay addresses can take longer than direct ones on strict networks.
    setTimeout(resolve, 5000)
  })
  return pc.localDescription!.sdp
}
