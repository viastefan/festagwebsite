import type { Metadata } from "next";
import { Button } from "../../_components/ui/Button";
import { Icon, type IconName } from "../../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../../_components/ui/Section";
import { MemoryNav, MemoryStyles } from "../shared";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  alternates: { canonical: "/memory/token-economics" },
  title: "Token-Ökonomie — was KI-Arbeit wirklich bringt",
  description:
    "Festag rechnet Tokens gegen Lieferung: Tokens pro Deployment, Kosten pro Lieferung und der Anteil der KI-Arbeit, aus dem nie etwas wurde.",
};

const NUMBERS: [string, string][] = [
  ["186k", "Tokens pro Lieferung — die Effizienzzahl, nicht der Verbrauch"],
  ["$2.14", "Kosten pro Lieferung, aus Modell und Tokenzahl gerechnet"],
  ["64%", "Anteil der Kapitel, aus denen eine Lieferung wurde"],
  ["3.4×", "Verhältnis von Cache-Treffern zu neuer Eingabe"],
];

const METHOD: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "server",
    title: "Lieferungen kommen vom Anbieter",
    body:
      "Festag holt die Deployments dort, wo das Projekt liegt — heute Vercel, über Projekt-ID und API-Token. Was dort nicht grün wurde, zählt nicht als Lieferung.",
  },
  {
    icon: "flow",
    title: "Zugerechnet wird das Fenster",
    body:
      "Jeder Lieferung gehört die Arbeit zwischen ihr und der vorherigen Lieferung auf demselben Branch. Das ist die ehrlichste Zuordnung ohne Commit-Graph — und sie ist nachvollziehbar.",
  },
  {
    icon: "chart",
    title: "Preise an einer Stelle",
    body:
      "Kosten entstehen aus Modell und Tokenzahl, getrennt nach Eingabe, Ausgabe und Cache. Ändert ein Anbieter die Preise, ändert sich eine Tabelle — nicht die Historie.",
  },
  {
    icon: "decision",
    title: "Die Selbstauskunft zählt mit",
    body:
      "Entwickler bewerten ein Kapitel von 1 bis 5. Diese Zahl ersetzt keine Lieferung, aber sie unterscheidet teure Arbeit, die trug, von teurer Arbeit, die nur mühsam war.",
  },
];

const READINGS: [string, string][] = [
  [
    "Viele Tokens, wenige Lieferungen",
    "Der Kontext fehlt. Meist zahlt sich hier eine bessere Projektbeschreibung schneller aus als ein besseres Modell.",
  ],
  [
    "Wenige Tokens, viele Lieferungen",
    "Gute Routine — und ein Muster, das sich an andere Projekte weitergeben lässt.",
  ],
  [
    "Hoher Anteil Erkundung",
    "Normal in einer frühen Phase. Problematisch, wenn es drei Monate so bleibt.",
  ],
  [
    "Hoher Anteil zurückgenommen",
    "Die Entscheidungen kamen zu spät. Festag zeigt, an welcher Stelle im Kapitel sie gefehlt haben.",
  ],
];

export default function MemoryTokenEconomicsPage() {
  return (
    <>
      <MemoryStyles />
      <PageHero
        title={<>Nicht „wie viele Tokens“. Sondern: was ist davon live gegangen.</>}
        lead="Token-Ausgaben sind in jeder Agentur eine Zahl ohne Gegenstück. Festag gibt ihr eines: die Lieferung, die daraus entstanden ist."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Kostenlos starten
          </Button>
          <Button href="/memory/chapters" variant="soft" size="lg">
            Wie Kapitel entstehen
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <MemoryNav current="/memory/token-economics" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <RevealGroup className="mem-numbers">
            {NUMBERS.map(([value, label]) => (
              <RevealItem key={label} className="mem-number">
                <b>{value}</b>
                <span>{label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal>
            <p className="body" style={{ marginTop: 16, fontSize: 13.5 }}>
              Beispielwerte aus einem Projektmonat. Eure Zahlen entstehen aus eurer Arbeit — Festag
              schätzt nichts und füllt nichts auf.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            title="Wie gerechnet wird."
            lead="Eine Kennzahl ist nur so viel wert wie die Methode dahinter. Deshalb steht sie hier."
          />
          <RevealGroup className="grid-2">
            {METHOD.map((m) => (
              <RevealItem key={m.title} className="card mem-card-full">
                <span className="card-icon">
                  <Icon name={m.icon} />
                </span>
                <h3 className="h4">{m.title}</h3>
                <p className="body">{m.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Was die Zahlen sagen." />
          <Reveal className="mem-table">
            <div className="mem-table-row">
              <span>Muster</span>
              <span style={{ gridColumn: "2 / -1" }}>Lesart</span>
            </div>
            {READINGS.map(([pattern, reading]) => (
              <div className="mem-table-row" key={pattern}>
                <span>{pattern}</span>
                <span style={{ gridColumn: "2 / -1" }}>{reading}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal className="mem-privacy">
            <h2 className="h3">Für Agenturen: endlich eine belegbare Position.</h2>
            <p className="body">
              „KI-gestützte Entwicklung“ steht in jedem Angebot. Mit Build Memory steht im Report,
              was sie in diesem Projekt bewirkt hat: wie viele Lieferungen, zu welchen Kosten, mit
              welchem Anteil verworfener Arbeit. Veyra übersetzt das in Kundensprache — ohne
              Technik, ohne Hype, mit Beleg.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Die erste ehrliche Rechnung über KI-Arbeit."
        lead="Werkzeug und Vercel verbinden, eine Woche arbeiten — danach steht die Zahl."
      />
    </>
  );
}
