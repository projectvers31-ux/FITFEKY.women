"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  /** Min height of the placeholder so the layout doesn't shift while the
   *  section hasn't mounted yet (default: 320px). */
  minHeight?: number;
}

/**
 * Mounts children only when they scroll within `rootMargin` of the viewport.
 * Cuts below-the-fold sections out of the initial DOM — Lighthouse's
 * "avoid an excessive DOM size" audit rewards < 1500 nodes.
 *
 * Server-side and at first paint this renders a compact placeholder, so
 * deep-link anchors (e.g. /#calculators) still land at the right scroll
 * position; the real content mounts the moment it enters the margin zone.
 */
export function LazySection({ children, className, minHeight = 320 }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      // 800px lookahead: mount before the user actually reaches the section.
      { rootMargin: "800px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? (
        children
      ) : (
        <div
          aria-hidden="true"
          className="flex items-center justify-center"
          style={{ minHeight }}
        >
          <span className="h-8 w-8 animate-pulse rounded-full bg-secondary/60" />
        </div>
      )}
    </div>
  );
}
