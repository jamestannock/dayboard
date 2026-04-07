import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { headers } from "next/headers";
import { AuthEntryPage } from "@/components/auth-entry-page";
import { getSessionUser } from "@/lib/auth";
import { getCognitoLinks } from "@/lib/cognito";
import { getRequestOrigin } from "@/lib/request-origin";

type AuthPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function AuthPage({ searchParams }: AuthPageProps) {
  noStore();
  const user = await getSessionUser();
  const params = await searchParams;

  if (user) {
    redirect(params.next ?? "/dashboard");
  }

  const requestHeaders = await headers();
  const links = getCognitoLinks(getRequestOrigin(requestHeaders));

  return (
    <AuthEntryPage
      errorMessage={params.error ?? null}
      loginUrl={links.login}
      signupUrl={links.signup}
    />
  );
}
