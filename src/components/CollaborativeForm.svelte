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

<div class="max-w-screen-md mx-auto flex flex-col mt-12">
  <div class="flex justify-between">

    <input
      type="date"
      value={article.get("date")}
      on:input={(e) => article.set("date", new Date(e.target.value).getTime())}
    />

    <div>
      <label for="publish">Publish</label>
      <input
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
    class="text-6xl font-semibold tracking-tight mt-8 border-b-2 border-transparent focus:border-gray-300 outline-none"
    type="text"
    value={article.get("title")}
    on:input={(e) => article.set("title", e.target.value)}
  />

  <input
    placeholder="Add subtitle"
    class="text-4xl font-medium mt-8 border-b-2 border-transparent focus:border-gray-300 outline-none"
    type="text"
    value={article.get("subtitle")}
    on:input={(e) => article.set("subtitle", e.target.value)}
  />

  <textarea
    placeholder="Enter content"
    class="text-xl tracking-tight mt-4 outline-none h-auto"
    on:input={(e) => article.set("content", e.target.value)}
  >{article.get("content")}</textarea>
</div>

