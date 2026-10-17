<script setup lang="ts">
const { latestArticles, updatedDate, updatedLabel, links } = await useHomePage()
</script>

<template>
  <main id="profile">
    <header><h1>Sefa Bulak</h1></header>

    <section aria-label="About">
      <p><strong>Progress begins with a better question.</strong></p>
      <p>
        A software engineer and interface designer exploring how digital
        products can expand the ways people think, create, and solve problems.
      </p>
      <p>
        Working across design and engineering, with a focus on questioning
        established approaches when they limit clarity, usefulness, or
        creative possibility. Innovation is not novelty for its own sake, but
        the thoughtful application of technology to create meaningful
        improvements.
      </p>
    </section>

    <nav aria-label="Links">
      <ul>
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            :target="link.newTab ? '_blank' : undefined"
            :rel="link.newTab ? 'noopener noreferrer' : undefined"
            :title="link.title"
          >{{ link.label }}</a>
        </li>
      </ul>
    </nav>

    <section v-if="latestArticles.length" class="research" aria-labelledby="research-heading">
      <h2 id="research-heading">Research</h2>
      <ul class="research-list">
        <li v-for="work in latestArticles" :key="work.path">
          <time :datetime="isoDate(work.updated ?? work.date)">
            {{ formatDate(work.updated ?? work.date) }}
          </time>
          <NuxtLink class="visited-link" :to="work.path">{{ work.title }}</NuxtLink>
        </li>
      </ul>
    </section>

    <footer>
      <small>Last updated: <time :datetime="updatedDate">{{ updatedLabel }}</time></small>
    </footer>
  </main>
</template>
