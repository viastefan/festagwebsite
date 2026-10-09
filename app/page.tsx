import type { Metadata } from "next";
import Image from "next/image";
import { Button, TextLink } from "./_components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "./_components/ui/Reveal";
import { Stage } from "./_components/ui/Window";
import { CtaBand, SectionHead } from "./_components/ui/Section";
import { Icon } from "./_components/ui/Icon";
import { HeroStage } from "./_components/demos/HeroStage";
import { TranslateDemo } from "./_components/demos/TranslateDemo";
import { DecisionDemo } from "./_components/demos/DecisionDemo";
import { TagroConsole } from "./_components/demos/TagroConsole";
import { ExecutiveDemo } from "./_components/demos/ExecutiveDemo";
import { SignalFlow } from "./_components/demos/SignalFlow";
import { LearningLoop } from "./_components/demos/LearningLoop";
import { BentoTrio } from "./_components/demos/BentoTrio";
import {
  ConnectorMarquee,
  FeatureBlock,
  IconCard,
  Highlights,
  VoicesGrid,
} from "./_components/site/Blocks";
import { links } from "@/lib/site/links";
import { clientQuestions } from "@/lib/site/content";

export const metadata: Metadata = {
  title: { absolute: "Festag — Operational Intelligence für Teams, die liefern" },
};

const MODES = [
  {
    icon: "portal" as const,
    title: "Delivery",
    body: "Client Portal, Reports und Briefings. Kunden sehen übersetzten Fortschritt — mit Beleg, ohne Ticket-Rauschen.",
    href: "/product#client",
  },
  {
    icon: "people" as const,
    title: "Teams",
    body: "Prioritäten, Verantwortung und Kontext pro Aufgabe. Tagro als ruhiger Operations-Manager für echte Teams.",
    href: "/product#execution",
  },
  {
    icon: "layers" as const,
    title: "Agency",
    body: "Festag als euer Produkt. Eure Marke vorne, Festag-Intelligenz darunter — bis zum vollständigen White-Label.",
    href: "/enterprise#white-label",
  },
];

const TRUST = [
  { icon: "server" as const, title: "Server in Deutschland", body: "Hosting und Verarbeitung in der EU, DSGVO-konform, AVV inklusive." },
  { icon: "eye" as const, title: "Keine Überwachung", body: "Keine Screenshots, kein Tracking, keine Personen-Scores. Signale, nicht Menschen." },
  { icon: "check" as const, title: "Freigabe vor Versand", body: "Nichts erreicht Kunden, bevor jemand aus eurem Team es freigegeben hat." },
  { icon: "lock" as const, title: "Kein Training auf euren Daten", body: "Festag trainiert keine öffentlichen Modelle auf eurem Workspace." },
];

