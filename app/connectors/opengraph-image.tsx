import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";

export const alt = "Festag Connectors — GitHub, Linear, Jira, Slack und mehr";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage(
    "Jedes Signal wird zu Bedeutung.",
    "GitHub, Linear, Jira, Slack — liest, was euer Team ohnehin nutzt.",
  );
}
