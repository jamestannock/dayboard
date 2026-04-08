import { unstable_noStore as noStore } from "next/cache";
import { AppShell } from "@/components/app-shell";
import { ScrollPane, SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { getDashboardPageData } from "@/lib/dayboard-store";
import { moduleSummaries } from "@/lib/dayboard-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  noStore();
  const dashboardPage = await getDashboardPageData();

  return (
    <AppShell
      title="Dashboard"
      description="A real operating view of your week across goals, lists, mind, body, and finance."
    >
      <StatGrid items={dashboardPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Focus"
          title="Run the current week"
          description="The dashboard should read like an operating board instead of a loose pile of cards."
        />
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Surface
          title="Priority stack"
          subtitle="Pulled from your actual weekly goals."
          aside={
            <span className="rounded-full bg-accent-faint px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Live data
            </span>
          }
        >
          <ScrollPane className="space-y-3">
            {dashboardPage.focus.length > 0 ? (
              dashboardPage.focus.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[1.5rem] bg-surface-muted px-4 py-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-on-dark">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-7 text-ink-soft">{item}</p>
                </div>
              ))
            ) : (
                <div className="rounded-[1.5rem] bg-surface-muted px-4 py-4 text-sm text-muted">
                  No weekly goals yet. Add some from the Goals page and they will appear here.
                </div>
              )}
          </ScrollPane>
        </Surface>

        <Surface
          title="Mind momentum"
          subtitle="Top tracks ranked by current progress."
          dark
        >
          <ScrollPane className="space-y-4">
            {dashboardPage.learningMomentum.length > 0 ? (
              dashboardPage.learningMomentum.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-surface-line bg-surface-faint p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-medium text-on-dark">{item.title}</h3>
                    <span className="text-sm text-on-dark-muted">{item.progress}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-on-dark-muted">
                    {item.description}
                  </p>
                </div>
              ))
            ) : (
                <div className="rounded-[1.5rem] border border-surface-line bg-surface-faint p-4 text-sm text-on-dark-muted">
                  No Mind tracks yet. Add your first one from the Mind page.
                </div>
              )}
          </ScrollPane>
        </Surface>
      </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Signals"
          title="See what needs attention"
          description="Media and money should surface their current state without forcing you into each module first."
        />
      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Surface
          title="Lists snapshot"
          subtitle="Current and queued items pulled from your actual lists data."
        >
          <ScrollPane className="space-y-4">
            {dashboardPage.mediaQueues.map((queue) => (
              <div key={queue.title} className="rounded-[1.5rem] bg-surface-muted p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-ink">{queue.title}</h3>
                  <span className="text-sm text-soft">{queue.count}</span>
                </div>
                <ul className="mt-3 space-y-2">
                  {queue.items.length > 0 ? (
                    queue.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-xl bg-surface px-3 py-2 text-sm text-ink-soft"
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
        </Surface>

        <Surface title="Recent money flow" subtitle="Latest transactions from your finance layer.">
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
        </Surface>
      </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Flow"
          title="Track the week map"
          description="Upcoming goals and recent Body sessions should sit side by side because they both shape the week."
        />
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Surface title="Week map" subtitle="Upcoming due items surfaced from live goal data.">
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

        <Surface title="Body snapshot" subtitle="Recent training sessions pulled from the Body log.">
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
      </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Areas"
          title="Move through the system"
          description="Each area should feel distinct, but still belong to the same product."
        />
      <Surface title="Core areas" subtitle="Static structure, but now backed by functional pages.">
        <ScrollPane className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {moduleSummaries.map((module) => (
            <div key={module.slug} className="rounded-[1.5rem] bg-surface-muted p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {module.kicker}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {module.description}
              </p>
            </div>
          ))}
        </ScrollPane>
      </Surface>
      </section>
    </AppShell>
  );
}
