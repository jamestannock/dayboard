import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ExternalLinkIcon } from "@/components/product-icons";
import { PillRow, SectionHeader, Surface } from "@/components/product-ui";
import { evidenceBooks, evidenceReferences } from "@/lib/dayboard-data";

const principles = [
  {
    title: "Follow-through beats intention",
    body: "Dayboard is built around weekly targets, visible progress, and recurring review so important work does not dissolve into general ambition.",
  },
  {
    title: "Useful information should resurface",
    body: "Lists and Mind are meant to hold information you can revisit, rate, and act on later, not just save once and forget.",
  },
  {
    title: "Logging needs to stay lightweight",
    body: "Body and Finance only help if they remain quick enough to update regularly. The system should favor repeatable input over perfect detail.",
  },
  {
    title: "One system should show cross-effects",
    body: "Goals, lists, learning, training, and money compete for the same week. Keeping them together makes tradeoffs easier to see.",
  },
];

const areaRows = [
  {
    title: "Goals",
    note: "Weekly execution, habits, status changes, and review loops.",
  },
  {
    title: "Lists",
    note: "Books, movies, TV shows, ideas, places, or any category you want to track.",
  },
  {
    title: "Mind",
    note: "Skills, learning tracks, resources, and session history.",
  },
  {
    title: "Body",
    note: "Workouts, runs, bodyweight, nutrition notes, and recovery.",
  },
  {
    title: "Finance",
    note: "Accounts, transactions, budgets, recurring charges, and savings visibility.",
  },
];

export default function InfoPage() {
  return (
    <AppShell
      title="Why Dayboard works"
      description="Dayboard is designed as one operating system for the week, not a pile of disconnected trackers."
    >
      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Surface dark title="Built for real weekly use" subtitle="The product is meant to reduce drift, not just store information.">
          <div className="space-y-4 text-sm leading-7 text-on-dark-muted">
            <p>
              Dayboard exists because most people do not need more places to put
              information. They need one place that makes priorities, saved
              items, learning, health, and money easier to review and act on.
            </p>
            <p>
              The product is intentionally built around visible progress,
              revisitable notes, small logging loops, and a shared dashboard so
              the week stays legible.
            </p>
          </div>
          <div className="mt-6">
            <PillRow items={["goals", "lists", "mind", "body", "finance"]} />
          </div>
        </Surface>

        <Surface title="Core design rules" subtitle="These are the principles behind the product direction.">
          <div className="space-y-3">
            {principles.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] bg-surface-muted px-4 py-4">
                <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Coverage"
          title="What Dayboard actually covers"
          description="The app is intentionally broad enough to run the week, but narrow enough to stay coherent."
        />
        <Surface>
          <div className="grid gap-3 xl:grid-cols-5">
            {areaRows.map((row) => (
              <div key={row.title} className="rounded-[1.5rem] bg-surface-muted px-4 py-4">
                <h3 className="text-lg font-semibold text-ink">{row.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{row.note}</p>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Evidence"
          title="Research informing the direction"
          description="The app is aligned with research on goal-setting, progress monitoring, retrieval, self-monitoring, and behavioral defaults."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {evidenceReferences.map((reference) => (
            <Surface key={reference.title} title={reference.title} subtitle={reference.authors}>
              <p className="text-sm leading-7 text-muted">{reference.whyItMatters}</p>
              <Link
                href={reference.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent"
              >
                Open source
                <ExternalLinkIcon />
              </Link>
            </Surface>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Reading"
          title="Readable companion books"
          description="If you want the practical bridge from the research to everyday use, start here."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {evidenceBooks.map((book) => (
            <Surface key={book.title} title={book.title} subtitle={book.author}>
              <p className="text-sm leading-7 text-muted">{book.note}</p>
              <div className="mt-4">
                <PillRow
                  items={[
                    "behavior change",
                    "review systems",
                    "learning science",
                  ]}
                />
              </div>
              <Link
                href={book.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent"
              >
                Open book page
                <ExternalLinkIcon />
              </Link>
            </Surface>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
