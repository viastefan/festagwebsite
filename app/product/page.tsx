import Link from "next/link";
import type { Metadata } from "next";
import { DecisionInbox } from "../_components/visuals/DecisionInbox";
import { ProofGridDemo } from "../_components/visuals/ProofGridDemo";
import { TagroBriefing } from "../_components/visuals/TagroBriefing";
import { ClientPanelMock } from "../_components/visuals/ClientPanelMock";
import { ExecutionPanelMock } from "../_components/visuals/ExecutionPanelMock";
import { InboxMock } from "../_components/visuals/InboxMock";
import { MarketingFlow } from "../_components/visuals/MarketingFlow";
import { SignalRouter } from "../_components/visuals/SignalRouter";

export const metadata: Metadata = {
  title: "Product — Festag",
  description:
    "Festag's product system: Projects, Decisions, ProofGrid, Nexora, Tagro, Reports, Client Panel, Execution Panel, Inbox.",
};

type Module = {
  id: string;
  kicker: string;
  title: string;
  italic?: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
  reverse?: boolean;
  surface?: "light" | "dark" | "paper";
};

const MODULES: Module[] = [
  {
    id: "signals",
    kicker: "System",
    title: "Every project signal",
    italic: "routed",
    body: "Festag nimmt Signale aus Tools, Calls, PDFs, Code, Kampagnen und Files — und routet sie in eine Kontrollschicht aus Decisions, ProofGrid, Nexora und Tagro. Aus dieser Schicht entstehen Reports, Briefings und Tasks für die richtige Rolle.",
    bullets: [
      "Inputs: PDF, Slack, Code, Campaign-Result, Decision-Request, Voice",
      "Core: Tagro · ProofGrid · Nexora · Decision Layer",
      "Outputs: Client Report, Decision Inbox, Execution Task, Proof",
    ],
    visual: <SignalRouter />,
    surface: "dark",
  },
  {
    id: "decisions",
    kicker: "Decisions",
    title: "The choices that",
    italic: "unlock work",
    body: "Decisions sind in Festag erstklassige Objekte. Sie haben Owner, Optionen, Risiko, Quelle, History — und einen Lock-Punkt auf Milestones, damit nichts heimlich re-opened wird.",
    bullets: [
      "Decision-Inbox pro Projekt und pro Owner",
      "Optionen mit Konsequenzen, nicht nur Ja/Nein",
      "Audit-Trail für Reports und Kunden",
      "Decision-Lock auf Milestones",
    ],
    visual: <DecisionInbox />,
  },
  {
    id: "proofgrid",
    kicker: "ProofGrid",
    title: "Evidence over",
    italic: "opinions",
    body: "ProofGrid weist jeder Phase und jedem Artefakt einen Proof-Zustand zu — manuell, verlinkt, approved, verifiziert. Reports zitieren Evidence statt sie zu beschreiben.",
    bullets: [
      "Vier Proof-Strengths mit klarer Semantik",
      "Quellen-Bindung pro Zelle",
      "Aggregation pro Phase, Projekt, Client",
      "Verifizierung steuert Status-Reports",
    ],
    visual: <ProofGridDemo />,
    reverse: true,
  },
  {
    id: "tagro",
    kicker: "Tagro",
    title: "Tagro explains",
    italic: "what matters",
    body: "Tagro komprimiert verteilte Signale zu einer Status-Wahrheit, die Menschen verstehen. Briefings, Decision-Summaries, Report-Drafts, PDF-Analysen, Audio-Statusberichte — immer mit Quelle, immer mit Transkript.",
    bullets: [
      "Briefing aus n Signalen — in wenigen Zeilen",
      "Decision-Summary mit Quelle",
      "Report-Draft, client-ready",
      "Audio nur mit Text-Transkript",
    ],
    visual: <TagroBriefing />,
    surface: "dark",
  },
  {
    id: "client-panel",
    kicker: "Client Panel",
    title: "Clients shouldn't need to",
    italic: "ask for status",
    body: "Ein ruhiges Status-Zimmer pro Kunde. Letzter Bericht, offene Entscheidungen, Approvals, Proof — geteilt mit den richtigen Personen, ohne Tool-Onboarding.",
    bullets: [
      "Notion-artiger Notizblock, kein Cockpit-Lärm",
      "Statusabfrage per Klick — Tagro schreibt",
      "Audio-Briefing mit Pflicht-Transkript",
      "Approvals und Decisions im selben Raum",
    ],
    visual: <ClientPanelMock />,
    reverse: true,
  },
  {
    id: "execution-panel",
    kicker: "Execution Panel",
    title: "Every contractor gets",
    italic: "the right view",
    body: "Eine Projekt-Wahrheit, drei fokussierte Surfaces: Dev sieht Code-Arbeit, Marketing sieht Kampagnen, Operations sieht Vendor-Risiken. Mit Tagro-Verification auf Status-Übergänge.",
    bullets: [
      "Rollen-spezifische Surfaces auf einer Datenwahrheit",
      "Status-Stufen mit Tagro-Verification",
      "Dev darf nicht auf verified/approved/completed",
      "Finish-Flow erzwingt Proof-Bindung",
    ],
    visual: <ExecutionPanelMock />,
  },
  {
    id: "marketing",
    kicker: "Marketing Projects",
    title: "Marketing made",
    italic: "as clear as engineering",
    body: "Budget-Flow → Kampagne → Leads → Approval → Result. Tagro erklärt, wo das Geld hingeflossen ist und was es gebracht hat — auf Kundenniveau verständlich.",
    bullets: [
      "Budget, Spend, ROAS in einer Wahrheit",
      "Asset-Review mit ProofGrid-Bindung",
      "Tagro-Briefing pro Kampagne",
      "Result-Report für Founder oder Client",
    ],
    visual: <MarketingFlow />,
    surface: "paper",
    reverse: true,
  },
  {
    id: "inbox",
    kicker: "Inbox",
    title: "Nothing important",
    italic: "disappears",
    body: "Approval-Wartezustände, Decision-Bedarf, PDF-Ergebnisse, Wochenberichte — ein ruhiger Eingang, der priorisiert statt schreit.",
    bullets: [
      "Decision · Approval · Report · PDF · Risk",
      "Priorität durch System, nicht durch Lautstärke",
      "Direkter Sprung in den Decision-Kontext",
    ],
    visual: <InboxMock />,
    surface: "dark",
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="surface-dark relative overflow-hidden pt-[120px] pb-24 grain">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full opacity-[0.18] pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
          }}
        />
        <div className="shell relative">
          <p className="section-label text-white/55">Product</p>
          <h1 className="t-headline mt-8 text-white text-[clamp(44px,7.4vw,108px)] max-w-[18ch]">
            One system for{" "}
            <span className="t-serif-italic text-white/85">
              work, proof, decisions and reports
            </span>
            .
          </h1>
          <p className="t-body mt-10 max-w-[60ch] text-white/55 text-[clamp(16px,1.4vw,19px)]">
            Festag besteht aus einem Datenkern und mehreren ausgerichteten
            Sichten. Tagro erklärt, ProofGrid beweist, Nexora prüft Risiko,
            Decisions setzen den Takt — Reports, Inbox und Panels machen das
            Ergebnis sichtbar.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-primary h-12 px-6">
              Book demo
            </Link>
            <Link href="/pricing" className="btn btn-ghost-dark h-12 px-6">
              Pricing
            </Link>
          </div>

          {/* Anchor nav */}
          <nav
            aria-label="Product module navigation"
            className="mt-16 flex flex-wrap gap-2 max-w-[860px]"
          >
            {MODULES.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="text-[12px] tracking-[0.16em] uppercase text-white/45 hover:text-white border border-white/[0.08] hover:border-white/30 rounded-full px-3 py-1.5 transition-colors"
              >
                {m.kicker}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {MODULES.map((m) => (
        <ModuleSection key={m.id} m={m} />
      ))}

      {/* Final CTA */}
      <section className="surface-light py-32">
        <div className="shell text-center">
          <p className="section-label justify-center inline-flex text-fest-muted">
            Festag · Product
          </p>
          <h2 className="t-headline mt-8 text-[clamp(36px,5.5vw,80px)] max-w-[22ch] mx-auto">
            One control layer.{" "}
            <span className="t-serif-italic text-fest-muted">
              Many calm surfaces.
            </span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-primary h-12 px-6">
              Talk to us
            </Link>
            <Link href="/careers" className="btn btn-ghost-light h-12 px-6">
              Help build it →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ModuleSection({ m }: { m: Module }) {
  const surfaceClass =
    m.surface === "dark"
      ? "surface-dark"
      : m.surface === "paper"
        ? "surface-paper"
        : "surface-light";
  const isDark = m.surface === "dark";
  return (
    <section id={m.id} className={`${surfaceClass} py-28`}>
      <div
        className={`shell grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center ${
          m.reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div>
          <p
            className={`section-label ${isDark ? "text-white/55" : "text-fest-muted"}`}
          >
            {m.kicker}
          </p>
          <h2
            className={`t-headline mt-6 text-[clamp(32px,4.5vw,56px)] max-w-[20ch] ${
              isDark ? "text-white" : ""
            }`}
          >
            {m.title}
            {m.italic && (
              <>
                {" "}
                <span
                  className={`t-serif-italic ${
                    isDark ? "text-white/70" : "text-fest-muted"
                  }`}
                >
                  {m.italic}
                </span>
              </>
            )}
            .
          </h2>
          <p
            className={`t-body mt-6 max-w-[52ch] text-[16.5px] ${
              isDark ? "text-white/55" : "text-fest-muted"
            }`}
          >
            {m.body}
          </p>
          <ul className="mt-8 grid gap-3 max-w-[48ch]">
            {m.bullets.map((b) => (
              <li
                key={b}
                className={`flex items-start gap-3 text-[14.5px] tracking-[0.012em] ${
                  isDark ? "text-white/85" : "text-fest-text"
                }`}
              >
                <span className="t-mono text-fest-primary mt-1 shrink-0">
                  {m.kicker.toLowerCase()}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>{m.visual}</div>
      </div>
    </section>
  );
}
