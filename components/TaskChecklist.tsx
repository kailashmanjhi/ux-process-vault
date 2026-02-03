"use client";

import { useMemo } from "react";
import type { Asset } from "../lib/types";
import { useProgress } from "./ProgressProvider";

export default function TaskChecklist({
  assets,
  taskId
}: {
  assets: Asset[];
  taskId: string;
}) {
  const { completedAssets, toggleAsset, setTaskComplete } = useProgress();

  const completedCount = useMemo(() => {
    return assets.filter((asset) => completedAssets.includes(asset.slug)).length;
  }, [assets, completedAssets]);

  const total = assets.length;

  const handleToggle = (assetId: string) => {
    const isCompleted = completedAssets.includes(assetId);
    const nextCompleted = isCompleted ? completedCount - 1 : completedCount + 1;
    toggleAsset(assetId);
    if (total > 0) {
      setTaskComplete(taskId, nextCompleted === total);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-black/60">
        <span>
          {completedCount} of {total} assets complete
        </span>
      </div>
      <div className="space-y-3">
        {assets.map((asset) => {
          const checked = completedAssets.includes(asset.slug);
          const title = asset.title ?? "Asset";
          return (
            <button
              key={asset.slug}
              type="button"
              onClick={() => handleToggle(asset.slug)}
              className="flex w-full items-center justify-between rounded-xl border border-black/10 px-4 py-3 text-left"
            >
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-1 text-xs text-black/60">
                  {asset.format}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  checked
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-black/10 text-black/60"
                }`}
              >
                {checked ? "Complete" : "Mark complete"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
