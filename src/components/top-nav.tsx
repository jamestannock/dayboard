"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DayboardLogo } from "@/components/dayboard-logo";
import { InfoIcon } from "@/components/product-icons";
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
      ? "bg-ink text-on-dark"
      : "text-muted hover:bg-surface-subtle hover:text-ink",
  ].join(" ");
}

export function TopNav({ viewer }: TopNavProps) {
  const pathname = usePathname() ?? "";
  const accountLabel = viewer?.displayName?.trim() || viewer?.email || "Account";

  return (
    <header className="sticky top-0 z-50 border-b border-line-faint bg-canvas-glass backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <DayboardLogo className="h-9 w-9" />
              <div>
                <p className="text-sm font-semibold text-ink">Dayboard</p>
                <p className="text-xs text-soft">Life admin, cleaner.</p>
              </div>
            </Link>
            <Link
              href="/info"
              prefetch={false}
              aria-label="Why Dayboard is built this way"
              title="Why Dayboard is built this way"
              className="rounded-full border border-line bg-surface p-1.5 text-soft transition hover:border-accent-line hover:text-accent"
            >
              <InfoIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

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

          <div className="flex items-center gap-2">
            {viewer ? (
              <>
                <span className="hidden text-sm font-medium text-muted md:block">
                  {accountLabel}
                </span>
                <Link
                  href="/auth/logout"
                  className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-on-dark transition hover:bg-ink-soft"
                >
                  Sign out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="hidden rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink-soft transition hover:border-line-focus hover:text-ink sm:block"
                >
                  Dashboard
                </Link>
                <Link
                  href="/auth"
                  className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-on-dark transition hover:bg-ink-soft"
                >
                  Account
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="-mx-1 mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`${getLinkClass(isActive)} shrink-0 whitespace-nowrap`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        {viewer ? (
          <p className="mt-3 text-sm text-soft md:hidden">{accountLabel}</p>
        ) : null}
      </div>
    </header>
  );
}
