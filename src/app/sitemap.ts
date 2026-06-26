import type { MetadataRoute } from "next";
import { CATEGORIES } from "@/lib/categories";

/**
 * Dynamic sitemap. Surfaces every indexable section as a distinct URL so
 * search engines and AI crawlers discover all content. Categories get their
 * own entries with keyword-rich anchors.
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
    // Primary sections — each is a distinct indexable target
    {
      url: `${base}/#catalog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${base}/#featured`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/#calculators`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/#categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/#how-we-test`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/#testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/#editorial`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/#faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // AI discovery files
    {
      url: `${base}/llms.txt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${base}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // One entry per category — keyword-rich landing targets.
  for (const c of CATEGORIES) {
    entries.push({
      url: `${base}/#catalog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }

  return entries;
}
