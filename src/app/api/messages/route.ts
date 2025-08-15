// src/app/api/messages/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const apiUrl = new URL("https://api.mail.tm/messages");
  // Optional pass-through pagination
  for (const k of ["page", "limit"]) {
    const v = searchParams.get(k);
    if (v) apiUrl.searchParams.set(k, v);
  }

  const res = await fetch(apiUrl.toString(), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: "Failed to fetch messages", status: res.status, details: text },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
