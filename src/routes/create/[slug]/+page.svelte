<script lang="ts">
  import { client, type Room } from "../../../liveblocks.config";
  import { onDestroy, onMount } from "svelte";
  import App from "../../../components/App.svelte";
  import { LiveObject } from "@liveblocks/client";
  import { page } from "$app/stores";

  const roomId = $page.params.slug;
  let room: Room;

  onMount(() => {
    room = client.enter(roomId, {
      initialPresence: {},
      initialStorage: {
        article: new LiveObject({
          title: "",
          subtitle: "",
          content: "",
          date: Date.now(),
          publish: false,
        }),
      },
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
