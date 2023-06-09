import { json, type RequestEvent } from "@sveltejs/kit";
import { authorize } from "@liveblocks/node";

const API_KEY = import.meta.env.VITE_LIVEBLOCKS_SECRET_KEY as string;
const API_KEY_WARNING =
  `Create an \`.env.local\` file and add your secret key from https://liveblocks.io/dashboard/apikeys as the \`VITE_LIVEBLOCKS_SECRET_KEY\` environment variable.\n` +
  `Learn more: https://github.com/liveblocks/liveblocks/tree/main/examples/sveltekit-live-cursors#getting-started.`;

// Authorise Liveblocks
export async function POST({ request }: RequestEvent) {
  const { room } = await request.json();

  if (!API_KEY) {
    console.warn(API_KEY_WARNING);

    return json(
      { message: API_KEY_WARNING },
      {
        status: 403,
      }
    );
  }

  if (!room) {
    return new Response(undefined, { status: 403 });
  }

  const response = await authorize({
    room: room,
    secret: API_KEY,
    userId: `user-${Math.floor(Math.random() * 10)}`,
  });

  return new Response(response.body, { status: response.status });
}
