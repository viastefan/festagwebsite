/**
 * Such-Index der Website: alles, was Festag über sich selbst weiß, in einer Liste.
 * Wird zur Build-Zeit aus den Inhalten der Seiten gebaut (Konnektoren, Preise, FAQ, Changelog),
 * dazu handgepflegte Seiten und Antworten. Es ist keine KI, sondern ein durchsuchbares Wissen.
 */
import { connectors } from "./connectors";
import { changelog } from "./content";
import { pricingFaq, workspacePlans, deliveryPlans } from "./pricing";

export type SearchKind = "Seite" | "Antwort" | "Konnektor" | "Preis" | "API" | "Update";

export type SearchEntry = {
  id: string;
  kind: SearchKind;
  title: string;
  /** Kurzbeschreibung oder die Antwort selbst */
  text: string;
  href: string;
  /** Zusatzbegriffe, die man tippen könnte */
  kw?: string;
};

const PAGES: SearchEntry[] = [
  { id: "p-home", kind: "Seite", title: "Startseite", text: "Festag macht sichtbar, was dein Team arbeitet. Klickbare Demo der App.", href: "/", kw: "start home überblick demo" },
  { id: "p-product", kind: "Seite", title: "Produkt", text: "Vom Wunsch zur Lieferung: Idee, Entscheidung, Aufgabe, Ausführung, Beleg, Lieferung. Dazu die drei Modi.", href: "/product", kw: "plattform kreislauf modi manuell freigabe automatisch client panel" },
  { id: "p-aven", kind: "Seite", title: "Aven", text: "Der Interpreter, der mitdenkt: Antworten mit Quelle, Entscheidungen vorbereiten, Aufgaben übergeben.", href: "/tagro", kw: "tagro chat ki assistent entscheidung" },
  { id: "p-conn", kind: "Seite", title: "Konnektoren", text: "GitHub, Linear, Jira, Slack, Gmail, IONOS Mail und Coding-Agents verbinden.", href: "/connectors", kw: "integrationen tools verbinden" },
  { id: "p-int", kind: "Seite", title: "Modelle und Intelligence", text: "Leqra, Aven und Veyra, Operational DNA und Company Brain.", href: "/intelligence", kw: "leqra veyra okm dna company brain adaptive" },
  { id: "p-mem", kind: "Seite", title: "Build Memory", text: "Prompts, Kapitel und Token-Kosten gegen Lieferung: das Gedächtnis der KI-Entwicklung.", href: "/memory", kw: "kapitel prompts tokens kosten claude cursor codex" },
  { id: "p-ext", kind: "Seite", title: "Chrome Extension", text: "Status, Entscheidungen und Screenshots direkt im Browser erfassen.", href: "/extension", kw: "browser erweiterung capture" },
  { id: "p-price", kind: "Seite", title: "Preise", text: "Free, Pro für 7 € im Monat, Enterprise. Aven-Guthaben, Aufladung, Projekte zum Festpreis.", href: "/pricing", kw: "kosten abo guthaben pro free festpreis" },
  { id: "p-ent", kind: "Seite", title: "Enterprise", text: "White-Label, SSO, Datenresidenz, Security-Review und Onboarding für Organisationen.", href: "/enterprise", kw: "white label sso saml scim agentur" },
  { id: "p-dev", kind: "Seite", title: "API und Plugin", text: "Token erstellen, Nachrichten senden, MCP-Plugin für Claude Code, Cursor und Codex.", href: "/developers", kw: "api entwickler mcp token curl schnittstelle" },
  { id: "p-sec", kind: "Seite", title: "Sicherheit und Vertrauen", text: "Server in Deutschland, kein Training auf euren Daten, Freigabe vor jedem Versand.", href: "/security", kw: "datenschutz dsgvo avv sicher überwachung" },
  { id: "p-docs", kind: "Seite", title: "Guides", text: "Einstieg, Connectors, Client Portal, White-Label und mehr.", href: "/docs", kw: "dokumentation hilfe anleitung" },
  { id: "p-log", kind: "Seite", title: "Changelog", text: "Was neu ist, jede Woche, ohne Marketing-Nebel.", href: "/changelog", kw: "neuigkeiten updates version" },
  { id: "p-co", kind: "Seite", title: "Unternehmen", text: "Mission, Haltung und das Team hinter Festag, gebaut in Niederbayern.", href: "/company", kw: "über uns team mission dirnberger" },
  { id: "p-comm", kind: "Seite", title: "Community", text: "Early Access, Partner-Programm, Office Hours und Roadmap.", href: "/community", kw: "early access partner" },
  { id: "p-car", kind: "Seite", title: "Karriere", text: "Offene Rollen in Engineering, Design, KI, Marketing und Operations. Remote in DACH.", href: "/careers", kw: "jobs stellen bewerben" },
  { id: "p-cont", kind: "Seite", title: "Kontakt und Demo", text: "Demo anfragen, Vertrieb, Support, Security. Antwort in 24 Stunden.", href: "/contact", kw: "demo vertrieb support mail" },
];

