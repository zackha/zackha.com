<script setup lang="ts">
useRoomSeo()

const { phase, status, room, member, me, join, leave } = useRoomGuest()
</script>

<template>
  <main>
    <!-- Outside the room the line says where the door stands. Inside, the people come first, the
         commands under them, then any news and the shared screen. -->
    <p v-if="!me" role="status">{{ status }}</p>

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

    <RoomInside v-if="room && me" :room :member out="leave" @out="leave" />
  </main>
</template>
