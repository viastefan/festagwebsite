"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "../ui/Icon";

const TOPICS = [
  { id: "demo", label: "Demo & Vertrieb", to: "hello@festag.app" },
  { id: "enterprise", label: "Enterprise & White-Label", to: "hello@festag.app" },
  { id: "support", label: "Support für bestehenden Workspace", to: "support@festag.app" },
  { id: "security", label: "Security & Datenschutz", to: "security@festag.app" },
  { id: "press", label: "Presse & Partnerschaften", to: "hello@festag.app" },
];

const SIZES = ["1–10", "11–50", "51–200", "201–1000", "1000+"];

/**
 * No backend on the marketing site: the form composes a pre-filled email in
 * the visitor's mail client. Nothing is sent or stored by this page.
 */
export function ContactForm() {
  const [topic, setTopic] = useState(TOPICS[0].id);
  const [sent, setSent] = useState(false);

  return (
    <form
      className="cf"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const t = TOPICS.find((x) => x.id === topic) ?? TOPICS[0];
        const body = [
          `Name: ${f.get("name") ?? ""}`,
          `Firma: ${f.get("company") ?? ""}`,
          `Teamgröße: ${f.get("size") ?? ""}`,
          `E-Mail: ${f.get("email") ?? ""}`,
          "",
          String(f.get("message") ?? ""),
        ].join("\n");
        const href = `mailto:${t.to}?subject=${encodeURIComponent(`Festag · ${t.label}`)}&body=${encodeURIComponent(body)}`;
        window.location.href = href;
        setSent(true);
      }}
    >
      <div className="cf-topics" role="radiogroup" aria-label="Anliegen">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={topic === t.id}
            className={topic === t.id ? "is-on" : undefined}
            onClick={() => setTopic(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="cf-grid">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" className="input" required autoComplete="name" placeholder="Vor- und Nachname" />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Geschäftliche E-Mail</label>
          <input id="cf-email" name="email" type="email" className="input" required autoComplete="email" placeholder="name@firma.de" />
        </div>
        <div className="field">
          <label htmlFor="cf-company">Firma</label>
          <input id="cf-company" name="company" className="input" autoComplete="organization" placeholder="Studio Nord GmbH" />
        </div>
        <div className="field">
          <label htmlFor="cf-size">Teamgröße</label>
          <select id="cf-size" name="size" className="select" defaultValue="11–50">
            {SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Worum geht es?</label>
        <textarea
          id="cf-msg"
          name="message"
          className="textarea"
          required
          placeholder="Wie viele Kundenprojekte laufen parallel? Welche Tools nutzt ihr? Was soll klarer werden?"
        />
      </div>
      <div className="cf-foot">
        <button type="submit" className="btn btn--solid btn--lg">
          Nachricht vorbereiten
          <Icon name="arrow" className="arrow" />
        </button>
        <span className="small">Öffnet dein Mailprogramm. Wir antworten werktags innerhalb von 24 Stunden.</span>
      </div>
      <AnimatePresence>
        {sent ? (
          <motion.div
            className="cf-sent"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Icon name="check" size={14} /> E-Mail vorbereitet. Kein Mailprogramm? Schreib direkt an hello@festag.app.
          </motion.div>
        ) : null}
      </AnimatePresence>
      <style>{CF_CSS}</style>
    </form>
  );
}

const CF_CSS = `
.cf { display: grid; gap: 18px; padding: clamp(20px, 3vw, 32px); border-radius: var(--r-xl); background: var(--surface); border: var(--hair) solid var(--line); box-shadow: var(--sh-sm); }
.cf-topics { display: flex; flex-wrap: wrap; gap: 6px; }
.cf-topics button {
  height: 34px; padding: 0 14px; border-radius: 999px; font-size: 13.5px; color: var(--ink-2);
  background: var(--surface-2); border: 1px solid transparent; transition: all var(--dur) ease;
}
.cf-topics button:hover { border-color: var(--line-strong); }
.cf-topics button.is-on { background: var(--ink); color: #fff; }
.cf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.cf-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.cf-sent { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-radius: 7px; background: var(--ok-soft); color: var(--ok); font-size: 13.5px; }
@media (max-width: 640px) { .cf-grid { grid-template-columns: 1fr; } }
`;
