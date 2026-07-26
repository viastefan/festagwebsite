import Image from "next/image";
import Link from "next/link";
import { Btn, siteLinks } from "./primitives";
import { TagroStage } from "./TagroStage";

const ROWS = [
  {
    href: "/product",
    title: "Delivery Intelligence",
    body: "Arbeitssignale werden zu Status, Risiken und nächsten Schritten — client-ready.",
  },
  {
    href: "/tagro",
    title: "Tagro",
    body: "Operations Interpreter. Rohsignale in ruhige, entscheidungsreife Sprache.",
  },
  {
    href: "/product",
    title: "Entscheidungen",
    body: "Freigaben mit Kontext. Kunden und Führung wissen, was offen ist.",
  },
  {
    href: "/product",
    title: "Executive",
    body: "Portfolio-Health für CEOs und Gründer — was läuft, was blockiert.",
  },
  {
    href: "/extension",
    title: "Chrome Extension",
    body: "Klarheit im Browser, ohne ein weiteres Tool zu stapeln.",
  },
];

const SYSTEM = [
  {
    title: "Connectors",
    body: "GitHub, Slack, Linear, Jira — Signale lesen, Workflows nicht ersetzen.",
  },
  {
    title: "Company Brain",
    body: "Jedes Projekt stärkt das Operational Knowledge Model eurer Organisation.",
  },
  {
    title: "Client Experience",
    body: "Delivery als verständliche Erfahrung — unter eurer Marke oder als Festag.",
  },
];

