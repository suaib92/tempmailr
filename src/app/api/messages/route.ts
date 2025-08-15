import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";
  const id = searchParams.get("id") || "";

  if (!token || !id) {
    return NextResponse.json({ error: "Missing token or id" }, { status: 400 });
  }

  const res = await fetch(`https://api.mail.tm/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
