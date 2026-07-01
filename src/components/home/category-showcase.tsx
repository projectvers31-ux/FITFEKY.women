"use client";

import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { resolveIcon } from "@/lib/icon-registry";
import { StaggerContainer, StaggerItem } from "@/components/shared/animations";
import { cn } from "@/lib/utils";

interface CategoryShowcaseProps {
  counts: Record<string, number>;
  onSelect: (categoryId: string) => void;
}

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
          Fifteen thoughtfully curated categories — every product chosen for its
          kindness to joints, quality of build, and fit for women building
          strength at midlife and beyond.
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5" stagger={0.05}>
        {CATEGORIES.map((c) => {
          const Icon = resolveIcon(c.icon);
          const count = counts[c.id] ?? 0;
          return (
            <StaggerItem key={c.id}>
              <button
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
                <h3 className="mt-4 font-display text-base font-semibold leading-tight text-foreground">
                  {c.label}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {c.blurb}
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground/70">
                  {count} {count === 1 ? "piece" : "pieces"}
                </p>
              </button>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
