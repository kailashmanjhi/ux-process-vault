import Link from "next/link";
import { getAllAssets, getStages, getTasksByStage } from "../../lib/data";
import AssetSearch from "../../components/AssetSearch";
import StageProgress from "../../components/StageProgress";

export default async function ProcessPage() {
  const stages = getStages();
  const assets = getAllAssets();

  return (
    <section className="space-y-10">
      <div>
        <h1 className="section-title">Process Stages</h1>
        <p className="muted mt-2">
          Start with discovery, define your problem, then design validated
          solutions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stages.map((stage) => {
          const tasks = getTasksByStage(stage.slug);
          return (
            <div key={stage.slug} className="card p-6">
              <p className="text-xs uppercase tracking-wide text-black/50">
                {stage.slug}
              </p>
              <h2 className="mt-3 text-xl font-semibold">{stage.title}</h2>
              <p className="mt-2 text-sm text-black/70">{stage.description}</p>
              <StageProgress stageId={stage.slug} tasks={tasks} />
              <Link
                href={`/process/${stage.slug}`}
                className="mt-5 inline-flex items-center text-sm font-medium text-accent"
              >
                View Stage
              </Link>
            </div>
          );
        })}
      </div>

      <AssetSearch assets={assets} />
    </section>
  );
}
