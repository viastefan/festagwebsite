import type { SVGProps } from "react";

/**
 * Festag icon set — 24px grid, 1.6 stroke, round caps.
 * Connector glyphs are simplified monochrome marks, not official logos.
 */

export type IconName =
  | "arrow"
  | "arrowUpRight"
  | "chevronDown"
  | "check"
  | "plus"
  | "x"
  | "menu"
  | "send"
  | "sparkles"
  | "book"
  | "puzzle"
  | "people"
  | "mail"
  | "shield"
  | "clock"
  | "cube"
  | "signal"
  | "decision"
  | "risk"
  | "brain"
  | "layers"
  | "chart"
  | "portal"
  | "lock"
  | "globe"
  | "bolt"
  | "folder"
  | "inbox"
  | "home"
  | "target"
  | "doc"
  | "audio"
  | "search"
  | "palette"
  | "server"
  | "key"
  | "eye"
  | "flow"
  | "github"
  | "slack"
  | "linear"
  | "jira"
  | "notion"
  | "figma"
  | "gmail"
  | "drive"
  | "calendar"
  | "meet"
  | "cursor"
  | "chrome";

const STROKE: Partial<Record<IconName, React.ReactNode>> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  send: <path d="M12 19V5m-6 6 6-6 6 6" />,
  sparkles: (
    <>
      <path d="M12 3.5 13.6 9a2 2 0 0 0 1.4 1.4l5.5 1.6-5.5 1.6a2 2 0 0 0-1.4 1.4L12 20.5l-1.6-5.5A2 2 0 0 0 9 13.6L3.5 12 9 10.4A2 2 0 0 0 10.4 9z" />
    </>
  ),
  book: <path d="M5 4.5h9.5A4.5 4.5 0 0 1 19 9v10.5H9.5A4.5 4.5 0 0 1 5 15zM5 15a4.5 4.5 0 0 1 4.5-4.5H19" />,
  puzzle: (
    <path d="M9 4h3a2 2 0 1 1 4 0h0v4h0a2 2 0 1 1 0 4v0h0v4h-4a2 2 0 1 0-4 0H4v-4a2 2 0 1 0 0-4V8h5z" />
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.6a3.2 3.2 0 0 1 0 6M17.5 14.2A5.5 5.5 0 0 1 20.5 19" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </>
  ),
  shield: <path d="M12 3.5 19 6v5.5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6zM9 12l2.2 2.2L15.5 10" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  cube: <path d="m12 3.5 7.5 4.2v8.6L12 20.5l-7.5-4.2V7.7zM4.8 7.9 12 12l7.2-4.1M12 12v8.3" />,
  signal: <path d="M3.5 12h3l2.5-6 4 12 2.5-6h5" />,
  decision: <path d="M12 3.5v6m0 0-5.5 5.5V20.5M12 9.5l5.5 5.5v5.5M4.5 18.5h4M15.5 18.5h4" />,
  risk: (
    <>
      <path d="M12 4 21 19.5H3z" />
      <path d="M12 10v4.2M12 17v.01" />
    </>
  ),
  brain: (
    <path d="M9.5 4.5a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 5.5 1.5V6a3 3 0 0 0-2.5-1.5zm5 0a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-5.5 1.5" />
  ),
  layers: <path d="m12 4 8.5 4.5L12 13 3.5 8.5zM3.5 12.5 12 17l8.5-4.5M3.5 16.5 12 21l8.5-4.5" />,
  chart: <path d="M4 20h16M7 16v-5M12 16V7M17 16v-8" />,
  portal: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 9h17M8 13.5h5M8 16h8" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.5 3.5 5.3 3.5 8.5s-1.1 6-3.5 8.5c-2.4-2.5-3.5-5.3-3.5-8.5S9.6 6 12 3.5z" />
    </>
  ),
  bolt: <path d="M13 3.5 5.5 13.5H12l-1 7 7.5-10H12z" />,
  folder: <path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" />,
  inbox: <path d="M3.5 13.5 6 5.5h12l2.5 8v5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5zM3.5 13.5H8l1.5 2.5h5l1.5-2.5h4.5" />,
  home: <path d="M4 11 12 4.5l8 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-4v-6h-5v6h-4A1.5 1.5 0 0 1 4 19z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  doc: <path d="M7 3.5h7l4.5 4.5v11a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5zM13.5 3.5V8.5h5M8.5 13h7M8.5 16.5h5" />,
  audio: <path d="M4 10v4M8 7v10M12 4v16M16 8v8M20 11v2" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.2 0 1.8-.9 1.4-2l-.3-.8a1.6 1.6 0 0 1 1.5-2.2h1.7a4.2 4.2 0 0 0 4.2-4.2c0-4.3-3.8-7.8-8.5-7.8z" />
      <circle cx="8" cy="11" r=".9" />
      <circle cx="11" cy="7.5" r=".9" />
      <circle cx="15.5" cy="8.5" r=".9" />
    </>
  ),
  server: (
    <>
      <rect x="4" y="4.5" width="16" height="6.5" rx="2" />
      <rect x="4" y="13" width="16" height="6.5" rx="2" />
      <path d="M8 7.8h.01M8 16.2h.01" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 8.5-8.5M16.5 6.5 19 9M14.5 8.5 16.5 10.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  flow: <path d="M5 6.5h6a3 3 0 0 1 3 3v5a3 3 0 0 0 3 3h2M5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM22 17.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />,
};

