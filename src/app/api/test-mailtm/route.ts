// /app/api/test-mailtm/route.ts  (or pages/api/test-mailtm.js if pages router)
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.mail.tm/domains", {
      cache: "no-store",
      headers: { 'User-Agent': 'TempMailr/1.0 (+https://www.temp-mailr.com)' }
    });

    const status = res.status;
    const text = await res.text();

    return NextResponse.json({
      reachable: res.ok,
      status,
      body: text.slice(0, 300) // limit size
    });
  } catch (error) {
    return NextResponse.json({
      reachable: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
}
