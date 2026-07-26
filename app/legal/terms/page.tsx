import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGB",
};

export default function TermsPage() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">AGB</h1>
        <div className="page-stack" style={{ marginTop: 28 }}>
          <section className="page-block">
            <h2>Nutzung von Festag</h2>
            <p>
              Festag ist eine Operational Intelligence Platform für Organisationen. Die
              Nutzung setzt einen Workspace und die geltenden Produktbedingungen voraus.
            </p>
          </section>
          <section className="page-block">
            <h2>Verantwortung</h2>
            <p>
              Ihr bleibt verantwortlich für Inhalte und verbundene Tools in eurem
              Workspace. Festag ersetzt keine Rechts-, Steuer- oder Sicherheitsberatung.
            </p>
          </section>
          <section className="page-block">
            <h2>Kontakt</h2>
            <p>
              Die vollständigen AGB werden hier hinterlegt. Bis dahin:{" "}
              <a href="mailto:hello@festag.app" style={{ color: "var(--slate)" }}>
                hello@festag.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
