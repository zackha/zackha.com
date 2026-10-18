<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>

<template>
  <!-- Article images sit below the fold: defer them, and reserve their box to avoid layout shift. -->
  <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy" decoding="async">
</template>
