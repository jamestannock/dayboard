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
    <main className="min-h-[calc(100vh-74px)] bg-canvas px-4 py-10 text-ink lg:px-6">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] bg-ink p-8 text-on-dark shadow-[var(--shadow-dark-soft)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-light">
            Dayboard account
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            One clean account flow for the whole app.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-on-dark-muted">
            Sign up or sign in from one place. No fake setup form, no timezone
            field, no currency field, no duplicated auth pages.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-surface-line bg-surface-faint p-4">
              <p className="text-sm font-medium text-on-dark">Create account</p>
              <p className="mt-2 text-sm leading-7 text-on-dark-muted">
                Start with email and password through Cognito.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-surface-line bg-surface-faint p-4">
              <p className="text-sm font-medium text-on-dark">Sign in</p>
              <p className="mt-2 text-sm leading-7 text-on-dark-muted">
                Existing users go through the same AWS-hosted flow.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-surface-glass-line bg-surface-glass-opaque p-8 shadow-[var(--shadow-glass)] lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-soft">
            Account access
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Continue in one step.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Dayboard uses AWS Cognito for the account layer today. The product
            flow should still feel like one page from your side, so the entry
            point lives here and hands off cleanly.
          </p>

          {errorMessage ? (
            <div className="mt-6 rounded-[1.25rem] border border-danger-line bg-danger-faint px-4 py-3 text-sm text-danger">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-8 space-y-3">
            <a
              href={signupUrl}
              className="block rounded-full bg-accent-fill px-5 py-3 text-center text-sm font-semibold text-on-dark transition hover:bg-accent-fill-soft"
            >
              Create free account
            </a>
            <a
              href={loginUrl}
              className="block rounded-full border border-line-strong px-5 py-3 text-center text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
            >
              I already have an account
            </a>
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-surface-muted p-4">
            <p className="text-sm font-medium text-ink">What this does</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-muted">
              <li>One app entry point for sign up and sign in.</li>
              <li>Timezone and currency stay out of account creation.</li>
              <li>Successful login drops straight into your board.</li>
            </ul>
          </div>

          <div className="mt-6 text-sm text-soft">
            <Link href="/" className="font-medium text-ink">
              Back to site
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
