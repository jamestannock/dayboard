import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { AuthEntryPage } from "@/components/auth-entry-page";
import { getSessionUser } from "@/lib/auth";
import { getCognitoLinks } from "@/lib/cognito";
import { getRequestOrigin } from "@/lib/request-origin";

type AuthPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  const requestHeaders = await headers();
  const links = getCognitoLinks(getRequestOrigin(requestHeaders));
  const params = await searchParams;

  return (
    <AuthEntryPage
      errorMessage={params.error ?? null}
      loginUrl={links.login}
      signupUrl={links.signup}
    />
  );
}
