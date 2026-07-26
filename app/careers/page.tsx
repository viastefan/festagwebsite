import type { Metadata } from "next";
import Link from "next/link";
import { getAllJobs, DEPARTMENT_LABEL } from "@/lib/jobs";
import { Btn } from "../_components/site/primitives";

export const metadata: Metadata = {
  title: "Karriere",
  description: "Arbeite an Festag — dem Operating System für Delivery Intelligence.",
};

const VALUES = [
  {
    title: "Produktwahrheit",
    body: "Keine Chatbot-Demos. Festag ist Operational Intelligence — wir halten die Linie.",
  },
  {
    title: "Calm craft",
    body: "Linear-Niveau in Code und UI. Weniger Features, bessere Defaults.",
  },
  {
    title: "Collaboration, nicht Surveillance",
    body: "Adaptive Intelligence bleibt workspace-scoped, opt-in und erklärbar.",
  },
];

export default function CareersPage() {
  const jobs = getAllJobs().filter((j) => j.status === "published");

  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Karriere</h1>
        <p className="page-body">
          Wir bauen die Intelligence Layer für moderne Organisationen. Calm craft, harte
          Produktwahrheit, kein Chatbot-Theater.
        </p>

        <div className="grid-3" style={{ marginTop: 40 }}>
          {VALUES.map((v) => (
            <article key={v.title} className="tile">
              <h3>{v.title}</h3>
              <p>{v.body}</p>
            </article>
          ))}
        </div>

        <section className="section" style={{ paddingTop: 56, paddingBottom: 0 }}>
          <h2 className="section-title">Offene Rollen</h2>
          {jobs.length === 0 ? (
            <p className="page-body" style={{ marginTop: 0 }}>
              Gerade keine offenen Rollen. Schreib an careers@festag.app, wenn du trotzdem
              passen könntest.
            </p>
          ) : (
            <div className="list-clean">
              {jobs.map((job) => (
                <Link key={job.slug} href={`/careers/${job.slug}`} className="list-row">
                  <strong>{job.title}</strong>
                  <span>
                    {DEPARTMENT_LABEL[job.department]}, {job.location}, {job.remotePolicy}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="cta-band">
          <h2>Kein Match, aber starkes Signal?</h2>
          <p>Schick uns trotzdem eine ruhige Notiz — wir lesen mit.</p>
          <div className="cta-actions">
            <Btn href="mailto:careers@festag.app" variant="solid" size="lg" external>
              careers@festag.app
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
