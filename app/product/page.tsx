import type { Metadata } from "next";
import { Button } from "../_components/ui/Button";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { Stage } from "../_components/ui/Window";
import { FeatureBlock, IconCard } from "../_components/site/Blocks";
import { TranslateDemo } from "../_components/demos/TranslateDemo";
import { DecisionDemo } from "../_components/demos/DecisionDemo";
import { ExecutiveDemo } from "../_components/demos/ExecutiveDemo";
import { SignalFlow } from "../_components/demos/SignalFlow";
import { HeroStage } from "../_components/demos/HeroStage";
import { links } from "@/lib/site/links";
import { principles } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Produkt",
  description:
    "Client Panel, Execution Panel, Entscheidungen und Executive Overview — Festag macht aus Arbeitssignalen client-ready Klarheit.",
};

const LOGIC: { icon: IconName; label: string; body: string }[] = [
  { icon: "signal", label: "Work Signal", body: "PR gemerged, Ticket blockiert, Thread mit Risiko, Freigabe per Mail." },
  { icon: "sparkles", label: "Bedeutung", body: "Fortschritt, Blocker, Risiko, Entscheidung, Scope-Änderung — oder Rauschen." },
  { icon: "bolt", label: "Aktion", body: "Entscheidung vorbereiten, Risiko markieren, Next Step vorschlagen." },
  { icon: "portal", label: "Kunden-Übersetzung", body: "Ruhige Sprache, mit Beleg, nach eurer Freigabe im Client Panel." },
];

const EXECUTION: { icon: IconName; title: string; body: string }[] = [
  { icon: "check", title: "Update senden", body: "Status-Note, Voice-Note oder Screenshot — Tagro macht daraus das Update." },
  { icon: "risk", title: "Blocker melden", body: "Mit einem Klick. Tagro prüft Abhängigkeiten und Auswirkung auf den Termin." },
  { icon: "decision", title: "Entscheidung anfragen", body: "Mit Kontext und Optionen — der Kunde entscheidet im Portal." },
  { icon: "github", title: "PR & Design verknüpfen", body: "GitHub-PRs und Figma-Frames als Beleg direkt an Aufgaben." },
  { icon: "doc", title: "Lieferobjekt hochladen", body: "Dateien, Nachweise, Rechnungen — als Evidence im Projekt." },
  { icon: "people", title: "Freigabe anfragen", body: "Abnahmen laufen über das Portal, nicht über E-Mail-Ketten." },
];

