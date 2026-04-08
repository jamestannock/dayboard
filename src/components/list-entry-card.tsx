import {
  deleteMediaEntryAction,
  updateMediaEntryAction,
  updateMediaStatusAction,
} from "@/app/actions";
import {
  formatListCategory,
  formatMediaStatus,
} from "@/lib/dayboard-store";

type ListEntryCardProps = {
  item: {
    id: string;
    title: string;
    creator: string | null;
    listCategory: string | null;
    type: string;
    status: string;
    rating: number | null;
    notesSummary: string | null;
  };
  categories: string[];
  showStatusActions?: boolean;
  deleteLabel?: string;
};

const statusOptions = [
  { label: "Backlog", value: "BACKLOG" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Completed", value: "COMPLETED" },
];

export function ListEntryCard({
  item,
  categories,
  showStatusActions = true,
  deleteLabel = "Remove",
}: ListEntryCardProps) {
  const datalistId = `lists-categories-${item.id}`;
  const categoryLabel = formatListCategory(item.listCategory, item.type);

  return (
    <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-slate-950">{item.title}</p>
          <p className="mt-1 text-sm text-slate-500">
            {categoryLabel} • {item.creator ?? "No source attached"}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
            {item.rating ?? "-"}
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {formatMediaStatus(item.status)}
          </span>
        </div>
      </div>

      {item.notesSummary ? (
        <p className="mt-3 text-sm leading-7 text-slate-600">{item.notesSummary}</p>
      ) : null}

      {showStatusActions ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {statusOptions.map((option) => (
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
        </div>
      ) : null}

      <details className="mt-4 rounded-[1.25rem] border border-slate-200 bg-white">
        <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-700">
          Edit item
        </summary>
        <div className="border-t border-slate-200 px-4 py-4">
          <form action={updateMediaEntryAction} className="grid gap-3 md:grid-cols-2">
            <input type="hidden" name="id" value={item.id} />
            <input
              name="title"
              defaultValue={item.title}
              placeholder="Title"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <input
              name="creator"
              defaultValue={item.creator ?? ""}
              placeholder="Creator, author, source"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <input
              name="category"
              defaultValue={categoryLabel}
              placeholder="Category"
              list={datalistId}
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <select
              name="status"
              defaultValue={item.status}
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              name="rating"
              type="number"
              min="1"
              max="5"
              defaultValue={item.rating ?? ""}
              placeholder="Rating"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <textarea
              name="notes"
              defaultValue={item.notesSummary ?? ""}
              placeholder="Short note"
              className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <datalist id={datalistId}>
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-2 md:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Save changes
              </button>
            </div>
          </form>
          <form action={deleteMediaEntryAction} className="mt-3">
            <input type="hidden" name="id" value={item.id} />
            <button
              type="submit"
              className="text-sm font-semibold text-rose-700 transition hover:text-rose-800"
            >
              {deleteLabel}
            </button>
          </form>
        </div>
      </details>
    </div>
  );
}
