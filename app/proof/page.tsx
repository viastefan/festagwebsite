import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";
import { ProofGridDemo } from "../_components/visuals/ProofGridDemo";

export const metadata: Metadata = {
  title: "ProofGrid — Evidence infrastructure",
  description:
    "ProofGrid turns project progress into provable, citable evidence — manual, linked, approved, verified.",
};

export default function ProofPage() {
  return (
    <StubPage
      eyebrow="ProofGrid"
      title="Progress should be"
      italicTail="provable"
      body="ProofGrid weist jede Phase, jedes Artefakt und jede Approval einem Proof-Zustand zu — manuell, verlinkt, approved, verifiziert. Berichte zitieren Evidence, statt sie zu beschreiben."
      bullets={[
        "Vier Stufen: manuell → verlinkt → approved → verifiziert",
        "Quellen-Bindung pro Zelle — jede Aussage hat einen Origin",
        "Aggregation pro Phase, Projekt, Client",
        "Verifizierung steuert Status-Reports automatisch",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20ProofGrid"
    >
      <section className="surface-light py-20">
        <div className="shell">
          <ProofGridDemo />
        </div>
      </section>
    </StubPage>
  );
}
