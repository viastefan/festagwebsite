/**
 * Pricing — single source of truth for /pricing and the home teaser.
 *
 * NOTE: Amounts are launch placeholders. Change them here only; every surface
 * reads from this file. Prices are per user per month, EUR, net of VAT.
 */

export type PlanId = "starter" | "team" | "organization" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: number | null; // null → custom
  yearly: number | null; // per month, billed yearly
  note: string;
  cta: { label: string; href: "register" | "sales" };
  featured?: boolean;
  badge?: string;
  features: { label: string; muted?: boolean }[];
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Für Freelancer und das erste Kundenprojekt.",
    monthly: 0,
    yearly: 0,
    note: "Kostenlos. Keine Kreditkarte.",
    cta: { label: "Kostenlos starten", href: "register" },
    features: [
      { label: "1 Workspace, 2 aktive Projekte" },
      { label: "2 Connectors (z. B. GitHub + Slack)" },
      { label: "Tagro Briefings, 20 pro Monat" },
      { label: "Client Panel, Festag-branded" },
      { label: "Entscheidungen & Risiken" },
      { label: "Executive Overview", muted: true },
      { label: "White-Label", muted: true },
    ],
  },
  {
    id: "team",
    name: "Team",
    tagline: "Für Agenturen und Software-Teams, die Kunden Klarheit liefern.",
    monthly: 29,
    yearly: 24,
    note: "pro Nutzer / Monat",
    cta: { label: "Team starten", href: "register" },
    featured: true,
    badge: "Beliebt",
    features: [
      { label: "Unbegrenzte Projekte & Kunden" },
      { label: "Alle Connectors" },
      { label: "Tagro Briefings, unbegrenzt" },
      { label: "Reports mit Freigabe vor Versand" },
      { label: "Co-branded Client Portal" },
      { label: "Audio-Briefings & Transkripte" },
      { label: "Chrome Extension" },
    ],
  },
  {
    id: "organization",
    name: "Organization",
    tagline: "Für Portfolios, Führung und mehrere Marken.",
    monthly: 59,
    yearly: 49,
    note: "pro Nutzer / Monat",
    cta: { label: "Organization starten", href: "register" },
    features: [
      { label: "Alles aus Team" },
      { label: "Executive Overview & Portfolio-Health" },
      { label: "Objectives & Activity Intelligence" },
      { label: "Adaptive Intelligence (Company Brain)" },
      { label: "Subtle-branded White-Label" },
      { label: "SSO (Google, Microsoft)" },
      { label: "Prioritäts-Support" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Für Organisationen mit Security-Review, SCIM und eigener Marke.",
    monthly: null,
    yearly: null,
    note: "Individuell, jährlich",
    cta: { label: "Vertrieb kontaktieren", href: "sales" },
    features: [
      { label: "Alles aus Organization" },
      { label: "Full White-Label (kein Festag-Branding)" },
      { label: "SAML SSO & SCIM" },
      { label: "Datenresidenz Deutschland" },
      { label: "Security Review & DPA" },
      { label: "Dedizierter Onboarding-Pfad" },
      { label: "SLA & Named Support" },
    ],
  },
];

export type CompareRow = {
  label: string;
  values: [string | boolean, string | boolean, string | boolean, string | boolean];
};

export type CompareGroup = { group: string; rows: CompareRow[] };

export const compare: CompareGroup[] = [
  {
    group: "Workspace",
    rows: [
      { label: "Aktive Projekte", values: ["2", "Unbegrenzt", "Unbegrenzt", "Unbegrenzt"] },
      { label: "Kunden / Client Panels", values: ["2", "Unbegrenzt", "Unbegrenzt", "Unbegrenzt"] },
      { label: "Mitglieder", values: ["3", "Unbegrenzt", "Unbegrenzt", "Unbegrenzt"] },
      { label: "Workspace-Modi (Delivery, Teams, Agency)", values: ["Delivery", "Delivery, Teams", "Alle", "Alle"] },
    ],
  },
  {
    group: "Intelligence",
    rows: [
      { label: "Tagro Briefings", values: ["20 / Monat", "Unbegrenzt", "Unbegrenzt", "Unbegrenzt"] },
      { label: "Entscheidungen & Risiken", values: [true, true, true, true] },
      { label: "Reports mit Freigabe vor Versand", values: [false, true, true, true] },
      { label: "Audio-Briefings & Transkripte", values: [false, true, true, true] },
      { label: "Objectives & Activity Intelligence", values: [false, false, true, true] },
      { label: "Executive Overview & Portfolio-Health", values: [false, false, true, true] },
      { label: "Adaptive Intelligence (OKM, Operational DNA)", values: [false, false, true, true] },
      { label: "Predictive Hints (Verzögerung, Scope)", values: [false, false, true, true] },
    ],
  },
  {
    group: "Connectors",
    rows: [
      { label: "Connectors", values: ["2", "Alle", "Alle", "Alle"] },
      { label: "Chrome Extension", values: [true, true, true, true] },
      { label: "Cursor Cloud Agent (Beta)", values: [false, true, true, true] },
    ],
  },
  {
    group: "Marke & Client Experience",
    rows: [
      { label: "Client Portal", values: ["Festag-branded", "Co-branded", "Subtle-branded", "Full White-Label"] },
      { label: "Eigene Domain für Kundenportal", values: [false, false, true, true] },
      { label: "Mehrere Marken", values: [false, false, true, true] },
    ],
  },
  {
    group: "Security & Support",
    rows: [
      { label: "SSO", values: [false, false, "Google, Microsoft", "SAML + SCIM"] },
      { label: "Datenresidenz Deutschland", values: ["Standard", "Standard", "Standard", "Vertraglich"] },
      { label: "Security Review & DPA", values: [false, false, "Auf Anfrage", true] },
      { label: "Support", values: ["Community", "E-Mail", "Priorität", "Named, SLA"] },
    ],
  },
];

export const pricingFaq: { q: string; a: string }[] = [
  {
    q: "Wer zählt als Nutzer?",
    a: "Jedes Teammitglied mit Zugriff auf das Execution Panel. Kunden, die nur das Client Panel sehen, sind in allen Plänen kostenlos — unbegrenzt.",
  },
  {
    q: "Gibt es eine Testphase?",
    a: "Starter ist dauerhaft kostenlos. Team und Organization könnt ihr 14 Tage ohne Kreditkarte testen — Workspace anlegen, Connectors verbinden, Tagro nutzen.",
  },
  {
    q: "Was passiert mit unseren Daten?",
    a: "Daten liegen in Deutschland. Festag trainiert keine öffentlichen Modelle auf eurem Workspace. Adaptive Intelligence ist Collaboration Intelligence innerhalb eures Workspaces — persönliche Profile sind Opt-in, Export und Löschung jederzeit möglich.",
  },
  {
    q: "Was unterscheidet die White-Label-Stufen?",
    a: "Co-branded zeigt „Powered by Festag“. Subtle-branded stellt eure Marke in den Vordergrund, Tagro bleibt als Briefing-Engine sichtbar. Full White-Label zeigt euren Kunden kein Festag-Branding — inklusive eigener Domain.",
  },
  {
    q: "Können wir monatlich kündigen?",
    a: "Ja. Monatliche Pläne sind monatlich kündbar. Jährliche Pläne sparen rund 17 % und laufen 12 Monate. Enterprise wird individuell vereinbart.",
  },
  {
    q: "Ersetzt Festag Linear, Jira oder Slack?",
    a: "Nein. Festag sitzt über diesen Tools und liest Signale. Euer Team arbeitet weiter, wo es arbeitet — Festag macht daraus Klarheit für Kunden und Führung.",
  },
];
