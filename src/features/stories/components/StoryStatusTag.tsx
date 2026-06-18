/** @format */

import { Badge } from "@mantine/core";
import type { StoryStatus } from "../types/Story";

const cfg: Record<StoryStatus, { color: string; label: string }> = {
  published: { color: "moss", label: "Published" },
  upcoming:  { color: "clay", label: "Upcoming" },
  withdrawn: { color: "paper", label: "Withdrawn" },
};

export default function StoryStatusTag({ status }: { status: StoryStatus }) {
  const { color, label } = cfg[status] ?? cfg.upcoming;
  return (
    <Badge color={color} variant="light" size="sm">
      {label}
    </Badge>
  );
}
