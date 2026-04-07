type HeaderLike = {
  get(name: string): string | null;
};

export function getRequestOrigin(headerSource: HeaderLike) {
  const forwardedProto = headerSource.get("x-forwarded-proto");
  const forwardedHost = headerSource.get("x-forwarded-host");
  const host = forwardedHost ?? headerSource.get("host");
  const isLocalhost = Boolean(
    host?.includes("localhost") ||
      host?.startsWith("127.0.0.1") ||
      host?.startsWith("[::1]"),
  );

  const protocol = isLocalhost ? "http" : (forwardedProto ?? "https");

  if (!host) {
    return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  }

  return `${protocol}://${host}`;
}
