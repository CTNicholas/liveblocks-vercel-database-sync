<script lang="ts">
  import type { Article, Room } from "../liveblocks.config";
  import { onDestroy, onMount } from "svelte";

  export let room: Room;
  export let article: Article;

  let unsub;

  onMount(() => {
    unsub = room.subscribe(article, (updatedRoot: Article) => {
      article = updatedRoot;
    });
  });

  onDestroy(unsub);

  //$: console.log(article?.toImmutable());
</script>

<div class="max-w-screen-md mx-auto flex flex-col mt-8 px-6">
  <div class="flex justify-between">

    <input
      class="text-sm"
      type="date"
      value={new Date(article.get("date") * 1000).toISOString().split('T')[0]}
      on:input={(e) => article.set("date", new Date(e.target.value).getTime() / 1000)}
    />

    <div>
      <label for="publish">Publish</label>
      <input
        class="ml-1"
        id="publish"
        name="publish"
        type="checkbox"
        checked={article.get("publish")}
        on:input={(e) => article.set("publish", e.target.checked)}
      />
    </div>
  </div>

  <input
    placeholder="Add title"
    class="text-4xl font-extrabold tracking-tight mt-6 outline-none"
    type="text"
    value={article.get("title")}
    on:input={(e) => article.set("title", e.target.value)}
  />

  <textarea
    placeholder="Enter content"
    class="text-lg text-gray-700 mt-4 outline-none min-h-[600px] resize-none"
    on:input={(e) => article.set("content", e.target.value)}
  >{article.get("content")}</textarea>
</div>

