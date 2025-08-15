// src/lib/mailtm.ts
const API_URL = "https://api.mail.tm";

export async function getDomains() {
  const res = await fetch(`${API_URL}/domains`, { cache: "no-store" });
  if (!res.ok) throw new Error(`domains ${res.status}`);
  return res.json() as Promise<{ "hydra:member": Array<{ domain: string }> }>;
}

export async function createAccount(address: string, password: string) {
  const res = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ address, password }),
  });
  // mail.tm returns 201 or 422 if exists. We still proceed to login on 422.
  if (!res.ok && res.status !== 422) {
    const text = await res.text().catch(() => "");
    throw new Error(`create account ${res.status}: ${text}`);
  }
  return res.json().catch(() => ({}));
}

export async function login(address: string, password: string) {
  const res = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ address, password }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`login ${res.status}: ${text}`);
  }
  return res.json() as Promise<{ token: string }>;
}

export async function getMessages(token: string) {
  const res = await fetch(`${API_URL}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`messages ${res.status}`);
  return res.json();
}

export async function getMessage(token: string, id: string) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`message ${res.status}`);
  return res.json();
}

export function randomLocalPart(len = 12) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
