import { prisma } from "./prisma";

/**
 * Sends an SMS through the configured provider. When SMS_API_KEY /
 * SMS_API_URL are not set (e.g. local development), the message is logged
 * instead of sent so the OTP flow stays testable without real credentials.
 */
export async function sendSms(mobile: string, message: string): Promise<void> {
  const apiUrl = process.env.SMS_API_URL;
  const apiKey = process.env.SMS_API_KEY;

  if (!apiUrl || !apiKey) {
    console.log(`[SMS:SIMULATED] to ${mobile}: ${message}`);
    await prisma.sMSLog.create({
      data: { mobile, message, status: "SIMULATED" },
    });
    return;
  }

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ to: mobile, message }),
    });
    const providerResponse = await res.json().catch(() => null);
    await prisma.sMSLog.create({
      data: {
        mobile,
        message,
        provider: apiUrl,
        status: res.ok ? "SENT" : "FAILED",
        providerResponse,
      },
    });
  } catch (error) {
    await prisma.sMSLog.create({
      data: {
        mobile,
        message,
        provider: apiUrl,
        status: "FAILED",
        providerResponse: { error: error instanceof Error ? error.message : String(error) },
      },
    });
  }
}
