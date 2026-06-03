import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "./_components/SiteNav";
import { SiteFooter } from "./_components/SiteFooter";

const aeonik = localFont({
  src: [
    { path: "../public/fonts/Aeonik-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "500", style: "normal" },
    // Festag rule: Aeonik Bold is forbidden — bolder weights resolve to Medium.
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Aeonik-Medium.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-aeonik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://festag.app"),
  title: {
    default: "Festag — AI Control Layer for Modern Project Work",
    template: "%s · Festag",
  },
  description:
    "Festag turns scattered project work into clear decisions, proof, reports and client-ready execution. The AI control layer for agencies, software teams, marketing teams and companies.",
  applicationName: "Festag",
  keywords: [
    "Festag",
    "Project Intelligence",
    "AI Control Layer",
    "Decision Inbox",
    "ProofGrid",
    "Tagro",
    "Client Reports",
    "Marketing Projects",
    "Agency Software",
    "DACH",
  ],
  openGraph: {
    title: "Festag — AI Control Layer for Modern Project Work",
    description:
      "Turn project chaos into clarity, proof and decisions. Festag is the calm operating layer for teams, clients and leaders.",
    url: "https://festag.app",
    siteName: "Festag",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Festag — AI Control Layer for Modern Project Work",
    description:
      "Turn project chaos into clarity, proof and decisions. The calm operating layer for project delivery.",
  },
  icons: {
    icon: [
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/brand/icon-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${aeonik.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-fest-white text-fest-text font-sans">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
