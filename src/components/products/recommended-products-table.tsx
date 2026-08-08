"use client";

import { Award } from "lucide-react";
import { ProductImage } from "@/components/shared/product-image";
import { StarRating } from "@/components/shared/star-rating";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { getProductById, productImageAlt } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import type { MatchRecommendation } from "@/data/match-recommendations";

interface RecommendedProductsTableProps {
  picks: MatchRecommendation[];
}

/**
 * At-a-glance comparison of the recommended picks for one assessment match:
 * price, rating, best-for, difficulty, noise, warranty and space needed.
 * The editor's choice row is highlighted. Readable with color-only states
 * paired with text labels for accessibility.
 */
export function RecommendedProductsTable({ picks }: RecommendedProductsTableProps) {
  const rows = picks.map((rec) => ({ rec, product: getProductById(rec.asin) }));

  if (rows.length === 0 || rows.every((r) => !r.product)) return null;

  const cellLabel =
    "text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground";

  return (
    <section aria-label="Compare your recommended products" className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <Award size={15} className="text-primary" aria-hidden="true" />
        At a glance comparison
      </div>

      {/* ============ Desktop table ============ */}
      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Comparison of recommended fitness products
          </caption>
          <thead>
            <tr className="bg-secondary/60">
              <th
                scope="col"
                className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Rating
              </th>
              <th
                scope="col"
                className="w-52 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Best For
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Difficulty
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Noise
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Warranty
              </th>
              <th
                scope="col"
                className="w-44 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                Space Required
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                <span className="sr-only">View on Amazon</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ rec, product }) => {
              if (!product) return null;
              return (
                <tr
                  key={rec.asin}
                  className={cn(
                    "border-t border-border transition-colors hover:bg-secondary/30",
                    rec.editorsChoice && "bg-[#7a9e7e]/8",
                  )}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <ProductImage
                        src={product.image}
                        alt={productImageAlt(product)}
                        width={96}
                        height={96}
                        sizes="64px"
                        className="h-14 w-14 shrink-0 rounded-xl border border-border bg-secondary/50"
                      />
                      <div className="min-w-0">
                        {rec.editorsChoice && (
                          <span className="badge-minimal mb-1 border-none bg-primary text-primary dark:text-primary">
                            Editor&apos;s Choice
                          </span>
                        )}
                        <p className="font-display text-sm font-semibold leading-snug text-foreground">
                          {product.title}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {product.priceDisplay ? (
                      <p className="font-display text-base font-semibold tabular-nums text-foreground">
                        {product.priceDisplay}
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-muted-foreground">
                        Live on Amazon
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <StarRating rating={product.rating} size={13} />
                  </td>
                  <td className="px-4 py-4">
                    <p className="max-w-[210px] text-sm leading-snug text-muted-foreground">
                      {rec.bestFor}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground/85">{rec.difficulty}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground/85">{rec.noise}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-foreground/85">{rec.warranty}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="max-w-[160px] text-sm leading-snug text-foreground/85">
                      {rec.spaceRequired}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <AffiliateButton
                      href={product.affiliateUrl}
                      label="View on Amazon"
                      contentId={product.id}
                      contentName={product.title}
                      price={product.price}
                      size="sm"
                      className="whitespace-nowrap"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ============ Mobile cards ============ */}
      <div className="space-y-3 lg:hidden">
        {rows.map(({ rec, product }) => {
          if (!product) return null;
          return (
            <article
              key={rec.asin}
              className={cn(
                "rounded-2xl border border-border bg-card p-4 shadow-sm",
                rec.editorsChoice && "border-[#7a9b7e]/60 bg-[#7a9b7e]/8",
              )}
            >
              {rec.editorsChoice && (
                <span className="badge-minimal mb-2 border-none bg-primary/10 text-primary">
                  Editor&apos;s Choice
                </span>
              )}
              <div className="flex items-center gap-3">
                <ProductImage
                  src={product.image}
                  alt={productImageAlt(product)}
                  width={96}
                  height={96}
                  sizes="64px"
                  className="h-14 w-14 shrink-0 rounded-xl border border-border bg-secondary/50"
                />
                <p className="font-display text-sm font-semibold leading-snug text-foreground">
                  {product.title}
                </p>
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
                <div>
                  <dt className={cellLabel}>Price</dt>
                  <dd className="mt-0.5 font-display text-base font-semibold tabular-nums text-foreground">
                    {product.priceDisplay ?? "Live on Amazon"}
                  </dd>
                </div>
                <div>
                  <dt className={cellLabel}>Rating</dt>
                  <dd className="mt-1">
                    <StarRating rating={product.rating} size={12} />
                  </dd>
                </div>
                <div>
                  <dt className={cellLabel}>Difficulty</dt>
                  <dd className="mt-0.5 text-sm text-foreground/85">{rec.difficulty}</dd>
                </div>
                <div>
                  <dt className={cellLabel}>Noise</dt>
                  <dd className="mt-0.5 text-sm text-foreground/85">{rec.noise}</dd>
                </div>
                <div>
                  <dt className={cellLabel}>Warranty</dt>
                  <dd className="mt-0.5 text-sm text-foreground/85">{rec.warranty}</dd>
                </div>
                <div>
                  <dt className={cellLabel}>Space Required</dt>
                  <dd className="mt-0.5 text-sm leading-snug text-foreground/85">
                    {rec.spaceRequired}
                  </dd>
                </div>
              </dl>
              <AffiliateButton
                href={product.affiliateUrl}
                label="View on Amazon"
                contentId={product.id}
                contentName={product.title}
                price={product.price}
                size="sm"
                fullWidth
                className="mt-4 h-11"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}