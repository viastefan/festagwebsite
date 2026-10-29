"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Palette = dynamic(() => import("./SearchPalette").then((m) => m.SearchPalette), { ssr: false });

/** Lädt die Suche (samt Wissensindex) erst beim ersten Öffnen: ⌘K, „/“ oder Knopf. */
export function SearchHost() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (loaded) return;
    const load = () => setLoaded(true);
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = !!t?.closest?.("input, textarea, select, [contenteditable]");
      if (((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") || (e.key === "/" && !typing)) {
        e.preventDefault();
        load();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("festag:search", load);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("festag:search", load);
    };
  }, [loaded]);
  return loaded ? <Palette startOpen /> : null;
}

export function SearchButton({ className }: { className?: string }) {
  return (
    <button type="button" className={`search-btn${className ? ` ${className}` : ""}`} aria-label="Suche öffnen" onClick={() => window.dispatchEvent(new Event("festag:search"))}>
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
        <circle cx="9" cy="9" r="5.5" />
        <path d="m13.2 13.2 3.3 3.3" />
      </svg>
      <span className="search-btn-l">Suche</span>
      <kbd>⌘K</kbd>
    </button>
  );
}
