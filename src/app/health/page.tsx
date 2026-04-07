import { unstable_noStore as noStore } from "next/cache";
import {
  createHealthActivityAction,
  deleteHealthActivityAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { getHealthPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  noStore();
  const healthPage = await getHealthPageData();

  return (
    <AppShell
      title="Health"
      description="Log the work you do in the gym, on runs, on walks, or anywhere else physical training happens."
    >
      <StatGrid items={healthPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Log training properly"
          description="Cardio can stay simple. Gym sessions should include the actual exercise work so the page is useful after the workout too."
        />
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Surface title="Gym session" subtitle="Track the session, then list the main exercises with weight, reps, and sets.">
          <form action={createHealthActivityAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              placeholder="Upper body gym session"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <select
              name="type"
              defaultValue="GYM"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            >
              <option value="GYM">Gym</option>
              <option value="RUN">Run</option>
              <option value="WALK">Walk</option>
              <option value="CYCLE">Ride</option>
              <option value="SWIM">Swim</option>
              <option value="OTHER">Other</option>
            </select>
            <input
              name="durationMin"
              type="number"
              min="1"
              placeholder="45"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <input
              name="distanceKm"
              type="number"
              min="0"
              step="0.01"
              placeholder="Optional distance in km"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <input
              name="happenedAt"
              type="date"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <textarea
              name="notes"
              placeholder="Optional notes"
              className="min-h-28 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <div className="space-y-3 rounded-[1.5rem] bg-slate-50 p-4 md:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                Exercises
              </p>
              {["Primary lift", "Secondary lift", "Accessory"].map((label, index) => (
                <div key={label} className="grid gap-3 md:grid-cols-[1.4fr_0.7fr_0.7fr_0.7fr]">
                  <input
                    name="exerciseName"
                    placeholder={label}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                  <input
                    name="exerciseWeightKg"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder={index === 0 ? "80" : "20"}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                  <input
                    name="exerciseReps"
                    type="number"
                    min="1"
                    placeholder="8"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                  <input
                    name="exerciseSets"
                    type="number"
                    min="1"
                    placeholder="4"
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 md:col-span-2"
            >
              Save activity
            </button>
          </form>
        </Surface>

        <Surface title="Weekly mix" subtitle="A quick read on what kind of movement your week actually contains.">
          <div className="space-y-3">
            {healthPage.weeklyMix.length > 0 ? (
              healthPage.weeklyMix.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
                No sessions logged this week yet.
              </div>
            )}
          </div>
        </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Review"
          title="Look back at recent sessions"
          description="Recent training should show more than duration. Gym sessions should surface the exercise work you logged."
        />
      <Surface title="Recent activity" subtitle="Latest sessions stay visible for quick review.">
        <div className="space-y-3">
          {healthPage.activities.length > 0 ? (
            healthPage.activities.map((activity) => (
              <div
                key={activity.id}
                className="grid gap-2 rounded-[1.5rem] bg-slate-50 px-4 py-4 md:grid-cols-[1.4fr_0.8fr_0.7fr_0.7fr_0.9fr]"
              >
                <span className="font-medium text-slate-950">{activity.title}</span>
                <span className="text-sm text-slate-500">{activity.typeLabel}</span>
                <span className="text-sm text-slate-700">{activity.durationLabel}</span>
                <span className="text-sm text-slate-700">{activity.distanceLabel}</span>
                <span className="text-sm text-slate-500">{activity.dateLabel}</span>
                {activity.exercises.length > 0 ? (
                  <div className="md:col-span-5 rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                      {activity.exerciseSummary}
                    </p>
                    <div className="mt-3 space-y-2">
                      {activity.exercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="grid gap-2 text-sm text-slate-700 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]"
                        >
                          <span className="font-medium text-slate-950">{exercise.name}</span>
                          <span>{exercise.weightLabel}</span>
                          <span>{exercise.repsLabel}</span>
                          <span>{exercise.setsLabel}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                <form action={deleteHealthActivityAction} className="md:col-span-5">
                  <input type="hidden" name="id" value={activity.id} />
                  <button
                    type="submit"
                    className="text-xs font-semibold text-rose-700 transition hover:text-rose-800"
                  >
                    Delete activity
                  </button>
                </form>
                {activity.notes ? (
                  <span className="md:col-span-5 text-sm leading-7 text-slate-600">
                    {activity.notes}
                  </span>
                ) : null}
              </div>
            ))
          ) : (
            <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
              No health entries yet.
            </div>
          )}
        </div>
      </Surface>
      </section>
    </AppShell>
  );
}
