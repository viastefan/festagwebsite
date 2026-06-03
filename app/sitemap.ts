import type { MetadataRoute } from "next";
import { getAllJobs } from "@/lib/jobs";

const BASE = "https://festag.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
  const jobRoutes: MetadataRoute.Sitemap = getAllJobs().map((j) => ({
    url: `${BASE}/careers/${j.slug}`,
    lastModified: new Date(j.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...staticRoutes, ...jobRoutes];
}
