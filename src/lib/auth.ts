import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

const SESSION_COOKIE_NAME = "dayboard_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 180;

type SessionPayload = {
  userId: string;
  email: string;
  exp: number;
};

function getSessionSecret() {
  if (process.env.SESSION_SECRET) {
    return process.env.SESSION_SECRET;
  }

  if (process.env.NODE_ENV !== "production") {
    return "dayboard-development-session-secret";
  }

  throw new Error("Missing required environment variable: SESSION_SECRET");
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function signPayload(encodedPayload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

function createSessionToken(payload: SessionPayload) {
  const encodedPayload = encodePayload(payload);
  const signature = signPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

function verifySessionToken(token: string) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const expected = Buffer.from(expectedSignature);
  const provided = Buffer.from(signature);

  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (!payload.userId || !payload.email || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function buildSessionCookie(value: string, maxAge = SESSION_TTL_SECONDS) {
  return {
    name: SESSION_COOKIE_NAME,
    value,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function isAuthConfigured() {
  return Boolean(env.cognitoDomain && env.cognitoUserPoolClientId);
}

export async function createUserSession(user: { id: string; email: string }) {
  const cookieStore = await cookies();
  const token = createSessionToken({
    userId: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  });

  cookieStore.set(buildSessionCookie(token));
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.set(buildSessionCookie("", 0));
}

export async function getSessionPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function getSessionUser() {
  const session = await getSessionPayload();

  if (!session) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.userId },
  });

  if (!user || user.deletedAt) {
    return null;
  }

  return user;
}

export async function getSessionViewer() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  return {
    email: user.email,
    displayName: user.displayName,
    theme: user.theme,
  };
}
