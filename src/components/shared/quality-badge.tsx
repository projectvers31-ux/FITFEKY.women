import { cn } from "@/lib/utils";

interface QualityBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

/**
 * Conic-gradient quality score ring. Scores >= 85 are "Editor's Choice".
 */
export function QualityBadge({
  score,
  size = "md",
  showLabel = true,
  className,
}: QualityBadgeProps) {
  const dim = size === "sm" ? 40 : size === "lg" ? 72 : 52;
  const labelSize =
    size === "sm" ? "text-[9px]" : size === "lg" ? "text-sm" : "text-[11px]";
  const editorsChoice = score >= 85;

  return (
    <div className={cn("flex items-center gap-2", className)}>
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
          style={{ width: dim - 6, height: dim - 6 }}
        >
          <span className={cn("font-semibold leading-none text-foreground", labelSize)}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="leading-tight">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Quality
          </p>
          <p
            className={cn(
              "text-xs font-medium",
              editorsChoice ? "text-primary" : "text-foreground/80",
            )}
          >
            {editorsChoice ? "Editor's Choice" : "Verified Pick"}
          </p>
        </div>
      )}
    </div>
  );
}
