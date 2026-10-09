import type { Metadata } from "next";
import { LegalShell } from "../LegalShell";

export const metadata: Metadata = { title: "Impressum" };

export default function ImprintPage() {
  return (
    <LegalShell title="Impressum" current="/legal/imprint" updated="Oktober 2026">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Die vollständigen Impressumsangaben (Firma, Anschrift, Vertretungsberechtigte, Registereintrag, USt-IdNr.)
        werden hier mit den finalen Firmendaten hinterlegt.
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:hello@festag.app">hello@festag.app</a>
      </p>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>Nach § 18 Abs. 2 MStV — Kontakt über dieselbe Adresse. Bitte keine unaufgeforderten Werbesendungen.</p>
    </LegalShell>
  );
}
