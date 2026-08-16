import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

function safeRedirectPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }

  return value;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  (await draftMode()).disable();

  const redirectPath = safeRedirectPath(requestUrl.searchParams.get("redirect"));
  return NextResponse.redirect(new URL(redirectPath, requestUrl.origin), 303);
}
