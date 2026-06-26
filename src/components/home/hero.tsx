import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catalogStats } from "@/lib/product-utils";

export function Hero() {
  const stats = catalogStats();

  return (
    <section
      id="top"
      aria-label="FitFeky — premium at-home fitness for women over 40"
      className="relative overflow-hidden"
    >
      {/* Full-bleed editorial image */}
      <div className="relative h-[88vh] min-h-[640px] w-full overflow-hidden">
        <Image
          src="/hero-editorial.png"
          alt="A confident woman in her early fifties stretching on a yoga mat in a sunlit minimalist living room"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Warm overlay for legibility — gradient, not a flat block */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

        {/* Editorial content — left-aligned, magazine cover style */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <div className="max-w-2xl animate-fade-up">
              <p className="kicker mb-5 flex items-center gap-2">
                <span className="h-px w-8 bg-primary" />
                The Curated Edit · 2026
              </p>

              <h1 className="font-display text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl">
                Strength finds you{" "}
                <span className="text-gradient-warm">at home.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
                Premium, quality-scored fitness gear for women in their forties,
                fifties and beyond. Walking pads, resistance bands, yoga essentials
                and recovery tools — curated by women who train, for women who
                move with intention.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="group gap-2 rounded-full px-7 py-6 text-base font-medium shadow-lg shadow-primary/20">
                  <Link href="#featured">
                    Explore the Edit
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="gap-2 rounded-full px-6 py-6 text-base font-medium text-foreground hover:bg-foreground/5">
                  <Link href="#calculators">
                    Free Wellness Tools
                  </Link>
                </Button>
              </div>

              {/* Inline proof */}
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
                <span className="flex items-center gap-2 text-foreground/70">
                  <span className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className="fill-amber-500 text-amber-500" />
                    ))}
                  </span>
                  <span className="font-semibold text-foreground">{stats.avgRating}</span>
                  · {stats.totalReviews.toLocaleString()}+ reviews
                </span>
                <span className="h-4 w-px bg-foreground/15" />
                <span className="text-foreground/70">
                  <span className="font-semibold text-foreground">{stats.total}</span> products vetted
                </span>
                <span className="h-4 w-px bg-foreground/15" />
                <span className="text-foreground/70">
                  For women <span className="font-semibold text-foreground">40 · 50 · 60+</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