const WHITE_LABEL = [
  { name: "Co-branded", body: "„Powered by Festag“ sichtbar. Ideal für den Start.", plan: "Team" },
  { name: "Subtle-branded", body: "Eure Marke vorne, Tagro als Briefing-Engine sichtbar.", plan: "Organization" },
  { name: "Full White-Label", body: "Kein Festag-Branding für Kunden. Eigene Domain.", plan: "Enterprise" },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Produkt"
        title={
          <>
            Nicht noch ein Workspace. Eine <span className="serif accent">Delivery-Intelligence</span>-Schicht.
          </>
        }
        lead="Festag ersetzt keine Tools. Es sitzt über ihnen und macht aus verstreuter Arbeit verständlichen Projektstand — für Kunden, Gründer und Führung."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Kostenlos starten
          </Button>
          <Button href="/contact" variant="soft" size="lg">
            Demo anfragen
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <Stage caption="Ein Workspace · drei Ansichten">
              <HeroStage />
            </Stage>
          </Reveal>
        </div>
      </section>

      {/* Core logic */}
      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Kernlogik"
            title="Alles wird zuerst ein Signal — bevor es Report, Risiko oder Entscheidung wird."
          />
          <RevealGroup className="grid-4 pl-logic">
            {LOGIC.map((l, i) => (
              <RevealItem key={l.label} className="card pl-step">
                <span className="pl-num">0{i + 1}</span>
                <span className="card-icon">
                  <Icon name={l.icon} />
                </span>
                <h3 className="h4">{l.label}</h3>
                <p className="body" style={{ fontSize: 14.5 }}>
                  {l.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <FeatureBlock
            id="client"
            title="Client Panel."
            sub="Kunden sehen Status, Fortschritt, Phase, Risiken, offene Entscheidungen und nächste Schritte — übersetzt, belegt, ohne Slack-Chaos oder Jira-Rauschen."
          >
            <TranslateDemo />
          </FeatureBlock>
          <FeatureBlock
            id="decisions"
            flip
            title="Entscheidungen & Freigaben."
            sub="Tagro erkennt fehlende Entscheidungen, stellt Optionen mit Auswirkung gegenüber und dokumentiert das Ergebnis mit Begründung."
          >
            <DecisionDemo />
          </FeatureBlock>
          <FeatureBlock
            id="executive"
            title="Executive Overview."
            sub="Portfolio-Health für Gründer und CEOs: was läuft, was blockiert, wo entschieden werden muss — und was sich voraussichtlich verschiebt."
          >
            <ExecutiveDemo />
          </FeatureBlock>
          <FeatureBlock
            flip
            title="Activity Intelligence."
            sub="Arbeitssignale, Issues und Ereignisse aus allen Connectors auf einer Seite — klassifiziert und mit Belegen verknüpft."
          >
            <SignalFlow />
          </FeatureBlock>
        </div>
      </section>

      {/* Execution panel */}
      <section className="section" id="execution">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Execution Panel"
            title="Für die, die liefern: weniger Status-Arbeit, nicht mehr."
            lead="Entwickler, Designer, Marketer, Freelancer, PMs. Die Oberfläche passt sich der Projektart an — Software, Design & Marketing oder allgemeine Projekte. Die Intelligenz bleibt dieselbe."
          />
          <RevealGroup className="grid-3">
            {EXECUTION.map((e) => (
              <RevealItem key={e.title}>
                <IconCard icon={e.icon} title={e.title} body={e.body} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* White label */}
      <section className="section section--flush-top" id="white-label">
        <div className="wrap wrap--wide">
          <div className="pl-wl">
            <Reveal>
              <span className="eyebrow">White-Label</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Eure Marke vorne. <span className="serif">Festag-Intelligenz</span> darunter.
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Agenturen, Studios und Beratungen geben Kunden ein eigenes Projektportal. Festag verkauft keine KI —
                sondern Vertrauen, weniger Status-Arbeit und mehr Marge.
              </p>
            </Reveal>
            <RevealGroup className="pl-wl-list">
              {WHITE_LABEL.map((w, i) => (
                <RevealItem key={w.name} className="pl-wl-item">
                  <span className="pl-wl-level" aria-hidden>
                    {Array.from({ length: 3 }).map((_, k) => (
                      <i key={k} className={k <= i ? "is-on" : undefined} />
                    ))}
                  </span>
                  <span>
                    <span className="h4" style={{ display: "block" }}>
                      {w.name}
                    </span>
                    <span className="small">{w.body}</span>
                  </span>
                  <span className="tag tag--outline">ab {w.plan}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead eyebrow="Prinzipien" title="Wonach wir jede Funktion beurteilen." />
          <RevealGroup className="grid-3">
            {principles.map((p) => (
              <RevealItem key={p.title} className="card card--soft">
                <h3 className="h4">{p.title}</h3>
                <p className="body" style={{ fontSize: 14.5 }}>
                  {p.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand />

      <style>{`
        .pl-step { position: relative; }
        .pl-num { position: absolute; top: 22px; right: 22px; font-size: 12px; color: var(--faint); letter-spacing: 0.08em; }
        .pl-wl { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 72px); align-items: center; }
        .pl-wl-list { display: grid; gap: 10px; }
        .pl-wl-item {
          display: grid; grid-template-columns: 44px 1fr auto; gap: 16px; align-items: center;
          padding: 18px 20px; border-radius: 10px; background: var(--surface); border: var(--hair) solid var(--line); box-shadow: var(--sh-xs);
        }
        .pl-wl-level { display: flex; gap: 3px; align-items: flex-end; height: 22px; }
        .pl-wl-level i { width: 8px; border-radius: 3px; background: var(--surface-3); }
        .pl-wl-level i:nth-child(1) { height: 8px; }
        .pl-wl-level i:nth-child(2) { height: 15px; }
        .pl-wl-level i:nth-child(3) { height: 22px; }
        .pl-wl-level i.is-on { background: var(--burgundy); }
        @media (max-width: 960px) { .pl-wl { grid-template-columns: 1fr; } }
        @media (max-width: 520px) { .pl-wl-item { grid-template-columns: 36px 1fr; } .pl-wl-item .tag { grid-column: 2; justify-self: start; } }
      `}</style>
    </>
  );
}
