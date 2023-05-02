https://user-images.githubusercontent.com/33033422/235533924-823133e2-3f9b-4f62-8c4c-8e5918585995.mp4

## Vercel database + Liveblocks sync demo

This demo shows you how to use SvelteKit to sync
a [Vercel database](https://vercel.com/blog/vercel-storage#vercel-postgres-complex-data-made-easy) with your
Liveblocks [conflict-free data](https://liveblocks.io/conflict-free-data-types),
using [webhooks](https://liveblocks.io/docs/guides/webhooks).

### Set up Liveblocks

- Install all dependencies with `npm install`
- Create an account on [liveblocks.io](https://liveblocks.io/dashboard)
- Copy your **secret** key from the [dashboard](https://liveblocks.io/dashboard/apikeys)
- Create an `.env.local` file and add your **secret** key as the `VITE_LIVEBLOCKS_SECRET_KEY` environment
  variable
- Set up your StorageUpdatedEvent [webhook](https://liveblocks.io/docs/guides/webhooks) on the webhooks [dashboard](https://liveblocks.io/dashboard/)
- Add the **signing secret** from this page to `.env.local` as the `VITE_WEBHOOK_SECRET` enrivonment variable
- Run `npm run dev` and go to [http://localhost:5173](http://localhost:5173)
