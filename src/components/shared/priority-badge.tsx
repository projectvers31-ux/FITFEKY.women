import { cn } from "@/lib/utils";
import type { Priority } from "@/lib/types";

/** Minimalist thin-stroke badges — editorial, not chunky. */
const STYLES: Record<Priority, { label: string; className: string }> = {
  A: {
    label: "Top Pick",
    className: "text-primary border-primary/40",
  },
  B: {
    label: "Recommended",
    className: "text-accent-foreground border-accent/40",
  },
  C: {
    label: "Good Option",
    className: "text-muted-foreground border-foreground/20",
  },
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: Priority;
  className?: string;
}) {
  const s = STYLES[priority];
  return (
    <span className={cn("badge-minimal", s.className, className)}>
      {s.label}
    </span>
  );
}
