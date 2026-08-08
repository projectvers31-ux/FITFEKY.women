import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OptimizedImage } from "@/components/shared/optimized-image";
import { catalogStats } from "@/lib/product-utils";

export function Hero() {
  const stats = catalogStats();

  return (
    <section
      id="top"
      aria-label="FitFeky — curated joint-friendly home fitness gear for women over 45"
      className="relative overflow-hidden"
    >
      {/* Full-bleed editorial image — shorter on mobile for faster load.
          LCP: priority → eager + fetchPriority="high". */}
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden sm:h-[80vh] sm:min-h-[600px] lg:h-[88vh] lg:min-h-[640px]">
        <OptimizedImage
          src="/hero-editorial.png"
          alt="A confident woman in her early fifties stretching on a cushioned yoga mat during a low-impact home workout in a sunlit minimalist living room"
          sizes="100vw"
          className="h-full w-full"
          priority
        />
        {/* Warm overlay for legibility — gradient, not a flat block */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

        {/* Editorial content — left-aligned, magazine cover style */}
        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 lg:px-12">
          <div className="w-full max-w-2xl hero-stagger">
              <p className="kicker mb-5 flex items-center gap-2 hero-fade-in hero-delay-1">
                <span className="hero-line h-px bg-primary" />
                FitFeky · The Curated Edit · 2026
              </p>

              <h1 className="font-display text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl hero-fade-in hero-delay-2">
                Curated Joint-Friendly{" "}
                <span className="text-gradient-warm text-gradient-animate">Home Fitness Gear</span>{" "}
                for Women Over 45
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/85 sm:text-lg hero-fade-in hero-delay-3">
                FitFeky quality-scores every pick on a transparent 0–100
                scale — quiet walking pads for low-impact workouts,
                ergonomic resistance bands for active aging, and
                knee-friendly equipment vetted by women who train, for
                women building strength at midlife.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center hero-fade-in hero-delay-4">
                <Button asChild size="lg" className="group h-12 gap-2 rounded-full px-7 text-[15px] font-medium shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:h-14 sm:px-8 sm:text-base">
                  <Link href="#featured">
                    Explore the Edit
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="h-12 gap-2 rounded-full px-7 text-[15px] font-medium text-foreground transition-transform hover:scale-[1.03] active:scale-[0.98] hover:bg-foreground/5 sm:h-14 sm:text-base">
                  <Link href="#calculators">
                    Free Wellness Tools
                  </Link>
                </Button>
              </div>

              {/* Inline proof */}
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm hero-fade-in hero-delay-5">
                <span className="flex items-center gap-2 text-foreground/70">
                  <span className="flex" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-500 text-amber-500" />
                    ))}
                  </span>
                  <span className="font-semibold text-foreground">{stats.avgRating}</span>
                  · {stats.totalReviews.toLocaleString("en-US")}+ reviews
                </span>
                <span className="h-4 w-px bg-foreground/15" />
                <span className="text-foreground/70">
                  <span className="font-semibold text-foreground">{stats.total}</span> products vetted
                </span>
                <span className="h-4 w-px bg-foreground/15" />
                <span className="text-foreground/70">
                  For women <span className="font-semibold text-foreground">45 · 55 · 65+</span>
                </span>
              </div>

              {/* Trust chips */}
              <div className="mt-6 flex flex-wrap gap-2 hero-fade-in hero-delay-5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3.5 py-2 text-xs font-medium text-foreground/80 backdrop-blur-md">
                  <ShieldCheck size={14} className="text-accent" />
                  No paid placements
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3.5 py-2 text-xs font-medium text-foreground/80 backdrop-blur-md">
                  <BadgeCheck size={14} className="text-primary" />
                  Editorially reviewed
                </span>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
