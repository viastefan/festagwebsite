"use client";

import { useLocaleGate } from "./LocaleGate";
import { getRegionOrDefault } from "@/lib/locale/regions";
import { useEffect, useState } from "react";

export function LocaleFooterLink() {
  const reopen = useLocaleGate();
  const [label, setLabel] = useState("Deutschland");

  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((c) => c.startsWith("festag_locale="));
    const regionId = match?.split("=")[1];
    setLabel(getRegionOrDefault(regionId).label);
  }, []);

  return (
    <button type="button" className="lp-footer-link lp-footer-locale" onClick={reopen}>
      {label}
    </button>
  );
}
