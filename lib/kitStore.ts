const KIT_KEY = "uxpv_kit";
const DONE_KEY = "uxpv_done";

function readIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(ids));
}

export function loadKitState(): string[] {
  return readIds(KIT_KEY);
}

export function saveKitState(ids: string[]) {
  writeIds(KIT_KEY, ids);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("uxpv-kit-update"));
  }
}

export function loadDoneState(): string[] {
  return readIds(DONE_KEY);
}

export function saveDoneState(ids: string[]) {
  writeIds(DONE_KEY, ids);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("uxpv-done-update"));
  }
}
