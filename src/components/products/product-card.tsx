"use client";

import { Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/shared/product-image";
import { StarRating } from "@/components/shared/star-rating";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { categoryLabel } from "@/lib/categories";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <Card className="card-lift group relative flex flex-col overflow-hidden border-border/70 p-0">
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

        {/* top badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          <PriorityBadge priority={product.priority} />
        </div>
        <div className="absolute right-2 top-2">
          <span
            className="quality-ring grid h-9 w-9 place-items-center rounded-full"
            style={{ ["--score" as string]: product.qualityScore }}
            title={`Quality score ${product.qualityScore}/100`}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-card text-[10px] font-bold text-foreground">
              {product.qualityScore}
            </span>
          </span>
        </div>

        {/* Quick view overlay */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-primary/90 py-2 text-xs font-semibold text-primary-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
        >
          <Eye size={14} /> Quick view
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          {categoryLabel(product.category)}
        </p>
        <h3
          className="mt-1 line-clamp-2 cursor-pointer text-sm font-semibold leading-snug text-foreground hover:text-primary"
          onClick={() => onQuickView(product)}
        >
          {product.title}
        </h3>

        <div className="mt-2">
          <StarRating rating={product.rating} reviews={product.reviews} size={13} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div>
            {product.priceDisplay ? (
              <p className="font-display text-lg font-bold text-foreground">
                {product.priceDisplay}
              </p>
            ) : (
              <p className="text-xs font-medium text-muted-foreground">
                Price N/A
                <br />
                <span className="text-[10px]">see live price on Amazon</span>
              </p>
            )}
          </div>
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
