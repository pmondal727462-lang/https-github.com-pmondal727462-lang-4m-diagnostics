import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyOtpSchema } from "../../../../lib/validations/otp";
import { hashOtp, OTP_MAX_ATTEMPTS } from "../../../../lib/otp";
import { createPatientSession } from "../../../../lib/auth/session";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = verifyOtpSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter the 6-digit OTP" }, { status: 400 });
  }
  const { mobile, otp, purpose } = parsed.data;

  const record = await prisma.oTP.findFirst({
    where: { mobile, purpose, verifiedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!record || record.expiresAt < new Date()) {
    return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
  }

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Please request a new OTP." }, { status: 429 });
  }

  if (record.otpHash !== hashOtp(otp, mobile)) {
    await prisma.oTP.update({ where: { id: record.id }, data: { attempts: { increment: 1 } } });
    return NextResponse.json({ error: "Incorrect OTP. Please try again." }, { status: 400 });
  }

  await prisma.oTP.update({ where: { id: record.id }, data: { verifiedAt: new Date() } });

  const patient = await prisma.patient.upsert({
    where: { mobile },
    update: {},
    create: { name: mobile, mobile },
  });

  await createPatientSession({ patientId: patient.id, mobile: patient.mobile });

  return NextResponse.json({ ok: true, patientId: patient.id });
}