const FILLED: Partial<Record<IconName, React.ReactNode>> = {
  github: (
    <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.2-1.2-3.2-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.4-1.1-4.4-4.7 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.6 1a9 9 0 0 1 4.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.6 0 3.7-2.3 4.5-4.4 4.7.3.3.6.9.6 1.8v2.7c0 .3.2.6.7.5A9.5 9.5 0 0 0 12 2.5z" />
  ),
  slack: (
    <>
      <rect x="10" y="2.5" width="4" height="9" rx="2" />
      <rect x="10" y="12.5" width="4" height="9" rx="2" />
      <rect x="2.5" y="10" width="9" height="4" rx="2" />
      <rect x="12.5" y="10" width="9" height="4" rx="2" />
    </>
  ),
  linear: (
    <path d="M3.2 13.6 10.4 20.8A9 9 0 0 1 3.2 13.6zM3 11.2l9.8 9.8c.8 0 1.6-.1 2.3-.3L3.3 8.9c-.2.7-.3 1.5-.3 2.3zm1-4 12.8 12.8c.6-.3 1.2-.7 1.7-1.1L5.1 5.5c-.4.5-.8 1.1-1.1 1.7zM6.6 4.2A9 9 0 1 1 19.8 17.4z" />
  ),
  jira: (
    <path d="M20.5 3.5h-8.6a3.9 3.9 0 0 0 3.9 3.9h1.6v1.5a3.9 3.9 0 0 0 3.9 3.9V4.3a.8.8 0 0 0-.8-.8zM16.3 7.7H7.7a3.9 3.9 0 0 0 3.9 3.9h1.6v1.5a3.9 3.9 0 0 0 3.9 3.9V8.5a.8.8 0 0 0-.8-.8zM12 12H3.5a3.9 3.9 0 0 0 3.9 3.9h1.6v1.5a3.9 3.9 0 0 0 3.9 3.9v-8.5A.8.8 0 0 0 12 12z" />
  ),
  notion: (
    <path d="M5 4.2 15.6 3.4c1.3-.1 1.6 0 2.4.6l3.3 2.3c.5.4.7.5.7 1V19c0 .8-.3 1.3-1.3 1.4l-12.3.7c-.8 0-1.1-.1-1.5-.6L4.1 17.4c-.4-.6-.6-1-.6-1.6V5.6c0-.7.3-1.3 1.5-1.4zm2.6 3.3v11.2l1.2.2V10l5.5 8.6 2.2-.2V7.3l-1.4.1v7.5L9.4 7.3z" />
  ),
  figma: (
    <path d="M9 2.5h3v6H9a3 3 0 0 1 0-6zm3 0h3a3 3 0 0 1 0 6h-3zM9 8.5h3v6H9a3 3 0 0 1 0-6zm6 0a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM9 14.5h3v3a3 3 0 1 1-3-3z" />
  ),
  gmail: <path d="M3 6.5A1.5 1.5 0 0 1 5.2 5.2L12 10l6.8-4.8A1.5 1.5 0 0 1 21 6.5V18a1.5 1.5 0 0 1-1.5 1.5H17v-8.3l-5 3.6-5-3.6v8.3H4.5A1.5 1.5 0 0 1 3 18z" />,
  drive: <path d="M8.6 3.5h6.8l6.1 10.6-3.4 5.9-6.1-10.6zM2.5 14.1 8.6 3.5l3.4 5.9-6.1 10.6zM6.3 20l3.4-5.9h11.8L18.1 20z" />,
  calendar: (
    <path d="M7 2.5v2H5.5A2 2 0 0 0 3.5 6.5v12a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2H17v-2h-2v2H9v-2zm-1.5 8h13v8h-13zm2 2v2h2v-2zm4 0v2h2v-2z" />
  ),
  meet: <path d="M3.5 7.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1.7l4.2-3a.8.8 0 0 1 1.3.6v10.4a.8.8 0 0 1-1.3.6l-4.2-3v1.7a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />,
  cursor: <path d="M12 2.5 20.5 7.3v9.4L12 21.5l-8.5-4.8V7.3zm0 2.4L5.6 8.6 12 12.3V19l6.4-3.7V8.6z" />,
  chrome: (
    <path d="M12 2.5a9.5 9.5 0 0 1 8.2 4.75H12a4.75 4.75 0 0 0-4.4 3L4.4 4.9A9.5 9.5 0 0 1 12 2.5zM3.6 6.3l4 6.95A4.75 4.75 0 0 0 12 16.75l-3.1 5.27A9.5 9.5 0 0 1 3.6 6.3zm17.3 2.45A9.5 9.5 0 0 1 10.6 21.4l4.1-7.1a4.73 4.73 0 0 0 .5-5.55zM12 8.75a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z" />
  ),
};

export function Icon({
  name,
  size = 18,
  ...rest
}: { name: IconName; size?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const filled = FILLED[name];
  if (filled) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...rest}>
        {filled}
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {STROKE[name]}
    </svg>
  );
}
