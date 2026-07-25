import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./landing.css";
import { LocaleGate } from "./_components/LocaleGate";
import { SiteChrome } from "./_components/SiteChrome";

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
  themeColor: "#000000",
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
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body
        className={`${GeistSans.className} min-h-full flex flex-col bg-black text-[#f5f5f7] antialiased`}
      >
        <LocaleGate />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
