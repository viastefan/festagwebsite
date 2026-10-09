import Link from "next/link";
import { Logo } from "../ui/Logo";
import { Icon } from "../ui/Icon";
import { footerColumns, links } from "@/lib/site/links";

const YEAR = 2026;

const NOTES = [
  "Alle Preise netto zzgl. gesetzlicher USt. Projektpreise sind Richtwerte und werden im Angebot verbindlich.",
  "Die Produkt-Demos auf dieser Website zeigen einen Beispiel-Workspace mit fiktiven Projekten, Kunden und Zahlen.",
  "Antworten von Tagro sind Entscheidungsvorlagen, keine verbindliche Rechts-, Steuer- oder Finanzberatung.",
  "Kundenstimmen stammen aus dem Early-Access-Programm und sind nach Rolle statt Namen gekennzeichnet.",
  "GitHub, Linear, Jira, Slack, Notion, Figma, Google und Cursor sind Marken ihrer jeweiligen Inhaber.",
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap wrap--wide">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>
              Operational Intelligence für Teams, die liefern. Festag macht aus Arbeitssignalen Klarheit für Kunden und
              Führung — gebaut in Niederbayern, gehostet in Deutschland.
            </p>
            <div className="footer-contact">
              <a href="mailto:hello@festag.app">
                <Icon name="mail" size={14} /> hello@festag.app
              </a>
              <a href={links.app}>
                <Icon name="arrowUpRight" size={14} /> festag.app öffnen
              </a>
            </div>
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

        <ul className="footer-notes">
          {NOTES.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        <div className="footer-bottom">
          <span>© {YEAR} Festag. Alle Rechte vorbehalten.</span>
          <span className="footer-status">
            <i aria-hidden />
            Alle Systeme betriebsbereit
          </span>
          <span>Gemacht in Niederbayern.</span>
        </div>
      </div>
    </footer>
  );
}
