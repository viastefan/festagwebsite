"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FestagMark } from "../Brand";
import { AskAiTrigger } from "../AskAiPanel";
import { FESTAG_HOME_STYLES } from "./festag-home-styles";

const APP_HREF = "https://festag.app";
const LOGIN_HREF = "https://festag.app/login";
const REGISTER_HREF = "https://festag.app/register";
const EXTENSION_HREF = "/extension";

const NAV = [
  { href: "/product", label: "Produkt" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Preise" },
  { href: "/careers", label: "Karriere" },
  { href: "/contact", label: "Kontakt" },
];

const INSTALL_STEPS = [
  {
    n: "01",
    title: "Workspace anlegen",
    body: "Registriere dich auf festag.app, lege deinen Workspace an und lade dein Team ein.",
  },
  {
    n: "02",
    title: "Tools verbinden",
    body: "Verbinde GitHub, Slack, Linear oder Notion — Festag liest Signale, ersetzt keine Workflows.",
  },
  {
    n: "03",
    title: "Ersten Status sehen",
    body: "Öffne Dashboard und Tagro. Status, Risiken und Entscheidungen erscheinen client-ready.",
  },
  {
    n: "04",
    title: "Im Alltag nutzen",
    body: "Chrome-Extension, Voice-Status und Freigaben halten Delivery klar — ohne Status-Meetings zu stapeln.",
  },
];

const USE_CASES = [
  {
    title: "Für Agenturen",
    body: "Kunden sehen Fortschritt, nicht Ticket-Chaos. Freigaben und Risiken bleiben nachvollziehbar.",
  },
  {
    title: "Für Software-Teams",
    body: "Commits und PRs werden zu verständlichen Updates für Product, Client und Führung.",
  },
  {
    title: "Für Gründer",
    body: "Portfolio-Health auf einen Blick — was läuft, was blockiert, was entschieden werden muss.",
  },
];

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
        <div className="fh-nav-inner">
          <div className="fh-nav-left">
            <Link href="/" className="fh-brand" aria-label="Festag">
              <span className="fh-brand-mark">
                <FestagMark size={24} priority />
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
            <AskAiTrigger className="fh-btn fh-btn-outline" />
            <a href={LOGIN_HREF} className="fh-btn fh-btn-outline">
              Anmelden
            </a>
            <a href={APP_HREF} className="fh-btn fh-btn-solid">
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
        </div>
      </header>

      <main>
        {/* Hero — logo as primary brand signal */}
        <section className="fh-hero" aria-label="Festag">
          <div className="fh-hero-inner">
            <div className="fh-hero-logo" aria-hidden>
              <div className="fh-hero-logo-glow" />
              <Image
                src="/brand/festag-mark.png"
                alt=""
                width={512}
                height={512}
                className="fh-hero-logo-img"
                priority
                quality={100}
                sizes="180px"
              />
            </div>
            <h1 className="fh-hero-title">
              Operational Intelligence
              <br />
              für Teams, die liefern.
            </h1>
            <p className="fh-hero-lead">
              Festag sitzt über Slack, Linear und GitHub — und macht aus Arbeitssignalen
              klaren Status, Risiken und Entscheidungen für Kunden und Führung.
            </p>
            <div className="fh-hero-actions">
              <a href={REGISTER_HREF} className="fh-btn fh-btn-solid fh-btn-lg">
                Festag starten
              </a>
              <Link href="/product" className="fh-btn fh-btn-outline fh-btn-lg">
                Produkt ansehen
              </Link>
            </div>
            <p className="fh-hero-note">
              Kein neues PM-Tool. Eine Intelligence Layer über eurer Delivery.
            </p>
          </div>
        </section>

        {/* Tagro section — Vercel Notion-style */}
        <section className="fh-band">
          <div className="fh-band-inner">
            <h2 className="fh-band-title">
              Frag Tagro auf Infrastruktur, die Delivery versteht.
            </h2>
            <div className="fh-trio">
              <div className="fh-trio-side fh-trio-side--left">
                <div className="fh-ghost-card" aria-hidden>
                  <FestagMark size={36} />
                  <span>Statusbericht</span>
                </div>
              </div>

              <div className="fh-chat-card" aria-hidden>
                <div className="fh-chat-top">
                  <span>Neues Tagro Briefing</span>
                  <span className="fh-chat-icons">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className="fh-chat-body">
                  <FestagMark size={28} />
                  <h3>Wie kann ich helfen?</h3>
                  <ul>
                    <li>Status für den Kunden formulieren</li>
                    <li>Offene Entscheidungen finden</li>
                    <li>Nächste Schritte ableiten</li>
                  </ul>
                </div>
                <div className="fh-chat-input">
                  <span className="fh-chip">@ Acme Checkout</span>
                  <span>Frag, suche oder entscheide…</span>
                </div>
              </div>

              <div className="fh-trio-side fh-trio-side--right">
                <p className="fh-side-copy">
                  Tagro übersetzt Arbeitssignale in ruhige, entscheidungsreife Antworten —
                  mit Quelle, ohne Chatbot-Theater.
                </p>
                <div className="fh-feat-block">
                  <div className="fh-feat-label">Fähigkeiten</div>
                  <ul>
                    <li>Delivery Briefings</li>
                    <li>Entscheidungs-Zusammenfassung</li>
                    <li>Risiko-Erkennung</li>
                    <li>Client-ready Sprache</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Install Festag */}
        <section className="fh-band fh-band--tight">
          <div className="fh-band-inner">
            <div className="fh-split">
              <div>
                <h2 className="fh-band-title fh-band-title--sm">
                  Installiere Festag und nutze es im Alltag.
                </h2>
                <p className="fh-band-lead">
                  Vom ersten Workspace bis zur Chrome-Extension — so wird Festag Teil eurer
                  Delivery, nicht ein weiteres Dashboard, das niemand öffnet.
                </p>
                <div className="fh-hero-actions fh-hero-actions--left">
                  <a href={REGISTER_HREF} className="fh-btn fh-btn-solid">
                    Jetzt registrieren
                  </a>
                  <Link href={EXTENSION_HREF} className="fh-btn fh-btn-outline">
                    Chrome-Extension
                  </Link>
                </div>
              </div>
              <ol className="fh-steps">
                {INSTALL_STEPS.map((step) => (
                  <li key={step.n}>
                    <span>{step.n}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Scale / product — Zapier style */}
        <section className="fh-band">
          <div className="fh-band-inner">
            <h2 className="fh-band-title">
              Lieferung, die von null bis Portfolio klar bleibt.
            </h2>
            <div className="fh-feature-row">
              <aside className="fh-feature-copy">
                <p>
                  Teams liefern weiter in GitHub und Slack. Festag macht daraus verständlichen
                  Fortschritt für Kunden, CEOs und Project Owner.
                </p>
                <div className="fh-feat-block">
                  <div className="fh-feat-label">Surfaces</div>
                  <ul>
                    <li>Dashboard & Gesamtbericht</li>
                    <li>Entscheidungen & Freigaben</li>
                    <li>Tagro Briefings</li>
                    <li>Führung / Executive</li>
                  </ul>
                </div>
              </aside>
              <div className="fh-product-frame">
                <div className="fh-product-chrome">
                  <span className="fh-dots" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>festag.app</span>
                </div>
                <div className="fh-product-body">
                  <div className="fh-product-rail" aria-hidden>
                    <div className="fh-product-rail-brand">
                      <FestagMark size={16} />
                      Festag
                    </div>
                    <div className="is-active">Dashboard</div>
                    <div>Projekte</div>
                    <div>Entscheidungen</div>
                    <div>Tagro</div>
                    <div>Führung</div>
                  </div>
                  <div className="fh-product-main">
                    <div className="fh-product-head">
                      <div>
                        <h3>Acme Checkout</h3>
                        <p>Was gebaut wurde, was blockiert, was offen ist.</p>
                      </div>
                      <span className="fh-pill">Stabil</span>
                    </div>
                    <div className="fh-product-grid">
                      <article>
                        <h4>Status</h4>
                        <p>Payment-Flow live. Review auf Freigabe.</p>
                      </article>
                      <article>
                        <h4>Risiko</h4>
                        <p>Refund-Edge-Case noch unklar für den Kunden.</p>
                      </article>
                      <article className="fh-span">
                        <h4>Nächster Schritt</h4>
                        <p>Entscheidung: Refund-Policy bis Mittwoch freigeben.</p>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Client clarity — Mintlify style */}
        <section className="fh-band fh-band--muted">
          <div className="fh-band-inner">
            <h2 className="fh-band-title">
              Klarheit, die Kunden und Führung wirklich nutzen.
            </h2>
            <div className="fh-feature-row fh-feature-row--rev">
              <div className="fh-shot-card">
                <div className="fh-shot-top">
                  <FestagMark size={18} />
                  <span>Client Panel</span>
                </div>
                <h3>Dein Fortschritt, verständlich.</h3>
                <p>
                  Keine Ticketlisten. Status, Entscheidungen und nächste Schritte — ruhig
                  und freigabefähig.
                </p>
                <div className="fh-shot-rows">
                  <div>
                    <b>On track</b>
                    <span>Checkout MVP</span>
                  </div>
                  <div>
                    <b>Wartet</b>
                    <span>Refund-Policy</span>
                  </div>
                  <div>
                    <b>Erledigt</b>
                    <span>Auth & Billing</span>
                  </div>
                </div>
              </div>
              <aside className="fh-feature-copy">
                <p>
                  Festag macht Delivery zur Client Experience — unter eurer Marke oder als
                  Festag Workspace.
                </p>
                <div className="fh-feat-block">
                  <div className="fh-feat-label">Nutzen</div>
                  <ul>
                    <li>Weniger Status-Ping-Pong</li>
                    <li>Freigaben mit Kontext</li>
                    <li>Vertrauen durch Klarheit</li>
                    <li>Professioneller Auftritt</li>
                  </ul>
                </div>
                <a href={APP_HREF} className="fh-text-link">
                  Open App →
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* Who uses it */}
        <section className="fh-band">
          <div className="fh-band-inner">
            <h2 className="fh-band-title fh-band-title--sm">
              Für Organisationen, die Delivery verkaufen — nicht Chaos.
            </h2>
            <div className="fh-cards">
              {USE_CASES.map((item) => (
                <article key={item.title} className="fh-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Connectors */}
        <section className="fh-band fh-band--tight">
          <div className="fh-band-inner fh-center">
            <h2 className="fh-band-title fh-band-title--sm">
              Verbunden mit den Tools, die Teams schon nutzen.
            </h2>
            <p className="fh-band-lead fh-band-lead--center">
              GitHub, Slack, Linear, Notion, Figma, Vercel — Festag ersetzt sie nicht. Es
              macht ihre Signale verständlich.
            </p>
            <div className="fh-logos">
              {["GitHub", "Slack", "Linear", "Notion", "Figma", "Vercel"].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
            <div className="fh-hero-actions">
              <a href={APP_HREF} className="fh-btn fh-btn-solid">
                Connectors in der App
              </a>
              <a
                href="https://github.com/viastefan/festag-mvp"
                className="fh-btn fh-btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                festag-mvp auf GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="fh-band fh-band--cta">
          <div className="fh-band-inner fh-cta">
            <div>
              <h2>Built for the future. Installiere Festag heute.</h2>
              <p>
                Starte Workspace, verbinde Tools, öffne Tagro — und sieh, was wirklich läuft.
              </p>
            </div>
            <div className="fh-hero-actions fh-hero-actions--left">
              <a href={REGISTER_HREF} className="fh-btn fh-btn-solid fh-btn-lg">
                Festag installieren
              </a>
              <a href={LOGIN_HREF} className="fh-btn fh-btn-outline fh-btn-lg">
                Anmelden
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
                <FestagMark size={22} />
              </span>
              <span className="fh-brand-name">Festag</span>
            </Link>
            <p>Operational Intelligence für moderne Organisationen.</p>
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
                <Link href={EXTENSION_HREF}>Extension</Link>
              </li>
              <li>
                <Link href="/docs">Docs</Link>
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
          <AskAiTrigger className="fh-btn fh-btn-outline" onOpen={() => setMenuOpen(false)} />
          <a
            href={REGISTER_HREF}
            className="fh-btn fh-btn-solid"
            onClick={() => setMenuOpen(false)}
          >
            Festag starten
          </a>
        </div>
      </div>
    </div>
  );
}
