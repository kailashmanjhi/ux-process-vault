"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Asset } from "../lib/types";
import { loadKitState, saveKitState } from "../lib/kitStore";

export default function KitSavedGrid({ assets }: { assets: Asset[] }) {
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
          Your kit is empty. Save assets to build your vault.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center rounded-full bg-ink px-5 py-2 text-sm font-medium text-white"
        >
          Browse the Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {savedAssets.map((asset) => (
        <div key={asset.slug} className="card p-6">
          <h3 className="text-lg font-semibold">
            {asset.title}
          </h3>
          <p className="mt-2 text-sm text-black/70">
            {asset.description}
          </p>
          <div className="mt-4 text-xs text-black/60">
            <div>Type: {asset.type}</div>
            <div>Format: {asset.format}</div>
          </div>
          <div className="mt-5 flex items-center justify-between text-sm">
            <Link href={`/assets/${asset.slug}`} className="text-accent">
              Open
            </Link>
            <button
              type="button"
              onClick={() => {
                const next = savedIds.filter((id) => id !== asset.slug);
                saveKitState(next);
              }}
              className="text-black/60 hover:text-black"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
