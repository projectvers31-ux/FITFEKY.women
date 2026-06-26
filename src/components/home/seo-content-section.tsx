"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORY_CONTENT } from "@/lib/content";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryId } from "@/lib/types";

interface SeoContentSectionProps {
  onCategorySelect: (category: string) => void;
}

/**
 * Keyword-rich category buying-guide blocks. Each block targets a high-intent
 * long-tail query (e.g. "best resistance bands for women over 40") with an
 * H2, intro paragraph and keyword chips. Drives SEO indexing + buyer intent.
 */
export function SeoContentSection({ onCategorySelect }: SeoContentSectionProps) {
  // Only render blocks for categories that have curated content.
  const blocks = CATEGORIES.filter((c) => CATEGORY_CONTENT[c.id as CategoryId]);

  return (
    <section
      id="buying-guides"
      aria-label="Category buying guides"
      className="bg-background"
    >
      {blocks.map((cat, idx) => {
        const content = CATEGORY_CONTENT[cat.id as CategoryId];
        const reversed = idx % 2 === 1;
        return (
          <div
            key={cat.id}
            className={`border-b border-border/60 ${idx % 2 === 1 ? "bg-secondary/20" : ""}`}
          >
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
              <div className={`grid items-center gap-8 lg:grid-cols-12 ${reversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
                {/* Copy */}
                <div className="lg:col-span-8">
                  <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <BookOpen size={13} /> Buying guide
                  </p>
                  <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                    {content.h2}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {content.intro}
                  </p>

                  {/* Keyword chips (also aid semantic SEO) */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {content.keywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {k}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="outline"
                      className="group gap-2"
                      onClick={() => {
                        onCategorySelect(cat.id);
                        document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      Shop {cat.label}
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>

                {/* Stat / visual card */}
                <div className="lg:col-span-4">
                  <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {cat.label} at a glance
                    </p>
                    <p className="mt-3 font-display text-4xl font-bold text-foreground">
                      {cat.blurb}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Quality-scored by our editorial team
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
