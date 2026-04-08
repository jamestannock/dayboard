import { unstable_noStore as noStore } from "next/cache";
import {
  createAccountAction,
  createBudgetAction,
  createRecurringAction,
  createTransactionAction,
  deleteAccountAction,
  deleteBudgetAction,
  deleteRecurringAction,
  deleteTransactionAction,
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
import { getFinancePageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  noStore();
  const financePage = await getFinancePageData();

  return (
    <AppShell
      title="Finance"
      description="A practical money page: clear enough to run the month, light enough that you will actually keep it updated."
    >
      <StatGrid items={financePage.stats} />

      <Surface title="Month view" subtitle="Spend and cash movement should be visible before you touch the forms.">
        <div className="grid gap-5 xl:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Spending by category
            </p>
            <BarListChart
              items={financePage.spendByCategory}
              emptyMessage="Add a few expenses to see category spend."
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Cash flow
            </p>
            <BarListChart
              items={financePage.flowByDay}
              emptyMessage="Add transactions to build your cash flow picture."
            />
          </div>
        </div>
      </Surface>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Log money movement"
          description="Transactions and account balances are the foundation for the rest of the page."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Surface title="Log transaction" subtitle="The core action. Everything else becomes clearer once transactions exist.">
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

          <Surface title="Add account" subtitle="Accounts are simple containers, not a whole banking product.">
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
          eyebrow="Review"
          title="Keep the month current"
          description="Accounts, budgets, recurring charges, and recent transactions should all stay dense and editable."
        />
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Surface title="Accounts and budgets" subtitle="Visibility without turning the page into accounting software.">
            <div className="space-y-5">
              <form action={createBudgetAction} className="grid gap-4 md:grid-cols-4">
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
                {financePage.accounts.map((account) => (
                  <div
                    key={account.id}
                    className="grid items-center gap-3 rounded-[1.25rem] bg-surface-muted px-4 py-3 md:grid-cols-[1.3fr_auto_auto]"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{account.name}</p>
                      <p className="mt-1 truncate text-sm text-soft">{account.kind}</p>
                    </div>
                    <p className="text-sm font-semibold text-ink">{account.balanceLabel}</p>
                    <form action={deleteAccountAction} className="justify-self-end">
                      <input type="hidden" name="id" value={account.id} />
                      <DeleteButton />
                    </form>
                  </div>
                ))}

                {financePage.budgets.map((budget) => (
                  <div
                    key={budget.id}
                    className="grid items-center gap-3 rounded-[1.25rem] bg-surface-muted px-4 py-3 md:grid-cols-[1.3fr_auto_auto]"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{budget.category}</p>
                      <p className="mt-1 truncate text-sm text-soft">
                        {budget.spentLabel} of {budget.targetLabel}
                      </p>
                    </div>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">
                      {budget.status}
                    </span>
                    <form action={deleteBudgetAction} className="justify-self-end">
                      <input type="hidden" name="id" value={budget.id} />
                      <DeleteButton />
                    </form>
                  </div>
                ))}
              </ScrollPane>
            </div>
          </Surface>

          <Surface title="Recurring and transactions" subtitle="Freshest movement should be the fastest part of the page to review.">
            <div className="space-y-5">
              <form action={createRecurringAction} className="grid gap-4 md:grid-cols-4">
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
                    className="grid items-center gap-3 rounded-[1.25rem] bg-surface-muted px-4 py-3 md:grid-cols-[1.25fr_auto_auto]"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">{item.description}</p>
                      <p className="mt-1 truncate text-sm text-soft">
                        {item.cadence} • next {item.nextLabel}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-ink">{item.amountLabel}</span>
                    <form action={deleteRecurringAction} className="justify-self-end">
                      <input type="hidden" name="id" value={item.id} />
                      <DeleteButton />
                    </form>
                  </div>
                ))}

                {financePage.transactions.map((item) => (
                  <div
                    key={item.id}
                    className="grid items-center gap-3 rounded-[1.25rem] bg-surface-muted px-4 py-3 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.55fr_auto]"
                  >
                    <span className="truncate font-medium text-ink">{item.description}</span>
                    <span className="truncate text-sm text-soft">{item.categoryLabel}</span>
                    <span className="text-sm font-semibold text-ink">{item.amountLabel}</span>
                    <span className="text-sm text-soft">{item.dateLabel}</span>
                    <form action={deleteTransactionAction} className="justify-self-end">
                      <input type="hidden" name="id" value={item.id} />
                      <DeleteButton />
                    </form>
                  </div>
                ))}
              </ScrollPane>
            </div>
          </Surface>
        </div>
      </section>
    </AppShell>
  );
}
