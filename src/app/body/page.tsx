import { unstable_noStore as noStore } from "next/cache";
import { AppShell } from "@/components/app-shell";
import { BodyActivityRow } from "@/components/body-activity-row";
import { BodySessionForm } from "@/components/body-session-form";
import { SectionHeader, StatGrid, Surface } from "@/components/product-ui";
import { getBodyPageData } from "@/lib/dayboard-store";

export const dynamic = "force-dynamic";

export default async function BodyPage() {
  noStore();
  const bodyPage = await getBodyPageData();

  return (
    <AppShell
      title="Body"
      description="Track training, bodyweight, eating notes, and physical sessions in one place instead of splitting them across separate apps."
    >
      <StatGrid items={bodyPage.stats} />

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Capture"
          title="Log a session cleanly"
          description="Body should handle workouts, runs, bodyweight, and quick eating or recovery notes without turning the form into a mess."
        />
        <Surface
          title="Body session"
          subtitle="Log the essentials first. Add exercise detail when it matters."
        >
          <BodySessionForm />
        </Surface>
      </section>

      <section className="space-y-4">
        <SectionHeader
          eyebrow="Review"
          title="Look back at recent sessions"
          description="Recent Body entries should show the basics clearly first, then the extra detail only when it exists."
        />
        <Surface title="Recent activity" subtitle="Latest sessions stay visible for quick review.">
          <div className="space-y-3">
            {bodyPage.activities.length > 0 ? (
              bodyPage.activities.map((activity) => (
                <BodyActivityRow key={activity.id} activity={activity} />
              ))
            ) : (
              <div className="rounded-[1.5rem] bg-slate-50 px-4 py-4 text-sm text-slate-600">
                No body entries yet.
              </div>
            )}
          </div>
        </Surface>
      </section>
    </AppShell>
  );
}
