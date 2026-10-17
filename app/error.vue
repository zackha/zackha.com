<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => notFound.value ? 'Page not found — Sefa Bulak' : 'Error — Sefa Bulak',
  robots: 'noindex, follow',
})
</script>

<template>
  <main>
    <h1>{{ notFound ? 'Page not found' : 'Something went wrong' }}</h1>
    <p>{{ notFound ? 'The page you are looking for does not exist or has moved.' : 'Please try again later.' }}</p>
    <a href="/" @click.prevent="clearError({ redirect: '/' })">← Home</a>
  </main>
</template>
