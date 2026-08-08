"use client";

import { Check, Minus, Sparkles, Star } from "lucide-react";
import { ProductImage } from "@/components/shared/product-image";
import { StarRating } from "@/components/shared/star-rating";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { getProductById } from "@/lib/product-utils";
import { productImageAlt } from "@/lib/product-utils";
import type { MatchRecommendation } from "@/data/match-recommendations";

interface RecommendedProductCardProps {
  rec: MatchRecommendation;
}

/**
 * Editorial recommendation card for the "Find My Perfect Fit" results —
 * shows only the most relevant picks from the catalog, quality over quantity.
 * Image, price, rating and CTA come from the real catalog record; the
 * best-for / pros / cons / why-recommendation copy is editorial.
 */
export function RecommendedProductCard({ rec }: RecommendedProductCardProps) {
  const product = getProductById(rec.asin);
  if (!product) return null;

  return (
    <article className="card-modern overflow-hidden rounded-2xl bg-card p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        {/* Image */}
        <div className="shrink-0 sm:w-36">
          <ProductImage
            src={product.image}
            alt={productImageAlt(product)}
            width={300}
            height={300}
            sizes="(max-width: 640px) 100vw, 144px"
            className="aspect-square rounded-xl bg-secondary/50"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-display text-[15px] font-semibold leading-snug text-foreground">
              {product.title}
            </h4>
            {/* Editor's score */}
            <div
              className="shrink-0 text-center"
              title={`Editor's score ${product.qualityScore}/100`}
            >
              <div className="quality-ring grid h-12 w-12 place-items-center rounded-full shadow-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-background text-[12px] font-bold text-foreground">
                  {product.qualityScore}
                </span>
              </div>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                Editor's score
              </span>
            </div>
          </div>

          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            {rec.summary}
          </p>

          <StarRating
            rating={product.rating}
            reviews={product.reviews}
            size={13}
            className="mt-2"
          />

          {/* Best for */}
          <p className="mt-3 flex items-start gap-1.5 text-[13px] leading-snug text-foreground/85">
            <Star size={13} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
            <span>
              <span className="font-semibold text-foreground">Best for:</span>{" "}
              {rec.bestFor}
            </span>
          </p>

          {/* Pros */}
          <div className="mt-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Check size={13} className="text-primary" aria-hidden="true" /> Pros
            </p>
            <ul className="mt-1.5 space-y-1">
              {rec.pros.map((pro, i) => (
                <li key={i} className="flex gap-2 text-[13px] leading-snug text-foreground/85">
                  <Check size={13} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          {rec.cons.length > 0 && (
            <div className="mt-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Minus size={13} className="text-amber-600" aria-hidden="true" /> Cons
              </p>
              <ul className="mt-1.5 space-y-1">
                {rec.cons.map((con, i) => (
                  <li key={i} className="flex gap-2 text-[13px] leading-snug text-foreground/85">
                    <Minus size={13} className="mt-0.5 shrink-0 text-amber-600" aria-hidden="true" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why we recommend it */}
          <div className="mt-3 rounded-xl bg-[#7a9e7e]/10 px-3.5 py-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#6b8f6f]">
              <Sparkles size={13} aria-hidden="true" /> Why we recommend it
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">
              {rec.whyWeRecommend}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-4">
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
          </div>
        </div>
      </div>
    </article>
  );
}