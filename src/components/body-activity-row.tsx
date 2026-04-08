import {
  deleteHealthActivityAction,
  updateHealthActivityAction,
} from "@/app/actions";
import { BodySessionForm } from "@/components/body-session-form";
import { DeleteButton, EditButton } from "@/components/product-ui";

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
    <details className="group rounded-[1.25rem] border border-line bg-surface-muted px-3 py-3 open:bg-surface open:shadow-sm">
      <summary className="list-none cursor-pointer">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-ink">{activity.title}</p>
              <p className="mt-1 truncate text-sm text-soft">
                {activity.typeLabel} • {activity.dateLabel}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              <span className="rounded-full bg-surface px-3 py-1">{activity.durationLabel}</span>
              <span className="rounded-full bg-surface px-3 py-1">{activity.distanceLabel}</span>
              <span className="rounded-full bg-surface px-3 py-1">{activity.bodyWeightLabel}</span>
            </div>
            <span className="hidden rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-soft xl:inline-flex">
              {activity.exerciseSummary}
            </span>
            <EditButton active={false} className="group-open:border-ink group-open:bg-ink group-open:text-on-dark" />
          </div>
          <div className="rounded-2xl bg-surface px-3 py-2.5 text-sm text-muted">
            <p className="break-words">{summaryText}</p>
          </div>
        </div>
      </summary>

      <div className="mt-4 border-t border-line pt-4">
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
            <DeleteButton
              formAction={deleteHealthActivityAction}
              aria-label="Delete activity"
              title="Delete activity"
            />
          }
        />
      </div>
    </details>
  );
}
