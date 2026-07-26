import Link from "next/link";
import { MarkPieces } from "../brand/MarkPieces";

const APP = "https://festag.app";
const LOGIN = "https://festag.app/login";
const REGISTER = "https://festag.app/register";

export const siteLinks = {
  app: APP,
  login: LOGIN,
  register: REGISTER,
} as const;

export function BrandLockup({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="site-brand" aria-label="Festag">
      <MarkPieces className="site-brand-mark" />
      <span className="site-brand-name">Festag</span>
    </Link>
  );
}

export function Btn({
  href,
  children,
  variant = "solid",
  size = "md",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "text";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
}) {
  const cls = [
    "btn",
    variant === "solid" ? "btn-solid" : variant === "ghost" ? "btn-ghost" : "btn-text",
    size === "lg" ? "btn-lg" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
