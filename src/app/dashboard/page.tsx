import { unstable_noStore as noStore } from "next/cache";
import { AppShell } from "@/components/app-shell";
import {
  BarListChart,
  ScrollPane,
  SectionHeader,
  StatGrid,
  Surface,
} from "@/components/product-ui";
import { getDashboardPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  noStore();
  const dashboardPage = await getDashboardPageData();

  return (
    <AppShell
      title="Dashboard"
      description="A compact operating view of goals, lists, mind, body, and finance."
    >
      <StatGrid items={dashboardPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="This week"
          title="Run the current week"
          description="The dashboard should answer what matters, what is moving, and what needs attention without making you open five pages first."
        />
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Surface title="Priority stack" subtitle="The top weekly goals stay closest to the top.">
            <ScrollPane className="space-y-3">
              {dashboardPage.focus.length > 0 ? (
                dashboardPage.focus.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 rounded-[1.5rem] bg-surface-muted px-4 py-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-on-dark">
                      {index + 1}
                    </div>
                    <p className="pt-1 text-sm leading-7 text-ink-soft">{item}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
                  No weekly goals yet.
                </div>
              )}
            </ScrollPane>
          </Surface>

          <Surface title="Goal mix" subtitle="A quick status read across the current plan.">
            <BarListChart
              items={dashboardPage.goalStatusChart}
              emptyMessage="No goals to chart yet."
            />
          </Surface>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Surface title="Mind momentum" subtitle="Top tracks by progress, not intention.">
          <BarListChart
            items={dashboardPage.mindProgressChart}
            emptyMessage="No Mind tracks yet."
          />
        </Surface>

        <Surface title="List mix" subtitle="Which categories are actually active in Lists.">
          <BarListChart
            items={dashboardPage.listCategoryChart}
            emptyMessage="No list items yet."
          />
        </Surface>

        <Surface title="Body mix" subtitle="Where your recent sessions are actually going.">
          <BarListChart
            items={dashboardPage.bodyMixChart}
            emptyMessage="No Body sessions yet."
          />
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Signals"
          title="Watch money, lists, and body together"
          description="These sections are denser because they should read like operating panels, not as decorative cards."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Surface title="Lists snapshot" subtitle="Current queue plus what is waiting next.">
            <div className="grid gap-4 lg:grid-cols-2">
              {dashboardPage.mediaQueues.map((queue) => (
                <div key={queue.title} className="rounded-[1.5rem] bg-surface-muted p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium text-ink">{queue.title}</h3>
                    <span className="text-sm text-soft">{queue.count}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {queue.items.length > 0 ? (
                      queue.items.map((item) => (
                        <li
                          key={item}
                          className="truncate rounded-xl bg-surface px-3 py-2 text-sm text-ink-soft"
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="rounded-xl bg-surface px-3 py-2 text-sm text-soft">
                        Nothing here yet.
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </Surface>

          <Surface title="Cash flow pulse" subtitle="Recent transactions and their direction.">
            <div className="space-y-5">
              <BarListChart
                items={dashboardPage.moneyFlowChart}
                emptyMessage="No money movement yet."
              />
              <ScrollPane className="space-y-3">
                {dashboardPage.transactionFeed.length > 0 ? (
                  dashboardPage.transactionFeed.map((transaction) => (
                    <div
                      key={`${transaction.title}-${transaction.amount}`}
                      className="flex items-center justify-between rounded-[1.5rem] bg-surface-muted px-4 py-4"
                    >
                      <div>
                        <p className="font-medium text-ink">{transaction.title}</p>
                        <p className="mt-1 text-sm text-soft">{transaction.category}</p>
                      </div>
                      <p
                        className={`font-semibold ${
                          transaction.positive ? "text-success" : "text-ink"
                        }`}
                      >
                        {transaction.amount}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
                    No transactions yet.
                  </div>
                )}
              </ScrollPane>
            </div>
          </Surface>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Surface title="Week map" subtitle="What is due next across the plan.">
          <ScrollPane className="space-y-3">
            {dashboardPage.schedule.length > 0 ? (
              dashboardPage.schedule.map((slot) => (
                <div
                  key={`${slot.day}-${slot.item}`}
                  className="flex items-center justify-between rounded-[1.5rem] bg-surface-muted px-4 py-4"
                >
                  <div>
                    <p className="font-medium text-ink">{slot.item}</p>
                    <p className="mt-1 text-sm text-soft">{slot.day}</p>
                  </div>
                  <span className="text-sm font-medium text-ink-soft">{slot.time}</span>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
                Nothing scheduled yet.
              </div>
            )}
          </ScrollPane>
        </Surface>

        <Surface title="Body snapshot" subtitle="Recent sessions stay visible without taking over the page.">
          <ScrollPane className="space-y-3">
            {dashboardPage.healthFeed.length > 0 ? (
              dashboardPage.healthFeed.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-[1.5rem] bg-surface-muted px-4 py-4"
                >
                  <div>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-soft">
                      {item.typeLabel} • {item.dateLabel}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-ink-soft">{item.durationLabel}</span>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
                No Body sessions yet.
              </div>
            )}
          </ScrollPane>
        </Surface>
      </section>
    </AppShell>
  );
}
