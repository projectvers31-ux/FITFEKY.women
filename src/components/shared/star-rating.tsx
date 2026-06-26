import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number | null;
  reviews?: number | null;
  size?: number;
  className?: string;
  showCount?: boolean;
}

/** Refined star rating — smaller, amber, with review count in muted tone. */
export function StarRating({
  rating,
  reviews,
  size = 13,
  className,
  showCount = true,
}: StarRatingProps) {
  if (rating == null) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        Not yet rated
      </span>
    );
  }

  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const roundedFull = rating - full >= 0.75 ? full + 1 : full;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => {
          const isFull = i < roundedFull;
          const isHalf = hasHalf && i === full;
          return (
            <span key={i} className="relative" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="absolute inset-0 text-amber-500/25"
                strokeWidth={1.5}
              />
              {(isFull || isHalf) && (
                <Star
                  size={size}
                  className="absolute inset-0 text-amber-500"
                  strokeWidth={1.5}
                  style={{ fill: "currentColor", clipPath: isHalf ? "inset(0 50% 0 0)" : undefined }}
                />
              )}
            </span>
          );
        })}
      </div>
      <span className="text-xs font-medium text-foreground/80">{rating.toFixed(1)}</span>
      {showCount && (
        <span className="text-[11px] text-muted-foreground">
          {reviews != null ? `(${reviews.toLocaleString("en-US")})` : ""}
        </span>
      )}
    </div>
  );
}
