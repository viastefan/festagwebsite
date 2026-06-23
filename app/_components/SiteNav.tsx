"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FestagWordmark } from "./Brand";

const LINKS = [
  { href: "/product", label: "Produkt" },
  { href: "/about", label: "Philosophie" },
  { href: "/pricing", label: "Preise" },
  { href: "/now", label: "Aktuelles" },
  { href: "/contact", label: "Kontakt" },
];

const SCROLL_THRESHOLD = 12;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lp-nav-menu-open", menuOpen);
    return () => document.body.classList.remove("lp-nav-menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className={`lp-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="lp-nav-bar">
          <div className="lp-nav-shell">
            <Link href="/" aria-label="Festag, Startseite" className="lp-nav-brand">
              <FestagWordmark className="lp-nav-brand-mark" />
            </Link>

            <div className="lp-nav-right">
              <nav className="lp-nav-links" aria-label="Hauptnavigation">
                {LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="lp-nav-link">
                    {link.label}
                  </Link>
                ))}
              </nav>

              <span className="lp-nav-divider" aria-hidden />

              <div className="lp-nav-actions">
                <a
                  href="https://festag.app/login"
                  className="lp-nav-link lp-nav-link--login"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Anmelden
                </a>
                <Link
                  href="/contact?intent=audit"
                  className="lp-nav-btn lp-nav-btn--cta"
                >
                  Audit anfragen
                </Link>
                <button
                  type="button"
                  className="lp-nav-menu-btn"
                  aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
                  aria-expanded={menuOpen}
                  aria-controls="lp-nav-mobile-menu"
                  onClick={() => setMenuOpen((open) => !open)}
                >
                  <span aria-hidden />
                  <span aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        id="lp-nav-mobile-menu"
        className={`lp-nav-mobile-sheet${menuOpen ? " is-open" : ""}`}
        hidden={!menuOpen}
      >
        <button
          type="button"
          className="lp-nav-mobile-backdrop"
          aria-label="Menü schließen"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="lp-nav-mobile-panel" aria-label="Mobile Navigation">
          <div className="lp-nav-mobile-head">
            <FestagWordmark className="lp-nav-mobile-mark" />
            <button
              type="button"
              className="lp-nav-mobile-close"
              aria-label="Menü schließen"
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>
          </div>
          <ul className="lp-nav-mobile-links">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="lp-nav-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="lp-nav-mobile-actions">
            <a
              href="https://festag.app/login"
              className="lp-nav-mobile-login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anmelden
            </a>
            <Link
              href="/contact?intent=audit"
              className="lp-nav-mobile-cta"
              onClick={() => setMenuOpen(false)}
            >
              Audit anfragen
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
