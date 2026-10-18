import type { ResearchCollectionItem } from '@nuxt/content'

const imageTypes: Record<string, 'image/jpeg' | 'image/png' | 'image/webp' | undefined> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

export const useResearchArticleSeo = (article: ResearchCollectionItem) => {
  const { absoluteUrl, jsonLd, ogImage } = useSite()
  const canonicalUrl = absoluteUrl(article.path)
  const slug = article.path.split('/').pop()!
  const authors = article.authors ?? [SITE_NAME]
  const keywords = article.keywords ?? []
  const title = article.seo?.title || article.title
  const description = article.seo?.description || article.description
  const publishedTime = new Date(article.date).toISOString()
  const modifiedTime = new Date(article.updated ?? article.date).toISOString()
  const pdfUrl = article.pdf && absoluteUrl(article.pdf)
  const doiUrl = article.doi && `https://doi.org/${article.doi}`
  // An article's own image wins; otherwise its generated title card (server/routes/og).
  const image = article.image
    ? {
        url: absoluteUrl(article.image.src),
        alt: article.image.alt,
        width: article.image.width,
        height: article.image.height,
        type: imageTypes[article.image.src.split('.').pop()?.toLowerCase() ?? ''],
      }
    : ogImage(slug, title)

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
    ogImage: image,
    articlePublishedTime: publishedTime,
    articleModifiedTime: modifiedTime,
    articleAuthor: authors,
    articleSection: 'Research',
    articleTag: keywords,
    twitterCard: 'summary_large_image',
    twitterImageAlt: image.alt,
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
      ...(pdfUrl ? [{ name: 'citation_pdf_url', content: pdfUrl }] : []),
      ...(keywords.length ? [{ name: 'citation_keywords', content: keywords.join('; ') }] : []),
      ...(article.venue ? [{ name: 'citation_journal_title', content: article.venue }] : []),
      ...(article.doi ? [{ name: 'citation_doi', content: article.doi }] : []),
    ],
    script: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ScholarlyArticle',
          '@id': `${canonicalUrl}#article`,
          headline: title,
          name: article.title,
          description,
          abstract: article.description,
          url: canonicalUrl,
          mainEntityOfPage: canonicalUrl,
          datePublished: publishedTime,
          dateModified: modifiedTime,
          inLanguage: 'en',
          image: { '@type': 'ImageObject', url: image.url, width: image.width, height: image.height, caption: image.alt },
          ...(keywords.length ? { keywords } : {}),
          author: authors.map(name => name === SITE_NAME
            ? { '@type': 'Person', '@id': absoluteUrl('/#person'), name, url: absoluteUrl('/') }
            : { '@type': 'Person', name }),
          publisher: { '@type': 'Person', '@id': absoluteUrl('/#person'), name: SITE_NAME, url: absoluteUrl('/') },
          isPartOf: [
            { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: SITE_NAME, url: absoluteUrl('/') },
            ...(article.venue ? [{ '@type': 'Periodical', name: article.venue }] : []),
          ],
          ...(article.doi ? { identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: article.doi, url: doiUrl } } : {}),
          ...(doiUrl || article.zenodo ? { sameAs: [doiUrl, article.zenodo].filter(Boolean) } : {}),
          ...(pdfUrl ? { encoding: { '@type': 'MediaObject', contentUrl: pdfUrl, encodingFormat: 'application/pdf' } } : {}),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: SITE_NAME, item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl },
          ],
        },
      ],
    })],
  })
}
