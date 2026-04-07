"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/lib/dayboard-data";

type TopNavProps = {
  viewer?: {
    email: string;
    displayName: string | null;
  } | null;
};

function getLinkClass(isActive: boolean) {
  return [
    "rounded-full px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-slate-950 text-white"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  ].join(" ");
}

export function TopNav({ viewer }: TopNavProps) {
  const pathname = usePathname();
  const accountLabel = viewer?.displayName?.trim() || viewer?.email || "Account";

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f5efe4]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
              D
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-950">Dayboard</p>
              <p className="text-xs text-slate-500">Life admin, cleaner.</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={getLinkClass(isActive)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {viewer ? (
            <>
              <span className="hidden text-sm font-medium text-slate-600 md:block">
                {accountLabel}
              </span>
              <Link
                href="/auth/logout"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Sign out
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:text-slate-950 sm:block"
              >
                Dashboard
              </Link>
              <Link
                href="/auth"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
