// src/lib/mailtm.ts
const API_URL = "https://api.mail.tm";

const BASE_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "User-Agent": "temp-mailr/1.0 (+https://www.temp-mailr.com)",
};

function abortableTimeout(ms: number) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  return { signal: ac.signal, clear: () => clearTimeout(t) };
}

async function withRetry<T>(op: () => Promise<T>, tries = 3, baseDelayMs = 300) {
  let lastErr: any;
  for (let i = 0; i < tries; i++) {
    try {
      return await op();
    } catch (e: any) {
      lastErr = e;
      const status = e?.status ?? e?.res?.status;
      // Retry 429/5xx/aborts/ETIMEDOUT; fail fast on other 4xx
      if (status && status !== 429 && status < 500) break;
      await new Promise(r => setTimeout(r, baseDelayMs * 2 ** i));
    }
  }
  throw lastErr;
}

async function safeFetch(url: string, init: RequestInit & { timeoutMs?: number } = {}) {
  const { timeoutMs = 10000, ...rest } = init;
  const t = abortableTimeout(timeoutMs);
  try {
    const res = await fetch(url, { ...rest, signal: t.signal });
    return res;
  } finally {
    t.clear();
  }
}

export async function getDomains() {
  return withRetry(async () => {
    const res = await safeFetch(`${API_URL}/domains`, { headers: BASE_HEADERS, cache: "no-store" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      const err = new Error(`domains ${res.status}: ${body}`);
      (err as any).status = res.status; (err as any).body = body;
      throw err;
    }
    return res.json() as Promise<{ "hydra:member": Array<{ domain: string }> }>;
  });
}

export async function createAccount(address: string, password: string) {
  return withRetry(async () => {
    const res = await safeFetch(`${API_URL}/accounts`, {
      method: "POST",
      headers: BASE_HEADERS,
      cache: "no-store",
      body: JSON.stringify({ address, password }),
    });
    // Accept 201 or 422 (already exists)
    if (!res.ok && res.status !== 422) {
      const text = await res.text().catch(() => "");
      const err = new Error(`create account ${res.status}: ${text}`);
      (err as any).status = res.status; (err as any).body = text;
      throw err;
    }
    return res.json().catch(() => ({}));
  });
}

export async function login(address: string, password: string) {
  return withRetry(async () => {
    const res = await safeFetch(`${API_URL}/token`, {
      method: "POST",
      headers: BASE_HEADERS,
      cache: "no-store",
      body: JSON.stringify({ address, password }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const err = new Error(`login ${res.status}: ${text}`);
      (err as any).status = res.status; (err as any).body = text;
      throw err;
    }
    return res.json() as Promise<{ token: string }>;
  });
}

export async function getMessages(token: string) {
  const res = await safeFetch(`${API_URL}/messages`, {
    headers: { ...BASE_HEADERS, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`messages ${res.status}: ${await res.text().catch(() => "")}`);
  return res.json();
}

export async function getMessage(token: string, id: string) {
  const res = await safeFetch(`${API_URL}/messages/${id}`, {
    headers: { ...BASE_HEADERS, Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`message ${res.status}: ${await res.text().catch(() => "")}`);
  return res.json();
}

export function randomLocalPart(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
