"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/shared/product-image";
import { AffiliateButton } from "@/components/shared/affiliate-button";
import { productImageAlt } from "@/lib/product-utils";
import { cn } from "@/lib/utils";
import {
  COMPARISON_CATEGORIES,
  COMPARISON_PRODUCTS,
  JOINT_FRIENDLY_LEVELS,
  PRICE_RANGES,
  categoryLabel,
  jointFriendlyLabel,
  type ComparisonBadge,
  type ComparisonCategoryId,
  type ComparisonProduct,
} from "@/data/comparison-products";

type PriceRangeId = (typeof PRICE_RANGES)[number]["id"];
type JointLevelId = (typeof JOINT_FRIENDLY_LEVELS)[number]["id"];
type SortId = "quality" | "price" | "reviews";

interface ComparisonTableProps {
  products?: ComparisonProduct[];
}

/** Quality score color coding: 90+ green, 80-89 amber, <80 orange. */
function qualityColors(score: number) {
  if (score >= 90)
    return { bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" };
  if (score >= 80)
    return { bar: "bg-amber-400", text: "text-amber-600 dark:text-amber-400" };
  return { bar: "bg-orange-400", text: "text-orange-600 dark:text-orange-400" };
}

function Badges({ badge }: { badge?: ComparisonBadge }) {
  if (badge === "editor") {
    return (
      <span className="badge-minimal border-none bg-primary/10 text-primary">
        Editor&apos;s Choice
      </span>
    );
  }
  if (badge === "top_pick") {
    return (
      <span className="badge-minimal border-none bg-accent/25 text-emerald-700 dark:text-emerald-300">
        Top Pick
      </span>
    );
  }
  return null;
}

function JointFriendlyStars({ value }: { value: number }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Joint-friendly rating ${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "size-3.5",
            i <= value
              ? "fill-accent text-accent"
              : "text-muted-foreground/35",
          )}
        />
      ))}
    </div>
  );
}

