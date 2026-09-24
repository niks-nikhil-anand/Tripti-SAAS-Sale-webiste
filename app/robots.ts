import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Crawl budget spent on transactional and parameterised URLs is budget
        // not spent on the pages meant to rank.
        disallow: ["/api/", "/*?utm_", "/*?service="],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
