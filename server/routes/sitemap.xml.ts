export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl
  if (typeof siteUrl !== 'string') {
    throw new TypeError('The public site URL must be a string.')
  }

  const works = await queryCollection(event, 'research').select('path', 'date', 'updated').all()
  const urls: { loc: string, lastmod?: string | Date }[] = [
    { loc: new URL('/', siteUrl).href, lastmod: config.public.buildDate },
    // Its link on the home page shows only while the room is open, so crawlers learn of it here.
    // No lastmod: what changes there is who is in the room, not the page.
    { loc: new URL('/room', siteUrl).href },
    ...works.map(work => ({
      loc: new URL(work.path, siteUrl).href,
      lastmod: work.updated ?? work.date,
    })),
  ]
  const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const entry = ({ loc, lastmod }: typeof urls[number]) => `<loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${escapeXml(new Date(lastmod).toISOString())}</lastmod>` : ''}`
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url>${entry(url)}</url>`).join('\n')}\n</urlset>`

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
