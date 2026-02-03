"use client";

import { useEffect, useState } from "react";
import { loadKitState, saveKitState } from "../lib/kitStore";

export default function SaveToKitButton({ assetId }: { assetId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ids = loadKitState();
    setSaved(ids.includes(assetId));
  }, [assetId]);

  const toggleSave = () => {
    const ids = loadKitState();
    if (ids.includes(assetId)) {
      const next = ids.filter((id) => id !== assetId);
      saveKitState(next);
      setSaved(false);
    } else {
      const next = [...ids, assetId];
      saveKitState(next);
      setSaved(true);
    }
  };

  if (!saved) {
    return (
      <button
        type="button"
        onClick={toggleSave}
        className="text-xs font-medium text-ink"
      >
        Save to Kit
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="rounded-full bg-ink px-2 py-1 text-white">Saved</span>
      <button
        type="button"
        onClick={toggleSave}
        className="text-black/60 hover:text-black"
      >
        Remove
      </button>
    </div>
  );
}
