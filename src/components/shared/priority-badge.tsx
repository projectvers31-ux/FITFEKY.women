import { cn } from "@/lib/utils";
import type { Priority } from "@/lib/types";

const STYLES: Record<Priority, { label: string; className: string }> = {
  A: {
    label: "Top Pick",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  B: {
    label: "Recommended",
    className: "bg-accent/15 text-accent-foreground border-accent/25",
  },
  C: {
    label: "Good Option",
    className: "bg-muted text-muted-foreground border-border",
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
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        s.className,
        className,
      )}
    >
      {s.label}
    </span>
  );
}
