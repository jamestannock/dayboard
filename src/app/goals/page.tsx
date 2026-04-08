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
import {
  BarListChart,
  DeleteButton,
  ScrollPane,
  SectionHeader,
  StatGrid,
  Surface,
} from "@/components/product-ui";
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

      <Surface title="Week view" subtitle="Status and habit completion should be visible before you start editing rows.">
        <div className="grid gap-5 xl:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Goal status
            </p>
            <BarListChart
              items={goalsPage.goalStatusChart}
              emptyMessage="No goals to chart yet."
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Habit completion
            </p>
            <BarListChart
              items={goalsPage.habitCompletionChart}
              emptyMessage="No habits to chart yet."
            />
          </div>
        </div>
      </Surface>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Set the week up properly"
          description="Goals and habits should be quick to add so the system supports execution instead of slowing it down."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Surface title="Add weekly goal" subtitle="Small number, high leverage.">
          <form action={createGoalAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              placeholder="Goal title"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <textarea
              name="description"
              placeholder="Why it matters"
              className="min-h-24 rounded-[1.5rem] border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <input
              name="dueAt"
              type="date"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft"
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
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="cadence"
              placeholder="Daily"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <button
              type="submit"
              className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink md:col-span-2"
            >
              Add habit
            </button>
          </form>
        </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Execution"
          title="Run the week in one place"
          description="Goals and habits should stay editable from the page itself."
        />
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface title="Weekly plan" subtitle="Real goals with editable status transitions.">
          <ScrollPane className="space-y-3">
            {goalsPage.goals.map((goal) => (
              <div key={goal.id} className="rounded-[1.25rem] bg-surface-muted px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-ink">{goal.title}</p>
                    <p className="mt-1 text-sm text-soft">{goal.dueLabel}</p>
                  </div>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
                    {goal.statusLabel}
                  </span>
                </div>
                {goal.description ? (
                  <p className="mt-3 text-sm leading-7 text-muted">{goal.description}</p>
                ) : null}
                <div className="mt-3 flex flex-wrap items-center gap-2">
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
                        className="rounded-full border border-line-strong px-3 py-1 text-xs font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
                      >
                        {option.label}
                      </button>
                    </form>
                  ))}
                  <form action={deleteGoalAction}>
                    <input type="hidden" name="id" value={goal.id} />
                    <DeleteButton />
                  </form>
                </div>
              </div>
            ))}
          </ScrollPane>
        </Surface>

        <Surface title="Habit scoreboard" subtitle="Today completion is editable from the page itself.">
          <ScrollPane className="space-y-3">
            {goalsPage.habits.map((habit) => (
              <div key={habit.id} className="rounded-[1.25rem] bg-surface-muted px-4 py-3">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-ink">{habit.title}</p>
                    <p className="mt-1 text-sm text-soft">
                      {habit.cadence} • streak {habit.streak}
                    </p>
                  </div>
                  <form action={toggleHabitTodayAction}>
                    <input type="hidden" name="habitId" value={habit.id} />
                    <button
                      type="submit"
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                        habit.todayDone
                          ? "bg-ink text-on-dark hover:bg-ink-soft"
                          : "border border-line-strong text-ink-soft hover:border-line-focus hover:text-ink"
                      }`}
                    >
                      {habit.todayDone ? "Done today" : "Log today"}
                    </button>
                  </form>
                </div>
                <form action={deleteHabitAction} className="mt-2">
                  <input type="hidden" name="id" value={habit.id} />
                  <DeleteButton />
                </form>
              </div>
            ))}
          </ScrollPane>
        </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Review"
          title="Close the loop"
          description="A short review is better than an ambitious one that never gets used."
        />
      <Surface title="Weekly review" subtitle="Review prompts stay light so they actually get used.">
        <ScrollPane className="space-y-3">
          {goalsPage.review.map((question, index) => (
            <div
              key={question}
              className="flex items-start gap-4 rounded-[1.5rem] bg-surface-muted px-4 py-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-semibold text-on-dark">
                {index + 1}
              </div>
              <p className="pt-1 text-sm leading-7 text-ink-soft">{question}</p>
            </div>
          ))}
        </ScrollPane>
      </Surface>
      </section>
    </AppShell>
  );
}
