import { cn } from "@/lib/utils";

/**
 * FitFeky brand logo — a custom monogram combining an "F" mark with a
 * growth leaf, symbolizing fitness + flourishing. Designed to match the
 * warm terracotta wellness aesthetic.
 *
 * Renders as an inline SVG so it scales crisply at any size and inherits
 * currentColor for theming.
 */
export function Logo({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="FitFeky logo"
    >
      {/* Rounded square background with warm gradient */}
      <defs>
        <linearGradient id="fitfeky-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--primary, #b85c3a)" />
          <stop offset="1" stopColor="var(--gold, #c9a96e)" />
        </linearGradient>
      </defs>

      {/* Background tile — rounded square */}
      <rect width="40" height="40" rx="11" fill="url(#fitfeky-grad)" />

      {/* The "F" monogram — confident, geometric */}
      <path
        d="M13 10 H27 V14 H17.5 V18.5 H25 V22.5 H17.5 V30 H13 V10 Z"
        fill="white"
      />

      {/* Growth leaf accent — the dot of the "F" becomes a sprouting leaf */}
      <path
        d="M27 10 C27 10 30 10 30 13 C30 16 27 16 27 16 C27 16 24 16 24 13 C24 10 27 10 27 10 Z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M27 11.5 C26 12.5 26 14 27 15 C28 14 28 12.5 27 11.5 Z"
        fill="var(--gold, #c9a96e)"
        opacity="0.5"
      />
    </svg>
  );
}

/** Compact wordmark + logo lockup for headers and footers. */
export function LogoLockup({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Logo size={size} />
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-semibold tracking-tight text-foreground">
          FitFeky
        </span>
      </span>
    </span>
  );
}
