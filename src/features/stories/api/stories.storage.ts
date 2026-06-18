/** @format */

import type { Reflection } from "../types/Story";

const STORIES_KEY = "ct-stories";
const REFLECTIONS_KEY = "ct-reflections";

export function loadStories() {
  const raw = localStorage.getItem(STORIES_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function saveStories(data: unknown) {
  localStorage.setItem(STORIES_KEY, JSON.stringify(data));
}

export function loadReflections(): Record<string, Reflection[]> {
  const raw = localStorage.getItem(REFLECTIONS_KEY);
  if (!raw) return {};
  try { return JSON.parse(raw); } catch { return {}; }
}

export function saveReflections(data: unknown) {
  localStorage.setItem(REFLECTIONS_KEY, JSON.stringify(data));
}
