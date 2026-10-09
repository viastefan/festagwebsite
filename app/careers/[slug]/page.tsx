import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllJobs, getJobBySlug, DEPARTMENT_LABEL } from "@/lib/jobs";
import { Button } from "../../_components/ui/Button";
import { Icon } from "../../_components/ui/Icon";
import { Reveal } from "../../_components/ui/Reveal";

type Props = { params: Promise<{ slug: string }> };

const REMOTE: Record<string, string> = { remote: "Remote", hybrid: "Hybrid", "on-site": "Vor Ort" };
const TYPE: Record<string, string> = {
  "full-time": "Vollzeit",
  "part-time": "Teilzeit",
  contract: "Freelance",
  internship: "Praktikum",
  "working-student": "Werkstudent:in",
};

export function generateStaticParams() {
  return getAllJobs().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Rolle" };
  return { title: job.title, description: job.shortDescription };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job || job.status !== "published") notFound();

  const sections: [string, string[] | undefined][] = [
    ["Verantwortung", job.responsibilities],
    ["Anforderungen", job.requirements],
    ["Nice to have", job.niceToHave],
    ["Was wir bieten", job.benefits],
    ["Bewerbungsprozess", job.applicationProcess],
  ];
  const apply = `mailto:${job.applicationEmail}?subject=${encodeURIComponent(job.title)}`;

  return (
    <section className="page-hero">
      <div className="wrap">
        <Link href="/careers" className="link" style={{ marginBottom: 28 }}>
          <Icon name="arrow" size={14} style={{ transform: "rotate(180deg)" }} />
          Alle Rollen
        </Link>
        <div className="jb">
          <Reveal className="jb-main">
            <span className="eyebrow">{DEPARTMENT_LABEL[job.department]}</span>
            <h1 className="display display--sm" style={{ marginTop: 16 }}>
              {job.title}
            </h1>
            <p className="lead" style={{ marginTop: 20 }}>
              {job.mission}
            </p>
            <div className="prose" style={{ marginTop: 12 }}>
              {sections.map(([title, items]) =>
                items && items.length > 0 ? (
                  <section key={title}>
                    <h2>{title}</h2>
                    <ul>
                      {items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </section>
                ) : null,
              )}
            </div>
          </Reveal>
          <aside className="jb-side">
            <dl>
              <div>
                <dt>Ort</dt>
                <dd>{job.location}</dd>
              </div>
              <div>
                <dt>Arbeitsmodell</dt>
                <dd>{REMOTE[job.remotePolicy] ?? job.remotePolicy}</dd>
              </div>
              <div>
                <dt>Anstellung</dt>
                <dd>{TYPE[job.employmentType] ?? job.employmentType}</dd>
              </div>
            </dl>
            <Button href={apply} variant="solid" arrow>
              Bewerbung senden
            </Button>
            <p className="small">An {job.applicationEmail} — kurz, klar, ohne Anschreiben-Theater.</p>
          </aside>
        </div>
      </div>
      <style>{`
        .jb { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: clamp(28px, 5vw, 72px); align-items: start; margin-top: 8px; }
        .jb-side { position: sticky; top: calc(var(--nav-h) + 24px); display: grid; gap: 16px; padding: 22px; border-radius: 10px; background: var(--surface); border: var(--hair) solid var(--line); box-shadow: var(--sh-sm); }
        .jb-side dl { margin: 0; display: grid; gap: 12px; }
        .jb-side dt { font-size: 12px; color: var(--faint); }
        .jb-side dd { margin: 2px 0 0; font-size: 15px; color: var(--ink); }
        .jb-side .btn { width: 100%; }
        @media (max-width: 860px) { .jb { grid-template-columns: 1fr; } .jb-side { position: static; } }
      `}</style>
    </section>
  );
}
