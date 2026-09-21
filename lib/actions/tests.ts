"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

function parseTestForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const price = Number(formData.get("price"));
  const offerPriceRaw = String(formData.get("offerPrice") ?? "").trim();

  if (!name || !code || !categoryId || Number.isNaN(price)) {
    throw new Error("Name, code, category and price are required");
  }

  return {
    name,
    code,
    categoryId,
    description: String(formData.get("description") ?? "").trim() || undefined,
    sampleType: String(formData.get("sampleType") ?? "").trim() || undefined,
    preparation: String(formData.get("preparation") ?? "").trim() || undefined,
    fastingRequired: formData.get("fastingRequired") === "on",
    fastingDurationHours: formData.get("fastingDurationHours")
      ? Number(formData.get("fastingDurationHours"))
      : undefined,
    reportTimeHours: formData.get("reportTimeHours") ? Number(formData.get("reportTimeHours")) : undefined,
    homeCollectionAvailable: formData.get("homeCollectionAvailable") === "on",
    price,
    offerPrice: offerPriceRaw ? Number(offerPriceRaw) : undefined,
    isPopular: formData.get("isPopular") === "on",
  };
}

export async function createTest(formData: FormData) {
  const session = await requireAdmin();
  const data = parseTestForm(formData);

  await prisma.test.create({
    data: { ...data, slug: slugify(`${data.name}-${data.code}`) },
  });

  await recordAudit({ userId: session.userId, action: "CREATE_TEST", module: "TESTS", result: "SUCCESS", description: data.name });
  revalidatePath("/admin/tests");
  revalidatePath("/tests");
  redirect("/admin/tests");
}

export async function updateTest(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = parseTestForm(formData);

  await prisma.test.update({ where: { id }, data });

  await recordAudit({ userId: session.userId, action: "UPDATE_TEST", module: "TESTS", result: "SUCCESS", description: id });
  revalidatePath("/admin/tests");
  revalidatePath("/tests");
  redirect("/admin/tests");
}

export async function toggleTestActive(id: string, isActive: boolean) {
  const session = await requireAdmin();
  await prisma.test.update({ where: { id }, data: { isActive } });
  await recordAudit({ userId: session.userId, action: "UPDATE_TEST", module: "TESTS", result: "SUCCESS", description: id });
  revalidatePath("/admin/tests");
  revalidatePath("/tests");
}

export async function deleteTest(id: string) {
  const session = await requireAdmin();
  await prisma.test.delete({ where: { id } });
  await recordAudit({ userId: session.userId, action: "DELETE_TEST", module: "TESTS", result: "SUCCESS", description: id });
  revalidatePath("/admin/tests");
  revalidatePath("/tests");
}
