import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Festag Build Memory — das Gedächtnis eurer KI-Arbeit";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "Jeder Prompt ist eine Entscheidung.",
    "Build Memory: Kapitel, Entscheidungen und Tokens gegen Lieferung gerechnet.",
  );
}
