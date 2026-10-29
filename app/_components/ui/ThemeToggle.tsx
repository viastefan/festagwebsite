"use client";

import { useSyncExternalStore } from "react";

type Mode = "light" | "dark" | "system";
const KEY = "festag-site-theme";

function readMode(): Mode {
  try {
    const s = localStorage.getItem(KEY);
    if (s === "light" || s === "dark") return s;
  } catch {
    /* privater Modus */
  }
  return "system";
}
const subs = new Set<() => void>();
function subscribe(cb: () => void) {
  subs.add(cb);
  return () => {
    subs.delete(cb);
  };
}
function apply(mode: Mode) {
  const dark = mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
}

/** Einstellung „Darstellung“ (Hell, Dunkel, System). Sitzt im Footer, nicht im Header. */
export function ThemeSetting() {
  const mode = useSyncExternalStore(subscribe, readMode, () => "system" as Mode);
  const set = (m: Mode) => {
    try {
      if (m === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, m);
    } catch {
      /* ignorieren */
    }
    apply(m);
    subs.forEach((f) => f());
  };
  const opts: { id: Mode; label: string }[] = [
    { id: "light", label: "Hell" },
    { id: "dark", label: "Dunkel" },
    { id: "system", label: "System" },
  ];
  return (
    <div className="theme-set" role="radiogroup" aria-label="Darstellung">
      <span className="theme-set-l">Darstellung</span>
      {opts.map((o) => (
        <button key={o.id} type="button" role="radio" aria-checked={mode === o.id} className={mode === o.id ? "is-on" : ""} onClick={() => set(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
