import { NextResponse } from "next/server";
import { destroySession, ADMIN_SESSION_COOKIE } from "../../../../../lib/auth/session";

export async function POST() {
  await destroySession(ADMIN_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
