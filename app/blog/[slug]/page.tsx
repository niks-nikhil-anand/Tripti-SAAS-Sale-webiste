import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getActiveCategories,
  getAllPosts,
  getCategory,
  getPost,
} from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";
import { CategoryView } from "@/components/blog/CategoryView";
import { PostView } from "@/components/blog/PostView";

/**
 * One segment serves both category hubs (/blog/react) and articles
 * (/blog/react-performance-optimization), keeping URLs flat as the brief
 * asks. Slugs are checked for collisions at build time.
 */
export function generateStaticParams() {
  const posts = getAllPosts();
  const cats = getActiveCategories();
  const clash = posts.find((p) => cats.some((c) => c.slug === p.slug));
  if (clash) throw new Error(`Post slug "${clash.slug}" collides with a category`);
  return [...cats.map((c) => ({ slug: c.slug })), ...posts.map((p) => ({ slug: p.slug }))];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const category = getCategory(slug);
  if (category) {
    return pageMetadata({
      title: category.title,
      description: category.description,
      path: `/blog/${category.slug}`,
      ownImage: true,
    });
  }

  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    ownImage: true,
  });
}

export default async function BlogSlugPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category) return <CategoryView category={category} />;
  const post = getPost(slug);
  if (!post) notFound();
  return <PostView post={post} />;
}
