# Shop landing page template

A single-page, static Next.js landing page for pitching small local businesses (barbershop, salon, etc.) a simple website. No database, no backend, no auth — just a fast, deployable mockup.

## Editing content for a shop

Everything shop-specific (name, tagline, phone, address, services/prices, gallery captions, hours, reviews) lives in `app/content.ts`. Edit that one file.

The accent color (currently amber) is set via Tailwind class names directly in `app/page.tsx` — Tailwind can't resolve dynamically-interpolated class names at build time, so it isn't in `content.ts`. To re-theme, find-replace `amber` in `app/page.tsx` for another Tailwind color.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npm run deploy
```

Builds locally, deploys to Vercel production, and checks the live URL returns 200.

## Starting the next shop

1. Copy this directory: `cp -r harvest-hub <new-shop-name>`
2. Inside the copy, remove `.vercel/`, `node_modules/`, and `.next/` so it starts as its own fresh project instead of redeploying over this one
3. Edit `app/content.ts` with the new shop's details
4. `npm install`
5. `npm run deploy`
