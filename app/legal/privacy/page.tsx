import type { Metadata } from "next";
import { LegalShell } from "../LegalShell";

export const metadata: Metadata = { title: "Datenschutz" };

export default function PrivacyPage() {
  return (
    <LegalShell title="Datenschutz" current="/legal/privacy" updated="Oktober 2026">
      <h2>Collaboration Intelligence, nicht Überwachung</h2>
      <p>
        Festag behandelt Adaptive Intelligence als Collaboration Intelligence innerhalb eines Workspaces — nicht als
        Überwachung von Mitarbeitenden oder Kunden. Lernen bleibt workspace-gebunden. Persönliche Profile sind Opt-in.
        Export und Löschung sind jederzeit möglich.
      </p>

      <h2>Was wir speichern</h2>
      <ul>
        <li>Account- und Workspace-Daten</li>
        <li>Delivery-Signale aus verbundenen Tools — nur soweit ihr sie verbindet</li>
        <li>Nutzungsdaten zur Stabilität der Plattform — permission-aware und zweckgebunden</li>
      </ul>

      <h2>Adaptive Intelligence</h2>
      <p>
        Operational DNA wird als aggregierte, workspace-gebundene Fakten gespeichert (z. B. Entscheidungsmuster) — ohne
        Freitext-Antworten, Namen oder E-Mail-Adressen. Festag trainiert keine öffentlichen Foundation-Modelle auf
        eurem Workspace.
      </p>
      <table>
        <thead>
          <tr>
            <th>Einstellung</th>
            <th>Standard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Adaptive Intelligence im Workspace</td>
            <td>An</td>
          </tr>
          <tr>
            <td>Projektübergreifende Muster</td>
            <td>An</td>
          </tr>
          <tr>
            <td>Persönliche Kunden- und Entwicklerprofile</td>
            <td>Aus (Opt-in)</td>
          </tr>
          <tr>
            <td>Predictive Hints</td>
            <td>An</td>
          </tr>
        </tbody>
      </table>
      <p>
        Alle Einstellungen findet ihr in der App unter Einstellungen → Tagro & Klarheit / Datenschutz. Gespeicherte
        Fakten lassen sich dort einsehen und löschen.
      </p>

      <h2>Diese Website</h2>
      <p>
        Die Marketing-Website setzt keine Tracking- oder Werbe-Cookies. Das Kontaktformular sendet nichts an unsere
        Server — es öffnet eine vorausgefüllte E-Mail in eurem Mailprogramm.
      </p>

      <h2>Kontakt</h2>
      <p>
        Fragen zu Datenschutz und Auskunft: <a href="mailto:privacy@festag.app">privacy@festag.app</a>. Die
        vollständige Datenschutzerklärung mit Liste der Auftragsverarbeiter folgt an dieser Stelle.
      </p>
    </LegalShell>
  );
}
