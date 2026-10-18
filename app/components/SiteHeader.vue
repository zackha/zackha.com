<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
// Tells a reader who lands deep in the site which part of it they are in.
const section = computed(() => route.path.startsWith('/research/') ? 'Research' : undefined)
</script>

<template>
  <header class="site-header" :class="{ 'site-header--home': isHome }">
    <!-- On the home page the name is the page's heading; elsewhere it is the way back home. -->
    <h1 v-if="isHome" class="site-name">{{ SITE_NAME }}</h1>
    <p v-else class="site-name">
      <NuxtLink to="/">{{ SITE_NAME }}</NuxtLink>
      <span v-if="section" class="site-section"> / <span>{{ section }}</span></span>
    </p>
  </header>
</template>
