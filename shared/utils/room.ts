export const ROOM_PATH = '/room/ws'
export const ROOM_CAPACITY = 10

// Why the Worker closed a socket; the pages turn each into a sentence. 4000-4999 is for apps.
export const CloseCode = {
  unauthorized: 4401,
  removed: 4403,
  closed: 4404,
  full: 4409,
  gone: 4410,
  replaced: 4412,
} as const

// One line, at most 24 characters, and nobody else gets to be Sefa.
export const cleanName = (name: unknown) => {
  const clean = String(name ?? '').replace(/\s+/g, ' ').trim().slice(0, 24) || 'Guest'
  return /^sefa$/i.test(clean) ? 'Sefa (guest)' : clean
}
