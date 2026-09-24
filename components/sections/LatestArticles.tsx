import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/PostCard";

/** Homepage "Latest technical articles", pulled from content/blog. */
export function LatestArticles({ limit = 6 }: { limit?: number }) {
  const all = getAllPosts();
  // Featured guides first, then the newest, so the homepage links the pillars.
  const posts = [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)].slice(
    0,
    limit,
  );
  if (!posts.length) return null;
  return (
    <section
      id="insights"
      aria-labelledby="insights-h"
      className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pt-16 sm:px-6 sm:pt-24 lg:pt-28"
    >
      <p className="mb-4 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.22em] text-[var(--blue)]">
        Latest technical articles
      </p>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="insights-h"
          className="max-w-[20ch] text-[30px] leading-[1.08] sm:text-[42px] lg:text-[52px]"
        >
          Engineering notes from real builds.
        </h2>
        <Link href="/blog" className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold">
          All {all.length} articles <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}
