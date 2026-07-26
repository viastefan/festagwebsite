import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImprintPage() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Impressum</h1>
        <div className="page-stack" style={{ marginTop: 28 }}>
          <section className="page-block">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Die vollständigen Impressumsangaben werden hier mit finalen Firmendaten
              hinterlegt. Bis dahin erreichst du uns unter{" "}
              <a href="mailto:hello@festag.app" style={{ color: "var(--slate)" }}>
                hello@festag.app
              </a>
              .
            </p>
          </section>
          <section className="page-block">
            <h2>Verantwortlich für den Inhalt</h2>
            <p>
              Nach § 55 Abs. 2 RStV — Kontakt über dieselbe Adresse. Bitte keine
              unaufgeforderten Werbesendungen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
