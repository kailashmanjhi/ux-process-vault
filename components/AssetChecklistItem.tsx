"use client";

import type { Asset, AssetStatus,Project } from "../lib/types";
import StatusPill from "./StatusPill";
import { getAssetStatus, updateAssetStatus } from "../lib/projectStore";

export default function AssetChecklistItem({
  asset,
  project,
  onStatusChange
}: {
  asset: Asset;
  project: Project;
  onStatusChange: (status: AssetStatus) => void;
}) {
  const status = getAssetStatus(project, asset.slug);

  const setStatus = (next: AssetStatus) => {
    updateAssetStatus(project.id, asset.slug, next);
    onStatusChange(next);
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{asset.title}</p>
          <p className="mt-1 text-xs text-black/60">{asset.format}</p>
        </div>
        <StatusPill status={status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <button
          type="button"
          onClick={() => setStatus("in_progress")}
          className="rounded-full border border-black/20 px-3 py-1"
        >
          Mark Doing
        </button>
        <button
          type="button"
          onClick={() => setStatus("done")}
          className="rounded-full border border-black/20 px-3 py-1"
        >
          Mark Done
        </button>
        <button
          type="button"
          onClick={() => setStatus("todo")}
          className="rounded-full border border-black/20 px-3 py-1 text-black/60"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
