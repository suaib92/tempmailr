import { NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// Retry wrapper
async function retryFetch(url: string, options?: RequestInit, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    console.warn(`Retry ${i + 1} failed: ${res.status}`);
    if (i < retries - 1) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
  }
  throw new Error(`Failed after ${retries} retries`);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") || "";

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400, headers: CORS_HEADERS });
  }

  const apiUrl = new URL("https://api.mail.tm/messages");
  for (const k of ["page", "limit"]) {
    const v = searchParams.get(k);
    if (v) apiUrl.searchParams.set(k, v);
  }

  try {
    const res = await retryFetch(apiUrl.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { headers: CORS_HEADERS });
  } catch (err) {
    console.error("Messages fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch messages", details: String(err) },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
