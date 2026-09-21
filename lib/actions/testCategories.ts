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

export async function createTestCategory(formData: FormData) {
  const session = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!name) throw new Error("Category name is required");

  await prisma.testCategory.create({
    data: { name, slug: slugify(name), description: description || undefined },
  });

  await recordAudit({ userId: session.userId, action: "CREATE_TEST_CATEGORY", module: "TESTS", result: "SUCCESS", description: name });
  revalidatePath("/admin/test-categories");
  revalidatePath("/tests");
}

export async function toggleTestCategoryActive(id: string, isActive: boolean) {
  const session = await requireAdmin();
  await prisma.testCategory.update({ where: { id }, data: { isActive } });
  await recordAudit({ userId: session.userId, action: "UPDATE_TEST_CATEGORY", module: "TESTS", result: "SUCCESS", description: id });
  revalidatePath("/admin/test-categories");
  revalidatePath("/tests");
}

export async function deleteTestCategory(id: string) {
  const session = await requireAdmin();
  await prisma.testCategory.delete({ where: { id } });
  await recordAudit({ userId: session.userId, action: "DELETE_TEST_CATEGORY", module: "TESTS", result: "SUCCESS", description: id });
  revalidatePath("/admin/test-categories");
  revalidatePath("/tests");
}
