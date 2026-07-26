import type { Metadata } from "next";
import { HomePage } from "./_components/site/HomePage";

export const metadata: Metadata = {
  title: "Festag — Operational Intelligence",
  description:
    "Delivery Intelligence für Agenturen und Teams. Status, Risiken und Entscheidungen — klar für Kunden und Führung.",
};

export default function Page() {
  return <HomePage />;
}
