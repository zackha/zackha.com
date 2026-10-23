<script setup lang="ts">
// Where I open the room. Linked from nowhere; the password keeps everyone else out.
const { room, isOpen, status, title, capture, screen, sharing, micOn, open, close, toggleMic, invite, demote, unshare, remove } = useRoomHost()
useSeoMeta({ title, robots: 'noindex, nofollow' })

// One menu per person: it acts at once, then goes back to "Actions".
const act = (person: Person, menu: HTMLSelectElement) => {
  const action = menu.value
  menu.value = ''
  if (action === 'invite') invite(person.id)
  if (action === 'listen') demote(person.id)
  if (action === 'unshare') unshare(person.id)
  if (action === 'remove' && confirm(`Remove ${person.name} from the room?`)) remove(person.id)
}
</script>

<template>
  <main>
    <video v-if="screen" :srcObject="screen" autoplay muted playsinline controls />
    <p role="status">{{ status }}</p>

    <form v-if="!isOpen" @submit.prevent="open(($event.target as HTMLFormElement).password.value)">
      <label>Password <input name="password" type="password" required autocomplete="current-password"></label>
      <button>Open the room</button>
      <p><small>Your browser can save the password.</small></p>
    </form>

    <template v-else>
      <p v-if="sharing">{{ sharing }}</p>
      <RoomPeople v-bind="room" me="host">
        <template #default="{ person }">
          <select v-if="person.role !== 'host'" :aria-label="`Actions for ${person.name}`" @change="act(person, $event.target as HTMLSelectElement)">
            <option value="">Actions</option>
            <option v-if="person.role === 'listener'" value="invite">Invite to speak</option>
            <option v-else value="listen">Move to listeners</option>
            <option v-if="Object.values(room.sharing).includes(person.id)" value="unshare">Stop sharing</option>
            <option value="remove">Remove from room</option>
          </select>
        </template>
      </RoomPeople>
      <p>
        <button type="button" @click="toggleMic">Turn mic {{ micOn ? 'off' : 'on' }}</button>
        <RoomShare :capture :sharing="room.sharing" me="host" />
        <button type="button" @click="close()">Close the room</button>
      </p>
    </template>
  </main>
</template>
