import Link from "next/link";
import { formatDate, getCategory, type Post } from "@/lib/blog";

export function PostCard({
  post,
  headingLevel = "h3",
}: {
  post: Post;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const cat = getCategory(post.category);
  return (
    <article className="group relative flex flex-col gap-3 rounded-[var(--r-lg)] border border-[var(--line)] bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012))] p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(77,124,255,0.5)] focus-within:border-[rgba(77,124,255,0.6)]">
      <p className="flex flex-wrap items-center gap-2 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.14em] text-[var(--faint)]">
        <span className="rounded-full border border-[rgba(34,211,238,0.3)] px-2 py-0.5 text-[#7fe6f7]">
          {cat?.name ?? post.category}
        </span>
        <span>{post.readingMinutes} min read</span>
      </p>
      <Heading className="text-[18px] font-semibold leading-[1.3] tracking-normal">
        <Link
          href={`/blog/${post.slug}`}
          className="text-[var(--ink)] after:absolute after:inset-0 after:rounded-[var(--r-lg)] after:content-[''] hover:text-white focus-visible:outline-none"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="flex-1 text-[13.5px] leading-[1.6] text-[var(--dim)]">
        {post.description}
      </p>
      <time dateTime={post.publishedAt} className="text-[12px] text-[var(--faint)]">
        {formatDate(post.publishedAt)}
      </time>
    </article>
  );
}
