import type { Metadata } from "next";
import { CodeTabs } from "../_components/ui/CodeTabs";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  alternates: { canonical: "/developers" },
  title: "API und Plugin",
  description:
    "Die Festag API: Nachrichten per HTTP senden, Aufgaben per MCP-Plugin an Claude Code, Cursor und Codex übergeben. Token, Endpunkte, Fehler.",
};

const BASE = "https://festag.app";

const NAV = [
  { id: "start", label: "Erste Schritte" },
  { id: "auth", label: "Authentifizierung" },
  { id: "inbound", label: "Nachricht senden" },
  { id: "plugin", label: "Plugin (MCP)" },
  { id: "tools", label: "Werkzeuge" },
  { id: "flow", label: "Arbeitsablauf" },
  { id: "rights", label: "Rechte" },
  { id: "errors", label: "Fehler" },
];

const TOOLS: [string, string][] = [
  ["festag_today", "Der Tag: was läuft, was wartet, was ist blockiert."],
  ["festag_next", "Nimmt die nächste bereite Aufgabe und liefert den vollen Brief mit Akzeptanzkriterien."],
  ["festag_list_open", "Offene Aufgaben und Entscheidungen, optional pro Projekt."],
  ["festag_list_projects", "Projekte mit deiner Rolle."],
  ["festag_get_item", "Eine Aufgabe oder Entscheidung mit Brief, Antwort, Links und Dateien."],
  ["festag_start_item", "Meldet, dass die Arbeit an einer Aufgabe beginnt."],
  ["festag_progress", "Fortschritt zu einer Aufgabe nach jedem Schritt."],
  ["festag_log_work", "Erledigte Einheit protokollieren: Commit, Pull Request, Merge, Deploy, Plan, Blocker, Notiz."],
  ["festag_complete_item", "Schließt eine Aufgabe ab, mit Zusammenfassung und Pull-Request-Link als Beleg."],
  ["festag_fail_item", "Meldet, dass eine Aufgabe nicht umsetzbar ist, mit Grund."],
  ["festag_flag_risk", "Markiert ein Risiko, das der Kunde oder das Team sehen soll."],
  ["festag_propose_decision", "Stellt eine Entscheidung zur Wahl, statt zu raten."],
  ["festag_approve_item", "Gibt eine vorbereitete Aufgabe frei (nur mit Berechtigung)."],
  ["festag_send", "Freier Text an Festag. Aven ordnet ihn dem richtigen Projekt zu."],
];

const ERRORS: [string, string, string][] = [
  ["401", "missing_token", "Kein Authorization-Header mit Bearer-Token."],
  ["401", "invalid_token", "Token unbekannt oder widerrufen."],
  ["400", "invalid_json", "Der Body ist kein gültiges JSON-Objekt."],
  ["400", "text_required", "Das Feld text fehlt oder ist kürzer als zwei Zeichen."],
  ["404", "project_not_found", "Kein Zugriff auf dieses Projekt oder es existiert nicht."],
  ["503", "not_configured", "Der Dienst ist gerade nicht erreichbar. Später erneut versuchen."],
];

