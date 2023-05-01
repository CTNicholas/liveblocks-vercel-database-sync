import { sql } from "@vercel/postgres";
import { error, type RequestEvent } from "@sveltejs/kit";

const API_KEY = import.meta.env.VITE_LIVEBLOCKS_SECRET_KEY as string;

// This is called by a Liveblocks "StorageUpdatedEvent" webhook
// https://liveblocks.io/docs/guides/webhooks#StorageUpdatedEvent
export async function POST({ request }: RequestEvent) {
  const { data } = await request.json();

  if (!data) {
    throw error(400, "Cannot get data from webhook");
  }

  // Get storage contents
  const response = await fetch(
    `https://api.liveblocks.io/v2/rooms/${data.roomId}/storage`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw error(400, "Error getting storage");
  }

  const storage = await response.json();

  if (!storage?.data?.article?.data) {
    throw error(400, "No article data");
  }

  const { title, content, date, publish } = storage.data.article.data;

  try {
    await sql`CREATE TABLE IF NOT EXISTS articles (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  date INTEGER NOT NULL,
  publish BOOLEAN NOT NULL
);`;
    await sql`INSERT INTO articles (id, title, content, date, publish)
  VALUES (${data.roomId}, ${title}, ${content}, ${date}, ${publish})
  ON CONFLICT (id)
  DO UPDATE SET
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    date = EXCLUDED.date,
    publish = EXCLUDED.publish;
  `;
  } catch (err) {
    throw error(400, "No article data");
  }

  return new Response(JSON.stringify({ success: true, roomId: data.roomId }), {
    status: 200,
  });
}
