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
        disallow: ["/api/", "/checkout", "/*?plan=", "/*?utm_"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
