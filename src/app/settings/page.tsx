import { unstable_noStore as noStore } from "next/cache";
import { AppShell } from "@/components/app-shell";
import { SectionHeader, Surface } from "@/components/product-ui";
import {
  updateAppearancePreferencesAction,
  updateProfilePreferencesAction,
  updateRegionalPreferencesAction,
} from "@/app/actions";
import { getSettingsPageData } from "@/lib/dayboard-store";
import { getThemeMeta, themeOptions } from "@/lib/themes";

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

function SettingsMetric({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-line bg-surface-muted px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-2 text-sm leading-6 text-muted">{caption}</p>
    </div>
  );
}

function ThemeOptionCard({
  value,
  label,
  description,
  preview,
  checked,
}: {
  value: string;
  label: string;
  description: string;
  preview: [string, string, string];
  checked: boolean;
}) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name="theme"
        value={value}
        defaultChecked={checked}
        className="peer sr-only"
      />
      <div className="rounded-[1.5rem] border border-line bg-surface p-4 transition peer-checked:border-line-focus peer-checked:bg-surface-muted peer-checked:shadow-sm hover:border-line-strong">
        <div className="flex items-center gap-2">
          {preview.map((color) => (
            <span
              key={color}
              className="h-3.5 w-3.5 rounded-full border border-black/5"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink">{label}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          </div>
          <span className="rounded-full border border-line bg-surface-subtle px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-soft peer-checked:border-accent-line peer-checked:bg-accent-faint peer-checked:text-accent">
            {checked ? "Active" : "Theme"}
          </span>
        </div>
      </div>
    </label>
  );
}

export default async function SettingsPage() {
  noStore();

  const data = await getSettingsPageData();
  const currentTheme = getThemeMeta(data.profile.theme);

  return (
    <AppShell
      title="Settings"
      description="Manage identity, appearance, and regional preferences without burying them in onboarding."
    >
      <section className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <div className="space-y-6 xl:sticky xl:top-28 xl:self-start">
          <Surface>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-soft">
                  Account
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-ink">
                  {data.profile.displayName || "Dayboard account"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">{data.profile.email}</p>
              </div>

              <div className="rounded-[1.5rem] border border-line bg-surface-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                  Appearance
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">{currentTheme.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{currentTheme.description}</p>
              </div>

              <div className="space-y-3 text-sm text-muted">
                <p>Joined on {data.profile.joinedOn}</p>
                <p>
                  {data.profile.timezone} · {data.profile.currency}
                </p>
              </div>
            </div>
          </Surface>

          <Surface>
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-soft">
                Workspace
              </p>
              <div className="grid gap-3">
                {data.stats.map((stat) => (
                  <SettingsMetric
                    key={stat.title}
                    label={stat.title}
                    value={stat.value}
                    caption={stat.caption}
                  />
                ))}
              </div>
            </div>
          </Surface>
        </div>

        <div className="space-y-6">
          <Surface>
            <SectionHeader
              eyebrow="Profile"
              title="Identity"
              description="Keep the account basics clean. This is the name the app uses around the product."
            />

            <form action={updateProfilePreferencesAction} className="mt-6 space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-ink-soft">Display name</span>
                  <input
                    type="text"
                    name="displayName"
                    defaultValue={data.profile.displayName}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-line bg-surface-muted px-4 py-3 text-sm text-ink outline-none transition focus:border-line-focus focus:bg-surface"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-ink-soft">Email</span>
                  <input
                    type="email"
                    value={data.profile.email}
                    readOnly
                    className="w-full rounded-2xl border border-line bg-surface-subtle px-4 py-3 text-sm text-soft outline-none"
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft"
                >
                  Save profile
                </button>
              </div>
            </form>
          </Surface>

          <Surface>
            <SectionHeader
              eyebrow="Appearance"
              title="Colour scheme"
              description="Choose the palette that will be applied across the product. This setting updates the full app, not just Settings."
            />

            <form action={updateAppearancePreferencesAction} className="mt-6 space-y-5">
              <div className="grid gap-4 lg:grid-cols-2">
                {themeOptions.map((option) => (
                  <ThemeOptionCard
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    description={option.description}
                    preview={option.preview}
                    checked={data.profile.theme === option.value}
                  />
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft"
                >
                  Save appearance
                </button>
              </div>
            </form>
          </Surface>

          <Surface>
            <SectionHeader
              eyebrow="Regional"
              title="Timezone and currency"
              description="Regional defaults stay here instead of being forced into sign-up."
            />

            <form action={updateRegionalPreferencesAction} className="mt-6 space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-ink-soft">Timezone</span>
                  <select
                    name="timezone"
                    defaultValue={data.profile.timezone}
                    className="w-full rounded-2xl border border-line bg-surface-muted px-4 py-3 text-sm text-ink outline-none transition focus:border-line-focus focus:bg-surface"
                  >
                    {timezoneOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-ink-soft">Currency</span>
                  <select
                    name="currency"
                    defaultValue={data.profile.currency}
                    className="w-full rounded-2xl border border-line bg-surface-muted px-4 py-3 text-sm text-ink outline-none transition focus:border-line-focus focus:bg-surface"
                  >
                    {currencyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft"
                >
                  Save regional settings
                </button>
              </div>
            </form>
          </Surface>
        </div>
      </section>
    </AppShell>
  );
}
