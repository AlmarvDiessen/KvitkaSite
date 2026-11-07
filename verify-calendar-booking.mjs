// Integration/smoke test for the booking -> Google Calendar flow.
//
// NOT a unit test: it makes real calls to the Google Calendar API, creates a
// real event, and deletes it again. Needs real credentials in .env.local to
// run at all, and isn't wired into any CI (this repo doesn't have one) — run
// it manually whenever you want to confirm the calendar integration still
// works, e.g. after rotating the service account key or any Google Cloud
// changes.
//
// Usage:
//   npm run test:calendar
//   TEST_URL=https://kvitka-centrum-salon-aldb.vercel.app npm run test:calendar

import { JWT } from "google-auth-library";
import { readFileSync, existsSync } from "fs";

const TEST_URL = process.env.TEST_URL || "http://localhost:3000";

function loadEnvLocal() {
  if (!existsSync(".env.local")) {
    return {};
  }
  return Object.fromEntries(
    readFileSync(".env.local", "utf8")
      .split("\n")
      .filter((l) => l.includes("=") && !l.startsWith("#"))
      .map((l) => {
        const idx = l.indexOf("=");
        const key = l.slice(0, idx);
        let val = l.slice(idx + 1);
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        return [key, val];
      })
  );
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

const envFile = loadEnvLocal();
const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || envFile.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY || envFile.GOOGLE_PRIVATE_KEY;
const calendarId = process.env.GOOGLE_CALENDAR_ID || envFile.GOOGLE_CALENDAR_ID;

if (!clientEmail || !privateKeyRaw || !calendarId) {
  fail(
    "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY / GOOGLE_CALENDAR_ID.\n" +
      "  Set them in .env.local (see README.md's \"One-time Google Calendar setup\")."
  );
}
const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

// Tomorrow at 15:00, so it never collides with a real past/present booking.
const testDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
const dateStr = testDate.toISOString().slice(0, 10);
const timeStr = "15:00";
const testName = "[Automated Test] verify-calendar-booking.mjs";

console.log(`Target: ${TEST_URL}`);
console.log(`Booking: ${dateStr} ${timeStr}\n`);

// 1. POST a test booking through the real app code, not a re-implementation.
console.log("1. Submitting test booking to /api/book...");
const bookRes = await fetch(`${TEST_URL}/api/book`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: testName,
    contact: calendarId,
    service: "Lash Extensions",
    date: dateStr,
    time: timeStr,
    notes: "Created by verify-calendar-booking.mjs — safe to delete.",
  }),
});

const bookBody = await bookRes.json().catch(() => ({}));
if (!bookRes.ok || !bookBody.ok) {
  fail(`/api/book returned ${bookRes.status}: ${JSON.stringify(bookBody)}`);
}
console.log("   ✓ API returned { ok: true }\n");

// 2. Independently verify via the Calendar API itself — the real proof.
console.log("2. Checking the Google Calendar API directly...");
const jwtClient = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/calendar.events"],
});
const { token } = await jwtClient.getAccessToken();

const dayStart = new Date(`${dateStr}T00:00:00Z`).toISOString();
const dayEnd = new Date(new Date(dayStart).getTime() + 24 * 60 * 60 * 1000).toISOString();

const listRes = await fetch(
  `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events` +
    `?timeMin=${encodeURIComponent(dayStart)}&timeMax=${encodeURIComponent(dayEnd)}` +
    `&q=${encodeURIComponent("Automated Test")}`,
  { headers: { Authorization: `Bearer ${token}` } }
);

if (!listRes.ok) {
  fail(`Calendar API list request failed: ${listRes.status} ${await listRes.text()}`);
}
const listBody = await listRes.json();
const event = listBody.items?.find((ev) => ev.summary?.includes(testName));

if (!event) {
  fail("Booking API said success, but no matching event was found on the calendar.");
}
console.log(`   ✓ Found event "${event.summary}" at ${event.start?.dateTime}\n`);

// 3. Clean up — tests shouldn't leave side effects.
console.log("3. Deleting the test event...");
const delRes = await fetch(
  `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${event.id}`,
  { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
);
if (delRes.status !== 204) {
  fail(`Cleanup failed (status ${delRes.status}) — delete event ${event.id} manually.`);
}
console.log("   ✓ Deleted\n");

console.log("PASS — booking creates a real event on the calendar, end to end.");
