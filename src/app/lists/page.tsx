import { unstable_noStore as noStore } from "next/cache";
import {
  createMediaEntryAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { ListEntryCard } from "@/components/list-entry-card";
import {
  BarListChart,
  PillRow,
  ScrollPane,
  SectionHeader,
  StatGrid,
  Surface,
} from "@/components/product-ui";
import {
  formatMediaStatus,
  getListsPageData,
} from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function ListsPage() {
  noStore();
  const listsPage = await getListsPageData();
  const filterPills = [
    "All",
    ...listsPage.categories,
    "Backlog",
    "In progress",
    "Completed",
  ];

  return (
    <AppShell
      title="Lists"
      description="One flexible area for books, movies, TV shows, ideas, places, or any other category you want to track."
    >
      <StatGrid items={listsPage.stats} />

      <Surface title="Lists view" subtitle="Category mix and status mix should be readable before you start adding more rows.">
        <div className="grid gap-5 xl:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Category mix
            </p>
            <BarListChart
              items={listsPage.categoryMixChart}
              emptyMessage="No categories to chart yet."
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Status mix
            </p>
            <BarListChart
              items={listsPage.statusMixChart}
              emptyMessage="No list items to chart yet."
            />
          </div>
        </div>
      </Surface>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Add a new list item"
          description="Lists stay useful when categories are flexible. Add books, movies, TV shows, restaurants, ideas, or anything else that deserves a row."
        />
        <Surface>
          <form action={createMediaEntryAction} className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            <input
              name="title"
              placeholder="Title"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft xl:col-span-2"
              required
            />
            <input
              name="creator"
              placeholder="Creator, author, source"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="category"
              placeholder="Category"
              list="lists-categories"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              required
            />
            <select
              name="status"
              defaultValue="BACKLOG"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            >
              <option value="BACKLOG">Backlog</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              placeholder="Rating"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <textarea
              name="notes"
              placeholder="Short note"
              className="min-h-28 rounded-[1.5rem] border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2 xl:col-span-5"
            />
            <datalist id="lists-categories">
              {listsPage.categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <button
              type="submit"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft xl:self-end"
            >
              Add item
            </button>
          </form>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Filters"
          title="Categories stay open-ended"
          description="Lists should stay flexible enough that a new category never needs a new top-level tab."
        />
        <PillRow items={filterPills} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Surface
          title="Spotlight item"
          subtitle={
            listsPage.spotlight
              ? `${listsPage.spotlight.categoryLabel} • ${formatMediaStatus(listsPage.spotlight.status)}`
              : "Nothing active yet"
          }
        >
          {listsPage.spotlight ? (
            <div className="rounded-[1.5rem] bg-surface-muted p-5">
              <h3 className="text-xl font-semibold text-ink">
                {listsPage.spotlight.title}
              </h3>
              <p className="mt-2 text-sm text-soft">
                {listsPage.spotlight.creator ?? "No source attached"}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {listsPage.spotlight.notesSummary ?? "No note attached yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-[1.5rem] bg-surface-muted p-5 text-sm text-muted">
              Add your first item and it will appear here.
            </div>
          )}
        </Surface>

        <Surface title="Recent additions" subtitle="The newest rows stay visible for quick cleanup.">
          <ScrollPane className="space-y-3">
            {listsPage.recent.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] bg-surface-muted px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-soft">
                      {item.categoryLabel} • {formatMediaStatus(item.status)}
                    </p>
                  </div>
                  <span className="rounded-full bg-surface px-3 py-1 text-sm font-medium text-ink-soft">
                    {item.rating ?? "-"}
                  </span>
                </div>
              </div>
            ))}
          </ScrollPane>
        </Surface>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        {[
          { title: "In progress", items: listsPage.active },
          { title: "Backlog", items: listsPage.backlog },
        ].map((section) => (
          <Surface key={section.title} title={section.title} subtitle="Open a row to edit status, notes, and metadata.">
            <ScrollPane className="space-y-3">
              {section.items.length > 0 ? (
                section.items.map((item) => (
                  <ListEntryCard
                    key={item.id}
                    item={item}
                    categories={listsPage.categories}
                  />
                ))
              ) : (
                <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
                  Nothing here yet.
                </div>
              )}
            </ScrollPane>
          </Surface>
        ))}
      </section>

      <Surface title="Completed" subtitle="Finished items stay visible for history and pattern spotting.">
        <ScrollPane className="grid gap-3">
          {listsPage.completed.length > 0 ? (
            listsPage.completed.map((item) => (
              <ListEntryCard
                key={item.id}
                item={item}
                categories={listsPage.categories}
              />
            ))
          ) : (
            <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
              No completed items yet.
            </div>
          )}
        </ScrollPane>
      </Surface>
    </AppShell>
  );
}
