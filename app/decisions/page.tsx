import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";
import { DecisionInbox } from "../_components/visuals/DecisionInbox";

export const metadata: Metadata = {
  title: "Decisions — The operating layer",
  description:
    "The work moves when decisions move. Festag makes the choices that unlock progress visible.",
};

export default function DecisionsPage() {
  return (
    <StubPage
      eyebrow="Decisions"
      title="The work moves when"
      italicTail="decisions move"
      body="Tasks zeigen, was zu tun ist. Decisions zeigen, was Fortschritt freigibt. Festag macht beide gleich wichtig — und beide sichtbar."
      bullets={[
        "Decision-Inbox pro Projekt und pro Owner",
        "Owner, Optionen, Risiko, Quelle — strukturiert statt im Slack-Thread",
        "Entscheidungs-Historie für Audit, Reports und Kunden",
        "Decision-Lock auf Milestones, kein heimliches Re-Open",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Decisions"
      surface="dark"
    >
      <section className="surface-dark py-20">
        <div className="shell">
          <DecisionInbox />
        </div>
      </section>
    </StubPage>
  );
}
