"use client";

import { memo } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { ProductImage } from "@/components/shared/product-image";
import { StarRating } from "@/components/shared/star-rating";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { categoryLabel } from "@/lib/categories";
import { productImageAlt } from "@/lib/product-utils";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard = memo(function ProductCard({ product, onQuickView }: ProductCardProps) {
  const editorsChoice = product.qualityScore >= 90;

  return (
    <article className="card-modern group flex h-full flex-col overflow-hidden p-0">
      {/* Image area — generous, with minimal overlay */}
      <button
        onClick={() => onQuickView(product)}
        className="relative block aspect-square overflow-hidden bg-secondary/50"
        aria-label={`View ${product.title}`}
      >
        <ProductImage
          src={product.image}
          alt={productImageAlt(product)}
          width={500}
          height={500}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        {/* Editor's Choice — minimalist top-left mark */}
        {editorsChoice && (
          <span className="badge-minimal absolute left-3 top-3 border-none bg-background/90 text-primary backdrop-blur-md">
            Editor's Choice
          </span>
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
        <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 shadow-md backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          <Sparkles size={13} /> Why we recommend it
        </span>
      </button>

      {/* Body — editorial type treatment, tighter padding on mobile */}
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="kicker mb-1.5 text-[0.625rem] sm:mb-2">
          {categoryLabel(product.category)}
        </p>
        <p
          className="line-clamp-2 cursor-pointer font-display text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary sm:text-[1.0625rem]"
          onClick={() => onQuickView(product)}
        >
          {product.title}
        </p>

        <StarRating rating={product.rating} reviews={product.reviews} size={13} className="mt-2.5" />

        {/* Key benefit + why-recommendation — the clearest reason this pick suits women 45+ */}
        <p className="mt-2.5 flex items-start gap-1.5 text-[13px] leading-snug text-muted-foreground sm:text-sm">
          <Sparkles size={13} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            <span className="font-medium text-foreground/90">Why we recommend it:</span>{" "}
            Great for <span className="font-medium text-foreground/80">{product.mainKeyword}</span>.
          </span>
        </p>

        {/* Price — confident, editorial */}
        {product.priceDisplay ? (
          <p className="mt-auto pt-4 font-display text-xl font-semibold text-foreground">
            {product.priceDisplay}
          </p>
        ) : (
          <p className="mt-auto pt-4 text-sm font-medium text-muted-foreground">
            Price on Amazon
            <span className="ml-1.5 text-[10px] uppercase tracking-wide text-primary">
              Live
            </span>
          </p>
        )}

        {/* Refined CTA row — larger touch targets on mobile */}
        <div className="mt-4 flex items-center gap-2">
          <AffiliateButton
            href={product.affiliateUrl}
            priceDisplay={product.priceDisplay}
            contentId={product.id}
            contentName={product.title}
            price={product.price}
            size="sm"
            fullWidth
            className="h-12 font-medium sm:h-11"
          />
          <button
            onClick={() => onQuickView(product)}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary sm:h-11 sm:w-11"
            aria-label={`View details for ${product.title}`}
          >
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
});
