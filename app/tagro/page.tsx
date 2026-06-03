import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";
import { TagroBriefing } from "../_components/visuals/TagroBriefing";

export const metadata: Metadata = {
  title: "Tagro — Project Intelligence Layer",
  description:
    "Tagro explains what matters. Briefings, decisions, reports — calm AI with a source per sentence.",
};

export default function TagroPage() {
  return (
    <StubPage
      eyebrow="Tagro"
      title="Tagro explains"
      italicTail="what matters"
      body="Briefings, Reports, PDF-Zusammenfassungen, Audio-Transkripte — Tagro komprimiert verteilte Signale zu einer Status-Wahrheit, die Menschen verstehen. Immer mit Quelle. Immer mit Text-Transkript."
      bullets={[
        "Briefing aus n Signalen — in wenigen Zeilen",
        "Decision-Summary mit Quelle und Zeitstempel",
        "Report-Draft, der direkt an Kund:innen geschickt werden kann",
        "PDF-Analyse: Risiken, Pflichten, offene Fragen",
        "Audio-Statusberichte — niemals ohne Transkript",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Tagro"
      surface="dark"
    >
      <section className="surface-dark py-20">
        <div className="shell">
          <TagroBriefing />
        </div>
      </section>
    </StubPage>
  );
}
