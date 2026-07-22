"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FESTAG_HOME_STYLES } from "./festag-home-styles";

/** Product app on festag.app */
const APP_HREF = "https://festag.app";
const LOGIN_HREF = "https://festag.app/login";
const REGISTER_HREF = "https://festag.app/register";

const NAV = [
  { href: "/product", label: "Produkt" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Preise" },
  { href: "/contact", label: "Kontakt" },
];

const ASIDE = [
  "Für Kunden und CEOs",
  "Status ohne Chaos",
  "Tagro versteht das Projekt",
];

const PILLARS = [
  {
    title: "Delivery Intelligence",
    body: "Aus Arbeitssignalen wird klarer Fortschritt — verständlich für Kunden, nicht nur für Teams.",
  },
  {
    title: "Entscheidungen sichtbar",
    body: "Offene Freigaben, Risiken und nächste Schritte bleiben im Blick, statt in Chats zu verschwinden.",
  },
  {
    title: "Company Brain",
    body: "Festag lernt, wie eure Organisation liefert — und macht jedes Projekt ein Stück intelligenter.",
  },
];

const LOGOS = [
  { label: "GitHub", icon: GithubIcon },
  { label: "Slack", icon: SlackIcon },
  { label: "Notion", icon: NotionIcon },
  { label: "Figma", icon: FigmaIcon },
  { label: "Linear", icon: LinearIcon },
  { label: "Vercel", icon: VercelIcon },
] as const;

function FestagFMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden>
      <g fill="#E8EDF4">
        <rect x="21" y="16" width="8" height="33" rx="1.6" />
        <rect x="21" y="16" width="23" height="8" rx="1.6" />
        <rect x="21" y="29" width="17" height="8" rx="1.6" />
      </g>
      <rect x="47" y="16" width="6" height="6" rx="1.6" fill="#6a738c" />
    </svg>
  );
}

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
              <FestagFMark />
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
        <section className="fh-hero" aria-label="Festag">
          <div className="fh-hero-grid">
            <div className="fh-hero-copy">
              <h1 className="fh-hero-title">Operational Intelligence</h1>
              <div className="fh-hero-actions">
                <a href={APP_HREF} className="fh-btn fh-btn-primary fh-btn-lg">
                  Open App
                </a>
                <Link href="/docs" className="fh-btn fh-btn-ghost fh-btn-lg">
                  Docs lesen
                </Link>
              </div>
            </div>

            <div className="fh-hero-mark-wrap" aria-hidden>
              <div className="fh-hero-glow" />
              <div className="fh-hero-mark">
                <FestagFMark />
              </div>
            </div>

            <div className="fh-hero-aside">
              {ASIDE.map((line) => (
                <p key={line} className="fh-aside-line">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="fh-logos" aria-label="Anbindungen">
            {LOGOS.map((item) => (
              <span key={item.label} className="fh-logo-item">
                <item.icon />
                {item.label}
              </span>
            ))}
          </div>
        </section>

        <section className="fh-section">
          <div className="fh-section-inner">
            <h2 className="fh-section-title">
              Arbeitssignale werden zu Klarheit, die Kunden und Führung vertrauen.
            </h2>
            <p className="fh-section-body">
              Festag ersetzt weder Slack noch Linear. Es sitzt darüber — und macht aus
              Delivery eine verständliche Erfahrung.
            </p>
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

        <section className="fh-section">
          <div className="fh-section-inner">
            <div className="fh-cta-band">
              <div>
                <h2>Öffne Festag und sieh, was wirklich läuft.</h2>
                <p>
                  Status, Risiken, Entscheidungen und nächste Schritte — ruhig und
                  entscheidungsreif.
                </p>
              </div>
              <a href={APP_HREF} className="fh-btn fh-btn-primary fh-btn-lg">
                Open App
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="fh-footer">
        <div className="fh-footer-inner">
          <div className="fh-footer-brand">
            <Link href="/" className="fh-brand" aria-label="Festag">
              <span className="fh-brand-mark">
                <FestagFMark />
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
                <a href={REGISTER_HREF}>Registrieren</a>
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
