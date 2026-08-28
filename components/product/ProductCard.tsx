import Link from "next/link";
import { availabilityLabel, type CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { CheckIcon, FeatureGlyph } from "@/components/ui/Icons";

const dotColor = {
  available: "bg-emerald-500",
  beta: "bg-amber-500",
  waitlist: "bg-fg-muted",
} as const;

export function ProductCard({ product }: { product: CatalogProduct }) {
  const isCustom = product.price === null;

  return (
    <article
      aria-labelledby={`${product.slug}-name`}
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-surface p-6",
        "transition-[transform,border-color,box-shadow] duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40",
        product.badge
          ? "border-accent/40 hover:border-accent"
          : "border-border hover:border-border-strong",
      )}
    >
      {product.badge ? (
        <span className="absolute -top-2.5 right-6 rounded-full bg-accent px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wider text-accent-fg">
          {product.badge}
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
          <FeatureGlyph name={product.icon} className="size-5" />
        </span>
        <span className="rounded-full border border-border px-2.5 py-1 text-[0.6875rem] font-medium text-fg-muted">
          {product.category}
        </span>
      </div>

      <h3
        id={`${product.slug}-name`}
        className="mt-5 text-lg font-semibold tracking-tight"
      >
        {product.name}
      </h3>
      <p className="mt-1 text-sm font-medium text-accent">{product.tagline}</p>
      <p className="mt-3 text-[0.9375rem] leading-7 text-fg-muted">
        {product.description}
      </p>

      <ul className="mt-5 flex flex-col gap-2.5">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm leading-6">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
            <span className="text-fg-muted">{feature}</span>
          </li>
        ))}
      </ul>

      {/* mt-auto pins the price/CTA block to the bottom so cards in a row
          line up even when the descriptions differ in length. */}
      <div className="mt-auto pt-6">
        <div className="flex items-end justify-between gap-3 border-t border-border pt-5">
          <p className="flex flex-col">
            <span className="text-2xl font-semibold tracking-tight">
              {isCustom ? "Custom" : `$${product.price}`}
            </span>
            <span className="mt-0.5 text-xs text-fg-muted">{product.unit}</span>
          </p>
          <p className="flex items-center gap-1.5 text-xs text-fg-muted">
            <span
              aria-hidden="true"
              className={cn("size-1.5 rounded-full", dotColor[product.availability])}
            />
            {availabilityLabel[product.availability]}
          </p>
        </div>

        <Link
          href={product.cta.href}
          className={cn(
            "mt-4 flex h-10 w-full items-center justify-center rounded-xl text-sm font-medium transition-colors",
            product.badge
              ? "bg-accent text-accent-fg hover:bg-accent-hover"
              : "border border-border text-fg hover:border-border-strong hover:bg-surface-2",
          )}
        >
          {product.cta.label}
          <span className="sr-only"> for {product.name}</span>
        </Link>
      </div>
    </article>
  );
}
