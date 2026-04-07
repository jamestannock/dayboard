import { NextResponse } from "next/server";
import { clearUserSession } from "@/lib/auth";
import { getLogoutUrl } from "@/lib/cognito";
import { getRequestOrigin } from "@/lib/request-origin";

export async function GET(request: Request) {
  await clearUserSession();
  const requestOrigin = getRequestOrigin(new Headers(request.headers));
  const logoutUrl = getLogoutUrl(requestOrigin);

  if (logoutUrl.startsWith("http")) {
    return NextResponse.redirect(logoutUrl);
  }

  return NextResponse.redirect(new URL("/auth", requestOrigin));
}
