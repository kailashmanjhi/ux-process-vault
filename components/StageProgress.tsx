"use client";

import { useEffect, useMemo } from "react";
import type { Task } from "../lib/types";
import { useProgress } from "./ProgressProvider";

export default function StageProgress({
  stageId,
  tasks
}: {
  stageId: string;
  tasks: Task[];
}) {
  const { completedTasks, setStageComplete } = useProgress();

  const total = tasks.length;
  const completed = useMemo(
    () => tasks.filter((task) => completedTasks.includes(task.slug)).length,
    [tasks, completedTasks]
  );

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  useEffect(() => {
    if (total === 0) return;
    setStageComplete(stageId, completed === total);
  }, [completed, stageId, setStageComplete, total]);

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between text-xs text-black/60">
        <span>
          {completed} / {total} tasks complete
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-black/10">
        <div className="h-2 rounded-full bg-ink" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
