"use client";

import { useState, useCallback, useEffect } from "react";

import { Header } from "@/components/layout/header";
import { Hero } from "@/components/home/hero";
import { TrustBadgesBar } from "@/components/home/trust-badges-bar";
import { AboutSection } from "@/components/home/about-section";
import { TrustMarquee } from "@/components/home/stats-bar";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { FeaturedPicks } from "@/components/home/featured-picks";
import { HowWeTestSection } from "@/components/home/how-we-test-section";
import { BackToTop } from "@/components/shared/back-to-top";
import { LazySection } from "@/components/shared/lazy-section";
import { CalculatorsSection } from "@/components/calculators/calculators-section";
import { ProductCatalog } from "@/components/products/product-catalog";
import { ProductDetailDialog } from "@/components/products/product-detail-dialog";
import { BelowFoldSections } from "@/components/home/below-fold-sections";
import { CATEGORIES } from "@/lib/categories";
import type { Product } from "@/lib/types";

interface HomeClientProps {
  categoryCounts: Record<string, number>;
  featuredPicks: Product[];
  /** Deep-link search from ?search= (404 search bar, quiz). */
  initialSearch?: string;
  /** Deep-link category from ?category= (404 tiles, quiz results). */
  initialCategory?: string;
}

/**
 * Single client orchestrator for the homepage. Owns shared UI state and the
 * product detail dialog so every section can drive the same quick-view.
 *
 * Section order is tuned for conversion:
 *  Hero → Trust → Stats → Categories → Featured → How We Test → Calculators →
 *  Catalog → Buying guides → Testimonials → Editorial → FAQ → Newsletter
 */
export function HomeClient({ categoryCounts, featuredPicks, initialSearch = "", initialCategory = "" }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  // Sanitize deep-link category so a bad ?category= value never empties the catalog.
  const [selectedCategory, setSelectedCategory] = useState(() =>
    CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : "all",
  );
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const onQuickView = useCallback((p: Product) => setActiveProduct(p), []);
  const onSearch = useCallback((term: string) => setSearchTerm(term), []);
  const onCategorySelect = useCallback((cat: string) => setSelectedCategory(cat), []);

  // Deep-linked from another page (404 search, quiz) — land at the catalog.
  useEffect(() => {
    if (!initialSearch && !initialCategory) return;
    const t = window.setTimeout(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [initialSearch, initialCategory]);

  // Listen for category selection events from article CTAs
  useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail;
      if (cat) {
        setSelectedCategory(cat);
        setSearchTerm("");
      }
    };
    window.addEventListener("select-category", handler);
    return () => window.removeEventListener("select-category", handler);
  }, []);

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
        <AboutSection />
        <TrustMarquee />
        <CategoryShowcase counts={categoryCounts} onSelect={onCategorySelect} />
        <FeaturedPicks products={featuredPicks} onQuickView={onQuickView} onSeeAll={seeAll} />
        <HowWeTestSection />

        <LazySection minHeight={520}>
          <CalculatorsSection onQuickView={onQuickView} onCategorySelect={onCategorySelect} />
        </LazySection>
        <ProductCatalog
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onQuickView={onQuickView}
          onSearchChange={onSearch}
          onCategoryChange={onCategorySelect}
        />
        <LazySection minHeight={420}>
          <BelowFoldSections onCategorySelect={onCategorySelect} />
        </LazySection>
      </main>
      {activeProduct && (
        <ProductDetailDialog
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onQuickView={onQuickView}
        />
      )}
      <BackToTop />
    </>
  );
}
