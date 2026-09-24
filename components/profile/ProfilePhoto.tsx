import Image from "next/image";
import { cn } from "@/lib/utils";
import photo from "@/public/images/tripti-shakya.jpg";

/**
 * The single source for the portrait. A static import gives next/image the
 * intrinsic size (no CLS) and a blur placeholder; `sizes` keeps the served
 * file close to the rendered size so small avatars stay a few KB.
 */
export function ProfilePhoto({
  size,
  className,
  /** above the fold: load eagerly at high priority (Next 16 deprecates `priority`) */
  priority = false,
  rounded = "full",
}: {
  /** rendered width in CSS px */
  size: number;
  className?: string;
  priority?: boolean;
  rounded?: "full" | "lg";
}) {
  return (
    <Image
      src={photo}
      alt="Tripti Shakya, Full Stack & AI Developer"
      placeholder="blur"
      {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      sizes={`${size}px`}
      style={{ width: size, height: rounded === "full" ? size : "auto" }}
      className={cn(
        "object-cover object-[50%_32%]",
        rounded === "full" ? "rounded-full aspect-square" : "rounded-[var(--r-lg)] aspect-[4/5]",
        className,
      )}
    />
  );
}
