import Link from "next/link";
import type { Metadata } from "next";
import { SignalRouter } from "./_components/visuals/SignalRouter";
import { DecisionInbox } from "./_components/visuals/DecisionInbox";
import { ProofGridDemo } from "./_components/visuals/ProofGridDemo";
import { TagroBriefing } from "./_components/visuals/TagroBriefing";
import { ClientPanelMock } from "./_components/visuals/ClientPanelMock";
import { ExecutionPanelMock } from "./_components/visuals/ExecutionPanelMock";
import { MarketingFlow } from "./_components/visuals/MarketingFlow";
import { InboxMock } from "./_components/visuals/InboxMock";

export const metadata: Metadata = {
  title: "Festag — AI Control Layer for Modern Project Work",
  description:
    "Festag turns scattered project work into clear decisions, proof, reports and client-ready execution. The calm operating layer for teams, clients and leaders.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <SystemSection />
      <DecisionsSection />
      <ProofSection />
      <TagroSection />
      <ClientPanelSection />
      <ExecutionSection />
      <MarketingSection />
      <InternalModeSection />
      <NotesPdfSection />
      <InboxSection />
      <FinalCTA />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — cinematic, monochrome, single primary accent.
   ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="surface-dark relative overflow-hidden pt-[120px] pb-32 grain">
      {/* Soft primary glow, very restrained */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full opacity-[0.25] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
        }}
      />
      <div className="shell relative">
        <p className="section-label text-white/55">
          AI Control Layer for Projects
        </p>

        <h1 className="t-headline mt-8 text-white text-[clamp(48px,8.6vw,124px)] max-w-[18ch]">
          Turn project chaos into{" "}
          <span className="t-serif-italic text-white/85">clarity</span>, proof
          and decisions.
        </h1>

        <p className="t-body mt-10 max-w-[58ch] text-white/55 text-[clamp(16px,1.6vw,20px)]">
          Festag connects teams, clients, decisions, evidence, risks and
          reports into one calm system — so everyone knows what happened, what
          matters and what needs to happen next.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn btn-primary h-12 px-6 text-[14px]">
            Book demo <span aria-hidden>→</span>
          </Link>
          <Link href="/product" className="btn btn-ghost-dark h-12 px-6 text-[14px]">
            Explore product
          </Link>
        </div>

        <p className="t-mono text-white/35 mt-16 max-w-[52ch] leading-relaxed">
          ProofGrid proves the work. Nexora checks the risks. Tagro explains
          the progress.
        </p>

        {/* Hero diagram */}
        <div className="mt-20 relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-10">
          <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-fest-black-deep border border-white/[0.08]">
            <span className="t-mono text-white/55">festag / signal router</span>
          </div>
          <SignalRouter />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROBLEM — editorial white section with three problem cards.
   ───────────────────────────────────────────────────────────── */
