"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { quickLinks, search, suggestions, type SearchEntry, type SearchKind } from "@/lib/site/search-index";

const RECENT_KEY = "festag-site-recent";
const ORDER: SearchKind[] = ["Antwort", "Seite", "Preis", "Konnektor", "API", "Update"];

function readRecent(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    return Array.isArray(v) ? v.filter((x) => typeof x === "string").slice(0, 5) : [];
  } catch {
    return [];
  }
}

function Mark({ text, q }: { text: string; q: string }) {
  const words = q
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1);
  if (!words.length) return <>{text}</>;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "ig");
  return (
    <>
      {text.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>))}
    </>
  );
}

/** Suche für die ganze Website: ⌘K / Strg+K oder „/“, Pfeiltasten, Enter. Wissen aus dem Such-Index. */
export function SearchPalette({ startOpen = false }: { startOpen?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(startOpen);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const [recent, setRecent] = useState<string[]>(() => (startOpen && typeof window !== "undefined" ? readRecent() : []));
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => lastFocus.current?.focus?.(), 0);
  }, []);

  const openIt = useCallback(() => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setRecent(readRecent());
    setQ("");
    setSel(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      const typing = !!t?.closest?.("input, textarea, select, [contenteditable]");
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else openIt();
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        openIt();
      }
    };
    const onEvt = () => openIt();
    window.addEventListener("keydown", onKey);
    window.addEventListener("festag:search", onEvt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("festag:search", onEvt);
    };
  }, [open, openIt, close]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const results = useMemo(() => (q.trim() ? search(q) : []), [q]);
  const groups = useMemo(() => {
    const src: SearchEntry[] = q.trim() ? results : [...suggestions, ...quickLinks];
    if (!q.trim()) return [{ label: "Fragen", items: suggestions }, { label: "Schnellzugriff", items: quickLinks }].filter((g) => g.items.length);
    return ORDER.map((k) => ({ label: k === "Antwort" ? "Antworten" : k === "Seite" ? "Seiten" : k === "Update" ? "Updates" : k + (k === "Konnektor" ? "en" : ""), items: src.filter((e) => e.kind === k) })).filter((g) => g.items.length);
  }, [q, results]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const go = (e: SearchEntry) => {
    if (q.trim()) {
      try {
        const next = [q.trim(), ...readRecent().filter((x) => x !== q.trim())].slice(0, 5);
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* ignorieren */
      }
    }
    setOpen(false);
    if (e.href.startsWith("http")) window.open(e.href, "_blank", "noopener");
    else router.push(e.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(flat.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter" && flat[sel]) {
      e.preventDefault();
      go(flat[sel]);
    }
  };

  if (!open) return null;
  return (
    <div className="sp" role="dialog" aria-modal="true" aria-label="Suche" onKeyDown={onKeyDown}>
      <button type="button" className="sp-scrim" aria-label="Suche schließen" tabIndex={-1} onClick={close} />
      <div className="sp-card">
        <div className="sp-field">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
            <circle cx="9" cy="9" r="5.5" />
            <path d="m13.2 13.2 3.3 3.3" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            placeholder="Suche, oder stelle eine Frage …"
            aria-label="Suche"
            autoComplete="off"
            spellCheck={false}
            maxLength={120}
          />
          <kbd>Esc</kbd>
        </div>
        <div className="sp-list" ref={listRef}>
          {!q.trim() && recent.length ? (
            <div className="sp-recent">
              <span>Zuletzt</span>
              {recent.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setQ(r);
                    setSel(0);
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          ) : null}
          {groups.map((g, gi) => (
            <div key={g.label} className="sp-group">
              <div className="sp-gl">{g.label}</div>
              {g.items.map((it, ii) => {
                const i = groups.slice(0, gi).reduce((n, x) => n + x.items.length, 0) + ii;
                const on = i === sel;
                return (
                  <button
                    key={it.id}
                    type="button"
                    data-i={i}
                    className={`sp-item${on ? " is-on" : ""}${it.kind === "Antwort" ? " is-answer" : ""}`}
                    onMouseMove={() => setSel(i)}
                    onClick={() => go(it)}
                  >
                    <span className="sp-t">
                      <Mark text={it.title} q={q} />
                    </span>
                    <span className="sp-x">{it.text}</span>
                    {on ? <span className="sp-go">{it.href.startsWith("http") ? "Öffnen ↗" : "Öffnen ↵"}</span> : null}
                  </button>
                );
              })}
            </div>
          ))}
          {q.trim() && !flat.length ? (
            <div className="sp-empty">
              <b>Nichts gefunden für „{q.trim()}“.</b>
              <span>Versuche ein anderes Wort, oder frag uns direkt.</span>
              <div>
                <button type="button" onClick={() => go({ id: "x", kind: "Seite", title: "", text: "", href: "/contact" })}>
                  Kontakt
                </button>
                <button type="button" onClick={() => go({ id: "y", kind: "Seite", title: "", text: "", href: "/docs" })}>
                  Guides
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="sp-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> wählen
          </span>
          <span>
            <kbd>↵</kbd> öffnen
          </span>
          <span className="sp-hint">
            <kbd>⌘</kbd>
            <kbd>K</kbd> überall
          </span>
        </div>
      </div>
    </div>
  );
}

