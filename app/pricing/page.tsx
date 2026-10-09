import type { Metadata } from "next";
import { Icon } from "../_components/ui/Icon";
import { Reveal } from "../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { TextLink } from "../_components/ui/Button";
import { PricingPlans } from "../_components/site/PricingPlans";
import { Faq } from "../_components/site/Faq";
import { compare, plans, pricingFaq } from "@/lib/site/pricing";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Starter kostenlos, Team ab 24 € pro Nutzer. Kunden im Client Panel sind immer kostenlos. Organization und Enterprise mit White-Label, SSO und Datenresidenz.",
};

function Cell({ v }: { v: string | boolean }) {
  if (v === true)
    return (
      <span className="cmp-yes" aria-label="Enthalten">
        <Icon name="check" />
      </span>
    );
  if (v === false)
    return (
      <span className="cmp-no" aria-label="Nicht enthalten">
        —
      </span>
    );
  return <>{v}</>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        center
        eyebrow="Preise"
        title={
          <>
            Bezahlt für Klarheit. Nicht für <span className="serif accent">Sitze</span> eurer Kunden.
          </>
        }
        lead="Kunden im Client Panel sind in jedem Plan kostenlos und unbegrenzt. Ihr zahlt nur für das Team, das liefert."
      />

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <PricingPlans />
          </Reveal>
          <Reveal className="pr-note">
            <Icon name="shield" size={14} />
            Alle Preise netto zzgl. USt. Server in Deutschland. 14 Tage Team oder Organization testen — ohne
            Kreditkarte.
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Pläne im Vergleich." />
          <Reveal className="pr-table-wrap">
            <table className="cmp">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Funktion</span>
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((g) => (
                  <GroupRows key={g.group} group={g} />
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap">
          <div className="pr-faq">
            <Reveal>
              <h2 className="h2">Häufige Fragen</h2>
              <p className="body" style={{ marginTop: 14 }}>
                Etwas fehlt? Wir antworten werktags innerhalb von 24 Stunden.
              </p>
              <div style={{ marginTop: 18 }}>
                <TextLink href="/contact">Vertrieb kontaktieren</TextLink>
              </div>
            </Reveal>
            <Reveal>
              <Faq items={pricingFaq} />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />

      <style>{`
        .pr-note { margin-top: 24px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13px; color: var(--faint); text-align: center; flex-wrap: wrap; }
        .pr-table-wrap { overflow-x: auto; }
        .pr-table-wrap .cmp { min-width: 720px; }
        .pr-faq { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: clamp(28px, 5vw, 72px); align-items: start; }
        .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
        @media (max-width: 860px) { .pr-faq { grid-template-columns: 1fr; } .cmp thead th { position: static; } }
      `}</style>
    </>
  );
}

function GroupRows({ group }: { group: (typeof compare)[number] }) {
  return (
    <>
      <tr className="cmp-group">
        <td colSpan={5}>{group.group}</td>
      </tr>
      {group.rows.map((r) => (
        <tr key={r.label}>
          <th scope="row">{r.label}</th>
          {r.values.map((v, i) => (
            <td key={i}>
              <Cell v={v} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
