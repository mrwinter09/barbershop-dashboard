import * as React from "react";

/**
 * ProgressCounter — the "23 / 50 Stories Collected" indicator with a bar.
 * The single most important signal for a funder skimming the site: it shows
 * a living archive with a defined finish line. Drive `count` off however many
 * published story entries exist.
 *
 * @startingPoint section="Story" subtitle="23 / 50 Stories Collected counter + bar" viewport="700x200"
 */
export interface ProgressCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stories collected so far. @default 0 */
  count?: number;
  /** Target total. @default 50 */
  total?: number;
  /** Caption under / beside the count. @default "Stories Collected" */
  label?: string;
  /** Scale. @default "lg" */
  size?: "lg" | "md";
  /** Invert for petrol / photographic panels. @default false */
  onDark?: boolean;
}

export function ProgressCounter(props: ProgressCounterProps): React.JSX.Element;
