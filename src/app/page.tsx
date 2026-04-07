import Link from "next/link";
import {
  appHighlights,
  homePreviewStats,
  moduleSummaries,
  weeklyFocus,
} from "@/lib/dayboard-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f4efe6,transparent_35%),linear-gradient(180deg,#f7f3ec_0%,#efe8dd_45%,#e4dccf_100%)] text-slate-950">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-8 lg:px-10">
        <header className="rounded-[2rem] border border-white/60 bg-white/75 px-6 py-5 shadow-[0_20px_80px_rgba(50,40,24,0.08)] backdrop-blur md:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-amber-700">
                  Dayboard
                </p>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Personal operating system for your goals, lists, mind, body,
                  and finance.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                  href="/auth"
                >
                  Account
                </Link>
                <Link
                  className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  href="/auth"
                >
                  Create account
                </Link>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                  Launch-ready MVP
                </div>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-balance md:text-7xl">
                  Run your week from a single board instead of six apps.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Run goals, flexible lists, mind work, body tracking, and
                  finance in one account. Lists can hold books, movies, TV
                  shows, or any category you care about.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    className="rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
                    href="/dashboard"
                  >
                    Open product preview
                  </Link>
                  <Link
                    className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                    href="#modules"
                  >
                    Explore modules
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-amber-300">
                      This week
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">Control panel</h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
                    MVP
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {homePreviewStats.map((card) => (
                    <article
                      key={card.title}
                      className="rounded-3xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-sm text-white/60">{card.title}</p>
                      <p className="mt-3 text-3xl font-semibold">{card.value}</p>
                      <p className="mt-2 text-sm text-white/70">{card.caption}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-medium text-white/70">
                    Weekly focus
                  </p>
                  <ul className="mt-4 space-y-3 text-sm text-white/90">
                    {weeklyFocus.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-white/5 px-4 py-3"
                      >
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
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
              className="rounded-[1.75rem] border border-white/60 bg-white/70 p-6 shadow-[0_15px_40px_rgba(50,40,24,0.07)] backdrop-blur"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                {highlight.kicker}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{highlight.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {highlight.body}
              </p>
            </article>
          ))}
        </section>

        <section id="modules" className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
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
                className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_18px_60px_rgba(50,40,24,0.06)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
                      {module.kicker}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold">
                      {module.title}
                    </h3>
                  </div>
                  <Link
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                    href={module.href}
                  >
                    Open
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {module.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {module.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
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
