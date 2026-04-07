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
          title="Log body work properly"
          description="Cardio can stay simple. Gym sessions should include the actual exercise work, and Body should also keep track of weight and nutrition notes."
        />
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <Surface title="Body session" subtitle="Track the session, bodyweight, and the main exercises with weight, reps, and sets.">
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
                Save body session
              </button>
            </form>
          </Surface>

          <Surface title="Weekly mix" subtitle="A quick read on what your week actually contains.">
            <div className="space-y-3">
              {bodyPage.weeklyMix.length > 0 ? (
                bodyPage.weeklyMix.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
                  No body sessions logged this week yet.
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
          description="Recent Body entries should show more than duration. They should surface weigh-ins, nutrition notes, and gym exercise work too."
        />
        <Surface title="Recent activity" subtitle="Latest sessions stay visible for quick review.">
          <div className="space-y-3">
            {bodyPage.activities.length > 0 ? (
              bodyPage.activities.map((activity) => (
                <div
                  key={activity.id}
                  className="grid gap-2 rounded-[1.5rem] bg-slate-50 px-4 py-4 md:grid-cols-[1.4fr_0.8fr_0.7fr_0.7fr_0.9fr]"
                >
                  <span className="font-medium text-slate-950">{activity.title}</span>
                  <span className="text-sm text-slate-500">{activity.typeLabel}</span>
                  <span className="text-sm text-slate-700">{activity.durationLabel}</span>
                  <span className="text-sm text-slate-700">{activity.distanceLabel}</span>
                  <span className="text-sm text-slate-500">{activity.dateLabel}</span>
                  <div className="md:col-span-5 flex flex-wrap gap-2 pt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
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
                No body entries yet.
              </div>
            )}
          </div>
        </Surface>
      </section>
    </AppShell>
  );
}
