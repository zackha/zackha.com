// Prerendered social preview cards: /og/home.png and /og/<article-slug>.png.
export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name') ?? ''
  const slug = name.endsWith('.png') ? name.slice(0, -4) : ''

  let png: Buffer
  if (slug === 'home') {
    png = await renderOgImage({ title: 'Sefa Bulak', subtitle: 'I write software.', hideName: true })
  }
  else {
    const article = await queryCollection(event, 'research').path(`/research/${slug}`).first()
    if (!article) throw createError({ statusCode: 404, statusMessage: 'Unknown preview image' })
    png = await renderOgImage({
      eyebrow: new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(article.date)),
      title: article.seo?.title || article.title,
      section: 'Research',
    })
  }

  setResponseHeader(event, 'content-type', 'image/png')
  return png
})
