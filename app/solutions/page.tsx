import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Festag for agencies, software teams, marketing teams and internal company operations.",
};

export default function SolutionsPage() {
  return (
    <StubPage
      eyebrow="Solutions"
      title="One control layer"
      italicTail="four use cases"
      body="Software, Marketing, Agency, Internal Operations. Eine Engine, vier ausgerichtete Sichten — wir bauen die dedizierte Seite gerade aus."
      bullets={[
        "Agencies — Multi-Client Workspaces, White-Label Surfaces, Garantie-Tier",
        "Software Teams — Decisions, Proof, Reports für engineering-getriebene Projekte",
        "Marketing Teams — Budget, Kampagnen, Leads, Approvals, Tagro-Erklärung",
        "Internal Operations — Department-Cockpits, Company-Puls, interne Reports",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Solutions"
    />
  );
}
