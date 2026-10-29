"use client";

import { useState } from "react";

export type CodeTab = { label: string; lang?: string; code: string };

/** Code-Block mit Tabs und Kopieren-Knopf, wie in API-Dokumentationen. */
export function CodeTabs({ tabs, title }: { tabs: CodeTab[]; title?: string }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const cur = tabs[i];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cur.code);
      setDone(true);
      window.setTimeout(() => setDone(false), 1400);
    } catch {
      /* Zwischenablage nicht verfügbar */
    }
  };
  return (
    <div className="code">
      <div className="code-bar">
        {tabs.length > 1 ? (
          <div className="code-tabs" role="tablist">
            {tabs.map((t, k) => (
              <button key={t.label} type="button" role="tab" aria-selected={k === i} className={k === i ? "is-on" : ""} onClick={() => setI(k)}>
                {t.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="code-title">{title ?? cur.label}</span>
        )}
        <button type="button" className="code-copy" onClick={copy} aria-label="Code kopieren">
          {done ? "Kopiert" : "Kopieren"}
        </button>
      </div>
      <pre className="code-pre">
        <code>{cur.code}</code>
      </pre>
    </div>
  );
}
