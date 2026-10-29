import type { Metadata } from "next";
import { Button } from "../../_components/ui/Button";
import { Icon, type IconName } from "../../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../../_components/ui/Section";
import { CodeTabs } from "../../_components/ui/CodeTabs";
import { MemoryNav, MemoryStyles } from "../shared";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  alternates: { canonical: "/memory/connect" },
  title: "Verbinden — Claude Code, Codex, Cursor und Vercel",
  description:
    "Ein Ingest-Key pro Werkzeug, ein Hook im Terminal, die Vercel-Projekt-ID für Lieferungen. Danach schreibt sich das Gedächtnis von selbst.",
};

const TOOLS: { icon: IconName; name: string; body: string }[] = [
  {
    icon: "sparkles",
    name: "Claude Code",
    body: "Ein Hook auf UserPromptSubmit schickt Prompt, Session, Branch und Tokenzahl.",
  },
  {
    icon: "cursor",
    name: "Cursor",
    body: "Threads werden als Sessions übernommen — jeder Turn mit Modell und Tokens.",
  },
  {
    icon: "server",
    name: "Codex",
    body: "Das Protokoll eines Laufs wird als ein Paket übergeben, auch im Nachhinein.",
  },
  {
    icon: "github",
    name: "Eigene Werkzeuge",
    body: "Ein POST mit Prompt und Tokenzahl genügt. Was fehlt, ergänzt Festag selbst.",
  },
];

const STEPS: { title: string; body: string }[] = [
  {
    title: "Quelle anlegen",
    body:
      "In Festag unter Gedächtnis → Tool verbinden. Werkzeug wählen, Bezeichnung vergeben, fertig. Der Key erscheint genau einmal — wir speichern nur seinen Hash.",
  },
  {
    title: "Hook einsetzen",
    body:
      "Der Aufruf unten in die Hook-Konfiguration des Werkzeugs. Er läuft im Hintergrund und blockiert nichts; schlägt er fehl, arbeitet das Werkzeug normal weiter.",
  },
  {
    title: "Vercel verbinden",
    body:
      "Die Projekt-ID aus den Vercel-Projekteinstellungen an der Quelle hinterlegen. Festag holt die Deployments und rechnet Kapitel gegen Lieferung.",
  },
  {
    title: "Arbeiten",
    body:
      "Nichts weiter. Kapitel entstehen aus Pausen und Branch-Wechseln, Zusammenfassungen schreibt Veyra, Zahlen stehen in der Token-Ökonomie.",
  },
];

const SNIPPET = `# Claude Code — ~/.claude/settings.json → hooks.UserPromptSubmit
curl -sS https://festag.app/api/memory/ingest \\
  -H "x-festag-memory-key: $FESTAG_MEMORY_KEY" \\
  -H "content-type: application/json" \\
  -d "$(jq -n \\
        --arg s "$CLAUDE_SESSION_ID" \\
        --arg b "$(git branch --show-current)" \\
        --arg p "$CLAUDE_USER_PROMPT" \\
        '{tool:"claude_code", sessionId:$s, branch:$b,
          prompts:[{role:"user", text:$p}]}')" &`;

const PAYLOAD = `POST /api/memory/ingest
x-festag-memory-key: fmk_live_…

{
  "tool": "cursor",
  "sessionId": "thread_8f21",
  "repo": "festag-mvp",
  "branch": "feature/login-rate-limit",
  "prompts": [
    {
      "role": "user",
      "text": "Rate-Limit pro IP und E-Mail, nicht pro Session.",
      "model": "claude-opus-5",
      "tokensIn": 11800,
      "tokensOut": 3400,
      "filesTouched": ["lib/auth-rate-limit.ts"]
    }
  ]
}`;

export default function MemoryConnectPage() {
  return (
    <>
      <MemoryStyles />
      <PageHero
        title={<>Ein Key, ein Hook. Den Rest macht Festag.</>}
        lead="Build Memory verlangt keine neue IDE, kein Plugin und keine Disziplin. Es hört dort zu, wo ohnehin gearbeitet wird."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Workspace erstellen
          </Button>
          <Button href="/docs" variant="soft" size="lg">
            Guides lesen
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <MemoryNav current="/memory/connect" />
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Werkzeuge, die hineinschreiben." />
          <RevealGroup className="grid-2">
            {TOOLS.map((t) => (
              <RevealItem key={t.name} className="card mem-card-full">
                <span className="card-icon">
                  <Icon name={t.icon} />
                </span>
                <h3 className="h4">{t.name}</h3>
                <p className="body">{t.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead title="In vier Schritten verbunden." />
          <RevealGroup className="mem-steps">
            {STEPS.map((s) => (
              <RevealItem key={s.title} className="mem-stepline">
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Der Hook." lead="Ein Aufruf, im Hintergrund, ohne Rückwirkung auf die Arbeit." />
          <Reveal>
            <CodeTabs tabs={[{ label: "Hook", code: SNIPPET }]} />
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            title="Oder direkt gegen die Schnittstelle."
            lead="Ein Paket pro Lauf genügt — Festag normalisiert die Feldnamen der gängigen Werkzeuge selbst."
          />
          <Reveal>
            <CodeTabs tabs={[{ label: "Paket (JSON)", code: PAYLOAD }]} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Heute verbinden, morgen nachlesen."
        lead="Das erste Kapitel steht nach der ersten Arbeitssitzung — inklusive Kosten."
      />
    </>
  );
}
