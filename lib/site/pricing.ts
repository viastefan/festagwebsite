/**
 * Pricing — mirrors the business rules in festag-mvp:
 *  - first owned workspace is free (Hobby)          → lib/platform/workspace-creation.ts WORKSPACE_PLAN
 *  - every additional workspace: Workspace-Plan €19/month
 *  - project-based software production €1,500 → €15,000+ (docs/festag-master-system-instruction.md §23)
 *  - milestones are paid one by one via Stripe checkout (lib/payments/stripe.ts)
 *  - add-ons + prices from lib/addons-catalog.ts
 *  - partner codes can include workspaces (/redeem)
 * All prices EUR, net of VAT.
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

export const WORKSPACE_PRICE = 19;

export const workspacePlans: Plan[] = [
  {
    id: "hobby",
    name: "Hobby",
    price: "0 €",
    unit: "für immer",
    tagline: "Dein erster Workspace. Für Freelancer, erste Kundenprojekte und zum Ausprobieren.",
    cta: { label: "Kostenlos starten", href: "register" },
    features: [
      "1 Workspace mit eigener Domain",
      "Projekte, Entscheidungen, Aufgaben",
      "Tagro im Workspace",
      "Client Portal für eure Kunden",
      "Connectors: GitHub, Linear, Jira, Slack",
    ],
  },
  {
    id: "workspace",
    name: "Workspace",
    price: `${WORKSPACE_PRICE} €`,
    unit: "pro Workspace / Monat",
    tagline: "Für jeden weiteren Kunden-, Team- oder Produkt-Workspace. Monatlich kündbar.",
    cta: { label: "Workspace hinzufügen", href: "register" },
    featured: true,
    badge: "Kein Preis pro Kopf",
    lead: "Alles aus Hobby, plus",
    features: [
      "Unbegrenzt Mitglieder und Kunden",
      "Delivery-, Teams- oder Agency-Modus",
      "Executive Overview über alle Projekte",
      "Audio-Briefings und Reports mit Freigabe",
      "Adaptive Intelligence (Operational DNA)",
    ],
  },
  {
    id: "partner",
    name: "Partner",
    price: "Inklusive",
    unit: "über Partner-Code",
    tagline: "Kunden unserer Partneragenturen bekommen Workspaces für ihr Team inklusive.",
    cta: { label: "Code einlösen", href: "register" },
    lead: "Alles aus Workspace, plus",
    features: [
      "Bis zu 3 Workspaces inklusive",
      "Direkt mit dem Projekt der Agentur verbunden",
      "Freigaben, Rechnungen, Domains an einem Ort",
      "Ein Ansprechpartner bei der Agentur",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Individuell",
    unit: "jährlich",
    tagline: "Für Organisationen mit eigener Marke, Security-Review und vielen Teams.",
    cta: { label: "Vertrieb kontaktieren", href: "sales" },
    lead: "Alles aus Workspace, plus",
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
      "Client Portal und Tagro-Briefings inklusive",
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

/** Columns: Hobby · Workspace · Enterprise */
export const compare: CompareGroup[] = [
  {
    group: "Workspace",
    rows: [
      { label: "Preis", values: ["0 €", "19 € / Monat", "Individuell"] },
      { label: "Workspaces", values: ["1", "je Workspace", "Unbegrenzt"] },
      { label: "Mitglieder und Kunden", values: ["Unbegrenzt", "Unbegrenzt", "Unbegrenzt"] },
      { label: "Eigene Workspace-Domain", values: [true, true, true] },
      { label: "Modi: Delivery, Teams, Agency", values: ["Delivery", "Alle", "Alle"] },
    ],
  },
  {
    group: "Intelligence",
    rows: [
      { label: "Tagro im Workspace", values: [true, true, true] },
      { label: "Entscheidungen mit Optionen und Risiko", values: [true, true, true] },
      { label: "Reports mit Freigabe vor Versand", values: [true, true, true] },
      { label: "Audio-Briefings mit Transkript", values: [false, true, true] },
      { label: "Executive Overview", values: [false, true, true] },
      { label: "Adaptive Intelligence (Operational DNA)", values: [false, true, true] },
    ],
  },
  {
    group: "Connectors",
    rows: [
      { label: "GitHub, Linear, Jira, Slack", values: [true, true, true] },
      { label: "Chrome Extension", values: [true, true, true] },
      { label: "Cursor Cloud Agent (Beta)", values: [false, true, true] },
    ],
  },
  {
    group: "Marke und Security",
    rows: [
      { label: "Client Portal", values: ["Festag", "Co-branded", "Full White-Label"] },
      { label: "Server in Deutschland", values: [true, true, true] },
      { label: "SSO", values: [false, false, "SAML + SCIM"] },
      { label: "AVV, Security Review, SLA", values: [false, false, true] },
    ],
  },
];

export const pricingFaq: { q: string; a: string }[] = [
  {
    q: "Warum zahlt man pro Workspace und nicht pro Nutzer?",
    a: "Weil Klarheit nicht teurer werden soll, je mehr Menschen sie sehen. Ein Workspace ist ein Kunde, ein Team oder ein Produkt — darin sind Mitglieder und Kunden unbegrenzt.",
  },
  {
    q: "Was ist im kostenlosen Hobby-Workspace enthalten?",
    a: "Dein erster eigener Workspace ist dauerhaft kostenlos: Projekte, Entscheidungen, Tagro, Client Portal und Connectors. Erst ab dem zweiten Workspace greift der Workspace-Plan für 19 € pro Monat.",
  },
  {
    q: "Wie funktionieren die Projektpreise?",
    a: "Festag liefert auch selbst: Websites, Apps und Plattformen zum Festpreis ab 1.500 €. Das Projekt wird in Meilensteine geteilt, jeder Meilenstein wird erst nach eurer Abnahme bezahlt.",
  },
  {
    q: "Was ist ein Partner-Code?",
    a: "Agenturen, die mit Festag arbeiten, können ihren Kunden Workspaces inklusive geben. Den Code löst ihr beim Anlegen des Workspaces ein.",
  },
  {
    q: "Was passiert mit unseren Daten?",
    a: "Daten liegen in Deutschland. Festag trainiert keine öffentlichen Modelle auf eurem Workspace. Persönliche Profile sind Opt-in, Export und Löschung jederzeit möglich.",
  },
  {
    q: "Kann ich monatlich kündigen?",
    a: "Ja. Der Workspace-Plan ist monatlich kündbar. Enterprise wird individuell und jährlich vereinbart.",
  },
];
