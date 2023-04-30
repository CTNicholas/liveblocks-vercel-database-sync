<script lang="ts">
  import { client, type Room } from "../liveblocks.config";
  import { onDestroy, onMount } from "svelte";
  import App from "../components/App.svelte";

  const roomId = "vercel-database-sync";
  let room: Room;

  onMount(() => {
    room = client.enter(roomId, {
      initialPresence: {},
      initialStorage: {},
    }) as Room;
  });

  onDestroy(() => {
    if (client && room) {
      client.leave(roomId);
    }
  });
</script>

{#if room}
  <App {room} />
{/if}
