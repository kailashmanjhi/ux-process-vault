"use client";

import { useEffect, useState } from "react";
import { loadDoneState, saveDoneState } from "../lib/kitStore";

export default function MarkDoneToggle({ assetId }: { assetId: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ids = loadDoneState();
    setDone(ids.includes(assetId));
  }, [assetId]);

  const toggle = () => {
    const ids = loadDoneState();
    if (ids.includes(assetId)) {
      const next = ids.filter((id) => id !== assetId);
      saveDoneState(next);
      setDone(false);
    } else {
      const next = [...ids, assetId];
      saveDoneState(next);
      setDone(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`rounded-full border px-4 py-2 text-xs ${
        done ? "border-emerald-300 bg-emerald-100 text-emerald-900" : "border-black/20"
      }`}
    >
      {done ? "Completed" : "Mark as done"}
    </button>
  );
}
