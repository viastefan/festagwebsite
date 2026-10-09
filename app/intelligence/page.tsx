import type { Metadata } from "next";
import { Button } from "../_components/ui/Button";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { Stage } from "../_components/ui/Window";
import { LearningLoop } from "../_components/demos/LearningLoop";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  title: "Modelle & Intelligence",
  description:
    "Leqra, Tagro und Veyra: die Intelligenz hinter Festag. Operational Knowledge Model, Company Brain und Adaptive Intelligence — workspace-gebunden.",
};

const MODELS: {
  name: string;
  role: string;
  body: string;
  icon: IconName;
  facts: [string, string][];
  tag: string;
}[] = [
  {
    name: "Leqra",
    role: "Intelligence Core",
    body: "Die unsichtbare Engine. Modelliert Wissen, Prozesse, Entscheidungen und Abhängigkeiten — die eine operative Wahrheit, auf der jede Festag-Oberfläche aufbaut.",
    icon: "brain",
    tag: "Engine",
    facts: [
      ["Denkt", "Kontext, Prozesse, Entscheidungslogik"],
      ["Speichert", "Operational Knowledge Model"],
      ["Sichtbar für", "Niemanden direkt — nur über Festag"],
    ],
  },
  {
    name: "Tagro",
    role: "Operations Interpreter",
    body: "Liest Signale, versteht Bedeutung, erkennt Risiken und fehlende Entscheidungen. Antwortet mit Zusammenfassung, Kontext, Wirkung, Empfehlung und nächstem Schritt — immer mit Quelle.",
    icon: "sparkles",
    tag: "Team & Führung",
    facts: [
      ["Spricht mit", "Teams, PMs, Gründern, CEOs"],
      ["Liefert", "Briefings, Entscheidungen, Forecasts"],
      ["Delegiert an", "Cursor Cloud Agents (Beta)"],
    ],
  },
  {
    name: "Veyra",
    role: "Client Interpreter",
    body: "Übersetzt interne Komplexität in ruhige Kundensprache. Erstellt Status-Reports, Wochen-Briefings und Audio-Zusammenfassungen — editierbar und erst nach Freigabe sichtbar.",
    icon: "portal",
    tag: "Kunden",
    facts: [
      ["Spricht mit", "Kunden, Auftraggebern, Stakeholdern"],
      ["Liefert", "Client Updates, Reports, Audio-Briefings"],
      ["Regel", "Keine Technik, kein Hype, immer belegt"],
    ],
  },
];

const OKM: { icon: IconName; label: string }[] = [
  { icon: "people", label: "People Intelligence" },
  { icon: "decision", label: "Decision Intelligence" },
  { icon: "mail", label: "Communication Intelligence" },
  { icon: "folder", label: "Project Intelligence" },
  { icon: "flow", label: "Workflow Intelligence" },
  { icon: "cube", label: "Technical Intelligence" },
  { icon: "check", label: "Quality Intelligence" },
  { icon: "layers", label: "Process Intelligence" },
];

const PREDICT = [
  "Hohe Verzögerungswahrscheinlichkeit — die Design-Freigabe fehlt.",
  "Dieser Kunde erweitert den Scope häufig nach der ersten Lieferung.",
  "Diese Aufgabe braucht mehr Kontext vor der Umsetzung.",
  "Diese Architekturentscheidung widerspricht bisherigen Standards.",
];

const PIPELINE = [
  "Data",
  "Information",
  "Understanding",
  "Prediction",
  "Optimization",
];

const PRIVACY: [string, string, string][] = [
  ["Adaptive Intelligence", "An", "Workspace darf OKM und Operational DNA für Tagro nutzen"],
  ["Projektübergreifende Muster", "An", "Lieferungsmuster innerhalb des Workspaces lernen"],
  ["Persönliche Profile", "Aus", "Kunden- und Entwicklerprofile nur per Opt-in"],
  ["Predictive Hints", "An", "Vorausschauende Hinweise, wenn Adaptive Intelligence aktiv ist"],
];

