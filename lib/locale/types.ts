export type FestagRegionId = "de" | "at" | "ch" | "en";

export type FestagRegion = {
  id: FestagRegionId;
  label: string;
  countryCode: string;
  language: string;
  locale: string;
  /** UI strings for the locale gate (expand per region later). */
  gate: {
    prompt: string;
    continue: string;
    selectLabel: string;
  };
};

export type FestagLocalePreference = {
  regionId: FestagRegionId;
  locale: string;
  language: string;
};
