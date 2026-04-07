import Link from "next/link";

type AuthEntryPageProps = {
  errorMessage?: string | null;
  loginUrl: string;
  signupUrl: string;
};

export function AuthEntryPage({
  errorMessage,
  loginUrl,
  signupUrl,
}: AuthEntryPageProps) {
  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#f5efe4] px-4 py-10 text-slate-950 lg:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Dayboard account
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            One clean account flow for the whole app.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
            Sign up or sign in from one place. No fake setup form, no timezone
            field, no currency field, no duplicated auth pages.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Create account</p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Start with email and password through Cognito.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-medium text-white">Sign in</p>
              <p className="mt-2 text-sm leading-7 text-white/70">
                Existing users go through the same AWS-hosted flow.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-[0_24px_80px_rgba(50,40,24,0.08)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Account access
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Continue in one step.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Dayboard uses AWS Cognito for the account layer today. The product
            flow should still feel like one page from your side, so the entry
            point lives here and hands off cleanly.
          </p>

          {errorMessage ? (
            <div className="mt-6 rounded-[1.25rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-8 space-y-3">
            <a
              href={signupUrl}
              className="block rounded-full bg-amber-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-amber-500"
            >
              Create free account
            </a>
            <a
              href={loginUrl}
              className="block rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            >
              I already have an account
            </a>
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-950">What this does</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
              <li>One app entry point for sign up and sign in.</li>
              <li>Timezone and currency stay out of account creation.</li>
              <li>Successful login drops straight into your board.</li>
            </ul>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            <Link href="/" className="font-medium text-slate-950">
              Back to site
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
