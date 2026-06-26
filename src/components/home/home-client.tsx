"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { TrustBadgesBar } from "@/components/home/trust-badges-bar";
import { TrustMarquee } from "@/components/home/stats-bar";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedPicks } from "@/components/home/featured-picks";
import { HowWeTestSection } from "@/components/home/how-we-test-section";
import { CalculatorsSection } from "@/components/calculators/calculators-section";
import { ProductCatalog } from "@/components/products/product-catalog";
import { ProductDetailDialog } from "@/components/products/product-detail-dialog";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { SeoContentSection } from "@/components/home/seo-content-section";
import { EditorialSection } from "@/components/home/editorial-section";
import { FaqSection } from "@/components/home/faq-section";
import { Newsletter } from "@/components/home/newsletter";
import type { Product } from "@/lib/types";

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
