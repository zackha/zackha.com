export interface Person {
  id: string
  name: string
  role: 'host' | 'speaker' | 'listener'
  mic: boolean
  hand: boolean
}

// The one shared tab's audio and the one shared screen, each by the id of whoever shares it.
export interface Sharing {
  audio?: string
  screen?: string
}

// The room as the host's browser sees it; guests get a copy whenever it changes.
export interface RoomState {
  people: Person[]
  talking: string[]
  sharing: Sharing
}

// What the visitor page learns before joining.
export interface Door {
  open: boolean
  people: number
}

// The only things a guest can ask of the host.
export type GuestRequest = Partial<Pick<Person, 'hand' | 'mic'> & Record<keyof Sharing, boolean>>

// What `RTCPeerConnection` takes, spelled out because the Worker has no DOM types.
export interface IceServer {
  urls: string | string[]
  username?: string
  credential?: string
}

// Over the room's WebSocket, to and from the Worker.
export type ToRoom =
  | { type: 'open', password: string }
  | { type: 'join', name: string }
  | { type: 'offer', sdp: string }
  | { type: 'answer', id: string, sdp: string }
  | { type: 'remove', id: string }

export type FromRoom =
  | { type: 'opened', iceServers: IceServer[] }
  | { type: 'admitted', id: string, iceServers: IceServer[] }
  | { type: 'offer', id: string, name: string, sdp: string }
  | { type: 'answer', id: string, sdp: string }
  | { type: 'left', id: string }
