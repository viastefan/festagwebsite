/**
 * Editorial content shared across pages: voices, changelog, principles.
 *
 * NOTE on `voices`: these are illustrative early-access statements attributed
 * to roles, not to named customers. Replace with real, approved customer
 * quotes (name, company, consent) before a public launch.
 */

export type Voice = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const voices: Voice[] = [
  {
    quote:
      "Früher haben wir jede Woche Status zusammengebaut. Jetzt öffnet der Kunde das Portal und sieht, was wirklich läuft — mit Beleg.",
    name: "Agency Lead",
    role: "Digitalagentur, 24 Personen · Early Access",
    initials: "AL",
  },
  {
    quote:
      "Tagro sagt nicht „alles gut“. Es sagt: Der Login-Meilenstein ist gefährdet, drei Tasks hängen am API-Zugang, Entscheidung bis heute. Das ist der Unterschied.",
    name: "Engineering Manager",
    role: "SaaS-Team, 11 Entwickler · Early Access",
    initials: "EM",
  },
  {
    quote:
      "Ich sehe neun Projekte auf einer Seite. Was läuft, was blockiert, wo ich entscheiden muss. Vorher: neun Slack-Kanäle.",
    name: "Gründerin & CEO",
    role: "Software-Studio · Early Access",
    initials: "CE",
  },
  {
    quote:
      "Wir haben Festag nicht gekauft, weil es KI hat. Wir haben es gekauft, weil unsere Kunden aufgehört haben zu fragen, ob wir noch im Plan sind.",
    name: "Managing Partner",
    role: "Beratung & Implementierung · Early Access",
    initials: "MP",
  },
  {
    quote:
      "Die Übersetzung ist das Produkt. „OAuth-Callback kaputt, PR pending“ wird zu einem Satz, den unser Kunde versteht — ohne dass wir ihn schreiben.",
    name: "Tech Lead",
    role: "Web-Studio, 8 Personen · Early Access",
    initials: "TL",
  },
  {
    quote:
      "Keine Überwachung, keine Screenshots. Nur Signale, die ohnehin entstehen. Das Team hat es deshalb akzeptiert.",
    name: "Head of Operations",
    role: "Agentur-Gruppe, 3 Marken · Early Access",
    initials: "HO",
  },
];

/**
 * Changelog entries mirror features documented in docs/ (V2 connectors,
 * Executive, Objectives, OKM persistence, Cursor worker). Version numbers and
 * dates are editorial — align them with real release dates before launch.
 */
