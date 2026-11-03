# Shop landing page template

A single-page Next.js landing page for pitching small local businesses (barbershop, salon, etc.) a simple website, plus a basic booking form. No database, no auth — just a fast, deployable site with one serverless function for bookings.

## Editing content for a shop

Everything shop-specific (name, tagline, phone, address, services/prices, gallery images, hours, reviews) lives in `app/content.ts`. Edit that one file.

The accent color (currently amber) is set via Tailwind class names directly in `app/page.tsx` — Tailwind can't resolve dynamically-interpolated class names at build time, so it isn't in `content.ts`. To re-theme, find-replace `amber` in `app/page.tsx` for another Tailwind color.

### Gallery images

Drop image files into `public/gallery/` and set the matching `src` (e.g. `"/gallery/lashes-1.jpg"`) on the corresponding entry in `GALLERY_ITEMS` in `app/content.ts`. Entries with `src: null` render as a placeholder tile instead.

## Booking form

The "Book Now" section posts to `app/api/book/route.ts`, which emails the booking to the shop via [Resend](https://resend.com). Copy `.env.example` to `.env.local` and fill in:

- `RESEND_API_KEY` — from your Resend account
- `BOOKING_NOTIFICATION_EMAIL` — the address that should receive booking requests

Without these set, the form still works but bookings are only logged server-side (no email sent), and the visitor sees a "call us instead" message.

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
