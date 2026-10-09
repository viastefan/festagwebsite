import { Button, TextLink } from "./_components/ui/Button";
import { FestagMark } from "./_components/ui/Logo";

export default function NotFound() {
  return (
    <section className="page-hero page-hero--center" style={{ paddingBlock: "clamp(80px, 14vw, 160px)" }}>
      <div className="wrap">
        <FestagMark className="nf-mark" />
        <p className="eyebrow" style={{ justifyContent: "center", marginTop: 24 }}>
          404
        </p>
        <h1 className="display" style={{ marginTop: 16 }}>
          Dieses Signal führt <span className="serif accent">nirgendwohin.</span>
        </h1>
        <p className="lead">Die Seite existiert nicht oder ist umgezogen. Zurück zur Klarheit:</p>
        <div className="btn-row">
          <Button href="/" variant="solid" size="lg" arrow>
            Zur Startseite
          </Button>
          <Button href="/contact" variant="ghost" size="lg">
            Kontakt
          </Button>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          <TextLink href="/product">Produkt</TextLink>
          <TextLink href="/pricing">Preise</TextLink>
          <TextLink href="/changelog">Changelog</TextLink>
        </div>
      </div>
      <style>{`.nf-mark { width: 44px; height: 44px; margin: 0 auto; color: var(--ink); }`}</style>
    </section>
  );
}
