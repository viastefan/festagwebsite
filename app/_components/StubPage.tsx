import Link from "next/link";
import type { ReactNode } from "react";

/**
 * StubPage — calm, brand-correct placeholder for routes that exist in the
 * navigation but don't have a full page yet. No "coming soon" hype, no
 * playful copy — Festag tone: status-first, mailto-driven.
 */
export function StubPage({
  eyebrow,
  title,
  italicTail,
  body,
  bullets,
  mailto,
  mailtoLabel = "Talk to us",
  secondaryHref = "/contact",
  secondaryLabel = "All contact channels",
  surface = "light",
  children,
}: {
  eyebrow: string;
  title: string;
  italicTail?: string;
  body: string;
  bullets?: string[];
  mailto: string;
  mailtoLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  surface?: "light" | "dark";
  children?: ReactNode;
}) {
  const dark = surface === "dark";
  return (
    <>
      <section
        className={`relative overflow-hidden pt-[120px] pb-28 grain ${
          dark ? "surface-dark" : "surface-light"
        }`}
      >
        {dark && (
          <div
            aria-hidden
            className="absolute -top-40 right-[-10%] w-[900px] h-[600px] rounded-full opacity-[0.18] pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(91,100,125,0.5), rgba(91,100,125,0) 70%)",
            }}
          />
        )}
        <div className="shell relative">
          <p
            className={`section-label ${
              dark ? "text-white/55" : "text-fest-muted"
            }`}
          >
            {eyebrow}
          </p>
          <h1
            className={`t-headline mt-8 text-[clamp(40px,6.4vw,92px)] max-w-[20ch] ${
              dark ? "text-white" : ""
            }`}
          >
            {title}
            {italicTail && (
              <>
                {" "}
                <span
                  className={`t-serif-italic ${
                    dark ? "text-white/70" : "text-fest-muted"
                  }`}
                >
                  {italicTail}
                </span>
              </>
            )}
            .
          </h1>
          <p
            className={`t-body mt-8 max-w-[58ch] text-[clamp(16px,1.4vw,19px)] ${
              dark ? "text-white/55" : "text-fest-muted"
            }`}
          >
            {body}
          </p>

          {bullets && bullets.length > 0 && (
            <ul className="mt-12 grid gap-3 max-w-[56ch]">
              {bullets.map((b) => (
                <li
                  key={b}
                  className={`flex items-start gap-3 text-[15.5px] tracking-[0.012em] ${
                    dark ? "text-white/85" : "text-fest-text"
                  }`}
                >
                  <span className="t-mono text-fest-primary mt-1 shrink-0">
                    note
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a
              href={mailto}
              className="btn btn-primary h-12 px-6 text-[14px]"
            >
              {mailtoLabel}
            </a>
            <Link
              href={secondaryHref}
              className={`btn h-12 px-6 text-[14px] ${
                dark ? "btn-ghost-dark" : "btn-ghost-light"
              }`}
            >
              {secondaryLabel}
            </Link>
          </div>

          <p
            className={`t-mono mt-16 ${
              dark ? "text-white/30" : "text-fest-muted"
            }`}
          >
            festag · structured page coming · status-first
          </p>
        </div>
      </section>
      {children}
    </>
  );
}
