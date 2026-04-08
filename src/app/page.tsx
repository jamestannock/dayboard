import Link from "next/link";
import { appHighlights, homePreviewStats, moduleSummaries } from "@/lib/dayboard-data";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-74px)] overflow-hidden bg-[image:var(--hero-background)] text-ink">
      <section className="mx-auto flex min-h-[calc(100vh-90px)] w-full max-w-7xl flex-col justify-center gap-6 px-6 py-6 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-surface-glass-line bg-surface-glass p-7 shadow-[var(--shadow-glass)] backdrop-blur">
            <div className="inline-flex rounded-full border border-accent-line bg-accent-faint px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              Personal operating system
            </div>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-tight text-balance md:text-6xl">
              One view for goals, lists, mind, body, and finance.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
              Dayboard is built to run the week from one place instead of
              scattering priorities, saved lists, learning, training, and money
              across separate tools.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {appHighlights.slice(0, 4).map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-[1.5rem] border border-line bg-surface p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                    {highlight.kicker}
                  </p>
                  <h2 className="mt-3 text-lg font-semibold text-ink">{highlight.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{highlight.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft"
                href="/dashboard"
              >
                Open dashboard
              </Link>
              <Link
                className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
                href="/auth"
              >
                Create account
              </Link>
              <Link
                className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
                href="/info"
              >
                Why it works
              </Link>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] bg-ink p-6 text-on-dark shadow-[var(--shadow-dark-hero)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-accent-light">
                    Live preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Operating board</h2>
                </div>
                <div className="rounded-full bg-surface-tint px-3 py-1 text-xs font-medium text-on-dark-soft">
                  Web app
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {homePreviewStats.map((card) => (
                  <article
                    key={card.title}
                    className="rounded-[1.5rem] border border-surface-line bg-surface-faint p-4"
                  >
                    <p className="text-sm text-on-dark-subtle">{card.title}</p>
                    <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                    <p className="mt-2 text-sm leading-6 text-on-dark-muted">{card.caption}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-line bg-surface p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft">
                Areas
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {moduleSummaries.map((module) => (
                  <Link
                    key={module.slug}
                    href={module.href}
                    className="rounded-[1.5rem] bg-surface-muted px-4 py-4 transition hover:bg-surface-subtle"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {module.kicker}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-ink">{module.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {module.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
