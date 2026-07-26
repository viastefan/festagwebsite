import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function PrivacyPage() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Datenschutz</h1>
        <div className="page-stack" style={{ marginTop: 28 }}>
          <section className="page-block">
            <h2>Collaboration Intelligence</h2>
            <p>
              Festag behandelt Adaptive Intelligence als Collaboration Intelligence — nicht
              als Surveillance. Learning bleibt workspace-scoped. Personal Profiles sind
              Opt-in. Export und Löschung sind vorgesehen.
            </p>
          </section>
          <section className="page-block">
            <h2>Was wir speichern</h2>
            <p>
              Account- und Workspace-Daten, Delivery-Signale aus verbundenen Tools (soweit
              ihr sie verbindet), sowie Nutzungsdaten zur Stabilität der Plattform —
              permission-aware und zweckgebunden.
            </p>
          </section>
          <section className="page-block">
            <h2>Kontakt</h2>
            <p>
              Fragen zu Datenschutz und Auskunft:{" "}
              <a href="mailto:privacy@festag.app" style={{ color: "var(--slate)" }}>
                privacy@festag.app
              </a>
              . Die vollständige Datenschutzerklärung mit Processor-Liste folgt an dieser
              Stelle.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
