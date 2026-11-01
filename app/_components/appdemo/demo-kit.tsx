"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

/* Theme, geteilt von allen Demos auf der Seite. */

export type Theme = "light" | "dark";
const KEY = "festag-demo-theme";
const subs = new Set<() => void>();
let current: Theme | null = null;

function readTheme(): Theme {
  if (current) return current;
  try {
    const s = window.localStorage.getItem(KEY);
    if (s === "light" || s === "dark") return (current = s);
  } catch {
    /* privater Modus */
  }
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}
export function setTheme(t: Theme) {
  current = t;
  try {
    window.localStorage.setItem(KEY, t);
  } catch {
    /* ignorieren */
  }
  subs.forEach((f) => f());
}
function subscribe(f: () => void) {
  subs.add(f);
  const mo = new MutationObserver(f);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    subs.delete(f);
    mo.disconnect();
  };
}
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, v] as const;
}

/** Spielt `steps` in Schleife ab, solange `active`. Schritt = [Wartezeit in ms, Aktion]. */
export function useScript(active: boolean, steps: [number, () => void][]) {
  const ref = useRef(steps);
  useEffect(() => {
    ref.current = steps;
  });
  useEffect(() => {
    if (!active) return;
    let i = 0;
    let t = 0;
    const run = () => {
      const [ms, fn] = ref.current[i];
      t = window.setTimeout(() => {
        fn();
        i = (i + 1) % ref.current.length;
        run();
      }, ms);
    };
    run();
    return () => window.clearTimeout(t);
  }, [active]);
}

/** Autoplay im Sichtbereich. Der erste Klick übergibt die Steuerung. */
export function useDemo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [manual, setManual] = useState(false);
  const auto = inView && !manual && !reduced;
  const onPointerDownCapture = useCallback((e: React.PointerEvent) => {
    if (!(e.target as HTMLElement).closest(".ad-theme")) setManual(true);
  }, []);
  return { ref, auto, reduced, onPointerDownCapture };
}

export const I = {
  check: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 10.5 3.2 3.2L15 6.8" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.6" />
      <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.2 9.6A5.4 5.4 0 0 1 6.4 2.8a5.4 5.4 0 1 0 6.8 6.8Z" />
    </svg>
  ),
  caret: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  ),
  up: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10V2.5M2.8 5.5 6 2.3l3.2 3.2" />
    </svg>
  ),
};

function ThemeSwitch({ theme }: { theme: Theme }) {
  return (
    <div className="ad-theme" role="group" aria-label="Darstellung">
      <button type="button" aria-label="Hell" aria-pressed={theme === "light"} onClick={() => setTheme("light")}>
        {I.sun}
      </button>
      <button type="button" aria-label="Dunkel" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>
        {I.moon}
      </button>
    </div>
  );
}

export function Frame({
  children,
  rail,
  aside,
  title = "Festag",
  height,
  fixed,
}: {
  children: ReactNode;
  rail?: ReactNode;
  aside?: ReactNode;
  title?: string;
  height?: number;
  fixed?: boolean;
}) {
  const theme = useTheme();
  return (
    <div className="ad" data-theme={theme} style={height ? ({ "--ad-h": `${height}px` } as CSSProperties) : undefined}>
      <div className="adw">
        <div className="adw-bar">
          <div className="adw-dots" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="adw-title">{title}</div>
          <div className="adw-tools">
            <ThemeSwitch theme={theme} />
          </div>
        </div>
        <div className={`adw-body${rail ? "" : " no-rail"}${fixed ? " is-fixed" : ""}${aside ? " has-aside" : ""}`}>
          {rail}
          <div className="ad-main">{children}</div>
          {aside}
        </div>
      </div>
    </div>
  );
}
