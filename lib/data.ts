import { readFileSync } from "fs";
import path from "path";
import type { Asset, AssetFormat, AssetType, Stage, Task } from "./types";
export type { Asset, AssetFormat, AssetType, Stage, Task } from "./types";

function readJson<T>(fileName: string): T {
  const filePath = path.join(process.cwd(), "data", fileName);
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function getStages(): Stage[] {
  return readJson<Stage[]>("stages.json");
}

export function getStageBySlug(slug: Stage["slug"]): Stage | undefined {
  const stages = getStages();
  return stages.find((stage) => stage.slug === slug);
}

function getTasks(): Task[] {
  return readJson<Task[]>("tasks.json");
}

export function getTasksByStage(stageSlug: Stage["slug"]): Task[] {
  const tasks = getTasks();
  return tasks.filter((task) => task.stage === stageSlug);
}

export function getTaskBySlug(
  stageSlug: Stage["slug"],
  taskSlug: string
): Task | undefined {
  const tasks = getTasks();
  return tasks.find(
    (task) => task.stage === stageSlug && task.slug === taskSlug
  );
}

function getAssets(): Asset[] {
  return readJson<Asset[]>("assets.json");
}

export function getAllAssets(): Asset[] {
  return getAssets();
}

export function getAssetBySlug(assetSlug: string): Asset | undefined {
  const assets = getAssets();
  return assets.find((asset) => asset.slug === assetSlug);
}

export function getAssetsByStage(stageSlug: Stage["slug"]): Asset[] {
  const assets = getAssets();
  return assets.filter((asset) => asset.stage === stageSlug);
}

export function getAssetsByTask(
  stageSlug: Stage["slug"],
  taskSlug: string
): Asset[] {
  const assets = getAssets();
  return assets.filter(
    (asset) => asset.stage === stageSlug && asset.taskSlug === taskSlug
  );
}

export function searchAssets(
  query: string,
  filters: string[]
): Asset[] {
  const assets = getAssets();
  const q = query.trim().toLowerCase();
  return assets.filter((asset) => {
    const matchesQuery = !q
      ? true
      : [
          asset.title,
          asset.description,
          asset.type,
          asset.format,
          asset.whenToUse
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q);

    const tags = deriveTags(asset);
    const matchesFilters = filters.length
      ? filters.some((filter) => tags.includes(filter))
      : true;

    return matchesQuery && matchesFilters;
  });
}

export function deriveTags(asset: Asset): string[] {
  const title = asset.title.toLowerCase();
  const tags: string[] = [];

  if (title.includes("interview")) tags.push("Interviews");
  if (title.includes("audit")) tags.push("Audit");
  if (title.includes("synthesis")) tags.push("Synthesis");
  if (title.includes("wireframe")) tags.push("Wireframing");
  if (title.includes("test")) tags.push("Testing");

  if (!tags.length) tags.push("Research");

  return tags;
}

export function typeLabel(type: AssetType): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function formatLabel(format: AssetFormat): string {
  return format.toUpperCase();
}
