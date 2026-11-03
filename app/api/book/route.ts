import { NextRequest, NextResponse } from "next/server";
import { JWT } from "google-auth-library";

const CALENDAR_SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, contact, service, date, time, notes } = body as Record<string, unknown>;

  if (
    typeof name !== "string" || !name.trim() ||
    typeof contact !== "string" || !contact.trim() ||
    typeof service !== "string" || !service.trim() ||
    typeof date !== "string" || !date.trim() ||
    typeof time !== "string" || !time.trim()
  ) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!clientEmail || !privateKey || !calendarId) {
    console.error("Booking received but Google Calendar isn't configured:", {
      name,
      contact,
      service,
      date,
      time,
      notes,
    });
    return NextResponse.json(
      { error: "Booking isn't wired up to the calendar yet. Please call us instead." },
      { status: 503 }
    );
  }

  const start = new Date(`${date}T${time}:00`);
  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid date or time." }, { status: 400 });
  }
  const end = new Date(start.getTime() + 60 * 60 * 1000); // default 1hr slot — service durations aren't set yet

  try {
    const jwtClient = new JWT({ email: clientEmail, key: privateKey, scopes: CALENDAR_SCOPES });
    const { token } = await jwtClient.getAccessToken();

    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: `${service} — ${name}`,
          description: [`Contact: ${contact}`, notes ? `Notes: ${notes}` : null]
            .filter(Boolean)
            .join("\n"),
          start: { dateTime: start.toISOString() },
          end: { dateTime: end.toISOString() },
        }),
      }
    );

    if (!res.ok) {
      console.error("Google Calendar error:", await res.text());
      return NextResponse.json(
        { error: "Failed to add booking to the calendar. Please call us instead." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Google Calendar request failed:", err);
    return NextResponse.json(
      { error: "Failed to add booking to the calendar. Please call us instead." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
