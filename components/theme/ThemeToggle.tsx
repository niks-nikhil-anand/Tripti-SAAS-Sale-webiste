"use client";

import { useCallback, useLayoutEffect } from "react";
import { THEME_STORAGE_KEY } from "./ThemeScript";

type Theme = "light" | "dark";

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolvedTheme(): Theme {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : systemTheme();
}

/**
 * The button never renders theme-dependent markup — both icons are in the DOM
 * and CSS picks one off `[data-theme]`. That keeps the server HTML and the
 * client render identical, so there is no hydration mismatch and no need to
 * hide the control until mount.
 */
export function ThemeToggle({ className }: { className?: string }) {
  useLayoutEffect(() => {
    // React's dev-only StrictMode remount resets attributes on <html> that it
    // does not own, which clears what ThemeScript set. Re-apply it before paint.
    document.documentElement.setAttribute("data-theme", resolvedTheme());

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      // Only follow the OS while the visitor has not made an explicit choice.
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        document.documentElement.setAttribute("data-theme", systemTheme());
      }
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = resolvedTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage — the theme still applies for this page.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle between light and dark theme"
      title="Toggle theme"
      className={[
        "inline-flex size-9 items-center justify-center rounded-lg border border-border",
        "bg-surface text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg",
        className ?? "",
      ].join(" ")}
    >
      <svg
        data-theme-icon="light"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="size-[18px]"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg
        data-theme-icon="dark"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-[18px]"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
