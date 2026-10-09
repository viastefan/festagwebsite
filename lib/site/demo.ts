/**
 * Scripted data for the interactive product demos on the marketing site.
 * Nothing here talks to the real app — the demos are honest simulations of
 * how Festag surfaces work signals, decisions and briefings.
 */

export type DemoTone = "ok" | "warn" | "risk" | "neutral";

export type DemoProject = {
  id: string;
  name: string;
  client: string;
  phase: string;
  health: number; // 0–100
  tone: DemoTone;
  open: number;
  decisions: number;
  next: string;
  updated: string;
};

export const demoProjects: DemoProject[] = [
  { id: "nordlicht", name: "Nordlicht Checkout", client: "Nordlicht GmbH", phase: "Build", health: 82, tone: "ok", open: 7, decisions: 1, next: "Staging-Abnahme Donnerstag", updated: "vor 4 Min" },
  { id: "atlas", name: "Atlas Kundenportal", client: "Atlas Logistik", phase: "Design → Build", health: 58, tone: "risk", open: 12, decisions: 2, next: "Design-Freigabe offen", updated: "vor 11 Min" },
  { id: "meridian", name: "Meridian Relaunch", client: "Meridian Hotels", phase: "QA", health: 91, tone: "ok", open: 3, decisions: 0, next: "Go-Live 14. Okt", updated: "vor 26 Min" },
  { id: "kontor", name: "Kontor App v2", client: "Kontor Energie", phase: "Discovery", health: 70, tone: "warn", open: 5, decisions: 1, next: "Scope-Workshop", updated: "Heute, 09:12" },
  { id: "velo", name: "Velo Kampagne Q4", client: "Velo Mobility", phase: "Produktion", health: 76, tone: "ok", open: 9, decisions: 0, next: "Assets an Kunde", updated: "Gestern" },
];

export type DemoSignal = {
  id: string;
  source: "github" | "linear" | "jira" | "slack" | "figma" | "chrome";
  raw: string;
  meaning: string;
  type: string;
  tone: DemoTone;
  project: string;
};

export const demoSignals: DemoSignal[] = [
  { id: "s1", source: "github", raw: "PR #412 merged: checkout-flow → main", meaning: "Checkout-Flow ist auf Staging. Abnahmebereit.", type: "Fortschritt", tone: "ok", project: "Nordlicht Checkout" },
  { id: "s2", source: "slack", raw: "#atlas: „API-Keys vom Kunden immer noch nicht da…“", meaning: "Blocker: API-Zugang fehlt seit 3 Tagen.", type: "Blocker", tone: "risk", project: "Atlas Kundenportal" },
  { id: "s3", source: "linear", raw: "ATL-88 moved to Blocked by @mara", meaning: "Drei Tasks hängen am API-Zugang.", type: "Risiko", tone: "risk", project: "Atlas Kundenportal" },
  { id: "s4", source: "jira", raw: "MER-301 → Done · Sprint 14 closed", meaning: "QA-Sprint abgeschlossen. Go-Live bleibt 14. Okt.", type: "Fortschritt", tone: "ok", project: "Meridian Relaunch" },
  { id: "s5", source: "figma", raw: "Comment resolved: „Hero v3 final?“", meaning: "Design-Freigabe steht aus — Entscheidung des Kunden nötig.", type: "Entscheidung nötig", tone: "warn", project: "Atlas Kundenportal" },
  { id: "s6", source: "chrome", raw: "Status-Note: Scope-Workshop verschoben auf Fr.", meaning: "Discovery-Phase verlängert sich um 2 Tage.", type: "Verzögerung", tone: "warn", project: "Kontor App v2" },
  { id: "s7", source: "github", raw: "Deploy preview ready: velo-q4 #58", meaning: "Kampagnen-Landingpage ist für den Kunden sichtbar.", type: "Kundenrelevant", tone: "ok", project: "Velo Kampagne Q4" },
];

export type DemoDecision = {
  id: string;
  project: string;
  question: string;
  context: string;
  options: { id: string; label: string; impact: string; recommended?: boolean }[];
  due: string;
  outcome: Record<string, string>;
};

