"use client";

import { useState } from "react";
import { catalog, catalogCategories } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

/**
 * Filtering happens client-side over an array that is already in the HTML, so
 * every card is present in the server-rendered markup regardless of the active
 * filter — crawlers see all eight products, not just the default view.
 */
export function ProductCatalog() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? catalog : catalog.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="radiogroup"
        aria-label="Filter products by category"
        className="flex flex-wrap items-center gap-2"
      >
        {catalogCategories.map((category) => {
          const selected = active === category;
          const count =
            category === "All"
              ? catalog.length
              : catalog.filter((p) => p.category === category).length;

          return (
            <button
              key={category}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setActive(category)}
              className={cn(
                "rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {category}
              <span
                className={cn(
                  "ml-2 text-xs",
                  selected ? "text-accent-fg/70" : "text-fg-muted/70",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-fg-muted">
        Showing {visible.length} of {catalog.length} products
        {active === "All" ? "" : ` in ${active}`}
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((product) => (
          <li key={product.slug} className="min-w-0">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}
