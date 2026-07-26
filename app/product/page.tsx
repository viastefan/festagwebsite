import type { Metadata } from "next";
import Link from "next/link";
import { Btn, siteLinks } from "../_components/site/primitives";
import { TagroStage } from "../_components/site/TagroStage";

export const metadata: Metadata = {
  title: "Produkt",
  description:
    "Festag ist die Operational Intelligence Layer über eurer Delivery — Connectors, Tagro, Entscheidungen, Executive.",
};

const PILLARS = [
  {
    href: "/product#connectors",
    title: "Connectors",
    body: "GitHub, Slack, Linear, Jira — Festag liest Signale und ersetzt keine Workflows.",
  },
  {
    href: "/tagro",
    title: "Tagro",
    body: "Operations Interpreter. Rohsignale werden zu ruhigen, entscheidungsreifen Antworten.",
  },
  {
    href: "/product#decisions",
    title: "Entscheidungen",
    body: "Freigaben mit Kontext. Kunden und Führung wissen, was offen ist und warum.",
  },
  {
    href: "/product#executive",
    title: "Executive",
    body: "Portfolio-Health für CEOs und Gründer — was läuft, was blockiert, was entschieden werden muss.",
  },
];

const LAYERS = [
  {
    id: "connectors",
    title: "Signale sammeln, ohne Tools zu ersetzen",
    body: "Festag sitzt über der Delivery. Teams bleiben in GitHub, Slack und Linear — Festag macht daraus verständlichen Fortschritt.",
  },
  {
    id: "decisions",
    title: "Entscheidungen statt Status-Theater",
    body: "Offene Freigaben, Risiken und nächste Schritte werden client-ready — mit Quelle, ruhig und freigabefähig.",
  },
  {
    id: "executive",
    title: "Portfolio-Klarheit für Führung",
    body: "Executive Overview verdichtet Delivery zu dem, was CEOs und Gründer wirklich brauchen: Health, Blocker, Forecast.",
  },
];

export default function ProductPage() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Operational Intelligence über eurer Delivery</h1>
        <p className="page-body">
          Festag sitzt über den Tools, in denen Teams schon arbeiten. Es übersetzt
          Arbeitssignale in client-ready Klarheit — Status, Risiken, Entscheidungen und
          nächste Schritte.
        </p>
        <div className="cta-actions" style={{ marginTop: 28 }}>
          <Btn href={siteLinks.register} variant="solid" size="lg" external>
            Festag starten
          </Btn>
          <Btn href="/tagro" variant="ghost" size="lg">
            Tagro ansehen
          </Btn>
        </div>
        <div className="connector-strip" aria-label="Integrationen">
          <span>GitHub</span>
          <span>Slack</span>
          <span>Linear</span>
          <span>Jira</span>
        </div>

        <div className="list-clean" style={{ marginTop: 56 }}>
          {PILLARS.map((row) => (
            <Link key={row.title} href={row.href} className="list-row">
              <strong>{row.title}</strong>
              <span>{row.body}</span>
            </Link>
          ))}
        </div>

        <div className="page-stack">
          {LAYERS.map((layer) => (
            <section key={layer.id} id={layer.id} className="page-block">
              <h2>{layer.title}</h2>
              <p>{layer.body}</p>
            </section>
          ))}
        </div>

        <section className="section" style={{ paddingTop: 64, paddingBottom: 0 }}>
          <h2 className="section-title">Tagro im Produkt</h2>
          <p className="section-lead">
            Der Operations Interpreter steht im Zentrum — entscheidungsreif, nicht chatty.
          </p>
          <div style={{ maxWidth: 560, marginTop: 8 }}>
            <TagroStage />
          </div>
        </section>

        <div className="cta-band">
          <h2>Kein PM-Tool. Eine Delivery Experience.</h2>
          <p>
            Teams liefern weiter in GitHub und Slack. Festag macht daraus verständlichen
            Fortschritt.
          </p>
          <div className="cta-actions">
            <Btn href={siteLinks.app} variant="solid" size="lg" external>
              Open App
            </Btn>
            <Btn href="/pricing" variant="ghost" size="lg">
              Preise
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
