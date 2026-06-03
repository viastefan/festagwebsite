import type { Metadata } from "next";
import { StubPage } from "../../_components/StubPage";

export const metadata: Metadata = {
  title: "Imprint — Festag",
  description: "Imprint / Impressum for Festag.",
};

export default function ImprintPage() {
  return (
    <StubPage
      eyebrow="Imprint"
      title="Anbieterkennzeichnung"
      body="Diese Seite wird durch die finale Anbieterkennzeichnung ersetzt, sobald die Festag-Entität rechtlich registriert ist. Für rechtliche Anfragen bis dahin: legal@festag.app."
      bullets={[
        "Festag — DACH",
        "Kontakt: hello@festag.app",
        "Rechtliches: legal@festag.app",
      ]}
      mailto="mailto:legal@festag.app?subject=Festag%20%E2%80%94%20Imprint"
      mailtoLabel="legal@festag.app"
    />
  );
}
