"use client";

import { FormEvent, useState } from "react";
import { LandingButton, Section, SectionHeader } from "./primitives";

export function CtaSection() {
  const [idea, setIdea] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = idea.trim();
    const url = q
      ? `https://festag.app/login?idea=${encodeURIComponent(q)}`
      : "https://festag.app/login";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <Section id="start-project" tone="elevated">
      <SectionHeader
        title="Starten Sie Ihr erstes strukturiertes Projekt"
        description="Beschreiben Sie Ihre Idee. Festag strukturiert den Produktionsprozess ab Tag eins."
        align="center"
      />
      <form className="lp-cta-form" onSubmit={handleSubmit}>
        <label htmlFor="project-idea" className="sr-only">
          Projektidee beschreiben
        </label>
        <textarea
          id="project-idea"
          name="idea"
          className="lp-cta-input"
          placeholder="Beschreiben Sie Ihre Idee…"
          rows={4}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <div className="lp-cta-actions">
          <button type="submit" className="lp-btn lp-btn--primary">
            Projektstruktur erzeugen
          </button>
          <LandingButton href="/contact" variant="secondary">
            Zugang anfragen
          </LandingButton>
        </div>
      </form>
    </Section>
  );
}
