import * as React from "react";

/**
 * ReflectionItem — one guestbook-style response left under a story. Quiet and
 * considered (a sentence or two), then who left it and when. No likes, threads
 * or upvotes — this is a barbershop conversation, not a comment section.
 */
export interface ReflectionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The reflection text. */
  text?: string;
  /** Who left it. */
  name?: string;
  /** Optional neighborhood. */
  neighborhood?: string;
  /** Display date string. */
  date?: string;
}

export function ReflectionItem(props: ReflectionItemProps): React.JSX.Element;
