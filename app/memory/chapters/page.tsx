import type { Metadata } from "next";
import { Button } from "../../_components/ui/Button";
import { Icon, type IconName } from "../../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../../_components/ui/Section";
import { MemoryNav, MemoryStyles } from "../shared";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  alternates: { canonical: "/memory/chapters" },
  title: "Kapitel — Container für KI-Arbeit",
  description:
    "Zusammenhängende Prompts werden zu einem Kapitel: Titel, Kurzfassung, Verlauf, Ausgang und Wirkung. Lesbar auch Monate später.",
};

const RULES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "clock",
    title: "Die Pause schneidet",
    body:
      "Wer 45 Minuten nichts eingibt, hat den Gedanken verlassen. Danach beginnt ein neues Kapitel — dieselbe Grenze, die ein Entwickler selbst ziehen würde.",
  },
  {
    icon: "flow",
    title: "Der Branch schneidet",
    body:
      "Ein Branch-Wechsel ist ein Themenwechsel. Build Memory folgt ihm, statt zwei Aufgaben in einem Container zu vermischen.",
  },
  {
    icon: "brain",
    title: "Veyra fasst zusammen",
    body:
      "Drei Sätze: Ziel, Entscheidung, Ergebnis. Dazu ein Verlauf mit Umwegen und dem, was offen blieb — ohne Werbesprache und ohne Dateilisten, die nichts erklären.",
  },
  {
    icon: "target",
    title: "Wirkung statt Bauchgefühl",
    body:
      "Lieferung, verknüpfte Entscheidungen, Breite des Eingriffs und die Selbstauskunft des Entwicklers ergeben eine Zahl zwischen 0 und 100.",
  },
];

const OUTCOMES: [string, string][] = [
  ["Geliefert", "Auf das Kapitel folgte ein erfolgreiches Deployment."],
  ["Teilweise geliefert", "Ein Teil ging live, ein Teil wurde zurückgenommen."],
  ["Erkundung", "Recherche und Fragen — wertvoll, aber nichts zum Ausliefern."],
  ["Zurückgenommen", "Die Arbeit wurde rückgängig gemacht. Auch das gehört ins Gedächtnis."],
  ["Abgebrochen", "Der Weg wurde verlassen. Die Begründung bleibt lesbar."],
  ["Offen", "Läuft noch — das Kapitel schreibt sich weiter."],
];

export default function MemoryChaptersPage() {
  return (
    <>
      <MemoryStyles />
      <PageHero
        title={<>Ein Kapitel ist die kleinste Einheit, die man erzählen kann.</>}
        lead="Einzelne Prompts sagen wenig. Vierzig Prompts an einem Nachmittag sagen, wie eine Entscheidung zustande kam — wenn sie jemand ordnet."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Kostenlos starten
          </Button>
          <Button href="/memory/token-economics" variant="soft" size="lg">
            Zur Token-Ökonomie
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <MemoryNav current="/memory/chapters" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="So sieht ein Kapitel aus." />
          <Reveal className="mem-chapter-demo">
            <div className="mem-chapter-demo-head">
              <div>
                <div className="mem-chapter-demo-title">
                  Rate-Limit für den Portal-Login, bevor der Launch kommt
                </div>
                <div className="mem-chapter-demo-meta">
                  <span className="tag tag--ok">Geliefert</span>
                  <span className="tag">Infrastruktur</span>
                  <span>14 Prompts</span>
                  <span>186k Tokens</span>
                  <span>$2.14</span>
                  <span>1 Lieferung</span>
                  <span>1 Entscheidung</span>
                </div>
              </div>
              <div className="mem-chapter-demo-score">
                <b>78</b>
                <span>Wirkung</span>
              </div>
            </div>
            <div className="mem-chapter-demo-body">
              <p>
                Ziel war ein Rate-Limit, das den Login schützt, ohne echte Nutzer auszusperren.
                Entschieden wurde ein Fenster pro IP und E-Mail statt pro Session, weil die Angriffe
                aus dem Support-Log von einer Adresse mit wechselnden Sessions kamen. Offen blieb,
                ob der Schwellwert für Agenturkunden mit geteilter IP angehoben werden muss.
              </p>
              <div className="mem-turn">
                <span>Entwickler · 09:12 · 4.2k Tokens</span>
                Wir brauchen ein Rate-Limit auf dem Login. Vorher: zeig mir, wo die
                Fehlversuche heute überhaupt protokolliert werden.
              </div>
              <div className="mem-turn">
                <span>Entwickler · 09:41 · 11.8k Tokens</span>
                Pro IP und E-Mail, nicht pro Session. Und schreib die Begründung in den Kommentar,
                damit das in sechs Monaten noch nachvollziehbar ist.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            title="Wie Festag schneidet."
            lead="Kapitelgrenzen entstehen deterministisch — nicht durch Raten, sondern durch das, was im Arbeitsrhythmus ohnehin sichtbar ist."
          />
          <RevealGroup className="grid-2">
            {RULES.map((r) => (
              <RevealItem key={r.title} className="card mem-card-full">
                <span className="card-icon">
                  <Icon name={r.icon} />
                </span>
                <h3 className="h4">{r.title}</h3>
                <p className="body">{r.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead
            title="Jedes Kapitel endet mit einem Ausgang."
            lead="Auch der unangenehme. Ein Gedächtnis, das nur Erfolge kennt, ist keines."
          />
          <Reveal className="mem-table">
            <div className="mem-table-row">
              <span>Ausgang</span>
              <span style={{ gridColumn: "2 / -1" }}>Bedeutung</span>
            </div>
            {OUTCOMES.map(([name, body]) => (
              <div className="mem-table-row" key={name}>
                <span>{name}</span>
                <span style={{ gridColumn: "2 / -1" }}>{body}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Aus Scrollback wird Nachschlagewerk."
        lead="Verbinde ein Werkzeug — das erste Kapitel steht nach der ersten Arbeitssitzung."
      />
    </>
  );
}
