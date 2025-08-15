const API_URL = "https://api.mail.tm";

export async function createAccount(address: string, password: string) {
  const res = await fetch(`${API_URL}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  return res.json();
}

export async function login(address: string, password: string) {
  const res = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  return res.json();
}

export async function getMessages(token: string) {
  const res = await fetch(`${API_URL}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getDomains() {
  const res = await fetch(`${API_URL}/domains`);
  return res.json();
}
