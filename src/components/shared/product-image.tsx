"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  /** intrinsic width for the layout box */
  width?: number;
  height?: number;
  /** Only for LCP images — eager + fetchPriority="high". Default: lazy. */
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

/**
 * Resilient product image. Uses next/image with the Amazon CDN whitelisted
 * in next.config.ts. Images are re-encoded as AVIF/WebP and served at the
 * exact display size via the responsive srcset (formats configured in
 * next.config.ts). Falls back to a tasteful placeholder if the source 404s
 * or is blocked.
 */
export function ProductImage({
  src,
  alt,
  className,
  width = 400,
  height = 400,
  priority,
  sizes,
  quality,
}: ProductImageProps) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={cn(
          "grid place-items-center bg-gradient-to-br from-secondary to-muted text-muted-foreground",
          className,
        )}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <div className="flex flex-col items-center gap-1.5 p-4 text-center">
          <ImageOff size={22} strokeWidth={1.5} />
          <span className="text-[10px] font-medium uppercase tracking-wide">
            Image unavailable
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio: `${width} / ${height}` }}>
      {!loaded && (
        <div className="absolute inset-0 shimmer" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        onError={() => setErrored(true)}
        onLoad={() => setLoaded(true)}
        quality={quality}
        sizes={sizes}
        className={cn(
          "object-contain transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
