"use client";

import { ExternalLink, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  href: string;
  priceDisplay?: string | null;
  label?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "default" | "secondary" | "outline";
  fullWidth?: boolean;
}

/**
 * The primary conversion component. Optimised for external affiliate
 * redirection with proper rel attributes and graceful handling of missing
 * price (N/A) data.
 *
 * - When a price exists → "Check Price on Amazon · $X.XX"
 * - When price is N/A    → "View Price on Amazon"
 *
 * `rel="sponsored nofollow noopener noreferrer"` satisfies FTC + Amazon
 * Associates disclosure requirements for affiliate links.
 */
export function AffiliateButton({
  href,
  priceDisplay,
  label,
  size = "default",
  className,
  variant = "default",
  fullWidth,
}: AffiliateButtonProps) {
  const text = label ?? (priceDisplay ? `Check Price on Amazon` : `View Price on Amazon`);

  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn(
        "group gap-2 font-semibold shadow-sm transition-all",
        fullWidth && "w-full",
        className,
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        aria-label={`${text}${priceDisplay ? ` — ${priceDisplay}` : ""}`}
      >
        <ShoppingBag size={size === "sm" ? 15 : 17} className="shrink-0" />
        <span>{text}</span>
        {priceDisplay && (
          <span className="ml-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs font-bold tabular-nums">
            {priceDisplay}
          </span>
        )}
        <ExternalLink
          size={size === "sm" ? 13 : 15}
          className="shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </Button>
  );
}
