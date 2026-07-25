"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FestagMark } from "../Brand";
import { FESTAG_HOME_STYLES } from "./festag-home-styles";

const APP_HREF = "https://festag.app";
const LOGIN_HREF = "https://festag.app/login";
const REGISTER_HREF = "https://festag.app/register";

const NAV = [
  { href: "/product", label: "Produkt" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Preise" },
  { href: "/careers", label: "Karriere" },
  { href: "/contact", label: "Kontakt" },
];

const PILLARS = [
  {
    title: "Purpose-built",
    body: "Geformt für Agenturen und Delivery-Teams — nicht für generisches Projektmanagement.",
  },
  {
    title: "Signal to clarity",
    body: "GitHub, Slack und Arbeitssignale werden zu Status, Risiko und nächstem Schritt.",
  },
  {
    title: "Client-ready",
    body: "Führung und Kunden sehen, was wirklich läuft — ruhig, entscheidungsreif, vertrauenswürdig.",
  },
];

const SURFACES = [
  {
    title: "Delivery Intelligence",
    body: "Aus verteilter Arbeit wird verständlicher Fortschritt — für Kunden, nicht nur für Teams.",
    href: "/product",
    panel: "delivery" as const,
  },
  {
    title: "Entscheidungen",
    body: "Offene Freigaben, Optionen und Konsequenzen bleiben sichtbar, statt in Chats zu verschwinden.",
    href: "https://festag.app/decisions",
    panel: "decisions" as const,
  },
  {
    title: "Tagro",
    body: "Der Operations Interpreter — komprimiert Signale zu Briefings, die Menschen verstehen.",
    href: "/tagro",
    panel: "tagro" as const,
  },
  {
    title: "Company Brain",
    body: "Festag lernt, wie eure Organisation liefert — und macht jedes Projekt ein Stück intelligenter.",
    href: "/about",
    panel: "brain" as const,
  },
];

const CONNECTORS = [
  { label: "GitHub", icon: GithubIcon },
  { label: "Slack", icon: SlackIcon },
  { label: "Linear", icon: LinearIcon },
  { label: "Notion", icon: NotionIcon },
  { label: "Figma", icon: FigmaIcon },
  { label: "Vercel", icon: VercelIcon },
] as const;

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.73.5.98 5.25.98 11.52c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.05-3.06.67-3.7-1.3-3.7-1.3-.5-1.27-1.22-1.61-1.22-1.61-.99-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.97 1.67 2.55 1.19 3.17.91.1-.71.38-1.19.69-1.46-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.94 0 0 .92-.29 3.02 1.13a10.5 10.5 0 0 1 2.75-.37c.93 0 1.87.12 2.75.37 2.1-1.42 3.02-1.13 3.02-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.75 1.13 2.95 0 4.22-2.58 5.15-5.03 5.42.39.34.74 1.01.74 2.04 0 1.47-.01 2.66-.01 3.02 0 .29.2.64.76.53A10.52 10.52 0 0 0 23.02 11.52C23.02 5.25 18.27.5 12 .5z" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.04 15.2a1.67 1.67 0 1 1-3.34 0 1.67 1.67 0 0 1 3.34 0zm1.83 0a1.67 1.67 0 0 1 3.34 0v4.17a1.67 1.67 0 1 1-3.34 0V15.2zm1.92-9.16a1.67 1.67 0 1 1 0-3.34 1.67 1.67 0 0 1 0 3.34zm0 1.83a1.67 1.67 0 0 1 0 3.34H5.62a1.67 1.67 0 1 1 0-3.34h4.17zm9.17 1.92a1.67 1.67 0 1 1 3.34 0 1.67 1.67 0 0 1-3.34 0zm-1.83 0a1.67 1.67 0 0 1-3.34 0V5.62a1.67 1.67 0 1 1 3.34 0v4.17zm-1.92 9.17a1.67 1.67 0 1 1 0 3.34 1.67 1.67 0 0 1 0-3.34zm0-1.83a1.67 1.67 0 0 1 0-3.34h4.17a1.67 1.67 0 1 1 0 3.34h-4.17z" />
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.46 3.2c.4-.3.9-.35 1.35-.2l12.8 4.6c.5.18.8.65.8 1.18v11.12c0 .5-.28.95-.73 1.17l-6.2 3.1c-.45.22-.98.22-1.43 0L4.73 20.07A1.35 1.35 0 0 1 4 18.9V4.38c0-.5.28-.95.46-1.18zm1.1 1.35v13.1l5.35 2.67V9.22L5.56 4.55z" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8zM4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zM4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4zM12 0h4a4 4 0 0 1 0 8h-4V0zm8 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
    </svg>
  );
}

function LinearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M2.86 16.55A9.97 9.97 0 0 0 12 22a9.97 9.97 0 0 0 9.14-5.45L2.86 16.55zM3.45 14.1 14.1 3.45A9.97 9.97 0 0 0 12 2C6.48 2 2 6.48 2 12c0 .72.09 1.43.26 2.1h1.19zM16.55 2.86A9.97 9.97 0 0 0 12 2l10 10a9.97 9.97 0 0 0-.86-9.14z" />
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.5 22.5 21.5h-21L12 2.5z" />
    </svg>
  );
}

function SurfacePanel({ kind }: { kind: (typeof SURFACES)[number]["panel"] }) {
  if (kind === "delivery") {
    return (
      <div className="fh-mini">
        <div className="fh-mini-bar">
          <span>Gesamtbericht</span>
          <em>Heute</em>
        </div>
        <div className="fh-mini-metric">
          <strong>Stabil</strong>
          <p>3 Projekte on track, 1 Entscheidung offen</p>
        </div>
        <div className="fh-mini-bars" aria-hidden>
          <i style={{ height: "42%" }} />
          <i style={{ height: "68%" }} />
          <i style={{ height: "54%" }} />
          <i style={{ height: "82%" }} />
          <i style={{ height: "61%" }} />
        </div>
      </div>
    );
  }
  if (kind === "decisions") {
    return (
      <div className="fh-mini">
        <div className="fh-mini-bar">
          <span>Entscheidungen</span>
          <em>2 offen</em>
        </div>
        <div className="fh-mini-row is-active">
          <b>Refund-Policy</b>
          <p>Option A vs. B — Freigabe bis Mittwoch</p>
        </div>
        <div className="fh-mini-row">
          <b>Scope Checkout</b>
          <p>Guest-Flow optional halten?</p>
        </div>
      </div>
    );
  }
  if (kind === "tagro") {
    return (
      <div className="fh-mini">
        <div className="fh-mini-bar">
          <span>Tagro</span>
          <em>Briefing</em>
        </div>
        <p className="fh-mini-quote">
          Payment-Flow ist live. Review wartet auf Freigabe. Risiko: Refund-Edge-Case
          noch unklar für den Kunden.
        </p>
      </div>
    );
  }
  return (
    <div className="fh-mini">
      <div className="fh-mini-bar">
        <span>Company Brain</span>
        <em>DNA</em>
      </div>
      <div className="fh-mini-row">
        <b>Delivery</b>
        <p>Prefers speed over perfection for MVPs</p>
      </div>
      <div className="fh-mini-row">
        <b>Quality</b>
        <p>Client-ready status before internal polish</p>
      </div>
    </div>
  );
}

