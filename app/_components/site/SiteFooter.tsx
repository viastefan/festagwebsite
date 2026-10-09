import Link from "next/link";
import { Logo } from "../ui/Logo";
import { footerColumns } from "@/lib/site/links";

const YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap wrap--wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Operational Intelligence für Teams, die liefern. Klarheit für Kunden und Führung —
              aus der Arbeit, die ohnehin passiert.
            </p>
          </div>
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.items.map((item) => (
                  <li key={item.label}>
                    {item.external || /^(https?:|mailto:)/.test(item.href) ? (
                      <a href={item.href}>{item.label}</a>
                    ) : (
                      <Link href={item.href}>{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {YEAR} Festag. Made in Germany.</span>
          <span className="footer-status">
            <i aria-hidden />
            Alle Systeme betriebsbereit · Server in Deutschland · DSGVO-konform
          </span>
        </div>
      </div>
    </footer>
  );
}
