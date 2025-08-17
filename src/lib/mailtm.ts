// src/lib/mailtm.ts
const API_URL = "mail.vlkn.in";

// Rate limiting control
let lastRequestTime = 0;
const REQUEST_DELAY = 1000; // 1 second between requests

async function fetchWithDelay(url: string, options?: RequestInit): Promise<Response> {
  const now = Date.now();
  const delay = Math.max(0, REQUEST_DELAY - (now - lastRequestTime));
  if (delay > 0) await new Promise(r => setTimeout(r, delay));
  lastRequestTime = Date.now();

  try {
    const res = await fetch(url, {
      ...options,
      cache: "no-store",
      headers: {
        ...options?.headers,
        'User-Agent': 'TempMailr/1.0 (+https://www.temp-mailr.com)'
      }
    });

    if (!res.ok) {
      const errorData = await res.text().catch(() => '');
      console.error(`API request failed: ${url} - ${res.status}`, {
        status: res.status,
        statusText: res.statusText,
        errorData
      });
      throw new Error(`API request failed: ${res.status}`);
    }

    return res;
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}

export async function getDomains() {
  try {
    const res = await fetchWithDelay(`${API_URL}/domains`);
    return res.json() as Promise<{ "hydra:member": Array<{ domain: string }> }>;
  } catch (error) {
    console.error('Failed to fetch domains:', error);
    throw error;
  }
}

export async function createAccount(address: string, password: string) {
  try {
    const res = await fetchWithDelay(`${API_URL}/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, password }),
    });

    if (!res.ok && res.status !== 422) {
      throw new Error(`create account ${res.status}`);
    }
    return res.json().catch(() => ({}));
  } catch (error) {
    console.error('Account creation failed:', { address, error });
    throw error;
  }
}

export async function login(address: string, password: string) {
  try {
    const res = await fetchWithDelay(`${API_URL}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, password }),
    });

    if (!res.ok) {
      throw new Error(`login ${res.status}`);
    }
    return res.json() as Promise<{ token: string }>;
  } catch (error) {
    console.error('Login failed:', { address, error });
    throw error;
  }
}

// ... (keep other functions the same) ...}

export async function getMessages(token: string) {
  const res = await fetchWithDelay(`${API_URL}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`messages ${res.status}`);
  return res.json();
}

export async function getMessage(token: string, id: string) {
  const res = await fetchWithDelay(`${API_URL}/messages/${id}`, {
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
