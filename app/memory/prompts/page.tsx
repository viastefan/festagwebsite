import type { Metadata } from "next";
import { Button } from "../../_components/ui/Button";
import { Icon, type IconName } from "../../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../../_components/ui/Section";
import { MemoryNav, MemoryStyles } from "../shared";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  alternates: { canonical: "/memory/prompts" },
  title: "Prompt-Historie — jede Eingabe als Entscheidung",
  description:
    "Festag nimmt jeden Prompt mit Modell, Tokens, Werkzeugaufrufen und berührten Dateien auf — bereinigt von Secrets, gebunden an Projekt und Branch.",
};

const CAPTURED: [string, string][] = [
  ["Rolle", "Entwickler, Agent, Werkzeug oder System"],
  ["Text", "Der Prompt selbst — Secrets, Keys und Tokens vorher entfernt"],
  ["Modell", "Welches Modell geantwortet hat"],
  ["Tokens", "Eingabe, Ausgabe und Cache getrennt"],
  ["Kosten", "Aus Modell und Tokenzahl gerechnet, nicht geschätzt"],
  ["Dateien", "Was in diesem Turn tatsächlich berührt wurde"],
  ["Werkzeugaufrufe", "Wie viel der Agent selbst erledigt hat"],
  ["Kontext", "Projekt, Branch, Commit, Werkzeug, Zeitpunkt"],
];

const SAFETY: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "Zweimal bereinigt",
    body:
      "Der Hook auf dem Rechner entfernt Secrets, bevor etwas das Gerät verlässt. Der Server verlässt sich nicht darauf und filtert erneut: API-Keys, Tokens, private Schlüssel, Datenbank-URLs, E-Mail-Adressen.",
  },
  {
    icon: "lock",
    title: "Im Workspace, nicht im Markt",
    body:
      "Prompt-Texte bleiben beim Autor und seinem Workspace. Festag trainiert keine öffentlichen Modelle darauf, und kein anderer Workspace sieht sie.",
  },
  {
    icon: "key",
    title: "Jederzeit widerrufbar",
    body:
      "Jede Quelle hat einen eigenen Ingest-Key, gespeichert nur als Hash. Ein Klick widerruft ihn — das Werkzeug schreibt ab diesem Moment nichts mehr.",
  },
  {
    icon: "eye",
    title: "Gedächtnis, keine Leistungskontrolle",
    body:
      "Build Memory misst Arbeit gegen Lieferung, nicht Menschen gegeneinander. Es gibt keine Rangliste und keine Prompt-Zählung pro Kopf als Bewertung.",
  },
];

const USES = [
  {
    title: "Übergabe ohne Archäologie",
    body:
      "Wer ein Projekt übernimmt, liest Kapitel statt Commits. Die Begründung steht neben dem Ergebnis, nicht in einem Chat, den es nicht mehr gibt.",
  },
  {
    title: "Review mit Vorgeschichte",
    body:
      "Im Review steht nicht nur der Diff, sondern auch, welche Alternative verworfen wurde — und warum.",
  },
  {
    title: "Der eigene Blick zurück",
    body:
      "Welche Formulierung hat geholfen, welche hat zwanzig Prompts gekostet? Die Selbstauskunft am Kapitel macht daraus mit der Zeit ein Muster.",
  },
];

export default function MemoryPromptsPage() {
  return (
    <>
      <MemoryStyles />
      <PageHero
        title={<>Ein Prompt ist keine Suchanfrage. Er ist eine Entscheidung über die Software.</>}
        lead="Deshalb behandelt Festag ihn wie eine: aufgenommen, bereinigt, eingeordnet und mit dem verbunden, was daraus wurde."
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
          <MemoryNav current="/memory/prompts" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Was aufgenommen wird." />
          <Reveal className="mem-table">
            <div className="mem-table-row">
              <span>Feld</span>
              <span style={{ gridColumn: "2 / -1" }}>Inhalt</span>
            </div>
            {CAPTURED.map(([name, body]) => (
              <div className="mem-table-row" key={name}>
                <span>{name}</span>
                <span style={{ gridColumn: "2 / -1" }}>{body}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            title="Und was nicht passiert."
            lead="Ein Gedächtnis ist nur dann eines, wenn man ihm die eigene Arbeit anvertrauen kann."
          />
          <RevealGroup className="grid-2">
            {SAFETY.map((s) => (
              <RevealItem key={s.title} className="card mem-card-full">
                <span className="card-icon">
                  <Icon name={s.icon} />
                </span>
                <h3 className="h4">{s.title}</h3>
                <p className="body">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Wofür das im Alltag gut ist." />
          <RevealGroup className="grid-3">
            {USES.map((u) => (
              <RevealItem key={u.title} className="card mem-card-full">
                <h3 className="h4">{u.title}</h3>
                <p className="body">{u.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title="Nichts geht mehr im Scrollback verloren."
        lead="Ein Key, ein Hook — ab dann schreibt jedes Werkzeug ins selbe Gedächtnis."
      />
    </>
  );
}
