import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";

export const metadata: Metadata = {
  title: "Internal Company Mode",
  description:
    "Use Festag inside your company without turning it into a wiki. Department control rooms, company pulse, internal reports.",
};

export default function InternalModePage() {
  return (
    <StubPage
      eyebrow="Internal Company Mode"
      title="Use Festag inside your company —"
      italicTail="without turning it into a wiki"
      body="Notion speichert Wissen. Festag steuert operative Wahrheit. Department-Cockpits, Company-Puls, interne Reports, klare Entscheidungs-Owner."
      bullets={[
        "Department-Cockpits mit Pulse, Decisions, Risiken pro Team",
        "Company-Pulse für Leadership — eine Sicht, keine Bilder-Excel-Lobby",
        "Interne Reports auf Knopfdruck, Tagro-getrieben",
        "Trennt sauber von Client-Workspaces",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Internal%20Company%20Mode"
      surface="dark"
    />
  );
}
