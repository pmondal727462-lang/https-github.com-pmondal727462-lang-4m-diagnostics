"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { requireAdmin } from "./guard";
import { recordAudit } from "../audit";
import type { PackageCategory } from "../../generated/prisma/client";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parsePackageForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "") as PackageCategory;
  const regularPrice = Number(formData.get("regularPrice"));
  const testIds = formData.getAll("testIds").map(String).filter(Boolean);

  if (!name || !category || Number.isNaN(regularPrice) || testIds.length === 0) {
    throw new Error("Name, category, price, and at least one test are required");
  }

  const offerPriceRaw = String(formData.get("offerPrice") ?? "").trim();

  return {
    name,
    category,
    description: String(formData.get("description") ?? "").trim() || undefined,
    preparation: String(formData.get("preparation") ?? "").trim() || undefined,
    regularPrice,
    offerPrice: offerPriceRaw ? Number(offerPriceRaw) : undefined,
    homeCollectionAvailable: formData.get("homeCollectionAvailable") === "on",
    testIds,
  };
}

export async function createPackage(formData: FormData) {
  const session = await requireAdmin();
  const { testIds, ...data } = parsePackageForm(formData);

  await prisma.package.create({
    data: {
      ...data,
      slug: slugify(data.name),
      tests: { create: testIds.map((testId) => ({ testId })) },
    },
  });

  await recordAudit({ userId: session.userId, action: "CREATE_PACKAGE", module: "PACKAGES", result: "SUCCESS", description: data.name });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  redirect("/admin/packages");
}

export async function updatePackage(id: string, formData: FormData) {
  const session = await requireAdmin();
  const { testIds, ...data } = parsePackageForm(formData);

  await prisma.$transaction([
    prisma.packageTest.deleteMany({ where: { packageId: id } }),
    prisma.package.update({
      where: { id },
      data: { ...data, tests: { create: testIds.map((testId) => ({ testId })) } },
    }),
  ]);

  await recordAudit({ userId: session.userId, action: "UPDATE_PACKAGE", module: "PACKAGES", result: "SUCCESS", description: id });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  redirect("/admin/packages");
}

export async function togglePackageActive(id: string, isActive: boolean) {
  const session = await requireAdmin();
  await prisma.package.update({ where: { id }, data: { isActive } });
  await recordAudit({ userId: session.userId, action: "UPDATE_PACKAGE", module: "PACKAGES", result: "SUCCESS", description: id });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
}

export async function deletePackage(id: string) {
  const session = await requireAdmin();
  await prisma.package.delete({ where: { id } });
  await recordAudit({ userId: session.userId, action: "DELETE_PACKAGE", module: "PACKAGES", result: "SUCCESS", description: id });
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
}
