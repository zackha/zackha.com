import { DurableObject } from 'cloudflare:workers'
import type { Door, FromRoom, IceServer } from '../shared/types/room'
import { CLOSED_DOOR, CloseCode, ROOM_CAPACITY, ROOM_PATH, cleanName, doorStatus } from '../shared/utils/room'

// Kept on the socket itself, so it survives the object hibernating between messages. `turn` is the
// relay credential handed to this person, revoked when they go.
type Seat = { turn?: string } & ({ role: 'host' | 'replaced' } | { role: 'guest', id: string, name: string })

const TURN_KEYS = 'https://rtc.live.cloudflare.com/v1/turn/keys'
const STUN: IceServer[] = [{ urls: 'stun:stun.cloudflare.com:3478' }]

// The room's door. It knows whether I am in, lets guests in, and passes each call's first offer
// and answer between a guest's browser and mine. Voices and the room itself then go browser to
// browser, so a guest's message is never trusted beyond its name and offer.
export class Room extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    // Pages ping so idle sockets stay open; the answer doesn't wake the object.
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'))
  }

  fetch(request: Request) {
    if (request.headers.get('Upgrade') !== 'websocket') return Response.json(this.door())
    const { 0: client, 1: server } = new WebSocketPair()
    this.ctx.acceptWebSocket(server)
    return new Response(null, { status: 101, webSocket: client })
  }

  async webSocketMessage(ws: WebSocket, data: string | ArrayBuffer) {
    const message = parse(data)
    const seat = seatOf(ws)
    if (!seat) return this.admit(ws, message)
    if (seat.role === 'host') return this.relay(message)
    // After joining, a guest sends one thing: the offer for its call with me.
    if (seat.role === 'guest' && message.type === 'offer') {
      this.host()?.send(json({ type: 'offer', id: seat.id, name: seat.name, sdp: String(message.sdp) }))
    }
  }

  webSocketClose(ws: WebSocket) {
    const seat = seatOf(ws)
    this.revoke(seat?.turn)
    if (seat?.role === 'host') this.sendOut(CloseCode.gone)
    if (seat?.role === 'guest') this.host()?.send(json({ type: 'left', id: seat.id }))
  }

  webSocketError(ws: WebSocket) {
    this.webSocketClose(ws)
  }

  private async admit(ws: WebSocket, message: Record<string, unknown>) {
    if (message.type === 'open') {
      // Without a password set, nobody opens the room.
      if (!this.env.ROOM_PASSWORD || message.password !== this.env.ROOM_PASSWORD) return ws.close(CloseCode.unauthorized)
      // A newer host tab takes over. Guests were calling the old tab, so they start over too.
      const old = this.host()
      old?.serializeAttachment({ ...seatOf(old), role: 'replaced' } satisfies Seat)
      old?.close(CloseCode.replaced)
      this.sendOut(CloseCode.gone)
      const iceServers = await this.seat(ws, { role: 'host' })
      if (iceServers) ws.send(json({ type: 'opened', iceServers }))
      return
    }
    if (message.type !== 'join' || !this.host()) return ws.close(CloseCode.closed)
    if (this.guests().length + 1 >= ROOM_CAPACITY) return ws.close(CloseCode.full)
    // The id is made here, so a guest can't speak for someone else.
    const id = crypto.randomUUID()
    const iceServers = await this.seat(ws, { role: 'guest', id, name: cleanName(message.name) })
    if (iceServers) ws.send(json({ type: 'admitted', id, iceServers }))
  }

  // Takes the place before asking Cloudflare for relay credentials, so nobody slips past the
  // capacity check meanwhile. Returns nothing if the socket closed while waiting.
  private async seat(ws: WebSocket, seat: Seat) {
    ws.serializeAttachment(seat)
    const iceServers = await this.iceServers()
    const turn = iceServers.find(server => server.username)?.username
    if (ws.readyState !== WebSocket.READY_STATE_OPEN) return this.revoke(turn)
    ws.serializeAttachment({ ...seat, turn })
    return iceServers
  }

  // Short-lived TURN credentials, used by the browser only when no direct path works. Without a
  // key, or if Cloudflare doesn't answer, calls go on with STUN alone. A working day's TTL; the
  // credential is revoked as soon as its holder leaves.
  private async iceServers(): Promise<IceServer[]> {
    if (!this.env.TURN_KEY_ID) return STUN
    const response = await this.turn('generate-ice-servers', { ttl: 86_400 }).catch(() => undefined)
    return response?.ok ? (await response.json<{ iceServers: IceServer[] }>()).iceServers : STUN
  }

  private revoke(username?: string) {
    if (username) this.ctx.waitUntil(this.turn(`${username}/revoke`).catch(() => {}))
  }

  // Cloudflare's TURN key API. The key itself never leaves the Worker.
  private turn = (path: string, body?: object) => fetch(`${TURN_KEYS}/${this.env.TURN_KEY_ID}/credentials/${path}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${this.env.TURN_KEY_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: body && JSON.stringify(body),
  })

  private relay(message: Record<string, unknown>) {
    const guest = this.guests().find(ws => (seatOf(ws) as { id: string }).id === message.id)
    if (message.type === 'answer') guest?.send(json({ type: 'answer', id: String(message.id), sdp: String(message.sdp) }))
    if (message.type === 'remove') guest?.close(CloseCode.removed)
  }

  // Called by the Worker below too, to fill in the pages.
  door(): Door {
    return this.host() ? { open: true, people: this.guests().length + 1 } : CLOSED_DOOR
  }

  private host = () => this.ctx.getWebSockets().find(ws => seatOf(ws)?.role === 'host')
  private guests = () => this.ctx.getWebSockets().filter(ws => seatOf(ws)?.role === 'guest')
  private sendOut = (code: number) => this.guests().forEach(ws => ws.close(code))
}

const seatOf = (ws: WebSocket) => ws.deserializeAttachment() as Seat | null
const json = (message: FromRoom) => JSON.stringify(message)
const parse = (data: string | ArrayBuffer): Record<string, unknown> => {
  try {
    return Object(JSON.parse(String(data)))
  }
  catch {
    return {}
  }
}

export default {
  fetch: async (request, env) => {
    const { pathname } = new URL(request.url)
    const room = env.ROOM.getByName('room')
    if (pathname === ROOM_PATH) return room.fetch(request)
    if (pathname !== '/room' && pathname !== '/') return env.ASSETS.fetch(request)

    // The visitor page and the home page's Live link are static, so fill in whether I am here on
    // their way out: they are right on first paint and never change in front of the reader. A bare
    // URL asks for the whole page, never a 304 that would bring back an old answer.
    const [page, door] = await Promise.all([env.ASSETS.fetch(request.url), room.door()])
    const shown = door.open ? 'open' : 'closed'
    const rewriter = new HTMLRewriter().on('[data-when]', {
      element: (block) => {
        if (block.getAttribute('data-when') === shown) block.removeAttribute('hidden')
        else block.setAttribute('hidden', '')
      },
    })
    // The visitor page also says it in words, and hands the door to its script.
    if (pathname === '/room') {
      rewriter
        .on('[role="status"]', {
          element: (status) => {
            status.setInnerContent(doorStatus(door))
          },
        })
        .on('head', {
          element: (head) => {
            head.append(`<meta name="room-door" content='${JSON.stringify(door)}'>`, { html: true })
          },
        })
    }
    const filled = rewriter.transform(page)
    const response = new Response(filled.body, filled)
    response.headers.set('Cache-Control', 'no-store')
    response.headers.delete('ETag')
    return response
  },
} satisfies ExportedHandler<Env>
