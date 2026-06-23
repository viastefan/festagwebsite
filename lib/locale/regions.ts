import type { FestagRegion, FestagRegionId } from "./types";

const DE_GATE = {
  prompt:
    "Wähle ein anderes Land oder eine andere Region, um Inhalte für deinen Standort zu sehen und online einzukaufen.",
  continue: "Weiter",
  selectLabel: "Land oder Region",
} as const;

const EN_GATE = {
  prompt:
    "Choose another country or region to see content for your location and shop online.",
  continue: "Continue",
  selectLabel: "Country or region",
} as const;

export const FESTAG_REGIONS: FestagRegion[] = [
  {
    id: "de",
    label: "Deutschland",
    countryCode: "DE",
    language: "de",
    locale: "de_DE",
    gate: DE_GATE,
  },
  {
    id: "at",
    label: "Österreich",
    countryCode: "AT",
    language: "de",
    locale: "de_AT",
    gate: DE_GATE,
  },
  {
    id: "ch",
    label: "Schweiz",
    countryCode: "CH",
    language: "de",
    locale: "de_CH",
    gate: DE_GATE,
  },
  {
    id: "en",
    label: "United States",
    countryCode: "US",
    language: "en",
    locale: "en_US",
    gate: EN_GATE,
  },
];

export const DEFAULT_REGION_ID: FestagRegionId = "de";

export function getRegion(id: string | null | undefined): FestagRegion | undefined {
  return FESTAG_REGIONS.find((r) => r.id === id);
}

export function getRegionOrDefault(id: string | null | undefined): FestagRegion {
  return getRegion(id) ?? FESTAG_REGIONS[0];
}
