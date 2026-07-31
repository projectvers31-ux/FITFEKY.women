"use client";

import { SeoContentSection } from "@/components/home/seo-content-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { EditorialSection } from "@/components/home/editorial-section";
import { FaqSection } from "@/components/home/faq-section";
import { Newsletter } from "@/components/home/newsletter";

interface BelowFoldSectionsProps {
  onCategorySelect: (category: string) => void;
}

/**
 * Below-the-fold homepage sections bundled into a single lazy chunk so the
 * browser fetches one JS file instead of five as the user scrolls.
 */
export function BelowFoldSections({ onCategorySelect }: BelowFoldSectionsProps) {
  return (
    <>
      <SeoContentSection onCategorySelect={onCategorySelect} />
      <TestimonialsSection />
      <EditorialSection />
      <FaqSection />
      <Newsletter />
    </>
  );
}
