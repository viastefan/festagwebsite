import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllJobs, getJobBySlug, DEPARTMENT_LABEL } from "@/lib/jobs";
import { Btn } from "../../_components/site/primitives";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllJobs().map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Rolle" };
  return {
    title: job.title,
    description: job.shortDescription,
  };
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job || job.status !== "published") notFound();

  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title" style={{ maxWidth: "22ch" }}>
          {job.title}
        </h1>
        <p className="page-meta">
          {DEPARTMENT_LABEL[job.department]}, {job.location}, {job.remotePolicy},{" "}
          {job.employmentType}
        </p>
        <p className="page-body" style={{ marginTop: 20 }}>
          {job.mission}
        </p>

        <div className="page-stack">
          <section className="page-block">
            <h2>Verantwortung</h2>
            <ul className="prose-list">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="page-block">
            <h2>Anforderungen</h2>
            <ul className="prose-list">
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {job.niceToHave && job.niceToHave.length > 0 ? (
            <section className="page-block">
              <h2>Nice to have</h2>
              <ul className="prose-list">
                {job.niceToHave.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {job.benefits && job.benefits.length > 0 ? (
            <section className="page-block">
              <h2>Was wir bieten</h2>
              <ul className="prose-list">
                {job.benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {job.applicationProcess && job.applicationProcess.length > 0 ? (
            <section className="page-block">
              <h2>Bewerbungsprozess</h2>
              <ul className="prose-list">
                {job.applicationProcess.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <div className="cta-band">
          <h2>Bewirb dich</h2>
          <p>
            Schreib an {job.applicationEmail} — kurz, klar, ohne Anschreiben-Theater.
          </p>
          <div className="cta-actions">
            <Btn
              href={`mailto:${job.applicationEmail}?subject=${encodeURIComponent(job.title)}`}
              variant="solid"
              size="lg"
              external
            >
              Bewerbung senden
            </Btn>
            <Btn href="/careers" variant="ghost" size="lg">
              Alle Rollen
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
