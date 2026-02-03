"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Asset, AssetStatus, Project } from "../lib/types";
import {
  getActiveProject,
  getAssetStatus,
  setProjectContext,
  updateAssetStatus
} from "../lib/projectStore";
import StatusPill from "./StatusPill";
import SaveToKitButton from "./SaveToKitButton";

export default function TaskAssetTracker({
  assets,
  stageSlug,
  taskSlug
}: {
  assets: Asset[];
  stageSlug: string;
  taskSlug: string;
}) {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const active = getActiveProject();
    if (active) {
      setProject(active);
      setProjectContext(active.id, stageSlug, taskSlug);
    }
  }, [stageSlug, taskSlug]);

  const setStatus = (assetId: string, status: AssetStatus) => {
    if (!project) return;
    updateAssetStatus(project.id, assetId, status);
    const refreshed = getActiveProject();
    if (refreshed) setProject(refreshed);
  };

  if (!project) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {assets.map((asset) => {
        const status = getAssetStatus(project, asset.slug);
        return (
          <div key={asset.slug} className="card p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{asset.title}</h2>
              <div className="flex items-center gap-3">
                <StatusPill status={status} />
                <SaveToKitButton assetId={asset.slug} />
              </div>
            </div>
            <p className="mt-2 text-sm text-black/70">{asset.description}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/60">
              <span>Type: {asset.type}</span>
              <span>Format: {asset.format}</span>
              <span>Time: {asset.timeToUseMinutes} min</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => setStatus(asset.slug, "doing")}
                className="rounded-full border border-black/20 px-3 py-1"
              >
                Mark Doing
              </button>
              <button
                type="button"
                onClick={() => setStatus(asset.slug, "done")}
                className="rounded-full border border-black/20 px-3 py-1"
              >
                Mark Done
              </button>
              <button
                type="button"
                onClick={() => setStatus(asset.slug, "todo")}
                className="rounded-full border border-black/20 px-3 py-1 text-black/60"
              >
                Reset
              </button>
            </div>
            <Link
              href={`/assets/${asset.slug}`}
              className="mt-4 inline-flex items-center text-sm font-medium text-accent"
            >
              View Asset
            </Link>
          </div>
        );
      })}
    </div>
  );
}
