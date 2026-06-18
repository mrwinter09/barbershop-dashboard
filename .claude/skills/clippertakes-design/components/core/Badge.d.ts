import * as React from "react";

export type BadgeTone = "neutral" | "petrol" | "accent" | "clay" | "moss" | "outline";

/**
 * Compact label / tone pill for short metadata (a date, a role, "New"). For a
 * story's lifecycle state use StoryStatusTag; for a neighborhood use
 * NeighborhoodTag — Badge is the generic neutral label.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "neutral" */
  tone?: BadgeTone;
  /** Show a leading dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): React.JSX.Element;
