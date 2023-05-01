<script lang="ts">
  import { type Room } from "../liveblocks.config";
  import { onMount } from "svelte";
  import CollaborativeForm from "./CollaborativeForm.svelte";
  import Loading from "./Loading.svelte";

  /**
   * The main Liveblocks code for the example.
   * Check in src/routes/+page.svelte to see the setup code.
   */
  export let room: Room;
  export let root;

  onMount(() => {
    async function load() {
      const storage = await room.getStorage();
      root = storage.root;
    }

    load();
  });
</script>

{#if !root}
  <Loading />
{:else}
  <div class="">
    <CollaborativeForm room={room} article={root.get("article")} />
  </div>
{/if}

<a
  class="fixed bottom-3 right-3 z-10"
  href="https://liveblocks.io"
  rel="noreferrer"
  target="_blank"
>
  <img
    src="https://liveblocks.io/badge-light.svg"
    alt="Made with Liveblocks"
  />
</a>
