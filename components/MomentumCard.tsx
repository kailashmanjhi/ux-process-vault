"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Asset } from "../lib/types";
import { loadDoneState, loadKitState } from "../lib/kitStore";

export default function MomentumCard({ assets }: { assets: Asset[] }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [doneIds, setDoneIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(loadKitState());
    setDoneIds(loadDoneState());

    const handler = () => {
      setSavedIds(loadKitState());
      setDoneIds(loadDoneState());
    };

    window.addEventListener("storage", handler);
    window.addEventListener("uxpv-kit-update", handler);
    window.addEventListener("uxpv-done-update", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("uxpv-kit-update", handler);
      window.removeEventListener("uxpv-done-update", handler);
    };
  }, []);

  const nextAsset = useMemo(() => {
    return assets.find((asset) => asset.slug === "lean-ux-audit") ?? null;
  }, [assets]);

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Momentum</h2>
          <p className="mt-1 text-sm text-black/60">
            A quick glance at your vault activity.
          </p>
        </div>
      </div>
      <div className="mt-5 space-y-3 text-sm text-black/70">
        <div>Saved to Kit: {savedIds.length}</div>
        <div>Completed assets: {doneIds.length}</div>
        <div>
          Next recommendation:{" "}
          {nextAsset ? (
            <Link href={`/assets/${nextAsset.slug}`} className="text-accent">
              {nextAsset.title}
            </Link>
          ) : (
            "Lean UX Audit"
          )}
        </div>
      </div>
    </div>
  );
}
