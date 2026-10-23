<script setup lang="ts">
useSeoMeta({
  title: `Room — ${SITE_NAME}`,
  description: 'A voice room that is open while I work. Listen in, and raise your hand to talk.',
})

const { phase, status, room, me, action, join, act, leave } = useRoomGuest()
</script>

<template>
  <main>
    <h1>Room</h1>
    <p role="status">{{ status }}</p>

    <p v-if="phase === 'closed'">
      When I'm working, this room is open and you can talk with me. Refresh this page to check again.
    </p>

    <!-- Hidden, not removed, so the name is still there after leaving. -->
    <form v-show="phase === 'door'" @submit.prevent="join(($event.target as HTMLFormElement).nickname.value)">
      <label>Your name <input name="nickname" required maxlength="24" autocomplete="nickname"></label>
      <button>Join</button>
      <p><small>You'll join as a listener. Raise your hand to talk.</small></p>
    </form>

    <template v-if="room && me">
      <RoomPeople v-bind="room" :me="me.id" />
      <p>
        <button type="button" @click="act">{{ action }}</button>
        <button type="button" @click="leave">Leave</button>
      </p>
    </template>
  </main>
</template>