export default function FestagHomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="fh-root">
      <style>{FESTAG_HOME_STYLES}</style>

      <header className={`fh-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="fh-nav-left">
          <Link href="/" className="fh-brand" aria-label="Festag">
            <span className="fh-brand-mark">
              <FestagMark size={22} priority />
            </span>
            <span className="fh-brand-name">Festag</span>
          </Link>
          <nav className="fh-nav-links" aria-label="Hauptnavigation">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="fh-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="fh-nav-right">
          <a href={LOGIN_HREF} className="fh-btn fh-btn-ghost">
            Anmelden
          </a>
          <a href={APP_HREF} className="fh-btn fh-btn-primary">
            Open App
          </a>
          <button
            type="button"
            className="fh-nav-menu"
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <main>
        {/* Hero — brand first, Linear/Vercel density */}
        <section className="fh-hero" aria-label="Festag">
          <div className="fh-hero-orbit" aria-hidden>
            <div className="fh-hero-glow" />
            <div className="fh-hero-ring" />
            <div className="fh-hero-mark-wrap">
              <Image
                src="/brand/festag-mark.png"
                alt=""
                width={512}
                height={512}
                className="fh-hero-mark"
                priority
                quality={100}
                sizes="(max-width: 560px) 148px, 200px"
              />
            </div>
          </div>

          <div className="fh-hero-copy">
            <h1 className="fh-hero-title">
              Operational Intelligence
              <br />
              <span>für Teams, die liefern.</span>
            </h1>
            <p className="fh-hero-lead">
              Festag sitzt über Slack, Linear und GitHub — und macht aus Arbeitssignalen
              klaren Status, Risiken und Entscheidungen für Kunden und Führung.
            </p>
            <div className="fh-hero-actions">
              <a href={APP_HREF} className="fh-btn fh-btn-primary fh-btn-lg">
                Open App
              </a>
              <Link href="/product" className="fh-btn fh-btn-ghost fh-btn-lg">
                Produkt ansehen
              </Link>
            </div>
          </div>
        </section>

        {/* Product stage */}
        <section className="fh-stage-section" aria-label="Produktvorschau">
          <div className="fh-stage-frame">
            <div className="fh-stage-chrome">
              <span className="fh-stage-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className="fh-stage-url">festag.app</span>
            </div>
            <div className="fh-stage-body">
              <aside className="fh-stage-rail" aria-hidden>
                <div className="fh-stage-rail-brand">
                  <FestagMark size={18} />
                  <span>Festag</span>
                </div>
                <div className="fh-stage-rail-item is-active">Dashboard</div>
                <div className="fh-stage-rail-item">Projekte</div>
                <div className="fh-stage-rail-item">Entscheidungen</div>
                <div className="fh-stage-rail-item">Tagro</div>
                <div className="fh-stage-rail-item">Führung</div>
              </aside>
              <div className="fh-stage-main">
                <div className="fh-stage-top">
                  <div>
                    <h2 className="fh-stage-title">Acme Checkout</h2>
                    <p className="fh-stage-sub">
                      Was gebaut wurde, was blockiert und welche Entscheidung offen ist.
                    </p>
                  </div>
                  <span className="fh-stage-pill">
                    <i /> Stabil
                  </span>
                </div>
                <div className="fh-stage-grid">
                  <article className="fh-stage-card">
                    <h3>Status</h3>
                    <p>Payment-Flow live. Review auf Freigabe.</p>
                  </article>
                  <article className="fh-stage-card">
                    <h3>Risiko</h3>
                    <p>Refund-Edge-Case noch unklar für den Kunden.</p>
                  </article>
                  <article className="fh-stage-card fh-stage-card--wide">
                    <h3>Nächster Schritt</h3>
                    <p>Entscheidung: Refund-Policy bis Mittwoch freigeben.</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connectors */}
        <section className="fh-logos" aria-label="Anbindungen">
          <p className="fh-logos-label">Arbeitet mit den Tools, die Teams schon nutzen</p>
          <div className="fh-logos-row">
            {CONNECTORS.map((item) => (
              <span key={item.label} className="fh-logo-item">
                <item.icon />
                {item.label}
              </span>
            ))}
          </div>
        </section>

        {/* Positioning */}
        <section className="fh-section fh-section--statement">
          <div className="fh-section-inner fh-center">
            <h2 className="fh-statement">
              Eine neue Schicht über Delivery.
              <span>
                {" "}
                Purpose-built für moderne Teams — mit Intelligence im Kern.
              </span>
            </h2>
            <div className="fh-pillars">
              {PILLARS.map((pillar) => (
                <article key={pillar.title} className="fh-pillar">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Product surfaces */}
        <section className="fh-section">
          <div className="fh-section-inner">
            <h2 className="fh-section-title">
              Von Signalen zu Klarheit — die Surfaces, die zählen.
            </h2>
            <p className="fh-section-body">
              Festag ersetzt weder Slack noch Linear. Es sitzt darüber und macht aus
              Delivery eine verständliche Erfahrung.
            </p>
            <div className="fh-surfaces">
              {SURFACES.map((surface) => {
                const inner = (
                  <>
                    <div className="fh-surface-copy">
                      <h3>{surface.title}</h3>
                      <p>{surface.body}</p>
                      <span className="fh-surface-link">Mehr erfahren →</span>
                    </div>
                    <div className="fh-surface-visual">
                      <SurfacePanel kind={surface.panel} />
                    </div>
                  </>
                );
                const isExternal = surface.href.startsWith("http");
                if (isExternal) {
                  return (
                    <a
                      key={surface.title}
                      href={surface.href}
                      className="fh-surface"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <Link key={surface.title} href={surface.href} className="fh-surface">
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* GitHub / connectors deep dive */}
        <section className="fh-section fh-section--github">
          <div className="fh-section-inner fh-github">
            <div className="fh-github-copy">
              <h2 className="fh-section-title">
                Verbunden mit GitHub — und dem Rest eurer Delivery.
              </h2>
              <p className="fh-section-body">
                Commits, PRs und Issues werden zu verständlichen Signalen. Tagro
                übersetzt sie in Status und nächste Schritte — ohne dass ihr eure
                Tools verlassen müsst.
              </p>
              <div className="fh-hero-actions">
                <a href={APP_HREF} className="fh-btn fh-btn-primary">
                  Open App
                </a>
                <a
                  href="https://github.com/viastefan/festag-mvp"
                  className="fh-btn fh-btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon />
                  festag-mvp
                </a>
              </div>
            </div>
            <div className="fh-github-card" aria-hidden>
              <div className="fh-github-card-top">
                <GithubIcon />
                <span>viastefan/festag-mvp</span>
              </div>
                  <div className="fh-github-pr">
                <b>feat: delivery intelligence briefing</b>
                <p>#842, merged into main</p>
              </div>
              <div className="fh-github-signal">
                <span>Festag signal</span>
                <p>Checkout Payment-Flow deployed. Client-ready status updated.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="fh-section">
          <div className="fh-section-inner">
            <div className="fh-cta-band">
              <div>
                <h2>Built for the future. Available today.</h2>
                <p>
                  Öffne Festag und sieh Status, Risiken und Entscheidungen — ruhig und
                  entscheidungsreif.
                </p>
              </div>
              <div className="fh-cta-actions">
                <a href={REGISTER_HREF} className="fh-btn fh-btn-primary fh-btn-lg">
                  Jetzt starten
                </a>
                <a href={LOGIN_HREF} className="fh-btn fh-btn-ghost fh-btn-lg">
                  Anmelden
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fh-footer">
        <div className="fh-footer-inner">
          <div className="fh-footer-brand">
            <Link href="/" className="fh-brand" aria-label="Festag">
              <span className="fh-brand-mark">
                <FestagMark size={22} />
              </span>
              <span className="fh-brand-name">Festag</span>
            </Link>
            <p className="fh-footer-copy">
              Operational Intelligence für moderne Organisationen.
            </p>
          </div>
          <div>
            <h3>Produkt</h3>
            <ul>
              <li>
                <a href={APP_HREF}>Open App</a>
              </li>
              <li>
                <Link href="/product">Produkt</Link>
              </li>
              <li>
                <Link href="/tagro">Tagro</Link>
              </li>
              <li>
                <Link href="/docs">Docs</Link>
              </li>
              <li>
                <Link href="/pricing">Preise</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Unternehmen</h3>
            <ul>
              <li>
                <Link href="/about">Philosophie</Link>
              </li>
              <li>
                <Link href="/careers">Karriere</Link>
              </li>
              <li>
                <Link href="/contact">Kontakt</Link>
              </li>
              <li>
                <a
                  href="https://github.com/viastefan/festagwebsite"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Rechtliches</h3>
            <ul>
              <li>
                <Link href="/legal/imprint">Impressum</Link>
              </li>
              <li>
                <Link href="/legal/privacy">Datenschutz</Link>
              </li>
              <li>
                <Link href="/legal/terms">AGB</Link>
              </li>
              <li>
                <a href={LOGIN_HREF}>Anmelden</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fh-footer-bottom">© {new Date().getFullYear()} Festag</div>
      </footer>

      <div
        className={`fh-sheet-backdrop${menuOpen ? " is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      <div
        className={`fh-sheet${menuOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
      >
        <div className="fh-sheet-grip" />
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        <div className="fh-sheet-cta">
          <a
            href={APP_HREF}
            className="fh-btn fh-btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Open App
          </a>
        </div>
      </div>
    </div>
  );
}
