import { Section, SectionHeader } from "./primitives";

const NOT = [
  "kein Chatbot",
  "keine Dev-Agentur",
  "kein Projektmanagement-Tool",
];

export function PositioningSection() {
  return (
    <Section id="positioning" tone="elevated">
      <SectionHeader title="Was Festag ist, und was nicht." />
      <div className="lp-positioning">
        <div className="lp-positioning-col">
          <p className="lp-label">Festag ist nicht</p>
          <ul className="lp-positioning-list lp-positioning-list--muted">
            {NOT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="lp-positioning-col lp-positioning-col--accent">
          <p className="lp-label">Festag ist</p>
          <p className="lp-positioning-statement">
            ein KI-natives Produktionssystem für Softwareentwicklung
          </p>
        </div>
      </div>
    </Section>
  );
}
