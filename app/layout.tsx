import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./landing.css";
import { LocaleGate } from "./_components/LocaleGate";
import { SiteChrome } from "./_components/SiteChrome";
import { AskAiPanel } from "./_components/AskAiPanel";

const aeonik = localFont({
  src: [
    {
      path: "../public/fonts/Aeonik-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Aeonik-Medium.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
  fallback: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    "SF Pro Text",
    "Segoe UI",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://festag.app"),
  title: {
    default: "Festag — Operational Intelligence",
    template: "%s · Festag",
  },
  description:
    "Delivery Intelligence für Agenturen und Teams. Status, Risiken und Entscheidungen — klar für Kunden und Führung.",
  applicationName: "Festag",
  keywords: [
    "Festag",
    "Operational Intelligence",
    "Delivery Intelligence",
    "Projektsichtbarkeit",
    "Tagro",
    "Company Brain",
  ],
  openGraph: {
    title: "Festag — Operational Intelligence",
    description:
      "Delivery Intelligence für Agenturen und Teams. Status, Risiken und Entscheidungen — klar für Kunden und Führung.",
    url: "https://festag.app",
    siteName: "Festag",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festag — Operational Intelligence",
    description:
      "Delivery Intelligence für Agenturen und Teams. Status, Risiken und Entscheidungen — klar für Kunden und Führung.",
  },
  icons: {
    icon: [{ url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: "/brand/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${aeonik.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body
        className={`${aeonik.className} min-h-full flex flex-col bg-[#f7f7f8] text-[#0a0a0b] antialiased`}
        style={{ fontWeight: 400 }}
      >
        <LocaleGate />
        <SiteChrome>{children}</SiteChrome>
        <AskAiPanel />
      </body>
    </html>
  );
}