export const demoDecisions: DemoDecision[] = [
  {
    id: "d1",
    project: "Atlas Kundenportal",
    question: "Launch um eine Woche verschieben?",
    context: "Zwei kritische Abhängigkeiten sind offen, der Kunde hat Freigabe erst für Freitag signalisiert. Drei Tasks hängen am fehlenden API-Zugang.",
    options: [
      { id: "shift", label: "Eine Woche verschieben", impact: "Risiko −42 % · Scope stabil", recommended: true },
      { id: "keep", label: "Wie geplant weiter", impact: "Freigabe-Risiko hoch · Nachtarbeit wahrscheinlich" },
      { id: "cut", label: "Scope reduzieren", impact: "Termin hält · Portal ohne Export-Modul" },
    ],
    due: "Heute, 17:00",
    outcome: {
      shift: "Entschieden: Launch auf 21. Okt. Tagro informiert den Kunden mit Begründung und aktualisiert die Timeline. Risiko-Score sinkt von 58 auf 81.",
      keep: "Entschieden: Termin bleibt. Tagro markiert das Freigabe-Risiko als akzeptiert und legt einen Checkpoint für Mittwoch an.",
      cut: "Entschieden: Export-Modul in Phase 2. Tagro schlägt dem Kunden eine Scope-Vereinbarung zur Freigabe vor.",
    },
  },
  {
    id: "d2",
    project: "Nordlicht Checkout",
    question: "Zahlungsanbieter: Stripe oder Adyen?",
    context: "Stripe ist in 2 Tagen integriert, Adyen braucht 1,5 Wochen, bietet aber Rechnungskauf. Der Kunde hat Rechnungskauf nicht priorisiert.",
    options: [
      { id: "stripe", label: "Stripe", impact: "+2 Tage · Rechnungskauf später", recommended: true },
      { id: "adyen", label: "Adyen", impact: "+8 Tage · Rechnungskauf sofort" },
    ],
    due: "Morgen",
    outcome: {
      stripe: "Entschieden: Stripe. Tagro schreibt die Entscheidung mit Begründung ins Projekt und legt „Rechnungskauf“ als Phase-2-Objective an.",
      adyen: "Entschieden: Adyen. Tagro verschiebt den Staging-Termin um 8 Tage und informiert den Kunden über den Grund.",
    },
  },
];

export const demoBriefing = {
  project: "Atlas Kundenportal",
  week: "KW 41",
  summary:
    "Das Portal ist in der Build-Phase. Das Dashboard-Modul ist abnahmebereit. Ein offener API-Zugang blockiert drei Aufgaben und gefährdet den Login-Meilenstein. Wenn die Entscheidung heute fällt, bleibt der Launch mit einer Woche Verschiebung stabil.",
  done: ["Dashboard-Modul auf Staging", "Rollen & Rechte abgenommen", "Design-System v2 integriert"],
  open: ["API-Zugang des Kunden (Blocker)", "Design-Freigabe Hero v3", "Export-Modul, Phase 2"],
  decision: "Launch um eine Woche verschieben — empfohlen.",
  sources: ["GitHub PR #398, #402", "Linear ATL-81…ATL-88", "Slack #atlas, 3 Threads", "Figma, 2 gelöste Kommentare"],
};

/** Raw → client translation examples for the Client Portal demo. */
export const demoTranslations: { raw: string; client: string; source: string }[] = [
  {
    raw: "API is mostly done, OAuth callback still broken, PR pending review.",
    client:
      "Die Kern-API ist weit fortgeschritten und kurz vor dem Abschluss. Ein technisches Detail beim Login muss noch geprüft werden, bevor dieser Teil als fertig gilt. Keine Auswirkung auf den Zeitplan.",
    source: "GitHub PR #402 · Slack #backend",
  },
  {
    raw: "Staging ist down weil die ENV vars nach dem Rotate nicht gesetzt waren, fixen wir heute.",
    client:
      "Die Testumgebung war heute kurz nicht erreichbar. Die Ursache ist bekannt und wird heute behoben. Die geplante Abnahme am Donnerstag bleibt bestehen.",
    source: "Slack #ops · Linear NOR-77",
  },
  {
    raw: "Designer hat Hero v3 hochgeladen, aber Kunde hat seit Montag nicht reagiert, wir können ohne das nicht weiter.",
    client:
      "Die neue Startseiten-Variante liegt zur Freigabe bereit. Für den nächsten Schritt brauchen wir Ihre Entscheidung — am besten bis Freitag, damit der Zeitplan hält.",
    source: "Figma Kommentar · Slack #atlas",
  },
];

/** Tagro console — scripted answers for the typeable demo. */
export type TagroAnswer = {
  keys: string[];
  summary: string;
  context: string;
  recommendation: string;
  next: string;
  sources: string[];
  options?: { label: string; impact: string; recommended?: boolean }[];
};

