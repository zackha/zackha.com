<script setup lang="ts">
const { latestArticles, updatedDate, updatedLabel, links } = await useHomePage()
</script>

<template>
  <main id="profile">
    <section aria-label="About">
      <p><strong>I write software.</strong></p>
      <p>
        I have been doing it since 2016, from e-commerce platforms and ERP
        integrations to mobile apps and open source work in the Vue ecosystem.
        I believe the most important software has not been written yet, and I
        intend to write some of it. I work in the name of God, and I am in no
        hurry.
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
          <span class="research-title">
            <NuxtLink class="visited-link" :to="work.path">{{ work.title }}</NuxtLink>
            <span v-if="work.pdf || work.zenodo" class="research-links">
              <a
                v-if="work.pdf"
                class="visited-link"
                :href="work.pdf"
                target="_blank"
                rel="noopener noreferrer"
                title="View this article as PDF"
              >PDF</a>
              <template v-if="work.pdf && work.zenodo"> · </template>
              <a
                v-if="work.zenodo"
                class="visited-link"
                :href="work.zenodo"
                target="_blank"
                rel="noopener noreferrer"
                title="View this article on Zenodo"
              >Zenodo</a>
            </span>
          </span>
        </li>
      </ul>
    </section>

    <footer>
      <small>Last updated: <time :datetime="updatedDate">{{ updatedLabel }}</time></small>
      <small>
        <!-- Shown by the Worker only while I am in the room (worker/room.ts). -->
        <span data-when="open" hidden><a class="visited-link" href="/room" title="I'm in the room now. Come talk.">Live</a> · </span>
        <a class="visited-link" href="/feed.xml" type="application/atom+xml" title="Follow new research in a feed reader">RSS</a>
        ·
        <a
          class="visited-link"
          href="https://github.com/zackha/zackha.com"
          target="_blank"
          rel="noopener noreferrer"
          title="View the source code on GitHub"
        >Source</a>
      </small>
    </footer>
  </main>
</template>
