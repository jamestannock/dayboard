import Link from "next/link";
import type { ReactNode } from "react";
import { navigationItems } from "@/lib/dayboard-data";

type AppShellProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function AppShell({ children, title, description }: AppShellProps) {
  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#f5efe4] px-4 py-4 text-slate-950 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
          <Link href="/" className="block">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
              Dayboard
            </p>
            <p className="mt-3 max-w-[14rem] text-sm leading-7 text-white/70">
              Personal operating system for your week.
            </p>
          </Link>

          <nav className="mt-8 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              Future premium
            </p>
            <p className="mt-3 text-sm leading-7 text-white/75">
              Team boards, AI summaries, richer analytics, and automated imports
              can all layer on top of this base.
            </p>
          </div>
        </aside>

        <div className="space-y-4">
          <header className="rounded-[2rem] border border-white/60 bg-white/80 px-6 py-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
              Product preview
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              {description}
            </p>
          </header>

          <div className="space-y-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
