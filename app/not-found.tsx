import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found · 404",
  description: "This page does not exist on festag.app.",
};

export default function NotFound() {
  return (
    <section className="surface-dark relative overflow-hidden pt-[120px] pb-32 grain min-h-[80vh]">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.15] pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
        }}
      />
      <div className="shell relative">
        <p className="section-label text-white/55">404</p>
        <h1 className="t-headline mt-8 text-white text-[clamp(44px,7.4vw,108px)] max-w-[18ch]">
          This page does not{" "}
          <span className="t-serif-italic text-white/70">exist</span>.
        </h1>
        <p className="t-body mt-8 max-w-[58ch] text-white/55 text-[clamp(16px,1.4vw,19px)]">
          Vielleicht ist sie noch nicht gebaut — wir veröffentlichen, wenn
          etwas substantielles steht. Bis dahin:
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary h-12 px-6 text-[14px]">
            Back to start
          </Link>
          <Link href="/product" className="btn btn-ghost-dark h-12 px-6 text-[14px]">
            See the product
          </Link>
          <Link href="/careers" className="btn btn-ghost-dark h-12 px-6 text-[14px]">
            Open roles
          </Link>
        </div>

        <p className="t-mono mt-16 text-white/30">
          festag / status · 404 not found
        </p>
      </div>
    </section>
  );
}
