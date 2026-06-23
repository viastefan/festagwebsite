"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const STEPS = [
  {
    id: "idea",
    label: "01",
    title: "Idee erfassen",
    body: "Projektstart als strukturierter Input — nicht als Chaos in Slides und Chats.",
    metric: "Scope definiert",
    visual: "idea" as const,
  },
  {
    id: "ai",
    label: "02",
    title: "KI strukturiert",
    body: "Tagro zerlegt die Idee in Aufgaben, Pläne und klare nächste Schritte.",
    metric: "Plan generiert",
    visual: "ai" as const,
  },
  {
    id: "team",
    label: "03",
    title: "Team setzt um",
    body: "Entwickler arbeiten in einem definierten Workflow — nicht in Black Boxes.",
    metric: "Execution läuft",
    visual: "team" as const,
  },
  {
    id: "system",
    label: "04",
    title: "System macht sichtbar",
    body: "Fortschritt, Risiken und Entscheidungen sind live nachvollziehbar.",
    metric: "Status live",
    visual: "system" as const,
  },
] as const;

function StepVisual({ kind }: { kind: (typeof STEPS)[number]["visual"] }) {
  if (kind === "ai") {
    return (
      <div className="lp-motion-visual lp-motion-visual--ai" aria-hidden>
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (kind === "team") {
    return (
      <div className="lp-motion-visual lp-motion-visual--team" aria-hidden>
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (kind === "system") {
    return (
      <div className="lp-motion-visual lp-motion-visual--system" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  return <div className="lp-motion-visual lp-motion-visual--idea" aria-hidden />;
}

export function SystemMotionStage() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--tilt-x", `${px * 4}deg`);
      el.style.setProperty("--tilt-y", `${py * -3}deg`);
    };

    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`lp-motion${ready ? " is-ready" : ""}`}
      style={
        {
          "--motion-progress": `${((active + 1) / STEPS.length) * 100}%`,
        } as CSSProperties
      }
      aria-label="Festag System, animierte Übersicht"
    >
      <div className="lp-motion-frame">
        <div className="lp-motion-track" aria-hidden>
          <div className="lp-motion-track-line">
            <span className="lp-motion-track-fill" />
          </div>
          <ol className="lp-motion-track-steps">
            {STEPS.map((step, index) => (
              <li
                key={step.id}
                className={`lp-motion-track-step${index <= active ? " is-done" : ""}${index === active ? " is-active" : ""}`}
              >
                <span className="lp-motion-track-dot" />
                <span className="lp-motion-track-label">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="lp-motion-cards">
          {STEPS.map((step, index) => (
            <article
              key={step.id}
              className={`lp-motion-card${active === index ? " is-active" : ""}`}
            >
              <div className="lp-motion-card-top">
                <span className="lp-motion-card-label">{step.label}</span>
                <span className="lp-motion-card-metric">{step.metric}</span>
              </div>
              <h3 className="lp-motion-card-title">{step.title}</h3>
              <StepVisual kind={step.visual} />
              <p className="lp-motion-card-body">{step.body}</p>
            </article>
          ))}
        </div>

        <div className="lp-motion-footer">
          <p className="lp-motion-footer-text" key={STEPS[active].id}>
            <strong>{STEPS[active].title}</strong>
            {" — "}
            {STEPS[active].body}
          </p>
          <div className="lp-motion-dots" role="tablist" aria-label="Systemschritte">
            {STEPS.map((step, index) => (
              <button
                key={step.id}
                type="button"
                className={`lp-motion-dot${active === index ? " is-active" : ""}`}
                aria-label={step.title}
                aria-current={active === index ? "step" : undefined}
                onClick={() => setActive(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
