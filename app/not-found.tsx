import type { Metadata } from "next";
import Link from "next/link";
import { getPagesByGroup } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Section";
import { PageCard } from "@/components/cards/PageCard";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 should never be indexed, even if something links to it.
  robots: { index: false, follow: true },
};

/** A useful 404: links back into the main hubs instead of a dead end. */
export default function NotFound() {
  const popular = getPagesByGroup("developer").slice(0, 4);
  return (
    <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
      <div className="max-w-[640px]">
        <Eyebrow>404</Eyebrow>
        <h1 className="text-[34px] leading-[1.08] sm:text-[48px]">That page does not exist</h1>
        <p className="mt-4 text-[16px] leading-[1.65] text-[var(--dim)]">
          The link may be out of date, or the page may have moved. These are good places to
          start.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] px-6 py-3 text-[15px] font-semibold text-white hover:text-white"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="inline-flex rounded-full border border-[var(--line2)] bg-[var(--glass)] px-6 py-3 text-[15px] font-semibold text-[var(--ink)] hover:text-white"
          >
            View projects
          </Link>
          <Link
            href="/blog"
            className="inline-flex rounded-full border border-[var(--line2)] bg-[var(--glass)] px-6 py-3 text-[15px] font-semibold text-[var(--ink)] hover:text-white"
          >
            Read the blog
          </Link>
        </div>
      </div>
      <h2 className="mb-6 mt-16 text-[22px]">Popular services</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {popular.map((p) => (
          <PageCard key={p.slug} page={p} />
        ))}
      </div>
    </div>
  );
}
