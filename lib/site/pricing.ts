/**
 * Pricing — spiegelt die App (festag-mvp):
 *  - Pläne pro Workspace: Free und Pro                      → lib/billing/plan.ts
 *  - Pro: 7 € im Monat oder 70 € im Jahr, 14 Tage Test ohne Karte
 *  - Aven-Guthaben pro Monat: Free 1 €, Test 3 €, Pro 6 €; Aufladepakete 5/10/25 € → lib/billing/credits.ts
 *  - Projekte zum Festpreis, bezahlt pro Meilenstein; Add-ons aus lib/addons-catalog.ts
 * Alle Preise in EUR, netto zzgl. USt.
 */

export type PlanCta = { label: string; href: "register" | "sales" | "contact" };

export type Plan = {
  id: string;
  name: string;
  price: string;
  unit?: string;
  tagline: string;
  cta: PlanCta;
  featured?: boolean;
  badge?: string;
  lead?: string;
  features: string[];
};

export const PRO_MONTHLY = 7;
export const PRO_YEARLY = 70;
export const FREE_PROJECT_LIMIT = 3;
export const TRIAL_DAYS = 14;

/** Aven-Guthaben pro Monat in Euro (wie ALLOWANCE in der App) */
export const ALLOWANCE_EUR = { free: 1, trial: 3, pro: 6 } as const;
/** Antworten mit dem mittleren Modell pro Euro Guthaben (App: 1 € ≈ 70 Antworten) */
export const ANSWERS_PER_EUR = 70;

export const creditPacks: { price: number; credits: number; note: string }[] = [
  { price: 5, credits: 5, note: "" },
  { price: 10, credits: 11, note: "+10 %" },
  { price: 25, credits: 30, note: "+20 %" },
];

export const workspacePlans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: "0 €",
    unit: "für immer",
    tagline: "Das Betriebssystem mit Aven im ersten Workspace. Zum Ausprobieren und für erste Projekte.",
    cta: { label: "Kostenlos starten", href: "register" },
    features: [
      `Bis ${FREE_PROJECT_LIMIT} Projekte`,
      "Aven: Vorschläge und Freigabe",
      "Client-Vorschau per Link",
      "1 Automation",
      "Aven-Guthaben: 1 € im Monat",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: `${PRO_MONTHLY} €`,
    unit: "pro Monat, jährlich 70 €",
    tagline: `${TRIAL_DAYS} Tage kostenlos testen, ohne Karte. Monatlich kündbar, im Jahr zwei Monate gratis.`,
    cta: { label: "Pro testen", href: "register" },
    featured: true,
    badge: "Zwei Monate gratis im Jahr",
    lead: "Alles aus Free, plus",
    features: [
      "Unbegrenzt Projekte",
      "Aven ganz automatisch",
      "Coding-Agents: Claude Code, Cursor, Codex",
      "Meilenstein-Rechnungen und Zahlungen",
      "Unbegrenzt Automationen",
      "Aven-Guthaben: 6 € im Monat, aufladbar",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Individuell",
    unit: "jährlich",
    tagline: "Für Organisationen mit eigener Marke, Security-Review und vielen Teams.",
    cta: { label: "Vertrieb kontaktieren", href: "sales" },
    lead: "Alles aus Pro, plus",
    features: [
      "Full White-Label mit eigener Domain",
      "SAML SSO und SCIM",
      "Datenresidenz Deutschland, vertraglich",
      "Security Review, AVV, SLA",
      "Dedizierter Onboarding-Pfad",
    ],
  },
];

export const deliveryPlans: Plan[] = [
  {
    id: "launch",
    name: "Launch",
    price: "ab 1.500 €",
    unit: "Festpreis",
    tagline: "Website, Landingpage oder ein klar umrissenes Tool — schnell und sauber live.",
    cta: { label: "Projekt anfragen", href: "contact" },
    features: [
      "Festpreis, in Meilensteine geteilt",
      "Bezahlung pro Meilenstein nach Abnahme",
      "Client Portal und Aven-Briefings inklusive",
      "Workspace während des Projekts inklusive",
    ],
  },
  {
    id: "product",
    name: "Product",
    price: "ab 5.000 €",
    unit: "Festpreis",
    tagline: "Web-App, Kundenportal oder internes System — mit Design, Backend und Betrieb.",
    cta: { label: "Projekt anfragen", href: "contact" },
    featured: true,
    badge: "Häufigste Wahl",
    lead: "Alles aus Launch, plus",
    features: [
      "Design-System und Komponenten",
      "Backend, API und Integrationen",
      "Entscheidungen mit Optionen und Risiko",
      "Executive Overview für Gründer",
    ],
  },
  {
    id: "platform",
    name: "Platform",
    price: "ab 15.000 €",
    unit: "Festpreis",
    tagline: "SaaS, Plattformen und Produkte, die wachsen sollen — mit Roadmap über Phasen.",
    cta: { label: "Gespräch vereinbaren", href: "contact" },
    lead: "Alles aus Product, plus",
    features: [
      "Mehrphasige Roadmap mit Objectives",
      "Mehrere Teams und Marken",
      "Predictive Hints zu Verzögerung und Scope",
      "Wartung und Software-Pflege optional",
    ],
  },
];

