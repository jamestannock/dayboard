import { unstable_noStore as noStore } from "next/cache";
import {
  createBudgetAction,
  createAccountAction,
  createRecurringAction,
  createTransactionAction,
  deleteAccountAction,
  deleteBudgetAction,
  deleteRecurringAction,
  deleteTransactionAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { BarListChart, ScrollPane, SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { getFinancePageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  noStore();
  const financePage = await getFinancePageData();

  return (
    <AppShell
      title="Finance"
      description="A practical money page: clear enough to run your month, light enough that you will actually keep it updated."
    >
      <StatGrid items={financePage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Visibility"
          title="Read the month quickly"
          description="See category spend and recent cash flow before you touch the forms."
        />
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Surface
          title="Spending graph"
          subtitle="Where your outflow is actually going based on recent transactions."
        >
          <BarListChart
            items={financePage.spendByCategory}
            emptyMessage="Add a few expenses to see category spend."
          />
        </Surface>

        <Surface
          title="Cash flow graph"
          subtitle="Net movement across your most recent transaction days."
        >
          <BarListChart
            items={financePage.flowByDay}
            emptyMessage="Add transactions to build your cash flow picture."
          />
        </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Log money movement"
          description="Transactions and account balances are the foundation for the rest of the page."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Surface title="Log transaction" subtitle="This is the core action. Everything else becomes clearer once transactions exist.">
          <form action={createTransactionAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="description"
              placeholder="Description"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="-48.00"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="date"
              type="date"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="category"
              placeholder="Category"
              list="finance-categories"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <select
              name="accountId"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              defaultValue=""
            >
              <option value="">No account</option>
              {financePage.accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft md:col-span-2"
            >
              Save transaction
            </button>
            <datalist id="finance-categories">
              {financePage.categories.map((category) => (
                <option key={category.id} value={category.name} />
              ))}
            </datalist>
          </form>
        </Surface>

        <Surface title="Add account" subtitle="Accounts are simple containers. They do not need banking integration to be useful.">
          <form action={createAccountAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              placeholder="Account name"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <input
              name="kind"
              placeholder="Cash, savings, liability"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="balance"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <button
              type="submit"
              className="rounded-full bg-accent-fill px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-accent-fill-soft md:col-span-2"
            >
              Add account
            </button>
          </form>
        </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Operate"
          title="Keep the system current"
          description="Accounts, budgets, recurring charges, and recent transactions all need quick cleanup loops."
        />
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Surface title="Accounts" subtitle="What exists, what it holds, and what needs attention.">
          <ScrollPane className="space-y-3">
            {financePage.accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between rounded-[1.5rem] bg-surface-muted px-4 py-4"
              >
                <div>
                  <p className="font-medium text-ink">{account.name}</p>
                  <p className="mt-1 text-sm text-soft">{account.kind}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-ink">{account.balanceLabel}</p>
                  <form action={deleteAccountAction} className="mt-2">
                    <input type="hidden" name="id" value={account.id} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-danger transition hover:text-danger-strong"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </ScrollPane>
        </Surface>

        <Surface title="Budget health" subtitle="Simple visibility over category targets.">
          <form action={createBudgetAction} className="mb-5 grid gap-4 md:grid-cols-4">
            <input
              name="name"
              placeholder="Budget name"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="450.00"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <button
              type="submit"
              className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
            >
              Add budget
            </button>
          </form>
          <ScrollPane className="space-y-3">
            {financePage.budgets.map((budget) => (
              <div key={budget.id} className="rounded-[1.5rem] bg-surface-muted px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-ink">{budget.category}</p>
                    <p className="mt-2 text-sm text-soft">
                      {budget.spentLabel} of {budget.targetLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-ink-soft">{budget.status}</span>
                    <form action={deleteBudgetAction} className="mt-2">
                      <input type="hidden" name="id" value={budget.id} />
                      <button
                        type="submit"
                        className="text-xs font-semibold text-danger transition hover:text-danger-strong"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </ScrollPane>
        </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Review"
          title="Watch the moving pieces"
          description="Recurring charges and the latest transactions should be the fastest part of the page to review."
        />
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Surface title="Recurring charges" subtitle="Subscriptions and regular payments should be editable, not invisible.">
          <form action={createRecurringAction} className="mb-5 grid gap-4 md:grid-cols-4">
            <input
              name="description"
              placeholder="Name"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
            />
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="19.99"
              required
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="nextRunAt"
              type="date"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
            />
            <input
              name="cadence"
              placeholder="Monthly"
              className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-3"
            />
            <button
              type="submit"
              className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
            >
              Add recurring
            </button>
          </form>
          <ScrollPane className="space-y-3">
            {financePage.recurring.map((item) => (
              <div
                key={item.id}
                className="rounded-[1.5rem] bg-surface-muted px-4 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-ink">{item.description}</p>
                    <p className="mt-1 text-sm text-soft">
                      {item.cadence} • next {item.nextLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-ink">{item.amountLabel}</span>
                    <form action={deleteRecurringAction} className="mt-2">
                      <input type="hidden" name="id" value={item.id} />
                      <button
                        type="submit"
                        className="block text-xs font-semibold text-danger transition hover:text-danger-strong"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </ScrollPane>
        </Surface>

        <Surface title="Recent transactions" subtitle="Freshest movement stays closest to the top.">
          <ScrollPane className="space-y-3">
            {financePage.transactions.map((item) => (
              <div
                key={item.id}
                className="grid gap-2 rounded-[1.5rem] bg-surface-muted px-4 py-4 md:grid-cols-[1.3fr_0.8fr_0.8fr_0.6fr_0.5fr]"
              >
                <span className="font-medium text-ink">{item.description}</span>
                <span className="text-sm text-soft">{item.categoryLabel}</span>
                <span className="font-medium text-ink">{item.amountLabel}</span>
                <span className="text-sm text-soft">{item.dateLabel}</span>
                <form action={deleteTransactionAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="text-left text-xs font-semibold text-danger transition hover:text-danger-strong"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </ScrollPane>
        </Surface>
        </div>
      </section>
    </AppShell>
  );
}
