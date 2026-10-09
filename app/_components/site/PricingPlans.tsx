"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { plans } from "@/lib/site/pricing";
import { links } from "@/lib/site/links";

const EASE = [0.16, 1, 0.3, 1] as const;

export function PricingPlans() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="pp">
      <div className="pp-toggle">
        <div className="toggle" role="group" aria-label="Abrechnungszeitraum">
          {[false, true].map((y) => (
            <button key={String(y)} type="button" aria-pressed={yearly === y} onClick={() => setYearly(y)}>
              {yearly === y ? (
                <motion.span
                  layoutId="pp-thumb"
                  className="toggle-thumb"
                  style={{ inset: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                />
              ) : null}
              <span style={{ position: "relative" }}>
                {y ? "Jährlich" : "Monatlich"}
                {y ? <span className="toggle-save">−17 %</span> : null}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="plans">
        {plans.map((p) => {
          const amount = yearly ? p.yearly : p.monthly;
          return (
            <article key={p.id} className={`plan${p.featured ? " plan--featured" : ""}`}>
              {p.badge ? <span className="tag tag--accent plan-badge">{p.badge}</span> : null}
              <div className="plan-name">{p.name}</div>
              <div className="plan-for">{p.tagline}</div>
              <div className="plan-price">
                {amount === null ? (
                  <span className="plan-amount">Individuell</span>
                ) : (
                  <>
                    <span className="plan-amount">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={amount}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          style={{ display: "inline-block" }}
                        >
                          {amount} €
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    {amount > 0 ? <span className="plan-unit">/ Monat</span> : null}
                  </>
                )}
              </div>
              <div className="plan-note">
                {p.id === "team" || p.id === "organization"
                  ? `pro Nutzer${yearly ? ", jährlich abgerechnet" : ", monatlich"}`
                  : p.note}
              </div>
              <Button
                href={p.cta.href === "sales" ? "/contact" : links.register}
                variant={p.featured ? "accent" : p.id === "enterprise" ? "ghost" : "solid"}
              >
                {p.cta.label}
              </Button>
              <ul className="plan-list">
                {p.features.map((f) => (
                  <li key={f.label} className={f.muted ? "is-muted" : undefined}>
                    <Icon name={f.muted ? "x" : "check"} />
                    {f.label}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
      <style>{`
        .pp-toggle { display: flex; justify-content: center; margin-bottom: 36px; }
        .toggle button { position: relative; }
      `}</style>
    </div>
  );
}
