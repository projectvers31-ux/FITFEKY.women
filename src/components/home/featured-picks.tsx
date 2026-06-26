"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/lib/types";

interface FeaturedPicksProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onSeeAll: () => void;
}

export function FeaturedPicks({ products, onQuickView, onSeeAll }: FeaturedPicksProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 720);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section id="featured" className="relative overflow-hidden bg-secondary/30 py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-accent/12 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Award size={14} /> Editor's Choice
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The top picks we'd buy ourselves
            </h2>
            <p className="mt-3 text-muted-foreground">
              Priority-A gear with the highest quality scores — the walking pads,
              bands and recovery tools that earned a perfect score from our team.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hidden h-10 w-10 sm:inline-flex" onClick={() => scrollBy(-1)} aria-label="Scroll left">
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" size="icon" className="hidden h-10 w-10 sm:inline-flex" onClick={() => scrollBy(1)} aria-label="Scroll right">
              <ChevronRight size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={onSeeAll}>
              View all <ArrowRight size={15} />
            </Button>
          </div>
        </div>

        <div
          ref={scroller}
          className="scroll-soft flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="w-[60%] shrink-0 snap-start sm:w-[40%] lg:w-[23%]"
            >
              <ProductCard product={p} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
