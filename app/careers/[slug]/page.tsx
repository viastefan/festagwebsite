import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllJobs,
  getJobBySlug,
  DEPARTMENT_LABEL,
} from "@/lib/jobs";

export async function generateStaticParams() {
  return getAllJobs({ includeDrafts: false }).map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return { title: "Role not found" };
  return {
    title: `${job.title} — Careers at Festag`,
    description: job.shortDescription,
    openGraph: {
      title: `${job.title} — Careers at Festag`,
      description: job.shortDescription,
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job || job.status !== "published") notFound();

  const mailto = `mailto:${job.applicationEmail}?subject=${encodeURIComponent(
    `Application — ${job.title}`,
  )}&body=${encodeURIComponent(
    `Hallo Festag-Team,\n\nIch interessiere mich für die Rolle "${job.title}".\n\nKurz zu mir:\n— \n\nPortfolio / LinkedIn / GitHub:\n— \n\nWarum Festag:\n— \n\nViele Grüße,\n`,
  )}`;

  const jobLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `${job.mission}\n\n${job.responsibilities.join(" · ")}`,
    datePosted: job.publishedAt,
    employmentType: job.employmentType.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: "Festag",
      sameAs: "https://festag.app",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "DE",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "DACH (DE / AT / CH)",
    },
    directApply: false,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
      />

      {/* ── HEADER ────────────────────────────────────────── */}
      <section className="surface-dark relative overflow-hidden pt-[120px] pb-24 grain">
        <div
          aria-hidden
          className="absolute -top-40 left-[-10%] w-[900px] h-[600px] rounded-full opacity-[0.15] pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
          }}
        />
        <div className="shell relative">
          <Link
            href="/careers"
            className="t-mono text-white/45 hover:text-white inline-flex items-center gap-2"
          >
            <span aria-hidden>←</span> All open roles
          </Link>

          <div className="mt-10 flex items-center gap-3 t-mono text-white/55">
            <span>{DEPARTMENT_LABEL[job.department]}</span>
            <span aria-hidden>·</span>
            <span>{job.location}</span>
            <span aria-hidden>·</span>
            <span>{job.employmentType}</span>
          </div>

          <h1 className="t-headline mt-8 text-white text-[clamp(40px,6.4vw,92px)] max-w-[18ch]">
            {job.title}
          </h1>
          <p className="t-body mt-8 max-w-[60ch] text-white/55 text-[clamp(16px,1.4vw,19px)]">
            {job.shortDescription}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={mailto} className="btn btn-primary h-12 px-6 text-[14px]">
              Apply via email <span aria-hidden>→</span>
            </a>
            <Link href="#apply" className="btn btn-ghost-dark h-12 px-6 text-[14px]">
              Send profile
            </Link>
          </div>
        </div>
      </section>

      {/* ── BODY ──────────────────────────────────────────── */}
      <section className="surface-light py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16">
          <article className="grid gap-14">
            <Block heading="Mission">
              <p className="t-body text-fest-text text-[17px] max-w-[60ch]">
                {job.mission}
              </p>
            </Block>

            <Block heading="What you will build">
              <ul className="grid gap-3 max-w-[60ch]">
                {job.responsibilities.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-[15.5px] tracking-[0.012em]"
                  >
                    <span className="t-mono text-fest-primary mt-1 shrink-0">
                      build
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block heading="What we look for">
              <ul className="grid gap-3 max-w-[60ch]">
                {job.requirements.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 text-[15.5px] tracking-[0.012em]"
                  >
                    <span className="t-mono text-fest-muted mt-1 shrink-0">
                      look
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </Block>

            {job.niceToHave && job.niceToHave.length > 0 && (
              <Block heading="Nice to have">
                <ul className="grid gap-3 max-w-[60ch]">
                  {job.niceToHave.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-3 text-[15.5px] tracking-[0.012em] text-fest-muted"
                    >
                      <span className="t-mono mt-1 shrink-0">+</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {job.applicationProcess && job.applicationProcess.length > 0 && (
              <Block heading="How we hire">
                <ol className="grid gap-3 max-w-[60ch]">
                  {job.applicationProcess.map((s, i) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 text-[15.5px] tracking-[0.012em]"
                    >
                      <span className="t-mono text-fest-muted mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </Block>
            )}
          </article>

          <aside id="apply" className="lg:sticky lg:top-[100px] self-start">
            <div className="card bg-fest-paper border-black/[0.06]">
              <p className="t-mono text-fest-muted">Apply</p>
              <h3 className="mt-3 text-[22px] font-medium tracking-[0.012em] max-w-[24ch]">
                Send us your profile.
              </h3>
              <p className="t-body mt-3 text-fest-muted text-[14.5px]">
                Schreib uns kurz, was du gebaut hast und warum Festag.
                Wir antworten persönlich.
              </p>
              <form
                action={mailto}
                method="post"
                encType="text/plain"
                className="mt-5 grid gap-3"
              >
                <label className="grid gap-1.5">
                  <span className="t-mono text-fest-muted">Name</span>
                  <input className="field" name="Name" required />
                </label>
                <label className="grid gap-1.5">
                  <span className="t-mono text-fest-muted">Email</span>
                  <input
                    type="email"
                    className="field"
                    name="Email"
                    required
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="t-mono text-fest-muted">
                    Portfolio / LinkedIn / GitHub
                  </span>
                  <input className="field" name="Profile" />
                </label>
                <label className="grid gap-1.5">
                  <span className="t-mono text-fest-muted">Short message</span>
                  <textarea
                    className="field"
                    name="Message"
                    rows={5}
                    placeholder="Was hast du gebaut, das uns interessieren sollte?"
                  />
                </label>
                <button type="submit" className="btn btn-primary justify-center">
                  Send application
                </button>
                <p className="t-mono text-fest-muted mt-1">
                  oder direkt:{" "}
                  <a className="underline" href={mailto}>
                    {job.applicationEmail}
                  </a>
                </p>
              </form>
            </div>

            <div className="card mt-3">
              <p className="t-mono text-fest-muted">Department</p>
              <p className="mt-3 text-[16px] tracking-[0.012em]">
                {DEPARTMENT_LABEL[job.department]}
              </p>
              <hr className="my-4 border-black/[0.06]" />
              <p className="t-mono text-fest-muted">Seniority</p>
              <p className="mt-2 text-[16px] tracking-[0.012em] capitalize">
                {job.seniority}
              </p>
              <hr className="my-4 border-black/[0.06]" />
              <p className="t-mono text-fest-muted">Remote policy</p>
              <p className="mt-2 text-[16px] tracking-[0.012em] capitalize">
                {job.remotePolicy}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Block({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="section-label text-fest-muted">{heading}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}
