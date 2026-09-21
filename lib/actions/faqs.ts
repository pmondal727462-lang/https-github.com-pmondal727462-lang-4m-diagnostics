"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { requireAdmin } from "./guard";
import { recordAudit } from "../audit";

export async function createFaq(formData: FormData) {
  const session = await requireAdmin();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  if (!question || !answer) throw new Error("Question and answer are required");

  await prisma.fAQ.create({ data: { question, answer, category: category || undefined } });

  await recordAudit({ userId: session.userId, action: "CREATE_FAQ", module: "FAQ", result: "SUCCESS", description: question });
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
}

export async function toggleFaqActive(id: string, isActive: boolean) {
  const session = await requireAdmin();
  await prisma.fAQ.update({ where: { id }, data: { isActive } });
  await recordAudit({ userId: session.userId, action: "UPDATE_FAQ", module: "FAQ", result: "SUCCESS", description: id });
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
}

export async function deleteFaq(id: string) {
  const session = await requireAdmin();
  await prisma.fAQ.delete({ where: { id } });
  await recordAudit({ userId: session.userId, action: "DELETE_FAQ", module: "FAQ", result: "SUCCESS", description: id });
  revalidatePath("/admin/faqs");
  revalidatePath("/faq");
  revalidatePath("/");
}
