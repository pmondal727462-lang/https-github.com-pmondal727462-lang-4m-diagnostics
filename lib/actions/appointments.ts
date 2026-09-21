"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { requireAdmin } from "./guard";
import { recordAudit } from "../audit";
import type { AppointmentStatus } from "../../generated/prisma/client";

export async function updateAppointmentStatus(id: string, formData: FormData) {
  const session = await requireAdmin();
  const status = String(formData.get("status")) as AppointmentStatus;
  await prisma.appointment.update({ where: { id }, data: { status } });
  await recordAudit({ userId: session.userId, action: "UPDATE_APPOINTMENT", module: "APPOINTMENTS", result: "SUCCESS", description: `${id} -> ${status}` });
  revalidatePath("/admin/appointments");
}
