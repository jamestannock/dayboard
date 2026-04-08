import {
  deleteHealthActivityAction,
  updateHealthActivityAction,
} from "@/app/actions";
import { BodySessionForm } from "@/components/body-session-form";
import { PencilIcon, TrashIcon } from "@/components/product-icons";

type BodyActivityRowProps = {
  activity: {
    id: string;
    title: string;
    type: string;
    typeLabel: string;
    dateLabel: string;
    durationLabel: string;
    durationValue: string;
    distanceLabel: string;
    distanceValue: string;
    bodyWeightLabel: string;
    bodyWeightValue: string;
    nutritionSummary: string | null;
    notes: string | null;
    exerciseSummary: string;
    happenedOnInput: string;
    exercises: Array<{
      id: string;
      name: string;
      weightValue: string;
      repsValue: string;
      setsValue: string;
    }>;
  };
};

export function BodyActivityRow({ activity }: BodyActivityRowProps) {
  const summaryText = activity.nutritionSummary || activity.notes || activity.exerciseSummary;

  return (
    <details className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 open:bg-white open:shadow-sm">
      <summary className="list-none cursor-pointer">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1.8fr)_minmax(0,1.2fr)_auto] xl:items-center">
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-950">{activity.title}</p>
            <p className="mt-1 truncate text-sm text-slate-500">
              {activity.typeLabel} • {activity.dateLabel}
            </p>
          </div>
          <p className="truncate text-sm text-slate-600">{summaryText}</p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
            <span className="rounded-full bg-white px-3 py-1.5">{activity.durationLabel}</span>
            <span className="rounded-full bg-white px-3 py-1.5">{activity.distanceLabel}</span>
            <span className="rounded-full bg-white px-3 py-1.5">{activity.bodyWeightLabel}</span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 xl:inline-flex">
              {activity.exerciseSummary}
            </span>
            <span className="rounded-full border border-slate-300 bg-white p-2 text-slate-600 transition group-open:bg-slate-950 group-open:text-white">
              <PencilIcon />
            </span>
          </div>
        </div>
      </summary>

      <div className="mt-4 border-t border-slate-200 pt-4">
        <BodySessionForm
          submitAction={updateHealthActivityAction}
          submitLabel="Save changes"
          initialValues={{
            id: activity.id,
            title: activity.title,
            type: activity.type,
            durationMin: activity.durationValue,
            bodyWeightKg: activity.bodyWeightValue,
            distanceKm: activity.distanceValue,
            happenedAt: activity.happenedOnInput,
            nutritionSummary: activity.nutritionSummary ?? "",
            notes: activity.notes ?? "",
            exercises: activity.exercises.map((exercise) => ({
              id: exercise.id,
              name: exercise.name,
              weightKg: exercise.weightValue,
              reps: exercise.repsValue,
              sets: exercise.setsValue,
            })),
          }}
          footerAction={
            <button
              type="submit"
              formAction={deleteHealthActivityAction}
              aria-label="Delete activity"
              title="Delete activity"
              className="rounded-full border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 hover:text-rose-800"
            >
              <TrashIcon />
            </button>
          }
        />
      </div>
    </details>
  );
}
