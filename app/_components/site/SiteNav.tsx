"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLockup, Btn, siteLinks } from "./primitives";

const NAV = [
  { href: "/product", label: "Produkt" },
  { href: "/tagro", label: "Tagro" },
  { href: "/pricing", label: "Preise" },
  { href: "/careers", label: "Karriere" },
  { href: "/contact", label: "Kontakt" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`site-nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="site-nav-inner">
          <div className="site-nav-left">
            <BrandLockup />
            <nav className="site-nav-links" aria-label="Hauptnavigation">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="site-nav-link"
                  aria-current={
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="site-nav-right">
            <Btn href={siteLinks.login} variant="ghost" external>
              Anmelden
            </Btn>
            <Btn href={siteLinks.app} variant="solid" external>
              Open App
            </Btn>
            <button
              type="button"
              className="site-nav-menu"
              aria-label="Menü öffnen"
              aria-expanded={open}
              onClick={() => setOpen(true)}
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
        </div>
      </header>

      <div
        className={`site-sheet-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <div
        className={`site-sheet${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
      >
        <div className="site-sheet-grip" />
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <div className="site-sheet-cta">
          <Btn href={siteLinks.login} variant="ghost" external>
            Anmelden
          </Btn>
          <Btn href={siteLinks.app} variant="solid" external>
            Open App
          </Btn>
        </div>
      </div>
    </>
  );
}
