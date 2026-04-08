import Link from "next/link";
import {
  appHighlights,
  homePreviewStats,
  moduleSummaries,
  weeklyFocus,
} from "@/lib/dayboard-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[image:var(--hero-background)] text-ink">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-8 lg:px-10">
        <header className="rounded-[2rem] border border-surface-glass-line bg-surface-glass px-6 py-5 shadow-[var(--shadow-glass)] backdrop-blur md:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-accent">
                  Dayboard
                </p>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  Personal operating system for your goals, lists, mind, body,
                  and finance.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-line-focus hover:text-ink"
                  href="/auth"
                >
                  Account
                </Link>
                <Link
                  className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-on-dark transition hover:bg-ink-soft"
                  href="/auth"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="inline-flex rounded-full border border-accent-line bg-accent-faint px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  Evidence-backed life system
                </div>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance md:text-7xl">
                  Run your week from a single board instead of six apps.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-muted">
                  Run goals, flexible lists, mind work, body tracking, and
                  finance in one account. Lists can hold books, movies, TV
                  shows, or any category you care about.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="rounded-full bg-accent-fill px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-accent-fill-soft"
                    href="/dashboard"
                  >
                    Open product preview
                  </Link>
                  <Link
                    className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
                    href="#modules"
                  >
                    Explore modules
                  </Link>
                  <Link
                    className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
                    href="/info"
                  >
                    Why it works
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] bg-ink p-6 text-on-dark shadow-[var(--shadow-dark-hero)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-accent-light">
                      This week
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">Control panel</h2>
                  </div>
                  <div className="rounded-full bg-surface-tint px-3 py-1 text-xs font-medium text-on-dark-soft">
                    MVP
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {homePreviewStats.map((card) => (
                    <article
                      key={card.title}
                      className="rounded-3xl border border-surface-line bg-surface-faint p-4"
                    >
                      <p className="text-sm text-on-dark-subtle">{card.title}</p>
                      <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                      <p className="mt-2 text-sm text-on-dark-muted">{card.caption}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-6 rounded-3xl border border-surface-line bg-surface-faint p-5">
                  <p className="text-sm font-medium text-on-dark-muted">
                    Weekly focus
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-on-dark-soft">
                    {weeklyFocus.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-surface-faint px-4 py-3"
                      >
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent-bright" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {appHighlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[1.75rem] border border-surface-glass-line bg-surface/70 p-6 shadow-[var(--shadow-glass-card)] backdrop-blur"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-soft">
                {highlight.kicker}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{highlight.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {highlight.body}
              </p>
            </article>
          ))}
        </section>

        <section id="modules" className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-soft">
              Product scope
            </p>
            <h2 className="text-4xl font-semibold tracking-tight">
              Five life areas, one account, one rhythm.
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {moduleSummaries.map((module) => (
              <article
                key={module.slug}
                className="rounded-[2rem] border border-line bg-surface-glass-strong p-6 shadow-[var(--shadow-glass-soft)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
                      {module.kicker}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold">
                      {module.title}
                    </h3>
                  </div>
                  <Link
                    className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-line-focus hover:text-ink"
                    href={module.href}
                  >
                    Open
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {module.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {module.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-surface-subtle px-3 py-1 text-xs font-medium text-ink-soft"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
