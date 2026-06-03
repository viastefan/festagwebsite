import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";

export const metadata: Metadata = {
  title: "Security — Festag",
  description:
    "How Festag handles data, isolation, audit, encryption and DACH compliance.",
};

export default function SecurityPage() {
  return (
    <StubPage
      eyebrow="Security"
      title="Data, isolation,"
      italicTail="audit and trust"
      body="Multi-Tenant-Isolation, verschlüsselte Speicherung, klare Datenflüsse, DACH-konforme Verarbeitung. Tagro nennt immer die Quelle — auch intern."
      bullets={[
        "Row-Level-Security pro Workspace",
        "Encryption at rest and in transit",
        "Audit-Log für Decisions, Approvals und Proof-Änderungen",
        "DACH/EU-Hosting, GDPR-konforme DPAs auf Anfrage",
      ]}
      mailto="mailto:security@festag.app?subject=Festag%20%E2%80%94%20Security%20question"
      mailtoLabel="security@festag.app"
    />
  );
}