const MODES = [
  { name: "Delivery", body: "Reports, Aktionen, Briefings. Leqra sagt, was wahr ist — Festag macht, was passiert.", icon: "portal" as IconName },
  { name: "Teams", body: "Prioritäten, Zuweisung, Live-Operations, Feedback-Loop. Ein KI-Operations-Manager für echte Teams.", icon: "people" as IconName },
  { name: "Agency", body: "Festag als Produkt, das andere verkaufen. Leqra bleibt die Engine, Marke und UI gehören euch.", icon: "layers" as IconName },
];

export default function IntelligencePage() {
  return (
    <>
      <PageHero
        eyebrow="Modelle & Intelligence"
        title={
          <>
            Software, die versteht, wie eure Organisation arbeitet.
          </>
        }
        lead="Festag ist ein selbstlernendes Operational-Intelligence-System. Drei spezialisierte Interpreter, ein gemeinsames Wissensmodell — und jede Interaktion macht es klüger."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Kostenlos starten
          </Button>
          <Button href="/enterprise#security" variant="soft" size="lg">
            Datenschutz & Kontrolle
          </Button>
        </div>
      </PageHero>

      {/* Models */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <RevealGroup className="grid-3">
            {MODELS.map((m) => (
              <RevealItem key={m.name} className="in-model">
                <div className="in-model-top">
                  <span className="in-model-icon">
                    <Icon name={m.icon} size={20} />
                  </span>
                  <span className="tag">{m.tag}</span>
                </div>
                <div className="in-model-name">
                  {m.name}
                </div>
                <div className="in-model-role">{m.role}</div>
                <p className="body" style={{ fontSize: 14.5, marginTop: 14 }}>
                  {m.body}
                </p>
                <dl className="in-model-facts">
                  {m.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="in-tagline">
            Leqra denkt. Festag handelt.
          </Reveal>
        </div>
      </section>

      {/* Pipeline */}
      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Kernprinzip"
            title="Nicht nur speichern. Verstehen, vorhersagen, verbessern."
          />
          <Reveal className="in-pipe">
            {PIPELINE.map((p, i) => (
              <div key={p} className="in-pipe-step" style={{ ["--i" as string]: i }}>
                <span>{p}</span>
                {i < PIPELINE.length - 1 ? <Icon name="arrow" size={16} /> : null}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* OKM */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <div className="in-okm">
            <Reveal>
              <span className="eyebrow">Operational Knowledge Model</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Ein Modell eurer Firma, das sich mit jeder Entscheidung weiterentwickelt.
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Das OKM ist das Fundament von Adaptive Intelligence: eine kontinuierlich wachsende Repräsentation
                davon, wie eure Organisation entscheidet, kommuniziert, liefert und Qualität definiert.
              </p>
            </Reveal>
            <RevealGroup className="in-okm-grid">
              {OKM.map((o) => (
                <RevealItem key={o.label} className="in-okm-item">
                  <Icon name={o.icon} size={16} />
                  {o.label}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Learning loop */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Company Brain"
            title="Neue Mitarbeitende starten nicht bei null. Sie erben die Intelligenz der Organisation."
          />
          <Reveal>
            <Stage pad>
              <div className="in-loop">
                <LearningLoop />
              </div>
            </Stage>
          </Reveal>
        </div>
      </section>

      {/* Predictive */}
      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Predictive Intelligence"
            title="Von reaktiv zu vorausschauend."
            lead="Festag erkennt Verzögerungen, Scope-Erweiterungen, Ressourcenkonflikte und Qualitätsprobleme, bevor sie teuer werden."
          />
          <RevealGroup className="grid-2">
            {PREDICT.map((p) => (
              <RevealItem key={p} className="in-predict">
                <Icon name="sparkles" size={16} />
                {p}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Modes */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead eyebrow="Ein System, drei Oberflächen" title="Eine Intelligenz. Drei Workspace-Modi." />
          <RevealGroup className="grid-3">
            {MODES.map((m) => (
              <RevealItem key={m.name} className="card">
                <span className="card-icon">
                  <Icon name={m.icon} />
                </span>
                <h3 className="h4">{m.name}</h3>
                <p className="body" style={{ fontSize: 14.5 }}>
                  {m.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Privacy */}
      <section className="section section--flush-top" id="privacy">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Collaboration Intelligence, nicht Überwachung"
            title="Ihr entscheidet, was Festag lernen darf."
            lead="Operational DNA bleibt in eurem Workspace. Festag trainiert keine öffentlichen Modelle auf euren Daten. Gespeichert werden aggregierte Muster — keine Freitexte, Namen oder E-Mails."
          />
          <Reveal className="in-privacy">
            <div className="in-privacy-row in-privacy-head">
              <span>Einstellung</span>
              <span>Standard</span>
              <span>Bedeutung</span>
            </div>
            {PRIVACY.map(([k, d, v]) => (
              <div key={k} className="in-privacy-row">
                <span>{k}</span>
                <span>
                  <span className={`tag ${d === "An" ? "tag--ok" : "tag--outline"}`}>{d}</span>
                </span>
                <span>{v}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand title="Klüger mit jedem Projekt." />

      <style>{`
        .in-model {
          display: flex; flex-direction: column; padding: 26px; border-radius: var(--r-lg);
          background: var(--surface); border: var(--hair) solid var(--line); box-shadow: var(--sh-xs);
        }
        .in-model-top { display: flex; align-items: center; justify-content: space-between; }
        .in-model-icon { width: 44px; height: 44px; border-radius: 8px; background: var(--ink); color: #fff; display: grid; place-items: center; }
        .in-model-name { margin-top: 26px; font-size: 40px; line-height: 1; color: var(--ink); }
        .in-model-role { margin-top: 8px; font-size: 14px; color: var(--accent); }
        .in-model-facts { margin: 20px 0 0; padding-top: 16px; border-top: var(--hair) solid var(--line); display: grid; gap: 10px; margin-top: auto; }
        .in-model .body { margin-bottom: 20px; }
        .in-model-facts div { display: grid; grid-template-columns: 96px 1fr; gap: 10px; font-size: 13.5px; }
        .in-model-facts dt { color: var(--faint); }
        .in-model-facts dd { margin: 0; color: var(--ink-2); }
        .in-tagline { margin-top: 40px; text-align: center; font-size: clamp(24px, 3vw, 36px); color: var(--ink); }
        .in-pipe { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
        .in-pipe-step { display: flex; align-items: center; gap: 10px; }
        .in-pipe-step span {
          padding: 14px 22px; border-radius: 999px; font-size: 17px; background: var(--surface); border: var(--hair) solid var(--line);
          color: var(--ink); box-shadow: var(--sh-xs);
        }
        .in-pipe-step:last-child span { background: var(--accent); border-color: var(--accent); color: #fff; }
        .in-pipe-step svg { color: var(--faint); }
        .in-okm { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
        .in-okm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .in-okm-item { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-radius: 8px; background: var(--surface); border: var(--hair) solid var(--line); font-size: 14.5px; color: var(--ink); }
        .in-okm-item svg { color: var(--accent); }
        .in-loop { background: rgba(255,255,255,0.78); backdrop-filter: blur(8px); border-radius: 10px; padding: clamp(18px, 3vw, 36px); border: var(--hair) solid var(--line); }
        .in-predict { display: grid; grid-template-columns: 18px 1fr; gap: 14px; padding: 22px; border-radius: 10px; background: var(--surface-2); font-size: 19px; line-height: 1.4; color: var(--ink); }
        .in-predict svg { color: var(--accent); margin-top: 5px; }
        .in-privacy { border-radius: 10px; border: var(--hair) solid var(--line); background: var(--surface); overflow: hidden; }
        .in-privacy-row { display: grid; grid-template-columns: 1.2fr 0.5fr 2fr; gap: 16px; padding: 16px 20px; border-top: var(--hair) solid var(--line); align-items: center; font-size: 14.5px; color: var(--muted); }
        .in-privacy-row span:first-child { color: var(--ink); }
        .in-privacy-head { border-top: 0; background: var(--surface-2); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; }
        .in-privacy-head span:first-child { color: var(--faint); }
        @media (max-width: 960px) { .in-okm { grid-template-columns: 1fr; } }
        @media (max-width: 640px) {
          .in-privacy-row { grid-template-columns: 1fr auto; }
          .in-privacy-row span:nth-child(3) { grid-column: 1 / -1; }
          .in-privacy-head span:nth-child(3) { display: none; }
          .in-okm-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
