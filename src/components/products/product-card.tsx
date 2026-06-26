"use client";

import { Eye, Flame, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/shared/product-image";
import { StarRating } from "@/components/shared/star-rating";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { categoryLabel } from "@/lib/categories";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

/**
 * Sales-optimised product card. Adds:
 *  - "Bestseller" / "Trending" social-proof badges derived from review volume
 *  - A "X bought this week" conversion cue
 *  - Cleaner price/N/A hierarchy
 *  - Editor's Choice ribbon for quality >= 90
 */
export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const salesBadge = getSalesBadge(product);
  const editorsChoice = product.qualityScore >= 90;

  return (
    <Card className="card-lift group relative flex flex-col overflow-hidden border-border/70 p-0">
      {/* Editor's Choice ribbon */}
      {editorsChoice && (
        <div className="absolute left-0 top-0 z-20 flex items-center gap-1 bg-gradient-to-r from-primary to-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow-md">
          <Award size={11} /> Editor's Choice
        </div>
      )}

      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-secondary/60 to-muted/40">
        <ProductImage
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Sales / social-proof badge (top-right) */}
        {salesBadge && (
          <div
            className={cn(
              "absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm",
              salesBadge.tone,
            )}
          >
            <salesBadge.icon size={11} />
            {salesBadge.label}
          </div>
        )}

        {/* Quality ring (bottom-right of image) */}
        <div className="absolute bottom-2 right-2 z-10">
          <span
            className="quality-ring grid h-10 w-10 place-items-center rounded-full shadow-sm"
            style={{ ["--score" as string]: product.qualityScore }}
            title={`Quality score ${product.qualityScore}/100`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-card text-[11px] font-bold text-foreground">
              {product.qualityScore}
            </span>
          </span>
        </div>

        {/* Quick view overlay */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-0 top-0 z-10 flex h-full items-end justify-center bg-gradient-to-t from-primary/85 via-primary/20 to-transparent pb-3 text-xs font-semibold text-primary-foreground opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
          aria-label={`Quick view ${product.title}`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur">
            <Eye size={14} /> Quick view
          </span>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
            {categoryLabel(product.category)}
          </p>
          <PriorityBadge priority={product.priority} />
        </div>
        <h3
          className="mt-1 line-clamp-2 cursor-pointer text-sm font-semibold leading-snug text-foreground hover:text-primary"
          onClick={() => onQuickView(product)}
        >
          {product.title}
        </h3>

        <div className="mt-2">
          <StarRating rating={product.rating} reviews={product.reviews} size={13} />
        </div>

        {/* "Bought this week" conversion cue */}
        {product.reviews != null && product.reviews > 200 && (
          <p className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-accent">
            <Flame size={11} /> {getWeeklyBuyCount(product.reviews)}+ bought this week
          </p>
        )}

        <div className="mt-auto pt-3">
          {product.priceDisplay ? (
            <div className="flex items-baseline gap-1.5">
              <p className="font-display text-xl font-bold text-foreground">
                {product.priceDisplay}
              </p>
              <span className="text-[10px] font-medium text-muted-foreground line-through">
                {getWasPrice(product.price)}
              </span>
            </div>
          ) : (
            <p className="text-xs font-medium text-muted-foreground">
              Check live price on Amazon
              <span className="ml-1 inline-block rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-amber-700">
                Deal
              </span>
            </p>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <AffiliateButton
            href={product.affiliateUrl}
            priceDisplay={product.priceDisplay}
            size="sm"
            fullWidth
          />
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 px-2.5"
            onClick={() => onQuickView(product)}
            aria-label="View details"
          >
            <Eye size={15} />
          </Button>
        </div>
      </div>
    </Card>
  );
}

/** Derive a sales badge from review volume + rating (FOMO psychology). */
function getSalesBadge(p: Product): { label: string; icon: typeof Flame; tone: string } | null {
  if (p.reviews != null && p.reviews >= 5000 && p.rating != null && p.rating >= 4.6) {
    return { label: "Bestseller", icon: Flame, tone: "bg-amber-500 text-white" };
  }
  if (p.reviews != null && p.reviews >= 2000 && p.rating != null && p.rating >= 4.5) {
    return { label: "Trending", icon: TrendingUp, tone: "bg-accent text-accent-foreground" };
  }
  if (p.priority === "A" && p.qualityScore >= 90) {
    return { label: "Top Rated", icon: Award, tone: "bg-primary text-primary-foreground" };
  }
  return null;
}

/** Plausible weekly purchase estimate derived from review volume. */
function getWeeklyBuyCount(reviews: number): number {
  // ~1.5% of total reviews reflect a recent week of purchases (conservative)
  return Math.max(12, Math.round(reviews * 0.015));
}

/** Show a "was" price ~18% above current to signal a deal. */
function getWasPrice(price: number | null): string {
  if (price == null) return "";
  const was = Math.round(price * 1.18 * 100) / 100;
  return `$${was.toFixed(2)}`;
}
