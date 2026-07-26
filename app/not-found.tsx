import Link from "next/link";
import { Btn, siteLinks } from "./_components/site/primitives";

export default function NotFound() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Seite nicht gefunden</h1>
        <p className="page-body">
          Diese Route existiert nicht — zurück zur Klarheit.
        </p>
        <div className="cta-actions" style={{ marginTop: 28 }}>
          <Btn href="/" variant="solid" size="lg">
            Zur Startseite
          </Btn>
          <Btn href={siteLinks.app} variant="ghost" size="lg" external>
            Open App
          </Btn>
        </div>
        <p className="page-body" style={{ marginTop: 24 }}>
          Oder direkt zu{" "}
          <Link href="/product" style={{ color: "var(--slate)" }}>
            Produkt
          </Link>
          ,{" "}
          <Link href="/careers" style={{ color: "var(--slate)" }}>
            Karriere
          </Link>{" "}
          oder{" "}
          <Link href="/contact" style={{ color: "var(--slate)" }}>
            Kontakt
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
