import type { Metadata } from "next";
import Image from "next/image";
import { Btn, siteLinks } from "../_components/site/primitives";
import { TagroStage } from "../_components/site/TagroStage";

export const metadata: Metadata = {
  title: "Tagro",
  description:
    "Tagro ist der Operations Interpreter von Festag — entscheidungsreife Antworten aus Arbeitssignalen, mit klarer bester Option.",
};

const ROWS = [
  {
    title: "Entscheidungsreife Antworten",
    body: "Nicht nur Status. Tagro benennt Optionen, Risiko und die beste nächste Handlung.",
  },
  {
    title: "Delivery Briefings",
    body: "Status für Kunden und Führung — ruhig, freigabefähig, mit Quelle.",
  },
  {
    title: "Risiko mit Beleg",
    body: "Verzögerungen und Kommunikationslücken — evidenzbasiert, nicht alarmistisch.",
  },
  {
    title: "Company Knowledge zuerst",
    body: "Organisation, Historie und Delivery-Signale vor generischem Reasoning.",
  },
];

export default function TagroPage() {
  return (
    <div className="tagro-page">
      <style>{TAGRO_PAGE_CSS}</style>

      <section className="tagro-hero" aria-label="Tagro">
        <div className="tagro-hero-grid-bg" aria-hidden />
        <div className="site-wrap tagro-hero-inner">
          <div className="tagro-hero-copy">
            <h1 className="tagro-hero-title">
              Der Operations Interpreter
              <br />
              für Entscheidungen.
            </h1>
            <p className="tagro-hero-body">
              Tagro liest Delivery-Signale und antwortet entscheidungsreif — mit Kontext,
              klarer bester Option und ruhiger Sprache für Kunden und Führung.
            </p>
            <div className="cta-actions tagro-hero-actions">
              <Btn href={siteLinks.app} variant="solid" size="lg" external>
                In der App öffnen
              </Btn>
              <Btn href="/product" variant="ghost" size="lg">
                Zum Produkt
              </Btn>
            </div>
          </div>
          <TagroStage />
        </div>
      </section>

      <div className="page tagro-body">
        <div className="site-wrap">
          <ul className="list-clean tagro-rows">
            {ROWS.map((row) => (
              <li key={row.title}>
                <strong>{row.title}</strong>
                <span>{row.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="tagro-bleed" aria-label="Tagro in der Praxis">
        <div className="tagro-bleed-media">
          <Image
            src="/brand/bg-office.jpg"
            alt=""
            fill
            sizes="100vw"
            className="tagro-bleed-img"
            priority={false}
          />
          <div className="tagro-bleed-scrim" />
        </div>
        <div className="site-wrap tagro-bleed-content">
          <p className="tagro-bleed-quote">
            Tagro fragt nach der Entscheidung — und gibt die beste Option, bevor das Meeting
            beginnt.
          </p>
          <p className="tagro-bleed-meta">Operations Interpreter, Delivery Intelligence</p>
        </div>
      </section>

      <div className="page tagro-page-foot">
        <div className="site-wrap">
          <div className="cta-band">
            <h2>Frag Tagro, wenn die nächste Entscheidung Klarheit braucht.</h2>
            <p>
              Company Knowledge zuerst. Dann Reasoning. Immer ruhig, immer nachvollziehbar.
            </p>
            <div className="cta-actions">
              <Btn href={siteLinks.register} variant="solid" size="lg" external>
                Workspace starten
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TAGRO_PAGE_CSS = `
  .tagro-hero {
    position: relative;
    padding: clamp(20px, 4vh, 48px) 0 0;
    overflow: hidden;
  }
  .tagro-hero-grid-bg {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(30, 30, 32, 0.045) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: radial-gradient(ellipse 68% 58% at 78% 40%, #000 8%, transparent 72%);
    -webkit-mask-image: radial-gradient(ellipse 68% 58% at 78% 40%, #000 8%, transparent 72%);
    pointer-events: none;
  }
  .tagro-hero-inner {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(28px, 4.5vw, 64px);
    align-items: center;
    min-height: min(82vh, 780px);
  }
  .tagro-hero-copy {
    max-width: 460px;
    padding-bottom: clamp(36px, 7vh, 80px);
  }
  .tagro-hero-title {
    margin: 0;
    font-size: clamp(34px, 4.6vw, 52px);
    line-height: 1.08;
    letter-spacing: var(--ls-display);
    color: var(--heading);
    font-weight: 400;
  }
  .tagro-hero-body {
    margin: 18px 0 0;
    max-width: 40ch;
    font-size: 16px;
    line-height: 1.6;
    letter-spacing: var(--ls-body);
    color: var(--muted);
  }
  .tagro-hero-actions {
    margin-top: 28px;
  }

  .tagro-body.page {
    padding-top: clamp(40px, 7vh, 72px);
    padding-bottom: clamp(48px, 8vh, 72px);
  }
  .tagro-page-foot.page {
    padding-top: clamp(48px, 8vh, 72px);
  }
  .tagro-rows {
    margin-top: 0;
  }

  .tagro-bleed {
    position: relative;
    width: 100%;
    min-height: min(58vh, 520px);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }
  .tagro-bleed-media { position: absolute; inset: 0; }
  .tagro-bleed-img {
    object-fit: cover;
    object-position: center 42%;
    transform: scale(1.02);
    transition: transform 8s var(--ease);
  }
  .tagro-bleed:hover .tagro-bleed-img { transform: scale(1.05); }
  .tagro-bleed-scrim {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10,10,11,0.12) 0%, rgba(10,10,11,0.48) 48%, rgba(10,10,11,0.78) 100%);
  }
  .tagro-bleed-content {
    position: relative;
    z-index: 1;
    padding-block: clamp(40px, 7vh, 72px);
    max-width: 720px;
  }
  .tagro-bleed-quote {
    margin: 0;
    font-size: clamp(22px, 3vw, 32px);
    line-height: 1.28;
    letter-spacing: var(--ls-display);
    color: #f5f5f7;
    max-width: 28ch;
  }
  .tagro-bleed-meta {
    margin: 18px 0 0;
    font-size: 13.5px;
    letter-spacing: var(--ls-body);
    color: rgba(245, 245, 247, 0.55);
  }

  @media (max-width: 960px) {
    .tagro-hero-inner {
      grid-template-columns: 1fr;
      min-height: 0;
      gap: 28px;
    }
    .tagro-hero-copy {
      max-width: 560px;
      padding-bottom: 8px;
      order: 1;
    }
    .tagro-hero-inner > :last-child { order: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .tagro-bleed-img { transition: none !important; }
    .tagro-bleed:hover .tagro-bleed-img { transform: scale(1.02); }
  }
`;
