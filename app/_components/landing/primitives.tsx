import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`lp-container ${className}`.trim()}>{children}</div>;
}

export function Section({
  id,
  children,
  className = "",
  tone = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "default" | "elevated" | "muted";
}) {
  return (
    <section
      id={id}
      className={`lp-section lp-section--${tone} ${className}`.trim()}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <header
      className={`lp-section-header lp-section-header--${align}`.trim()}
    >
      {eyebrow ? <p className="lp-eyebrow">{eyebrow}</p> : null}
      <h2 className="lp-section-title">{title}</h2>
      {description ? <p className="lp-section-desc">{description}</p> : null}
    </header>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const BUTTON: Record<ButtonVariant, string> = {
  primary: "lp-btn lp-btn--primary",
  secondary: "lp-btn lp-btn--secondary",
  ghost: "lp-btn lp-btn--ghost",
};

export function LandingButton({
  href,
  children,
  variant = "primary",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
}) {
  const cls = `${BUTTON[variant]} ${className}`.trim();

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
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

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="lp-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function CoreStatement({ children }: { children: ReactNode }) {
  return <p className="lp-core-statement">{children}</p>;
}
