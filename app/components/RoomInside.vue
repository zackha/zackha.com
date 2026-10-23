<script setup lang="ts">
// The room from inside, the same for everyone: the people, each name with a quiet line under it, my
// commands under them, then any news and the room's screen. Whoever can be heard is in bold. On the
// host's page `@pick` makes every other name a button, and the way out closes the room.
const { room, member, out, onPick } = defineProps<{
  room: RoomState
  member: ReturnType<typeof useRoomMember>
  out: string
  onPick?: (person: Person) => void
}>()
const emit = defineEmits<{ out: [] }>()
const { person: me, capture, status, action, act } = member

// On stage first, then raised hands, so the host sees them, then everyone else.
const people = computed(() => [
  ...room.people.filter(person => person.role !== 'listener'),
  ...room.people.filter(person => person.role === 'listener').sort((a, b) => +b.hand - +a.hand),
])
// "host · speaking", "speaker · muted", "listening · hand raised", "listening".
const line = (person: Person) => [
  person.role === 'listener' ? 'listening' : person.role,
  room.talking.includes(person.id) ? 'speaking' : person.hand ? 'hand raised' : person.role !== 'listener' && !person.mic && 'muted',
].filter(Boolean).join(' · ')
// One shared audio and one shared screen: a share is off while someone else holds it.
const taken = (kind: keyof Sharing) => !!room.sharing[kind] && room.sharing[kind] !== me.value?.id
const screen = computed(() => member.screen.value && new MediaStream([member.screen.value]))
</script>

<template>
  <ul class="people">
    <li v-for="person in people" :key="person.id">
      <component :is="room.talking.includes(person.id) ? 'strong' : 'span'">
        <button v-if="onPick && person.role !== 'host'" type="button" @click="onPick(person)">{{ person.name }}</button>
        <template v-else>{{ person.name }}</template>
      </component>
      <small :class="{ now: room.talking.includes(person.id) }">{{ line(person) }}</small>
    </li>
  </ul>
  <div class="controls">
    <span>
      <button type="button" @click="act">{{ action }}</button>
      <template v-if="me?.role !== 'listener' && capture.canShare">
        <button
          v-for="kind in (['audio', 'screen'] as const)"
          :key="kind"
          type="button"
          :disabled="taken(kind)"
          @click="capture.tracks[kind] ? capture.stop(kind) : capture.share(kind)"
        >
          {{ capture.tracks[kind] ? 'stop sharing' : 'share' }} {{ kind }}
        </button>
      </template>
    </span>
    <button type="button" class="out" @click="emit('out')">{{ out }}</button>
  </div>
  <p role="status">{{ status }}</p>
  <video v-if="screen" :srcObject="screen" autoplay muted playsinline controls />
</template>
