"use client";

import { useState } from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-foreground text-background section-editorial"
    >
      {/* Soft warm glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 blob bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 blob-2 bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="kicker mb-4 text-primary">Real women · Real results</p>
          <h2
            id="testimonials-heading"
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Strength, reclaimed.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-background/70">
            From regaining flexibility to managing chronic pain — these are the
            women whose lives changed with the right gear.
          </p>
        </div>

        {/* Featured testimonial — large editorial quote */}
        <figure className="mx-auto mt-14 max-w-3xl text-center">
          <Quote
            className="mx-auto h-10 w-10 text-primary/40"
            strokeWidth={1}
            fill="currentColor"
          />
          <blockquote className="mt-6 font-display text-2xl font-medium leading-[1.4] tracking-tight sm:text-3xl lg:text-[2.1rem] lg:leading-[1.4]">
            &ldquo;{TESTIMONIALS[active].quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-semibold text-white shadow-md",
                  TESTIMONIALS[active].accent,
                )}
                aria-hidden
              >
                {TESTIMONIALS[active].name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold text-background">
                  {TESTIMONIALS[active].name}, {TESTIMONIALS[active].age}
                </p>
                <p className="text-sm text-background/60">
                  {TESTIMONIALS[active].location} · {TESTIMONIALS[active].highlight}
                </p>
              </div>
            </div>
          </figcaption>
        </figure>

        {/* Selector dots */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === active ? "w-8 bg-primary" : "w-2 bg-background/30 hover:bg-background/50",
              )}
              aria-label={`Read ${t.name}'s story`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
