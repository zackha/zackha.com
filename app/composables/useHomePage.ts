export const useHomePage = async () => {
  const description = 'Sefa Bulak is a software engineer and interface designer focused on modern web and mobile technologies.'
  const { buildDate, absoluteUrl, jsonLd } = useSite()
  const homeUrl = absoluteUrl('/')

  useSeoMeta({
    title: SITE_NAME,
    description,
    ogType: 'profile',
    ogUrl: homeUrl,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogTitle: SITE_NAME,
    ogDescription: description,
    profileFirstName: 'Sefa',
    profileLastName: 'Bulak',
    twitterCard: 'summary',
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
          jobTitle: 'Software Engineer and Interface Designer',
          sameAs: [
            'https://github.com/zackha',
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
    { label: 'Resume', href: '/Sefa_Bulak_resume.pdf', title: 'View resume (PDF)', newTab: true },
    { label: 'Sponsor', href: 'https://github.com/sponsors/zackha', title: 'Sponsor my work', newTab: true },
    { label: 'Email', href: 'mailto:zckhtln@icloud.com', title: 'Send me an email', newTab: false },
  ]

  return { latestArticles, updatedDate, updatedLabel, links }
}
