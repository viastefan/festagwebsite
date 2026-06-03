import { ImageResponse } from "next/og";

export const alt = "Festag — AI Control Layer for Modern Project Work";
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
          background: "#080808",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -260,
            left: 300,
            width: 900,
            height: 600,
            background:
              "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
            display: "flex",
          }}
        />

        {/* Top: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            letterSpacing: "0.012em",
            color: "#FFFFFF",
            opacity: 0.9,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#5B647D",
              display: "block",
            }}
          />
          <span style={{ fontWeight: 500 }}>festag</span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <span
            style={{
              fontSize: 14,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              display: "flex",
            }}
          >
            AI Control Layer for Projects
          </span>
          <span
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: "0.012em",
              fontWeight: 500,
              maxWidth: 980,
              display: "flex",
            }}
          >
            Turn project chaos into clarity, proof and decisions.
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.5)",
            fontSize: 20,
            letterSpacing: "0.012em",
          }}
        >
          <span style={{ display: "flex" }}>
            Tagro · ProofGrid · Nexora · Decisions
          </span>
          <span style={{ display: "flex" }}>festag.app</span>
        </div>
      </div>
    ),
    size,
  );
}
