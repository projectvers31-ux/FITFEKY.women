"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openItem, setOpenItem] = useState<string>("item-0");

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-secondary/30 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <HelpCircle size={14} /> Questions, answered
          </p>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Everything women over 40 ask us about choosing, using and benefiting
            from at-home fitness gear.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="space-y-3"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={cn(
                "overflow-hidden rounded-xl border border-border/60 bg-card px-5 transition-shadow data-[state=open]:shadow-md",
                "[&[data-state=open]]:border-primary/30",
              )}
            >
              <AccordionTrigger className="py-4 text-left text-base font-semibold text-foreground hover:no-underline">
                <span className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  {item.q}
                </span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition-transform duration-200 [[data-state=open]_&]:rotate-180"
                />
              </AccordionTrigger>
              <AccordionContent className="pb-4 pl-10 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Still have a question?{" "}
          <a
            href="mailto:hello@fitfeky.com"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Email our editorial team
          </a>{" "}
          — we reply within 48 hours.
        </p>
      </div>
    </section>
  );
}
