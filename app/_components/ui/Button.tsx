import Link from "next/link";
import { Icon } from "./Icon";

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
      {arrow ? <Icon name="arrow" className="arrow" /> : null}
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
      <Icon name="arrow" />
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
