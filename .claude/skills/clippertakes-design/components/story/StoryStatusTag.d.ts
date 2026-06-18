import * as React from "react";

export type StoryStatus = "upcoming" | "published" | "withdrawn";

/**
 * StoryStatusTag — where a story sits in its lifecycle. Replaces the old
 * scheduled / completed / cancelled booking vocabulary entirely.
 */
export interface StoryStatusTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lifecycle state. @default "published" */
  status?: StoryStatus;
  /** Override the default label copy. */
  label?: string;
}

export function StoryStatusTag(props: StoryStatusTagProps): React.JSX.Element;
