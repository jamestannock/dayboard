import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function AppShell({ children, title, description }: AppShellProps) {
  return (
    <main className="min-h-[calc(100vh-74px)] bg-[#f5efe4] px-4 py-4 text-slate-950 lg:px-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="rounded-[2rem] border border-white/60 bg-white/80 px-6 py-6 shadow-sm backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Dayboard
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </header>

        <div className="space-y-4">{children}</div>
      </div>
    </main>
  );
}
