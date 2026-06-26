import { Award, Users, Star, ShieldCheck } from "lucide-react";
import { TRUST_BADGES } from "@/lib/content";

const ICONS = [Award, Users, Star, ShieldCheck];

/**
 * High-trust social-proof strip. Sits directly under the hero to establish
 * credibility before the visitor hits any product. Each badge pairs a strong
 * claim with supporting microcopy.
 */
export function TrustBadgesBar() {
  return (
    <section
      aria-label="Why women trust FitFeky"
      className="border-y border-border/60 bg-card/60"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border/60 px-4 sm:px-6 lg:grid-cols-4 lg:divide-y-0 lg:px-8">
        {TRUST_BADGES.map((badge, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={badge.label}
              className="flex items-center gap-3 p-4 sm:p-5"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
                <Icon size={20} />
              </span>
              <div className="leading-tight">
                <p className="font-display text-base font-bold text-foreground sm:text-lg">
                  {badge.label}
                </p>
                <p className="text-xs text-muted-foreground">{badge.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
