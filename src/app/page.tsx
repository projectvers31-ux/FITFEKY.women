import { HomeClient } from "@/components/home/home-client";
import { Footer } from "@/components/layout/footer";
import { featuredPicks, products } from "@/lib/product-utils";
import { CATEGORIES } from "@/lib/categories";
import {
  productListJsonLd,
  faqJsonLd,
  homeBreadcrumb,
  jsonLdScript,
} from "@/lib/seo";

/**
 * Homepage (Server Component).
 *
 * Computes server-rendered data + emits JSON-LD structured data for rich
 * search results (Product ItemList, FAQ, Breadcrumb). The catalog itself is
 * client-side filterable for snappy UX while the initial HTML is fully SSR'd
 * for SEO crawlability.
 */
export default function Home() {
  const categoryCounts: Record<string, number> = {};
  for (const p of products) {
    categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
  }
  for (const c of CATEGORIES) {
    if (categoryCounts[c.id] == null) categoryCounts[c.id] = 0;
  }

  const featured = featuredPicks(10);

  // Structured data for rich SERP results.
  const itemListLd = jsonLdScript(productListJsonLd(featured));
  const faqLd = jsonLdScript(faqJsonLd());
  const breadcrumbLd = jsonLdScript(homeBreadcrumb());

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbLd }}
      />
      <HomeClient categoryCounts={categoryCounts} featuredPicks={featured} />
      <Footer />
    </>
  );
}
