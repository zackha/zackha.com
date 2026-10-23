<script setup lang="ts">
// Everyone in the room in one list, each name with a quiet line under it: where they are, and the
// one thing worth saying now. Whoever can be heard is in bold. With `@pick` (the host's page),
// everyone else's name is a button that picks that person.
const { people, talking, onPick } = defineProps<{
  people: Person[]
  talking: string[]
  onPick?: (person: Person) => void
}>()

// On stage first, then raised hands, so the host sees them, then everyone else.
const ordered = computed(() => [
  ...people.filter(person => person.role !== 'listener'),
  ...people.filter(person => person.role === 'listener').sort((a, b) => +b.hand - +a.hand),
])

// "host · speaking", "speaker · muted", "listening · hand raised", "listening".
const line = (person: Person) => [
  person.role === 'listener' ? 'listening' : person.role,
  talking.includes(person.id) ? 'speaking' : person.hand ? 'hand raised' : person.role !== 'listener' && !person.mic && 'muted',
].filter(Boolean).join(' · ')
</script>

<template>
  <ul class="people">
    <li v-for="person in ordered" :key="person.id">
      <component :is="talking.includes(person.id) ? 'strong' : 'span'">
        <button v-if="onPick && person.role !== 'host'" type="button" @click="onPick(person)">{{ person.name }}</button>
        <template v-else>{{ person.name }}</template>
      </component>
      <small :class="{ now: talking.includes(person.id) }">{{ line(person) }}</small>
    </li>
  </ul>
</template>
