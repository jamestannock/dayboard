import { NextResponse } from "next/server";
import { clearUserSession } from "@/lib/auth";
import { getLogoutUrl } from "@/lib/cognito";

export async function GET(request: Request) {
  await clearUserSession();
  const logoutUrl = getLogoutUrl(new URL(request.url).origin);

  if (logoutUrl.startsWith("http")) {
    return NextResponse.redirect(logoutUrl);
  }

  return NextResponse.redirect(new URL("/auth", request.url));
}
