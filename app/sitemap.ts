import type { MetadataRoute } from "next";
import { getAllJobs } from "@/lib/jobs";

const BASE = "https://festag.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/product",
    "/tagro",
    "/pricing",
    "/extension",
    "/docs",
    "/careers",
    "/contact",
    "/legal/imprint",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${BASE}${path === "/" ? "/" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const jobRoutes: MetadataRoute.Sitemap = getAllJobs()
    .filter((j) => j.status === "published")
    .map((j) => ({
      url: `${BASE}/careers/${j.slug}`,
      lastModified: new Date(j.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...jobRoutes];
}
