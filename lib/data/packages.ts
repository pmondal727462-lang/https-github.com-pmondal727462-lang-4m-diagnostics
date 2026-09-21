import { prisma } from "../prisma";

export function getActivePackages(limit?: number) {
  return prisma.package.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
    take: limit,
    include: { tests: { include: { test: true } } },
  });
}

export function getPackageBySlug(slug: string) {
  return prisma.package.findFirst({
    where: { slug, isActive: true },
    include: { tests: { include: { test: true } } },
  });
}

export function getPackageById(id: string) {
  return prisma.package.findFirst({ where: { id, isActive: true } });
}
