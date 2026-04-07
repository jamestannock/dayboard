import { unstable_noStore as noStore } from "next/cache";
import {
  createMediaEntryAction,
  deleteMediaEntryAction,
  updateMediaStatusAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { PillRow, SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import {
  formatMediaStatus,
  formatMediaType,
  getBookListPageData,
} from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

const filterPills = ["All", "Books", "Movies", "TV Shows", "Backlog", "In progress", "Completed"];

export default async function BookListPage() {
  noStore();
  const bookListPage = await getBookListPageData();

  return (
    <AppShell
      title="Book List"
      description="A unified media page for books, movies, TV shows, documentaries, essays, and whatever else deserves your attention."
    >
      <StatGrid items={bookListPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Add a new item"
          description="Books, movies, and shows all enter through the same flow. That is the point of the page."
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
              placeholder="Creator or author"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <select
              name="type"
              defaultValue="BOOK"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            >
              <option value="BOOK">Book</option>
              <option value="MOVIE">Movie</option>
              <option value="TV_SHOW">TV Show</option>
              <option value="OTHER">Other</option>
            </select>
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
          eyebrow="Media filters"
          title="One list, multiple media types"
          description="The page name stays simple even though the records keep track of what each thing actually is."
        />
        <PillRow items={filterPills} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Surface
          title="Spotlight item"
          subtitle={
            bookListPage.spotlight
              ? `${formatMediaType(bookListPage.spotlight.type)} • ${formatMediaStatus(bookListPage.spotlight.status)}`
              : "Nothing active yet"
          }
        >
          {bookListPage.spotlight ? (
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <h3 className="text-xl font-semibold text-slate-950">
                {bookListPage.spotlight.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {bookListPage.spotlight.creator ?? "Unknown creator"}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {bookListPage.spotlight.notesSummary ?? "No note attached yet."}
              </p>
            </div>
          ) : (
            <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-600">
              Add your first item and it will appear here.
            </div>
          )}
        </Surface>

        <Surface title="Recent additions" subtitle="The newest items stay visible for quick cleanup.">
          <div className="space-y-3">
            {bookListPage.recent.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {formatMediaType(item.type)} • {formatMediaStatus(item.status)}
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
          { title: "In progress", items: bookListPage.active },
          { title: "Backlog", items: bookListPage.backlog },
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
                          {formatMediaType(item.type)} • {item.creator ?? "Unknown creator"}
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

      <Surface title="Completed" subtitle="Finished items stay visible for history and taste patterns.">
        <div className="grid gap-3">
          {bookListPage.completed.length > 0 ? (
            bookListPage.completed.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-700 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.5fr]"
              >
                <span className="font-medium text-slate-950">{item.title}</span>
                <span>{formatMediaType(item.type)}</span>
                <span>{item.creator ?? "Unknown creator"}</span>
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
