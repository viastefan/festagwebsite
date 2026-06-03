import type { Metadata } from "next";
import { StubPage } from "../../_components/StubPage";

export const metadata: Metadata = {
  title: "Terms — Festag",
  description: "Festag terms of service — governing the use of Festag.",
};

export default function TermsPage() {
  return (
    <StubPage
      eyebrow="Terms"
      title="Terms of service,"
      italicTail="in plain language"
      body="Diese Seite wird durch die finalen Nutzungsbedingungen ersetzt. Wir orientieren uns an klarer DACH-B2B-Sprache."
      bullets={[
        "Zugang, Nutzung, Verantwortung",
        "Daten- und IP-Klärung",
        "Festag Garantie (Mode A) — vertragliche Anker",
        "Kündigung, Datenexport, Übergabeszenarien",
      ]}
      mailto="mailto:legal@festag.app?subject=Festag%20%E2%80%94%20Terms%20question"
      mailtoLabel="legal@festag.app"
    />
  );
}
