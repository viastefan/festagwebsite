/**
 * Festag JobPosting — CMS-ready data model.
 *
 * Keeping the schema strict and complete here so the source of truth is a
 * typed contract. A future Supabase/Sanity layer plugs in by replacing
 * `getAllJobs()` and `getJobBySlug()` without touching pages.
 */

export type JobStatus = "draft" | "published" | "closed" | "archived";

export type JobDepartment =
  | "engineering"
  | "design"
  | "product"
  | "ai"
  | "marketing"
  | "operations"
  | "sales"
  | "internships";

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "working-student";

export type RemotePolicy = "remote" | "hybrid" | "on-site";

export type Seniority =
  | "intern"
  | "junior"
  | "mid"
  | "senior"
  | "staff"
  | "founding"
  | "lead";

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: JobDepartment;
  location: string;
  remotePolicy: RemotePolicy;
  employmentType: EmploymentType;
  seniority: Seniority;
  shortDescription: string;
  mission: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  benefits?: string[];
  applicationProcess?: string[];
  applicationEmail: string;
  status: JobStatus;
  sortOrder: number;
  publishedAt: string; // ISO
  createdAt: string;
  updatedAt: string;
}

export const DEPARTMENT_LABEL: Record<JobDepartment, string> = {
  engineering: "Engineering",
  design: "Design",
  product: "Product",
  ai: "AI / Systems",
  marketing: "Marketing",
  operations: "Operations",
  sales: "Sales / Partnerships",
  internships: "Internships",
};

const HIRING_EMAIL = "careers@festag.app";

const J = (j: Omit<JobPosting, "id" | "createdAt" | "updatedAt" | "applicationEmail" | "status" | "publishedAt"> & Partial<Pick<JobPosting, "applicationEmail" | "status" | "publishedAt">>): JobPosting => ({
  id: j.slug,
  applicationEmail: j.applicationEmail ?? HIRING_EMAIL,
  status: j.status ?? "published",
  publishedAt: j.publishedAt ?? "2026-06-01T08:00:00Z",
  createdAt: "2026-06-01T08:00:00Z",
  updatedAt: "2026-06-01T08:00:00Z",
  ...j,
});

