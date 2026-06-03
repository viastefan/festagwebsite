import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Festag",
  description:
    "Festag pricing — Mode A Managed, Mode B White-Label / Agency OS. Curated, not commoditised.",
};

type Tier = {
  id: string;
  name: string;
  kicker: string;
  price: string;
  priceUnit?: string;
  description: string;
  for: string;
  features: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  footnote?: string;
};

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    kicker: "For early teams",
    price: "—",
    priceUnit: "auf Anfrage",
    description:
      "Eine Projekt-Wahrheit für kleine Teams. Decisions, ProofGrid, Tagro-Briefing, ein Client Panel.",
    for: "Founder, kleine Agenturen, Solo-Operatoren",
    features: [
      "1 Workspace",
      "Bis zu 5 aktive Projekte",
      "Decisions + ProofGrid",
      "Tagro Briefing & Reports",
      "1 Client Panel pro Projekt",
      "Email-Support",
    ],
    cta: { label: "Talk to us", href: "/contact" },
  },
  {
    id: "team",
    name: "Team",
    kicker: "For serious operators",
    price: "Custom",
    priceUnit: "Pricing Engine",
    description:
      "Mehrere Clients, mehrere Surfaces, Garantie-Tier. Tagro mit erweitertem Source-Tracking, Execution Panels pro Rolle.",
    for: "Agencies, Software-Teams, Marketing-Teams",
    features: [
      "Multi-Workspace, Multi-Client",
      "Execution Panel (Dev · Marketing · Ops)",
      "Marketing Projects Modul",
      "Internal Company Mode optional",
      "Festag Garantie (Mode A) verfügbar",
      "Priority Support, gemeinsame Reviews",
    ],
    cta: { label: "Book demo", href: "/contact" },
    highlight: true,
    footnote: "Custom Pricing Engine — basierend auf Projektart, Volumen und Garantie-Stufe.",
  },
  {
    id: "white-label",
    name: "White-Label",
    kicker: "Agency OS · Mode B",
    price: "Custom",
    priceUnit: "Partnership",
    description:
      "Festag als operatives Betriebssystem für Agenturen mit eigener Marke. Dedicated Onboarding, partnerschaftliches Modell.",
    for: "Agenturen mit eigener Marke und größerem Volumen",
    features: [
      "White-Label Surfaces & Domains",
      "Custom Pricing Engine pro Agency",
      "Dedicated Implementation Lead",
      "Quartals-Reviews mit Festag",
      "Curated Developer Network optional",
      "DACH-Hosting & DPA",
    ],
    cta: { label: "Partner with Festag", href: "mailto:partners@festag.app?subject=Festag%20%E2%80%94%20White-Label%20enquiry" },
  },
];

const ADDONS = [
  {
    title: "Tagro Audio",
    body: "Audio-Briefings für Clients und Leadership — immer mit Pflicht-Transkript.",
  },
  {
    title: "Festag Garantie",
    body: "Vertragliche Liefer-Garantie für Mode-A-Projekte. Tier-basiert.",
  },
  {
    title: "Curated Developer Network",
    body: "Geprüfte Devs für Software-Projekte. Kein Marketplace, kein Auktionssystem.",
  },
  {
    title: "Veyra",
    body: "Festag Pixel- und Visual-Pipeline — Marketing-Assets im selben System.",
  },
];

