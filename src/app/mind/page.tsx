import { unstable_noStore as noStore } from "next/cache";
import {
  createLearningResourceAction,
  createLearningTopicAction,
  createStudySessionAction,
  deleteLearningResourceAction,
  deleteLearningTopicAction,
  deleteStudySessionAction,
  updateLearningTopicProgressAction,
} from "@/app/actions";
import { AppShell } from "@/components/app-shell";
import { ScrollPane, SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { getMindPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function MindPage() {
  noStore();
  const mindPage = await getMindPageData();

  return (
    <AppShell
      title="Mind"
      description="A space for learning, skills, study, and ideas so mental growth has a proper home inside the system."
    >
      <StatGrid items={mindPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Add tracks and sessions"
          description="Skills, learning tracks, and focused sessions should be fast to log while the work is still fresh."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Surface title="Add track" subtitle="Start with the skill or topic, not with a vague pile of resources.">
            <form action={createLearningTopicAction} className="grid gap-4 md:grid-cols-2">
              <input
                name="title"
                placeholder="Track title"
                required
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
              />
              <textarea
                name="description"
                placeholder="Why this track matters"
                className="min-h-24 rounded-[1.5rem] border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
              />
              <input
                name="progressPct"
                type="number"
                min="0"
                max="100"
                placeholder="Progress %"
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              />
              <button
                type="submit"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-ink-soft"
              >
                Add track
              </button>
            </form>
          </Surface>

          <Surface title="Log session" subtitle="The session history is what makes Mind measurable instead of aspirational.">
            <form action={createStudySessionAction} className="grid gap-4 md:grid-cols-2">
              <input
                name="title"
                placeholder="Session title"
                required
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
              />
              <select
                name="topicId"
                defaultValue=""
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              >
                <option value="">General</option>
                {mindPage.topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
              <input
                name="durationMin"
                type="number"
                min="5"
                placeholder="Duration in minutes"
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              />
              <input
                name="happenedAt"
                type="date"
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              />
              <textarea
                name="summary"
                placeholder="Key takeaway"
                className="min-h-24 rounded-[1.5rem] border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              />
              <button
                type="submit"
                className="rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink md:col-span-2"
              >
                Save session
              </button>
            </form>
          </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Organize"
          title="Keep active thinking tidy"
          description="Tracks and resources should stay close together so it is obvious what is active versus merely saved."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <Surface title="Active tracks" subtitle="Skills and subjects with editable progress.">
            <ScrollPane className="space-y-3">
              {mindPage.topics.map((topic) => (
                <div key={topic.id} className="rounded-[1.5rem] bg-surface-muted px-4 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-ink">{topic.title}</p>
                    <span className="text-sm font-medium text-ink-soft">
                      {topic.progressPct}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {topic.description ?? "No description yet."}
                  </p>
                  <form action={updateLearningTopicProgressAction} className="mt-4 flex flex-wrap gap-2">
                    <input type="hidden" name="id" value={topic.id} />
                    <input
                      name="progressPct"
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={topic.progressPct}
                      className="w-28 rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none transition focus:border-accent-fill-soft"
                    />
                    <button
                      type="submit"
                      className="rounded-full border border-line-strong px-4 py-2 text-xs font-semibold text-ink-soft transition hover:border-line-focus hover:text-ink"
                    >
                      Update progress
                    </button>
                    <button
                      type="submit"
                      formAction={deleteLearningTopicAction}
                      className="rounded-full border border-danger-line px-4 py-2 text-xs font-semibold text-danger transition hover:border-danger-hover"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              ))}
            </ScrollPane>
          </Surface>

          <Surface title="Add resource" subtitle="Books, docs, videos, and courses can all attach to a track.">
            <form action={createLearningResourceAction} className="grid gap-4 md:grid-cols-2">
              <input
                name="title"
                placeholder="Resource title"
                required
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
              />
              <input
                name="kind"
                placeholder="Book, docs, video"
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              />
              <select
                name="topicId"
                defaultValue=""
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft"
              >
                <option value="">Unsorted</option>
                {mindPage.topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
              <input
                name="url"
                placeholder="Optional URL"
                className="rounded-2xl border border-line px-4 py-3 outline-none transition focus:border-accent-fill-soft md:col-span-2"
              />
              <button
                type="submit"
                className="rounded-full bg-accent-fill px-5 py-3 text-sm font-semibold text-on-dark transition hover:bg-accent-fill-soft md:col-span-2"
              >
                Add resource
              </button>
            </form>
          </Surface>
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Review"
          title="See what was actually used"
          description="Recent resources and study sessions should give you a fast read on current Mind momentum."
        />
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <Surface title="Resources" subtitle="What is being used, not just saved.">
            <ScrollPane className="space-y-3">
              {mindPage.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between rounded-[1.5rem] bg-surface-muted px-4 py-4"
                >
                  <div>
                    <p className="font-medium text-ink">{resource.title}</p>
                    <p className="mt-1 text-sm text-soft">
                      {resource.kind} • {resource.topicLabel}
                    </p>
                  </div>
                  <form action={deleteLearningResourceAction}>
                    <input type="hidden" name="id" value={resource.id} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-danger transition hover:text-danger-strong"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              ))}
            </ScrollPane>
          </Surface>

          <Surface title="Recent sessions" subtitle="Latest learning work stays close to the top.">
            <ScrollPane className="space-y-3">
              {mindPage.sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-[1.5rem] bg-surface-muted px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-ink">{session.title}</p>
                      <p className="mt-1 text-sm text-soft">
                        {session.topicLabel} • {session.dateLabel}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-ink-soft">
                      {session.durationLabel}
                    </span>
                  </div>
                  {session.summary ? (
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {session.summary}
                    </p>
                  ) : null}
                  <form action={deleteStudySessionAction} className="mt-3">
                    <input type="hidden" name="id" value={session.id} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-danger transition hover:text-danger-strong"
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
