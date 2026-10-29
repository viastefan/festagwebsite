"use client";

import Link from "next/link";
import { useEffect } from "react";

/** Wenn etwas im Browser schiefgeht: freundliche Seite mit Neuladen statt leerem Bildschirm. */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="wrap" style={{ padding: "96px 0", textAlign: "center" }}>
      <h1 className="display" style={{ marginInline: "auto" }}>
        Das hat nicht geklappt.
      </h1>
      <p className="lead" style={{ margin: "14px auto 26px" }}>
        Beim Laden der Seite ist etwas schiefgegangen. Ein Neuladen hilft meistens.
      </p>
      <div className="btn-row" style={{ justifyContent: "center" }}>
        <button type="button" className="btn btn--solid btn--lg" onClick={() => reset()}>
          Neu laden
        </button>
        <Link className="btn btn--soft btn--lg" href="/">
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
