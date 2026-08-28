import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { nav } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 should never be indexed, even if something links to it.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center sm:py-36">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        That page does not exist
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-fg-muted">
        The link may be out of date, or the page may have moved. Here is where
        everything else lives.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button as="a" href="/">
          Back to home
        </Button>
        <Button as="a" href="/blog" variant="secondary">
          Read the blog
        </Button>
      </div>

      <ul className="mt-12 flex flex-wrap justify-center gap-2">
        {nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="rounded-lg border border-border bg-surface px-3.5 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
