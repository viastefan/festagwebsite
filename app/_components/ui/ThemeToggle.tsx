"use client";

import { useSyncExternalStore } from "react";

type T = "light" | "dark";
const KEY = "festag-site-theme";

function read(): T {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** Schalter Hell/Dunkel für die Website. Die Wahl liegt in localStorage, das Skript im Head setzt sie vor dem ersten Bild. */
export function ThemeToggle() {
  const t = useSyncExternalStore(subscribe, read, () => "light" as T);
  const set = (next: T) => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* privater Modus */
    }
  };
  return (
    <button type="button" className="theme-btn" aria-label={t === "dark" ? "Hellen Modus einschalten" : "Dunklen Modus einschalten"} onClick={() => set(t === "dark" ? "light" : "dark")}>
      {t === "dark" ? (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
          <circle cx="8" cy="8" r="2.6" />
          <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M13.2 9.6A5.4 5.4 0 0 1 6.4 2.8a5.4 5.4 0 1 0 6.8 6.8Z" />
        </svg>
      )}
    </button>
  );
}
