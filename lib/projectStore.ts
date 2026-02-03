import type { AssetStatus, Project } from "./types";

const PROJECTS_KEY = "uxpv_projects_v1";
const ACTIVE_KEY = "uxpv_active_project_id_v1";

const DEFAULT_PROJECT_NAME = "My First Project";

function isBrowser() {
  return typeof window !== "undefined";
}

function readProjects(): Project[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(PROJECTS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProjects(projects: Project[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event("uxpv-projects-update"));
}

function writeActiveId(projectId: string) {
  if (!isBrowser()) return;
  window.localStorage.setItem(ACTIVE_KEY, projectId);
}

function ensureDefaultProject(): Project {
  const project: Project = {
    id: `project_${Date.now()}`,
    name: DEFAULT_PROJECT_NAME,
    createdAt: new Date().toISOString(),
    assetProgress: []
  };
  writeProjects([project]);
  writeActiveId(project.id);
  return project;
}

export function loadProjects(): Project[] {
  return readProjects();
}

export function saveProjects(projects: Project[]) {
  writeProjects(projects);
}

export function getActiveProject(): Project | null {
  if (!isBrowser()) return null;
  const projects = readProjects();
  if (!projects.length) {
    return ensureDefaultProject();
  }

  const activeId = window.localStorage.getItem(ACTIVE_KEY);
  const active = projects.find((project) => project.id === activeId);
  if (active) return active;

  writeActiveId(projects[0].id);
  return projects[0];
}

export function setActiveProject(projectId: string) {
  writeActiveId(projectId);
}

export function createProject(name: string): Project {
  const projects = readProjects();
  const project: Project = {
    id: `project_${Date.now()}`,
    name,
    createdAt: new Date().toISOString(),
    assetProgress: []
  };
  const next = [...projects, project];
  writeProjects(next);
  writeActiveId(project.id);
  return project;
}

export function updateAssetStatus(
  projectId: string,
  assetId: string,
  status: AssetStatus
) {
  const projects = readProjects();
  const projectIndex = projects.findIndex((project) => project.id === projectId);
  if (projectIndex === -1) {
    const defaultProject = ensureDefaultProject();
    updateAssetStatus(defaultProject.id, assetId, status);
    return;
  }

  const project = projects[projectIndex];
  const existing = project.assetProgress.find(
    (entry) => entry.assetId === assetId
  );

  if (status === "todo") {
    project.assetProgress = project.assetProgress.filter(
      (entry) => entry.assetId !== assetId
    );
  } else if (existing) {
    existing.status = status;
  } else {
    project.assetProgress.push({ assetId, status });
  }

  projects[projectIndex] = { ...project };
  writeProjects(projects);
}

export function getAssetStatus(
  project: Project,
  assetId: string
): AssetStatus {
  const entry = project.assetProgress.find((item) => item.assetId === assetId);
  return entry?.status ?? "todo";
}

export function setProjectContext(
  projectId: string,
  stageSlug: string,
  taskSlug: string
) {
  const projects = readProjects();
  const projectIndex = projects.findIndex((project) => project.id === projectId);
  if (projectIndex === -1) {
    const defaultProject = ensureDefaultProject();
    setProjectContext(defaultProject.id, stageSlug, taskSlug);
    return;
  }

  const project = projects[projectIndex];
  projects[projectIndex] = {
    ...project,
    activeStage: stageSlug,
    activeTask: taskSlug
  };
  writeProjects(projects);
}
