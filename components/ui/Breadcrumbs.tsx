import Link from "next/link";

export type Crumb = { name: string; path: string };

/**
 * The visible trail. It must list exactly the same items, in the same order, as
 * the BreadcrumbList JSON-LD on the page — Google treats a mismatch between
 * markup and structured data as a reason to drop the rich result.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-fg">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="transition-colors hover:text-fg"
                >
                  {crumb.name}
                </Link>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-border-strong">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
