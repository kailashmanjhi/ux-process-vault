import Link from "next/link";
import type { Metadata } from "next";
import { getStageBySlug, getTasksByStage } from "../../../lib/data";
import { notFound } from "next/navigation";
import StageProgress from "../../../components/StageProgress";

type StageSlug = "discover" | "define" | "design";

const stageMetadata: Record<StageSlug, Metadata> = {
  discover: {
    title: "Discover Phase – UX Research Templates & Audits",
    description:
      "Research-accelerator templates: lean audits, signal maps, competitive snapshots, and assumption canvases to gather evidence and uncover user needs."
  },
  define: {
    title: "Define Phase – Problem Definition & Synthesis Tools",
    description:
      "Turn insights into crisp problem statements. Use synthesis canvases, metric alignment briefs, recruiting screeners, and scope frameworks."
  },
  design: {
    title: "Design Phase – Wireframes, Flows & Usability Testing",
    description:
      "Prototype and validate solutions. Wireframing starters, usability test plans, design critique checklists, and flow templates."
  }
};

export async function generateMetadata({
  params
}: {
  params: { stage: string };
}): Promise<Metadata> {
  const stageSlug = params.stage as StageSlug;
  return stageMetadata[stageSlug] || { title: "UX Process Stage" };
}

export default async function StagePage({
  params
}: {
  params: { stage: string };
}) {
  const stage = getStageBySlug(params.stage as "discover" | "define" | "design");

  if (!stage) {
    notFound();
  }

  const tasks = getTasksByStage(stage.slug);

  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-black/50">
          {stage.slug}
        </p>
        <h1 className="section-title mt-2">{stage.title}</h1>
        <p className="mt-2 text-black/70">{stage.description}</p>
        <StageProgress stageId={stage.slug} tasks={tasks} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tasks.map((task) => (
          <div key={task.slug} className="card p-6">
            <h2 className="text-lg font-semibold">{task.title}</h2>
            <p className="mt-2 text-sm text-black/70">{task.description}</p>
            <Link
              href={`/process/${stage.slug}/${task.slug}`}
              className="mt-4 inline-flex items-center text-sm font-medium text-accent"
            >
              View Task Assets
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
