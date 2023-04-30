import {
  createClient,
  type LiveObject,
  type Room as LiveblocksRoom,
} from "@liveblocks/client";

// Check inside src/routes/api/auth.ts for the serverless function
export const client = createClient({
  authEndpoint: "/api/auth",
});

type Presence = Record<string, never>;
type UserMeta = Record<string, never>;
type RoomEvent = Record<string, never>;

export type Article = LiveObject<{
  title: string;
  subtitle: string;
  content: string;
  slug: string;
  date: number;
}>;

type Storage = {
  article: Article;
};

export type Room = LiveblocksRoom<Presence, Storage, UserMeta, RoomEvent>;
export type Root = LiveObject<Storage>;
