// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { createAccount, getDomains, login, randomLocalPart } from "@/lib/mailtm";

export const runtime = "nodejs"; // Changed from "nodejs"
export const dynamic = "force-dynamic";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://www.temp-mailr.com",
  "Access-Control-Allow-Methods": "POST,OPTIONS,GET",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function parseFallbackDomains(): string[] {
  const defaultDomains = ['mail.tm', 'example.com', 'test.com'];
  const raw = process.env.MAILTM_FALLBACK_DOMAINS || "";
  const envDomains = raw.split(",").map(s => s.trim()).filter(Boolean);
  return envDomains.length > 0 ? envDomains : defaultDomains;
}

async function getDomainsResilient(): Promise<string[]> {
  const fallbackDomains = parseFallbackDomains();
  
  try {
    // Try direct API first
    const domains = await getDomains();
    const apiDomains = (domains["hydra:member"] || []).map(d => d.domain).filter(Boolean);
    
    if (apiDomains.length) {
      console.log('Successfully fetched domains from API');
      return apiDomains;
    }
    
    // If empty response but no error, try again after delay
    console.warn('Empty domain list from API, retrying...');
    await new Promise(r => setTimeout(r, 1000));
    const retryDomains = await getDomains();
    const retryList = (retryDomains["hydra:member"] || []).map(d => d.domain).filter(Boolean);
    
    return retryList.length ? retryList : fallbackDomains;
  } catch (error) {
    console.error('Failed to fetch domains from API:', error);
    return fallbackDomains;
  }
}

export async function POST() {
  try {
    console.log('Starting email generation process');
    
    const domains = await getDomainsResilient();
    console.log('Using domains:', domains);
    
    if (!domains.length) {
      console.error('No domains available even after fallback');
      return NextResponse.json(
        { error: "Service temporarily unavailable" },
        { status: 503, headers: CORS_HEADERS }
      );
    }

    const domain = domains[Math.floor(Math.random() * domains.length)]!;
    const local = `temp-${Date.now()}-${randomLocalPart(8)}`;
    const address = `${local}@${domain}`;
    const password = randomLocalPart(18);

    console.log('Creating account:', { address });
    await createAccount(address, password);

    console.log('Logging in...');
    const { token } = await login(address, password);
    console.log('Successfully generated mailbox');

    return NextResponse.json({ address, token }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error('FULL ERROR DETAILS:', {
      message: getErrorMessage(error),
      stack: (error as Error).stack,
      // Add environment info:
      runtime: process.env.NEXT_RUNTIME,
      env: {
        MAILTM_API: !!process.env.MAILTM_API,
        MAILTM_FALLBACK_DOMAINS: !!process.env.MAILTM_FALLBACK_DOMAINS
      }
    });
    
    return NextResponse.json(
      { error: "Failed to generate mailbox" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}