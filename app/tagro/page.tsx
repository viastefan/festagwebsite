import type { Metadata } from "next";
import { Button } from "../_components/ui/Button";
import { Icon } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { Stage } from "../_components/ui/Window";
import { TagroConsole } from "../_components/demos/TagroConsole";
import { FeatureBlock } from "../_components/site/Blocks";
import { DecisionDemo } from "../_components/demos/DecisionDemo";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  title: "Tagro",
  description:
    "Tagro ist Festags Operations Interpreter — kein Chatbot. Antworten mit Kontext, Empfehlung, nächstem Schritt und Quelle.",
};

const STRUCTURE = [
  { n: "01", label: "Zusammenfassung", body: "Ein Satz, der die Frage beantwortet. Keine Einleitung." },
  { n: "02", label: "Kontext", body: "Was passiert ist — aus Signalen, nicht aus Vermutung." },
  { n: "03", label: "Organisatorische Wirkung", body: "Was es für Termin, Scope, Kunde und Team bedeutet." },
  { n: "04", label: "Empfehlung", body: "Eine Option, begründet. Alternativen mit Auswirkung." },
  { n: "05", label: "Nächster Schritt", body: "Was jetzt passieren muss — und wer es tut." },
];

const QUESTIONS = [
  "Was ist passiert?",
  "Ist es relevant?",
  "Was bedeutet es?",
  "Wer muss es wissen?",
  "Was sollte als Nächstes passieren?",
  "Wie erklärt man es?",
];

const VS: [string, string][] = [
  ["Antwortet auf alles, was man fragt", "Antwortet nur mit Quelle — oder sagt, dass es keine gibt"],
  ["Startet jedes Gespräch bei null", "Kennt eure Projekte, Entscheidungen und Operational DNA"],
  ["Schreibt lange, vorsichtige Texte", "Kurz, präzise, mit Empfehlung und nächstem Schritt"],
  ["Wartet darauf, gefragt zu werden", "Erkennt Risiken und fehlende Entscheidungen selbst"],
  ["Sendet, was es generiert", "Nichts erreicht Kunden ohne eure Freigabe"],
  ["Spricht für alle gleich", "Passt Ton und Tiefe an CEO, Kunde oder Entwickler an"],
];

