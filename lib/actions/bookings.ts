"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { requireAdmin } from "./guard";
import { recordAudit } from "../audit";
import type { BookingStatus } from "../../generated/prisma/client";

export async function updateBookingStatus(id: string, formData: FormData) {
  const session = await requireAdmin();
  const status = String(formData.get("status")) as BookingStatus;
  await prisma.booking.update({ where: { id }, data: { status } });
  await recordAudit({ userId: session.userId, action: "UPDATE_BOOKING", module: "BOOKINGS", result: "SUCCESS", description: `${id} -> ${status}` });
  revalidatePath("/admin/bookings");
}
