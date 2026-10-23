<script setup lang="ts">
// Where I open the room. Linked from nowhere; the password keeps everyone else out.
const { room, isOpen, status, title, password, capture, screen, micOn, open, close, toggleMic, invite, demote, unshare, remove } = useRoomHost()
useSeoMeta({ title, robots: 'noindex, nofollow' })

// A person's name opens their actions in the browser's own dialog; the button pressed to close it
// is the answer.
const menu = useTemplateRef<HTMLDialogElement>('menu')
const chosen = ref<Person>()
const choose = (person: Person) => {
  chosen.value = person
  menu.value!.returnValue = ''
  menu.value!.showModal()
}
const act = () => {
  const person = chosen.value
  chosen.value = undefined
  if (!person) return
  const action = menu.value!.returnValue
  if (action === 'invite') invite(person.id)
  if (action === 'listen') demote(person.id)
  if (action === 'unshare') unshare(person.id)
  if (action === 'remove' && confirm(`Remove ${person.name} from the room?`)) remove(person.id)
}
// Someone who leaves, or a room that closes, takes their dialog with them.
watch(() => chosen.value && !room.people.includes(chosen.value), gone => gone && menu.value?.close())
</script>

<template>
  <main>
    <template v-if="!isOpen">
      <p role="status">{{ status }}</p>
      <form @submit.prevent="open(($event.target as HTMLFormElement).password.value)">
        <label>Password <input name="password" type="password" required autocomplete="current-password" :value="password"></label>
        <button>Open the room</button>
        <p><small>This browser remembers it once the room opens.</small></p>
      </form>
    </template>

    <!-- The lists come first; any news goes under the buttons. -->
    <template v-else>
      <RoomPeople v-bind="room" me="host" @pick="choose" />
      <p>
        <button type="button" @click="toggleMic">Turn mic {{ micOn ? 'off' : 'on' }}</button>
        <RoomShare :capture :sharing="room.sharing" me="host" />
        <button type="button" @click="close()">Close the room</button>
      </p>
      <p role="status">{{ status }}</p>
      <video v-if="screen" :srcObject="screen" autoplay muted playsinline controls />
    </template>

    <dialog ref="menu" aria-labelledby="chosen" @close="act">
      <form v-if="chosen" method="dialog">
        <p id="chosen">{{ chosen.name }} is {{ chosen.role === 'listener' ? 'listening' : 'speaking' }}.</p>
        <button v-if="chosen.role === 'listener'" value="invite">Invite to speak</button>
        <button v-else value="listen">Move to listeners</button>
        <button v-if="Object.values(room.sharing).includes(chosen.id)" value="unshare">Stop sharing</button>
        <button value="remove">Remove from room</button>
        <button value="">Cancel</button>
      </form>
    </dialog>
  </main>
</template>
