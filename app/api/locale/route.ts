import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  LOCALE_ACK_COOKIE,
  LOCALE_COOKIE,
  localeCookieHeader,
  parseLocaleCookie,
  preferenceFromRegionId,
} from "@/lib/locale/cookie";
import { getRegion } from "@/lib/locale/regions";
import type { FestagRegionId } from "@/lib/locale/types";

export async function GET() {
  const jar = await cookies();
  const regionId = jar.get(LOCALE_COOKIE)?.value;
  const acknowledged = jar.get(LOCALE_ACK_COOKIE)?.value === "1";
  const preference = parseLocaleCookie(regionId);

  return NextResponse.json({
    acknowledged,
    preference,
  });
}

export async function POST(request: Request) {
  let body: { regionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const region = getRegion(body.regionId);
  if (!region) {
    return NextResponse.json({ error: "Unknown region" }, { status: 400 });
  }

  const preference = preferenceFromRegionId(region.id as FestagRegionId);
  const response = NextResponse.json({
    ok: true,
    preference,
    region: {
      id: region.id,
      label: region.label,
      locale: region.locale,
      language: region.language,
    },
  });

  for (const header of localeCookieHeader(preference, true)) {
    response.headers.append("Set-Cookie", header);
  }

  return response;
}
