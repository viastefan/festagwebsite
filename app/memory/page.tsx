import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "../_components/ui/Button";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { MediaBand } from "../_components/ui/Media";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { MEMORY_PAGES, MemoryNav, MemoryStyles } from "./shared";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  alternates: { canonical: "/memory" },
  title: "Build Memory — das Gedächtnis eurer KI-Arbeit",
  description:
    "Prompts aus Claude Code, Codex und Cursor werden zu Kapiteln: Absicht, Entscheidung, Ergebnis, Lieferung. Festag rechnet KI-Arbeit gegen das, was davon live gegangen ist.",
};

const PILLARS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "clock",
    title: "Jeder Prompt bleibt",
    body:
      "Was ein Entwickler in Claude Code, Codex oder Cursor eingibt, ist eine Entscheidung über die Software. Build Memory nimmt sie auf — mit Modell, Tokens, berührten Dateien und Zeitpunkt.",
  },
  {
    icon: "layers",
    title: "Kapitel statt Scrollback",
    body:
      "Zusammenhängende Prompts werden zu einem Container: ein Titel, drei Sätze Kurzfassung, ein Verlauf. Lesbar auch ein halbes Jahr später, von jemandem, der nicht dabei war.",
  },
  {
    icon: "decision",
    title: "An die Entscheidung gebunden",
    body:
      "Kapitel hängen an dem, was sie ausgelöst haben: Entscheidungen, Aufgaben, Lieferungen. Die Frage „warum ist das so gebaut“ hat wieder eine Antwort mit Beleg.",
  },
  {
    icon: "chart",
    title: "Tokens gegen Lieferung",
    body:
      "Festag holt die Deployments von Vercel und rechnet jedem Kapitel die Lieferung zu, die darauf folgte. Daraus entsteht die Zahl, die bisher niemand hat: Tokens pro Lieferung.",
  },
];

const FLOW: { step: string; title: string; body: string }[] = [
  {
    step: "01",
    title: "Verbinden",
    body: "Ein Ingest-Key pro Werkzeug, ein Hook im Terminal. Kein Plugin-Zoo, keine IDE-Pflicht.",
  },
  {
    step: "02",
    title: "Aufnehmen",
    body: "Prompt, Antwortlänge, Modell, Tokens, Dateien, Branch. Secrets werden vor dem Speichern entfernt.",
  },
  {
    step: "03",
    title: "Ordnen",
    body: "Pausen und Branch-Wechsel schneiden den Verlauf in Kapitel. Jedes bekommt Absicht und Ausgang.",
  },
  {
    step: "04",
    title: "Verstehen",
    body: "Veyra fasst das Kapitel zusammen. Die Lieferung aus Vercel sagt, was daraus wurde.",
  },
];

const QUESTIONS = [
  "Warum haben wir uns damals gegen diesen Ansatz entschieden?",
  "Welche Prompts haben zu dieser Lieferung geführt?",
  "Was hat dieses Feature an KI-Arbeit tatsächlich gekostet?",
  "Welcher Teil unserer Token-Ausgaben ging nie live?",
];

export default function MemoryPage() {
  return (
    <>
      <MemoryStyles />
      <PageHero
        title={<>Die Arbeit vor der Lieferung hat bisher niemand aufgeschrieben.</>}
        lead="Build Memory ist das Gedächtnis eurer KI-gestützten Entwicklung: Prompts werden zu Kapiteln, Kapitel zu Entscheidungen, Entscheidungen zu einer Zahl, die man einem Kunden zeigen kann."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Kostenlos starten
          </Button>
          <Button href="/memory/connect" variant="soft" size="lg">
            Werkzeug verbinden
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <MediaBand tone="light" src="/media/waves-dark.jpg" alt="Signale als Wellen" pos="center 70%" ratio="21 / 9" caption="Gedächtnis, nicht Überwachung." chips={["Kapitel", "Prompts", "Token-Ökonomie"]} priority />
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <MemoryNav current="/memory" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <RevealGroup className="grid-2">
            {PILLARS.map((p) => (
              <RevealItem key={p.title} className="card mem-card-full">
                <span className="card-icon">
                  <Icon name={p.icon} />
                </span>
                <h2 className="h4">{p.title}</h2>
                <p className="body">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            title="Vom Terminal zum Kapitel."
            lead="Vier Schritte, danach läuft es im Hintergrund — Build Memory verlangt keine Disziplin, die im Alltag nicht da ist."
          />
          <RevealGroup className="mem-flow">
            {FLOW.map((f) => (
              <RevealItem key={f.step} className="mem-flow-step">
                <span className="mem-step-no">{f.step}</span>
                <h3 className="h4">{f.title}</h3>
                <p className="body" style={{ fontSize: "calc(14.5px * var(--fs, 1))" }}>{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead
            title="Fragen, die heute niemand beantworten kann."
            lead="Nicht, weil sie schwer wären — sondern weil die Antwort im Terminal von vorletzter Woche steht."
          />
          <RevealGroup className="grid-2">
            {QUESTIONS.map((q) => (
              <RevealItem key={q} className="mem-question">
                <Icon name="search" size={16} />
                {q}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead title="Das Thema im Detail." />
          <RevealGroup className="grid-3">
            {MEMORY_PAGES.filter((p) => p.href !== "/memory").map((p) => (
              <RevealItem key={p.href}>
                <Link href={p.href} className="card card--link" style={{ display: "block", height: "100%" }}>
                  <span className="card-icon">
                    <Icon name={p.icon} />
                  </span>
                  <h3 className="h4">{p.label}</h3>
                  <p className="body">{p.body}</p>
                  <Icon name="arrowUpRight" size={16} className="card-arrow" />
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <Reveal className="mem-privacy">
            <h2 className="h3">Gedächtnis, nicht Überwachung.</h2>
            <p className="body">
              Build Memory gehört dem Workspace, nicht dem Markt. Secrets werden vor dem Speichern
              entfernt, Prompt-Texte bleiben beim Autor und seinem Workspace, und ein Key lässt sich
              jederzeit widerrufen. Festag trainiert keine öffentlichen Modelle auf eurer Arbeit.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Wissen, was eure KI-Arbeit gebracht hat."
        lead="Werkzeug verbinden, eine Woche arbeiten, dann die erste Rechnung sehen: Tokens, Kapitel, Lieferungen."
      />
    </>
  );
}
