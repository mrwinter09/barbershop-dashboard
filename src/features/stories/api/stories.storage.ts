/** @format */

import type { Reflection, Recommendation } from "../types/Story";

const STORIES_KEY = "ct-stories";
const REFLECTIONS_KEY = "ct-reflections";
const RECOMMENDATIONS_KEY = "ct-recommendations";

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

export function loadRecommendations(): Recommendation[] {
  const raw = localStorage.getItem(RECOMMENDATIONS_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function saveRecommendations(data: unknown) {
  localStorage.setItem(RECOMMENDATIONS_KEY, JSON.stringify(data));
}