export type ChangelogEntry = {
  date: string; // ISO
  version: string;
  title: string;
  body: string;
  tags: string[];
  art: "connectors" | "executive" | "tagro" | "okm" | "extension" | "cursor" | "audio" | "objectives";
  highlights: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-10-02",
    version: "2.6",
    title: "Adaptive Intelligence: Operational DNA ist persistent",
    body: "Entscheidungsmuster werden als workspace-gebundene OKM-Fakten gespeichert — aggregiert, ohne Namen oder Freitext. Tagro nutzt bis zu zehn Fakten mit höchster Konfidenz im Kontext.",
    tags: ["Intelligence", "Datenschutz"],
    art: "okm",
    highlights: [
      "Decisions → Decision-, Quality- und Delivery-DNA auf /decide, /delegate und /apply",
      "Tagro nutzt bis zu zehn Fakten mit höchster Konfidenz im Kontext",
      "Neue Übersicht gespeicherter Fakten unter Einstellungen → Tagro & Klarheit, inklusive Löschen",
      "Persönliche Profile bleiben standardmäßig aus (Opt-in)",
    ],
  },
  {
    date: "2026-09-18",
    version: "2.5",
    title: "Executive Overview: Portfolio-Health mit Forecast",
    body: "Führung sieht alle Projekte auf einer Seite: Health Score, offene Entscheidungen, Risiken und erwartete Verschiebung — mit Begründung pro Zeile.",
    tags: ["Executive"],
    art: "executive",
    highlights: [
      "Health Score pro Projekt mit Begründung",
      "Offene Entscheidungen und Risiken portfolioweit",
      "Forecast: erwartete Verschiebung in Tagen",
      "Wöchentliches Executive Briefing als Audio",
    ],
  },
  {
    date: "2026-09-04",
    version: "2.4",
    title: "Tagro delegiert an Cursor Cloud Agents (Beta)",
    body: "Klar umrissene Dev-Tasks können aus Tagro an einen Cursor Cloud Agent übergeben werden. Der PR kommt als Signal zurück ins Projekt — nie ohne Review.",
    tags: ["Execution", "Beta"],
    art: "cursor",
    highlights: [
      "Delegation nur nach expliziter Freigabe",
      "PR des Agents erscheint als Signal im Projekt",
      "Review-Pflicht vor Merge bleibt bestehen",
    ],
  },
  {
    date: "2026-08-21",
    version: "2.3",
    title: "Objectives: Arbeit mit dem Warum verbinden",
    body: "Projekte und Issues lassen sich strategischen Zielen zuordnen. Tagro erklärt Fortschritt und Risiko jetzt im Kontext des Ziels, nicht nur des Tickets.",
    tags: ["Produkt"],
    art: "objectives",
    highlights: [
      "Objectives unter /objectives",
      "Issues und Projekte mit Zielen verknüpfen",
      "Tagro begründet Prioritäten mit dem Objective",
    ],
  },
  {
    date: "2026-08-07",
    version: "2.2",
    title: "Audio-Briefings mit Transkript",
    body: "Wöchentliche Briefings als ruhige Audio-Zusammenfassung — für Kunden, die lieber hören. Jedes Audio hat ein Transkript und nennt Quellen.",
    tags: ["Client Panel"],
    art: "audio",
    highlights: [
      "Audio-Briefing pro Woche und Projekt",
      "Transkript mit Quellenangaben",
      "Abspielbar direkt im Client Panel",
    ],
  },
  {
    date: "2026-07-17",
    version: "2.1",
    title: "Chrome Extension: Signale im Browser erfassen",
    body: "Status-Notes, Entscheidungen und Screenshots als Evidence — direkt aus Slack Web, Jira oder jeder Seite, ohne Kontextwechsel.",
    tags: ["Capture"],
    art: "extension",
    highlights: [
      "Status-Note, Entscheidung, Evidence als drei Aktionen",
      "Kontext der aktuellen Seite wird vorgeschlagen, nie automatisch gesendet",
      "Tastenkürzel ⌘⇧F",
    ],
  },
  {
    date: "2026-06-26",
    version: "2.0",
    title: "Festag V2: Connectors, Issues, Activity Intelligence",
    body: "GitHub, Linear, Jira und Slack liefern Signale. Issues sind eine eigene operative Entität. Activity vereint Arbeitssignale, Issues und Ereignisse auf einer Seite.",
    tags: ["Connectors", "Release"],
    art: "connectors",
    highlights: [
      "Connectors für GitHub, Linear, Jira und Slack",
      "Issues als eigene operative Entität",
      "Activity Intelligence auf /activity",
      "Executive-Ansicht (Vorschau)",
    ],
  },
  {
    date: "2026-06-05",
    version: "1.9",
    title: "Tagro Decision Mode",
    body: "Tagro beantwortet Entscheidungsfragen mit Optionen, Risiko-Delta und Empfehlung — und schreibt die getroffene Entscheidung mit Begründung ins Projekt.",
    tags: ["Tagro"],
    art: "tagro",
    highlights: [
      "Optionen mit Risiko-Delta",
      "Empfehlung mit Begründung",
      "Entscheidung wird mit Begründung im Projekt gespeichert",
    ],
  },
];

export const clientQuestions = [
  "Was ist wirklich fertig?",
  "Was ist noch offen?",
  "Was blockiert das Projekt?",
  "Wo braucht es meine Entscheidung?",
  "Sind wir noch im Plan?",
  "Warum hat das länger gedauert?",
  "Was passiert als Nächstes?",
  "Ist das Fortschritt — oder nur Aktivität?",
];

export const principles = [
  { title: "Klarheit für Kunden vor interner Flexibilität", body: "Jede Funktion muss die Frage beantworten: Versteht der Kunde das Projekt dadurch besser?" },
  { title: "Übersetzung vor Dokumentation", body: "Niemand muss alles aufschreiben. Festag liest, was ohnehin entsteht — und macht es verständlich." },
  { title: "Status mit Beleg", body: "Jede Aussage hat eine Quelle: ein PR, ein Issue, ein Thread, eine Datei. Tagro nennt sie immer." },
  { title: "Keine Überwachung", body: "Keine Screenshots, kein Tracking, keine Personen-Scores. Signale, nicht Menschen." },
  { title: "Ruhig, präzise, premium", body: "Keine Hype-Sprache, keine Partikel, keine KI-Lila-Verläufe. Ein System, kein Spielzeug." },
  { title: "System, nicht Tool", body: "Festag ersetzt nichts. Es sitzt über eurem Stack und wird mit jedem Projekt klüger." },
];
