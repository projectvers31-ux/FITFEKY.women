"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  href: string;
  priceDisplay?: string | null;
  label?: string;
  size?: "default" | "sm" | "lg";
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
}

/**
 * Refined affiliate CTA. Pill-shaped, warm, with the price as a subtle
 * chip. Handles N/A pricing gracefully.
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
  const text = label ?? (priceDisplay ? "Check Price on Amazon" : "View Price on Amazon");

  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn(
        "group gap-2 rounded-full font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
        fullWidth && "w-full",
        variant === "default" && "shadow-md hover:shadow-lg hover:shadow-primary/20",
        className,
      )}
    >
      <a
        href={href}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
        aria-label={`${text}${priceDisplay ? ` — ${priceDisplay}` : ""}`}
      >
        <span>{text}</span>
        {priceDisplay && (
          <span className="ml-0.5 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-xs font-semibold tabular-nums">
            {priceDisplay}
          </span>
        )}
        <ExternalLink
          size={size === "sm" ? 13 : 15}
          className="shrink-0 opacity-70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      </a>
    </Button>
  );
}
