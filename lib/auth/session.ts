import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { RoleName } from "../../generated/prisma/enums";

const encoder = new TextEncoder();

function secret() {
  const value = process.env.JWT_SECRET;
  if (!value) throw new Error("JWT_SECRET is not set");
  return encoder.encode(value);
}

export const ADMIN_SESSION_COOKIE = "4m_admin_session";
export const PATIENT_SESSION_COOKIE = "4m_patient_session";

const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const PATIENT_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export interface AdminSessionPayload {
  userId: string;
  role: RoleName;
  name: string;
  email: string;
}

export interface PatientSessionPayload {
  patientId: string;
  mobile: string;
}

async function signSession(payload: Record<string, unknown>, ttlSeconds: number) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + ttlSeconds)
    .sign(secret());
}

export async function createAdminSession(payload: AdminSessionPayload) {
  const token = await signSession({ ...payload }, ADMIN_SESSION_TTL_SECONDS);
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });
}

export async function createPatientSession(payload: PatientSessionPayload) {
  const token = await signSession({ ...payload }, PATIENT_SESSION_TTL_SECONDS);
  const store = await cookies();
  store.set(PATIENT_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: PATIENT_SESSION_TTL_SECONDS,
  });
}

export async function destroySession(cookieName: string) {
  const store = await cookies();
  store.delete(cookieName);
}

export async function verifySessionToken<T>(token: string): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as T;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  const token = store.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken<AdminSessionPayload>(token);
}

export async function getPatientSession(): Promise<PatientSessionPayload | null> {
  const store = await cookies();
  const token = store.get(PATIENT_SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken<PatientSessionPayload>(token);
}
