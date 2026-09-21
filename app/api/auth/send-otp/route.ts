import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { sendOtpSchema } from "../../../../lib/validations/otp";
import { generateOtp, hashOtp, otpExpiresAt } from "../../../../lib/otp";
import { sendSms } from "../../../../lib/sms";
import { BUSINESS } from "../../../../lib/constants";

const RATE_LIMIT_WINDOW_MS = 60 * 1000;

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = sendOtpSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid 10-digit mobile number" }, { status: 400 });
  }
  const { mobile, purpose } = parsed.data;

  const recent = await prisma.oTP.findFirst({
    where: {
      mobile,
      purpose,
      createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
    },
    orderBy: { createdAt: "desc" },
  });
  if (recent) {
    return NextResponse.json(
      { error: "Please wait a minute before requesting another OTP." },
      { status: 429 },
    );
  }

  const otp = generateOtp();
  await prisma.oTP.create({
    data: {
      mobile,
      purpose,
      otpHash: hashOtp(otp, mobile),
      expiresAt: otpExpiresAt(),
    },
  });

  await sendSms(mobile, `${otp} is your OTP for ${BUSINESS.name}. Valid for 10 minutes. Do not share this code.`);

  return NextResponse.json({
    ok: true,
    // Only surfaced outside production so the flow is testable without SMS credentials.
    devOtp: process.env.NODE_ENV !== "production" ? otp : undefined,
  });
}
