import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";

/**
 * Dynamic sitemap. Since the catalog lives in-repo as typed data, we generate
 * the entries at request time. Categories are surfaced as anchored sections
 * on the homepage (the only user-visible route) — each anchor is a distinct
 * indexable landing target for category-level queries.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = "https://fitfeky.com";

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/#catalog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/#featured`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/#calculators`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/#editorial`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // One indexable entry per category anchor (keyword-rich URL fragment).
  for (const c of CATEGORIES) {
    entries.push({
      url: `${base}/#catalog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
