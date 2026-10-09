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
          background: "linear-gradient(180deg, #f7f6f2 0%, #efe9e6 100%)",
          color: "#17161b",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="40" height="40" viewBox="0 0 64 64" fill="#17161b">
            <path d="M14 6h33.6c1.2 0 2.3.5 3 1.5l6 8.2c.9 1.2.8 2.9-.2 4L27.7 54.4c-.9 1.1-2.2 1.6-3.6 1.6H14c-4.4 0-8-3.6-8-8V14c0-4.4 3.6-8 8-8z" />
            <path d="M54.9 32.4c1-1.1 2.6-.4 2.6 1.1V51c0 2.8-2.2 5-5 5H37.6c-1.4 0-2.1-1.6-1.2-2.7z" />
          </svg>
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
        <div style={{ display: "flex", height: 6, width: 160, borderRadius: 6, background: "#7a1e33" }} />
      </div>
    ),
    { ...size },
  );
}
