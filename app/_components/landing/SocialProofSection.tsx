import { Section, SectionHeader } from "./primitives";

const PROOF = [
  {
    label: "Status",
    text: "Frühes System in Entwicklung",
  },
  {
    label: "Einsatz",
    text: "Strukturiert reale Softwareprojekte",
  },
  {
    label: "Zielgruppe",
    text: "Gebaut für moderne Produktteams",
  },
];

export function SocialProofSection() {
  return (
    <Section id="proof">
      <SectionHeader
        eyebrow="Referenz"
        title="In Produktion gebaut, nicht in Pitch Decks."
        align="center"
      />
      <div className="lp-proof-grid">
        {PROOF.map((item) => (
          <article key={item.label} className="lp-proof-card">
            <p className="lp-proof-label">{item.label}</p>
            <p className="lp-proof-text">{item.text}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
