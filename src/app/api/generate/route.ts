// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { createAccount, getDomains, login, randomLocalPart } from "@/lib/mailtm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MailTmDomain = { domain: string };
type MailTmDomainList = { ["hydra:member"]?: MailTmDomain[] };

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS,GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

// Simple health check
export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/generate", methods: ["POST"] }, { headers: CORS_HEADERS });
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try { return JSON.stringify(err); } catch { return String(err); }
}

function parseFallbackDomains(): string[] {
  const raw = process.env.MAILTM_FALLBACK_DOMAINS || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

async function tryGetDomainsOnce(): Promise<string[]> {
  // Uses your existing lib.getDomains()
  const domains = (await getDomains()) as MailTmDomainList;
  return (domains["hydra:member"] || []).map(d => d.domain).filter(Boolean);
}

// Retry domains a few times; fall back to env if API is flaky/empty
async function getDomainsResilient(): Promise<string[]> {
  let lastErr: unknown;
  for (let i = 0; i < 3; i++) {
    try {
      const list = await tryGetDomainsOnce();
      if (list.length) return list;
      // Empty result — wait and retry
      await new Promise(r => setTimeout(r, 300 * (2 ** i)));
    } catch (e) {
      lastErr = e;
      // brief backoff on failure
      await new Promise(r => setTimeout(r, 300 * (2 ** i)));
    }
  }
  // If still nothing, fall back to env
  const fallback = parseFallbackDomains();
  if (fallback.length) return fallback;

  // Pass through original error if we had one
  if (lastErr) throw lastErr;
  return [];
}

export async function POST() {
  try {
    // 1) Domains (resilient + fallback from env)
    const domains = await getDomainsResilient();
    if (!domains.length) {
      return NextResponse.json(
        { error: "No domains available from mail.tm (and no fallbacks configured)" },
        { status: 502, headers: CORS_HEADERS }
      );
    }
    const domain = domains[Math.floor(Math.random() * domains.length)]!;

    // 2) Prepare creds
    const local = `temp-${Date.now()}-${randomLocalPart(8)}`;
    const address = `${local}@${domain}`;
    const password = randomLocalPart(18);

    // 3) Create account (accepts 201 or 422 in your lib)
    await createAccount(address, password);

    // 4) Login
    const { token } = await login(address, password);

    return NextResponse.json({ address, token }, { headers: CORS_HEADERS });
  } catch (e: unknown) {
    // Try to pass through status code if your lib attached one; otherwise 500
   const errObj = e as { status?: number } | null;
  const status = typeof errObj?.status === "number" ? errObj.status : 500;
  const details = getErrorMessage(e);

  console.error("Failed to generate mailbox:", details);

    return NextResponse.json(
      { error: "Failed to generate mailbox", details },
      { status, headers: CORS_HEADERS }
    );
  }
}
