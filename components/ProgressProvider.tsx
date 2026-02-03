"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ProgressState = {
  completedStages: string[];
  completedTasks: string[];
  completedAssets: string[];
};

type ProgressContextValue = ProgressState & {
  toggleAsset: (assetId: string) => void;
  setTaskComplete: (taskId: string, complete: boolean) => void;
  setStageComplete: (stageId: string, complete: boolean) => void;
};

const STORAGE_KEY = "uxpv_progress_v1";

const defaultState: ProgressState = {
  completedStages: [],
  completedTasks: [],
  completedAssets: []
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readState(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultState;
  try {
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      completedStages: Array.isArray(parsed.completedStages)
        ? parsed.completedStages
        : [],
      completedTasks: Array.isArray(parsed.completedTasks)
        ? parsed.completedTasks
        : [],
      completedAssets: Array.isArray(parsed.completedAssets)
        ? parsed.completedAssets
        : []
    };
  } catch {
    return defaultState;
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(defaultState);

  useEffect(() => {
    setState(readState());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<ProgressContextValue>(() => {
    const toggleAsset = (assetId: string) => {
      setState((prev) => {
        const exists = prev.completedAssets.includes(assetId);
        return {
          ...prev,
          completedAssets: exists
            ? prev.completedAssets.filter((id) => id !== assetId)
            : [...prev.completedAssets, assetId]
        };
      });
    };

    const setTaskComplete = (taskId: string, complete: boolean) => {
      setState((prev) => {
        const exists = prev.completedTasks.includes(taskId);
        if (complete && !exists) {
          return {
            ...prev,
            completedTasks: [...prev.completedTasks, taskId]
          };
        }
        if (!complete && exists) {
          return {
            ...prev,
            completedTasks: prev.completedTasks.filter((id) => id !== taskId)
          };
        }
        return prev;
      });
    };

    const setStageComplete = (stageId: string, complete: boolean) => {
      setState((prev) => {
        const exists = prev.completedStages.includes(stageId);
        if (complete && !exists) {
          return {
            ...prev,
            completedStages: [...prev.completedStages, stageId]
          };
        }
        if (!complete && exists) {
          return {
            ...prev,
            completedStages: prev.completedStages.filter((id) => id !== stageId)
          };
        }
        return prev;
      });
    };

    return {
      ...state,
      toggleAsset,
      setTaskComplete,
      setStageComplete
    };
  }, [state]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return ctx;
}
