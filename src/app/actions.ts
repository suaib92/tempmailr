"use server";

import { createAccount, login } from "@/lib/mailtm";

export async function createTempMail() {
  const domains = await fetch("mail.vlkn.in/domains").then(res => res.json());
  const domain = domains["hydra:member"][0].domain;
  
  const address = `temp-${Date.now()}@${domain}`;
  const password = "TempPass123!";

  await createAccount(address, password);
  const tokenData = await login(address, password);

  return { address, password, token: tokenData.token };
}
