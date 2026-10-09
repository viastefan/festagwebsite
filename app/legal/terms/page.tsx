import type { Metadata } from "next";
import { LegalShell } from "../LegalShell";

export const metadata: Metadata = { title: "AGB" };

export default function TermsPage() {
  return (
    <LegalShell title="AGB" current="/legal/terms" updated="Oktober 2026">
      <h2>Nutzung von Festag</h2>
      <p>
        Festag ist eine Operational Intelligence Platform für Organisationen. Die Nutzung setzt einen Workspace und
        die geltenden Produktbedingungen voraus.
      </p>
      <h2>Verantwortung</h2>
      <p>
        Ihr bleibt verantwortlich für Inhalte und verbundene Tools in eurem Workspace. Von Tagro erstellte Reports und
        Kunden-Updates werden vor der Veröffentlichung von euch freigegeben. Festag ersetzt keine Rechts-, Steuer- oder
        Sicherheitsberatung.
      </p>
      <h2>Kontakt</h2>
      <p>
        Die vollständigen AGB werden hier hinterlegt. Bis dahin: <a href="mailto:hello@festag.app">hello@festag.app</a>.
      </p>
    </LegalShell>
  );
}
