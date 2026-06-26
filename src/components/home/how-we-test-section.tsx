import Image from "next/image";
import { ShieldCheck, Lock, Eye, HeartHandshake } from "lucide-react";
import { TESTING_CRITERIA } from "@/lib/content";
import { resolveIcon } from "@/lib/icon-registry";

export function HowWeTestSection() {
  return (
    <section id="how-we-test" aria-labelledby="how-heading" className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 section-editorial">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Visual — large, breathing */}
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-secondary/40 shadow-xl">
            <div className="relative aspect-[4/5] w-full sm:aspect-[4/4]">
              <Image
                src="/how-we-test.png"
                alt="FitFeky editors testing at-home fitness gear"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Floating score card */}
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-xl backdrop-blur sm:-right-5">
            <div className="flex items-center gap-3">
              <div className="quality-ring grid h-12 w-12 place-items-center rounded-full" style={{ ["--score" as string]: 95 }}>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-card font-bold text-foreground">95</div>
              </div>
              <div className="leading-tight">
                <p className="kicker text-[0.625rem]">Avg quality</p>
                <p className="font-display text-lg font-semibold text-foreground">Editor's Choice</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copy + criteria */}
        <div className="order-1 lg:order-2">
          <p className="kicker mb-4">Our promise</p>
          <h2 id="how-heading" className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            No paid placements.
            <br />
            Just <span className="text-gradient-warm">honest scoring.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Every product is evaluated against four weighted criteria, designed
            around what actually matters to women building strength at midlife.
            We never accept payment for placement — our recommendations are
            earned, not bought.
          </p>

          <div className="mt-8 space-y-2.5">
            {TESTING_CRITERIA.map((c) => {
              const Icon = resolveIcon(c.icon);
              return (
                <div
                  key={c.title}
                  className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-primary/30"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/8 text-primary">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                      <span className="text-xs font-semibold text-primary">{c.weight}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust micro-badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            <MicroBadge icon={Lock} label="No paid placement" />
            <MicroBadge icon={Eye} label="Independently verified" />
            <MicroBadge icon={HeartHandshake} label="Women 40+ focused" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MicroBadge({ icon: Icon, label }: { icon: typeof Lock; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs font-medium text-foreground/70">
      <Icon size={13} className="text-accent" />
      {label}
    </span>
  );
}
