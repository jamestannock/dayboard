const fallbackAppUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN ?? "";
const clientId = process.env.COGNITO_USER_POOL_CLIENT_ID ?? "";
const clientSecret = process.env.COGNITO_USER_POOL_CLIENT_SECRET ?? "";

function normalizeAppUrl(appUrl: string) {
  return appUrl.replace(/\/+$/, "");
}

export function getCallbackUrl(appUrl = fallbackAppUrl) {
  const normalized = normalizeAppUrl(appUrl);
  return `${normalized}/auth/callback/`;
}

export function getHostedUiUrl(mode: "login" | "signup", appUrl = fallbackAppUrl) {
  const normalized = normalizeAppUrl(appUrl);

  if (!domain || !clientId) {
    return "#";
  }

  const endpoint = mode === "login" ? "login" : "signup";
  const redirectUri = encodeURIComponent(getCallbackUrl(normalized));

  return `${domain}/${endpoint}?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;
}

function getTokenEndpoint() {
  return `${domain}/oauth2/token`;
}

function getUserInfoEndpoint() {
  return `${domain}/oauth2/userInfo`;
}

export function getLogoutUrl(appUrl = fallbackAppUrl) {
  const normalized = normalizeAppUrl(appUrl);

  if (!domain || !clientId) {
    return "/auth";
  }

  const logoutUri = encodeURIComponent(`${normalized}/auth/`);
  return `${domain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
}

export function getCognitoLinks(appUrl = fallbackAppUrl) {
  return {
    login: getHostedUiUrl("login", appUrl),
    signup: getHostedUiUrl("signup", appUrl),
    logout: getLogoutUrl(appUrl),
  };
}

function getTokenHeaders() {
  const headers: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  if (clientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
  }

  return headers;
}

export async function exchangeCodeForTokens(code: string, appUrl = fallbackAppUrl) {
  if (!domain || !clientId) {
    throw new Error("Cognito is not configured.");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: clientId,
    redirect_uri: getCallbackUrl(appUrl),
  });

  const response = await fetch(getTokenEndpoint(), {
    method: "POST",
    headers: getTokenHeaders(),
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to exchange Cognito authorization code.");
  }

  return response.json() as Promise<{
    access_token: string;
    id_token?: string;
    refresh_token?: string;
    token_type: string;
    expires_in: number;
  }>;
}

export async function fetchCognitoUserInfo(accessToken: string) {
  if (!domain) {
    throw new Error("Cognito is not configured.");
  }

  const response = await fetch(getUserInfoEndpoint(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Cognito user profile.");
  }

  return response.json() as Promise<{
    sub: string;
    email?: string;
    name?: string;
    username?: string;
  }>;
}
