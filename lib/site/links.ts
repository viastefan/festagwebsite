/**
 * Single source for every outbound / product link on the marketing site.
 * The product app lives on festag.app; this site never fakes app behavior.
 */

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://festag.app";

export const links = {
  app: APP_URL,
  login: `${APP_URL}/login`,
  register: `${APP_URL}/register`,
  sales: "mailto:hello@festag.app?subject=Festag%20Demo",
  support: "mailto:support@festag.app",
  careers: "mailto:careers@festag.app",
  security: "mailto:security@festag.app",
  privacy: "mailto:privacy@festag.app",
  github: "https://github.com/viastefan",
  linkedin: "https://www.linkedin.com/company/festag",
} as const;

export type NavItem = {
  href: string;
  label: string;
};

export type NavMenuItem = NavItem & {
  body: string;
  icon: "book" | "sparkles" | "puzzle" | "people" | "mail" | "shield" | "clock" | "cube" | "portal" | "flow" | "chart" | "decision" | "globe";
};

/** Top-level items. `menu` opens a mega dropdown. */
export const primaryNav: (NavItem & { menu?: "product" | "resources" })[] = [
  { href: "/product", label: "Produkt", menu: "product" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/pricing", label: "Preise" },
  { href: "/community", label: "Community" },
  { href: "/docs", label: "Ressourcen", menu: "resources" },
];

export const productMenu: NavMenuItem[] = [
  { href: "/product", label: "Plattform", body: "Client Panel, Entscheidungen, Executive.", icon: "portal" },
  { href: "/tagro", label: "Tagro", body: "Der Operations Interpreter, der mitdenkt.", icon: "sparkles" },
  { href: "/connectors", label: "Connectors", body: "GitHub, Linear, Jira, Slack und mehr.", icon: "flow" },
  { href: "/intelligence", label: "Modelle & Intelligence", body: "Leqra, Tagro, Veyra und Company Brain.", icon: "chart" },
  { href: "/extension", label: "Chrome Extension", body: "Signale erfassen, wo Arbeit passiert.", icon: "puzzle" },
];

export const announcement = {
  label: "Neu",
  text: "Adaptive Intelligence: Operational DNA ist jetzt persistent",
  href: "/changelog#v2.6",
};

export const resourcesMenu: NavMenuItem[] = [
  {
    href: "/docs",
    label: "Guides",
    body: "Einstieg, Connectors, Client Portal, White-Label.",
    icon: "book",
  },
  {
    href: "/company",
    label: "Unternehmen",
    body: "Mission, Haltung und Aktuelles von Festag.",
    icon: "cube",
  },
  {
    href: "/changelog",
    label: "Changelog",
    body: "Was neu ist — jede Woche, ohne Marketing-Nebel.",
    icon: "clock",
  },
  {
    href: "/community",
    label: "Community",
    body: "Early Access, Partner, Office Hours.",
    icon: "globe",
  },
  {
    href: "/careers",
    label: "Karriere",
    body: "Wir bauen die Operational-Intelligence-Kategorie.",
    icon: "people",
  },
  {
    href: "/contact",
    label: "Kontakt",
    body: "Sales, Support, Security — direkt.",
    icon: "mail",
  },
];

export const footerColumns: { title: string; items: (NavItem & { external?: boolean })[] }[] = [
  {
    title: "Produkt",
    items: [
      { href: "/product", label: "Produkt" },
      { href: "/tagro", label: "Tagro" },
      { href: "/connectors", label: "Connectors" },
      { href: "/intelligence", label: "Modelle & Intelligence" },
      { href: "/extension", label: "Chrome Extension" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Lösungen",
    items: [
      { href: "/product#client", label: "Für Agenturen" },
      { href: "/product#execution", label: "Für Software-Teams" },
      { href: "/product#executive", label: "Für Führung" },
      { href: "/enterprise", label: "Enterprise & White-Label" },
      { href: "/pricing", label: "Preise" },
    ],
  },
  {
    title: "Ressourcen",
    items: [
      { href: "/docs", label: "Guides" },
      { href: links.app, label: "App öffnen", external: true },
      { href: links.register, label: "Workspace erstellen", external: true },
      { href: "/company", label: "Unternehmen" },
      { href: "/contact", label: "Kontakt" },
      { href: "/careers", label: "Karriere" },
    ],
  },
  {
    title: "Rechtliches",
    items: [
      { href: "/legal/imprint", label: "Impressum" },
      { href: "/legal/privacy", label: "Datenschutz" },
      { href: "/legal/terms", label: "AGB" },
      { href: links.security, label: "Security", external: true },
    ],
  },
];
