import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getAllDoctorSlugs } from "@/lib/doctors";

const STATIC_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/tests", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/blood-tests", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/health-packages", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/home-sample-collection", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/doctors", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/book-test", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/appointment", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/polyclinic", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const doctorEntries: MetadataRoute.Sitemap = getAllDoctorSlugs().map((slug) => ({
    url: `${SITE_URL}/doctors/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...doctorEntries];
}
