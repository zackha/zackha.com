export default defineEventHandler((event) => {
  const siteUrl = useRuntimeConfig(event).public.siteUrl
  if (typeof siteUrl !== 'string') {
    throw new TypeError('The public site URL must be a string.')
  }

  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', siteUrl).href}\n`
})
