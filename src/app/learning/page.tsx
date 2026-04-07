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
import { SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { getLearningPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function LearningPage() {
  noStore();
  const learningPage = await getLearningPageData();

  return (
    <AppShell
      title="Learning"
      description="A learning page that treats study as part of life operations: active tracks, recent sessions, useful resources, and notes worth keeping."
    >
      <StatGrid items={learningPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Add tracks and sessions"
          description="Topics and study sessions should be quick to log while the work is still fresh."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Surface title="Add topic" subtitle="Start with the actual track, not with a vague resource pile.">
          <form action={createLearningTopicAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              placeholder="Track title"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <textarea
              name="description"
              placeholder="Why this track matters"
              className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <input
              name="progressPct"
              type="number"
              min="0"
              max="100"
              placeholder="Progress %"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Add topic
            </button>
          </form>
        </Surface>

        <Surface title="Log study session" subtitle="The session history is what makes learning measurable.">
          <form action={createStudySessionAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              placeholder="Session title"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <select
              name="topicId"
              defaultValue=""
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            >
              <option value="">General</option>
              {learningPage.topics.map((topic) => (
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
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <input
              name="happenedAt"
              type="date"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <textarea
              name="summary"
              placeholder="Outcome"
              className="min-h-24 rounded-[1.5rem] border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <button
              type="submit"
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950 md:col-span-2"
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
          title="Keep active learning tidy"
          description="Topics and resources should stay close together so it is obvious what is active versus merely saved."
        />
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Surface title="Active tracks" subtitle="Topics are real rows now, not hardcoded demo cards.">
          <div className="space-y-3">
            {learningPage.topics.map((topic) => (
              <div key={topic.id} className="rounded-[1.5rem] bg-slate-50 px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-slate-950">{topic.title}</p>
                  <span className="text-sm font-medium text-slate-700">
                    {topic.progressPct}%
                  </span>
                </div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
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
                    className="w-28 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm outline-none transition focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
                  >
                    Update progress
                  </button>
                  <button
                    type="submit"
                    formAction={deleteLearningTopicAction}
                    className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:border-rose-400"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </Surface>

        <Surface title="Add resource" subtitle="Books, docs, links, or courses can all attach to a topic.">
          <form action={createLearningResourceAction} className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              placeholder="Resource title"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <input
              name="kind"
              placeholder="Book, docs, video"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            />
            <select
              name="topicId"
              defaultValue=""
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500"
            >
              <option value="">Unsorted</option>
              {learningPage.topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
            <input
              name="url"
              placeholder="Optional URL"
              className="rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-500 md:col-span-2"
            />
            <button
              type="submit"
              className="rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 md:col-span-2"
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
          description="Recent resources and study sessions should give you a fast read on learning momentum."
        />
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Surface title="Resources" subtitle="What is being used, not just saved.">
          <div className="space-y-3">
            {learningPage.resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between rounded-[1.5rem] bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="font-medium text-slate-950">{resource.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {resource.kind} • {resource.topicLabel}
                  </p>
                </div>
                <form action={deleteLearningResourceAction}>
                  <input type="hidden" name="id" value={resource.id} />
                  <button
                    type="submit"
                    className="text-xs font-semibold text-rose-700 transition hover:text-rose-800"
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        </Surface>

        <Surface title="Recent sessions" subtitle="Latest learning work stays close to the top.">
          <div className="space-y-3">
            {learningPage.sessions.map((session) => (
              <div
                key={session.id}
                className="rounded-[1.5rem] bg-slate-50 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-slate-950">{session.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {session.topicLabel} • {session.dateLabel}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {session.durationLabel}
                  </span>
                </div>
                {session.summary ? (
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {session.summary}
                  </p>
                ) : null}
                <form action={deleteStudySessionAction} className="mt-3">
                  <input type="hidden" name="id" value={session.id} />
                  <button
                    type="submit"
                    className="text-xs font-semibold text-rose-700 transition hover:text-rose-800"
                  >
                    Delete session
                  </button>
                </form>
              </div>
            ))}
          </div>
        </Surface>
        </div>
      </section>
    </AppShell>
  );
}
