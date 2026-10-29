/**
 * Avens Logik für die Demo: erkennt Absicht und Thema einer Frage, antwortet mit Beleg,
 * versteht Rückfragen ("warum?", "und Stripe?") und schlägt Handlungen vor ("zeig Projekte",
 * "entscheide Mollie"). Reine Funktion, keine KI-Anbindung: ein festes Wissen über das Beispielprojekt.
 */

export type NavTarget = "status" | "decisions" | "projects" | "deliveries" | "tasks";

export type Action =
  | { kind: "decide"; optionId: string; label: string; title: string }
  | { kind: "open"; view: NavTarget; label: string };

export type Reply = {
  text: string;
  src: string[];
  topic: string | null;
  action?: Action;
  follow: string[];
  /** Rückfrage nach "warum": ausführlichere Begründung zum letzten Thema. */
  kind: "answer" | "why" | "help" | "greeting" | "action" | "unknown";
};

export type Ctx = { lastTopic: string | null; lastOption: string | null };

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[?!.,;:()„“"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const has = (t: string, words: string[]) => words.some((w) => t.includes(w));
const count = (t: string, words: string[]) => words.filter((w) => t.includes(w)).length;

const PROVIDERS: Record<string, { label: string; text: string; why: string; src: string[] }> = {
  mollie: {
    label: "Mollie",
    text: "Mit Mollie zahlt ihr bei rund 600 Bestellungen im Monat etwa 38 € weniger Gebühren als mit Stripe. SEPA-Lastschrift und Klarna sind ohne Zusatzvertrag enthalten, die Anbindung dauert einen Tag.",
    why: "Mollie ist bei eurem Volumen die günstigste Option und braucht keinen Zusatzvertrag für SEPA und Klarna. Das spart Zeit bei der Einrichtung und Geld im Monat.",
    src: ["Mollie Preisliste", "Stripe Preisliste", "Nordlicht Bestellungen"],
  },
  stripe: {
    label: "Stripe",
    text: "Stripe hat das größte Ökosystem und die beste Dokumentation, kostet bei eurem Volumen aber etwa 38 € mehr im Monat. Die Anbindung dauert rund drei Tage.",
    why: "Stripe lohnt sich, wenn ihr später viele Länder und Zahlarten braucht. Für Nordlicht heute ist es teurer, ohne dass ihr etwas davon nutzt.",
    src: ["Stripe Preisliste", "Nordlicht Bestellungen"],
  },
  adyen: {
    label: "Adyen",
    text: "Adyen ist für sehr hohe Volumen gebaut. Bei 600 Bestellungen im Monat zahlt ihr vor allem die Einrichtung und bekommt wenig dafür.",
    why: "Erst ab einem deutlich höheren Volumen rechnet sich Adyen. Für den Start empfiehlt Aven es nicht.",
    src: ["Adyen Preisliste", "Nordlicht Bestellungen"],
  },
};

type Topic = {
  id: string;
  keys: string[];
  text: string;
  why: string;
  src: string[];
  follow: string[];
  action?: Action;
};

const TOPICS: Topic[] = [
  {
    id: "login",
    keys: ["login", "meilenstein", "hängt", "haengt", "blockiert", "blocker", "api-zugang", "zugang"],
    text: "Der API-Zugang des Kunden fehlt seit drei Tagen und blockiert den Login-Meilenstein. Drei Aufgaben hängen daran. Ich habe eine Entscheidung vorbereitet und das Update in ruhiger Sprache formuliert.",
    why: "Belegt durch Linear ATL-81 (blockiert seit Montag) und die Antwort im Kanal #atlas, in der der Kunde den Zugang erst für Freitag zusagt. Ohne Zugang verschiebt sich der Meilenstein um drei bis fünf Tage.",
    src: ["Linear ATL-81", "Slack #atlas", "GitHub PR #402"],
    follow: ["Was sage ich dem Kunden?", "Wie steht Atlas?"],
    action: { kind: "open", view: "decisions", label: "Entscheidung ansehen" },
  },
  {
    id: "zahlung",
    keys: ["zahlung", "zahlungsanbieter", "gebühr", "gebuehr", "kosten", "checkout", "bezahl", "mollie", "stripe", "adyen", "klarna", "sepa"],
    text: PROVIDERS.mollie.text,
    why: PROVIDERS.mollie.why,
    src: PROVIDERS.mollie.src,
    follow: ["Und Stripe?", "Entscheide Mollie"],
    action: { kind: "decide", optionId: "mollie", label: "Mollie", title: "Mollie als Zahlungsmethode wählen" },
  },
  {
    id: "stand",
    keys: ["atlas", "stand", "steht", "fortschritt", "wie läuft", "wie laeuft", "phase", "build"],
    text: "Atlas liegt bei 68 Prozent in der Build-Phase. Das Dashboard-Modul ist abnahmebereit, offen ist nur der API-Zugang des Kunden. Die Health liegt bei 72.",
    why: "Der Fortschritt kommt aus den Tickets in Linear (ATL-81 bis ATL-88) und den gemergten Pull Requests. Ein Ticket gilt erst als fertig, wenn Tests grün sind und die Vorschau abgenommen ist.",
    src: ["Linear ATL-88", "GitHub PR #402"],
    follow: ["Warum hängt der Login-Meilenstein?", "Zeig mir die Projekte"],
    action: { kind: "open", view: "projects", label: "Projekte öffnen" },
  },
  {
    id: "kunde",
    keys: ["kunde", "kunden", "sagen", "sage", "update", "mail", "schreiben", "nachricht"],
    text: "Sagt Atlas, dass das Dashboard fertig ist und der Login-Bereich noch auf den API-Zugang wartet. Ohne Zugang verschiebt sich der Meilenstein um drei bis fünf Tage. Den Text habe ich vorbereitet, er geht erst raus, wenn ihr ihn freigebt.",
    why: "Kunden bekommen von Festag nur übersetzte Sätze mit Beleg, keine Tickets und keine Threads. Nichts verlässt das Team ohne eure Freigabe.",
    src: ["Slack #atlas", "Linear ATL-81"],
    follow: ["Warum hängt der Login-Meilenstein?", "Was passiert nach der Entscheidung?"],
  },
  {
    id: "risiko",
    keys: ["risiko", "risiken", "gefahr", "problem", "kritisch", "ampel", "health"],
    text: "Zwei Risiken sind offen: der fehlende API-Zugang bei Atlas (hoch) und die fehlenden Inhalte bei Kontor Relaunch (mittel, etwa zwei Wochen Verzug). Alle anderen Projekte laufen im Plan.",
    why: "Aven bewertet Risiken aus Blockern, Terminen und Wartezeiten. Atlas und Kontor liegen mit Health 72 und 54 unter dem Schnitt von 77.",
    src: ["Linear ATL-81", "Kontor Inhalte", "Slack #kontor"],
    follow: ["Wie steht Atlas?", "Zeig mir die Projekte"],
    action: { kind: "open", view: "projects", label: "Projekte öffnen" },
  },
  {
    id: "projekte",
    keys: ["projekt", "projekte", "portfolio", "überblick", "ueberblick", "alle"],
    text: "Vier Projekte sind aktiv, die Health liegt im Schnitt bei 77. Velo Preview ist live, Nordlicht Checkout im Review, Atlas im Build, Kontor Relaunch am Anfang und mit Health 54 am niedrigsten.",
    why: "Die Health setzt sich aus Fortschritt, offenen Blockern und Wartezeiten zusammen und wird bei jedem neuen Signal neu berechnet.",
    src: ["Atlas", "Nordlicht", "Velo", "Kontor"],
    follow: ["Welche Risiken gibt es?", "Was ist zuletzt geliefert worden?"],
    action: { kind: "open", view: "projects", label: "Projekte öffnen" },
  },
  {
    id: "lieferungen",
    keys: ["geliefert", "lieferung", "lieferungen", "fertig", "abgenommen", "pull request", "merge", "gemerged"],
    text: "Zuletzt geliefert: das Dashboard-Modul (PR #402) vor zwei Stunden, Rollen und Rechte am Montag und die Velo-Vorschau seit einer Stunde live. Das Update für Atlas wartet auf eure Freigabe.",
    why: "Eine Lieferung zählt erst mit Beleg: gemergter Pull Request, grüne Tests und abgenommene Vorschau.",
    src: ["GitHub PR #402", "GitHub PR #398"],
    follow: ["Wie steht Atlas?", "Welche Aufgaben sind offen?"],
    action: { kind: "open", view: "deliveries", label: "Lieferungen öffnen" },
  },
  {
    id: "aufgaben",
    keys: ["aufgabe", "aufgaben", "todo", "offen", "zu tun", "muss ich"],
    text: "Für dich ist eine Aufgabe offen: den Zugang zur Atlas-API anfragen. Bei Claude Code liegen die Mollie-Webhooks, beim Kunden die Texte für Kontor.",
    why: "Aufgaben entstehen aus getroffenen Entscheidungen. Aven vergibt sie mit Brief und Akzeptanzkriterien an die richtige Person oder den Agent.",
    src: ["Linear ATL-81", "Linear NC-14"],
    follow: ["Warum hängt der Login-Meilenstein?", "Zeig mir die Lieferungen"],
    action: { kind: "open", view: "tasks", label: "Aufgaben öffnen" },
  },
  {
    id: "agent",
    keys: ["agent", "claude", "cursor", "codex", "coding", "nach der entscheidung", "übergabe", "uebergabe", "brief"],
    text: "Nach der Entscheidung schreibt Aven einen Brief mit Kontext und Akzeptanzkriterien und übergibt ihn an euren Coding-Agent, zum Beispiel Claude Code oder Cursor. Der Pull Request kommt als Beleg zurück, danach formuliert Aven das Update für den Kunden.",
    why: "So bleibt die Entscheidung nachvollziehbar: Frage, Begründung, Brief, Pull Request und Update stehen zusammen im Projekt.",
    src: [],
    follow: ["Entscheide Mollie", "Was passiert mit meinen Daten?"],
  },
  {
    id: "daten",
    keys: ["daten", "datenschutz", "sicher", "dsgvo", "server", "überwach", "ueberwach", "training"],
    text: "Festag läuft auf Servern in Deutschland und trainiert keine Modelle auf euren Daten. Es gibt keine Screenshots und kein Tracking von Personen, und nichts erreicht Kunden ohne Freigabe aus eurem Team.",
    why: "Festag liest Signale aus euren Tools, nicht Menschen. Persönliche Profile sind Opt-in, Export und Löschung sind jederzeit möglich.",
    src: [],
    follow: ["Wie läuft die Übergabe an den Agent?", "Was kostet Festag?"],
  },
  {
    id: "preis",
    keys: ["preis", "preise", "festag kostet", "was kostet festag", "workspace", "abo", "bezahlen"],
    text: "Der erste Workspace ist kostenlos, danach kostet jeder Workspace 19 € im Monat, nie pro Kopf. Mitglieder und Kunden sind immer unbegrenzt.",
    why: "Bezahlt wird pro Workspace, weil Festag pro Projektumfeld Wissen aufbaut und nicht pro Person.",
    src: ["Preise"],
    follow: ["Was passiert mit meinen Daten?", "Was kannst du?"],
  },
];

const HELP: Reply = {
  text: "Ich lese Linear, Slack, GitHub und Jira und beantworte, was wirklich läuft, immer mit Quelle. Fragt mich nach Stand, Risiken, Kosten oder dem Kunden, lasst mich Ansichten öffnen oder eine Entscheidung vorbereiten.",
  src: [],
  topic: null,
  follow: ["Wie steht Atlas?", "Welche Risiken gibt es?", "Zeig mir die Aufgaben"],
  kind: "help",
};

const NAV_WORDS: { view: NavTarget; keys: string[]; label: string }[] = [
  { view: "projects", keys: ["projekt"], label: "Projekte" },
  { view: "tasks", keys: ["aufgabe"], label: "Aufgaben" },
  { view: "deliveries", keys: ["lieferung"], label: "Lieferungen" },
  { view: "decisions", keys: ["entscheidung"], label: "Entscheidungen" },
  { view: "status", keys: ["status", "feed"], label: "Status" },
];

export function aven(input: string, ctx: Ctx): Reply {
  const t = norm(input);
  const words = t.split(" ").filter(Boolean);

  if (!t) return HELP;

  // Begrüßung
  if (/^(hi|hallo|hey|moin|servus|guten (morgen|tag|abend))\b/.test(t) && words.length <= 4) {
    return {
      text: "Hallo Sara. Zwei Entscheidungen warten auf dich: der Zahlungsanbieter bei Nordlicht und der API-Zugang bei Atlas. Sonst läuft alles im Plan.",
      src: [],
      topic: null,
      follow: ["Warum hängt der Login-Meilenstein?", "Was kostet Mollie?"],
      kind: "greeting",
    };
  }

  // Hilfe
  if (has(t, ["was kannst du", "hilfe", "help", "was geht", "wie funktioniert"]) && words.length <= 6) return HELP;

  // Ansicht öffnen
  if (has(t, ["zeig", "öffne", "oeffne", "geh zu", "gehe zu", "zeige"])) {
    const nav = NAV_WORDS.find((n) => has(t, n.keys));
    if (nav) {
      return {
        text: `Ich öffne ${nav.label}.`,
        src: [],
        topic: null,
        action: { kind: "open", view: nav.view, label: `${nav.label} öffnen` },
        follow: ["Wie steht Atlas?", "Welche Risiken gibt es?"],
        kind: "action",
      };
    }
  }

  // Entscheidung vorbereiten
  const prov = Object.keys(PROVIDERS).find((p) => t.includes(p));
  if (prov && has(t, ["entscheid", "wähl", "waehl", "nimm", "nehmen", "mach", "festlegen", "nutzen"])) {
    const p = PROVIDERS[prov];
    return {
      text: `Ich bereite die Entscheidung vor: ${p.label} als Zahlungsmethode. ${p.why} Du bestätigst sie, dann übergebe ich den Brief an den Coding-Agent.`,
      src: p.src,
      topic: "zahlung",
      action: { kind: "decide", optionId: prov, label: p.label, title: `${p.label} als Zahlungsmethode wählen` },
      follow: ["Warum?", "Was passiert nach der Entscheidung?"],
      kind: "action",
    };
  }

  // Themen nach Treffern bewerten
  let best: Topic | null = null;
  let score = 0;
  for (const tp of TOPICS) {
    const n = count(t, tp.keys);
    if (n > score) {
      score = n;
      best = tp;
    }
  }

  // Rückfragen zum letzten Thema, aber nur ohne klar erkennbares neues Thema
  const topic = ctx.lastTopic ? TOPICS.find((x) => x.id === ctx.lastTopic) : null;
  if (topic && words.length <= 5 && (!best || best.id === topic.id)) {
    if (prov && topic.id === "zahlung") {
      const p = PROVIDERS[prov];
      return {
        text: p.text,
        src: p.src,
        topic: "zahlung",
        action: { kind: "decide", optionId: prov, label: p.label, title: `${p.label} als Zahlungsmethode wählen` },
        follow: ["Warum?", `Entscheide ${p.label}`],
        kind: "answer",
      };
    }
    if (has(t, ["warum", "wieso", "weshalb", "begründ", "begruend", "beleg", "quelle", "woher", "mehr", "genauer", "details", "und sonst", "weiter"])) {
      const last = topic.id === "zahlung" && ctx.lastOption ? PROVIDERS[ctx.lastOption] : null;
      if (last) {
        return {
          text: last.why,
          src: last.src,
          topic: topic.id,
          follow: topic.follow,
          kind: "why",
          action: { kind: "decide", optionId: ctx.lastOption as string, label: last.label, title: `${last.label} als Zahlungsmethode wählen` },
        };
      }
      return { text: topic.why, src: topic.src, topic: topic.id, follow: topic.follow, kind: "why", action: topic.action };
    }
  }

  if (best) {
    // Zahlungsfragen mit Anbieter beantworten, sonst allgemein
    if (best.id === "zahlung" && prov) {
      const p = PROVIDERS[prov];
      return {
        text: p.text,
        src: p.src,
        topic: "zahlung",
        action: { kind: "decide", optionId: prov, label: p.label, title: `${p.label} als Zahlungsmethode wählen` },
        follow: ["Warum?", `Entscheide ${p.label}`],
        kind: "answer",
      };
    }
    return { text: best.text, src: best.src, topic: best.id, follow: best.follow, action: best.action, kind: "answer" };
  }

  return {
    text: "Dazu habe ich in den verbundenen Tools noch nichts Belegtes gefunden. Ich erfinde nichts. Das kann ich belegen:",
    src: [],
    topic: ctx.lastTopic,
    follow: ["Wie steht Atlas?", "Welche Risiken gibt es?", "Was kostet Mollie?"],
    kind: "unknown",
  };
}

/** Fragen für Autoplay und Vorschläge. */
export const STARTERS = [
  "Warum hängt der Login-Meilenstein?",
  "Was kostet Mollie bei 600 Bestellungen?",
  "Wie steht Atlas?",
  "Was sage ich dem Kunden?",
];
