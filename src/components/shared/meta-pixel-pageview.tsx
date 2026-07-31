"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { fbTrack } from "@/lib/meta-pixel";

/**
 * Fires Meta Pixel `PageView` on every client-side route change.
 * The base snippet already fires `PageView` on the initial full page load,
 * so the first render is skipped to avoid double-counting.
 */
export function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const page = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    fbTrack("PageView", { page });
  }, [pathname, searchParams]);

  return null;
}
