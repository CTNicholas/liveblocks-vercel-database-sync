import { sql } from "@vercel/postgres";
//import { redirect, type RequestEvent } from "@sveltejs/kit";

import type { RequestEvent } from "@sveltejs/kit";

const API_KEY = import.meta.env.VITE_LIVEBLOCKS_SECRET_KEY as string;

export async function POST({ request }: RequestEvent) {
  console.log("webhook request:");

  const { data } = await request.json();

  if (!data) {
    throw new Error("Cannot get data from webhook");
  }

  const response = await fetch(
    `https://api.liveblocks.io/v2/rooms/${data.roomId}/storage`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error getting storage");
  }

  const storage = await response.json();

  if (!storage?.data?.article?.data) {
    throw new Error("No article data");
  }

  const { title, subtitle, content, date, publish } = storage.data.article.data;

  console.log(data, storage.data.article.data);

  const sqlResponse =
    await sql`INSERT INTO articles (id, title, subtitle, content, date, publish)
VALUES (${data.roomId}, ${title}, ${subtitle}, ${content}, ${date}, ${publish})
ON CONFLICT (id)
DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content = EXCLUDED.content,
  date = EXCLUDED.date,
  publish = EXCLUDED.publish;
`;

  console.log(sqlResponse);

  /*
  const data = await request.formData();
  const { rows } = await sql`
      INSERT INTO products (name)
      VALUES (CHRIS)
    `;
    */

  return new Response(JSON.stringify({ success: true, roomId: data.roomId }), {
    status: 200,
  });
}

/*
export async function POST({ request } : RequestEvent) {
  console.log("webhook");

  console.log(request.body);


  const data = await request.formData();
  const { rows } = await sql`
      INSERT INTO products (name)
      VALUES (CHRIS)
    `;

  throw redirect(303, `/product/${rows[0].slug}`);
}



return new Response(JSON.stringify({ success: true }), { status: 400 });
//return new Response(response.body, { status: response.status });
}
 */
