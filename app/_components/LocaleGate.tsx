"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FESTAG_REGIONS,
  DEFAULT_REGION_ID,
  getRegionOrDefault,
} from "@/lib/locale/regions";
import type { FestagRegionId } from "@/lib/locale/types";

function readAcknowledged(): boolean {
  if (typeof document === "undefined") return true;
  return document.cookie.split("; ").some((c) => c === "festag_locale_ack=1");
}

function readRegionId(): FestagRegionId {
  if (typeof document === "undefined") return DEFAULT_REGION_ID;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith("festag_locale="));
  if (!match) return DEFAULT_REGION_ID;
  const value = match.split("=")[1];
  const region = getRegionOrDefault(value);
  return region.id;
}

export function LocaleGate() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [regionId, setRegionId] = useState<FestagRegionId>(DEFAULT_REGION_ID);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const acknowledged = readAcknowledged();
    setRegionId(readRegionId());
    setOpen(!acknowledged);
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("lp-locale-open", open);
    return () => document.body.classList.remove("lp-locale-open");
  }, [open]);

  const region = useMemo(() => getRegionOrDefault(regionId), [regionId]);
  const copy = region.gate;

  const persist = useCallback(async (nextRegionId: FestagRegionId) => {
    setBusy(true);
    try {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ regionId: nextRegionId }),
      });
      setOpen(false);
      document.documentElement.lang = getRegionOrDefault(nextRegionId).language;
    } finally {
      setBusy(false);
    }
  }, []);

  const onContinue = () => {
    void persist(regionId);
  };

  if (!mounted || !open) return null;

  return (
    <aside
      id="ac-localeswitcher"
      className="lp-locale-switcher"
      lang={region.locale.replace("_", "-")}
      dir="ltr"
      aria-label={copy.selectLabel}
    >
      <div className="lp-locale-switcher-inner">
        <p className="lp-locale-prompt">{copy.prompt}</p>
        <div className="lp-locale-controls">
          <label className="lp-locale-picker">
            <span className="sr-only">{copy.selectLabel}</span>
            <select
              className="lp-locale-select"
              value={regionId}
              disabled={busy}
              onChange={(e) => setRegionId(e.target.value as FestagRegionId)}
            >
              {FESTAG_REGIONS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            <span className="lp-locale-select-display" aria-hidden>
              {region.label}
            </span>
            <svg
              className="lp-locale-select-caret"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              aria-hidden
            >
              <path
                d="M3 4.5 6 7.5 9 4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </label>
          <button
            type="button"
            className="lp-locale-continue"
            disabled={busy}
            onClick={onContinue}
          >
            {copy.continue}
          </button>
        </div>
      </div>
    </aside>
  );
}

/** Footer / nav hook to reopen the locale gate. */
export function useLocaleGate() {
  return useCallback(() => {
    document.cookie = "festag_locale_ack=0; Path=/; Max-Age=0; SameSite=Lax";
    window.location.reload();
  }, []);
}
