// src/app/api/generate/route.ts
import { NextResponse } from "next/server";
import { createAccount, getDomains, login, randomLocalPart } from "@/lib/mailtm";

export async function POST() {
  try {
    // 1) Pick a domain
    const domains = await getDomains();
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
  } catch (e: any) {
    return NextResponse.json(
      { error: "Failed to generate mailbox", details: String(e?.message || e) },
      { status: 500 }
    );
  }
}
