import { Section, SectionHeader } from "./primitives";

const VALUES = [
  "schnellere Lieferklarheit",
  "weniger Missverständnisse",
  "strukturierte Ausführung",
  "Echtzeit-Sichtbarkeit",
  "weniger Projektchaos",
];

export function ValueSection() {
  return (
    <Section id="value">
      <SectionHeader title="Festag macht Softwareentwicklung planbar." />
      <ul className="lp-value-grid">
        {VALUES.map((value) => (
          <li key={value} className="lp-value-item">
            {value}
          </li>
        ))}
      </ul>
    </Section>
  );
}
