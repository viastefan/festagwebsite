import { ImageResponse } from "next/og";

export const alt = "Festag — Operational Intelligence";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#f7f8f8",
          color: "#1e1e20",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: "0.036em", color: "#5b647d" }}>
          Festag
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: "0.032em",
              maxWidth: 900,
            }}
          >
            Operational Intelligence für Teams, die liefern.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#8891a0", maxWidth: 720, letterSpacing: "0.028em" }}>
            Delivery Intelligence — Status, Risiken und Entscheidungen, klar für Kunden und Führung.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
