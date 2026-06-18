/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Story } from "../types/Story";
import { loadStories, saveStories } from "./stories.storage";

type NewStoryInput = Pick<Story, "name" | "role" | "neighborhood" | "date" | "question" | "answer">;

async function createStory(data: NewStoryInput): Promise<Story> {
  const existing: Story[] = loadStories() ?? [];
  const nextNumber = Math.max(...existing.map((s) => s.number), 0) + 1;
  const story: Story = {
    id: "req-" + crypto.randomUUID(),
    number: nextNumber,
    status: "upcoming",
    ...data,
    question: data.question || "What did this city teach you that nobody sat you down to explain?",
    answer: data.answer || "",
  };
  saveStories([...existing, story]);
  return story;
}

export function useCreateStory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createStory,
    onSuccess: (story) => {
      queryClient.setQueryData<Story[]>(["stories"], (old) =>
        old ? [...old, story] : [story]
      );
    },
  });
}