function QualityScore({ score }: { score: number }) {
  const colors = qualityColors(score);
  return (
    <div className="flex items-center gap-2">
      <span className={cn("text-sm font-bold tabular-nums", colors.text)}>
        {score}
      </span>
      <div
        role="img"
        aria-label={`Quality score ${score} out of 100`}
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn("h-full rounded-full", colors.bar)}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function PriceText({ price, priceDisplay }: { price: number | null; priceDisplay: string | null }) {
  if (price == null || !priceDisplay) {
    return <p className="text-sm font-medium text-muted-foreground">N/A</p>;
  }
  return (
    <p className="font-display text-lg font-semibold tabular-nums text-foreground">
      {priceDisplay}
    </p>
  );
}

function ProductName({
  product,
  imageSize,
}: {
  product: ComparisonProduct;
  imageSize: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <ProductImage
        src={product.image}
        alt={productImageAlt(product)}
        width={160}
        height={160}
        sizes={imageSize}
        className={cn(
          "shrink-0 rounded-xl border border-border bg-secondary/50",
          imageSize === "56px" ? "h-14 w-14" : "h-20 w-20",
        )}
      />
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-1.5">
          <Badges badge={product.badge} />
        </div>
        <p className="font-display text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </p>
        <p className="kicker mt-1">
          {categoryLabel(product.category)} ·{" "}
          {product.reviews.toLocaleString()} reviews
        </p>
      </div>
    </div>
  );
}

const cellLabel =
  "text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground";

export function ComparisonTable({
  products = COMPARISON_PRODUCTS,
}: ComparisonTableProps) {
  const [category, setCategory] = useState<ComparisonCategoryId | "all">("all");
  const [price, setPrice] = useState<PriceRangeId>("all");
  const [joint, setJoint] = useState<JointLevelId>("all");
  const [sort, setSort] = useState<SortId>("quality");

  const results = useMemo(() => {
    const matchesPrice = (p: ComparisonProduct) => {
      if (price === "all" || p.price == null) return price === "all";
      if (price === "under50") return p.price < 50;
      if (price === "50-100") return p.price >= 50 && p.price < 100;
      if (price === "100-200") return p.price >= 100 && p.price < 200;
      return p.price >= 200;
    };
    const matchesJoint = (p: ComparisonProduct) => {
      if (joint === "all") return true;
      if (joint === "gentle") return p.jointFriendly >= 4;
      if (joint === "moderate") return p.jointFriendly === 3;
      return p.jointFriendly <= 2;
    };

    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        matchesPrice(p) &&
        matchesJoint(p),
    );

    if (sort === "price") {
      list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    } else if (sort === "reviews") {
      list.sort((a, b) => b.reviews - a.reviews);
    } else {
      list.sort((a, b) => b.qualityScore - a.qualityScore);
    }
    return list;
  }, [products, category, price, joint, sort]);

  const reset = () => {
    setCategory("all");
    setPrice("all");
    setJoint("all");
    setSort("quality");
  };

  return (
    <section aria-label="Product comparison table" className="space-y-4">
      {/* ============ Filters ============ */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as ComparisonCategoryId | "all")}
        >
          <SelectTrigger
            className="h-10 w-full rounded-full text-sm sm:w-[180px]"
            aria-label="Filter by category"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {COMPARISON_CATEGORIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={price} onValueChange={(v) => setPrice(v as PriceRangeId)}>
          <SelectTrigger
            className="h-10 w-full rounded-full text-sm sm:w-[150px]"
            aria-label="Filter by price range"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={joint} onValueChange={(v) => setJoint(v as JointLevelId)}>
          <SelectTrigger
            className="h-10 w-full rounded-full text-sm sm:w-[190px]"
            aria-label="Filter by joint-friendly level"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {JOINT_FRIENDLY_LEVELS.map((l) => (
              <SelectItem key={l.id} value={l.id}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortId)}>
          <SelectTrigger
            className="h-10 w-full rounded-full text-sm sm:w-[220px]"
            aria-label="Sort products"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quality">Quality Score (High to Low)</SelectItem>
            <SelectItem value="price">Price (Low to High)</SelectItem>
            <SelectItem value="reviews">Most Reviewed</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-3 sm:ml-auto">
          <p className="text-xs text-muted-foreground" role="status" aria-live="polite">
            Showing {results.length} of {products.length} products
          </p>
          {(category !== "all" || price !== "all" || joint !== "all" || sort !== "quality") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="h-9 rounded-full text-xs"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* ============ Empty state ============ */}
      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
          <p className="font-display text-lg font-semibold text-foreground">
            No products match those filters
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try widening the price range or joint-friendly level.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="mt-4 rounded-full"
          >
            <RotateCcw className="size-3.5" />
            Clear filters
          </Button>
        </div>
      ) : (
        <>
          {/* ============ Desktop table ============ */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Comparison of curated fitness products
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
                    className="w-40 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Quality Score
                  </th>
                  <th
                    scope="col"
                    className="w-24 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="w-36 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Joint-Friendly
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    Best For
                  </th>
                  <th
                    scope="col"
                    className="w-44 px-4 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                  >
                    <span className="sr-only">View on Amazon</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-border transition-colors hover:bg-secondary/30"
                  >
                    <td className="px-4 py-4">
                      <ProductName product={p} imageSize="56px" />
                    </td>
                    <td className="px-4 py-4">
                      <QualityScore score={p.qualityScore} />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Score /100
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <PriceText
                        price={p.price}
                        priceDisplay={p.priceDisplay}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <JointFriendlyStars value={p.jointFriendly} />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {jointFriendlyLabel(p.jointFriendly)}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="max-w-[200px] text-sm leading-snug text-muted-foreground">
                        {p.bestFor}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <AffiliateButton
                        href={p.affiliateUrl}
                        label="View on Amazon"
                        contentId={p.id}
                        contentName={p.name}
                        price={p.price}
                        size="sm"
                        className="w-full"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ============ Mobile cards ============ */}
          <div className="grid gap-3 md:hidden">
            {results.map((p) => (
              <article
                key={p.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex gap-3">
                  <ProductImage
                    src={p.image}
                    alt={productImageAlt(p)}
                    width={160}
                    height={160}
                    sizes="80px"
                    className="h-20 w-20 shrink-0 rounded-xl border border-border bg-secondary/50"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-1.5">
                      <Badges badge={p.badge} />
                    </div>
                    <p className="font-display text-[0.95rem] font-semibold leading-snug text-foreground">
                      {p.name}
                    </p>
                    <p className="kicker mt-1">
                      {categoryLabel(p.category)} ·{" "}
                      {p.reviews.toLocaleString()} reviews
                    </p>
                  </div>
                </div>

                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
                  <div>
                    <dt className={cellLabel}>Quality Score</dt>
                    <dd className="mt-1">
                      <QualityScore score={p.qualityScore} />
                    </dd>
                  </div>
                  <div>
                    <dt className={cellLabel}>Price</dt>
                    <dd className="mt-1">
                      <PriceText price={p.price} priceDisplay={p.priceDisplay} />
                    </dd>
                  </div>
                  <div>
                    <dt className={cellLabel}>Joint-Friendly</dt>
                    <dd className="mt-1.5 flex items-center gap-2">
                      <JointFriendlyStars value={p.jointFriendly} />
                      <span className="text-[11px] text-muted-foreground">
                        {jointFriendlyLabel(p.jointFriendly)}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className={cellLabel}>Best For</dt>
                    <dd className="mt-1 text-xs leading-snug text-muted-foreground">
                      {p.bestFor}
                    </dd>
                  </div>
                </dl>

                <AffiliateButton
                  href={p.affiliateUrl}
                  label="View on Amazon"
                  contentId={p.id}
                  contentName={p.name}
                  price={p.price}
                  size="sm"
                  fullWidth
                  className="mt-4 h-11"
                />
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
