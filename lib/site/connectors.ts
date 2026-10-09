/**
 * Connectors — the systems Festag reads work signals from.
 * Festag sits above these tools. It never replaces their workflows.
 * Status mirrors the product roadmap in docs/festag-product-north-star.md.
 */

export type ConnectorStatus = "live" | "beta" | "soon";

export type ConnectorIcon =
  | "github"
  | "slack"
  | "linear"
  | "jira"
  | "notion"
  | "figma"
  | "gmail"
  | "drive"
  | "calendar"
  | "meet"
  | "cursor"
  | "chrome";

export type Connector = {
  id: ConnectorIcon;
  name: string;
  category: "Code" | "Tasks" | "Kommunikation" | "Dokumente" | "Design" | "Execution" | "Capture";
  status: ConnectorStatus;
  short: string;
  signals: string[];
  never: string;
};

export const CONNECTOR_STATUS_LABEL: Record<ConnectorStatus, string> = {
  live: "Live",
  beta: "Beta",
  soon: "Bald",
};

export const connectors: Connector[] = [
  {
    id: "github",
    name: "GitHub",
    category: "Code",
    status: "live",
    short: "Pull Requests, Reviews, Merges und Deployments werden zu Fortschritt mit Beleg.",
    signals: ["PR geöffnet / gemerged", "Review angefragt", "Deployment abgeschlossen", "Issue geschlossen"],
    never: "Schreibt keinen Code, ändert keine Branches.",
  },
  {
    id: "linear",
    name: "Linear",
    category: "Tasks",
    status: "live",
    short: "Issues, Cycles und Projekt-Status fließen als Arbeitssignale in Festag.",
    signals: ["Issue-Status geändert", "Cycle abgeschlossen", "Blocker markiert", "Priorität geändert"],
    never: "Ersetzt keine Boards, erzeugt keine doppelten Tasks.",
  },
  {
    id: "jira",
    name: "Jira",
    category: "Tasks",
    status: "live",
    short: "Epics, Sprints und Transitions — übersetzt in Status, den Kunden verstehen.",
    signals: ["Transition", "Sprint-Ende", "Scope-Änderung", "Bug mit Priorität"],
    never: "Kein Workflow-Umbau, keine neuen Pflichtfelder.",
  },
  {
    id: "slack",
    name: "Slack",
    category: "Kommunikation",
    status: "live",
    short: "Risiken, Entscheidungen und Freigaben, die in Threads entstehen — erkannt, nicht mitgelesen.",
    signals: ["Risiko im Thread erkannt", "Entscheidung angefragt", "Freigabe erteilt", "Status-Note"],
    never: "Kein Mitlesen privater DMs. Nur verbundene Kanäle, nur Aggregate.",
  },
  {
    id: "notion",
    name: "Notion",
    category: "Dokumente",
    status: "soon",
    short: "Spezifikationen und Entscheidungs-Docs als Kontext für Tagro.",
    signals: ["Seite aktualisiert", "Spec geändert", "Entscheidung dokumentiert"],
    never: "Bleibt euer Workspace. Festag organisiert ihn nicht um.",
  },
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    status: "soon",
    short: "Design-Updates und gelöste Kommentare werden zu Fortschritt für Kunden.",
    signals: ["Kommentar gelöst", "Design aktualisiert", "Freigabe-Frame markiert"],
    never: "Kein Zugriff auf Dateien außerhalb des Projekts.",
  },
  {
    id: "gmail",
    name: "Gmail",
    category: "Kommunikation",
    status: "soon",
    short: "Kundenanfragen und Scope-Änderungen per Mail landen als Signal im Projekt.",
    signals: ["Änderungswunsch", "Freigabe per Mail", "Rückfrage des Kunden"],
    never: "Nur projektbezogene Labels, keine Postfach-Volltexte.",
  },
  {
    id: "drive",
    name: "Google Drive",
    category: "Dokumente",
    status: "soon",
    short: "Dateien, Nachweise und Lieferobjekte als Evidence im Client Panel.",
    signals: ["Datei hochgeladen", "Dokument geteilt", "Version aktualisiert"],
    never: "Keine Synchronisation ganzer Laufwerke.",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    category: "Kommunikation",
    status: "soon",
    short: "Deadlines, Meilensteine und Review-Termine im Projekt-Timeline-Kontext.",
    signals: ["Deadline verschoben", "Review-Termin", "Abnahme geplant"],
    never: "Keine Teilnehmer-Analyse, keine Verfügbarkeits-Scores.",
  },
  {
    id: "meet",
    name: "Meeting-Transkripte",
    category: "Kommunikation",
    status: "soon",
    short: "Entscheidungen und Next Steps aus Meetings — als Signal, nicht als Protokoll.",
    signals: ["Entscheidung getroffen", "Next Step vereinbart", "Risiko benannt"],
    never: "Kein Stimmungs-Scoring, keine Personenprofile.",
  },
  {
    id: "cursor",
    name: "Cursor Cloud Agent",
    category: "Execution",
    status: "beta",
    short: "Tagro delegiert klar umrissene Dev-Tasks an Cursor Cloud Agents — mit Rückmeldung ins Projekt.",
    signals: ["Task delegiert", "PR vom Agent geöffnet", "Review nötig"],
    never: "Nie ohne Freigabe. Nie ohne Review.",
  },
  {
    id: "chrome",
    name: "Chrome Extension",
    category: "Capture",
    status: "live",
    short: "Status, Entscheidungen und Notizen dort erfassen, wo ihr arbeitet — im Browser.",
    signals: ["Status-Note", "Entscheidung angefragt", "Screenshot als Evidence"],
    never: "Kein Tracking von Tabs oder Seiten. Nur, was ihr aktiv sendet.",
  },
];

export const liveConnectors = connectors.filter((c) => c.status !== "soon");

/** Work-signal taxonomy — what every signal becomes before it becomes anything else. */
export const signalTypes: { id: string; label: string; example: string; tone: "ok" | "warn" | "risk" | "neutral" }[] = [
  { id: "progress", label: "Fortschritt", example: "PR #412 gemerged — Checkout-Flow ist auf Staging.", tone: "ok" },
  { id: "blocker", label: "Blocker", example: "API-Zugang des Kunden fehlt seit 3 Tagen.", tone: "risk" },
  { id: "risk", label: "Risiko", example: "Design-Freigabe offen — Launch-Termin gefährdet.", tone: "risk" },
  { id: "decision", label: "Entscheidung nötig", example: "Zahlungsanbieter: Stripe oder Adyen?", tone: "warn" },
  { id: "approval", label: "Freigabe nötig", example: "Landingpage v3 wartet auf Kundenfreigabe.", tone: "warn" },
  { id: "scope", label: "Scope-Änderung", example: "Kunde wünscht zusätzlich Mehrsprachigkeit.", tone: "warn" },
  { id: "quality", label: "Qualitätsproblem", example: "3 Bugs mit Priorität hoch nach Review.", tone: "risk" },
  { id: "delay", label: "Verzögerung", example: "Meilenstein Login verschiebt sich um 3–5 Tage.", tone: "risk" },
  { id: "next", label: "Nächster Schritt", example: "Nach Freigabe: Deployment auf Produktion.", tone: "neutral" },
  { id: "noise", label: "Internes Rauschen", example: "Thread über Lint-Regeln — nicht kundenrelevant.", tone: "neutral" },
  { id: "client", label: "Kundenrelevantes Update", example: "Dashboard-Modul ist abnahmebereit.", tone: "ok" },
];
