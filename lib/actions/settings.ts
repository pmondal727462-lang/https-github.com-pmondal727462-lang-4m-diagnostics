"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { requireAdmin } from "./guard";
import { recordAudit } from "../audit";

export async function updateWebsiteSetting(key: string, formData: FormData) {
  const session = await requireAdmin();
  const value = String(formData.get("value") ?? "");
  await prisma.websiteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
  await recordAudit({ userId: session.userId, action: "UPDATE_SETTING", module: "SETTINGS", result: "SUCCESS", description: key });
  revalidatePath("/admin/settings");
}
