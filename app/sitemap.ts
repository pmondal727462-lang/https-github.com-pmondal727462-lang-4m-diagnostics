import type { MetadataRoute } from "next";
import { prisma } from "../lib/prisma";
import { SITE_URL } from "../lib/seo";

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/tests",
  "/packages",
  "/book-test",
  "/home-sample-collection",
  "/doctors",
  "/appointments",
  "/reports",
  "/contact",
  "/faq",
  "/blog",
  "/ai-assistant",
  "/privacy-policy",
  "/terms",
  "/refund-policy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tests, packages, posts] = await Promise.all([
    prisma.test.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.package.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    prisma.blog.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }),
  ]);

  return [
    ...STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date() })),
    ...tests.map((t) => ({ url: `${SITE_URL}/tests/${t.slug}`, lastModified: t.updatedAt })),
    ...packages.map((p) => ({ url: `${SITE_URL}/packages/${p.slug}`, lastModified: p.updatedAt })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updatedAt })),
  ];
}
