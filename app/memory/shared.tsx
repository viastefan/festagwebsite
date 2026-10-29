import Link from "next/link";
import type { IconName } from "../_components/ui/Icon";

/**
 * Gemeinsames Gerüst der Build-Memory-Unterseiten: eine Themen-Navigation und
 * die Styles, die nur hier gebraucht werden.
 */

export const MEMORY_PAGES: { href: string; label: string; body: string; icon: IconName }[] = [
  {
    href: "/memory",
    label: "Build Memory",
    body: "Das Gedächtnis eurer KI-Arbeit — Überblick über das ganze Thema.",
    icon: "brain",
  },
  {
    href: "/memory/chapters",
    label: "Kapitel",
    body: "Aus zusammenhängenden Prompts wird ein Container mit Titel, Kurzfassung und Ausgang.",
    icon: "layers",
  },
  {
    href: "/memory/prompts",
    label: "Prompt-Historie",
    body: "Jeder Prompt mit Modell, Tokens und berührten Dateien — bereinigt gespeichert.",
    icon: "clock",
  },
  {
    href: "/memory/token-economics",
    label: "Token-Ökonomie",
    body: "Tokens pro Lieferung, Kosten pro Lieferung, Anteil der Arbeit, die live ging.",
    icon: "chart",
  },
  {
    href: "/memory/connect",
    label: "Verbinden",
    body: "Claude Code, Codex, Cursor und Vercel anbinden — ein Key, ein Hook.",
    icon: "flow",
  },
];

export function MemoryNav({ current }: { current: string }) {
  return (
    <nav className="mem-nav" aria-label="Build Memory">
      {MEMORY_PAGES.map((page) => (
        <Link
          key={page.href}
          href={page.href}
          className="mem-nav-link"
          aria-current={current === page.href ? "page" : undefined}
        >
          {page.label}
        </Link>
      ))}
    </nav>
  );
}

export function MemoryStyles() {
  return (
    <style>{`
      .mem-nav { display: flex; flex-wrap: wrap; gap: 6px; }
      .mem-nav-link {
        display: inline-flex; align-items: center; height: 34px; padding: 0 14px;
        border-radius: 999px; border: var(--hair) solid var(--line);
        background: var(--surface); color: var(--muted); font-size: 13.5px; text-decoration: none;
        transition: color 160ms ease, background 160ms ease;
      }
      .mem-nav-link:hover { color: var(--ink); background: var(--surface-2); }
      .mem-nav-link[aria-current="page"] { background: var(--ink); border-color: var(--ink); color: var(--canvas); }

      .mem-flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
      .mem-flow-step {
        padding: 24px; border-radius: var(--r-lg); background: var(--surface);
        border: var(--hair) solid var(--line); box-shadow: var(--sh-xs); height: 100%;
      }
      .mem-step-no { display: block; font-size: 12px; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 14px; }

      .mem-question {
        display: grid; grid-template-columns: 18px 1fr; gap: 14px; padding: 22px;
        border-radius: 10px; background: var(--surface-2); font-size: 18px; line-height: 1.45; color: var(--ink);
      }
      .mem-question svg { color: var(--accent); margin-top: 5px; }

      .mem-privacy {
        padding: clamp(24px, 4vw, 40px); border-radius: var(--r-lg);
        background: var(--surface-2); border: var(--hair) solid var(--line);
      }
      .mem-privacy .body { margin-top: 14px; max-width: 70ch; }

      .mem-card-full { height: 100%; }

      .mem-chapter-demo {
        border-radius: var(--r-lg); border: var(--hair) solid var(--line);
        background: var(--surface); box-shadow: var(--sh-xs); overflow: hidden;
      }
      .mem-chapter-demo-head { padding: 22px 24px; display: grid; grid-template-columns: 1fr auto; gap: 16px; align-items: start; }
      .mem-chapter-demo-title { font-size: 18px; color: var(--ink); }
      .mem-chapter-demo-meta { margin-top: 10px; display: flex; flex-wrap: wrap; gap: 8px; font-size: 13px; color: var(--muted); }
      .mem-chapter-demo-score { text-align: right; }
      .mem-chapter-demo-score b { display: block; font-size: 26px; font-weight: 500; color: var(--ink); }
      .mem-chapter-demo-score span { font-size: 11.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--faint); }
      .mem-chapter-demo-body { padding: 0 24px 24px; border-top: var(--hair) solid var(--line); }
      .mem-chapter-demo-body p { margin: 18px 0 0; font-size: 14.5px; line-height: 1.65; color: var(--muted); max-width: 72ch; }
      .mem-turn {
        margin-top: 10px; padding: 14px 16px; border-radius: 10px; background: var(--surface-2);
        font-size: 13.5px; line-height: 1.55; color: var(--ink);
      }
      .mem-turn span { display: block; margin-bottom: 6px; font-size: 11.5px; color: var(--faint); }

      .mem-numbers { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
      .mem-number {
        padding: 22px; border-radius: var(--r-lg); background: var(--surface);
        border: var(--hair) solid var(--line); box-shadow: var(--sh-xs); height: 100%;
      }
      .mem-number b { display: block; font-size: 32px; font-weight: 500; color: var(--ink); font-variant-numeric: tabular-nums; }
      .mem-number span { display: block; margin-top: 8px; font-size: 13px; color: var(--muted); }

      .mem-code {
        margin: 0; padding: 20px 22px; border-radius: var(--r-lg);
        background: #16181C; color: #E7E6E3; overflow-x: auto;
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12.5px; line-height: 1.7;
      }
      .mem-steps { counter-reset: mem; display: grid; gap: 10px; }
      .mem-stepline {
        display: grid; grid-template-columns: 28px 1fr; gap: 14px; align-items: start;
        padding: 20px 22px; border-radius: var(--r-lg); background: var(--surface);
        border: var(--hair) solid var(--line);
      }
      .mem-stepline::before {
        counter-increment: mem; content: counter(mem);
        width: 28px; height: 28px; border-radius: 999px; display: grid; place-items: center;
        background: var(--ink); color: var(--canvas); font-size: 13px;
      }
      .mem-stepline h3 { margin: 0 0 6px; font-size: 16px; color: var(--ink); }
      .mem-stepline p { margin: 0; font-size: 14px; line-height: 1.6; color: var(--muted); }

      .mem-table { border-radius: var(--r-lg); border: var(--hair) solid var(--line); background: var(--surface); overflow: hidden; }
      .mem-table-row {
        display: grid; grid-template-columns: 1.5fr repeat(3, minmax(0, 1fr)); gap: 16px;
        padding: 16px 20px; border-top: var(--hair) solid var(--line);
        font-size: 14px; color: var(--muted); font-variant-numeric: tabular-nums; align-items: center;
      }
      .mem-table-row:first-child { border-top: 0; background: var(--surface-2); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--faint); }
      .mem-table-row span:first-child { color: var(--ink); }

      @media (max-width: 960px) {
        .mem-flow, .mem-numbers { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 640px) {
        .mem-flow, .mem-numbers { grid-template-columns: 1fr; }
        .mem-chapter-demo-head { grid-template-columns: 1fr; }
        .mem-chapter-demo-score { text-align: left; }
        .mem-table-row { grid-template-columns: 1fr auto; }
        .mem-table-row span:nth-child(n + 3) { display: none; }
      }
    `}</style>
  );
}
