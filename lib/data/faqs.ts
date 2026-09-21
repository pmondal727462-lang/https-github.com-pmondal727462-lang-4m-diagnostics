import { prisma } from "../prisma";

export function getActiveFaqs(category?: string) {
  return prisma.fAQ.findMany({
    where: { isActive: true, ...(category ? { category } : {}) },
    orderBy: { displayOrder: "asc" },
  });
}
