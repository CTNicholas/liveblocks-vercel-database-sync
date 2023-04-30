import { createClient, type Room as LiveblocksRoom } from "@liveblocks/client";

// Check inside src/routes/api/auth.ts for the serverless function
export const client = createClient({
  authEndpoint: "/api/auth",
});

type Presence = Record<string, never>;
type Storage = Record<string, never>;
type UserMeta = Record<string, never>;
type RoomEvent = Record<string, never>;

export type Room = LiveblocksRoom<Presence, Storage, UserMeta, RoomEvent>;
