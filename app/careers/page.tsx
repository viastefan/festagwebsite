import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllJobs,
  DEPARTMENT_LABEL,
  type JobDepartment,
} from "@/lib/jobs";
import { SignalRouter } from "../_components/visuals/SignalRouter";

export const metadata: Metadata = {
  title: "Careers — Build the Control Layer for Modern Project Work",
  description:
    "Join Festag and help build the AI control layer for projects, decisions, proof, reports and client-ready execution.",
};

const MISSION_PILLARS = [
  {
    title: "Clarity",
    body: "Make complex project work understandable — for clients, teams and leadership.",
  },
  {
    title: "Proof",
    body: "Connect progress to evidence. Every status is traceable.",
  },
  {
    title: "Decisions",
    body: "Move work forward by making the choices that unlock execution visible.",
  },
  {
    title: "Trust",
    body: "Help clients and teams work with less uncertainty.",
  },
  {
    title: "Calm AI",
    body: "Use AI to explain — never to overwhelm.",
  },
];

const WHAT_WE_BUILD = [
  { title: "Tagro", body: "Briefing intelligence for projects, reports, decisions and handoffs." },
  { title: "ProofGrid", body: "Evidence infrastructure for work, approvals, documents and integrations." },
  { title: "Nexora", body: "Risk and readiness checks for reports, visibility and delivery." },
  { title: "Decision Layer", body: "The operating layer for choices that block or unlock progress." },
  { title: "Client Panel", body: "A calm status room for customers." },
  { title: "Execution Panel", body: "Focused work surfaces for developers, marketers and contractors." },
  { title: "Marketing Control Room", body: "Campaign, content, budget and results visibility." },
  { title: "Internal Company Mode", body: "Department control rooms, company pulse and internal reports." },
  { title: "Design System", body: "A serious, premium UI system for project control." },
  { title: "Motion & Brand", body: "Product motion that explains complex systems without noise." },
];

const PRINCIPLES = [
  {
    title: "Clarity over noise",
    body: "Wir bevorzugen präzise Arbeit, klare Verantwortung und ruhige Kommunikation.",
  },
  {
    title: "Product quality matters",
    body: "Festag soll nie wie eine temporäre App wirken. Jedes Interface, jeder Button, jeder Flow hat Absicht.",
  },
  {
    title: "AI with responsibility",
    body: "Tagro erklärt, strukturiert, unterstützt — Menschen bleiben in Kontrolle.",
  },
  {
    title: "Evidence beats opinions",
    body: "Wir bauen Systeme, in denen Fortschritt durch Proof gestützt wird.",
  },
  {
    title: "Decisions move work",
    body: "Wir kümmern uns um die Entscheidungen, die Execution freigeben.",
  },
  {
    title: "Small team, high standards",
    body: "Lieber wenige Dinge gut shippen als viele schlecht.",
  },
];