const ANSWERS: SearchEntry[] = [
  { id: "a-start", kind: "Antwort", title: "Wie starte ich?", text: "Kostenlos registrieren, Tools verbinden, Aven die erste Frage stellen und die erste Entscheidung treffen. Dauert etwa zehn Minuten.", href: "https://festag.app/register", kw: "anfangen einrichten registrieren los" },
  { id: "a-modes", kind: "Antwort", title: "Was passiert automatisch?", text: "Das bestimmt ihr pro Projekt: Manuell (Aven bereitet vor, ihr führt aus), Freigabe (Standard) oder Automatisch. Einweg-Entscheidungen, hohes Budget und niedrige Sicherheit fallen immer auf Freigabe zurück.", href: "/product", kw: "automatisierung modus freigabe manuell" },
  { id: "a-agents", kind: "Antwort", title: "Welche Coding-Agents funktionieren?", text: "Claude Code, Cursor, Codex, Gemini CLI, Windsurf und Copilot, über das MCP-Plugin. Der Pull Request kommt als Beleg zurück.", href: "/developers#plugin", kw: "claude code cursor codex agent plugin mcp" },
  { id: "a-credit", kind: "Antwort", title: "Was ist das Aven-Guthaben?", text: "Jede Aven-Antwort kostet echtes Geld. Free enthält 1 € im Monat, Pro 6 €, ein Euro reicht für etwa 70 Antworten. Aufladen geht mit 5, 10 oder 25 €, Aufladungen verfallen 12 Monate nicht.", href: "/pricing", kw: "kosten antworten aufladen credits token" },
  { id: "a-train", kind: "Antwort", title: "Trainiert Festag auf meinen Daten?", text: "Nein. Festag trainiert keine öffentlichen Modelle auf eurem Workspace. Hosting und Verarbeitung liegen in Deutschland, persönliche Profile sind Opt-in.", href: "/security", kw: "training daten datenschutz ki modelle" },
  { id: "a-approve", kind: "Antwort", title: "Sieht der Kunde etwas ohne meine Freigabe?", text: "Nein. Ein Kunde sieht nur, was jemand aus eurem Team freigegeben hat, außer das Projekt ist ausdrücklich auf automatisch gestellt.", href: "/security", kw: "kunde freigabe sichtbar client portal" },
  { id: "a-token", kind: "Antwort", title: "Wie bekomme ich einen API-Token?", text: "In Festag unter Konnektoren erstellen. Er beginnt mit fst_, wird einmal angezeigt, ist gehasht gespeichert und lässt sich widerrufen.", href: "/developers#auth", kw: "api key schlüssel bearer" },
  { id: "a-trial", kind: "Antwort", title: "Gibt es einen Test für Pro?", text: "Ja, 14 Tage ohne Kreditkarte. Danach wechselt der Workspace zurück auf Free, außer ihr schließt Pro ab.", href: "/pricing", kw: "testen probe trial kostenlos" },
  { id: "a-mail", kind: "Antwort", title: "Kann Aven meine Mails lesen?", text: "Mit Gmail oder IONOS Mail: nur projektbezogene Nachrichten. Antworten entstehen als Entwurf, gesendet wird nur mit eurer Freigabe.", href: "/connectors", kw: "gmail ionos postfach email" },
];

const API_TOOLS: [string, string][] = [
  ["festag_today", "Der Tag: was läuft, was wartet, was blockiert ist."],
  ["festag_next", "Nächste bereite Aufgabe mit vollem Brief."],
  ["festag_list_open", "Offene Aufgaben und Entscheidungen."],
  ["festag_start_item", "Arbeit an einer Aufgabe beginnen."],
  ["festag_log_work", "Commit, Pull Request, Merge, Deploy oder Blocker protokollieren."],
  ["festag_complete_item", "Aufgabe mit Zusammenfassung und Pull-Request-Link abschließen."],
  ["festag_propose_decision", "Eine Entscheidung zur Wahl stellen, statt zu raten."],
  ["festag_flag_risk", "Ein Risiko markieren."],
  ["festag_send", "Freier Text an Festag, Aven ordnet ihn zu."],
];

