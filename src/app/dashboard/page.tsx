import { unstable_noStore as noStore } from "next/cache";
import { AppShell } from "@/components/app-shell";
import {
  BarListChart,
  ScrollPane,
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
      description="A compact command center for the week across goals, lists, mind, body, and finance."
    >
      <StatGrid items={dashboardPage.stats} />

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface title="Priority stack" subtitle="What actually deserves attention this week.">
          <ScrollPane className="space-y-3">
            {dashboardPage.focus.length > 0 ? (
              dashboardPage.focus.map((item, index) => (
                <div
                  key={`${index}-${item}`}
                  className="flex items-start gap-4 rounded-[1.25rem] bg-surface-muted px-4 py-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-on-dark">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-ink-soft">{item}</p>
                </div>
              ))
            ) : (
              <div className="rounded-[1.25rem] bg-surface-muted px-4 py-3 text-sm text-muted">
                No weekly goals yet.
              </div>
            )}
          </ScrollPane>
        </Surface>

        <Surface title="Goal mix" subtitle="The current plan at a glance.">
          <BarListChart
            items={dashboardPage.goalStatusChart}
            emptyMessage="No goals to chart yet."
          />
        </Surface>
      </div>

      <div className="grid gap-6 xl:grid-cols-4">
        <Surface title="Lists" subtitle="Category spread.">
          <BarListChart
            items={dashboardPage.listCategoryChart}
            emptyMessage="No list items yet."
          />
        </Surface>

        <Surface title="Mind" subtitle="Progress across active tracks.">
          <BarListChart
            items={dashboardPage.mindProgressChart}
            emptyMessage="No Mind tracks yet."
          />
        </Surface>

        <Surface title="Body" subtitle="What training is actually happening.">
          <BarListChart
            items={dashboardPage.bodyMixChart}
            emptyMessage="No Body sessions yet."
          />
        </Surface>

        <Surface title="Finance" subtitle="Recent money movement.">
          <BarListChart
            items={dashboardPage.moneyFlowChart}
            emptyMessage="No money movement yet."
          />
        </Surface>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <Surface title="Week map" subtitle="What is due next.">
          <ScrollPane className="space-y-3">
            {dashboardPage.schedule.length > 0 ? (
              dashboardPage.schedule.map((slot, index) => (
                <div
                  key={`${index}-${slot.day}-${slot.item}`}
                  className="flex items-center justify-between rounded-[1.25rem] bg-surface-muted px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-ink">{slot.item}</p>
                    <p className="mt-1 text-sm text-soft">{slot.day}</p>
                  </div>
                  <span className="text-sm font-medium text-ink-soft">{slot.time}</span>
                </div>
              ))
            ) : (
              <div className="rounded-[1.25rem] bg-surface-muted px-4 py-3 text-sm text-muted">
                Nothing scheduled yet.
              </div>
            )}
          </ScrollPane>
        </Surface>

        <Surface title="Recent activity" subtitle="Lists, money, and body signals without opening each page first.">
          <div className="grid gap-4 xl:grid-cols-3">
            <ScrollPane className="space-y-3 xl:max-h-[24rem]">
              {dashboardPage.mediaQueues.map((queue) => (
                <div key={queue.title} className="rounded-[1.25rem] bg-surface-muted p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-medium text-ink">{queue.title}</h3>
                    <span className="text-sm text-soft">{queue.count}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {queue.items.length > 0 ? (
                      queue.items.map((item, index) => (
                        <li
                          key={`${queue.title}-${index}-${item}`}
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
            </ScrollPane>

            <ScrollPane className="space-y-3 xl:max-h-[24rem]">
              {dashboardPage.transactionFeed.length > 0 ? (
                dashboardPage.transactionFeed.map((transaction, index) => (
                  <div
                    key={`${index}-${transaction.title}-${transaction.amount}`}
                    className="rounded-[1.25rem] bg-surface-muted px-4 py-3"
                  >
                    <p className="truncate font-medium text-ink">{transaction.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="truncate text-sm text-soft">{transaction.category}</p>
                      <p
                        className={`text-sm font-semibold ${
                          transaction.positive ? "text-success" : "text-ink"
                        }`}
                      >
                        {transaction.amount}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.25rem] bg-surface-muted px-4 py-3 text-sm text-muted">
                  No transactions yet.
                </div>
              )}
            </ScrollPane>

            <ScrollPane className="space-y-3 xl:max-h-[24rem]">
              {dashboardPage.healthFeed.length > 0 ? (
                dashboardPage.healthFeed.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.25rem] bg-surface-muted px-4 py-3"
                  >
                    <p className="truncate font-medium text-ink">{item.title}</p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="truncate text-sm text-soft">
                        {item.typeLabel} • {item.dateLabel}
                      </p>
                      <span className="text-sm font-medium text-ink-soft">
                        {item.durationLabel}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.25rem] bg-surface-muted px-4 py-3 text-sm text-muted">
                  No Body sessions yet.
                </div>
              )}
            </ScrollPane>
          </div>
        </Surface>
      </div>
    </AppShell>
  );
}
