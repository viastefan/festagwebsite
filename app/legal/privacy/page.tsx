import type { Metadata } from "next";
import { StubPage } from "../../_components/StubPage";

export const metadata: Metadata = {
  title: "Privacy — Festag",
  description: "Festag privacy notice — what data we collect and why.",
};

export default function PrivacyPage() {
  return (
    <StubPage
      eyebrow="Privacy"
      title="What data we collect,"
      italicTail="and why"
      body="Diese Seite wird durch das finale Datenschutz-Statement ersetzt. Bis dahin kannst du Anfragen direkt an uns richten."
      bullets={[
        "Verantwortlich: Festag, DACH",
        "Verarbeitete Daten: nur was Projektarbeit braucht",
        "Keine Weitergabe an Dritte für Werbezwecke",
        "DPA auf Anfrage",
      ]}
      mailto="mailto:privacy@festag.app?subject=Festag%20%E2%80%94%20Privacy%20request"
      mailtoLabel="privacy@festag.app"
    />
  );
}
