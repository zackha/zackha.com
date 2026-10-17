export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl
  if (typeof siteUrl !== 'string') {
    throw new TypeError('The public site URL must be a string.')
  }

  const works = await queryCollection(event, 'research').select('path', 'date', 'updated').all()
  const urls = [
    { loc: new URL('/', siteUrl).href, lastmod: config.public.buildDate },
    ...works.map(work => ({
      loc: new URL(work.path, siteUrl).href,
      lastmod: work.updated ?? work.date,
    })),
  ]
  const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(({ loc, lastmod }) => `  <url><loc>${escapeXml(loc)}</loc><lastmod>${escapeXml(new Date(lastmod).toISOString())}</lastmod></url>`).join('\n')}\n</urlset>`

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
