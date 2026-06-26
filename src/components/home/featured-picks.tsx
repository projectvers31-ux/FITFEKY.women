"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section id="featured" className="relative overflow-hidden bg-secondary/30 section-editorial">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 blob bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="kicker mb-4">The Edit</p>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              Our editor's top picks
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The walking pads, bands and recovery tools that earned a perfect
              quality score. The gear we'd actually buy for our own mothers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="hidden h-10 w-10 rounded-full sm:inline-flex" onClick={() => scrollBy(-1)} aria-label="Scroll left">
              <ChevronLeft size={18} />
            </Button>
            <Button variant="outline" size="icon" className="hidden h-10 w-10 rounded-full sm:inline-flex" onClick={() => scrollBy(1)} aria-label="Scroll right">
              <ChevronRight size={18} />
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5 rounded-full" onClick={onSeeAll}>
              View all <ArrowRight size={15} />
            </Button>
          </div>
        </div>

        <div
          ref={scroller}
          className="scroll-soft flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-[24%]"
            >
              <ProductCard product={p} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
