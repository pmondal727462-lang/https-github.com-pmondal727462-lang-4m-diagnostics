"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { requireAdmin } from "./guard";
import { recordAudit } from "../audit";
import type { HomeCollectionStatus } from "../../generated/prisma/client";

export async function updateHomeCollectionStatus(id: string, formData: FormData) {
  const session = await requireAdmin();
  const status = String(formData.get("status")) as HomeCollectionStatus;
  await prisma.homeCollection.update({ where: { id }, data: { status } });
  await recordAudit({ userId: session.userId, action: "UPDATE_HOME_COLLECTION", module: "HOME_COLLECTION", result: "SUCCESS", description: `${id} -> ${status}` });
  revalidatePath("/admin/home-collection");
}

export async function assignHomeCollectionStaff(id: string, formData: FormData) {
  const session = await requireAdmin();
  const staffUserId = String(formData.get("assignedStaffId") ?? "");
  await prisma.homeCollection.update({
    where: { id },
    data: {
      assignedStaffId: staffUserId || null,
      status: staffUserId ? "ASSIGNED" : "PENDING",
    },
  });
  await recordAudit({ userId: session.userId, action: "UPDATE_HOME_COLLECTION", module: "HOME_COLLECTION", result: "SUCCESS", description: `${id} assigned to ${staffUserId || "none"}` });
  revalidatePath("/admin/home-collection");
}
