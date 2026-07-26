import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteChrome } from "./_components/site/SiteChrome";

const aeonik = localFont({
  src: [
    {
      path: "../public/fonts/Aeonik-Regular.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-aeonik",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
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
  themeColor: "#f7f8f8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${aeonik.variable} h-full antialiased`}>
      <body className={`${aeonik.className} min-h-full antialiased`} style={{ fontWeight: 400 }}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
