export interface Person {
  id: string
  name: string
  role: 'host' | 'speaker' | 'listener'
  mic: boolean
  hand: boolean
}

// The room as the host's browser sees it; guests get a copy whenever it changes.
export interface RoomState {
  people: Person[]
  talking: string[]
}

// What the visitor page learns before joining.
export interface Door {
  open: boolean
  people: number
}

// The only things a guest can ask of the host.
export type GuestRequest = Partial<Pick<Person, 'hand' | 'mic'>>

// Over the room's WebSocket, to and from the Worker.
export type ToRoom =
  | { type: 'open', password: string }
  | { type: 'offer', name: string, sdp: string }
  | { type: 'answer', id: string, sdp: string }
  | { type: 'remove', id: string }

export type FromRoom =
  | { type: 'opened' }
  | { type: 'offer', id: string, name: string, sdp: string }
  | { type: 'answer', id: string, sdp: string }
  | { type: 'left', id: string }
