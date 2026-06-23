import { Section, SectionHeader } from "./primitives";

const LAYERS = [
  {
    title: "KI-Schicht",
    items: [
      "zerlegt Projektideen in Struktur",
      "erstellt definierte Aufgaben",
      "baut Tagespläne",
      "erkennt Blocker früh",
    ],
  },
  {
    title: "Ausführungsschicht",
    items: [
      "Entwickler setzen Aufgaben um",
      "Fortschritt wird aktualisiert",
      "strukturierter Workflow",
    ],
  },
  {
    title: "Systemsicht",
    items: [
      "Echtzeit-Projektsicht",
      "Updates für Auftraggeber",
      "Fortschrittsverfolgung",
      "kommunikationsprotokoll",
    ],
  },
];

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" tone="elevated">
      <SectionHeader
        eyebrow="Architektur"
        title="So funktioniert es"
        description="Drei Schichten. Ein Produktionssystem."
      />
      <div className="lp-flow">
        {LAYERS.map((layer, index) => (
          <article key={layer.title} className="lp-flow-card">
            <span className="lp-flow-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="lp-flow-title">{layer.title}</h3>
            <ul className="lp-flow-list">
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
