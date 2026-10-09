import Link from "next/link";

const PAGES = [
  { href: "/legal/imprint", label: "Impressum" },
  { href: "/legal/privacy", label: "Datenschutz" },
  { href: "/legal/terms", label: "AGB" },
];

export function LegalShell({
  title,
  current,
  updated,
  children,
}: {
  title: string;
  current: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="lg">
          <nav className="lg-nav" aria-label="Rechtliches">
            {PAGES.map((p) => (
              <Link key={p.href} href={p.href} aria-current={p.href === current ? "page" : undefined}>
                {p.label}
              </Link>
            ))}
          </nav>
          <article>
            <h1 className="display display--sm">{title}</h1>
            <p className="small" style={{ marginTop: 12 }}>
              Stand: {updated}
            </p>
            <div className="prose" style={{ marginTop: 16 }}>
              {children}
            </div>
          </article>
        </div>
      </div>
      <style>{`
        .lg { display: grid; grid-template-columns: 180px minmax(0, 1fr); gap: clamp(28px, 5vw, 72px); align-items: start; }
        .lg-nav { position: sticky; top: calc(var(--nav-h) + 24px); display: grid; gap: 2px; }
        .lg-nav a { padding: 8px 12px; border-radius: 10px; font-size: 14px; color: var(--muted); }
        .lg-nav a:hover { background: var(--surface-2); color: var(--ink); }
        .lg-nav a[aria-current="page"] { background: var(--surface); color: var(--ink); box-shadow: var(--sh-xs); }
        @media (max-width: 760px) { .lg { grid-template-columns: 1fr; } .lg-nav { position: static; display: flex; flex-wrap: wrap; } }
      `}</style>
    </section>
  );
}
