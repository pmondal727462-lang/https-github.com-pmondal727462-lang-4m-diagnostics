import { z } from "zod";

export const bookingItemSchema = z
  .object({
    testId: z.string().cuid().optional(),
    packageId: z.string().cuid().optional(),
  })
  .refine((item) => Boolean(item.testId) !== Boolean(item.packageId), {
    message: "Each item must reference exactly one test or package",
  });

export const createBookingSchema = z.object({
  type: z.enum(["CENTER_VISIT", "HOME_COLLECTION"]),
  items: z.array(bookingItemSchema).min(1, "Select at least one test or package"),
  patient: z.object({
    name: z.string().min(2, "Name is required"),
    mobile: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    email: z.string().email().optional().or(z.literal("")),
    age: z.coerce.number().int().min(0).max(120).optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
    address: z.string().optional(),
    pincode: z
      .string()
      .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
      .optional()
      .or(z.literal("")),
  }),
  scheduledDate: z.string().min(1, "Select a date"),
  scheduledSlot: z.string().min(1, "Preferred time is required"),
  homeCollection: z
    .object({
      address: z.string().min(5, "Address is required"),
      landmark: z.string().optional(),
      pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
      specialInstructions: z.string().optional(),
    })
    .optional(),
  couponCode: z.string().optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
