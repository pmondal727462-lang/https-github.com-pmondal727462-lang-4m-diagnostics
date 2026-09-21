import { prisma } from "../prisma";

export function getActiveServices() {
  return prisma.service.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
}
