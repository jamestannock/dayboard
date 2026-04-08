import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ExternalLinkIcon } from "@/components/product-icons";
import { PillRow, SectionHeader, Surface } from "@/components/product-ui";
import {
  evidenceBooks,
  evidenceReferences,
} from "@/lib/dayboard-data";

const pillars = [
  {
    title: "Goals",
    body: "Dayboard helps turn intentions into weekly targets, visible progress, and regular review so priorities do not dissolve into vague ambition.",
  },
  {
    title: "Lists",
    body: "Lists are for more than storage. Books, movies, TV shows, and other saved items stay useful when they can be revisited, rated, and connected to a next action or note.",
  },
  {
    title: "Mind",
    body: "Learning works better when sessions are repeated, recalled, and reviewed. Mind is built to support skill development instead of one-off consumption.",
  },
  {
    title: "Body",
    body: "Body keeps exercise, weight, food notes, and recovery lightweight enough to log consistently. The value comes from repeatable tracking, not perfect data entry.",
  },
  {
    title: "Finance",
    body: "Finance is meant to support awareness, planning, and saving systems. The goal is clearer money decisions and fewer reactive surprises.",
  },
];

export default function InfoPage() {
  return (
    <AppShell
      title="Why Dayboard exists"
      description="Dayboard is a personal operating system for goals, lists, mind, body, and finance. It is designed to help people follow through, review what matters, and keep useful information visible instead of buried."
    >
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Surface title="What this app is">
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>
              Dayboard is not meant to be a pile of trackers. It is meant to be
              one place to run the parts of life that people regularly try to
              keep straight: priorities, saved lists, learning, health, and
              money.
            </p>
            <p>
              The main idea is simple: useful systems do more than store
              information. They make it easier to review, remember, notice
              patterns, and act again later.
            </p>
            <p>
              That is why Dayboard leans on weekly review, visible progress,
              lightweight logging, and revisitable notes instead of treating
              everything like a static archive.
            </p>
          </div>
        </Surface>

        <Surface title="Why it helps">
          <div className="space-y-3 text-sm leading-7 text-muted">
            <p>Research across psychology and behavior change consistently supports a few useful ideas:</p>
            <ul className="space-y-2">
              <li>Specific goals beat vague intentions.</li>
              <li>Progress monitoring improves follow-through.</li>
              <li>Review and retrieval improve retention more than passive storage.</li>
              <li>Self-monitoring is useful when logging stays lightweight.</li>
              <li>Defaults and recurring systems reduce reliance on willpower.</li>
            </ul>
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Areas"
          title="What Dayboard covers"
          description="The app is organized around the parts of life that people repeatedly want to review and manage in one place."
        />
        <div className="grid gap-4 xl:grid-cols-5">
          {pillars.map((pillar) => (
            <Surface key={pillar.title} title={pillar.title}>
              <p className="text-sm leading-7 text-muted">{pillar.body}</p>
            </Surface>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Research"
          title="Academic references behind the direction"
          description="These are the main papers informing the way Dayboard is structured."
        />
        <Surface>
          <div className="grid gap-4 xl:grid-cols-2">
            {evidenceReferences.map((reference) => (
              <div key={reference.title} className="rounded-[1.5rem] bg-surface-muted px-4 py-4">
                <h3 className="text-base font-semibold text-ink">{reference.title}</h3>
                <p className="mt-1 text-sm text-soft">{reference.authors}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{reference.whyItMatters}</p>
                <Link
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent"
                >
                  Open source
                  <ExternalLinkIcon />
                </Link>
              </div>
            ))}
          </div>
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Books"
          title="Good companion reading"
          description="Readable books that help bridge the gap between the research and everyday practice."
        />
        <div className="grid gap-4 xl:grid-cols-2">
          {evidenceBooks.map((book) => (
            <Surface key={book.title} title={book.title} subtitle={book.author}>
              <p className="text-sm leading-7 text-muted">{book.note}</p>
              <div className="mt-4">
                <PillRow items={["behavior change", "learning science", "practical systems"]} />
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
