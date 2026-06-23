import type { FestagLocalePreference, FestagRegionId } from "./types";
import { DEFAULT_REGION_ID, getRegionOrDefault } from "./regions";

export const LOCALE_COOKIE = "festag_locale";
export const LOCALE_ACK_COOKIE = "festag_locale_ack";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function preferenceFromRegionId(regionId: FestagRegionId): FestagLocalePreference {
  const region = getRegionOrDefault(regionId);
  return {
    regionId: region.id,
    locale: region.locale,
    language: region.language,
  };
}

export function parseLocaleCookie(value: string | null | undefined): FestagLocalePreference | null {
  if (!value) return null;
  const region = getRegionOrDefault(value);
  return preferenceFromRegionId(region.id);
}

export function localeCookieHeader(
  preference: FestagLocalePreference,
  acknowledged: boolean,
): string[] {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  const base = `Path=/; Max-Age=${ONE_YEAR_SECONDS}; SameSite=Lax${secure}`;
  return [
    `${LOCALE_COOKIE}=${preference.regionId}; ${base}`,
    `${LOCALE_ACK_COOKIE}=${acknowledged ? "1" : "0"}; ${base}`,
  ];
}

export function defaultPreference(): FestagLocalePreference {
  return preferenceFromRegionId(DEFAULT_REGION_ID);
}
