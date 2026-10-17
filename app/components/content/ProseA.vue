<script setup lang="ts">
const props = defineProps<{
  href?: string
  rel?: string
  target?: string
  title?: string
}>()

const isExternal = computed(() => /^(https?:)?\/\//i.test(props.href ?? ''))
// Static files (videos, PDFs, images) are not app routes and must bypass the client router.
const isFile = computed(() => /\.[a-z0-9]+$/i.test((props.href ?? '').split(/[?#]/)[0] ?? ''))
</script>

<template>
  <NuxtLink
    :to="props.href"
    :external="isExternal || isFile"
    :target="props.target"
    :rel="props.rel"
    :title="props.title"
    :class="isExternal ? 'external-link' : undefined"
  >
    <slot />
  </NuxtLink>
</template>
