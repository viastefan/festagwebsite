import type { Metadata } from "next";
import { Icon } from "../_components/ui/Icon";
import { Reveal } from "../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { TextLink } from "../_components/ui/Button";
import { PricingPlans } from "../_components/site/PricingPlans";
import { Faq } from "../_components/site/Faq";
import { compare, pricingFaq } from "@/lib/site/pricing";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Erster Workspace kostenlos, jeder weitere 19 € im Monat — nie pro Kopf. Projekte zum Festpreis ab 1.500 €, bezahlt pro Meilenstein.",
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
        title="Preise"
        lead="Klarheit wird nicht teurer, je mehr Menschen sie sehen. Erster Workspace kostenlos — danach 19 € pro Workspace, nie pro Kopf."
      />

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <PricingPlans />
          </Reveal>
          <Reveal className="pr-note">
            <Icon name="shield" size={14} />
            Alle Preise netto zzgl. USt. Server in Deutschland. Kein Kreditkarten-Zwang für den ersten Workspace.
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
                  {["Hobby", "Workspace", "Enterprise"].map((n) => (
                    <th key={n} scope="col">
                      {n}
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
        @media (max-width: 640px) {
          .pr-table-wrap .cmp { min-width: 0; font-size: 12.5px; }
          .pr-table-wrap .cmp th, .pr-table-wrap .cmp td { padding: 10px 4px; }
          .pr-table-wrap .cmp th[scope="row"] { width: 34%; font-size: 12.5px; }
          .pr-table-wrap .cmp td:not(:first-child), .pr-table-wrap .cmp th:not(:first-child) { width: 22%; }
        }
      `}</style>
    </>
  );
}

function GroupRows({ group }: { group: (typeof compare)[number] }) {
  return (
    <>
      <tr className="cmp-group">
        <td colSpan={4}>{group.group}</td>
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
