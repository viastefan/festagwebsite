import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Festag — Operational Intelligence",
    short_name: "Festag",
    description:
      "Operational Intelligence über GitHub, Linear, Jira und Slack. Aven übersetzt Arbeit in Status, Risiken und Entscheidungen.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f7f5",
    theme_color: "#f8f7f5",
    lang: "de",
    icons: [
      { src: "/brand/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/brand/icon-512.png", type: "image/png", sizes: "512x512", purpose: "any" },
    ],
  };
}
