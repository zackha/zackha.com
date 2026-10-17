<script setup lang="ts">
const route = useRoute()
const { article, previousArticle, newerArticle } = await useResearchArticle(route.path)
useResearchArticleSeo(article)
</script>

<template>
  <main class="article-page">
    <header class="page-header">
      <NuxtLink to="/">← Home</NuxtLink>
    </header>

    <article class="research-article">
      <header>
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <p class="article-meta">
          By {{ (article.authors ?? ['Sefa Bulak']).join(', ') }} · Published:
          <time :datetime="isoDate(article.date)">{{ formatDate(article.date, 'long') }}</time>
          <template v-if="article.updated">
            · Last updated: <time :datetime="isoDate(article.updated)">{{ formatDate(article.updated, 'long') }}</time>
          </template>
        </p>
      </header>

      <ContentRenderer class="article-content" :value="article" />
    </article>

    <footer v-if="previousArticle || newerArticle">
      <nav class="article-navigation" aria-label="Article navigation">
        <NuxtLink v-if="previousArticle" :to="previousArticle.path">← Previous article</NuxtLink>
        <NuxtLink v-if="newerArticle" class="newer-article" :to="newerArticle.path">Newer article →</NuxtLink>
      </nav>
    </footer>
  </main>
</template>
