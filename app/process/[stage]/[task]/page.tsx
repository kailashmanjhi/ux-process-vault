import { getAssetsByTask, getTaskBySlug } from "../../../../lib/data";
import { notFound } from "next/navigation";
import TaskChecklist from "../../../../components/TaskChecklist";

export default async function TaskPage({
  params
}: {
  params: { stage: string; task: string };
}) {
  const task = getTaskBySlug(
    params.stage as "discover" | "define" | "design",
    params.task
  );

  if (!task) {
    notFound();
  }

  const assets = getAssetsByTask(
    params.stage as "discover" | "define" | "design",
    params.task
  );

  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-black/50">
          {task.stage} / {task.title}
        </p>
        <h1 className="section-title mt-2">Assets</h1>
        <p className="mt-2 text-black/70">{task.description}</p>
      </div>

      <TaskChecklist assets={assets} taskId={params.task} />
    </section>
  );
}
