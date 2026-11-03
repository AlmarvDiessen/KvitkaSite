import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { SHOP_NAME } from "../../content";

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

  const apiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.BOOKING_NOTIFICATION_EMAIL;

  if (!apiKey || !notificationEmail) {
    console.error("Booking received but RESEND_API_KEY / BOOKING_NOTIFICATION_EMAIL not configured:", {
      name,
      contact,
      service,
      date,
      time,
      notes,
    });
    return NextResponse.json(
      { error: "Booking isn't wired up to email yet. Please call us instead." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `${SHOP_NAME} Bookings <onboarding@resend.dev>`,
    to: notificationEmail,
    subject: `New booking request: ${service} for ${name}`,
    text: [
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Service: ${service}`,
      `Date: ${date}`,
      `Time: ${time}`,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send booking. Please call us instead." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
