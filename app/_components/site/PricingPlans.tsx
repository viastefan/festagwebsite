"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { addons, ALLOWANCE_EUR, ANSWERS_PER_EUR, creditPacks, deliveryPlans, workspacePlans, type Plan } from "@/lib/site/pricing";
import { links } from "@/lib/site/links";

const EASE = [0.16, 1, 0.3, 1] as const;
const TABS = [
  { id: "ws", label: "Pläne" },
  { id: "usage", label: "Nutzung" },
  { id: "delivery", label: "Projekte" },
  { id: "addons", label: "Add-ons" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const eur = (n: number) => `${n.toLocaleString("de-DE")} €`;

export function PricingPlans() {
  const [tab, setTab] = useState<Tab>("ws");

  return (
    <div className="pp">
      <div className="pp-tabs" role="tablist" aria-label="Preismodell">
        {TABS.map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}>
            {tab === t.id ? (
              <motion.span
                layoutId="pp-tab"
                className="pp-tab-thumb"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            ) : null}
            <span className="pp-tab-label">{t.label}</span>
          </button>
        ))}
      </div>
      <p className="pp-sub">
        {tab === "ws"
          ? "Bezahlt wird pro Workspace, nie pro Kopf. Mitglieder und Kunden sind immer unbegrenzt."
          : tab === "usage"
            ? "Aven kostet pro Antwort echtes Geld. Jeder Plan enthält ein Monatsguthaben, mehr lässt sich aufladen."
            : tab === "delivery"
              ? "Festag liefert auch selbst: Festpreis, in Meilensteine geteilt, bezahlt erst nach Abnahme."
              : "Gezielte Erweiterungen für eure Projekte, Aven schlägt sie vor, wenn sie passen."}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {tab === "ws" ? (
            <>
              <div className="pp-grid pp-grid--3">
                {workspacePlans.map((p) => (
                  <PlanCard key={p.id} plan={p} />
                ))}
              </div>
            </>
          ) : null}
          {tab === "usage" ? <Usage /> : null}
          {tab === "delivery" ? (
            <div className="pp-grid pp-grid--3">
              {deliveryPlans.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
          ) : null}
          {tab === "addons" ? (
            <div className="pp-addons">
              {addons.map((a) => (
                <div key={a.name} className="pp-addon">
                  <span className="pp-addon-cat">{a.cat}</span>
                  <span className="pp-addon-name">{a.name}</span>
                  <span className="pp-addon-body">{a.body}</span>
                  <span className="pp-addon-price">{eur(a.price)}</span>
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      </AnimatePresence>
      <style>{PP_CSS}</style>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const href = plan.cta.href === "register" ? links.register : "/contact";
  return (
    <article className={`pp-card${plan.featured ? " is-featured" : ""}`}>
      <div className="pp-card-top">
        <span className="pp-name">{plan.name}</span>
        {plan.badge ? <span className="pp-badge">{plan.badge}</span> : null}
      </div>
      <div className="pp-price">
        <span className="pp-amount">{plan.price}</span>
        {plan.unit ? <span className="pp-unit">{plan.unit}</span> : null}
      </div>
      <p className="pp-tagline">{plan.tagline}</p>
      <Button href={href} variant={plan.featured ? "solid" : "ghost"}>
        {plan.cta.label}
      </Button>
      <div className="pp-features">
        {plan.lead ? <span className="pp-lead">{plan.lead}</span> : null}
        <ul>
          {plan.features.map((f) => (
            <li key={f}>
              <Icon name="check" size={15} />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Nutzung: Monatsguthaben, Aufladepakete und ein Rechner für Aven-Antworten. */
function Usage() {
  const [answers, setAnswers] = useState(250);
  const need = answers / ANSWERS_PER_EUR;
  const plan = need <= ALLOWANCE_EUR.free ? "Free" : need <= ALLOWANCE_EUR.pro ? "Pro" : "Pro plus Aufladung";
  const extra = Math.max(0, need - ALLOWANCE_EUR.pro);
  return (
    <div className="pp-usage">
      <div className="pp-usage-cols">
        <div className="pp-usage-box">
          <h3 className="h3">Monatsguthaben</h3>
          <ul className="pp-kv">
            <li><span>Free</span><b>{eur(ALLOWANCE_EUR.free)} · ca. {ALLOWANCE_EUR.free * ANSWERS_PER_EUR} Antworten</b></li>
            <li><span>Test (14 Tage)</span><b>{eur(ALLOWANCE_EUR.trial)} · ca. {ALLOWANCE_EUR.trial * ANSWERS_PER_EUR} Antworten</b></li>
            <li><span>Pro</span><b>{eur(ALLOWANCE_EUR.pro)} · ca. {ALLOWANCE_EUR.pro * ANSWERS_PER_EUR} Antworten</b></li>
          </ul>
          <p className="small">Antworten mit dem mittleren Modell. Gründliche Antworten kosten mehr, schnelle weniger.</p>
        </div>
        <div className="pp-usage-box">
          <h3 className="h3">Aufladen</h3>
          <ul className="pp-kv">
            {creditPacks.map((c) => (
              <li key={c.price}>
                <span>{eur(c.price)}</span>
                <b>
                  {eur(c.credits)} Guthaben{c.note ? ` (${c.note})` : ""}
                </b>
              </li>
            ))}
          </ul>
          <p className="small">Aufladungen verfallen 12 Monate nicht und werden nach dem Monatsguthaben verbraucht.</p>
        </div>
      </div>
      <div className="pp-calc">
        <div className="pp-calc-copy">
          <h3 className="h3">Was brauche ich?</h3>
          <p className="small" style={{ fontSize: "calc(14.5px * var(--fs, 1))", marginTop: 8 }}>
            Schätze, wie oft ihr Aven im Monat fragt. Wir zeigen, was dazu passt.
          </p>
        </div>
        <div className="pp-calc-ui">
          <label className="pp-range">
            <span>
              Aven-Antworten pro Monat <strong>{answers.toLocaleString("de-DE")}</strong>
            </span>
            <input type="range" min={20} max={1500} step={10} value={answers} onChange={(e) => setAnswers(+e.target.value)} />
          </label>
          <div className="pp-calc-out">
            <div>
              <span>Passender Plan</span>
              <strong>{plan}</strong>
            </div>
            <div className="is-muted">
              <span>Zusätzliches Guthaben</span>
              <strong>
                {extra > 0 ? eur(Math.ceil(extra)) : "0 €"}
                <em> / Monat</em>
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PP_CSS = `
@media (max-width: 640px) { .pp-tabs { max-width: 100%; overflow-x: auto; scrollbar-width: none; } .pp-tabs button { padding: 0 12px; flex-shrink: 0; } }
.pp-usage { display: grid; gap: 16px; }
.pp-usage-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.pp-usage-box { padding: 22px; border-radius: var(--r-card); background: var(--glass-fill); border: 0.5px solid var(--line-strong); box-shadow: var(--glass-shadow); }
.pp-usage-box .small { margin-top: 12px; font-size: calc(13px * var(--fs, 1)); color: var(--muted); }
.pp-kv { list-style: none; margin: 14px 0 0; padding: 0; }
.pp-kv li { display: flex; justify-content: space-between; gap: 16px; padding: 11px 0; border-top: 0.5px solid var(--line-strong); font-size: calc(14px * var(--fs, 1)); }
.pp-kv span { color: var(--muted); }
.pp-kv b { font-weight: 500; text-align: right; }
@media (max-width: 760px) { .pp-usage-cols { grid-template-columns: 1fr; } }
.pp-tabs {
  position: relative; display: inline-flex; gap: 2px; padding: 4px; border-radius: 999px;
  background: var(--surface-2); border: var(--hair) solid var(--line); margin: 0 auto;
}
.pp { display: grid; justify-items: center; }
.pp > div:not(.pp-tabs) { width: 100%; }
.pp-tabs button { position: relative; height: 34px; padding: 0 16px; white-space: nowrap; border-radius: 999px; font-size: calc(14px * var(--fs, 1)); color: var(--muted); transition: color var(--dur) ease; }
.pp-tabs button[aria-selected="true"] { color: var(--ink); }
.pp-tab-thumb { position: absolute; inset: 0; border-radius: 999px; background: var(--surface); box-shadow: var(--sh-sm); }
.pp-tab-label { position: relative; }
.pp-sub { margin: 14px 0 36px; font-size: calc(14.5px * var(--fs, 1)); color: var(--muted); text-align: center; max-width: 60ch; }
.pp-grid { display: grid; gap: 10px; }
.pp-grid--4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.pp-grid--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.pp-card {
  display: flex; flex-direction: column; gap: 14px; padding: 22px; border-radius: var(--r-xl);
  background: var(--surface-2); border: var(--hair) solid var(--line);
}
.pp-card.is-featured {
  background: linear-gradient(180deg, var(--tone-blue-tint), #fff 38%);
  box-shadow: 0 0 0 1px rgba(59,111,212,0.28), var(--sh-md);
}
.pp-card-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.pp-name { font-size: calc(17px * var(--fs, 1)); font-weight: 500; color: var(--ink); }
.pp-badge { font-size: calc(12px * var(--fs, 1)); padding: 3px 9px; border-radius: 999px; background: var(--accent-tint); color: var(--accent); white-space: nowrap; }
.pp-price { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.pp-amount { font-size: calc(34px * var(--fs, 1)); font-weight: 500; letter-spacing: -0.025em; color: var(--ink); line-height: 1.1; }
.pp-unit { font-size: calc(13.5px * var(--fs, 1)); color: var(--muted); }
.pp-tagline { font-size: calc(14.5px * var(--fs, 1)); line-height: 1.5; color: var(--muted); min-height: 4.5em; }
.pp-card .btn { width: 100%; }
.pp-features { display: grid; gap: 10px; padding-top: 4px; }
.pp-lead { font-size: calc(13px * var(--fs, 1)); color: var(--faint); }
.pp-features ul { display: grid; gap: 9px; }
.pp-features li { display: grid; grid-template-columns: 16px 1fr; gap: 9px; font-size: calc(14px * var(--fs, 1)); line-height: 1.45; color: var(--ink-2); }
.pp-features li svg { color: var(--accent); margin-top: 2px; }
.pp-addons { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.pp-addon {
  display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; padding: 18px 20px; border-radius: var(--r-lg);
  background: var(--surface-2); border: var(--hair) solid var(--line);
}
.pp-addon-cat { grid-column: 1 / -1; font-size: calc(12px * var(--fs, 1)); color: var(--faint); }
.pp-addon-name { font-size: calc(15.5px * var(--fs, 1)); font-weight: 500; color: var(--ink); }
.pp-addon-price { grid-row: 2; grid-column: 2; font-size: calc(15px * var(--fs, 1)); color: var(--ink); font-variant-numeric: tabular-nums; }
.pp-addon-body { grid-column: 1 / -1; font-size: calc(13.5px * var(--fs, 1)); color: var(--muted); }
.pp-calc {
  margin-top: 10px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 28px; align-items: center;
  padding: clamp(20px, 3vw, 32px); border-radius: var(--r-xl);
  background:
    radial-gradient(80% 90% at 100% 120%, rgba(46,107,255,0.14), transparent 60%),
    radial-gradient(60% 70% at 0% 120%, rgba(127,216,232,0.22), transparent 60%),
    var(--surface-2);
  border: var(--hair) solid var(--line);
}
.pp-calc-kicker { font-size: calc(13px * var(--fs, 1)); color: var(--accent); font-weight: 500; }
.pp-calc-copy .h3 { margin-top: 8px; }
.pp-calc-ui { display: grid; gap: 16px; padding: 20px; border-radius: var(--r-lg); background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); box-shadow: 0 0 0 var(--hair) var(--line), var(--sh-sm); }
.pp-range { display: grid; gap: 8px; font-size: calc(14px * var(--fs, 1)); color: var(--muted); }
.pp-range span { display: flex; justify-content: space-between; }
.pp-range strong { font-weight: 500; color: var(--ink); font-variant-numeric: tabular-nums; }
.pp-range input { width: 100%; accent-color: var(--accent); }
.pp-calc-out { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding-top: 6px; border-top: var(--hair) solid var(--line); }
.pp-calc-out div { display: grid; gap: 2px; padding-top: 10px; }
.pp-calc-out div > span { font-size: calc(13px * var(--fs, 1)); color: var(--muted); }
.pp-calc-out strong { font-size: calc(26px * var(--fs, 1)); font-weight: 500; letter-spacing: -0.02em; color: var(--ink); font-variant-numeric: tabular-nums; }
.pp-calc-out em { font-style: normal; font-size: calc(13px * var(--fs, 1)); color: var(--faint); font-weight: 400; letter-spacing: 0; }
.pp-calc-out .is-muted strong { color: var(--faint); text-decoration: line-through; text-decoration-thickness: 1px; }
@media (max-width: 1100px) { .pp-grid--4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } .pp-addons { grid-template-columns: 1fr 1fr; } }
@media (max-width: 860px) { .pp-grid--3 { grid-template-columns: 1fr; } .pp-calc { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .pp-grid--4, .pp-addons { grid-template-columns: 1fr; } .pp-tagline { min-height: 0; } }
`;
