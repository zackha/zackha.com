<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
// Tells a reader who lands deep in the site which part of it they are in.
const sections: Record<string, string> = { research: 'Research', room: 'Room' }
const section = computed(() => sections[route.path.split('/')[1]!])
const tag = computed(() => section.value === 'Room' ? 'h1' : 'p')
</script>

<template>
  <header class="site-header" :class="{ 'site-header--home': isHome }">
    <!-- On the home page the name is the page's heading; elsewhere it is the way back home, and in
         the room, which has no heading of its own, the heading as well. -->
    <h1 v-if="isHome" class="site-name">{{ SITE_NAME }}</h1>
    <component :is="tag" v-else class="site-name">
      <NuxtLink to="/">{{ SITE_NAME }}</NuxtLink>
      <span v-if="section" class="site-section"> / <span>{{ section }}</span></span>
    </component>
  </header>
</template>
