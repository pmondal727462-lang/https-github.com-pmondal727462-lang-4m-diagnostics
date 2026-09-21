import { z } from "zod";

export const sendOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  purpose: z.enum(["PATIENT_LOGIN", "REPORT_ACCESS"]),
});

export const verifyOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  otp: z.string().length(6, "Enter the 6-digit OTP"),
  purpose: z.enum(["PATIENT_LOGIN", "REPORT_ACCESS"]),
});
