import { z } from "zod";

export const createAppointmentSchema = z.object({
  doctorId: z.string().cuid(),
  date: z.string().min(1, "Select a date"),
  time: z.string().min(1, "Select a time"),
  patient: z.object({
    name: z.string().min(2, "Name is required"),
    mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    email: z.string().email().optional().or(z.literal("")),
  }),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
