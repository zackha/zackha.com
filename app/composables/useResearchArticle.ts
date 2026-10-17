export const useResearchArticle = async (path: string) => {
  const [{ data: work }, { latestArticles }] = await Promise.all([
    useAsyncData(`research-${path}`, () => queryCollection('research').path(path).first()),
    useResearchArticles(),
  ])

  if (!work.value) {
    throw createError({ statusCode: 404, statusMessage: 'Research item not found', fatal: true })
  }

  const currentWork = work.value
  const currentArticleIndex = latestArticles.value.findIndex(article => article.path === currentWork.path)
  const previousArticle = latestArticles.value[currentArticleIndex + 1]
  const newerArticle = currentArticleIndex > 0 ? latestArticles.value[currentArticleIndex - 1] : undefined

  return { article: currentWork, previousArticle, newerArticle }
}
