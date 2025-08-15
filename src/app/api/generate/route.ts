import { NextResponse } from "next/server";
import { createTempMail } from "@/app/actions";

export async function POST() {
  const data = await createTempMail();
  return NextResponse.json(data);
}
