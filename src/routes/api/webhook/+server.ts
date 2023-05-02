import { sql } from "@vercel/postgres";
import { error, type RequestEvent } from "@sveltejs/kit";
import { WebhookHandler } from "@liveblocks/node";

const API_KEY = import.meta.env.VITE_LIVEBLOCKS_SECRET_KEY as string;
const WEBHOOK_SECRET = import.meta.env.VITE_WEBHOOK_SECRET as string;

// This is called by a Liveblocks "StorageUpdatedEvent" webhook
// https://liveblocks.io/docs/guides/webhooks#StorageUpdatedEvent
export async function POST({ request }: RequestEvent) {
  const webhookHandler = new WebhookHandler(WEBHOOK_SECRET);

  let event;

  // Verify webhook sent from Liveblocks
  // https://liveblocks.io/docs/api-reference/liveblocks-node#WebhookHandler
  try {
    event = webhookHandler.verifyRequest({
      headers: Object.fromEntries(request.headers),
      rawBody: await request.json(),
    });
  } catch (err) {
    console.log(err);
    // Add your signing secret from the Liveblocks webhook dashboard to VITE_WEBHOOK_SECRET in .env.local
    throw error(403, "Webhook not authorised by http://liveblocks.io");
  }

  if (event.type !== "storageUpdated") {
    throw error(501, `Webhook event not implemented: ${event.type}`);
  }

  if (!event?.data) {
    throw error(400, "No data returned from webhook");
  }

  const { roomId } = event.data;

  // Get storage contents
  const response = await fetch(
    `https://api.liveblocks.io/v2/rooms/${roomId}/storage`,
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
  VALUES (${roomId}, ${title}, ${content}, ${date}, ${publish})
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

  return new Response(JSON.stringify({ success: true, roomId: roomId }), {
    status: 200,
  });
}
