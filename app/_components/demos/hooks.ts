"use client";

import { useEffect, useState } from "react";

/**
 * Advances `step` through `durations` while `active`. When the last step's
 * duration elapses, `onEnd` fires (e.g. to move to the next scenario) and the
 * timeline restarts at 0.
 */
export function useTimeline(durations: readonly number[], active: boolean, onEnd?: () => void) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    const d = durations[step];
    if (d === undefined) return;
    const t = window.setTimeout(() => {
      if (step >= durations.length - 1) {
        onEnd?.();
        setStep(0);
      } else setStep(step + 1);
    }, d);
    return () => window.clearTimeout(t);
  }, [step, active, durations, onEnd]);

  return [step, setStep] as const;
}

/** Fires `fn` every `ms` while `active`. */
export function useInterval(fn: () => void, ms: number, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(fn, ms);
    return () => window.clearInterval(id);
  }, [fn, ms, active]);
}
