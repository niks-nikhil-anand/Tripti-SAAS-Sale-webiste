/**
 * Primary navigation. `match` lists path prefixes that mark the item active.
 * "Services" and "Solutions" anchor into the homepage directory until
 * dedicated hub pages exist.
 */
export const primaryNav = [
  { label: "Home", href: "/", match: ["/"] },
  { label: "Services", href: "/#group-developer", match: ["/services"] },
  { label: "Solutions", href: "/#group-solution", match: [] },
  { label: "Projects", href: "/projects", match: ["/projects"] },
  { label: "Blog", href: "/blog", match: ["/blog"] },
  { label: "About", href: "/about", match: ["/about"] },
] as const;