/** Selection from festag-mvp lib/addons-catalog.ts — same names and prices. */
export const addons: { name: string; body: string; price: number; cat: string }[] = [
  { name: "Branding Paket Pro", body: "Logo, Farbpalette, Typografie, Brand Guidelines", price: 1290, cat: "Design" },
  { name: "Design System mit Tokens", body: "Komponenten-Bibliothek, Design-Tokens, Storybook", price: 1890, cat: "Design" },
  { name: "Landingpage Design", body: "Hochkonvertierende Marketing-Page", price: 790, cat: "Design" },
  { name: "Dark-Mode-Theme", body: "Vollständige Dark-Mode-Implementierung", price: 390, cat: "Design" },
  { name: "Auth-Flow Komplett", body: "Login, Register, Reset, OAuth (Google + Apple)", price: 690, cat: "Frontend" },
  { name: "Dashboard mit 5 Widgets", body: "Kunden-Dashboard mit anpassbaren Widgets", price: 890, cat: "Frontend" },
  { name: "PWA-Support", body: "Progressive Web App mit Offline-Modus", price: 590, cat: "Frontend" },
  { name: "REST API mit OpenAPI", body: "Vollständige API mit Swagger-Doku", price: 1190, cat: "Backend" },
  { name: "PDF-Generierung", body: "Rechnungen, Reports, Verträge als PDF", price: 590, cat: "Backend" },
  { name: "AI Chatbot", body: "Custom GPT/Claude für deine Plattform", price: 1190, cat: "AI" },
  { name: "RAG Knowledge Base", body: "Frage-Antwort-System auf eigenen Dokumenten", price: 1390, cat: "AI" },
  { name: "Voice-To-Text", body: "Audio-Transkription mit Whisper", price: 690, cat: "AI" },
];

export type CompareRow = { label: string; values: [string | boolean, string | boolean, string | boolean] };
export type CompareGroup = { group: string; rows: CompareRow[] };

/** Spalten: Free, Pro, Enterprise */
export const compare: CompareGroup[] = [
  {
    group: "Plan",
    rows: [
      { label: "Preis", values: ["0 €", "7 € / Monat", "Individuell"] },
      { label: "Jährlich", values: ["—", "70 € (2 Monate gratis)", "Individuell"] },
      { label: "Test", values: ["—", "14 Tage ohne Karte", "Pilot"] },
      { label: "Projekte", values: ["Bis 3", "Unbegrenzt", "Unbegrenzt"] },
      { label: "Mitglieder und Kunden", values: ["Unbegrenzt", "Unbegrenzt", "Unbegrenzt"] },
    ],
  },
  {
    group: "Aven",
    rows: [
      { label: "Vorschläge und Freigabe", values: [true, true, true] },
      { label: "Ganz automatisch", values: [false, true, true] },
      { label: "Guthaben im Monat", values: ["1 €", "6 €, aufladbar", "Nach Vereinbarung"] },
      { label: "Automationen", values: ["1", "Unbegrenzt", "Unbegrenzt"] },
    ],
  },
  {
    group: "Lieferung",
    rows: [
      { label: "Client-Vorschau per Link", values: [true, true, true] },
      { label: "Coding-Agents (Claude Code, Cursor, Codex)", values: [false, true, true] },
      { label: "Meilenstein-Rechnungen und Zahlungen", values: [false, true, true] },
      { label: "API und Plugin-Token", values: [true, true, true] },
    ],
  },
  {
    group: "Marke und Security",
    rows: [
      { label: "Client Portal", values: ["Festag", "Festag", "Full White-Label"] },
      { label: "Server in Deutschland", values: [true, true, true] },
      { label: "SSO", values: [false, false, "SAML + SCIM"] },
      { label: "AVV, Security Review, SLA", values: [false, false, true] },
    ],
  },
];

export const pricingFaq: { q: string; a: string }[] = [
  {
    q: "Was kostet Festag?",
    a: "Free kostet nichts. Pro kostet 7 € im Monat oder 70 € im Jahr (zwei Monate gratis), pro Workspace und nie pro Person. Dazu kommt das Aven-Guthaben für Antworten, das im Plan enthalten und bei Bedarf aufladbar ist.",
  },
  {
    q: "Was ist das Aven-Guthaben?",
    a: "Jede Antwort von Aven kostet echtes Geld, weil Sprachmodelle pro Token abrechnen. Jeder Plan enthält deshalb ein Monatsguthaben: Free 1 €, Pro 6 €. Ein Euro reicht für etwa 70 Antworten mit dem mittleren Modell. Was aufgebraucht ist, lässt sich mit 5, 10 oder 25 € aufladen. Aufladungen verfallen 12 Monate nicht.",
  },
  {
    q: "Was passiert, wenn das Guthaben leer ist?",
    a: "Festag läuft weiter, nur Aven pausiert bis zum nächsten Monat oder bis zur Aufladung. Ab 70 Prozent Verbrauch zeigt die App einen Hinweis. Pro-Tage sind gedeckelt, damit eine Schleife nicht den ganzen Monat leert.",
  },
  {
    q: "Wie funktioniert der Test?",
    a: "14 Tage Pro, ohne Kreditkarte. Danach wechselt der Workspace zurück auf Free, außer ihr schließt Pro ab.",
  },
  {
    q: "Wie funktionieren die Projektpreise?",
    a: "Festag liefert auch selbst: Websites, Apps und Plattformen zum Festpreis ab 1.500 €. Das Projekt wird in Meilensteine geteilt, jeder Meilenstein wird erst nach eurer Abnahme bezahlt.",
  },
  {
    q: "Was passiert mit unseren Daten?",
    a: "Daten liegen in Deutschland. Festag trainiert keine öffentlichen Modelle auf eurem Workspace. Persönliche Profile sind Opt-in, Export und Löschung jederzeit möglich.",
  },
  {
    q: "Kann ich monatlich kündigen?",
    a: "Ja. Pro ist monatlich kündbar und läuft bis zum Ende des bezahlten Zeitraums. Enterprise wird individuell und jährlich vereinbart.",
  },
];
