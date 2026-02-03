"use client";

import { useState } from "react";
import type { Project } from "../lib/types";

export default function ProjectSelector({
  projects,
  activeId,
  onChange,
  onCreate
}: {
  projects: Project[];
  activeId: string | null;
  onChange: (projectId: string) => void;
  onCreate: (name: string) => void;
}) {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <label className="text-xs uppercase tracking-wide text-black/50">
          Active Project
        </label>
        <select
          value={activeId ?? ""}
          onChange={(event) => onChange(event.target.value)}
          className="rounded-full border border-black/20 bg-white px-3 py-2 text-sm"
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full gap-2 md:w-auto">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="New project name"
          className="w-full rounded-full border border-black/20 bg-white px-3 py-2 text-sm md:w-64"
        />
        <button
          type="button"
          onClick={() => {
            if (!name.trim()) return;
            onCreate(name.trim());
            setName("");
          }}
          className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-white"
        >
          Add
        </button>
      </div>
    </div>
  );
}
