import { jsonLdScript } from "@/lib/seo";

/** Renders one JSON-LD block. Pass a `graph(...)` to combine several nodes. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={jsonLdScript(data)}
    />
  );
}
