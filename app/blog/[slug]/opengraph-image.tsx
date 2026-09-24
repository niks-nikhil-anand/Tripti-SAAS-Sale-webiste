import { getActiveCategories, getAllPosts, getCategory, getPost } from "@/lib/blog";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Article by Tripti Shakya";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return [
    ...getActiveCategories().map((c) => ({ slug: c.slug })),
    ...getAllPosts().map((p) => ({ slug: p.slug })),
  ];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category) {
    return renderOgImage({ eyebrow: "Blog", title: category.title.split(" – ")[0] });
  }
  const post = getPost(slug);
  return renderOgImage({
    eyebrow: `Blog · ${getCategory(post?.category ?? "")?.name ?? "Article"}`,
    title: post?.title ?? "Article",
  });
}