export function HomePage() {
  return (
    <>
      <style>{HOME_CSS}</style>

      <section className="home-hero" aria-label="Festag">
        <div className="home-hero-glow" aria-hidden />
        <div className="site-wrap home-hero-grid">
          <div className="home-hero-copy">
            <h1 className="home-h1">
              Operational Intelligence
              <br />
              für Teams, die liefern.
            </h1>
            <p className="home-lead">
              Festag sitzt über Slack, Linear und GitHub — und macht aus Arbeitssignalen
              klaren Status, Risiken und Entscheidungen für Kunden und Führung.
            </p>
            <div className="home-actions">
              <Btn href={siteLinks.register} variant="solid" size="lg" external>
                Festag starten
              </Btn>
              <Btn href="/product" variant="ghost" size="lg">
                Produkt ansehen
              </Btn>
            </div>
            <p className="home-trust">
              Verbunden mit <span>GitHub</span>, <span>Slack</span>, <span>Linear</span>,{" "}
              <span>Jira</span>
            </p>
          </div>
          <div className="home-hero-visual">
            <TagroStage />
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="site-wrap">
          <h2 className="home-h2">Was Festag ist</h2>
          <div className="home-rows">
            {ROWS.map((row) => (
              <Link key={row.title} href={row.href} className="home-row">
                <div className="home-row-copy">
                  <span className="home-row-title">{row.title}</span>
                  <span className="home-row-body">{row.body}</span>
                </div>
                <span className="home-row-arrow" aria-hidden>
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-people" aria-label="Für Teams, die Klarheit brauchen">
        <div className="home-people-media">
          <Image
            src="/brand/bg-office.jpg"
            alt="Teams in einem modernen Workspace — Fokus statt Status-Meetings"
            fill
            sizes="100vw"
            className="home-people-img"
            priority={false}
          />
          <div className="home-people-scrim" />
        </div>
        <div className="site-wrap home-people-content">
          <blockquote className="home-quote">
            „Endlich sehen Kunden, was wirklich läuft — ohne dass wir jede Woche Status
            zusammenbauen.“
          </blockquote>
          <p className="home-quote-meta">
            Agency Leads & Project Owner
            <span>Die mit Festag Delivery erklären, statt Tickets vorzulesen.</span>
          </p>
        </div>
      </section>

      <section className="home-section">
        <div className="site-wrap">
          <h2 className="home-h2">Das System</h2>
          <div className="home-tiles">
            {SYSTEM.map((item) => (
              <article key={item.title} className="home-tile">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-section--last">
        <div className="site-wrap">
          <div className="home-cta">
            <h2 className="home-cta-title">Installiere Festag heute.</h2>
            <p className="home-cta-body">
              Workspace anlegen, Tools verbinden, Tagro öffnen — und sehen, was wirklich
              läuft.
            </p>
            <div className="home-actions">
              <Btn href={siteLinks.register} variant="solid" size="lg" external>
                Workspace anlegen
              </Btn>
              <Btn href="/contact" variant="ghost" size="lg">
                Mit uns sprechen
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const HOME_CSS = `
  .home-hero {
    position: relative;
    padding: clamp(40px, 7vh, 72px) 0 0;
    overflow: hidden;
  }
  .home-hero-glow {
    position: absolute;
    right: -10%;
    top: 0;
    width: min(70vw, 720px);
    height: min(70vh, 640px);
    background: radial-gradient(ellipse at 50% 40%, rgba(91, 100, 125, 0.1), transparent 68%);
    pointer-events: none;
  }
  .home-hero-grid {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: center;
    min-height: min(78vh, 720px);
  }
  .home-hero-copy {
    max-width: 480px;
    padding-bottom: clamp(40px, 8vh, 88px);
  }
  .home-h1 {
    margin: 0;
    font-size: clamp(36px, 4.8vw, 56px);
    line-height: 1.05;
    letter-spacing: var(--ls-display);
    font-weight: 400;
    color: var(--heading);
  }
  .home-lead {
    margin: 20px 0 0;
    max-width: 40ch;
    font-size: 16.5px;
    line-height: 1.55;
    letter-spacing: var(--ls-body);
    color: var(--muted);
  }
  .home-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }
  .home-trust {
    margin: 22px 0 0;
    font-size: 13px;
    letter-spacing: var(--ls-ui);
    color: var(--faint);
  }
  .home-trust span {
    color: var(--muted);
  }
  .home-hero-visual {
    min-width: 0;
    align-self: end;
  }
  .home-hero-visual .tg-stage {
    max-width: none;
    margin: 0;
  }

  .home-section {
    padding: clamp(64px, 10vh, 104px) 0;
  }
  .home-section--last {
    padding-bottom: clamp(80px, 12vh, 128px);
  }
  .home-h2 {
    margin: 0 0 8px;
    font-size: clamp(28px, 3.6vw, 40px);
    line-height: 1.12;
    letter-spacing: var(--ls-display);
    font-weight: 400;
    color: var(--heading);
  }

  .home-rows {
    display: grid;
    margin-top: 20px;
  }
  .home-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 24px 4px;
    border-bottom: 1px solid var(--line);
    transition: padding 0.2s var(--ease), background 0.2s ease;
  }
  .home-row:first-child {
    border-top: 1px solid var(--line);
  }
  .home-row:hover {
    padding-left: 12px;
    padding-right: 12px;
    background: rgba(255, 255, 255, 0.55);
    border-radius: 12px;
    border-color: transparent;
  }
  .home-row-copy {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
  .home-row-title {
    font-size: 17px;
    letter-spacing: var(--ls-display);
    color: var(--heading);
  }
  .home-row-body {
    font-size: 14.5px;
    line-height: 1.5;
    letter-spacing: var(--ls-body);
    color: var(--muted);
    max-width: 52ch;
  }
  .home-row-arrow {
    flex-shrink: 0;
    font-size: 18px;
    color: var(--faint);
    transition: transform 0.22s var(--ease), color 0.22s ease;
  }
  .home-row:hover .home-row-arrow {
    color: var(--heading);
    transform: translateX(5px);
  }

  .home-people {
    position: relative;
    min-height: min(68vh, 600px);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .home-people-media { position: absolute; inset: 0; }
  .home-people-img {
    object-fit: cover;
    object-position: center 40%;
  }
  .home-people-scrim {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10,10,11,0.12) 0%, rgba(10,10,11,0.5) 50%, rgba(10,10,11,0.82) 100%);
  }
  .home-people-content {
    position: relative;
    z-index: 1;
    padding-block: clamp(48px, 8vh, 80px);
    max-width: 720px;
  }
  .home-quote {
    margin: 0;
    font-size: clamp(24px, 3.4vw, 36px);
    line-height: 1.25;
    letter-spacing: var(--ls-display);
    font-weight: 400;
    color: #f5f5f7;
  }
  .home-quote-meta {
    margin: 22px 0 0;
    display: grid;
    gap: 4px;
    font-size: 14.5px;
    letter-spacing: var(--ls-body);
    color: rgba(245, 245, 247, 0.78);
  }
  .home-quote-meta span { color: rgba(245, 245, 247, 0.48); }

  .home-tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 28px;
  }
  .home-tile {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 24px 22px;
    box-shadow: 0 1px 2px rgba(30, 30, 32, 0.03);
    transition: transform 0.22s var(--ease), box-shadow 0.22s ease;
  }
  .home-tile:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px rgba(30, 30, 32, 0.07);
  }
  .home-tile h3 {
    margin: 0 0 10px;
    font-size: 16.5px;
    letter-spacing: var(--ls-display);
    color: var(--heading);
  }
  .home-tile p {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--muted);
    letter-spacing: var(--ls-body);
  }

  .home-cta-title {
    margin: 0;
    font-size: clamp(30px, 4vw, 44px);
    line-height: 1.1;
    letter-spacing: var(--ls-display);
    max-width: 14ch;
    color: var(--heading);
  }
  .home-cta-body {
    margin: 16px 0 0;
    max-width: 42ch;
    font-size: 16px;
    line-height: 1.55;
    color: var(--muted);
  }
  .home-cta .home-actions { margin-top: 28px; }

  @media (max-width: 980px) {
    .home-hero-grid {
      grid-template-columns: 1fr;
      min-height: 0;
      gap: 20px;
    }
    .home-hero-copy {
      max-width: 560px;
      padding-bottom: 8px;
      order: 1;
    }
    .home-hero-visual { order: 0; }
    .home-tiles { grid-template-columns: 1fr; }
    .home-people { min-height: 480px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .home-row, .home-tile, .home-row-arrow { transition: none !important; }
  }
`;
