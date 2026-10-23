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

// The door as the Worker left it on this page's status line (worker/room.ts). Absent under `nuxt dev`.
export const doorInPage = (): Door | undefined => {
  const door = document.querySelector<HTMLElement>('[role="status"]')?.dataset.door
  return door ? JSON.parse(door) : undefined
}
