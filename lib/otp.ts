import { createHash, randomInt } from "crypto";

const OTP_TTL_MINUTES = 10;
const MAX_ATTEMPTS = 5;

export function generateOtp(): string {
  return String(randomInt(100000, 999999));
}

export function hashOtp(otp: string, mobile: string): string {
  const secret = process.env.OTP_SECRET ?? "";
  return createHash("sha256").update(`${secret}:${mobile}:${otp}`).digest("hex");
}

export function otpExpiresAt(): Date {
  return new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);
}

export const OTP_MAX_ATTEMPTS = MAX_ATTEMPTS;
