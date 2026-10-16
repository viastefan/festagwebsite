import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Festag Produkt — die Operational-Intelligence-Plattform";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "Eine Plattform. Client Panel, Entscheidungen, Executive.",
    "Operational Intelligence über GitHub, Linear, Jira und Slack.",
  );
}
