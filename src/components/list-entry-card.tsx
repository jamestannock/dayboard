import {
  deleteMediaEntryAction,
  updateMediaEntryAction,
} from "@/app/actions";
import { PencilIcon } from "@/components/product-icons";
import { DeleteButton } from "@/components/product-ui";
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
  deleteLabel = "Delete",
}: ListEntryCardProps) {
  const datalistId = `lists-categories-${item.id}`;
  const categoryLabel = formatListCategory(item.listCategory, item.type);
  const notesPreview = item.notesSummary?.trim() || "No note attached yet.";

  return (
    <details className="group rounded-[1.5rem] border border-line bg-surface-muted px-4 py-4 open:bg-surface open:shadow-sm">
      <summary className="list-none cursor-pointer">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-ink">{item.title}</p>
              <p className="mt-1 truncate text-sm text-soft">
                {categoryLabel} • {item.creator ?? "No source attached"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              <span className="rounded-full bg-surface px-3 py-1.5 normal-case tracking-normal text-ink-soft">
                {item.rating ?? "-"}
              </span>
              <span className="rounded-full bg-surface px-3 py-1.5">
                {formatMediaStatus(item.status)}
              </span>
            </div>
            <span className="rounded-full border border-line-strong bg-surface p-2 text-muted transition group-open:bg-ink group-open:text-on-dark">
              <PencilIcon />
            </span>
          </div>
          <div className="rounded-2xl bg-surface px-4 py-3 text-sm text-muted">
            <p className="break-words">{notesPreview}</p>
          </div>
        </div>
      </summary>

      <div className="mt-4 border-t border-line pt-4">
        <div className="rounded-[1.25rem] bg-surface-muted p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {statusOptions.map((option) => (
              <span
                key={option.value}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  option.value === item.status
                    ? "border-ink bg-ink text-on-dark"
                    : "border-line-strong bg-surface text-ink-soft"
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
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <input
              name="creator"
              defaultValue={item.creator ?? ""}
              placeholder="Creator, author, source"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="category"
              defaultValue={categoryLabel}
              placeholder="Category"
              list={datalistId}
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <select
              name="status"
              defaultValue={item.status}
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
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
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <textarea
              name="notes"
              defaultValue={item.notesSummary ?? ""}
              placeholder="Short note"
              className="min-h-24 rounded-[1.5rem] border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <datalist id={datalistId}>
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
            <div className="flex flex-wrap gap-2 md:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-on-dark transition hover:bg-ink-soft"
              >
                Save changes
              </button>
              <DeleteButton
                label={deleteLabel}
                formAction={deleteMediaEntryAction}
                aria-label={deleteLabel}
                title={deleteLabel}
              />
            </div>
          </form>
        </div>
      </div>
    </details>
  );
}
