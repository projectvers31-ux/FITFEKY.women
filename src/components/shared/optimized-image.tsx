import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  /**
   * Responsive source sizes — REQUIRED for fill images. Example:
   * "(max-width: 640px) 100vw, 50vw". Prevents oversized downloads on mobile.
   */
  sizes: string;
  /**
   * Only for the LCP image (hero). Renders eager with fetchPriority="high".
   * All other images default to loading="lazy".
   */
  priority?: boolean;
  /** object-fit for the <img>. Default "cover" — never distorts. */
  objectFit?: "cover" | "contain";
  /** Wrapper classes — pass the layout box (e.g. "relative h-56 sm:h-72"). */
  className?: string;
  /** Extra classes for the <img> itself (hover transforms, transitions). */
  imgClassName?: string;
  /** Fill the wrapper (requires className with relative + a height/aspect). */
  fill?: boolean;
  /** Intrinsic size for non-fill images. */
  width?: number;
  height?: number;
  /** 1-100. Default 75. */
  quality?: number;
}

/**
 * Reusable optimized image. Uses next/image with AVIF/WebP formats
 * (configured in next.config.ts), responsive `sizes` srcsets, lazy loading
 * by default, and `fetchPriority="high"` ONLY when `priority` is set.
 *
 * - fill mode:        <OptimizedImage src alt sizes fill className="relative h-56" />
 * - intrinsic mode:   <OptimizedImage src alt sizes="400px" width={400} height={400} />
 */
export function OptimizedImage({
  src,
  alt,
  sizes,
  priority,
  objectFit = "cover",
  className,
  imgClassName,
  fill = true,
  width,
  height,
  quality,
}: OptimizedImageProps) {
  const img = (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      quality={quality}
      className={cn(
        objectFit === "contain" ? "object-contain" : "object-cover",
        imgClassName,
      )}
    />
  );

  if (!fill) return img;

  return <div className={cn("relative overflow-hidden", className)}>{img}</div>;
}