export default function DevelopersPage() {
  return (
    <div className="dev wrap wrap--wide">
      <aside className="dev-nav" aria-label="Inhalt">
        <div className="dev-nav-in">
          <span className="dev-badge">Developers</span>
          <nav>
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="dev-ext" href={links.app} target="_blank" rel="noreferrer">
            Token erstellen ↗
          </a>
        </div>
      </aside>

      <article className="dev-body">
        <header id="start" className="dev-head">
          <h1 className="display">API und Plugin</h1>
          <p className="lead">
            Festag lässt sich von außen ansprechen: per HTTP-Anfrage, aus Zapier oder Make, oder direkt aus eurem Coding-Agent über das
            Plugin. Aven ordnet ein, bereitet Entscheidungen vor und hält alles in der Historie.
          </p>
          <div className="dev-facts">
            <div>
              <b>Basis</b>
              <code>{BASE}</code>
            </div>
            <div>
              <b>Format</b>
              <code>JSON über HTTPS</code>
            </div>
            <div>
              <b>Auth</b>
              <code>Bearer fst_…</code>
            </div>
          </div>
        </header>

        <section id="auth" className="dev-sec">
          <h2 className="h2">Authentifizierung</h2>
          <p className="body">
            Jede Anfrage trägt ein persönliches Token. Du erstellst es in Festag unter <b>Konnektoren</b>. Es beginnt mit <code>fst_</code>, wird
            einmal angezeigt und nur als SHA-256-Hash gespeichert. Ein Token kann auf ein Projekt begrenzt werden und lässt sich jederzeit
            widerrufen.
          </p>
          <CodeTabs
            tabs={[
              { label: "Header", code: "Authorization: Bearer fst_xxxxxxxxxxxxxxxxxxxxxxxx" },
            ]}
          />
          <p className="small dev-note">Das Token gehört in eine Umgebungsvariable, nie in den Quelltext oder in einen Browser.</p>
        </section>

        <section id="inbound" className="dev-sec">
          <h2 className="h2">Nachricht senden</h2>
          <p className="body">
            <code>POST /api/orchestration/inbound</code> nimmt freien Text an. Aven wählt Projekt und Art (Aufgabe, Entscheidung, Lieferung),
            formuliert, was beim Kunden ankäme, und fragt in der Inbox nach, wenn das Projekt unklar ist.
          </p>
          <CodeTabs
            tabs={[
              {
                label: "curl",
                code: `curl ${BASE}/api/orchestration/inbound \\
  -H "Authorization: Bearer $FESTAG_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Zahlung: Stripe oder Mollie? Bei 600 Bestellungen im Monat.",
    "project": "Nordlicht Checkout"
  }'`,
              },
              {
                label: "JavaScript",
                code: `const res = await fetch("${BASE}/api/orchestration/inbound", {
  method: "POST",
  headers: {
    Authorization: \`Bearer \${process.env.FESTAG_TOKEN}\`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    text: "Zahlung: Stripe oder Mollie? Bei 600 Bestellungen im Monat.",
    project: "Nordlicht Checkout",
  }),
});
const data = await res.json(); // 201: { ok: true, status: "created", item, project, link }`,
              },
              {
                label: "Python",
                code: `import os, requests

res = requests.post(
    "${BASE}/api/orchestration/inbound",
    headers={"Authorization": f"Bearer {os.environ['FESTAG_TOKEN']}"},
    json={
        "text": "Zahlung: Stripe oder Mollie? Bei 600 Bestellungen im Monat.",
        "project": "Nordlicht Checkout",
    },
)
print(res.status_code, res.json())`,
              },
            ]}
          />
          <h3 className="h3 dev-h3">Body</h3>
          <ul className="dev-params">
            <li>
              <code>text</code> <em>Pflicht</em> <span>Der Inhalt als freier Text.</span>
            </li>
            <li>
              <code>project</code> <em>optional</em> <span>Projekt-ID oder Name. Ohne Angabe wählt Aven.</span>
            </li>
            <li>
              <code>attachments</code> <em>optional</em> <span>Liste von URLs, die als Anhang gespeichert werden.</span>
            </li>
          </ul>
          <h3 className="h3 dev-h3">Antwort</h3>
          <p className="body">
            <code>201</code> mit <code>{`status: "created"`}</code>, wenn eine Aufgabe oder Entscheidung angelegt wurde. <code>202</code> mit{" "}
            <code>{`status: "needs_project"`}</code>, wenn mehrere Projekte passen: Aven legt nichts an und listet die Kandidaten, du sendest die Anfrage mit{" "}
            <code>project</code> erneut.
          </p>
          <CodeTabs
            tabs={[
              {
                label: "201 Created",
                code: `{
  "ok": true,
  "status": "created",
  "item": {
    "id": "…",
    "kind": "decision",
    "status": "open",
    "title": "Zahlungsanbieter wählen",
    "waitsForHuman": true
  },
  "project": { "id": "…", "title": "Nordlicht Checkout" },
  "routing": { "reason": "hint", "confidence": 1 },
  "link": "https://festag.app/…",
  "note": "…"
}`,
              },
              {
                label: "202 needs_project",
                code: `{
  "ok": true,
  "status": "needs_project",
  "routing": { "reason": "ambiguous", "confidence": 0.4 },
  "candidates": [{ "id": "…", "title": "Atlas Kundenportal" }, { "id": "…", "title": "Nordlicht Checkout" }],
  "link": "https://festag.app/…",
  "note": "…"
}`,
              },
            ]}
          />
          <p className="small dev-note">Der Endpunkt erlaubt Browser-Anfragen von jeder Herkunft (CORS), nutzt aber ein Token. Sende ihn nur aus eurem Backend.</p>
        </section>

        <section id="plugin" className="dev-sec">
          <h2 className="h2">Plugin (MCP)</h2>
          <p className="body">
            Das Plugin spricht das Model Context Protocol über HTTP. Es läuft ohne Sitzung, Antworten kommen als JSON. Jeder MCP-Host funktioniert:
            Claude Code, Cursor, Codex, Gemini CLI, Windsurf und Copilot. Endpunkt: <code>{BASE}/api/mcp</code>.
          </p>
          <CodeTabs
            tabs={[
              {
                label: "Claude Code",
                code: `claude mcp add --transport http festag ${BASE}/api/mcp \\
  --header "Authorization: Bearer $FESTAG_TOKEN"`,
              },
              {
                label: "Cursor",
                code: `// .cursor/mcp.json
{
  "mcpServers": {
    "festag": {
      "url": "${BASE}/api/mcp",
      "headers": { "Authorization": "Bearer fst_xxxxxxxx" }
    }
  }
}`,
              },
              {
                label: "Allgemein",
                code: `Transport:  Streamable HTTP, ohne Sitzung
URL:        ${BASE}/api/mcp
Header:     Authorization: Bearer fst_xxxxxxxx`,
              },
            ]}
          />
          <p className="small dev-note">Nach dem Verbinden zeigt der Host die Festag-Werkzeuge an. Aven gibt dem Agent zusätzlich eine kurze Arbeitsregel mit.</p>
        </section>

        <section id="tools" className="dev-sec">
          <h2 className="h2">Werkzeuge</h2>
          <p className="body">Diese Werkzeuge stellt das Plugin bereit.</p>
          <ul className="dev-tools">
            {TOOLS.map(([n, d]) => (
              <li key={n}>
                <code>{n}</code>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="flow" className="dev-sec">
          <h2 className="h2">Arbeitsablauf</h2>
          <p className="body">So arbeitet ein Agent mit Festag, von der Entscheidung bis zum Beleg.</p>
          <ol className="dev-steps">
            <li>
              <b>Tag lesen.</b> <code>festag_today</code> zeigt, was zählt.
            </li>
            <li>
              <b>Aufgabe nehmen.</b> <code>festag_next</code> liefert den Brief. Offene Fragen kommen als Entscheidung über{" "}
              <code>festag_propose_decision</code>, nicht als Vermutung.
            </li>
            <li>
              <b>Beginnen und melden.</b> <code>festag_start_item</code>, danach <code>festag_progress</code> nach jedem Schritt und{" "}
              <code>festag_log_work</code> für Commits und Pull Requests.
            </li>
            <li>
              <b>Abschließen mit Beleg.</b> <code>festag_complete_item</code> mit Zusammenfassung und Pull-Request-Link. Aven prüft den Beleg und
              schreibt das Update für den Kunden.
            </li>
          </ol>
          <p className="small dev-note">Nichts erreicht den Kunden, bevor jemand aus eurem Team es freigegeben hat, außer das Projekt ist ausdrücklich auf automatisch gestellt.</p>
        </section>

        <section id="rights" className="dev-sec">
          <h2 className="h2">Rechte</h2>
          <p className="body">
            Pro Verbindung lässt sich einstellen, was Festag darf, zum Beispiel „Claude Code darf keine Risiken melden“. Das gilt für jedes Werkzeug und
            wird am Token gespeichert. Gesperrte Werkzeuge lehnt der Endpunkt ab. Der Modus pro Projekt (manuell, Freigabe, automatisch) bestimmt
            zusätzlich, was ohne eure Freigabe losläuft.
          </p>
        </section>

        <section id="errors" className="dev-sec">
          <h2 className="h2">Fehler</h2>
          <div className="dev-table">
            <div className="dev-tr dev-th">
              <span>Status</span>
              <span>Code</span>
              <span>Bedeutung</span>
            </div>
            {ERRORS.map(([s, c, d]) => (
              <div key={c} className="dev-tr">
                <span>{s}</span>
                <code>{c}</code>
                <span>{d}</span>
              </div>
            ))}
          </div>
          <p className="body" style={{ marginTop: 18 }}>
            Fehler kommen als <code>{`{ "ok": false, "error": "…" }`}</code>. Fragen oder Wünsche zur API: <a href="mailto:support@festag.app">support@festag.app</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
