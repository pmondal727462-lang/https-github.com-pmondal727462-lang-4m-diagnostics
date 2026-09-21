import { prisma } from "../prisma";
import type { Prisma } from "../../generated/prisma/client";

export function getPopularTests(limit = 8) {
  return prisma.test.findMany({
    where: { isActive: true, isPopular: true },
    orderBy: { name: "asc" },
    take: limit,
    include: { category: true },
  });
}

export function getActiveTestCategories() {
  return prisma.testCategory.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });
}

export interface TestSearchParams {
  query?: string;
  categorySlug?: string;
  homeCollectionOnly?: boolean;
  popularOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export async function searchTests(params: TestSearchParams) {
  const page = params.page && params.page > 0 ? params.page : 1;
  const pageSize = params.pageSize ?? 12;

  const where: Prisma.TestWhereInput = {
    isActive: true,
    ...(params.homeCollectionOnly ? { homeCollectionAvailable: true } : {}),
    ...(params.popularOnly ? { isPopular: true } : {}),
    ...(params.categorySlug ? { category: { slug: params.categorySlug } } : {}),
    ...(params.query
      ? {
          OR: [
            { name: { contains: params.query, mode: "insensitive" } },
            { code: { contains: params.query, mode: "insensitive" } },
            { description: { contains: params.query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [tests, total] = await Promise.all([
    prisma.test.findMany({
      where,
      include: { category: true },
      orderBy: { name: "asc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.test.count({ where }),
  ]);

  return { tests, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export function getTestBySlug(slug: string) {
  return prisma.test.findFirst({
    where: { slug, isActive: true },
    include: { category: true, parameters: { orderBy: { displayOrder: "asc" } } },
  });
}

export function getTestById(id: string) {
  return prisma.test.findFirst({ where: { id, isActive: true } });
}
