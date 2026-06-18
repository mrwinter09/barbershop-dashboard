import * as React from "react";

export type StoryStatus = "upcoming" | "published" | "withdrawn";

/**
 * StoryCard — the centerpiece unit of the Stories Board. A portrait with a
 * mono "STORY 07 / 50" stamp, the person's name, their role · neighborhood,
 * and an optional italic answer teaser. `status="upcoming"` desaturates the
 * portrait so a not-yet-recorded session reads as pending.
 *
 * @startingPoint section="Story" subtitle="Portrait story card with 07 / 50 numbering" viewport="360x520"
 */
export interface StoryCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Story number (1-based). Rendered zero-padded: "Story 07 / 50". */
  number?: number;
  /** Total target for the archive. @default 50 */
  total?: number;
  /** Participant's name. */
  name?: string;
  /** Their role — resident, entrepreneur, volunteer, organizer… */
  role?: string;
  /** Rotterdam neighborhood. */
  neighborhood?: string;
  /** Portrait / thumbnail image URL. */
  image?: string;
  /** Short italic answer teaser. */
  teaser?: string;
  /** Lifecycle state — affects portrait treatment. @default "published" */
  status?: StoryStatus;
  /** Optional <StoryStatusTag> rendered over the portrait. */
  statusTag?: React.ReactNode;
  /** Element to render as. @default "a" */
  as?: "a" | "button" | "div";
  children?: React.ReactNode;
}

export function StoryCard(props: StoryCardProps): React.JSX.Element;
