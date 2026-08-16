import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { getServerEnv } from "@/config/env.server";
import { isValidPreviewSecret } from "@/infrastructure/sanity/preview.server";

function safeRedirectPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }

  return value;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const suppliedSecret = requestUrl.searchParams.get("secret");
  const expectedSecret = getServerEnv().SANITY_PREVIEW_SECRET;

  if (!expectedSecret) {
    return NextResponse.json({ error: "Draft mode is not configured." }, { status: 503 });
  }

  if (!isValidPreviewSecret(suppliedSecret, expectedSecret)) {
    return NextResponse.json({ error: "Invalid draft-mode secret." }, { status: 401 });
  }

  (await draftMode()).enable();

  const redirectPath = safeRedirectPath(requestUrl.searchParams.get("redirect"));
  return NextResponse.redirect(new URL(redirectPath, requestUrl.origin), 303);
}