function ProblemSection() {
  const problems = [
    { title: "Status chaos", body: "Status verteilt sich auf Slack, Mails und Calls — nichts ist quotable." },
    { title: "Missing decisions", body: "Entscheidungen werden in Threads vergessen und blockieren Arbeit." },
    { title: "Work without proof", body: "Lieferungen ohne Evidenz — Approvals werden zur Vertrauensfrage." },
    { title: "Manual reports", body: "Jeder Bericht ist ein neuer Copy-Paste-Job statt System-Output." },
    { title: "Unclear marketing", body: "Budgets fließen, aber Ergebnisse bleiben opak für Kunden und Leadership." },
    { title: "Asking for updates", body: "Clients fragen ständig — weil keine ruhige, geteilte Wahrheit existiert." },
  ];
  return (
    <section className="surface-light py-28">
      <div className="shell">
        <p className="section-label text-fest-muted">Problem</p>
        <h2 className="t-headline mt-6 max-w-[22ch] text-[clamp(34px,5vw,68px)]">
          Projects don&apos;t fail because nobody works.{" "}
          <span className="t-serif-italic text-fest-muted">
            They fail because nobody sees clearly.
          </span>
        </h2>
        <p className="t-body mt-8 max-w-[64ch] text-fest-muted text-[17px]">
          Work happens across tools, calls, PDFs, meetings, boards, ad
          accounts, repos, design files and client messages. Progress becomes
          hard to trust when decisions disappear, proof is missing and reports
          are manual.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
          {problems.map((p) => (
            <article key={p.title} className="bg-white p-8">
              <h3 className="text-[18px] font-medium tracking-[0.012em]">
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
  );
}

/* ─────────────────────────────────────────────────────────────
   SYSTEM — the eleven product surfaces, bento-style.
   ───────────────────────────────────────────────────────────── */
function SystemSection() {
  const cells = [
    { title: "Projects", body: "Operative Wahrheit jedes Projekts — Phase, Owner, Pulse." },
    { title: "Decisions", body: "Choices, die Arbeit blockieren oder freigeben." },
    { title: "ProofGrid", body: "Evidence-Matrix für jede Phase und jedes Artefakt." },
    { title: "Nexora", body: "Risiko, Readiness und Sichtbarkeit — automatisch geprüft." },
    { title: "Tagro", body: "Briefing-Intelligenz für Reports, Decisions, PDFs und Handoffs." },
    { title: "Reports", body: "Clientreife Berichte — geschrieben, geprüft, geteilt." },
    { title: "Client Panel", body: "Eine ruhige Status-Bühne für Kund:innen." },
    { title: "Execution Panel", body: "Fokussierte Surfaces für Dev, Marketing und Operations." },
    { title: "Inbox", body: "Nichts Wichtiges geht verloren." },
    { title: "Marketing Projects", body: "Budget, Kampagne, Leads, Assets, Approvals, Result." },
    { title: "Internal Mode", body: "Festag im Unternehmen — ohne Wiki zu werden." },
  ];
  return (
    <section className="surface-dark py-32">
      <div className="shell">
        <p className="section-label text-white/55">Product System</p>
        <h2 className="t-headline mt-6 text-white text-[clamp(34px,5vw,68px)] max-w-[22ch]">
          One system for work, proof, decisions and reports.
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {cells.map((c, i) => (
            <article
              key={c.title}
              className="card card-dark"
              style={{
                animation: `fest-fragment-in 700ms ${i * 60}ms var(--ease-out) both`,
              }}
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B647D]" />
                <span className="t-mono text-white/40">
                  module · {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-[20px] tracking-[0.012em] font-medium text-white">
                {c.title}
              </h3>
              <p className="t-body mt-3 text-white/55 text-[14.5px]">
                {c.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DECISIONS — work moves when decisions move.
   ───────────────────────────────────────────────────────────── */
function DecisionsSection() {
  return (
    <section className="surface-light py-28">
      <div className="shell grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        <div>
          <p className="section-label text-fest-muted">Decisions</p>
          <h2 className="t-headline mt-6 text-[clamp(34px,4.5vw,56px)] max-w-[18ch]">
            The work moves when{" "}
            <span className="t-serif-italic text-fest-muted">decisions</span>{" "}
            move.
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-fest-muted text-[17px]">
            Tasks zeigen, was zu tun ist. Decisions zeigen, was Fortschritt
            freigibt. Festag macht beide gleich wichtig — und beide sichtbar.
          </p>

          <ul className="mt-10 grid gap-3 max-w-[40ch]">
            {[
              "Budget für Q3 +18 % freigeben?",
              "Feature jetzt shippen oder Phase 2?",
              "Design-Richtung B bestätigen?",
              "Mit aktuellem Vendor weitermachen?",
              "Kampagne diese Woche launchen?",
            ].map((q) => (
              <li
                key={q}
                className="flex items-start gap-3 text-[14.5px] tracking-[0.012em]"
              >
                <span className="t-mono text-fest-primary mt-1">decision</span>
                <span className="text-fest-text">{q}</span>
              </li>
            ))}
          </ul>
        </div>
        <DecisionInbox />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROOF — progress should be provable.
   ───────────────────────────────────────────────────────────── */
function ProofSection() {
  return (
    <section className="surface-light py-28 border-t border-black/[0.05]">
      <div className="shell grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
        <ProofGridDemo />
        <div>
          <p className="section-label text-fest-muted">ProofGrid</p>
          <h2 className="t-headline mt-6 text-[clamp(34px,4.5vw,56px)] max-w-[18ch]">
            Progress should be{" "}
            <span className="t-serif-italic text-fest-muted">provable</span>.
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-fest-muted text-[17px]">
            Jede Phase, jedes Artefakt, jede Approval bekommt einen Proof-Zustand —
            manuell, verlinkt, approved oder verifiziert. Berichte zitieren Evidence
            statt sie zu beschreiben.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAGRO — explains what matters.
   ───────────────────────────────────────────────────────────── */
function TagroSection() {
  return (
    <section className="surface-dark py-32">
      <div className="shell grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-16 items-center">
        <div>
          <p className="section-label text-white/55">Tagro</p>
          <h2 className="t-headline mt-6 text-white text-[clamp(34px,4.5vw,56px)] max-w-[18ch]">
            Tagro explains{" "}
            <span className="t-serif-italic text-white/70">what matters</span>.
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-white/55 text-[17px]">
            Briefings, Reports, PDF-Zusammenfassungen, Audio-Transkripte —
            Tagro komprimiert verteilte Signale zu einer Status-Wahrheit, die
            Menschen verstehen. Immer mit Text-Transkript. Immer mit Quelle.
          </p>
          <ul className="mt-10 grid gap-2 max-w-[48ch]">
            {[
              "Briefing aus 14 Signalen — in 9 Zeilen.",
              "Decision-Summary mit Quelle und Zeitstempel.",
              "Report-Draft, der Kunden direkt geschickt werden kann.",
              "PDF-Analyse: Risiken, Pflichten, offene Fragen.",
            ].map((t) => (
              <li
                key={t}
                className="text-[14.5px] text-white/85 tracking-[0.012em] flex items-start gap-3"
              >
                <span className="t-mono text-[#5B647D] mt-1">tagro</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <TagroBriefing />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLIENT PANEL — clients shouldn't need to ask.
   ───────────────────────────────────────────────────────────── */
function ClientPanelSection() {
  return (
    <section className="surface-light py-28">
      <div className="shell">
        <div className="max-w-[62ch]">
          <p className="section-label text-fest-muted">Client Panel</p>
          <h2 className="t-headline mt-6 text-[clamp(34px,4.5vw,56px)] max-w-[20ch]">
            Clients shouldn&apos;t need to{" "}
            <span className="t-serif-italic text-fest-muted">ask for status</span>.
          </h2>
          <p className="t-body mt-6 text-fest-muted text-[17px]">
            Ein ruhiges Status-Zimmer pro Kunde. Letzter Bericht, offene
            Entscheidungen, Approvals, Proof — geteilt mit den richtigen
            Personen, ohne Tool-Onboarding.
          </p>
        </div>
        <div className="mt-14">
          <ClientPanelMock />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXECUTION — every contractor gets the right view.
   ───────────────────────────────────────────────────────────── */
function ExecutionSection() {
  return (
    <section className="surface-light py-28">
      <div className="shell grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
        <ExecutionPanelMock />
        <div>
          <p className="section-label text-fest-muted">Execution Panel</p>
          <h2 className="t-headline mt-6 text-[clamp(34px,4.5vw,56px)] max-w-[18ch]">
            Every contractor gets the{" "}
            <span className="t-serif-italic text-fest-muted">right view</span>.
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-fest-muted text-[17px]">
            Developer:innen sehen Code-Arbeit. Marketing sieht Kampagnen und
            Assets. Operations sieht Vendor- und Vertragsrisiken. Eine
            Projekt-Wahrheit, drei fokussierte Surfaces.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MARKETING — see what your team did, and what it brought.
   ───────────────────────────────────────────────────────────── */
function MarketingSection() {
  return (
    <section className="surface-paper py-28">
      <div className="shell grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
        <div>
          <p className="section-label text-fest-muted">Marketing Projects</p>
          <h2 className="t-headline mt-6 text-[clamp(34px,4.5vw,56px)] max-w-[18ch]">
            See what your marketing team did —{" "}
            <span className="t-serif-italic text-fest-muted">
              and what it brought
            </span>
            .
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-fest-muted text-[17px]">
            Budgets, Kampagnen, Leads, Assets, Approvals, Result. Festag macht
            Marketing-Arbeit so verständlich wie eine Engineering-Pipeline.
          </p>
        </div>
        <MarketingFlow />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTERNAL MODE — Festag inside the company.
   ───────────────────────────────────────────────────────────── */
function InternalModeSection() {
  return (
    <section className="surface-dark py-32">
      <div className="shell">
        <div className="max-w-[62ch]">
          <p className="section-label text-white/55">Internal Company Mode</p>
          <h2 className="t-headline mt-6 text-white text-[clamp(34px,4.5vw,56px)] max-w-[20ch]">
            Use Festag inside your company{" "}
            <span className="t-serif-italic text-white/70">
              without turning it into a wiki
            </span>
            .
          </h2>
          <p className="t-body mt-6 text-white/55 text-[17px]">
            Notion speichert Wissen. Festag steuert operative Wahrheit.
            Department-Cockpits, Company-Puls, interne Reports, klare
            Entscheidungs-Owner.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { l: "Engineering", v: "12 Decisions offen", t: "amber" },
            { l: "Marketing", v: "Pulse · grün", t: "green" },
            { l: "Operations", v: "1 Risiko · Vendor", t: "red" },
            { l: "Leadership", v: "Wochenbericht ready", t: "blue" },
          ].map((d) => (
            <div key={d.l} className="card card-dark">
              <p className="t-mono text-white/45">{d.l}</p>
              <p className="mt-6 text-[20px] font-medium tracking-[0.012em] text-white">
                {d.v}
              </p>
              <div className="mt-6 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background:
                      d.t === "green"
                        ? "#7A8C6E"
                        : d.t === "amber"
                          ? "#B0925F"
                          : d.t === "red"
                            ? "#A06868"
                            : "#5B647D",
                  }}
                />
                <span className="t-mono text-white/40">live</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   NOTES / PDFs / HANDOFFS — file → project action.
   ───────────────────────────────────────────────────────────── */
function NotesPdfSection() {
  const steps = [
    { l: "PDF uploaded", t: "input" },
    { l: "Tagro summary", t: "core" },
    { l: "Handoff", t: "core" },
    { l: "Notification", t: "core" },
    { l: "Task · Decision · Proof · Report", t: "output" },
  ];
  return (
    <section className="surface-light py-28">
      <div className="shell">
        <p className="section-label text-fest-muted">Notes · PDFs · Handoffs</p>
        <h2 className="t-headline mt-6 text-[clamp(34px,4.5vw,56px)] max-w-[18ch]">
          Turn files and notes into{" "}
          <span className="t-serif-italic text-fest-muted">project action</span>.
        </h2>

        <ol className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((s, i) => (
            <li key={s.l} className="card">
              <span className="t-mono text-fest-muted">
                {String(i + 1).padStart(2, "0")} · {s.t}
              </span>
              <p className="mt-6 text-[16px] font-medium tracking-[0.012em]">
                {s.l}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   INBOX — nothing important disappears.
   ───────────────────────────────────────────────────────────── */
function InboxSection() {
  return (
    <section className="surface-dark py-32">
      <div className="shell grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-16 items-center">
        <div>
          <p className="section-label text-white/55">Inbox</p>
          <h2 className="t-headline mt-6 text-white text-[clamp(34px,4.5vw,56px)] max-w-[20ch]">
            Nothing important should{" "}
            <span className="t-serif-italic text-white/70">disappear</span>.
          </h2>
          <p className="t-body mt-6 max-w-[52ch] text-white/55 text-[17px]">
            Approval-Wartezustände, Decision-Bedarf, PDF-Ergebnisse,
            Wochenberichte — ein ruhiger Eingang, der priorisiert statt
            schreit.
          </p>
        </div>
        <InboxMock />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
   ───────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="surface-light py-36">
      <div className="shell text-center">
        <p className="section-label justify-center inline-flex text-fest-muted">
          Festag
        </p>
        <h2 className="t-headline mt-8 text-[clamp(40px,6vw,84px)] max-w-[22ch] mx-auto">
          Make every project easier to{" "}
          <span className="t-serif-italic text-fest-muted">trust</span>.
        </h2>
        <p className="t-body mt-8 max-w-[58ch] mx-auto text-fest-muted text-[18px]">
          Festag turns work, decisions, proof and reports into one calm
          operating layer for teams, clients and leaders.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="btn btn-primary h-12 px-6 text-[14px]">
            Book demo
          </Link>
          <a
            href="https://festag.app/login"
            className="btn btn-ghost-light h-12 px-6 text-[14px]"
          >
            Open app <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
