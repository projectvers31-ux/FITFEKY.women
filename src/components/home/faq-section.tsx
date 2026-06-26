"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    <section id="faq" aria-labelledby="faq-heading" className="bg-secondary/30 section-editorial">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 text-center">
          <p className="kicker mb-4">Questions, answered</p>
          <h2 id="faq-heading" className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
            Frequently asked
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Everything women over 40 ask us about choosing, using and benefiting
            from at-home fitness gear.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="space-y-2"
        >
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className={cn(
                "overflow-hidden rounded-2xl border border-border/50 bg-card px-6 transition-all",
                "[&[data-state=open]]:border-primary/30 [&[data-state=open]]:shadow-sm",
              )}
            >
              <AccordionTrigger className="py-5 text-left font-display text-lg font-semibold leading-snug text-foreground hover:no-underline">
                {item.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-muted-foreground transition-transform duration-300 [[data-state=open]_&]:rotate-180"
                />
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-foreground/70">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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
