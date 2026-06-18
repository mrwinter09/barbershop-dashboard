import * as React from "react";

/**
 * Identity chip for a participant. Renders the portrait when `src` is given,
 * otherwise the initials derived from `name`.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Portrait image URL. */
  src?: string;
  /** Full name — used for initials and the title tooltip. */
  name?: string;
  /** Size. @default "md" */
  size?: "xs" | "sm" | "md" | "lg";
  /** Fallback color tone. @default "neutral" */
  tone?: "neutral" | "petrol" | "clay" | "moss";
}

export function Avatar(props: AvatarProps): React.JSX.Element;
