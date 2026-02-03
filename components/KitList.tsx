"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SaveToKitButton from "./SaveToKitButton";
import type { Asset } from "../lib/types";
import { loadKitState } from "../lib/kitStore";

export default function KitList({ assets }: { assets: Asset[] }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(loadKitState());

    const handler = () => setSavedIds(loadKitState());
    window.addEventListener("storage", handler);
    window.addEventListener("uxpv-kit-update", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("uxpv-kit-update", handler);
    };
  }, []);

  const savedAssets = useMemo(
    () => assets.filter((asset) => savedIds.includes(asset.slug)),
    [assets, savedIds]
  );

  if (!savedAssets.length) {
    return (
      <div className="card p-8 text-center">
        <p className="text-sm text-black/70">
          Your kit is empty. Save assets to build your validation toolkit.
        </p>
        <Link
          href="/process"
          className="mt-4 inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-white"
        >
          Browse the Process
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {savedAssets.map((asset) => (
        <div key={asset.slug} className="card p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">{asset.title}</h2>
            <SaveToKitButton assetId={asset.slug} />
          </div>
          <p className="mt-2 text-sm text-black/70">{asset.description}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-black/60">
            <span>Type: {asset.type}</span>
            <span>Format: {asset.format}</span>
            <span>Time: {asset.timeToUseMinutes} min</span>
          </div>
          <Link
            href={`/assets/${asset.slug}`}
            className="mt-4 inline-flex items-center text-sm font-medium text-accent"
          >
            View Asset
          </Link>
        </div>
      ))}
    </div>
  );
}
