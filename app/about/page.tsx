import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";

export const metadata: Metadata = {
  title: "About Festag",
  description:
    "Festag baut die Kontrollschicht für moderne Projektarbeit — adult, calm, European.",
};

export default function AboutPage() {
  return (
    <StubPage
      eyebrow="About"
      title="A serious European software company"
      italicTail="for serious project work"
      body="Festag entsteht im DACH-Raum als die Kontrollschicht für Software-, Marketing- und interne Projekte. Wir sind ein kleines, hochbelastetes Team. Keine Webflow-Story, kein Founder-Theater — das hier ist das Produkt."
      bullets={[
        "Gegründet im DACH-Raum, mit globalem Anspruch",
        "Adult tone, editorial visuals, calm AI",
        "Curated Developer Network statt Marketplace",
        "Festag Garantie statt Disclaimer",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20About"
    />
  );
}
