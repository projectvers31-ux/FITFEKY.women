/**
 * Meta Pixel (Facebook) tracking helpers for FitFeky.
 *
 * The base pixel snippet is injected in `src/app/layout.tsx` <head> and fires
 * `PageView` on every full page load. For client-side (SPA) navigations,
 * `MetaPixelPageView` in `src/components/shared/meta-pixel-pageview.tsx` fires
 * `PageView` again on each route change.
 *
 * Use `fbTrack(event, params)` from any React component:
 *
 *   import { fbTrack } from "@/lib/meta-pixel";
 *   fbTrack("InitiateCheckout", { content_name: "Gear Quiz" });
 */
import { categoryLabel } from "@/lib/categories";

/** True only when NEXT_PUBLIC_META_PIXEL_ID is configured at build time. */
const pixelConfigured = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim() !== "";

/** Event names we use across the site (subset of Meta's standard events). */
export type MetaPixelEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "CompleteRegistration"
  | "Lead";

export interface MetaPixelParams {
  [key: string]: unknown;
}

/** Events fired before the pixel script is ready (ad-blockers, slow load). */
let pending: Array<{ event: string; params: MetaPixelParams }> = [];
let flushScheduled = false;

function getFbq(): ((...args: unknown[]) => void) | undefined {
  return typeof window !== "undefined"
    ? (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
    : undefined;
}

function flushPending() {
  const fbq = getFbq();
  if (typeof fbq !== "function") return;
  for (const item of pending) {
    fbq("track", item.event, item.params);
  }
  pending = [];
}

/**
 * Fire a Meta Pixel event. Safe to call from any client component, before or
 * after the pixel script has loaded — events are buffered and replayed once
 * `window.fbq` becomes available.
 */
export function fbTrack(event: string, params?: MetaPixelParams) {
  if (typeof window === "undefined") return;
  if (!pixelConfigured) return;
  const fbq = getFbq();
  const safeParams = params ?? {};
  if (typeof fbq === "function") {
    fbq("track", event, safeParams);
    return;
  }
  pending.push({ event, params: safeParams });
  if (!flushScheduled) {
    flushScheduled = true;
    const tryFlush = () => {
      const q = getFbq();
      if (typeof q === "function") {
        flushPending();
        flushScheduled = false;
      } else {
        setTimeout(tryFlush, 500);
      }
    };
    tryFlush();
  }
}

/** Minimal product shape accepted by the product-level tracking helpers. */
interface TrackableProduct {
  id: string;
  title: string;
  category?: string;
  price?: number | null;
}

/** ViewContent — product detail viewed (dialog / quick view). */
export function trackViewContent(product: TrackableProduct) {
  fbTrack("ViewContent", {
    content_ids: [product.id],
    content_name: product.title,
    content_category: product.category ? categoryLabel(product.category) : undefined,
    content_type: "product",
    value: product.price ?? undefined,
    currency: "USD",
  });
}

/** AddToCart — user clicked an Amazon ("View on Amazon") affiliate link. */
export function trackAddToCart(product: TrackableProduct) {
  fbTrack("AddToCart", {
    content_ids: [product.id],
    content_name: product.title,
    value: product.price ?? undefined,
    currency: "USD",
  });
}

/**
 * Gear Quiz events (quiz route not built yet — wire these when it ships):
 *
 *   // Fired when the user answers the first question:
 *   fbTrack("InitiateCheckout", {
 *     content_name: "Gear Quiz",
 *     content_category: "Quiz",
 *     num_items: 1,
 *   });
 *
 *   // Fired when the user reaches the results screen:
 *   fbTrack("CompleteRegistration", {
 *     content_name: "Gear Quiz Results",
 *     status: "complete",
 *   });
 */
