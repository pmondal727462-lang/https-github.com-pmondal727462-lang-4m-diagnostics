import { NextResponse } from "next/server";
import { destroySession, PATIENT_SESSION_COOKIE } from "../../../../lib/auth/session";

export async function POST() {
  await destroySession(PATIENT_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