export default function CareersPage() {
  const jobs = getAllJobs();
  const grouped = jobs.reduce<Record<JobDepartment, typeof jobs>>(
    (acc, j) => {
      (acc[j.department] ||= []).push(j);
      return acc;
    },
    {
      engineering: [],
      design: [],
      product: [],
      ai: [],
      marketing: [],
      operations: [],
      sales: [],
      internships: [],
    },
  );

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="surface-dark relative overflow-hidden pt-[120px] pb-32 grain">
        <div
          aria-hidden
          className="absolute -top-40 right-[-10%] w-[900px] h-[600px] rounded-full opacity-[0.2] pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
          }}
        />
        <div className="shell relative">
          <p className="section-label text-white/55">Careers at Festag</p>
          <h1 className="t-headline mt-8 text-white text-[clamp(44px,7.4vw,108px)] max-w-[18ch]">
            Build the control layer for{" "}
            <span className="t-serif-italic text-white/85">modern project work</span>.
          </h1>
          <p className="t-body mt-10 max-w-[60ch] text-white/55 text-[clamp(16px,1.4vw,19px)]">
            Wir bauen das System, das verstreute Execution in klare Entscheidungen,
            Proof, Reports und client-fähige Wahrheit verwandelt. Wenn dich
            ernsthafte Software, ruhiges Design und operative Klarheit interessieren,
            sollten wir reden.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="#open-roles" className="btn btn-primary h-12 px-6 text-[14px]">
              View open roles
            </Link>
            <Link href="#how-we-work" className="btn btn-ghost-dark h-12 px-6 text-[14px]">
              How we work
            </Link>
          </div>

          <div className="mt-20 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-10">
            <SignalRouter />
          </div>
        </div>
      </section>

      {/* ── MISSION ────────────────────────────────────────── */}
      <section className="surface-light py-28">
        <div className="shell">
          <p className="section-label text-fest-muted">Mission</p>
          <h2 className="t-headline mt-6 max-w-[22ch] text-[clamp(34px,5vw,68px)]">
            The world doesn&apos;t need another workspace.{" "}
            <span className="t-serif-italic text-fest-muted">
              It needs clearer work.
            </span>
          </h2>
          <p className="t-body mt-8 max-w-[64ch] text-fest-muted text-[17px]">
            Teams nutzen bereits Tools für Tasks, Dokumente, Messages, Code,
            Kampagnen und Files. Was meistens fehlt, ist die Schicht, die
            erklärt, was wirklich wichtig ist: was gemacht wurde, was es
            beweist, was blockiert ist, was entschieden werden muss und was
            kommuniziert werden soll. Festag ist diese Schicht.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
            {MISSION_PILLARS.map((p, i) => (
              <div key={p.title} className="bg-white p-7">
                <span className="t-mono text-fest-muted">
                  pillar · {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[18px] font-medium tracking-[0.012em]">
                  {p.title}
                </h3>
                <p className="t-body mt-2 text-fest-muted text-[14px]">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE BUILD ───────────────────────────────────── */}
      <section className="surface-dark py-28">
        <div className="shell">
          <p className="section-label text-white/55">What we build</p>
          <h2 className="t-headline mt-6 text-white text-[clamp(34px,5vw,64px)] max-w-[22ch]">
            Serious engineering and design{" "}
            <span className="t-serif-italic text-white/70">domains</span>.
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {WHAT_WE_BUILD.map((c, i) => (
              <article key={c.title} className="card card-dark">
                <span className="t-mono text-white/40">
                  domain · {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[19px] tracking-[0.012em] font-medium text-white">
                  {c.title}
                </h3>
                <p className="t-body mt-2 text-white/55 text-[14.5px]">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ────────────────────────────────────── */}
      <section id="how-we-work" className="surface-light py-28">
        <div className="shell">
          <p className="section-label text-fest-muted">How we work</p>
          <h2 className="t-headline mt-6 text-[clamp(34px,5vw,64px)] max-w-[22ch]">
            Small team.{" "}
            <span className="t-serif-italic text-fest-muted">High standards.</span>
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="card">
                <h3 className="text-[18px] tracking-[0.012em] font-medium">
                  {p.title}
                </h3>
                <p className="t-body mt-3 text-fest-muted text-[14.5px]">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ─────────────────────────────────────── */}
      <section id="open-roles" className="surface-light py-28 border-t border-black/[0.05]">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="section-label text-fest-muted">Open roles</p>
              <h2 className="t-headline mt-6 text-[clamp(34px,5vw,64px)] max-w-[22ch]">
                Build something{" "}
                <span className="t-serif-italic text-fest-muted">important</span>.
              </h2>
            </div>
            <p className="t-body text-fest-muted max-w-[40ch] text-[15px]">
              Wir stellen ein kleines, ernsthaftes Team auf — über Product,
              Engineering, Design, AI, Marketing und Operations hinweg.{" "}
              <span className="text-fest-text">{jobs.length} offene Rollen</span>.
            </p>
          </div>

          <div className="mt-14 grid gap-14">
            {(Object.keys(grouped) as JobDepartment[])
              .filter((d) => grouped[d].length > 0)
              .map((d) => (
                <div key={d}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-fest-primary" />
                    <span className="t-mono text-fest-muted">
                      {DEPARTMENT_LABEL[d]}
                    </span>
                    <span className="t-mono text-fest-muted/60">
                      · {grouped[d].length}
                    </span>
                  </div>

                  <ul className="rounded-2xl overflow-hidden border border-black/[0.07] divide-y divide-black/[0.06]">
                    {grouped[d].map((j) => (
                      <li key={j.id}>
                        <Link
                          href={`/careers/${j.slug}`}
                          className="group grid grid-cols-1 md:grid-cols-[1.4fr_1fr_auto] gap-4 items-center px-6 py-6 bg-white hover:bg-black/[0.015] transition-colors"
                        >
                          <div>
                            <p className="text-[20px] font-medium tracking-[0.012em] text-fest-text">
                              {j.title}
                            </p>
                            <p className="t-body mt-1 text-fest-muted text-[14px]">
                              {j.shortDescription}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 t-mono text-fest-muted">
                            <span>{j.location}</span>
                            <span>·</span>
                            <span>{j.employmentType}</span>
                          </div>
                          <span className="text-fest-primary text-[14px] tracking-[0.012em] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                            Apply <span aria-hidden>→</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>

          <div className="mt-20 card bg-fest-paper border-black/[0.06]">
            <p className="t-eyebrow text-fest-muted">No fit yet?</p>
            <h3 className="mt-3 text-[24px] font-medium tracking-[0.012em] max-w-[36ch]">
              Wenn deine Arbeit in die Mission passt, schreib uns trotzdem.
            </h3>
            <p className="t-body mt-3 max-w-[52ch] text-fest-muted text-[15px]">
              Wir lesen jede ernstgemeinte Nachricht — auch ohne offene Rolle.
            </p>
            <a
              href="mailto:careers@festag.app?subject=Festag%20%E2%80%94%20Speculative%20application"
              className="btn btn-primary mt-6"
            >
              careers@festag.app
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section className="surface-dark py-32">
        <div className="shell text-center">
          <p className="section-label justify-center inline-flex text-white/55">
            Festag · Careers
          </p>
          <h2 className="t-headline mt-8 text-white text-[clamp(36px,5.5vw,80px)] max-w-[22ch] mx-auto">
            Help make project work easier to{" "}
            <span className="t-serif-italic text-white/70">trust</span>.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="#open-roles" className="btn btn-primary h-12 px-6">
              View open roles
            </Link>
            <Link href="/contact" className="btn btn-ghost-dark h-12 px-6">
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