export const searchIndex: SearchEntry[] = [
  ...PAGES,
  ...ANSWERS,
  ...pricingFaq.map((f, i) => ({ id: `faq-${i}`, kind: "Antwort" as const, title: f.q, text: f.a, href: "/pricing#faq", kw: "preise faq" })),
  ...connectors.map((c) => ({ id: `c-${c.id}`, kind: "Konnektor" as const, title: c.name, text: c.short, href: "/connectors", kw: `${c.category} ${c.signals.join(" ")}` })),
  ...[...workspacePlans, ...deliveryPlans].map((p) => ({ id: `pl-${p.id}`, kind: "Preis" as const, title: `${p.name}, ${p.price}${p.unit ? ` ${p.unit}` : ""}`, text: p.tagline, href: "/pricing", kw: p.features.join(" ") })),
  ...API_TOOLS.map(([n, d]) => ({ id: `t-${n}`, kind: "API" as const, title: n, text: d, href: "/developers#tools", kw: "werkzeug tool mcp plugin" })),
  { id: "api-inbound", kind: "API", title: "POST /api/orchestration/inbound", text: "Freien Text an Festag senden. Antwort 201 created oder 202 needs_project.", href: "/developers#inbound", kw: "http endpunkt curl senden nachricht" },
  ...changelog.map((c) => ({ id: `u-${c.version}`, kind: "Update" as const, title: c.title, text: c.body, href: `/changelog#v${c.version}`, kw: `${c.tags.join(" ")} ${c.highlights.join(" ")}` })),
];

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ß/g, "ss");

const indexed = searchIndex.map((e) => ({ e, t: norm(e.title), x: norm(e.text), k: norm(e.kw ?? "") }));

const STOP = new Set("ich du er sie es wir ihr mir mich dir euch uns mein dein euer der die das den dem des ein eine einen einem einer und oder aber auch noch nur ist sind war bin bist hat habe haben wird werden kann kannst koennt koennen soll sollen muss was wie wo wer wann warum wieso welche welcher welches wozu gibt gibts fuer mit von zu zum zur auf an in im bei nach aus ueber um als wenn dass ob so da hier bitte mal schon".split(" "));

/** Wortstamm: lange Wörter auf die ersten fünf Buchstaben kürzen, damit „trainiert“ auch „Training“ trifft. */
const stem = (w: string) => (w.length >= 7 ? w.slice(0, 5) : w);

/** Bewertet jeden Eintrag. Alle Suchwörter (ohne Füllwörter) müssen irgendwo vorkommen, Titel zählt am meisten. */
export function search(query: string, limit = 24): SearchEntry[] {
  const q = norm(query).replace(/[?!.,;:()"„“]/g, " ").trim();
  if (!q) return [];
  let words = q.split(/\s+/).filter(Boolean);
  const content = words.filter((w) => !STOP.has(w));
  if (content.length) words = content;
  const scoreWord = (it: (typeof indexed)[number], w0: string) => {
    let ws = 0;
    for (const w of w0 === stem(w0) ? [w0] : [w0, stem(w0)]) {
      let v = 0;
      if (it.t.startsWith(w)) v = 12;
      else if (it.t.split(/\W+/).some((x) => x.startsWith(w))) v = 9;
      else if (it.t.includes(w)) v = 7;
      else if (it.k.includes(w)) v = 4;
      else if (it.x.includes(w)) v = 2;
      if (w !== w0) v = Math.max(0, v - 1);
      ws = Math.max(ws, v);
    }
    return ws;
  };
  const run = (minShare: number) => {
    const out: { e: SearchEntry; s: number }[] = [];
    for (const it of indexed) {
      let s = 0;
      let hit = 0;
      for (const w of words) {
        const v = scoreWord(it, w);
        if (v) {
          hit += 1;
          s += v;
        }
      }
      if (!hit || hit / words.length < minShare) continue;
      if (it.e.kind === "Seite") s += 2;
      if (it.e.kind === "Antwort") s += 1;
      out.push({ e: it.e, s });
    }
    return out;
  };
  let scored = run(1);
  if (!scored.length && words.length > 1) scored = run(0.5);
  scored.sort((a, b) => b.s - a.s);
  const seen = new Set<string>();
  const res: SearchEntry[] = [];
  for (const { e } of scored) {
    const key = e.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    res.push(e);
    if (res.length >= limit) break;
  }
  return res;
}

export const suggestions: SearchEntry[] = [
  ...ANSWERS.filter((a) => ["a-start", "a-credit", "a-train", "a-agents"].includes(a.id)),
];
export const quickLinks: SearchEntry[] = PAGES.filter((p) => ["p-product", "p-price", "p-dev", "p-sec"].includes(p.id));
