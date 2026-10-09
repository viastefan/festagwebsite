import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteChrome } from "./_components/site/SiteChrome";

const aeonik = localFont({
  src: [
    { path: "../public/fonts/Aeonik-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "500", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** Editorial serif — used sparingly for client-facing language and accents. */
const serif = localFont({
  src: [{ path: "../public/fonts/EditorsNote-MediumItalic.otf", weight: "500", style: "italic" }],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const DESCRIPTION =
  "Festag ist die Operational-Intelligence-Schicht über GitHub, Linear, Jira und Slack. Tagro übersetzt Arbeitssignale in Status, Risiken und Entscheidungen — klar für Kunden und Führung.";

export const metadata: Metadata = {
  metadataBase: new URL("https://festag.app"),
  title: {
    default: "Festag — Operational Intelligence für Teams, die liefern",
    template: "%s · Festag",
  },
  description: DESCRIPTION,
  applicationName: "Festag",
  openGraph: {
    title: "Festag — Operational Intelligence für Teams, die liefern",
    description: DESCRIPTION,
    url: "https://festag.app",
    siteName: "Festag",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festag — Operational Intelligence",
    description: DESCRIPTION,
  },
  icons: {
    icon: [{ url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }],
    apple: "/brand/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${aeonik.variable} ${serif.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
