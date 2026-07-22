import type { Metadata } from "next";
import FestagHomePage from "./_components/home/FestagHomePage";

export const metadata: Metadata = {
  title: "Festag — Operational Intelligence",
  description:
    "Delivery Intelligence für Agenturen und Teams. Status, Risiken und Entscheidungen — klar für Kunden und Führung.",
  openGraph: {
    title: "Festag — Operational Intelligence",
    description:
      "Delivery Intelligence für Agenturen und Teams. Status, Risiken und Entscheidungen — klar für Kunden und Führung.",
    url: "https://festag.app",
  },
};

export default function HomePage() {
  return <FestagHomePage />;
}
