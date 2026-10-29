"use client";

/** Letzte Absicherung, falls sogar das Grundgerüst der Seite scheitert. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, background: "#f4f2ee", color: "#15130f", fontFamily: "system-ui, sans-serif", display: "grid", placeItems: "center", minHeight: "100vh", textAlign: "center", padding: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 500, margin: "0 0 10px" }}>Das hat nicht geklappt.</h1>
          <p style={{ margin: "0 0 22px", color: "#4b463e" }}>Bitte lade die Seite neu.</p>
          <button type="button" onClick={() => reset()} style={{ height: 40, padding: "0 20px", border: 0, borderRadius: 999, background: "#3f1b24", color: "#fff", fontSize: 14, cursor: "pointer" }}>
            Neu laden
          </button>
        </div>
      </body>
    </html>
  );
}
