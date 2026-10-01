import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function clean(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const record = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const name = clean(record.name, 120);
  const email = clean(record.email, 200);
  if (!name || !EMAIL.test(email)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sid = process.env.TWILIO_API_KEY_SID;
  const secret = process.env.TWILIO_API_KEY_SECRET;
  const from = process.env.TWILIO_FROM_EMAIL;
  const to = process.env.LEAD_TO_EMAIL;
  if (!sid || !secret || !from || !to) {
    console.error("Lead mail is missing Twilio environment variables.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const auth = Buffer.from(`${sid}:${secret}`).toString("base64");
  let response: Response;
  try {
    response = await fetch("https://comms.twilio.com/v1/Emails", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { address: from, name: "OrtoKore" },
        to: [{ address: to, name: "OrtoKore" }],
        content: {
          subject: `OrtoKore · ${name}`,
          text: `Nombre: ${name}\nCorreo: ${email}`,
          html: `<p><strong>Nombre:</strong> ${escapeHtml(name)}</p><p><strong>Correo:</strong> ${escapeHtml(email)}</p>`,
        },
      }),
    });
  } catch (error) {
    console.error("Lead mail request failed.", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  if (response.status !== 202) {
    const detail = (await response.text()).slice(0, 500);
    console.error("Twilio Email rejected the lead.", response.status, detail);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
