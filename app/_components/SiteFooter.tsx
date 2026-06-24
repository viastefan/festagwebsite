import Link from "next/link";
import { LocaleFooterLink } from "./LocaleFooterLink";

const LINKS = [
  { href: "/product", label: "Produkt" },
  { href: "/extension", label: "Chrome-Erweiterung" },
  { href: "/about", label: "Philosophie" },
  { href: "/contact", label: "Kontakt" },
  { href: "/legal/privacy", label: "Rechtliches" },
];

export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-container">
        <div className="lp-footer-row">
          <p className="lp-footer-brand">Festag</p>
          <nav className="lp-footer-nav" aria-label="Footer">
            <LocaleFooterLink />
            {LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="lp-footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="lp-footer-copy">
          © {new Date().getFullYear()} Festag. Ein System für strukturierte
          Softwareproduktion.
        </p>
      </div>
    </footer>
  );
}
