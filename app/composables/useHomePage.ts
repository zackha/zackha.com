export const useHomePage = async () => {
  // Search results cut descriptions at about 155–160 characters; keep this within that.
  const title = `${SITE_NAME} — Software Engineer & Researcher`
  const description = 'Sefa Bulak is a software engineer and researcher. Writing software since 2016, from e-commerce and ERP integrations to mobile apps and open source in Vue.'
  const { buildDate, absoluteUrl, jsonLd, ogImage } = useSite()
  const homeUrl = absoluteUrl('/')
  const image = ogImage('home', SITE_NAME)

  useSeoMeta({
    title,
    description,
    ogType: 'profile',
    ogUrl: homeUrl,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    profileFirstName: 'Sefa',
    profileLastName: 'Bulak',
    twitterCard: 'summary_large_image',
    twitterImageAlt: image.alt,
  })

  useHead({
    link: [{ rel: 'canonical', href: homeUrl }],
    script: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': absoluteUrl('/#website'),
          url: homeUrl,
          name: SITE_NAME,
          inLanguage: 'en',
          publisher: { '@id': absoluteUrl('/#person') },
        },
        {
          '@type': 'ProfilePage',
          '@id': absoluteUrl('/#profile'),
          url: homeUrl,
          name: SITE_NAME,
          description,
          inLanguage: 'en',
          dateModified: buildDate,
          isPartOf: { '@id': absoluteUrl('/#website') },
          mainEntity: { '@id': absoluteUrl('/#person') },
        },
        {
          '@type': 'Person',
          '@id': absoluteUrl('/#person'),
          name: SITE_NAME,
          url: homeUrl,
          jobTitle: 'Software Engineer and Researcher',
          sameAs: [
            'https://github.com/zackha',
            'https://x.com/ZHatlen',
            'https://prs.zackha.com',
          ],
        },
      ],
    })],
  })

  const { latestArticles } = await useResearchArticles()
  const updatedDate = isoDate(buildDate)
  const updatedLabel = formatDate(buildDate, 'long')

  const links = [
    { label: 'GitHub', href: 'https://github.com/zackha', title: 'GitHub profile', newTab: true },
    { label: "PR's", href: 'https://prs.zackha.com', title: 'Recent pull requests', newTab: true },
    { label: 'Room', href: '/room', title: 'Talk with me while I work', newTab: false },
    { label: 'Resume', href: '/Sefa_Bulak_resume.pdf', title: 'View resume (PDF)', newTab: true },
    { label: 'Sponsor', href: 'https://github.com/sponsors/zackha', title: 'Sponsor my work', newTab: true },
    { label: 'Email', href: 'mailto:zckhtln@icloud.com', title: 'Send me an email', newTab: false },
  ]

  return { latestArticles, updatedDate, updatedLabel, links }
}
