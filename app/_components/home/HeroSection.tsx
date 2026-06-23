import Image from "next/image";
import Link from "next/link";
import { PillButton } from "../PillButton";
import { HeroDotField } from "./HeroDotField";
import { StatusabfragePreview } from "./StatusabfragePreview";

export function HeroSection() {
  return (
    <section
      className="wire-hero wire-hero--interactive"
      aria-labelledby="hero-title"
    >
      <div className="linear-shell wire-hero-inner">
        <h1 id="hero-title" className="wire-hero-title">
          <span className="wire-hero-title-muted">
            Festag verwandelt komplexe
          </span>
          <br />
          <span className="wire-hero-title-muted">Projektarbeit </span>
          <span className="wire-hero-title-strong">in verständliche</span>
          <br />
          <span className="wire-hero-title-strong">
            Fortschritte, Entscheidungen und
          </span>
          <br />
          <span className="wire-hero-title-strong">Ergebnisse. </span>
          <span className="wire-hero-title-muted">Angetrieben von KI.</span>
        </h1>

        <div className="wire-hero-toolbar">
          <div className="wire-hero-ctas">
            <PillButton
              href="https://festag.app/login"
              variant="primary"
              external
            >
              Jetzt onboarding durchführen
            </PillButton>

            <a
              href="https://festag.app/login"
              className="wire-google-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/marketing/google-icon.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden
              />
              Mit Google verbinden
            </a>
          </div>

          <Link href="/now" className="wire-hero-note">
            <span className="wire-hero-note-badge">Neu</span>
            Wir entwickeln selber
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="wire-hero-demo">
          <StatusabfragePreview />
        </div>
      </div>

      <HeroDotField variant="light" />
    </section>
  );
}
