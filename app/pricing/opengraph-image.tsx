import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Festag Preise — erster Workspace kostenlos";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "Erster Workspace kostenlos. Projekte zahlt ihr pro Meilenstein.",
    "Preise, die mitwachsen — ohne Lizenz-Theater.",
  );
}
