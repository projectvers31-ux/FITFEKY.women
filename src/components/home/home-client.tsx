"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { TrustBadgesBar } from "@/components/home/trust-badges-bar";
import { TrustMarquee } from "@/components/home/stats-bar";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedPicks } from "@/components/home/featured-picks";
import { HowWeTestSection } from "@/components/home/how-we-test-section";
import type { Product } from "@/lib/types";

const CalculatorsSection = dynamic(
  () => import("@/components/calculators/calculators-section").then((m) => ({ default: m.CalculatorsSection })),
  { ssr: true },
);
const ProductCatalog = dynamic(
  () => import("@/components/products/product-catalog").then((m) => ({ default: m.ProductCatalog })),
  { ssr: true },
);
const ProductDetailDialog = dynamic(
  () => import("@/components/products/product-detail-dialog").then((m) => ({ default: m.ProductDetailDialog })),
  { ssr: false },
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/testimonials-section").then((m) => ({ default: m.TestimonialsSection })),
  { ssr: false },
);
const SeoContentSection = dynamic(
  () => import("@/components/home/seo-content-section").then((m) => ({ default: m.SeoContentSection })),
  { ssr: false },
);
const EditorialSection = dynamic(
  () => import("@/components/home/editorial-section").then((m) => ({ default: m.EditorialSection })),
  { ssr: false },
);
const FaqSection = dynamic(
  () => import("@/components/home/faq-section").then((m) => ({ default: m.FaqSection })),
  { ssr: false },
);
const Newsletter = dynamic(
  () => import("@/components/home/newsletter").then((m) => ({ default: m.Newsletter })),
  { ssr: false },
);

interface HomeClientProps {
  categoryCounts: Record<string, number>;
  featuredPicks: Product[];
}

/**
 * Single client orchestrator for the homepage. Owns shared UI state and the
 * product detail dialog so every section can drive the same quick-view.
 *
 * Section order is tuned for conversion:
 *  Hero → Trust → Stats → Categories → Featured → How We Test → Calculators →
 *  Catalog → Buying guides → Testimonials → Editorial → FAQ → Newsletter
 */
export function HomeClient({ categoryCounts, featuredPicks }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const onQuickView = useCallback((p: Product) => setActiveProduct(p), []);
  const onSearch = useCallback((term: string) => setSearchTerm(term), []);
  const onCategorySelect = useCallback((cat: string) => setSelectedCategory(cat), []);

  const seeAll = useCallback(() => {
    setSelectedCategory("all");
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <Header onSearch={onSearch} onCategorySelect={onCategorySelect} initialSearch={searchTerm} />
      <main className="flex-1">
        <Hero />
        <TrustBadgesBar />
        <TrustMarquee />
        <CategoryShowcase counts={categoryCounts} onSelect={onCategorySelect} />
        <FeaturedPicks products={featuredPicks} onQuickView={onQuickView} onSeeAll={seeAll} />
        <HowWeTestSection />

        <CalculatorsSection onQuickView={onQuickView} onCategorySelect={onCategorySelect} />
        <ProductCatalog
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onQuickView={onQuickView}
          onSearchChange={onSearch}
          onCategoryChange={onCategorySelect}
        />
        <SeoContentSection onCategorySelect={onCategorySelect} />
        <TestimonialsSection />
        <EditorialSection />
        <FaqSection />
        <Newsletter />
      </main>
      <ProductDetailDialog
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onQuickView={onQuickView}
      />
    </>
  );
}
