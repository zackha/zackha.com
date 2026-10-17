export const SITE_NAME = 'Sefa Bulak'

export const useSite = () => {
  const { siteUrl, buildDate } = useRuntimeConfig().public
  if (typeof siteUrl !== 'string') throw new TypeError('The public site URL must be a string.')
  if (typeof buildDate !== 'string') throw new TypeError('The public build date must be a string.')

  const absoluteUrl = (path: string) => new URL(path, siteUrl).href
  const jsonLd = (data: Record<string, unknown>) => ({
    type: 'application/ld+json' as const,
    innerHTML: JSON.stringify(data).replaceAll('<', '\\u003c'),
  })

  return { siteUrl, buildDate, absoluteUrl, jsonLd }
}
