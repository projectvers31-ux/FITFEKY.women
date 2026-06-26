import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { catalogStats } from "@/lib/product-utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const stats = catalogStats();

  return (
    <section
      id="top"
      aria-label="FitFeky — premium at-home fitness for women over 40"
      className="relative overflow-hidden"
    >
      {/* Full-bleed editorial image — shorter on mobile for faster load */}
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden sm:h-[80vh] sm:min-h-[600px] lg:h-[88vh] lg:min-h-[640px]">
        <Image
          src="/hero-editorial.png"
          alt="A confident woman in her early fifties stretching on a yoga mat in a sunlit minimalist living room"
          fill
          className="object-cover"
          sizes="100vw"
          priority
          fetchPriority="high"
        />
        {/* Warm overlay for legibility — gradient, not a flat block */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/20" />

        {/* Editorial content — left-aligned, magazine cover style */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              className="max-w-2xl"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
              }}
            >
              <motion.p
                className="kicker mb-5 flex items-center gap-2"
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <motion.span
                  className="h-px bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                />
                The Curated Edit · 2026
              </motion.p>

              <motion.h1
                className="font-display text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-6xl lg:text-7xl"
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              >
                Strength finds you{" "}
                <span className="text-gradient-warm text-gradient-animate">at home.</span>
              </motion.h1>

              <motion.p
                className="mt-5 max-w-xl text-[15px] leading-relaxed text-foreground/75 sm:text-lg"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              >
                Premium, quality-scored fitness gear for women in their forties,
                fifties and beyond. Walking pads, resistance bands, yoga essentials
                and recovery tools — curated by women who train, for women who
                move with intention.
              </motion.p>

              <motion.div
                className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              >
                <Button asChild size="lg" className="group h-12 gap-2 rounded-full px-6 text-[15px] font-medium shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03] active:scale-[0.98] sm:h-14 sm:px-7 sm:text-base">
                  <Link href="#featured">
                    Explore the Edit
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="h-12 gap-2 rounded-full px-6 text-[15px] font-medium text-foreground transition-transform hover:scale-[1.03] active:scale-[0.98] hover:bg-foreground/5 sm:h-14 sm:text-base">
                  <Link href="#calculators">
                    Free Wellness Tools
                  </Link>
                </Button>
              </motion.div>

              {/* Inline proof */}
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
                <span className="flex items-center gap-2 text-foreground/70">
                  <span className="flex">
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
                  For women <span className="font-semibold text-foreground">40 · 50 · 60+</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
