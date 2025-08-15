// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { createAccount, getDomains, login, randomLocalPart } from "@/lib/mailtm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS,GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// Optional: simple health/info for GET
export async function GET() {
  return NextResponse.json(
    { ok: true, route: "/api/generate", allowedMethods: ["POST", "OPTIONS", "GET"] },
    { headers: CORS_HEADERS }
  );
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try { return JSON.stringify(err); } catch { return String(err); }
}

export async function POST() {
  try {
    const domains = await getDomains();
    const list = domains["hydra:member"] ?? [];
    if (!list.length) {
      return NextResponse.json({ error: "No domains available from mail.tm" }, { status: 502, headers: CORS_HEADERS });
    }
    const domain = list[Math.floor(Math.random() * list.length)]!.domain;

    const local = `temp-${Date.now()}-${randomLocalPart(8)}`;
    const address = `${local}@${domain}`;
    const password = randomLocalPart(18);

    await createAccount(address, password);
    const { token } = await login(address, password);

    return NextResponse.json({ address, token }, { headers: CORS_HEADERS });
  } catch (e: any) {
    const status = Number.isInteger(e?.status) ? e.status : 500;
    const details = getErrorMessage(e);
    console.error("Failed to generate mailbox:", details);
    return NextResponse.json({ error: "Failed to generate mailbox", details }, { status, headers: CORS_HEADERS });
  }
}
