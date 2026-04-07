import { unstable_noStore as noStore } from "next/cache";
import { AppShell } from "@/components/app-shell";
import { SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { updateProfilePreferencesAction } from "@/app/actions";
import { getSettingsPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

const timezoneOptions = [
  "Australia/Sydney",
  "Australia/Melbourne",
  "UTC",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
];

const currencyOptions = ["AUD", "USD", "GBP", "EUR", "NZD", "CAD"];

export default async function SettingsPage() {
  noStore();

  const data = await getSettingsPageData();

  return (
    <AppShell
      title="Settings"
      description="Manage profile details and preferences without forcing them into account creation."
    >
      <StatGrid items={data.stats} />

      <Surface>
        <SectionHeader
          eyebrow="Profile"
          title="Account preferences"
          description="Timezone and currency live here, after sign-up, where they belong."
        />

        <form action={updateProfilePreferencesAction} className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Display name</span>
            <input
              type="text"
              name="displayName"
              defaultValue={data.profile.displayName}
              placeholder="Your name"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={data.profile.email}
              readOnly
              className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-500 outline-none"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Timezone</span>
            <select
              name="timezone"
              defaultValue={data.profile.timezone}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              {timezoneOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Currency</span>
            <select
              name="currency"
              defaultValue={data.profile.currency}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400 focus:bg-white"
            >
              {currencyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600 lg:col-span-2">
            Joined Dayboard on {data.profile.joinedOn}. Account preferences update immediately and apply across the product.
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save preferences
            </button>
          </div>
        </form>
      </Surface>
    </AppShell>
  );
}
