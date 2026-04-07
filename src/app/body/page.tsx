import { unstable_noStore as noStore } from "next/cache";
import {
  createHealthActivityAction,
  deleteHealthActivityAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { getBodyPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function BodyPage() {
  noStore();
  const bodyPage = await getBodyPageData();

  return (
    <AppShell
      title="Body"
      description="Track training, bodyweight, eating notes, and physical sessions in one place instead of splitting them across separate apps."
    >
      <StatGrid items={bodyPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Log a session cleanly"
          description="Body should handle workouts, runs, bodyweight, and quick eating or recovery notes without turning the form into a mess."
        />
        <Surface
          title="Body session"
          subtitle="Log the essentials first. Add exercise detail when it matters."
        >
          <form action={createHealthActivityAction} className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <input
                name="title"
                placeholder="Upper body gym session"
                required
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 lg:col-span-2"
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
                placeholder="Duration in minutes"
                required
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
              />
              <input
                name="bodyWeightKg"
                type="number"
                min="0"
                step="0.1"
                placeholder="Body weight in kg"
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
                name="nutritionSummary"
                placeholder="Eating note, recovery note, or general body check-in"
                className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
              />
              <textarea
                name="notes"
                placeholder="Optional training notes"
                className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
              />
            </div>

            <div className="space-y-4 rounded-[1.5rem] bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Exercises
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Use this for gym sessions. Leave it blank for runs, walks, and other simpler entries.
                </p>
              </div>
              {["Primary lift", "Secondary lift", "Accessory"].map((label, index) => (
                <div
                  key={label}
                  className="grid gap-3 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)_minmax(0,0.7fr)_minmax(0,0.7fr)]"
                >
                  <input
                    name="exerciseName"
                    placeholder={label}
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                  <input
                    name="exerciseWeightKg"
                    type="number"
                    min="0"
                    step="0.5"
                    placeholder={index === 0 ? "Weight kg" : "Optional kg"}
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                  <input
                    name="exerciseReps"
                    type="number"
                    min="1"
                    placeholder="Reps"
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                  <input
                    name="exerciseSets"
                    type="number"
                    min="1"
                    placeholder="Sets"
                    className="min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-500"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save body session
            </button>
          </form>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Review"
          title="Look back at recent sessions"
          description="Recent Body entries should show the basics clearly first, then the extra detail only when it exists."
        />
        <Surface title="Recent activity" subtitle="Latest sessions stay visible for quick review.">
          <div className="space-y-3">
            {bodyPage.activities.length > 0 ? (
              bodyPage.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-[1.5rem] bg-slate-50 px-4 py-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-medium text-slate-950">{activity.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {activity.typeLabel} • {activity.dateLabel}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                      <span className="rounded-full bg-white px-3 py-2">
                        {activity.durationLabel}
                      </span>
                      <span className="rounded-full bg-white px-3 py-2">
                        {activity.distanceLabel}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    <span className="rounded-full bg-white px-3 py-2">
                      {activity.bodyWeightLabel}
                    </span>
                    {activity.nutritionSummary ? (
                      <span className="rounded-full bg-white px-3 py-2 normal-case tracking-normal text-slate-700">
                        {activity.nutritionSummary}
                      </span>
                    ) : null}
                  </div>
                  {activity.exercises.length > 0 ? (
                    <div className="mt-3 rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                        {activity.exerciseSummary}
                      </p>
                      <div className="mt-3 space-y-2">
                        {activity.exercises.map((exercise) => (
                          <div
                            key={exercise.id}
                            className="grid gap-2 text-sm text-slate-700 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]"
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
                  {activity.notes ? (
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {activity.notes}
                    </p>
                  ) : null}
                  <form action={deleteHealthActivityAction} className="mt-3">
                    <input type="hidden" name="id" value={activity.id} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-rose-700 transition hover:text-rose-800"
                    >
                      Delete activity
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
                No body entries yet.
              </div>
            )}
          </div>
        </Surface>
      </section>
    </AppShell>
  );
}
