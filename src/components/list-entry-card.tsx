import {
  deleteMediaEntryAction,
  updateMediaEntryAction,
} from "@/app/actions";
import { PencilIcon, TrashIcon } from "@/components/product-icons";
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
  deleteLabel = "Remove",
}: ListEntryCardProps) {
  const datalistId = `lists-categories-${item.id}`;
  const categoryLabel = formatListCategory(item.listCategory, item.type);
  const notesPreview = item.notesSummary?.trim() || "No note attached yet.";

  return (
    <details className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 open:bg-white open:shadow-sm">
      <summary className="list-none cursor-pointer">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1.4fr)_auto_auto] xl:items-center">
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-950">{item.title}</p>
            <p className="mt-1 truncate text-sm text-slate-500">
              {categoryLabel} • {item.creator ?? "No source attached"}
            </p>
          </div>
          <p className="truncate text-sm text-slate-600">{notesPreview}</p>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            <span className="rounded-full bg-white px-3 py-1.5 normal-case tracking-normal text-slate-700">
              {item.rating ?? "-"}
            </span>
            <span className="rounded-full bg-white px-3 py-1.5">
              {formatMediaStatus(item.status)}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="rounded-full border border-slate-300 bg-white p-2 text-slate-600 transition group-open:bg-slate-950 group-open:text-white">
              <PencilIcon />
            </span>
          </div>
        </div>
      </summary>

      <div className="mt-4 border-t border-slate-200 pt-4">
        <div className="rounded-[1.25rem] bg-slate-50 p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <span
                key={option.value}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  option.value === item.status
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-300 bg-white text-slate-700"
                }`}
              >
                {option.label}
              </span>
            ))}
          </div>
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
              <button
                type="submit"
                formAction={deleteMediaEntryAction}
                aria-label={deleteLabel}
                title={deleteLabel}
                className="rounded-full border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800"
              >
                <TrashIcon />
              </button>
            </div>
          </form>
        </div>
      </div>
    </details>
  );
}
