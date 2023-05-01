import { redirect } from "@sveltejs/kit";
import { nanoid } from "nanoid";

export function load() {
  const randomId = nanoid();
  throw redirect(302, `/new/${randomId}`);
}
