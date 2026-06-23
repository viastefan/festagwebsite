"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DeliveryTerminalPanel,
  LayoutExplorationsPanel,
  TagroChatPanel,
} from "./how-it-works-panels";

const STEPS = [
  {
    id: "capture",
    index: "01",
    title: "Projekt erfassen",
    body: "Rohinput, Calls und lose Notizen werden zu einer klaren Projektstruktur. Tagro hält den Scope sichtbar, bevor das Team loslegt.",
  },
  {
    id: "structure",
    index: "02",
    title: "Mit Tagro strukturieren",
    body: "Tagro übersetzt unklare Eingaben in verständliche Prompts, Pläne und nächste Schritte. Jede Änderung bleibt sichtbar und editierbar.",
  },
  {
    id: "deliver",
    index: "03",
    title: "Client-ready liefern",
    body: "Festag verdichtet Signale zu Status, Risiken und Entscheidungen und sendet Updates automatisch ins Client Portal.",
  },
] as const;

const PANELS = [LayoutExplorationsPanel, TagroChatPanel, DeliveryTerminalPanel] as const;

export function FestagHowItWorksShowcase() {
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const bindStepRef = useCallback(
    (index: number) => (node: HTMLElement | null) => {
      stepRefs.current[index] = node;
    },
    [],
  );

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const index = Number(visible[0].target.getAttribute("data-step-index"));
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      {
        root: null,
        threshold: [0.35, 0.55, 0.75],
        rootMargin: "-20% 0px -30% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lp-hiw-showcase">
      <div className="lp-hiw-steps">
        {STEPS.map((step, index) => (
          <article
            key={step.id}
            ref={bindStepRef(index)}
            data-step-index={index}
            className={`lp-hiw-step${activeIndex === index ? " is-active" : ""}`}
          >
            <span className="lp-hiw-step-index">{step.index}</span>
            <h3 className="lp-hiw-step-title">{step.title}</h3>
            <p className="lp-hiw-step-body">{step.body}</p>
          </article>
        ))}
      </div>

      <div className="lp-hiw-stage" aria-live="polite">
        <div className="lp-hiw-stage-sticky">
          {PANELS.map((Panel, index) => (
            <Panel key={STEPS[index].id} active={activeIndex === index} />
          ))}
        </div>
      </div>
    </div>
  );
}
