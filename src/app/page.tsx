import { HomeClient } from "@/components/home/home-client";
import { Footer } from "@/components/layout/footer";
import { featuredPicks, products } from "@/lib/product-utils";
import { CATEGORIES } from "@/lib/categories";

/**
 * Homepage (Server Component).
 *
 * Computes the server-rendered data (category counts + featured picks) and
 * hands it to the client orchestrator. The catalog itself is fully
 * client-side filterable for a snappy UX, but the initial HTML is SSR'd for SEO.
 */
export default function Home() {
  // Count products per category for the showcase tiles.
  const categoryCounts: Record<string, number> = {};
  for (const p of products) {
    categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
  }
  // Ensure every declared category has an entry (even if 0).
  for (const c of CATEGORIES) {
    if (categoryCounts[c.id] == null) categoryCounts[c.id] = 0;
  }

  const featured = featuredPicks(10);

  return (
    <>
      <HomeClient categoryCounts={categoryCounts} featuredPicks={featured} />
      <Footer />
    </>
  );
}
