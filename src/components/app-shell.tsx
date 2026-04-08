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
        <header className="px-1 py-2">
          <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {description}
          </p>
        </header>

        <div className="space-y-4">{children}</div>
      </div>
    </main>
  );
}
