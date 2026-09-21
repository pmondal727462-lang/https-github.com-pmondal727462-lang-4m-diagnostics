"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { requireAdmin } from "./guard";
import { recordAudit } from "../audit";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createService(formData: FormData) {
  const session = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!name) throw new Error("Service name is required");

  await prisma.service.create({
    data: { name, slug: slugify(name), description: description || undefined, isActive: false },
  });

  await recordAudit({ userId: session.userId, action: "CREATE_SERVICE", module: "SERVICES", result: "SUCCESS", description: name });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function toggleServiceActive(id: string, isActive: boolean) {
  const session = await requireAdmin();
  await prisma.service.update({ where: { id }, data: { isActive } });
  await recordAudit({ userId: session.userId, action: "UPDATE_SERVICE", module: "SERVICES", result: "SUCCESS", description: id });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  const session = await requireAdmin();
  await prisma.service.delete({ where: { id } });
  await recordAudit({ userId: session.userId, action: "DELETE_SERVICE", module: "SERVICES", result: "SUCCESS", description: id });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}
