import { HomeClient } from "@/components/home/home-client";
import { Footer } from "@/components/layout/footer";
import { featuredPicks, products } from "@/lib/product-utils";
import { CATEGORIES } from "@/lib/categories";
import { ARTICLES } from "@/lib/articles";
import {
  productListJsonLd,
  faqJsonLd,
  homeBreadcrumb,
  reviewsJsonLd,
  articleJsonLd,
  jsonLdScript,
} from "@/lib/seo";

/**
 * Homepage (Server Component).
 *
 * Computes server-rendered data + emits JSON-LD structured data for rich
 * search results (Product ItemList, FAQ, Breadcrumb). The catalog itself is
 * client-side filterable for snappy UX while the initial HTML is fully SSR'd
 * for SEO crawlability.
 *
 * Supports ?search= and ?category= deep links (used by the 404 search bar,
 * the Gear Quiz results and category tiles) — the catalog scrolls into view
 * pre-filtered.
 */
export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const initialSearch = params?.search?.trim() ?? "";
  const initialCategory = params?.category?.trim() ?? "";

  const categoryCounts: Record<string, number> = {};
  for (const p of products) {
    categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
  }
  for (const c of CATEGORIES) {
    if (categoryCounts[c.id] == null) categoryCounts[c.id] = 0;
  }

  const featured = featuredPicks(6);

  // Structured data for rich SERP results.
  const itemListLd = jsonLdScript(productListJsonLd(featured));
  const faqLd = jsonLdScript(faqJsonLd());
  const breadcrumbLd = jsonLdScript(homeBreadcrumb());
  const reviewsLd = jsonLdScript(reviewsJsonLd());
  const articleLd = jsonLdScript(
    ARTICLES.map((a) =>
      articleJsonLd({
        title: a.title,
        description: a.excerpt,
        body: a.body,
        keywords: a.keywords,
        image: a.image,
        urlPath: "/#article-" + a.slug,
        datePublished: "2026-01-15",
        dateModified: "2026-07-01",
        author: "FitFeky Editorial Team",
      }),
    ),
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: itemListLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: reviewsLd }}
      />
      <HomeClient
        categoryCounts={categoryCounts}
        featuredPicks={featured}
        initialSearch={initialSearch}
        initialCategory={initialCategory}
      />
      <Footer />
    </>
  );
}
