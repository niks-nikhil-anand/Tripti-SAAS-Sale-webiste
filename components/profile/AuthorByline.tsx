import Link from "next/link";
import { formatDate } from "@/lib/blog";
import { ProfilePhoto } from "./ProfilePhoto";

/**
 * Visible authorship and freshness: who wrote or reviewed the page and when.
 * Mirrors author / datePublished / dateModified in the page's JSON-LD.
 */
export function AuthorByline({
  label = "Written by",
  publishedAt,
  updatedAt,
  readingMinutes,
}: {
  label?: string;
  publishedAt?: string;
  updatedAt?: string;
  readingMinutes?: number;
}) {
  const showUpdated = updatedAt && updatedAt !== publishedAt;
  return (
    <div className="flex items-center gap-3 text-[13px] text-[var(--dim)]">
      <ProfilePhoto size={40} className="shrink-0 border border-[var(--line2)]" />
      <div className="leading-[1.45]">
        <p>
          {label}{" "}
          <Link
            href="/about"
            rel="author"
            className="font-semibold text-[var(--ink)] hover:text-white"
          >
            Tripti Shakya
          </Link>
          <span className="text-[var(--faint)]"> · Full Stack & AI Developer</span>
        </p>
        <p className="text-[12px] text-[var(--faint)]">
          {publishedAt ? (
            <>
              Published <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </>
          ) : null}
          {publishedAt && showUpdated ? " · " : null}
          {showUpdated ? (
            <>
              Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time>
            </>
          ) : null}
          {readingMinutes ? ` · ${readingMinutes} min read` : null}
        </p>
      </div>
    </div>
  );
}
