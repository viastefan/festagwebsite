import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Festag",
  description: "Talk to Festag — demo, partnerships, press, careers.",
};

const CONTACTS = [
  {
    label: "Demo & sales",
    address: "hello@festag.app",
    body: "30-Minuten-Demo, echte Projekte, ehrliche Gespräche.",
  },
  {
    label: "Careers",
    address: "careers@festag.app",
    body: "Auch ohne offene Rolle — schreib uns, wenn die Mission passt.",
  },
  {
    label: "Press",
    address: "press@festag.app",
    body: "Brand, Bilder, Statements für Veröffentlichungen.",
  },
  {
    label: "Partnerships",
    address: "partners@festag.app",
    body: "Agencies, integrations, dev networks im DACH-Raum.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="surface-dark pt-[120px] pb-28 grain relative overflow-hidden">
        <div className="shell relative">
          <p className="section-label text-white/55">Contact</p>
          <h1 className="t-headline mt-8 text-white text-[clamp(40px,6vw,92px)] max-w-[20ch]">
            Talk to{" "}
            <span className="t-serif-italic text-white/70">Festag</span>.
          </h1>
          <p className="t-body mt-8 max-w-[58ch] text-white/55 text-[clamp(16px,1.4vw,19px)]">
            Wir antworten persönlich — keine Form-Trichter, keine
            Automated-Reply-Schleifen. Wähle den richtigen Kanal.
          </p>
        </div>
      </section>

      <section className="surface-light py-24">
        <div className="shell grid grid-cols-1 md:grid-cols-2 gap-3">
          {CONTACTS.map((c) => (
            <a
              key={c.address}
              href={`mailto:${c.address}`}
              className="card group hover:border-fest-primary transition-colors"
            >
              <p className="t-mono text-fest-muted">{c.label}</p>
              <h2 className="mt-4 text-[22px] tracking-[0.012em] font-medium">
                {c.address}
              </h2>
              <p className="t-body mt-3 text-fest-muted text-[15px]">
                {c.body}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-fest-primary text-[14px]">
                Open mail <span aria-hidden>↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
