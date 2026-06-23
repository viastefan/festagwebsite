import { CoreStatement, Section, SectionHeader } from "./primitives";

const STEPS = [
  "Nutzer gibt Idee auf der Website ein",
  "KI erzeugt strukturiertes Projekt",
  "Team und Plan werden erstellt",
  "Nutzer sieht Live-Fortschritt",
  "Updates werden automatisch geliefert",
];

export function ProductExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="Produkterlebnis"
        title="Was Sie erleben"
        description="Von der Idee zur strukturierten Lieferung, ohne Sichtbarkeit zu verlieren."
      />
      <ol className="lp-steps">
        {STEPS.map((step, index) => (
          <li key={step} className="lp-step">
            <span className="lp-step-num">{index + 1}</span>
            <span className="lp-step-text">{step}</span>
          </li>
        ))}
      </ol>
      <CoreStatement>
        Kein Chaos. Kein Raten. Kein versteckter Fortschritt.
      </CoreStatement>
    </Section>
  );
}
