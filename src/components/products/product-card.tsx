"use client";

import { Eye, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProductImage } from "@/components/shared/product-image";
import { StarRating } from "@/components/shared/star-rating";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { categoryLabel } from "@/lib/categories";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

/**
 * Editorial product card — minimal borders, soft shadow, generous padding.
 * The image breathes; the type leads; the CTA is a refined pill.
 */
export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const editorsChoice = product.qualityScore >= 90;

  return (
    <Card className="card-modern group flex flex-col overflow-hidden p-0">
      {/* Image area — generous, with minimal overlay */}
      <button
        onClick={() => onQuickView(product)}
        className="relative block aspect-square overflow-hidden bg-secondary/50"
        aria-label={`View ${product.title}`}
      >
        <ProductImage
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Editor's Choice — minimalist top-left mark */}
        {editorsChoice && (
          <div className="absolute left-3 top-3">
            <span className="badge-minimal border-none bg-background/90 text-primary backdrop-blur-md">
              Editor's Choice
            </span>
          </div>
        )}

        {/* Quality score — refined, top-right */}
        <div className="absolute right-3 top-3">
          <span
            className="quality-ring grid h-9 w-9 place-items-center rounded-full shadow-sm backdrop-blur-md"
            style={{ ["--score" as string]: product.qualityScore }}
            title={`Quality score ${product.qualityScore}/100`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-background/95 text-[10px] font-bold text-foreground">
              {product.qualityScore}
            </span>
          </span>
        </div>

        {/* Quick view affordance — subtle, bottom */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-md backdrop-blur-md">
            <Eye size={13} /> Quick view
          </span>
        </div>
      </button>

      {/* Body — editorial type treatment, tighter padding on mobile */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="kicker mb-1.5 text-[0.625rem] sm:mb-2">
          {categoryLabel(product.category)}
        </p>
        <h3
          className="line-clamp-2 cursor-pointer font-display text-[0.8rem] font-semibold leading-snug text-foreground transition-colors hover:text-primary sm:text-[0.975rem]"
          onClick={() => onQuickView(product)}
        >
          {product.title}
        </h3>

        <div className="mt-2.5">
          <StarRating rating={product.rating} reviews={product.reviews} size={12} />
        </div>

        {/* Price — confident, editorial */}
        <div className="mt-auto pt-4">
          {product.priceDisplay ? (
            <div className="flex items-baseline gap-2">
              <p className="font-display text-xl font-semibold text-foreground">
                {product.priceDisplay}
              </p>
            </div>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">
              Price on Amazon
              <span className="ml-1.5 text-[10px] uppercase tracking-wide text-primary">
                Live
              </span>
            </p>
          )}
        </div>

        {/* Refined CTA row — larger touch targets on mobile */}
        <div className="mt-4 flex items-center gap-2">
          <AffiliateButton
            href={product.affiliateUrl}
            priceDisplay={product.priceDisplay}
            size="sm"
            fullWidth
            className="h-11 font-medium sm:h-9"
          />
          <button
            onClick={() => onQuickView(product)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary sm:h-9 sm:w-9"
            aria-label="View details"
          >
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </Card>
  );
}
