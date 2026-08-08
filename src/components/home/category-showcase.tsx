"use client";

import { ArrowUpRight } from "lucide-react";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/categories";
import { resolveIcon } from "@/lib/icon-registry";
import { StaggerContainer } from "@/components/shared/animations";

interface CategoryShowcaseProps {
  counts: Record<string, number>;
  onSelect: (categoryId: string) => void;
}

/** Hero categories surfaced as editorial H3 collection cards. */
const FEATURED_COLLECTIONS: {
  categoryId: string;
  title: string;
  blurb: string;
}[] = [
  {
    categoryId: "treadmill",
    title: "Low-Impact Walking Pads & Treadmills",
    blurb: "Knee-friendly cardio for daily steps — quiet enough for the living room.",
  },
  {
    categoryId: "yoga_mat",
    title: "Cushioned Yoga & Joint Support Gear",
    blurb: "Thick mats and support gear that protect wrists and knees in every pose.",
  },
  {
    categoryId: "resistance_bands",
    title: "Ergonomic Resistance Bands",
    blurb: "Joint-safe strength training for active aging — no heavy iron required.",
  },
];

export function CategoryShowcase({ counts, onSelect }: CategoryShowcaseProps) {
  const handle = (id: string) => {
    onSelect(id);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 section-editorial scroll-mt-24">
      <div className="mb-12 max-w-2xl">
        <p className="kicker mb-4">Browse by category</p>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          Shop by what{" "}
          <span className="text-gradient-warm">moves you.</span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Fifteen thoughtfully curated categories — low-impact walking pads,
          cushioned yoga &amp; joint support gear, ergonomic resistance bands,
          and more. Every product chosen for its kindness to joints, quality
          of build, and fit for women building strength at midlife and beyond.
        </p>
      </div>

      {/* Featured collections — keyword-driven H3 headings */}
      <div className="mb-10 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {FEATURED_COLLECTIONS.map((col) => {
          const meta = CATEGORY_MAP[col.categoryId as keyof typeof CATEGORY_MAP];
          const Icon = meta ? resolveIcon(meta.icon) : resolveIcon("Sparkles");
          const count = meta ? (counts[meta.id] ?? 0) : 0;
          return (
            <button
              key={col.categoryId}
              type="button"
              onClick={() => handle(col.categoryId)}
              className="card-modern group flex min-h-[150px] flex-col items-start justify-between bg-gradient-to-br from-primary/5 to-accent/10 p-5 text-left transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="flex w-full items-start justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="rounded-full border border-primary/20 bg-background/60 px-2.5 py-1 text-[11px] font-medium text-primary">
                  {count} picks
                </span>
              </div>
              <div className="mt-4">
                <h3 className="font-display text-xl font-semibold leading-tight text-foreground">
                  {col.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                  {col.blurb}
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Shop the collection
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </button>
          );
        })}
      </div>

      <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" stagger={0.05}>
        {CATEGORIES.map((c) => {
          const Icon = resolveIcon(c.icon);
          const count = counts[c.id] ?? 0;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handle(c.id)}
              className="card-modern group flex min-h-[120px] w-full flex-col items-start p-4 text-left transition-transform hover:scale-[1.02] active:scale-[0.99] sm:p-5"
            >
                <div className="flex w-full items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/8 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-muted-foreground/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  />
                </div>
                <p className="mt-4 font-display text-base font-semibold leading-tight text-foreground">
                  {c.label}
                </p>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                  {c.blurb}
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                  {count} {count === 1 ? "piece" : "pieces"}
                </p>
            </button>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
