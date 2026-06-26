"use client";

import { useState } from "react";
import { Star, Quote, MapPin, BadgeCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-secondary/40 via-background to-background py-16 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <BadgeCheck size={13} /> Real women. Real results.
          </p>
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Join thousands of women who found their{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              strength again
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            From regaining flexibility to managing chronic pain — these are the
            women whose lives changed with the right gear.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="mx-auto mt-12 max-w-4xl">
          <Card className="relative overflow-hidden border-border/60 bg-card/80 p-6 shadow-xl backdrop-blur sm:p-10">
            <Quote
              className="absolute -right-2 -top-2 h-24 w-24 text-primary/8"
              strokeWidth={1}
              fill="currentColor"
            />
            <div className="relative">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-foreground">
                  5.0 Verified
                </span>
              </div>

              <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl lg:text-[1.7rem] lg:leading-relaxed">
                &ldquo;{TESTIMONIALS[active].quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-4">
                <div
                  className={cn(
                    "grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br font-display text-lg font-bold text-white shadow-md",
                    TESTIMONIALS[active].accent,
                  )}
                  aria-hidden
                >
                  {TESTIMONIALS[active].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {TESTIMONIALS[active].name}, {TESTIMONIALS[active].age}
                  </p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={12} /> {TESTIMONIALS[active].location}
                  </p>
                </div>
                <div className="ml-auto hidden rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-foreground sm:block">
                  {TESTIMONIALS[active].highlight}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Selector dots / mini-cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={cn(
                "group flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition-all",
                i === active
                  ? "border-primary/40 bg-primary/5 shadow-sm"
                  : "border-border/60 bg-card/40 hover:border-primary/30 hover:bg-card",
              )}
              aria-label={`Read ${t.name}'s story`}
            >
              <div
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-110",
                  t.accent,
                )}
              >
                {t.name.charAt(0)}
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-foreground">{t.name}</p>
                <p className="text-[10px] text-muted-foreground">Age {t.age}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Aggregate proof */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
            <Star size={16} className="fill-amber-400 text-amber-400" /> 4.8/5
            average from 12,400+ reviews
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="font-semibold text-foreground">
            50,000+ women served
          </span>
          <span className="text-muted-foreground">·</span>
          <span className="font-semibold text-foreground">
            172 products tested
          </span>
        </div>
      </div>
    </section>
  );
}
