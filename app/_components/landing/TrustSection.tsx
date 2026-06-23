import { BulletList, Section, SectionHeader } from "./primitives";

const PRINCIPLES = [
  "keine Black-Box-Entwicklung",
  "klare Verantwortlichkeiten",
  "strukturierte Delivery-Pipeline",
  "KI-gestützte Qualitätskontrolle",
];

export function TrustSection() {
  return (
    <Section id="trust" tone="elevated">
      <SectionHeader
        eyebrow="Vertrauen"
        title="Kontrolle ohne Komplexität."
        description="Festag stellt sicher, dass jedes Projekt strukturiert, geprüft und nachvollziehbar ist."
      />
      <BulletList items={PRINCIPLES} />
    </Section>
  );
}
