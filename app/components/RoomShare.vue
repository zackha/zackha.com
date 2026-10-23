<script setup lang="ts">
// The two share buttons, mine and every speaker's. The room has one shared audio and one shared
// screen, so a button is off while someone else holds its slot.
const { capture, sharing, me } = defineProps<{ capture: ReturnType<typeof useCapture>, sharing: Sharing, me: string }>()
</script>

<template>
  <template v-if="capture.canShare">
    <button
      v-for="kind in (['audio', 'screen'] as const)"
      :key="kind"
      type="button"
      :disabled="!!sharing[kind] && sharing[kind] !== me"
      @click="capture.tracks[kind] ? capture.stop(kind) : capture.share(kind)"
    >
      {{ capture.tracks[kind] ? 'Stop sharing' : 'Share' }} {{ kind }}
    </button>
  </template>
</template>
