import type { Metadata } from "next";
import Link from "next/link";
import { Btn, siteLinks } from "../_components/site/primitives";

export const metadata: Metadata = {
  title: "Guides",
  description: "Festag Guides — Produktwahrheit, Tagro, Extension und Einstieg.",
};

const DOCS = [
  {
    title: "Was Festag ist",
    body: "Operational Intelligence über eurer Delivery — nicht PM-Tool, nicht Chatbot.",
    href: "/product",
  },
  {
    title: "Tagro",
    body: "Operations Interpreter — wie Signale zu ruhigen, entscheidungsreifen Antworten werden.",
    href: "/tagro",
  },
  {
    title: "Chrome Extension",
    body: "Status und Klarheit im Browser — ohne Kontextwechsel.",
    href: "/extension",
  },
  {
    title: "Preise & Einstieg",
    body: "Pläne für Teams, Organisationen und Enterprise.",
    href: "/pricing",
  },
  {
    title: "Datenschutz",
    body: "Adaptive Intelligence als Collaboration Intelligence — Opt-in, Export, Löschung.",
    href: "/legal/privacy",
  },
  {
    title: "Kontakt",
    body: "Sales, Support, Security — direkt und ruhig.",
    href: "/contact",
  },
];

export default function DocsPage() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Guides</h1>
        <p className="page-body">
          Kurze Einstiege in Festag. Die operative Wahrheit — Connectors, Tagro, Decisions —
          lebt in der App.
        </p>

        <div className="list-clean" style={{ marginTop: 40 }}>
          {DOCS.map((doc) => (
            <Link key={doc.href} href={doc.href} className="list-row">
              <strong>{doc.title}</strong>
              <span>{doc.body}</span>
            </Link>
          ))}
        </div>

        <div className="cta-band">
          <h2>Weiter in der App</h2>
          <p>Workspace, Connectors und Tagro — dort beginnt die echte Nutzung.</p>
          <div className="cta-actions">
            <Btn href={siteLinks.app} variant="solid" size="lg" external>
              Open App
            </Btn>
            <Btn href={siteLinks.register} variant="ghost" size="lg" external>
              Workspace starten
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