const FAQS = [
  {
    q: "Warum keine Fixpreise pro User?",
    a: "Weil Festag keine seat-getriebene Wahrheit ist. Projekte und Workspaces tragen den Wert — wir vermeiden Pricing, das Teams gegen Adoption arbeiten lässt.",
  },
  {
    q: "Was bedeutet die Festag Garantie?",
    a: "In Mode A trägt Festag vertraglich die Verantwortung für Liefer-Milestones. Tier-basiert, mit klaren Spielregeln. Mehr im Gespräch.",
  },
  {
    q: "Wie hostet ihr?",
    a: "DACH/EU-Hosting, Row-Level-Security, GDPR-konforme DPAs auf Anfrage. Details auf /security.",
  },
  {
    q: "Gibt es einen Free Tier?",
    a: "Nein. Festag ist für ernsthafte Projektarbeit gebaut — Trial-Workspaces gibt es im Gespräch, kein Self-Service-Free.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="surface-dark relative overflow-hidden pt-[120px] pb-24 grain">
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full opacity-[0.16] pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
          }}
        />
        <div className="shell relative">
          <p className="section-label text-white/55">Pricing</p>
          <h1 className="t-headline mt-8 text-white text-[clamp(44px,7.4vw,108px)] max-w-[20ch]">
            Curated,{" "}
            <span className="t-serif-italic text-white/85">
              not commoditised
            </span>
            .
          </h1>
          <p className="t-body mt-10 max-w-[60ch] text-white/55 text-[clamp(16px,1.4vw,19px)]">
            Festag ist kein seat-basiertes SaaS. Du bezahlst für Projekt-Wahrheit
            und Liefer-Garantie — nicht für Logins. Pricing geht durch ein
            echtes Gespräch, keine Selbstbedienungs-Trichter.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="surface-light py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-3 gap-3">
          {TIERS.map((t) => (
            <article
              key={t.id}
              className={`card relative flex flex-col ${
                t.highlight
                  ? "border-fest-primary shadow-[0_24px_60px_-30px_rgba(91,100,125,0.5)]"
                  : ""
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-fest-primary text-white text-[11px] tracking-[0.18em] uppercase">
                  Most chosen
                </span>
              )}
              <p className="t-mono text-fest-muted">{t.kicker}</p>
              <h3 className="mt-3 text-[28px] font-medium tracking-[0.012em]">
                {t.name}
              </h3>
              <p className="t-body mt-3 text-fest-muted text-[14.5px] max-w-[34ch]">
                {t.description}
              </p>

              <div className="mt-7">
                <p className="text-[40px] tracking-[-0.01em] font-medium leading-none">
                  {t.price}
                </p>
                {t.priceUnit && (
                  <p className="t-mono text-fest-muted mt-2">{t.priceUnit}</p>
                )}
              </div>

              <hr className="my-7 border-black/[0.08]" />

              <p className="t-mono text-fest-muted mb-4">For</p>
              <p className="text-[14px] text-fest-text tracking-[0.012em]">
                {t.for}
              </p>

              <hr className="my-7 border-black/[0.08]" />

              <ul className="grid gap-3 flex-1">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[14px] tracking-[0.012em]"
                  >
                    <Check />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {t.footnote && (
                <p className="t-mono text-fest-muted mt-6">{t.footnote}</p>
              )}

              <Link
                href={t.cta.href}
                className={`btn mt-8 justify-center ${
                  t.highlight ? "btn-primary" : "btn-ghost-light"
                }`}
              >
                {t.cta.label}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="surface-paper py-24">
        <div className="shell">
          <p className="section-label text-fest-muted">Add-ons</p>
          <h2 className="t-headline mt-6 text-[clamp(32px,4.5vw,56px)] max-w-[22ch]">
            Optional layers,{" "}
            <span className="t-serif-italic text-fest-muted">
              when they actually fit
            </span>
            .
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {ADDONS.map((a) => (
              <article key={a.title} className="card bg-white">
                <h3 className="text-[18px] tracking-[0.012em] font-medium">
                  {a.title}
                </h3>
                <p className="t-body mt-3 text-fest-muted text-[14.5px]">
                  {a.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="surface-light py-24">
        <div className="shell grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <p className="section-label text-fest-muted">FAQ</p>
            <h2 className="t-headline mt-6 text-[clamp(32px,4.5vw,52px)] max-w-[18ch]">
              Common{" "}
              <span className="t-serif-italic text-fest-muted">questions</span>.
            </h2>
            <p className="t-body mt-6 text-fest-muted max-w-[40ch]">
              Was nicht hier steht, beantworten wir persönlich.
            </p>
            <Link href="/contact" className="btn btn-ghost-light mt-8">
              Ask us directly
            </Link>
          </div>
          <dl className="grid gap-6">
            {FAQS.map((f) => (
              <div
                key={f.q}
                className="card hover:border-fest-primary transition-colors"
              >
                <dt className="text-[18px] font-medium tracking-[0.012em]">
                  {f.q}
                </dt>
                <dd className="t-body mt-3 text-fest-muted text-[15px]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section className="surface-dark py-32">
        <div className="shell text-center">
          <p className="section-label justify-center inline-flex text-white/55">
            Festag · Pricing
          </p>
          <h2 className="t-headline mt-8 text-white text-[clamp(36px,5.5vw,80px)] max-w-[22ch] mx-auto">
            Talk to us before you{" "}
            <span className="t-serif-italic text-white/70">commit</span>.
          </h2>
          <p className="t-body mt-8 max-w-[52ch] mx-auto text-white/55 text-[17px]">
            Wir prüfen erst, ob Festag dein Projekt-Setup wirklich verbessert —
            dann reden wir über Preis.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-primary h-12 px-6">
              Book demo
            </Link>
            <a
              href="mailto:hello@festag.app"
              className="btn btn-ghost-dark h-12 px-6"
            >
              hello@festag.app
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="mt-1 shrink-0 text-fest-primary"
      aria-hidden
    >
      <path
        d="M2.5 7.5 L5.8 10.5 L11.5 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
