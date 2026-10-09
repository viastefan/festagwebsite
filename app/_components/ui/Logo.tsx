import Link from "next/link";

/**
 * Festag Fluid-F — the mark used by festag.app (app icon, favicon).
 * Rendered as a CSS mask so it always takes the current text colour and
 * stays crisp at any size. Source: festag-mvp/public/brand/favicon-circle-light.png
 */
export function FestagMark({ className, title }: { className?: string; title?: string }) {
  return (
    <span
      className={`fmark ${className ?? ""}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    />
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={`logo ${className ?? ""}`} aria-label="Festag — Startseite">
      <FestagMark className="logo-mark" />
      <span className="logo-word">festag</span>
    </Link>
  );
}
