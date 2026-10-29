import Link from "next/link";
/** Ein Pfeil in einem runden Container. Beim Hover schiebt der Pfeil hinaus und ein zweiter kommt nach. */
export function ShiftArrow({ className }: { className?: string }) {
  const a = (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3.5 8h9M8.5 4l4 4-4 4" />
    </svg>
  );
  return (
    <span className={`sarrow${className ? ` ${className}` : ""}`} aria-hidden>
      {a}
      {a}
    </span>
  );
}

type Variant = "solid" | "accent" | "ghost" | "soft" | "text";
type Size = "sm" | "md" | "lg";

export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  arrow,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
}) {
  const cls = ["btn", `btn--${variant}`, size !== "md" ? `btn--${size}` : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {children}
      {arrow ? <ShiftArrow /> : null}
    </>
  );

  const external = /^(https?:|mailto:)/.test(href);
  if (external) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const cls = `link ${className ?? ""}`;
  const inner = (
    <>
      {children}
      <ShiftArrow />
    </>
  );
  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
