import { unstable_noStore as noStore } from "next/cache";
import {
  createGoalAction,
  createHabitAction,
  deleteGoalAction,
  deleteHabitAction,
  toggleHabitTodayAction,
  updateGoalStatusAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { StatGrid, Surface } from "@/components/product-ui";
import { getGoalsPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function GoalsPage() {
  noStore();
  const goalsPage = await getGoalsPageData();

  return (
    <AppShell
      title="Goals"
      description="A page for weekly execution, not aspirational clutter. Goals, habits, and review loops should reinforce each other."
    >
      <StatGrid items={goalsPage.stats} />

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Surface title="Add weekly goal" subtitle="Small number, high leverage.">
          <form action={createGoalAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              placeholder="Goal title"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <textarea
              name="description"
              placeholder="Why it matters"
              className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <input
              name="dueAt"
              type="date"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add goal
            </button>
          </form>
        </Surface>

        <Surface title="Add habit" subtitle="Only add habits that deserve repetition.">
          <form action={createHabitAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              placeholder="Habit title"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <input
              name="cadence"
              placeholder="Daily"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <button
              type="submit"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950 md:col-span-2"
            >
              Add habit
            </button>
          </form>
        </Surface>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface title="Weekly plan" subtitle="Real goals with editable status transitions.">
          <div className="space-y-3">
            {goalsPage.goals.map((goal) => (
              <div key={goal.id} className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-950">{goal.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{goal.dueLabel}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    {goal.statusLabel}
                  </span>
                </div>
                {goal.description ? (
                  <p className="mt-3 text-sm leading-7 text-slate-600">{goal.description}</p>
                ) : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { label: "Planned", value: "PLANNED" },
                    { label: "Active", value: "ACTIVE" },
                    { label: "Done", value: "DONE" },
                    { label: "Carry", value: "CARRIED_FORWARD" },
                  ].map((option) => (
                    <form key={option.value} action={updateGoalStatusAction}>
                      <input type="hidden" name="id" value={goal.id} />
                      <input type="hidden" name="status" value={option.value} />
                      <button
                        type="submit"
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                      >
                        {option.label}
                      </button>
                    </form>
                  ))}
                  <form action={deleteGoalAction}>
                    <input type="hidden" name="id" value={goal.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-rose-200 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:border-rose-400"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface title="Habit scoreboard" subtitle="Today completion is editable from the page itself.">
          <div className="space-y-3">
            {goalsPage.habits.map((habit) => (
              <div key={habit.id} className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-950">{habit.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {habit.cadence} • streak {habit.streak}
                    </p>
                  </div>
                  <form action={toggleHabitTodayAction}>
                    <input type="hidden" name="habitId" value={habit.id} />
                    <button
                      type="submit"
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                        habit.todayDone
                          ? "bg-slate-950 text-white hover:bg-slate-800"
                          : "border border-slate-300 text-slate-700 hover:border-slate-500 hover:text-slate-950"
                      }`}
                    >
                      {habit.todayDone ? "Done today" : "Log today"}
                    </button>
                  </form>
                </div>
                <form action={deleteHabitAction} className="mt-3">
                  <input type="hidden" name="id" value={habit.id} />
                  <button
                    type="submit"
                    className="text-xs font-semibold text-rose-700 transition hover:text-rose-800"
                  >
                    Delete habit
                  </button>
                </form>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <Surface title="Weekly review" subtitle="Review prompts stay light so they actually get used.">
        <div className="space-y-3">
          {goalsPage.review.map((question, index) => (
            <div
              key={question}
              className="flex items-start gap-4 rounded-[1.5rem] bg-slate-50 px-4 py-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <p className="pt-1 text-sm leading-7 text-slate-700">{question}</p>
            </div>
          ))}
        </div>
      </Surface>
    </AppShell>
  );
}
