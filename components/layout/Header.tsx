"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CloseIcon, Logo, MenuIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

/** "/product" is current on /product; "/#pricing" style links never are. */
function isCurrent(href: string, pathname: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // The sheet is open only for the path it was opened on, so navigating
  // anywhere closes it without an effect that re-renders after the fact.
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;
  const setOpen = (next: boolean) => setOpenForPath(next ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // Uses the setter directly: `setOpen` is rebuilt every render, so
      // depending on it would resubscribe the listener on each one.
      if (e.key === "Escape") setOpenForPath(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-border bg-bg/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight"
          >
            <Logo className="size-8" />
            <span className="text-[1.0625rem]">{siteConfig.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={
                      isCurrent(item.href, pathname) ? "page" : undefined
                    }
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-2 hover:text-fg",
                      isCurrent(item.href, pathname)
                        ? "text-fg"
                        : "text-fg-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Wrapped rather than putting `hidden` on the buttons themselves:
                Button's base sets `inline-flex`, and which of the two display
                utilities wins depends on Tailwind's output order, not on the
                order they appear in the class attribute. */}
            <div className="hidden items-center gap-2 sm:flex">
              <Button as="a" href="/#pricing" variant="ghost" size="sm">
                Pricing
              </Button>
              <Button as="a" href="/checkout?plan=growth" size="sm">
                Start free
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-fg-muted transition-colors hover:text-fg md:hidden"
            >
              {open ? (
                <CloseIcon className="size-[18px]" />
              ) : (
                <MenuIcon className="size-[18px]" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-bg md:hidden">
          <Container className="py-4">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-[0.9375rem] text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 flex flex-col gap-2">
              <Button as="a" href="/#pricing" variant="secondary">
                Pricing
              </Button>
              <Button as="a" href="/checkout?plan=growth">
                Start free
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
