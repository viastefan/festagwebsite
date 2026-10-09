import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { Button } from "../_components/ui/Button";
import { PageHero, SectionHead } from "../_components/ui/Section";
import { getAllJobs, DEPARTMENT_LABEL, type JobDepartment } from "@/lib/jobs";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  title: "Karriere",
  description: "Baue mit uns die Kategorie Operational Intelligence. Remote in DACH.",
};

const VALUES = [
  { title: "Produktwahrheit", body: "Keine Chatbot-Demos. Festag ist Operational Intelligence — wir halten die Linie, auch wenn es unbequem ist." },
  { title: "Calm craft", body: "Linear-Niveau in Code und UI. Weniger Features, bessere Defaults, kein Lärm." },
  { title: "Collaboration, nicht Surveillance", body: "Adaptive Intelligence bleibt workspace-gebunden, Opt-in und erklärbar. Das gilt auch intern." },
];

const REMOTE: Record<string, string> = { remote: "Remote", hybrid: "Hybrid", "on-site": "Vor Ort" };

export default function CareersPage() {
  const jobs = getAllJobs();
  const groups = jobs.reduce<Record<string, typeof jobs>>((acc, j) => {
    (acc[j.department] ??= []).push(j);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Karriere"
        title={
          <>
            Wir bauen Software, die <span className="serif accent">versteht,</span> wie Organisationen arbeiten.
          </>
        }
        lead="Ein kleines Team, eine neue Kategorie. Remote in DACH, mit echtem Ownership und Equity für die ersten Rollen."
      >
        <div className="btn-row">
          <Button href="#roles" variant="solid" size="lg" arrow>
            Offene Rollen
          </Button>
          <Button href={links.careers} variant="soft" size="lg">
            Initiativbewerbung
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <RevealGroup className="grid-3">
            {VALUES.map((v) => (
              <RevealItem key={v.title} className="card card--soft">
                <h3 className="h4">{v.title}</h3>
                <p className="body" style={{ fontSize: 14.5 }}>
                  {v.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight" id="roles">
        <div className="wrap">
          <SectionHead title={`${jobs.length} offene Rollen`} />
          {Object.entries(groups).map(([dept, list]) => (
            <Reveal key={dept} className="cr-group">
              <h3 className="cr-dept">{DEPARTMENT_LABEL[dept as JobDepartment]}</h3>
              <div className="rows">
                {list.map((j) => (
                  <Link key={j.slug} href={`/careers/${j.slug}`} className="row">
                    <span>
                      <span className="row-title" style={{ display: "block" }}>
                        {j.title}
                      </span>
                      <span className="row-body" style={{ display: "block" }}>
                        {j.shortDescription}
                      </span>
                    </span>
                    <span className="row-meta">
                      <span className="cr-loc">
                        {j.location} · {REMOTE[j.remotePolicy] ?? j.remotePolicy}
                      </span>
                      <Icon name="arrow" size={16} className="row-arrow" />
                    </span>
                  </Link>
                ))}
              </div>
            </Reveal>
          ))}
          <Reveal className="cr-open">
            <p className="body">
              Nichts Passendes dabei? Schreib uns trotzdem an{" "}
              <a href={links.careers} className="accent">
                careers@festag.app
              </a>{" "}
              — kurz, klar, ohne Anschreiben-Theater.
            </p>
          </Reveal>
        </div>
      </section>

      <style>{`
        .cr-group { margin-top: 32px; }
        .cr-dept { font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--burgundy); margin-bottom: 8px; }
        .cr-open { margin-top: 40px; }
        @media (max-width: 640px) { .cr-loc { display: none; } }
      `}</style>
    </>
  );
}