export default function HomePage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="hero">
        <div className="wrap wrap--wide">
          <Reveal className="hero-copy">
            <h1 className="display">
              Das Team arbeitet. Der Kunde rätselt.
              <br />
              Festag schließt die Lücke.
            </h1>
            <p className="lead">
              Operational Intelligence über GitHub, Linear, Jira und Slack — Tagro übersetzt Arbeit in Status, Risiken und
              Entscheidungen, die Kunden und Führung verstehen.
            </p>
            <div className="btn-row">
              <Button href={links.register} variant="solid" size="lg" arrow>
                Kostenlos starten
              </Button>
              <Button href="/contact" variant="soft" size="lg" arrow>
                Demo anfragen
              </Button>
            </div>
            <ul className="hero-proof">
              <li>
                <Icon name="check" size={14} /> Erster Workspace kostenlos
              </li>
              <li>
                <Icon name="check" size={14} /> Server in Deutschland
              </li>
              <li>
                <Icon name="check" size={14} /> Nichts geht ohne Freigabe raus
              </li>
            </ul>
          </Reveal>

          <Reveal className="hero-stage" delay={0.15} y={24}>
            <Stage caption="Live-Demo · klick dich durch">
              <HeroStage />
            </Stage>
          </Reveal>
        </div>
      </section>

      <ConnectorMarquee label="Liest Signale aus den Tools, in denen euer Team ohnehin arbeitet" />

      {/* ───────── Problem ───────── */}
      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <div className="home-problem">
            <Reveal>
              <span className="eyebrow">Das eigentliche Problem</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Es fehlt nicht an Arbeit. Es fehlt an verständlichem Fortschritt.
              </h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Agenturen und Software-Teams verlieren Zeit, Vertrauen und Marge, weil sie Fortschritt ständig von Hand
                erklären müssen. Festag ist die Übersetzungs- und Kontrollschicht zwischen Umsetzung und Verständnis.
              </p>
            </Reveal>
            <RevealGroup className="home-questions">
              {clientQuestions.map((q) => (
                <RevealItem key={q} className="home-q">
                  {q}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ───────── Features ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <FeatureBlock
            title="Tagro übersetzt Arbeit in Klarheit."
            sub="Aus „OAuth-Callback kaputt, PR pending“ wird ein Satz, den euer Kunde versteht — belegt, ruhig, ohne Technik."
            link={{ href: "/product#client", label: "Mehr über das Client Panel" }}
          >
            <TranslateDemo />
          </FeatureBlock>

          <FeatureBlock
            flip
            title="Entscheidungen statt Status-Theater."
            sub="Tagro erkennt, wo eine Entscheidung fehlt, rechnet die Optionen durch und schreibt das Ergebnis mit Begründung ins Projekt."
            link={{ href: "/product#decisions", label: "Wie Entscheidungen funktionieren" }}
          >
            <DecisionDemo />
          </FeatureBlock>

          <FeatureBlock
            title="Frag, was wirklich läuft."
            sub="Kein Chatbot. Ein Interpreter, der eure Organisation kennt — mit Kontext, Empfehlung, nächstem Schritt und Quelle."
            link={{ href: "/tagro", label: "Tagro kennenlernen" }}
          >
            <TagroConsole compact />
          </FeatureBlock>

          <FeatureBlock
            flip
            title="Ein Portfolio. Eine Wahrheit."
            sub="Für Gründer und Führung: alle Projekte auf einer Seite — Health, Risiken, offene Entscheidungen, Forecast."
            link={{ href: "/product#executive", label: "Executive Overview ansehen" }}
          >
            <ExecutiveDemo />
          </FeatureBlock>

          <FeatureBlock
            title="Jedes Signal wird zu Bedeutung."
            sub="Commits, Tickets, Threads, Kommentare: Festag klassifiziert, verknüpft Belege und entscheidet, wer es wissen muss."
            link={{ href: "/connectors", label: "Alle Connectors" }}
          >
            <SignalFlow />
          </FeatureBlock>
        </div>
      </section>

      <BentoTrio />

      {/* ───────── Voices ───────── */}
      <section className="section">
        <div className="wrap wrap--wide">
          <SectionHead center title="Die neue Art, Kundenprojekte zu führen." />
          <VoicesGrid />
        </div>
      </section>

      {/* ───────── Company Brain ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Adaptive Intelligence"
            title={
              <>
                Wird mit jedem Projekt klüger.
              </>
            }
            lead="Festag lernt die Operational DNA eurer Organisation: wie ihr entscheidet, was „fertig“ heißt, wo es staut. Wie ein Kollege, der seit Jahren bei euch arbeitet — nicht wie ein Chatbot, den man fragt."
          />
          <Reveal>
            <Stage pad>
              <div className="home-loop">
                <LearningLoop />
              </div>
            </Stage>
          </Reveal>
          <Reveal style={{ marginTop: 24 }}>
            <TextLink href="/intelligence">Modelle & Intelligence im Detail</TextLink>
          </Reveal>
        </div>
      </section>

      {/* ───────── Modes ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Ein System, drei Modi"
            title="Delivery, Teams oder Agency — dieselbe Intelligenz darunter."
          />
          <RevealGroup className="grid-3">
            {MODES.map((m) => (
              <RevealItem key={m.title}>
                <IconCard icon={m.icon} title={m.title} body={m.body} href={m.href} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ───────── Trust ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <div className="home-trust">
            <Reveal className="home-trust-copy">
              <span className="eyebrow">Vertrauen ist das Produkt</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Operative Sichtbarkeit. Keine Überwachung.
              </h2>
              <p className="body" style={{ marginTop: 16 }}>
                Festag sieht, was Arbeit produziert — nicht, was Menschen tun. Persönliche Profile sind Opt-in, Export
                und Löschung jederzeit möglich.
              </p>
              <div style={{ marginTop: 22 }}>
                <TextLink href="/enterprise#security">Security & Datenschutz</TextLink>
              </div>
            </Reveal>
            <RevealGroup className="grid-2">
              {TRUST.map((t) => (
                <RevealItem key={t.title} className="card card--soft">
                  <span className="card-icon" style={{ background: "#fff" }}>
                    <Icon name={t.icon} />
                  </span>
                  <h3 className="h4">{t.title}</h3>
                  <p className="body" style={{ fontSize: 14.5 }}>
                    {t.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ───────── Team image (Cursor-style split) ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal className="home-team">
            <div className="home-team-copy">
              <p className="h3">
                Festag ist ein Produktteam aus Niederbayern, das Software baut, die versteht, wie Organisationen arbeiten.
              </p>
              <TextLink href="/company">Lerne das Team kennen</TextLink>
            </div>
            <div className="home-team-media">
              <Image
                src="/brand/bg-office.jpg"
                alt="Ein Team arbeitet gemeinsam in einem hellen Studio"
                fill
                sizes="(max-width: 960px) 100vw, 60vw"
                className="home-team-img"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── Highlights ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <h2 className="h3">Aktuelle Highlights</h2>
          </Reveal>
          <Highlights />
          <Reveal style={{ marginTop: 20 }}>
            <TextLink href="/changelog">Alle Updates ansehen</TextLink>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <style>{HOME_CSS}</style>
    </>
  );
}

const HOME_CSS = `
.home-problem { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(32px, 6vw, 96px); align-items: center; }
.home-questions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.home-q {
  padding: 16px 18px; border-radius: 8px; background: var(--surface); border: var(--hair) solid var(--line);
  font-size: 17px; line-height: 1.3; color: var(--ink-2); box-shadow: var(--sh-xs);
}
.home-q:nth-child(4n+1), .home-q:nth-child(4n) { background: var(--surface-2); border-color: transparent; box-shadow: none; }
.home-loop { background: rgba(255,255,255,0.78); backdrop-filter: blur(8px); border-radius: 10px; padding: clamp(18px, 3vw, 36px); border: var(--hair) solid var(--line); }
.home-trust { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(28px, 5vw, 72px); align-items: start; }
.home-trust-copy { position: sticky; top: calc(var(--nav-h) + 32px); }
.home-team {
  display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 8fr); gap: clamp(16px, 2vw, 24px);
  padding: clamp(12px, 1.4vw, 18px); border-radius: var(--r-xl); background: var(--surface-2);
}
.home-team-copy { display: grid; align-content: center; gap: 18px; padding: clamp(14px, 2vw, 28px); }
.home-team-copy .h3 { font-weight: 500; max-width: 26ch; }
.home-team-media { position: relative; min-height: clamp(280px, 34vw, 480px); border-radius: var(--r-lg); overflow: hidden; }
.home-team-img { object-fit: cover; object-position: center 40%; }
.home-updates-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
.home-updates-head .sec-head { margin-bottom: clamp(24px, 4vw, 40px); }
.home-updates-head > .link { margin-bottom: clamp(24px, 4vw, 40px); flex-shrink: 0; }
@media (max-width: 960px) {
  .home-team { grid-template-columns: 1fr; }
  .home-team-copy { padding: 10px 6px 4px; }
  .home-problem, .home-trust { grid-template-columns: 1fr; }
  .home-trust-copy { position: static; }
}
@media (max-width: 520px) {
  .home-questions { grid-template-columns: 1fr; }
  .home-updates-head { flex-direction: column; align-items: flex-start; gap: 0; }
}
`;
