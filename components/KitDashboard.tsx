"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Asset, Project, Stage, Task } from "../lib/types";
import {
  createProject,
  getActiveProject,
  getAssetStatus,
  loadProjects,
  setActiveProject
} from "../lib/projectStore";
import ProgressBar from "./ProgressBar";
import ProjectSelector from "./ProjectSelector";
import AssetChecklistItem from "./AssetChecklistItem";

function countTaskProgress(project: Project, taskAssets: Asset[]) {
  const total = taskAssets.length;
  const done = taskAssets.filter(
    (asset) => getAssetStatus(project, asset.slug) === "done"
  ).length;
  return { total, done };
}

export default function KitDashboard({
  stages,
  tasks,
  assets
}: {
  stages: Stage[];
  tasks: Task[];
  assets: Asset[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [activeTaskKey, setActiveTaskKey] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadProjects();
    if (!loaded.length) {
      const defaultProject = getActiveProject();
      if (defaultProject) {
        setProjects([defaultProject]);
        setActiveId(defaultProject.id);
        return;
      }
    }

    const active = getActiveProject();
    setProjects(loaded);
    setActiveId(active?.id ?? (loaded[0]?.id ?? null));

    const handler = () => {
      const updated = loadProjects();
      setProjects(updated);
      const updatedActive = getActiveProject();
      setActiveId(updatedActive?.id ?? null);
    };

    window.addEventListener("uxpv-projects-update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("uxpv-projects-update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) ?? null,
    [projects, activeId]
  );

  const taskAssetsMap = useMemo(() => {
    const map = new Map<string, Asset[]>();
    assets.forEach((asset) => {
      const key = `${asset.stage}:${asset.taskSlug}`;
      const list = map.get(key) ?? [];
      list.push(asset);
      map.set(key, list);
    });
    return map;
  }, [assets]);

  const stageTotals = useMemo(() => {
    if (!activeProject) return { total: 0, done: 0 };
    let total = 0;
    let done = 0;
    tasks.forEach((task) => {
      const taskAssets = taskAssetsMap.get(`${task.stage}:${task.slug}`) ?? [];
      if (!taskAssets.length) return;
      const progress = countTaskProgress(activeProject, taskAssets);
      total += progress.total;
      done += progress.done;
    });
    return { total, done };
  }, [activeProject, taskAssetsMap, tasks]);

  if (!activeProject) {
    return null;
  }

  const handleProjectChange = (projectId: string) => {
    setActiveProject(projectId);
    setActiveId(projectId);
  };

  const handleCreate = (name: string) => {
    const project = createProject(name);
    const updated = loadProjects();
    setProjects(updated);
    setActiveId(project.id);
  };

  const handleStatusChange = () => {
    const updated = loadProjects();
    setProjects(updated);
  };

  const continuePath =
    activeProject.activeStage && activeProject.activeTask
      ? `/process/${activeProject.activeStage}/${activeProject.activeTask}`
      : null;

  return (
    <div className="space-y-8">
      <ProjectSelector
        projects={projects}
        activeId={activeId}
        onChange={handleProjectChange}
        onCreate={handleCreate}
      />

      <div className="card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <p className="mt-1 text-sm text-black/60">
              {stageTotals.done} of {stageTotals.total} assets completed
            </p>
          </div>
          <button
            type="button"
            onClick={() => continuePath && router.push(continuePath)}
            disabled={!continuePath}
            className={`rounded-full px-5 py-2 text-sm font-medium ${
              continuePath
                ? "bg-ink text-white"
                : "cursor-not-allowed bg-black/20 text-black/50"
            }`}
          >
            Continue where I left off
          </button>
        </div>
        <div className="mt-6">
          <ProgressBar value={stageTotals.done} total={stageTotals.total} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {stages.map((stage) => {
          const stageTasks = tasks.filter((task) => task.stage === stage.slug);
          let stageTotal = 0;
          let stageDone = 0;

          stageTasks.forEach((task) => {
            const taskAssets = taskAssetsMap.get(`${task.stage}:${task.slug}`) ?? [];
            if (!taskAssets.length) return;
            const progress = countTaskProgress(activeProject, taskAssets);
            stageTotal += progress.total;
            stageDone += progress.done;
          });

          return (
            <div key={stage.slug} className="card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-black/50">
                    {stage.slug}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{stage.title}</h3>
                  <p className="mt-2 text-sm text-black/70">
                    {stage.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedStage((prev) => {
                      const next = prev === stage.slug ? null : stage.slug;
                      if (next !== prev) {
                        setActiveTaskKey(null);
                      }
                      return next;
                    })
                  }
                  className="text-xs text-black/60 hover:text-black"
                >
                  {expandedStage === stage.slug ? "Hide" : "View"}
                </button>
              </div>
              <div className="mt-4">
                <ProgressBar value={stageDone} total={stageTotal} />
              </div>

              {expandedStage === stage.slug ? (
                <div className="mt-6 space-y-4">
                  {stageTasks.map((task) => {
                    const taskAssets =
                      taskAssetsMap.get(`${task.stage}:${task.slug}`) ?? [];
                    if (!taskAssets.length) return null;
                    const progress = countTaskProgress(activeProject, taskAssets);
                    const taskKey = `${task.stage}:${task.slug}`;
                    return (
                      <button
                        key={taskKey}
                        type="button"
                        onClick={() =>
                          setActiveTaskKey((prev) =>
                            prev === taskKey ? null : taskKey
                          )
                        }
                        className="flex w-full items-center justify-between rounded-xl border border-black/10 px-4 py-3 text-left"
                      >
                        <div>
                          <p className="text-sm font-medium">{task.title}</p>
                          <p className="mt-1 text-xs text-black/60">
                            {progress.done} of {progress.total} done
                          </p>
                        </div>
                        <span className="text-xs text-black/50">
                          {activeTaskKey === taskKey ? "Close" : "Open"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              {expandedStage === stage.slug && activeTaskKey ? (
                <div className="mt-6 space-y-4">
                  {(taskAssetsMap.get(activeTaskKey) ?? []).map((asset) => (
                    <AssetChecklistItem
                      key={asset.slug}
                      asset={asset}
                      project={activeProject}
                      onStatusChange={handleStatusChange}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
