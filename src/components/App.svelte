<script lang="ts">
  import { type Room } from "../liveblocks.config";
  import { onMount } from "svelte";
  import CollaborativeForm from "./CollaborativeForm.svelte";

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
  Loading
{:else}
  <div class="">
    <CollaborativeForm room={room} article={root.get("article")} />
  </div>
{/if}

<main>

</main>