export const tagroAnswers: TagroAnswer[] = [
  {
    keys: ["launch", "verschieb", "termin", "deadline", "woche"],
    summary: "Der Launch von Atlas ist gefährdet. Empfehlung: eine Woche verschieben.",
    context: "Drei Tasks hängen am fehlenden API-Zugang (seit 3 Tagen). Die Design-Freigabe für Hero v3 ist offen. Der Kunde hat Freigabe erst für Freitag signalisiert.",
    recommendation: "Eine Woche verschieben hält den Scope stabil und senkt das Risiko messbar (−42 %). Scope zu kürzen wäre die zweitbeste Option.",
    next: "Entscheidung heute bis 17:00 — danach kann ich den Kunden mit Begründung informieren und die Timeline anpassen.",
    sources: ["Linear ATL-86, ATL-87, ATL-88", "Slack #atlas, 2 Threads", "Figma Kommentar Hero v3"],
    options: [
      { label: "Eine Woche verschieben", impact: "Risiko −42 %", recommended: true },
      { label: "Scope reduzieren", impact: "Termin hält" },
      { label: "Wie geplant", impact: "Risiko hoch" },
    ],
  },
  {
    keys: ["block", "hängt", "offen", "warum", "stock"],
    summary: "Ein Blocker: Der API-Zugang des Kunden fehlt seit 3 Tagen.",
    context: "Mara hat ATL-88 auf „Blocked“ gesetzt. Zwei weitere Tasks (ATL-86, ATL-87) sind davon abhängig. Im Slack-Thread vom Montag wurde der Zugang zugesagt, aber nicht geliefert.",
    recommendation: "Den Kunden heute ruhig und konkret erinnern — mit dem Hinweis, dass der Login-Meilenstein sonst 3–5 Tage rutscht.",
    next: "Ich kann den Erinnerungstext für das Client Panel vorbereiten. Du gibst ihn frei, bevor er rausgeht.",
    sources: ["Linear ATL-86…ATL-88", "Slack #atlas, Thread Mo 10:14"],
  },
  {
    keys: ["risiko", "risk", "gefahr", "kritisch"],
    summary: "Zwei Risiken im Portfolio, eines kritisch.",
    context: "Atlas: Login-Meilenstein gefährdet (API-Zugang). Kontor: Discovery verlängert sich um 2 Tage — der Scope-Workshop wurde verschoben. Nordlicht, Meridian und Velo sind im Plan.",
    recommendation: "Atlas braucht heute eine Entscheidung. Kontor braucht keine — die Verzögerung ist absorbierbar.",
    next: "Soll ich für Atlas eine Entscheidungsvorlage anlegen?",
    sources: ["Executive Overview, 5 Projekte", "Linear, Jira, Slack — letzte 72 h"],
  },
  {
    keys: ["fertig", "done", "erledigt", "fortschritt", "status", "läuft", "stand"],
    summary: "Vier Dinge sind diese Woche abgeschlossen, zwei davon kundenrelevant.",
    context: "Nordlicht: Checkout-Flow auf Staging (PR #412). Meridian: QA-Sprint 14 abgeschlossen, Go-Live bleibt 14. Okt. Atlas: Dashboard-Modul abnahmebereit. Velo: Landingpage-Preview sichtbar.",
    recommendation: "Nordlicht und Atlas sollten die Abnahmen im Client Panel freigegeben bekommen — beide sind belegt.",
    next: "Ich bereite die zwei Client-Updates vor. Freigabe durch dich, dann sehen die Kunden sie.",
    sources: ["GitHub PR #412, Preview #58", "Jira MER-301", "Linear ATL-79"],
  },
  {
    keys: ["kunde", "client", "portal", "erklär", "übersetz"],
    summary: "So würde ich es dem Kunden erklären:",
    context: "„Das Dashboard-Modul ist abnahmebereit. Für den Login-Bereich brauchen wir noch Ihren API-Zugang — ohne ihn verschiebt sich dieser Meilenstein um 3–5 Tage. Alles andere läuft im Plan.“",
    recommendation: "Kurz, konkret, ohne Technik-Vokabular — und mit einem klaren Ask.",
    next: "Soll ich das als Update ins Client Panel legen? Du siehst es vorher.",
    sources: ["Communication DNA: Kunde bevorzugt kurze Updates", "Linear ATL-88"],
  },
  {
    keys: ["stripe", "adyen", "zahlung", "payment", "anbieter"],
    summary: "Stripe — wenn Rechnungskauf nicht in Phase 1 muss.",
    context: "Stripe ist in 2 Tagen integriert. Adyen braucht rund 1,5 Wochen, bietet aber Rechnungskauf. Der Kunde hat Rechnungskauf im Kickoff nicht priorisiert.",
    recommendation: "Stripe jetzt, Rechnungskauf als Objective für Phase 2. Das hält den Staging-Termin.",
    next: "Ich schreibe die Entscheidung mit Begründung ins Projekt, sobald du sie triffst.",
    sources: ["Kickoff-Transkript 12. Sep", "Linear NOR-61", "Decision DNA: Team bevorzugt Speed für MVPs"],
    options: [
      { label: "Stripe", impact: "+2 Tage", recommended: true },
      { label: "Adyen", impact: "+8 Tage" },
    ],
  },
];

export const tagroFallback: TagroAnswer = {
  keys: [],
  summary: "Dazu habe ich im Workspace noch kein belastbares Signal.",
  context: "Ich antworte nur mit Quelle. Für diese Frage finde ich in GitHub, Linear, Jira und Slack der letzten 14 Tage nichts Eindeutiges.",
  recommendation: "Frag mich nach Status, Risiken, Blockern, Entscheidungen oder wie ich etwas dem Kunden erklären würde.",
  next: "Oder verbinde ein weiteres Tool — dann sehe ich mehr.",
  sources: ["Workspace Atlas · letzte 14 Tage"],
};

export const tagroSuggestions = [
  "Sollen wir den Launch verschieben?",
  "Was blockiert Atlas gerade?",
  "Welche Risiken gibt es im Portfolio?",
  "Was ist diese Woche fertig geworden?",
  "Wie erkläre ich das dem Kunden?",
  "Stripe oder Adyen?",
];
