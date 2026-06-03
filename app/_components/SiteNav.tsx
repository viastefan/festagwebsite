"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FestagWordmark } from "./Brand";

const PRIMARY_LINKS = [
  { href: "/product", label: "Product" },
  { href: "/solutions", label: "Solutions" },
  { href: "/proof", label: "ProofGrid" },
  { href: "/tagro", label: "Tagro" },
  { href: "/careers", label: "Careers" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-black/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
      data-scrolled={scrolled}
    >
      <div className="shell flex items-center justify-between h-[68px]">
        <Link
          href="/"
          aria-label="Festag — zur Startseite"
          className="flex items-center gap-3 text-fest-text"
        >
          <FestagWordmark className="h-[18px] w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {PRIMARY_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13.5px] tracking-[0.012em] text-fest-text/70 hover:text-fest-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="text-[13.5px] tracking-[0.012em] text-fest-text/70 hover:text-fest-text transition-colors"
          >
            Contact
          </Link>
          <a
            href="https://festag.app/login"
            className="btn btn-primary h-9 px-4 text-[13px]"
          >
            Open app
            <span aria-hidden>↗</span>
          </a>
        </div>

        <button
          type="button"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-black/10"
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
            <path
              d={
                open
                  ? "M2 2 L16 10 M16 2 L2 10"
                  : "M0 1 H18 M0 6 H18 M0 11 H18"
              }
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-black/[0.06] bg-white">
          <div className="shell py-6 grid gap-4">
            {[...PRIMARY_LINKS, { href: "/contact", label: "Contact" }].map(
              (l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] text-fest-text/85 tracking-[0.012em]"
                >
                  {l.label}
                </Link>
              ),
            )}
            <a
              href="https://festag.app/login"
              className="btn btn-primary w-full justify-center"
            >
              Open app <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
