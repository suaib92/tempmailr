// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { createAccount, getDomains, login, randomLocalPart } from "@/lib/mailtm";

// Optional: lightweight helper types (adjust if your lib already exports types)
type MailTmDomain = { domain: string };
type MailTmDomainList = { ["hydra:member"]?: MailTmDomain[] };

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

export async function POST() {
  try {
    // 1) Pick a domain
    const domains = (await getDomains()) as MailTmDomainList;
    const domain = domains["hydra:member"]?.[0]?.domain;
    if (!domain) {
      return NextResponse.json({ error: "No domains available" }, { status: 500 });
    }

    // 2) Prepare credentials
    const local = `temp-${Date.now()}-${randomLocalPart(6)}`;
    const address = `${local}@${domain}`;
    const password = randomLocalPart(16);

    // 3) Create account (idempotent-ish: 422 => already exists)
    await createAccount(address, password);

    // 4) Login to get JWT
    const { token } = await login(address, password);

    return NextResponse.json({ address, token });
  } catch (e: unknown) {
    return NextResponse.json(
      { error: "Failed to generate mailbox", details: getErrorMessage(e) },
      { status: 500 }
    );
  }
}
