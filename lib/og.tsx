import { ImageResponse } from "next/og";

/** Shared Open Graph / social card renderer — one look for every page. 1200×630. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage(title: string, subtitle: string) {
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
          <div style={{ display: "flex", fontSize: 34, letterSpacing: "-0.01em" }}>festag</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.05, maxWidth: 980, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#6e6c74", maxWidth: 900 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 6, width: 160, borderRadius: 6, background: "#5b647d" }} />
      </div>
    ),
    { ...OG_SIZE },
  );
}
