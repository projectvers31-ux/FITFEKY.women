import { cn } from "@/lib/utils";

interface QualityBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

/**
 * Refined quality indicator. Minimalist ring + label. Scores >= 85
 * read as "Editor's Choice" in gold.
 */
export function QualityBadge({
  score,
  size = "md",
  showLabel = true,
  className,
}: QualityBadgeProps) {
  const dim = size === "sm" ? 36 : size === "lg" ? 64 : 48;
  const labelSize =
    size === "sm" ? "text-[10px]" : size === "lg" ? "text-sm" : "text-xs";
  const editorsChoice = score >= 85;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="quality-ring relative grid place-items-center rounded-full"
        style={
          {
            width: dim,
            height: dim,
            ["--score" as string]: Math.max(0, Math.min(100, score)),
          } as React.CSSProperties
        }
      >
        <div
          className="grid place-items-center rounded-full bg-card"
          style={{ width: dim - 5, height: dim - 5 }}
        >
          <span className={cn("font-semibold leading-none text-foreground", labelSize)}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="leading-tight">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Quality
          </p>
          <p
            className={cn(
              "text-xs font-medium",
              editorsChoice ? "text-primary" : "text-foreground/80",
            )}
          >
            {editorsChoice ? "Editor's Choice" : "Verified"}
          </p>
        </div>
      )}
    </div>
  );
}
