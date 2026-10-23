<script setup lang="ts">
// Everyone in the room, as two plain lists. Whoever can be heard right now is in bold. With `@pick`
// (the host's page), everyone else's name is a button that picks that person.
const { people, talking, sharing, me, onPick } = defineProps<{
  people: Person[]
  talking: string[]
  sharing: Sharing
  me?: string
  onPick?: (person: Person) => void
}>()

const groups = computed(() => ({
  Speaking: people.filter(person => person.role !== 'listener'),
  // Raised hands first, so the host sees them.
  Listening: people.filter(person => person.role === 'listener').sort((a, b) => +b.hand - +a.hand),
}))

const notes = (person: Person) => [
  person.role === 'host' && person.id !== me && 'host',
  person.id === me && 'you',
  person.role !== 'listener' && !person.mic && 'muted',
  person.hand && 'hand raised',
  sharing.screen === person.id && 'sharing screen',
  sharing.audio === person.id && 'sharing audio',
].filter(Boolean).join(', ')
</script>

<template>
  <template v-for="(group, heading) in groups" :key="heading">
    <template v-if="group.length">
      <h2>{{ heading }}</h2>
      <ul>
        <li v-for="person in group" :key="person.id">
          <component :is="talking.includes(person.id) ? 'strong' : 'span'">
            <button v-if="onPick && person.id !== me" type="button" @click="onPick(person)">{{ person.name }}</button>
            <template v-else>{{ person.name }}</template>
          </component>
          <template v-if="notes(person)"> ({{ notes(person) }})</template>
        </li>
      </ul>
    </template>
  </template>
</template>
