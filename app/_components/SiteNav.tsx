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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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
                className="lp-nav-link"
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
