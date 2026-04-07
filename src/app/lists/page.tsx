import { unstable_noStore as noStore } from "next/cache";
import {
  createMediaEntryAction,
  deleteMediaEntryAction,
  updateMediaStatusAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { PillRow, SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import {
  formatListCategory,
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
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 xl:col-span-2"
              required
            />
            <input
              name="creator"
              placeholder="Creator, author, source"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <input
              name="category"
              placeholder="Category"
              list="lists-categories"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
              required
            />
            <select
              name="status"
              defaultValue="BACKLOG"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
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
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <textarea
              name="notes"
              placeholder="Short note"
              className="min-h-28 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2 xl:col-span-5"
            />
            <datalist id="lists-categories">
              {listsPage.categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 xl:self-end"
            >
              Add item
            </button>
          </form>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="List filters"
          title="Categories stay open-ended"
          description="The point of Lists is flexibility. The product should not need a new top-level tab every time you want to track a new kind of thing."
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
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <h3 className="text-xl font-semibold text-slate-950">
                {listsPage.spotlight.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {listsPage.spotlight.creator ?? "No source attached"}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {listsPage.spotlight.notesSummary ?? "No note attached yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-600">
              Add your first item and it will appear here.
            </div>
          )}
        </Surface>

        <Surface title="Recent additions" subtitle="The newest rows stay visible for quick cleanup.">
          <div className="space-y-3">
            {listsPage.recent.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.categoryLabel} • {formatMediaStatus(item.status)}
                    </p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
                    {item.rating ?? "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        {[
          { title: "In progress", items: listsPage.active },
          { title: "Backlog", items: listsPage.backlog },
        ].map((section) => (
          <Surface key={section.title} title={section.title} subtitle="Status changes happen inline.">
            <div className="space-y-3">
              {section.items.length > 0 ? (
                section.items.map((item) => (
                  <div key={item.id} className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-950">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {formatListCategory(item.listCategory, item.type)} • {item.creator ?? "No source attached"}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
                        {item.rating ?? "-"}
                      </span>
                    </div>
                    {item.notesSummary ? (
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {item.notesSummary}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        { label: "Backlog", value: "BACKLOG" },
                        { label: "In progress", value: "IN_PROGRESS" },
                        { label: "Completed", value: "COMPLETED" },
                      ].map((option) => (
                        <form key={option.value} action={updateMediaStatusAction}>
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="status" value={option.value} />
                          <button
                            type="submit"
                            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                          >
                            {option.label}
                          </button>
                        </form>
                      ))}
                      <form action={deleteMediaEntryAction}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:border-rose-400"
                        >
                          Archive
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
                  Nothing here yet.
                </div>
              )}
            </div>
          </Surface>
        ))}
      </section>

      <Surface title="Completed" subtitle="Finished items stay visible for history and pattern spotting.">
        <div className="grid gap-3">
          {listsPage.completed.length > 0 ? (
            listsPage.completed.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-700 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.5fr]"
              >
                <span className="font-medium text-slate-950">{item.title}</span>
                <span>{item.categoryLabel}</span>
                <span>{item.creator ?? "No source attached"}</span>
                <span className="font-medium">{item.rating ?? "-"}</span>
              </div>
            ))
          ) : (
            <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
              No completed items yet.
            </div>
          )}
        </div>
      </Surface>
    </AppShell>
  );
}
