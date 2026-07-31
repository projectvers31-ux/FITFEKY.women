"use client";

import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/seo";

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-secondary/30 section-editorial">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <p className="kicker mb-4">Questions, answered</p>
          <h2 id="faq-heading" className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Frequently asked
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Everything women over 45 ask us about choosing, using and benefiting
            from at-home fitness gear.
          </p>
        </div>

        {/* Native <details>/<summary> — zero JS, keyboard + screen-reader
            accessible, and no Radix accordion overhead. */}
        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group overflow-hidden rounded-2xl border border-border/50 bg-card px-6 transition-all open:border-primary/30 open:shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold leading-snug text-foreground [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="pb-5 text-[15px] leading-relaxed text-foreground/70">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Still have a question?{" "}
          <a
            href="mailto:hello@fitfeky.com"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Email our editorial team
          </a>
        </p>
      </div>
    </section>
  );
}
