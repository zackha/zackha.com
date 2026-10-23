<script setup lang="ts">
useSeoMeta({
  title: `Room — ${SITE_NAME}`,
  description: 'A voice room that is open while I work. Listen in, and raise your hand to talk.',
})

const { phase, status, room, me, action, capture, screen, sharing, join, act, leave } = useRoomGuest()
</script>

<template>
  <main>
    <video v-if="screen" :srcObject="screen" autoplay muted playsinline controls />
    <p role="status">{{ status }}</p>

    <!-- `data-when` lets the Worker show the right one before the page leaves (worker/room.ts).
         Hidden, not removed, so a name typed in the form is still there after leaving. -->
    <p data-when="closed" :hidden="phase !== 'closed'">
      When I'm working, this room is open and you can talk with me. Refresh this page to check again.
    </p>

    <form data-when="open" :hidden="phase !== 'door'" @submit.prevent="join(($event.target as HTMLFormElement).nickname.value)">
      <label>Your name <input name="nickname" required maxlength="24" autocomplete="nickname"></label>
      <button>Join</button>
      <p><small>You'll join as a listener. Raise your hand to talk.</small></p>
    </form>

    <template v-if="room && me">
      <p v-if="sharing">{{ sharing }}</p>
      <RoomPeople v-bind="room" :me="me.id" />
      <p>
        <button type="button" @click="act">{{ action }}</button>
        <RoomShare v-if="me.role === 'speaker'" :capture :sharing="room.sharing" :me="me.id" />
        <button type="button" @click="leave">Leave</button>
      </p>
    </template>
  </main>
</template>
