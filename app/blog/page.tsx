import type { Metadata } from "next";
import { StubPage } from "../_components/StubPage";

export const metadata: Metadata = {
  title: "Blog — Festag",
  description:
    "Editorial writing on project intelligence, calm AI, evidence, decisions and client trust.",
};

export default function BlogPage() {
  return (
    <StubPage
      eyebrow="Blog"
      title="Editorial writing,"
      italicTail="status-first"
      body="Wir schreiben über Project Intelligence, calm AI, Evidence-Systems, Decisions und Client-Trust. Wenig, dafür substantiell."
      bullets={[
        "Magazin-Stil, nicht SEO-Filler",
        "Keine Listicles, keine 'Top 10 AI Tools'",
        "Wir publizieren, wenn der Gedanke trägt",
      ]}
      mailto="mailto:hello@festag.app?subject=Festag%20%E2%80%94%20Blog"
    />
  );
}
