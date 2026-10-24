export const useRoomSeo = () => {
  const title = `Room — ${SITE_NAME}`
  const description = 'A voice room that is open while I work. Listen in, and raise your hand to talk.'
  const { absoluteUrl, jsonLd, ogImage } = useSite()
  const roomUrl = absoluteUrl('/room')
  const image = ogImage('room', title)
  // Inlined, not just referenced by @id: search engines read each page's graph on its own.
  const person = { '@type': 'Person', '@id': absoluteUrl('/#person'), name: SITE_NAME, url: absoluteUrl('/') }

  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogUrl: roomUrl,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    twitterCard: 'summary_large_image',
    twitterImageAlt: image.alt,
  })

  useHead({
    link: [{ rel: 'canonical', href: roomUrl }],
    script: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${roomUrl}#page`,
          url: roomUrl,
          name: title,
          description,
          inLanguage: 'en',
          isPartOf: { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: SITE_NAME, url: absoluteUrl('/') },
          author: person,
        },
        // The same trail the site header shows: "Sefa Bulak / Room".
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: 'Room', item: roomUrl },
          ],
        },
      ],
    })],
  })
}
