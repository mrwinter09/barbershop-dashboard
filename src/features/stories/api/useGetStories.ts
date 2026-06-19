/** @format */

import { useQuery } from "@tanstack/react-query";
import type { Story } from "../types/Story";
import { loadStories, saveStories, loadReflections, saveReflections } from "./stories.storage";
import { SEED_STORIES, SEED_REFLECTIONS } from "./seed";

async function fetchStories(): Promise<Story[]> {
  const stored = loadStories();
  if (stored) {
    // Filter out pipeline-only stages — draft/confirmed are internal
    return (stored as Story[]).filter(
      (s) => !s.stage || s.stage === "shooting" || s.stage === "producing" || s.stage === "published"
    );
  }
  saveStories(SEED_STORIES);
  if (!Object.keys(loadReflections()).length) {
    saveReflections(SEED_REFLECTIONS);
  }
  return SEED_STORIES;
}

export function useGetStories() {
  return useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });
}
