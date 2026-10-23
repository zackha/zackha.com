<script setup lang="ts">
// Where I open the room. Linked from nowhere; the password keeps everyone else out.
const { room, isOpen, status, title, micOn, open, close, toggleMic, invite, demote, remove } = useRoomHost()
useSeoMeta({ title, robots: 'noindex, nofollow' })

// One menu per person: it acts at once, then goes back to "Actions".
const act = (person: Person, menu: HTMLSelectElement) => {
  const action = menu.value
  menu.value = ''
  if (action === 'invite') invite(person.id)
  if (action === 'listen') demote(person.id)
  if (action === 'remove' && confirm(`Remove ${person.name} from the room?`)) remove(person.id)
}
</script>

<template>
  <main>
    <p role="status">{{ status }}</p>

    <form v-if="!isOpen" @submit.prevent="open(($event.target as HTMLFormElement).password.value)">
      <label>Password <input name="password" type="password" required autocomplete="current-password"></label>
      <button>Open the room</button>
      <p><small>Your browser can save the password.</small></p>
    </form>

    <template v-else>
      <RoomPeople v-bind="room" me="host">
        <template #default="{ person }">
          <select v-if="person.role !== 'host'" :aria-label="`Actions for ${person.name}`" @change="act(person, $event.target as HTMLSelectElement)">
            <option value="">Actions</option>
            <option v-if="person.role === 'listener'" value="invite">Invite to speak</option>
            <option v-else value="listen">Move to listeners</option>
            <option value="remove">Remove from room</option>
          </select>
        </template>
      </RoomPeople>
      <p>
        <button type="button" @click="toggleMic">Turn mic {{ micOn ? 'off' : 'on' }}</button>
        <button type="button" @click="close()">Close the room</button>
      </p>
    </template>
  </main>
</template>
