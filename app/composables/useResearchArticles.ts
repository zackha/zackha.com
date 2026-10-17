export const useResearchArticles = async () => {
  const { data: articles } = await useAsyncData('research-articles', () =>
    queryCollection('research').select('path', 'title', 'date', 'updated', 'pdf').all(),
  )

  const latestArticles = computed(() =>
    [...(articles.value ?? [])].sort((a, b) =>
      new Date(b.updated ?? b.date).getTime() - new Date(a.updated ?? a.date).getTime(),
    ),
  )

  return { latestArticles }
}
