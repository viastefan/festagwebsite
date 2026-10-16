import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Festag Modelle & Intelligence — Adaptive Intelligence";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "Wird mit jedem Projekt klüger.",
    "Adaptive Intelligence: die Operational DNA eurer Organisation.",
  );
}