export default function TagroPage() {
  return (
    <>
      <PageHero
        eyebrow="Tagro · Operations Interpreter"
        title={
          <>
            Wie ein Kollege, der seit Jahren bei euch <span className="serif accent">arbeitet.</span>
          </>
        }
        lead="Tagro liest Signale aus GitHub, Linear, Jira und Slack, versteht, was sie bedeuten, und übersetzt sie in ruhige, entscheidungsreife Sprache. Kein Chatbot, den man fragt — ein Interpreter, der mitdenkt."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Tagro ausprobieren
          </Button>
          <Button href="#demo" variant="soft" size="lg">
            Live-Demo unten
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top" id="demo">
        <div className="wrap wrap--wide">
          <Reveal>
            <Stage pad caption="Tippe selbst — Beispiel-Workspace">
              <div className="tg-console-wrap">
                <TagroConsole />
              </div>
            </Stage>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Antwortstruktur"
            title="Jede Antwort hat dieselbe Form. Damit man ihr vertrauen kann."
          />
          <RevealGroup className="tg-structure">
            {STRUCTURE.map((s) => (
              <RevealItem key={s.n} className="tg-struct">
                <span className="tg-struct-n">{s.n}</span>
                <span className="h4">{s.label}</span>
                <span className="small">{s.body}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <div className="tg-questions">
            <Reveal>
              <span className="eyebrow">Für jedes Signal</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Sechs Fragen, bevor irgendetwas beim Kunden landet.
              </h2>
            </Reveal>
            <RevealGroup className="tg-q-list">
              {QUESTIONS.map((q, i) => (
                <RevealItem key={q} className="tg-q">
                  <span className="tg-q-n">{i + 1}</span>
                  <span className="serif">{q}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <FeatureBlock
            title="Decision Mode."
            sub="Tagro beantwortet Entscheidungsfragen mit Optionen, Risiko-Delta und Empfehlung — und schreibt die getroffene Entscheidung mit Begründung ins Projekt."
          >
            <DecisionDemo />
          </FeatureBlock>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Tagro ist kein Chatbot." lead="Der Unterschied liegt nicht im Modell, sondern im Kontext und in der Verantwortung." />
          <Reveal className="tg-vs">
            <div className="tg-vs-head">
              <span>Generischer KI-Assistent</span>
              <span>
                <Icon name="sparkles" size={14} /> Tagro
              </span>
            </div>
            {VS.map(([a, b]) => (
              <div key={a} className="tg-vs-row">
                <span>{a}</span>
                <span>
                  <Icon name="check" size={14} />
                  {b}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal className="tg-cursor">
            <span className="tg-cursor-icon">
              <Icon name="cursor" size={22} />
            </span>
            <div>
              <span className="tag tag--warn">Beta</span>
              <h3 className="h3" style={{ marginTop: 12 }}>
                Tagro delegiert an Cursor Cloud Agents.
              </h3>
              <p className="body" style={{ marginTop: 10 }}>
                Klar umrissene Dev-Tasks können aus Tagro an einen Cursor Cloud Agent übergeben werden. Der Pull
                Request kommt als Signal zurück ins Projekt — nie ohne Freigabe, nie ohne Review.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Frag Tagro, was in euren Projekten wirklich läuft." />

      <style>{`
        .tg-console-wrap { max-width: 920px; margin: 0 auto; }
        .tg-structure { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
        .tg-struct { display: grid; gap: 8px; align-content: start; padding: 22px 20px; border-radius: 10px; background: var(--surface); border: var(--hair) solid var(--line); }
        .tg-struct-n { font-size: 12px; color: var(--burgundy); letter-spacing: 0.08em; }
        .tg-questions { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
        .tg-q-list { display: grid; gap: 8px; }
        .tg-q { display: flex; align-items: center; gap: 16px; padding: 14px 18px; border-radius: 8px; background: var(--surface-2); font-size: 20px; color: var(--ink); }
        .tg-q-n { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; background: #fff; font-size: 12px; color: var(--burgundy); flex-shrink: 0; }
        .tg-vs { border-radius: 10px; overflow: hidden; border: var(--hair) solid var(--line); background: var(--surface); }
        .tg-vs-head, .tg-vs-row { display: grid; grid-template-columns: 1fr 1fr; }
        .tg-vs-head span { padding: 14px 20px; font-size: 13px; color: var(--faint); background: var(--surface-2); display: flex; align-items: center; gap: 8px; }
        .tg-vs-head span:last-child { color: var(--burgundy); background: var(--burgundy-tint); }
        .tg-vs-row span { padding: 16px 20px; border-top: var(--hair) solid var(--line); font-size: 15px; color: var(--muted); display: flex; gap: 10px; align-items: flex-start; }
        .tg-vs-row span:last-child { color: var(--ink); background: rgba(247,234,238,0.35); }
        .tg-vs-row span:last-child svg { color: var(--burgundy); margin-top: 3px; flex-shrink: 0; }
        .tg-cursor { display: grid; grid-template-columns: 64px 1fr; gap: 24px; align-items: start; padding: clamp(24px, 4vw, 44px); border-radius: var(--r-xl); background: var(--surface-2); }
        .tg-cursor-icon { width: 64px; height: 64px; border-radius: 10px; background: var(--ink); color: #fff; display: grid; place-items: center; }
        @media (max-width: 1100px) { .tg-structure { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
        @media (max-width: 860px) { .tg-questions { grid-template-columns: 1fr; } }
        @media (max-width: 640px) {
          .tg-structure { grid-template-columns: 1fr; }
          .tg-vs-head, .tg-vs-row { grid-template-columns: 1fr; }
          .tg-vs-head span:first-child, .tg-vs-row span:first-child { display: none; }
          .tg-cursor { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
