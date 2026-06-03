import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";
import { MarketingFlow } from "../_components/visuals/MarketingFlow";

export const metadata: Metadata = {
  title: "Marketing Projects",
  description:
    "See what your marketing team did — and what it brought. Budget, campaign, leads, approvals, result.",
};

export default function MarketingProjectsPage() {
  return (
    <StubPage
      eyebrow="Marketing Projects"
      title="See what your marketing team did —"
      italicTail="and what it brought"
      body="Budgets, Kampagnen, Leads, Assets, Approvals, Result. Festag macht Marketing-Arbeit so verständlich wie eine Engineering-Pipeline."
      bullets={[
        "Budget-Flow → Kampagne → Leads → Approval → Result",
        "Asset-Review mit ProofGrid-Bindung",
        "Tagro-Briefing pro Kampagne für Founder oder Client",
        "Kein Excel mehr für die Monatsabrechnung",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Marketing%20Projects"
    >
      <section className="surface-light py-20">
        <div className="shell">
          <MarketingFlow />
        </div>
      </section>
    </StubPage>
  );
}
