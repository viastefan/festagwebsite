import type { Metadata } from "next";
import Link from "next/link";

const DOWNLOAD_URL = "https://festag.app/downloads/festag-chrome-extension.zip";
const APP_GUIDE_URL = "https://festag.app/download#chrome-extension";

const STEPS = [
  {
    title: "ZIP herunterladen",
    detail: "Die Erweiterung speichern und in einen Ordner entpacken.",
  },
  {
    title: "Chrome-Erweiterungen öffnen",
    detail: "In Chrome chrome://extensions in der Adresszeile öffnen.",
  },
  {
    title: "Entwicklermodus aktivieren",
    detail: "Oben rechts den Schalter einschalten.",
  },
  {
    title: "Entpackte Erweiterung laden",
    detail: "Den entpackten Ordner auswählen.",
  },
  {
    title: "Bei Festag anmelden",
    detail: "Im selben Browser bei festag.app einloggen, Projekt wählen, Feedback auf der Vorschau-Seite aufnehmen.",
  },
] as const;

export const metadata: Metadata = {
  title: "Chrome-Erweiterung — Tagro Live-Feedback",
  description:
    "Sprich oder tippe Feedback direkt auf deiner Projekt-Vorschau. Tagro macht daraus umsetzbare Änderungen für dein Team.",
};

export default function ExtensionPage() {
  return (
    <section className="relative overflow-hidden pt-[120px] pb-28 grain surface-light">
      <div className="shell relative max-w-[760px]">
        <p className="section-label text-fest-muted">Chrome-Erweiterung</p>
        <h1 className="t-headline mt-8 text-[clamp(40px,5.8vw,72px)] max-w-[16ch]">
          Live-Feedback{" "}
          <span className="t-serif-italic text-fest-muted">auf der Seite</span>.
        </h1>
        <p className="t-body mt-8 max-w-[58ch] text-[clamp(16px,1.4vw,19px)] text-fest-muted">
          Die Festag Chrome-Erweiterung bringt Tagro direkt auf deine Projekt-Vorschau.
          Sprechen, tippen, Elemente markieren — dein Team bekommt strukturierte Freigaben.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href={DOWNLOAD_URL} className="lp-btn lp-btn--primary">
            Erweiterung herunterladen
          </a>
          <Link href={APP_GUIDE_URL} className="lp-btn lp-btn--secondary">
            Anleitung in Festag
          </Link>
        </div>

        <ol className="mt-14 grid gap-0 border border-black/8 rounded-2xl overflow-hidden bg-white">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-4 px-5 py-4 border-t border-black/6 first:border-t-0"
            >
              <span className="t-mono text-fest-primary shrink-0 mt-0.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[15px] font-medium text-fest-text">{step.title}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-fest-muted">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-[14px] leading-relaxed text-fest-muted max-w-[58ch]">
          Die Erweiterung läuft in Chrome und Edge. Nach dem Laden erscheint das Festag-Icon in der
          Symbolleiste. Ohne Chrome kannst du Live-Feedback auch direkt in Festag unter{" "}
          <Link href="https://festag.app/captures" className="text-fest-text underline underline-offset-2">
            Freigaben
          </Link>{" "}
          starten.
        </p>
      </div>
    </section>
  );
}
