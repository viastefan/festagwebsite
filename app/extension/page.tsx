import type { Metadata } from "next";
import { Btn, siteLinks } from "../_components/site/primitives";

export const metadata: Metadata = {
  title: "Chrome Extension",
  description:
    "Festag Chrome Extension — Delivery Intelligence im Browser, ohne Kontextverlust.",
};

const STEPS = [
  {
    title: "Installieren",
    body: "Extension laden und mit deinem Festag Workspace verbinden — in unter einer Minute.",
  },
  {
    title: "Signale erfassen",
    body: "Status, Entscheidungen und Notizen dort erfassen, wo du arbeitest.",
  },
  {
    title: "Klarheit behalten",
    body: "Tagro und Dashboard bleiben synchron — ohne ein weiteres Tool zu stapeln.",
  },
];

const BENEFITS = [
  "Kein Kontextwechsel zwischen Browser und Status-Runden",
  "Dieselbe ruhige Sprache wie in Festag — client-ready",
  "Permission-aware: nur was dein Workspace erlaubt",
];

export default function ExtensionPage() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Chrome Extension</h1>
        <p className="page-body">
          Festag bleibt nah an der Arbeit. Die Extension bringt Status und Klarheit in den
          Browser — ruhig, schnell, ohne Theater.
        </p>
        <div className="cta-actions" style={{ marginTop: 28 }}>
          <Btn href={siteLinks.app} variant="solid" size="lg" external>
            In der App starten
          </Btn>
          <Btn href="mailto:hello@festag.app?subject=Chrome%20Extension" variant="ghost" size="lg" external>
            Early Access anfragen
          </Btn>
        </div>
        <p className="page-meta">Chrome Web Store — Early Access über hello@festag.app</p>

        <section className="section" style={{ paddingTop: 56, paddingBottom: 0 }}>
          <h2 className="section-title">So nutzt du sie</h2>
          <div className="grid-3">
            {STEPS.map((s) => (
              <article key={s.title} className="tile">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-block" style={{ marginTop: 56 }}>
          <h2>Warum eine Extension</h2>
          <ul className="prose-list">
            {BENEFITS.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>

        <div className="cta-band">
          <h2>Zuerst die Delivery Experience.</h2>
          <p>Workspace anlegen — die Extension folgt demselben ruhigen Modell.</p>
          <div className="cta-actions">
            <Btn href={siteLinks.register} variant="solid" size="lg" external>
              Workspace starten
            </Btn>
            <Btn href="/product" variant="ghost" size="lg">
              Produkt
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
