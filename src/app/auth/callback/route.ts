import { NextRequest, NextResponse } from "next/server";
import { createUserSession } from "@/lib/auth";
import { exchangeCodeForTokens, fetchCognitoUserInfo } from "@/lib/cognito";
import { db } from "@/lib/db";
import { getRequestOrigin } from "@/lib/request-origin";

function getFallbackName(email: string) {
  return email.split("@")[0]?.replace(/[._-]+/g, " ") ?? "Dayboard user";
}

export async function GET(request: NextRequest) {
  const requestOrigin = getRequestOrigin(request.headers);
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    const authUrl = new URL("/auth", requestOrigin);
    authUrl.searchParams.set("error", errorDescription ?? error);
    return NextResponse.redirect(authUrl);
  }

  if (!code) {
    const authUrl = new URL("/auth", requestOrigin);
    authUrl.searchParams.set("error", "Missing authorization code.");
    return NextResponse.redirect(authUrl);
  }

  try {
    const tokens = await exchangeCodeForTokens(code, requestOrigin);
    const profile = await fetchCognitoUserInfo(tokens.access_token);

    if (!profile.email) {
      throw new Error("Cognito user info did not include an email address.");
    }

    const user = await db.user.upsert({
      where: { email: profile.email },
      update: {
        cognitoSubject: profile.sub,
        displayName: profile.name ?? getFallbackName(profile.email),
        onboardingDone: true,
      },
      create: {
        cognitoSubject: profile.sub,
        email: profile.email,
        displayName: profile.name ?? getFallbackName(profile.email),
        onboardingDone: true,
      },
    });

    await createUserSession(user);

    return NextResponse.redirect(new URL("/dashboard", requestOrigin));
  } catch (error) {
    console.error("Auth callback failed", {
      requestOrigin,
      hasCode: Boolean(code),
      message: error instanceof Error ? error.message : "Unknown error",
    });
    const authUrl = new URL("/auth", requestOrigin);
    authUrl.searchParams.set("error", "Could not finish sign in. Please try again.");
    return NextResponse.redirect(authUrl);
  }
}
