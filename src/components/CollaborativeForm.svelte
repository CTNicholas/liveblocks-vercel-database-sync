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

<input
  type="text"
  value={article.get("title")}
  on:input={(e) => article.set("title", e.target.value)}
/>

<input
  type="text"
  value={article.get("subtitle")}
  on:input={(e) => article.set("subtitle", e.target.value)}
/>

<input
  type="text"
  value={article.get("slug")}
  on:input={(e) => article.set("slug", e.target.value)}
/>

<input
  type="date"
  value={article.get("date")}
  on:input={(e) => article.set("date", new Date(e.target.value).getTime())}
/>

<textarea
  on:input={(e) => article.set("content", e.target.value)}
>{article.get("content")}</textarea>

