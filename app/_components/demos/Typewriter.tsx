"use client";

import { useEffect, useState } from "react";

/**
 * Types `text` out at `speed` ms per tick. Remount with a `key` to restart.
 * When `instant` is true the full text renders immediately (reduced motion).
 */
export function Typewriter({
  text,
  speed = 14,
  chunk = 2,
  instant,
  caret = true,
  onDone,
}: {
  text: string;
  speed?: number;
  chunk?: number;
  instant?: boolean;
  caret?: boolean;
  onDone?: () => void;
}) {
  const [n, setN] = useState(0);
  const done = instant || n >= text.length;

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(() => setN((x) => Math.min(text.length, x + chunk)), speed);
    return () => window.clearTimeout(t);
  }, [n, done, text.length, speed, chunk]);

  useEffect(() => {
    if (done) onDone?.();
    // onDone intentionally excluded — fire once per completion.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return (
    <>
      {instant ? text : text.slice(0, n)}
      {caret && !done ? <span className="typing-caret" aria-hidden /> : null}
    </>
  );
}
