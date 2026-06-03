import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";

export const metadata: Metadata = {
  title: "Now — Festag changelog",
  description:
    "What we shipped, what we're learning, what's next. Status-first changelog from the Festag team.",
};

export default function NowPage() {
  return (
    <StubPage
      eyebrow="Now"
      title="What we shipped,"
      italicTail="what's next"
      body="Ruhiger Changelog — kein Marketing-Theater. Wir veröffentlichen, wenn etwas substantielles steht."
      bullets={[
        "Status-first updates aus echten Projekten",
        "Decisions, die unser Produkt geformt haben",
        "Releases, Tagro-Verbesserungen, ProofGrid-Erweiterungen",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Now"
    />
  );
}
