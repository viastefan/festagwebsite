import { ImageResponse } from "next/og";

export const alt = "Festag — Operational Intelligence für Teams, die liefern";
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
          padding: "72px 80px",
          background: "linear-gradient(180deg, #f8f7f5 0%, #e3eaf5 100%)",
          color: "#0f0f14",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", fontSize: 34 }}>festag</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, maxWidth: 960, letterSpacing: "-0.01em" }}>
            Das Team arbeitet. Der Kunde rätselt. Festag schließt die Lücke.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#6e6c74", maxWidth: 900 }}>
            Operational Intelligence über GitHub, Linear, Jira und Slack.
          </div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, borderRadius: 6, background: "#5b647d" }} />
      </div>
    ),
    { ...size },
  );
}
