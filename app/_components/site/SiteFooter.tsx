import Link from "next/link";
import { BrandLockup, siteLinks } from "./primitives";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-wrap">
        <div className="site-footer-grid">
          <div>
            <div className="site-footer-brand">
              <BrandLockup />
            </div>
            <p className="site-footer-copy">
              Operational Intelligence für moderne Organisationen — klar für Kunden und Führung.
            </p>
          </div>
          <div>
            <h3>Produkt</h3>
            <ul>
              <li>
                <Link href="/product">Produkt</Link>
              </li>
              <li>
                <Link href="/tagro">Tagro</Link>
              </li>
              <li>
                <Link href="/extension">Extension</Link>
              </li>
              <li>
                <Link href="/docs">Guides</Link>
              </li>
              <li>
                <a href={siteLinks.app}>Open App</a>
              </li>
            </ul>
          </div>
          <div>
            <h3>Unternehmen</h3>
            <ul>
              <li>
                <Link href="/pricing">Preise</Link>
              </li>
              <li>
                <Link href="/careers">Karriere</Link>
              </li>
              <li>
                <Link href="/contact">Kontakt</Link>
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
            </ul>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>© {new Date().getFullYear()} Festag</span>
          <span>Delivery Intelligence Platform</span>
        </div>
      </div>
    </footer>
  );
}
