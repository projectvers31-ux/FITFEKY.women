import Link from "next/link";
import { ArrowRight, BadgeCheck, HeartHandshake, ScanSearch } from "lucide-react";

/**
 * Homepage "About" band — a crisp entity definition so humans and AI
 * crawlers both get an unambiguous statement of what FitFeky is.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About FitFeky"
      className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20 scroll-mt-24"
    >
      <div className="rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card/40 to-card/60 p-8 sm:p-12">
        <p className="kicker mb-4">About FitFeky</p>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3">
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
              The trusted gear guide for{" "}
              <span className="text-gradient-warm">women over 45.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/80">
              FitFeky is a curated fitness gear recommendation platform for
              women over 45. We quality-score every product on a transparent
              0–100 scale — real customer ratings, build quality and
              joint-friendliness — so you can shop home fitness equipment
              without the hype.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              Every pick is tested or deeply researched by our editorial team —
              including a licensed physical therapist who reviews each
              recommendation for joint safety — and we never accept payment
              for placement.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Meet the team &amp; our scoring process
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="flex flex-col justify-center gap-4 lg:col-span-2">
            <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card/70 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <ScanSearch size={18} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Transparent 0–100 quality scores
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Customer ratings, build quality and value for women 45+ —
                  published next to every product.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card/70 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <HeartHandshake size={18} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Independently tested &amp; reviewed
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Products are vetted by women who train — and a licensed DPT
                  checks every pick for joint safety.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-border/50 bg-card/70 p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <BadgeCheck size={18} strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  No paid placements, ever
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  We earn from Amazon links, never from brands — rankings can&rsquo;t
                  be bought.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
