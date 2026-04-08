import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ExternalLinkIcon } from "@/components/product-icons";
import { PillRow, SectionHeader, Surface } from "@/components/product-ui";
import {
  evidenceBooks,
  evidencePrinciples,
  evidenceReferences,
} from "@/lib/dayboard-data";

export default function InfoPage() {
  return (
    <AppShell
      title="Why Dayboard is built this way"
      description="Dayboard is designed around behavior change, learning science, self-monitoring, and behavioral economics. The point is not to collect data. The point is to make follow-through easier."
    >
      <section className="space-y-4">
        <SectionHeader
          eyebrow="Evidence"
          title="What changes in the product"
          description="The app should align with research-backed principles, not just feel tidy. That means resurfacing, review, progress monitoring, and small repeatable actions matter more than static storage."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {evidencePrinciples.map((principle) => (
            <Surface key={principle.title} title={principle.title} subtitle={principle.area}>
              <p className="text-sm leading-7 text-slate-600">{principle.summary}</p>
              <div className="mt-4">
                <PillRow items={principle.productChanges} />
              </div>
            </Surface>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="How it maps"
          title="Feature changes tied to the research"
          description="The app should not claim the forgetting curve or behavior change science unless the product actually uses those ideas in the interaction design."
        />
        <Surface>
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Goals</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Specific weekly targets, progress checks, and if-then plans are
                  stronger than vague aspirations.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Lists</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Lists are more useful when entries can be resurfaced, reviewed,
                  and connected to a next action instead of being passive archives.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Mind</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Learning features should emphasize retrieval, spacing, and repeated
                  sessions over one-off consumption.
                </p>
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Body</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Body works best when self-monitoring stays lightweight and repeatable,
                  with clear records of training, weight, food, and recovery.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Finance</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Finance features should bias toward defaults, recurring systems,
                  savings rules, and review loops instead of reactive tracking only.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">Product stance</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Dayboard should feel like a personal operating system, not a
                  pile of forms. Useful resurfacing and compact review are central
                  to that.
                </p>
              </div>
            </div>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="References"
          title="Academic papers"
          description="These papers are the clearest fit for the current product direction."
        />
        <div className="grid gap-4">
          {evidenceReferences.map((reference) => (
            <Surface key={reference.title} title={reference.title} subtitle={reference.authors}>
              <p className="text-sm leading-7 text-slate-600">{reference.whyItMatters}</p>
              <Link
                href={reference.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-amber-700"
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
          eyebrow="Books"
          title="Readable companion books"
          description="These are not substitutes for the research, but they are useful bridges between the literature and everyday product design."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {evidenceBooks.map((book) => (
            <Surface key={book.title} title={book.title} subtitle={book.author}>
              <p className="text-sm leading-7 text-slate-600">{book.note}</p>
              <Link
                href={book.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 transition hover:text-amber-700"
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
