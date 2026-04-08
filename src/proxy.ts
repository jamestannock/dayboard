import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE_NAME = "dayboard_session";
const AUTH_PATH = "/auth";
const DEFAULT_SIGNED_IN_PATH = "/dashboard";

const protectedPrefixes = [
  "/dashboard",
  "/lists",
  "/finance",
  "/goals",
  "/mind",
  "/body",
  "/settings",
];

function isProtectedPath(pathname: string) {
  return protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function sanitizeNextPath(nextPath: string | null) {
  if (!nextPath || !nextPath.startsWith("/")) {
    return DEFAULT_SIGNED_IN_PATH;
  }

  if (nextPath.startsWith("//")) {
    return DEFAULT_SIGNED_IN_PATH;
  }

  return nextPath;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);

  if (pathname === AUTH_PATH || pathname.startsWith(`${AUTH_PATH}/`)) {
    if (!hasSessionCookie) {
      return NextResponse.next();
    }

    const nextPath = sanitizeNextPath(request.nextUrl.searchParams.get("next"));
    return NextResponse.redirect(new URL(nextPath, request.url));
  }

  if (isProtectedPath(pathname) && !hasSessionCookie) {
    const authUrl = new URL(AUTH_PATH, request.url);
    authUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(authUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/dashboard/:path*",
    "/lists/:path*",
    "/finance/:path*",
    "/goals/:path*",
    "/mind/:path*",
    "/body/:path*",
    "/settings/:path*",
  ],
};
