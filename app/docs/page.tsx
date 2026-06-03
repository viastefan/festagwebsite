import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";

export const metadata: Metadata = {
  title: "Docs — Festag",
  description:
    "Festag product documentation, integrations, security model and Tagro behaviour.",
};

export default function DocsPage() {
  return (
    <StubPage
      eyebrow="Docs"
      title="Documentation,"
      italicTail="without the noise"
      body="Strukturierte Dokumentation zu Festag-Produkt, Integrationen, Sicherheitsmodell und Tagro-Verhalten. Wir veröffentlichen kapitelweise — kein 200-Seiten-Wiki-Dump."
      bullets={[
        "Product Concepts — Projects, Decisions, ProofGrid, Tagro, Nexora",
        "Workspaces, Roles, Multi-Tenant-Modell",
        "Integrations & Email-Routing",
        "Security, Privacy, DACH-Compliance",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Docs"
    />
  );
}
