import { sql } from "@vercel/postgres";
import { redirect, type RequestEvent } from "@sveltejs/kit";

export async function POST({ request } : RequestEvent) {
  console.log("webhook");


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
