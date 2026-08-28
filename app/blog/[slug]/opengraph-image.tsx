import { ImageResponse } from "next/og";
import { getPost, posts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const alt = "Stackpilot article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

/** In Next 16 the image function receives `params` as a Promise. */
export default async function BlogPostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #07080f 0%, #131634 55%, #1d1b4b 100%)",
          color: "#edeff8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7c6cff, #22d3ee)",
              fontSize: 28,
              fontWeight: 700,
              color: "#07080f",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{siteConfig.name}</div>
          {post ? (
            <div
              style={{
                marginLeft: 12,
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(124,108,255,0.18)",
                color: "#b3a9ff",
                fontSize: 20,
              }}
            >
              {post.category}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: post && post.title.length > 52 ? 58 : 68,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.6,
              maxWidth: 980,
            }}
          >
            {post?.title ?? "Stackpilot blog"}
          </div>
          {post ? (
            <div style={{ fontSize: 26, color: "#98a0bd", maxWidth: 900 }}>
              {post.excerpt.length > 130
                ? `${post.excerpt.slice(0, 130)}…`
                : post.excerpt}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#98a0bd" }}>
          <div style={{ color: "#edeff8" }}>{post?.author.name ?? siteConfig.domain}</div>
          {/* Satori requires a single child node per element unless the parent
              declares display:flex — so this stays one interpolated string. */}
          {post ? <div>{`· ${post.readingMinutes} min read`}</div> : null}
        </div>
      </div>
    ),
    size,
  );
}
