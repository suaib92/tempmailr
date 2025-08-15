import { NextResponse } from "next/server";
import { createAccount, getDomains, login, randomLocalPart } from "@/lib/mailtm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

function parseFallbackDomains(): string[] {
  const defaultDomains = ["mail.tm", "example.com", "test.com"];
  const raw = process.env.MAILTM_FALLBACK_DOMAINS || "";
  const envDomains = raw.split(",").map(s => s.trim()).filter(Boolean);
  return envDomains.length > 0 ? envDomains : defaultDomains;
}

async function getDomainsResilient(): Promise<string[]> {
  const fallbackDomains = parseFallbackDomains();

  try {
    const domains = await getDomains();
    const apiDomains = (domains["hydra:member"] || []).map(d => d.domain).filter(Boolean);

    if (apiDomains.length) {
      console.log("✅ Domains fetched from API:", apiDomains);
      return apiDomains;
    }

    console.warn("⚠ Empty domain list from API, retrying...");
    await new Promise(r => setTimeout(r, 1000));

    const retryDomains = await getDomains();
    const retryList = (retryDomains["hydra:member"] || []).map(d => d.domain).filter(Boolean);

    return retryList.length ? retryList : fallbackDomains;
  } catch (error) {
    console.error("❌ Failed to fetch domains from API:", error);
    return fallbackDomains;
  }
}

// Retry wrapper
async function retry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.warn(`Retry ${i + 1} failed:`, err);
      if (i < retries - 1) await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error(`Failed after ${retries} retries`);
}

export async function POST() {
  try {
    console.log("🚀 Starting email generation process");

    const domains = await getDomainsResilient();
    console.log("Using domains:", domains);

    if (!domains.length) {
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503, headers: CORS_HEADERS }
      );
    }

    const domain = domains[Math.floor(Math.random() * domains.length)];
    const local = `temp-${Date.now()}-${randomLocalPart(8)}`;
    const address = `${local}@${domain}`;
    const password = randomLocalPart(18);

    console.log("🆕 Creating account:", { address });
    await retry(() => createAccount(address, password));

    console.log("🔑 Logging in...");
    const { token } = await retry(() => login(address, password));

    console.log("✅ Mailbox created successfully");
    return NextResponse.json({ address, token }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error("❌ FULL ERROR DETAILS:", {
      message: getErrorMessage(error),
      stack: (error as Error).stack,
      runtime: process.env.NEXT_RUNTIME,
      env: {
        MAILTM_API: !!process.env.MAILTM_API,
        MAILTM_FALLBACK_DOMAINS: !!process.env.MAILTM_FALLBACK_DOMAINS,
      },
    });

    return NextResponse.json(
      { error: "Failed to generate mailbox" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
