import type { ReactNode } from "react";

export function HeroProductFrame({ children }: { children: ReactNode }) {
  return (
    <div className="hero-frame">
      <div className="hero-frame-chrome">
        <div className="hero-frame-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="hero-frame-url">
          <span className="hero-frame-lock" aria-hidden>
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
              <path
                d="M2 5V3.5C2 1.843 3.343 0.5 5 0.5C6.657 0.5 8 1.843 8 3.5V5M1.5 5H8.5C9.052 5 9.5 5.448 9.5 6V10.5C9.5 11.052 9.052 11.5 8.5 11.5H1.5C0.948 11.5 0.5 11.052 0.5 10.5V6C0.5 5.448 0.948 5 1.5 5Z"
                stroke="currentColor"
                strokeWidth="0.9"
              />
            </svg>
          </span>
          festag.app
        </div>
      </div>
      <div className="hero-frame-body">{children}</div>
    </div>
  );
}
