import type { ResearchCollectionItem } from '@nuxt/content'

export const useResearchArticleSeo = (article: ResearchCollectionItem) => {
  const { absoluteUrl, jsonLd } = useSite()
  const canonicalUrl = absoluteUrl(article.path)
  const authors = article.authors ?? [SITE_NAME]
  const keywords = article.keywords ?? []
  const title = article.seo?.title || article.title
  const description = article.seo?.description || article.description
  const publishedTime = new Date(article.date).toISOString()
  const modifiedTime = new Date(article.updated ?? article.date).toISOString()
  const image = article.image && { ...article.image, url: absoluteUrl(article.image.src) }

  useSeoMeta({
    title,
    description,
    author: authors.join(', '),
    ogType: 'article',
    ogUrl: canonicalUrl,
    ogSiteName: SITE_NAME,
    ogLocale: 'en_US',
    ogTitle: title,
    ogDescription: description,
    ogImage: image && {
      url: image.url,
      alt: image.alt,
      width: image.width,
      height: image.height,
    },
    articlePublishedTime: publishedTime,
    articleModifiedTime: modifiedTime,
    articleAuthor: authors,
    articleTag: keywords,
    twitterCard: image ? 'summary_large_image' : 'summary',
    twitterImageAlt: image?.alt,
  })

  useHead({
    titleTemplate: `%s — ${SITE_NAME}`,
    link: [{ rel: 'canonical', href: canonicalUrl }],
    meta: [
      // Highwire Press tags used by Google Scholar.
      { name: 'citation_title', content: article.title },
      ...authors.map(author => ({ name: 'citation_author', content: author })),
      { name: 'citation_publication_date', content: publishedTime.slice(0, 10).replaceAll('-', '/') },
      { name: 'citation_language', content: 'en' },
      { name: 'citation_abstract_html_url', content: canonicalUrl },
      ...(keywords.length ? [{ name: 'citation_keywords', content: keywords.join('; ') }] : []),
      ...(article.venue ? [{ name: 'citation_journal_title', content: article.venue }] : []),
      ...(article.doi ? [{ name: 'citation_doi', content: article.doi }] : []),
    ],
    script: [jsonLd({
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      '@id': `${canonicalUrl}#article`,
      headline: title,
      name: article.title,
      description,
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      datePublished: publishedTime,
      dateModified: modifiedTime,
      inLanguage: 'en',
      ...(image ? { image: { '@type': 'ImageObject', url: image.url, width: image.width, height: image.height, caption: image.alt } } : {}),
      ...(keywords.length ? { keywords } : {}),
      author: authors.map(name => name === SITE_NAME
        ? { '@type': 'Person', '@id': absoluteUrl('/#person'), name, url: absoluteUrl('/') }
        : { '@type': 'Person', name }),
      publisher: { '@type': 'Person', '@id': absoluteUrl('/#person'), name: SITE_NAME, url: absoluteUrl('/') },
      isPartOf: [
        { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: SITE_NAME, url: absoluteUrl('/') },
        ...(article.venue ? [{ '@type': 'Periodical', name: article.venue }] : []),
      ],
      ...(article.doi ? { sameAs: `https://doi.org/${article.doi}` } : {}),
    })],
  })
}
