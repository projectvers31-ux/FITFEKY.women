"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

interface PageShellProps {
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Optional right-aligned hero element (image, card, etc.) */
  heroVisual?: React.ReactNode;
}

/**
 * Shared layout for legal / editorial / marketing pages. Provides a
 * sticky header (with working home-page navigation), a hero band, and a
 * prose-friendly content column, then the footer.
 *
 * Uses the same warm editorial design system as the homepage.
 */
export function PageShell({ kicker, title, subtitle, children, heroVisual }: PageShellProps) {
  return (
    <>
      <Header
        onSearch={() => {
          /* search is home-page scoped; navigate there to use it */
          window.location.hash = "#catalog";
        }}
        onCategorySelect={() => {
          window.location.hash = "#catalog";
        }}
      />
      <main className="flex-1">
        {/* Hero band */}
        <section className="bg-ambient border-b border-border/50">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft size={15} /> Back to FitFeky
            </Link>
            <p className="kicker mt-6">{kicker}</p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {subtitle}
              </p>
            )}
            {heroVisual && <div className="mt-10">{heroVisual}</div>}
          </div>
        </section>

        {/* Content */}
        <section className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="prose-fitfeky">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/** Reusable section heading inside a page body. */
export function PageHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="mt-12 scroll-mt-24 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
    >
      {children}
    </h2>
  );
}

/** Reusable paragraph. */
export function PageP({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[15px] leading-relaxed text-foreground/80">{children}</p>
  );
}

/** Reusable bulleted list. */
export function PageList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-foreground/80">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Last-updated stamp shown under the hero. */
export function PageMeta({ updated }: { updated: string }) {
  return (
    <p className="mt-6 text-xs text-muted-foreground">
      Last updated: {updated}
    </p>
  );
}
