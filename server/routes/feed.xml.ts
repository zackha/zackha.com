// Atom feed of research articles, newest first, for feed readers and aggregators.
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl
  if (typeof siteUrl !== 'string') {
    throw new TypeError('The public site URL must be a string.')
  }

  const works = await queryCollection(event, 'research')
    .select('path', 'title', 'description', 'date', 'updated', 'authors', 'keywords', 'pdf')
    .all()
  works.sort((a, b) => new Date(b.updated ?? b.date).getTime() - new Date(a.updated ?? a.date).getTime())

  const escapeXml = (value: string) => value
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  const iso = (date: string | Date) => new Date(date).toISOString()
  const absolute = (path: string) => new URL(path, siteUrl).href
  const feedUpdated = works.length ? iso(works[0]!.updated ?? works[0]!.date) : iso(config.public.buildDate as string)

  const entries = works.map(work => `  <entry>
    <title>${escapeXml(work.title)}</title>
    <link rel="alternate" type="text/html" href="${escapeXml(absolute(work.path))}"/>
${work.pdf ? `    <link rel="related" type="application/pdf" title="PDF" href="${escapeXml(absolute(work.pdf))}"/>\n` : ''}    <id>${escapeXml(absolute(work.path))}</id>
    <published>${iso(work.date)}</published>
    <updated>${iso(work.updated ?? work.date)}</updated>
${(work.authors ?? ['Sefa Bulak']).map(name => `    <author><name>${escapeXml(name)}</name></author>`).join('\n')}
${(work.keywords ?? []).map(keyword => `    <category term="${escapeXml(keyword)}"/>`).join('\n')}
    <summary>${escapeXml(work.description)}</summary>
  </entry>`)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
  <title>Sefa Bulak — Research</title>
  <subtitle>Research articles by Sefa Bulak.</subtitle>
  <link rel="alternate" type="text/html" href="${escapeXml(absolute('/'))}"/>
  <link rel="self" type="application/atom+xml" href="${escapeXml(absolute('/feed.xml'))}"/>
  <id>${escapeXml(absolute('/'))}</id>
  <updated>${feedUpdated}</updated>
  <author><name>Sefa Bulak</name><uri>${escapeXml(absolute('/'))}</uri></author>
  <icon>${escapeXml(absolute('/apple-touch-icon.png'))}</icon>
${entries.join('\n')}
</feed>
`

  setResponseHeader(event, 'content-type', 'application/atom+xml; charset=utf-8')
  return xml
})
