"use client";

import { ArrowUpRight } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { resolveIcon } from "@/lib/icon-registry";
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
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Find your fit
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shop by what moves you
          </h2>
          <p className="mt-3 text-muted-foreground">
            From under-desk walking pads to recovery massage guns — every
            category is curated around low-impact, joint-kind movement for
            women in their 40s, 50s and beyond.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
        {CATEGORIES.map((c, idx) => {
          const Icon = resolveIcon(c.icon);
          const count = counts[c.id] ?? 0;
          const featured = idx < 5; // first row gets larger treatment on desktop
          return (
            <button
              key={c.id}
              onClick={() => handle(c.id)}
              className={cn(
                "card-lift group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-4 text-left sm:p-5",
                featured && "lg:col-span-1",
              )}
            >
              {/* gradient accent */}
              <div
                className={cn(
                  "pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-40",
                  c.accent,
                )}
              />
              <div
                className={cn(
                  "relative grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                  c.accent,
                )}
              >
                <Icon size={20} />
              </div>
              <h3 className="relative mt-4 font-display text-base font-bold text-foreground sm:text-lg">
                {c.label}
              </h3>
              <p className="relative mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {c.blurb}
              </p>
              <div className="relative mt-3 flex items-center justify-between">
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                  {count} {count === 1 ? "item" : "items"}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
