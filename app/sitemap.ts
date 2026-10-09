import type { MetadataRoute } from "next";
import { getAllJobs } from "@/lib/jobs";

const BASE = "https://festag.app";

const ROUTES = [
  "/",
  "/product",
  "/tagro",
  "/connectors",
  "/intelligence",
  "/pricing",
  "/enterprise",
  "/extension",
  "/docs",
  "/changelog",
  "/careers",
  "/contact",
  "/legal/imprint",
  "/legal/privacy",
  "/legal/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" || path === "/changelog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/legal") ? 0.3 : 0.7,
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
