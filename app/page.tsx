import type { Metadata } from "next";
import Image from "next/image";
import { Button, TextLink } from "./_components/ui/Button";
import { Reveal } from "./_components/ui/Reveal";
import { Stage } from "./_components/ui/Window";
import { AskScene, DecisionScene, FeedScene, HandoffScene, HeroApp } from "./_components/appdemo/AppDemo";
import { CtaBand, SectionHead } from "./_components/ui/Section";
import { StatStrip } from "./_components/ui/Blocks2";
import {
  ConnectorMarquee,
  FeatureBlock,
  Highlights,
  VoicesGrid,
} from "./_components/site/Blocks";
import { VideoBand } from "./_components/ui/Media";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  title: { absolute: "Festag — Operational Intelligence für Teams, die liefern" },
  alternates: { canonical: "/" },
};


export default function HomePage() {
  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="hero">
        <div className="wrap wrap--wide">
          <Reveal className="hero-copy">
            <h1 className="display">
              Das Team arbeitet.
              <br />
              <span className="display-accent">Festag macht es sichtbar.</span>
            </h1>
            <div className="btn-row">
              <Button href={links.register} variant="solid" size="lg" arrow>
                Kostenlos starten
              </Button>
              <Button href="/contact" variant="soft" size="lg" arrow>
                Demo anfragen
              </Button>
            </div>
          </Reveal>

          <Reveal className="hero-stage" delay={0.15} y={24}>
            <Stage caption="Live-Demo, klick dich durch">
              <HeroApp />
            </Stage>
          </Reveal>
        </div>
      </section>

      <ConnectorMarquee label="Liest Signale aus den Tools, in denen euer Team ohnehin arbeitet" />

      {/* ───────── Features ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <FeatureBlock
            title="Ein Status, den Kunden lesen können."
            sub="Aus Commits, Tickets und Threads wird ein ruhiger Feed: was entschieden ist, was wartet, was geliefert wurde."
            link={{ href: "/product#client", label: "Mehr über den Status-Feed" }}
          >
            <FeedScene />
          </FeatureBlock>

          <FeatureBlock
            flip
            title="Entscheidungen statt Status-Theater."
            sub="Festag formuliert die Frage, rechnet die Optionen durch und empfiehlt eine Richtung. Du entscheidest mit einem Klick."
            link={{ href: "/product#decisions", label: "Wie Entscheidungen funktionieren" }}
          >
            <DecisionScene />
          </FeatureBlock>

          <FeatureBlock
            title="Frag, was wirklich läuft."
            sub="Kein Chatbot. Eine Antwort mit Kontext, Empfehlung und Quelle, direkt aus euren Tools belegt."
            link={{ href: "/tagro", label: "Aven kennenlernen" }}
          >
            <AskScene />
          </FeatureBlock>

          <FeatureBlock
            flip
            title="Vom Entschluss zum Pull Request."
            sub="Ist entschieden, übergibt Festag den Auftrag an euren Coding-Agent, prüft den Beleg und hält den Kunden auf dem Laufenden."
            link={{ href: "/connectors", label: "Alle Connectors" }}
          >
            <HandoffScene />
          </FeatureBlock>
        </div>
      </section>

      {/* ───────── Filme ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <div className="vgrid">
            <Reveal className="vgrid-item">
              <VideoBand src="/media/video/connectors.mp4" poster="/media/video/connectors.jpg" mobileSrc="/media/video/connectors-m.mp4" mobilePoster="/media/video/connectors-m.jpg" mobileRatio="390 / 560" label="Konnektoren verbinden" caption="Verbinden" />
              <h3 className="h3">Verbinden.</h3>
              <p className="body">GitHub, Linear, Slack, Jira und Notion in Minuten verbunden. Festag liest Signale, keine Menschen.</p>
            </Reveal>
            <Reveal className="vgrid-item" delay={0.08}>
              <VideoBand src="/media/video/handoff.mp4" poster="/media/video/handoff.jpg" mobileSrc="/media/video/handoff-m.mp4" mobilePoster="/media/video/handoff-m.jpg" mobileRatio="390 / 560" label="Übergabe an den Coding-Agent" caption="Übergeben" />
              <h3 className="h3">Übergeben.</h3>
              <p className="body">Nach der Entscheidung geht der Brief an euren Coding-Agent. Der Pull Request kommt als Beleg zurück.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Voices ───────── */}
      <section className="section">
        <div className="wrap wrap--wide">
          <SectionHead center title="Die neue Art, Kundenprojekte zu führen." />
          <VoicesGrid limit={3} />
        </div>
      </section>

      {/* ───────── Vertrauen (Kurzfassung, Details unter /security) ───────── */}
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead title="Operative Sichtbarkeit. Keine Überwachung." lead="Festag sieht, was Arbeit produziert, nicht, was Menschen tun." />
          <StatStrip
            items={[
              { v: "Deutschland", l: "Hosting und Verarbeitung" },
              { v: "Freigabe", l: "Vor jedem Versand an Kunden" },
              { v: "Kein Training", l: "Auf euren Daten" },
              { v: "Opt-in", l: "Persönliche Profile" },
            ]}
          />
          <Reveal style={{ marginTop: 20 }}>
            <TextLink href="/security">Sicherheit und Datenschutz im Detail</TextLink>
          </Reveal>
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
.home-team {
  display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 8fr); gap: clamp(16px, 2vw, 24px);
  padding: clamp(12px, 1.4vw, 18px); border-radius: var(--r-xl);
  background: linear-gradient(135deg, var(--tone-wood-tint), var(--surface-2) 60%);
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
    }
@media (max-width: 520px) {
  .home-updates-head { flex-direction: column; align-items: flex-start; gap: 0; }
}
`;
