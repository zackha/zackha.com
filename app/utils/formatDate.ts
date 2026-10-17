export const formatDate = (date: Date | string, dateStyle: 'medium' | 'long' = 'medium') =>
  new Intl.DateTimeFormat('en-US', { dateStyle, timeZone: 'UTC' }).format(new Date(date))

export const isoDate = (date: Date | string) => new Date(date).toISOString().slice(0, 10)
