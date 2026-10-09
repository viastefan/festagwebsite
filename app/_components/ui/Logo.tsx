import Link from "next/link";

/**
 * Festag mark — rounded plate with a diagonal cut and a detached corner piece.
 * Drawn from /public/marketing/festag-mark.png so it scales crisp at any size.
 */
export function FestagMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <path d="M14 6h33.6c1.2 0 2.3.5 3 1.5l6 8.2c.9 1.2.8 2.9-.2 4L27.7 54.4c-.9 1.1-2.2 1.6-3.6 1.6H14c-4.4 0-8-3.6-8-8V14c0-4.4 3.6-8 8-8z" />
      <path d="M54.9 32.4c1-1.1 2.6-.4 2.6 1.1V51c0 2.8-2.2 5-5 5H37.6c-1.4 0-2.1-1.6-1.2-2.7z" />
    </svg>
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
