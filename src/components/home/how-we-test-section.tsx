import Image from "next/image";
import { ShieldCheck, Lock, Eye, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TESTING_CRITERIA } from "@/lib/content";
import { resolveIcon } from "@/lib/icon-registry";

export function HowWeTestSection() {
  return (
    <section
      id="how-we-test"
      aria-labelledby="how-heading"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Visual */}
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-secondary/60 to-muted/40 shadow-2xl">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/how-we-test.png"
                alt="FitFeky editors testing at-home fitness gear including resistance bands, yoga wheel, smart scale and foam roller"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
          </div>

          {/* Floating score badge */}
          <div className="absolute -bottom-5 -right-3 rounded-2xl border border-border bg-card p-4 shadow-xl sm:-right-5">
            <div className="flex items-center gap-3">
              <div className="quality-ring grid h-12 w-12 place-items-center rounded-full" style={{ ["--score" as string]: 95 }}>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-card font-bold text-foreground">95</div>
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Avg quality</p>
                <p className="font-display text-lg font-bold text-foreground">Editor's Choice</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copy + criteria */}
        <div className="order-1 lg:order-2">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <ShieldCheck size={14} /> Our testing promise
          </p>
          <h2
            id="how-heading"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl"
          >
            No paid placements. Just rigorous, honest scoring.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Every product in our catalog is evaluated against four weighted
            criteria, designed around what actually matters to women building
            strength at midlife. We never accept payment for placement — our
            recommendations are earned, not bought.
          </p>

          <div className="mt-7 space-y-3">
            {TESTING_CRITERIA.map((c) => {
              const Icon = resolveIcon(c.icon);
              return (
                <div
                  key={c.title}
                  className="flex items-start gap-3 rounded-xl border border-border/50 bg-card/50 p-3.5"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-foreground">{c.title}</h3>
                      <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold text-accent-foreground">
                        {c.weight} weight
                      </span>
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
          <div className="mt-6 grid grid-cols-3 gap-3">
            <MicroBadge icon={Lock} label="No paid placement" />
            <MicroBadge icon={Eye} label="Independently verified" />
            <MicroBadge icon={HeartHandshake} label="Women-40+ focused" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MicroBadge({
  icon: Icon,
  label,
}: {
  icon: typeof Lock;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-border/50 bg-card/40 px-2 py-3 text-center">
      <Icon size={18} className="text-accent" />
      <span className="text-[11px] font-semibold leading-tight text-foreground/80">
        {label}
      </span>
    </div>
  );
}
