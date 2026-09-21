import { prisma } from "../prisma";

export function getPublishedPosts(limit?: number) {
  return prisma.blog.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export function getPublishedPostBySlug(slug: string) {
  return prisma.blog.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}