const JOBS: JobPosting[] = [
  J({
    slug: "founding-full-stack-engineer",
    title: "Founding Full-Stack Engineer",
    department: "engineering",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "full-time",
    seniority: "founding",
    sortOrder: 10,
    shortDescription:
      "Build the core systems behind projects, decisions, proof, reports and Tagro intelligence.",
    mission:
      "Du baust die Kern-Applikationsschicht hinter Projects, Decisions, ProofGrid, Reports, Notifications und der Tagro Briefing Intelligence.",
    responsibilities: [
      "Projekt-Kontrollschicht und Datenmodell weiterentwickeln",
      "Decision-Inbox, ProofGrid und Tagro-Queue als verlässliche Systeme bauen",
      "Client- und Execution-Panel skalieren — eine Datenwahrheit, mehrere Surfaces",
      "Integrationen, Notifications und Handoff-Flows entwerfen",
      "Architektur-Entscheidungen treffen, dokumentieren und mit der Designarbeit verzahnen",
    ],
    requirements: [
      "Mehrere Jahre Produkt-Engineering in TypeScript-Stacks",
      "Solide Postgres-Erfahrung, idealerweise mit Supabase oder vergleichbar",
      "Sicheres Gefühl für UI, Latenz und Real-time-Flows",
      "Souverän in System-Design und API-Modelling",
    ],
    niceToHave: [
      "Erfahrung mit Multi-Tenant-Systemen",
      "Hintergrund in Project- oder Workflow-Software",
    ],
    applicationProcess: [
      "Schreib uns einen kurzen Profilauszug an careers@festag.app",
      "30 Min Mission-Call mit Stefan",
      "Paid Work Trial an einem echten Problem",
      "Founding-Offer mit Equity",
    ],
  }),
  J({
    slug: "frontend-engineer-design-systems",
    title: "Frontend Engineer — Design Systems",
    department: "engineering",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "full-time",
    seniority: "senior",
    sortOrder: 20,
    shortDescription:
      "Turn Festag's black/white premium design system into a reliable, mobile-ready product interface.",
    mission:
      "Du überträgst das Festag-Design-System (Modern Black/White, Slate #5B647D, Aeonik Medium) in eine zuverlässige, performante und mobile-ready Produkt-UI.",
    responsibilities: [
      "Kern-Komponenten (Buttons, Cards, Modals, Inputs, Tables, Reports) als sauberes System aufbauen",
      "Motion-Sprache implementieren — ohne sie laut zu machen",
      "Mobile-Parity sichern (kein horizontales Scrolling)",
      "Token-System pflegen und mit Design synchron halten",
    ],
    requirements: [
      "Tiefe React/Next.js-Erfahrung",
      "Liebe zu Typo, Spacing und kleinen Details",
      "Sicheres Gefühl für Accessibility und Reduced-Motion",
    ],
  }),
  J({
    slug: "ai-product-engineer",
    title: "AI Product Engineer",
    department: "ai",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "full-time",
    seniority: "senior",
    sortOrder: 30,
    shortDescription:
      "Build Tagro workflows for reports, decisions, PDF handoffs and project briefings.",
    mission:
      "Du baust Tagro-Workflows für Reports, Decisions, PDF-Handoffs, Projekt-Briefings und kontextuelles Schreiben — calm AI, kein Spielzeug.",
    responsibilities: [
      "Briefing-, Report- und Decision-Workflows mit LLM-Backends entwerfen",
      "Quellen-Tracking und Evidence-Bindung umsetzen (Tagro nennt immer die Quelle)",
      "Eval-Setups bauen, Modelle benchmarken, Costs steuern",
    ],
    requirements: [
      "Produktive Erfahrung mit LLM-APIs und Prompt-Engineering im Production-Kontext",
      "TypeScript + Backend-Erfahrung",
      "Gefühl für Latenz, Streaming, Caching",
    ],
  }),
  J({
    slug: "product-designer-systems-ui",
    title: "Product Designer — Systems & UI",
    department: "design",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "full-time",
    seniority: "senior",
    sortOrder: 40,
    shortDescription:
      "Design calm interfaces for complex project work across clients, teams, decisions, evidence and reports.",
    mission:
      "Du gestaltest ruhige Interfaces für komplexe Projektarbeit — über Clients, Teams, Decisions, Evidence und Reports hinweg.",
    responsibilities: [
      "Festag-Designsystem weiterentwickeln (Tokens, Layout, Motion)",
      "Client- und Execution-Panel als zwei klare Wahrheiten gestalten",
      "Mit Engineering und AI eng zusammenarbeiten — Design im System, nicht in Mockups",
    ],
    requirements: [
      "Erfahrung als Product Designer für ernsthafte B2B-Software",
      "Editorial typografisches Feingefühl",
      "Mobile-First Denken",
    ],
  }),
  J({
    slug: "motion-designer-product-storytelling",
    title: "Motion Designer — Product Storytelling",
    department: "design",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "full-time",
    seniority: "mid",
    sortOrder: 50,
    shortDescription:
      "Create motion systems that explain Festag's product logic with precision and restraint.",
    mission:
      "Du baust eine Motion-Sprache, die Festags Produktlogik präzise und zurückhaltend erklärt — keine Partikel, keine Spielzeug-Animationen.",
    responsibilities: [
      "Hero-, Section- und Produkt-Animationen für Web und App",
      "System-Diagramm-Motion (Decisions, ProofGrid, Tagro)",
      "Reduced-Motion-Fallbacks mitdenken",
    ],
    requirements: [
      "After Effects / Rive / Lottie / CSS — die Mittel sind egal, die Restraint ist alles",
      "Editorial Sensibilität",
    ],
  }),
  J({
    slug: "product-marketing-lead",
    title: "Product Marketing Lead",
    department: "marketing",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "full-time",
    seniority: "lead",
    sortOrder: 60,
    shortDescription:
      "Explain Festag's category, product system and use cases to agencies, SMEs and internal company teams.",
    mission:
      "Du machst Festag als Kategorie verständlich — für Agenturen, KMUs und interne Company-Teams. Du schreibst klar, ohne zu schreien.",
    responsibilities: [
      "Positionierung schärfen (Delivery Intelligence Platform — kein Notion-/Linear-Klon)",
      "Launches und Now-Updates begleiten",
      "Use-Case-Stories aus echter Projektarbeit destillieren",
    ],
    requirements: [
      "Produktmarketing-Erfahrung in B2B-Software",
      "Deutsch nativ, Englisch fließend",
      "Schreibhandwerk auf editorialem Niveau",
    ],
  }),
  J({
    slug: "customer-success-implementation-lead",
    title: "Customer Success / Implementation Lead",
    department: "operations",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "full-time",
    seniority: "senior",
    sortOrder: 70,
    shortDescription:
      "Help teams adopt Festag for software, marketing and internal project workflows.",
    mission:
      "Du begleitest Teams beim Festag-Einsatz — Software-Projekte, Marketing-Projekte, interne Operations. Du machst Onboarding ruhig und Schluss-zu-Schluss erfolgreich.",
    responsibilities: [
      "Onboarding-Playbooks bauen und pflegen",
      "Kunden in echten Projekten begleiten — vom ersten Briefing bis zum ersten Report",
      "Produkt-Feedback strukturiert ins Team zurückspielen",
    ],
    requirements: [
      "Erfahrung mit B2B-Software-Implementierung",
      "Souveränes Auftreten mit Founders und Agency-Leads",
    ],
  }),
  J({
    slug: "working-student-product-research",
    title: "Working Student — Product & Research",
    department: "internships",
    location: "Remote · DACH",
    remotePolicy: "remote",
    employmentType: "working-student",
    seniority: "intern",
    sortOrder: 90,
    shortDescription:
      "Research project workflows, client communication, agency operations and internal company control systems.",
    mission:
      "Du recherchierst, wie echte Teams heute Projekte steuern — Agenturen, KMUs, interne Operations — und destillierst daraus belastbare Product Insights.",
    responsibilities: [
      "User-Interviews vorbereiten und durchführen",
      "Workflow-Patterns dokumentieren",
      "Insights mit Product und Design teilen",
    ],
    requirements: [
      "Klares Schreiben",
      "Sauberes Recherche-Handwerk",
      "Eingeschriebene:r Studierende:r (DACH)",
    ],
  }),
];

export function getAllJobs(opts: { includeDrafts?: boolean } = {}): JobPosting[] {
  const list = opts.includeDrafts
    ? JOBS
    : JOBS.filter((j) => j.status === "published");
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getJobBySlug(slug: string): JobPosting | null {
  return JOBS.find((j) => j.slug === slug) ?? null;
}

export function getDepartmentsWithCounts() {
  const out: Record<JobDepartment, number> = {
    engineering: 0,
    design: 0,
    product: 0,
    ai: 0,
    marketing: 0,
    operations: 0,
    sales: 0,
    internships: 0,
  };
  for (const j of getAllJobs()) out[j.department] += 1;
  return out;
}
