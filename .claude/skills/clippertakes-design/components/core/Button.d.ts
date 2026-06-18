import * as React from "react";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "on-dark";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * The primary action control across the platform. Use `primary` (deep petrol)
 * for the main cultural CTA, `accent` (Rotterdam yellow) for loud invitations
 * ("Tell your story"), `outline`/`ghost` for secondary actions, and `on-dark`
 * over petrol or photographic panels.
 *
 * @startingPoint section="Core" subtitle="Buttons — primary, accent, outline, ghost, on-dark" viewport="700x190"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default "primary" */
  variant?: ButtonVariant;
  /** Control height. @default "md" */
  size?: ButtonSize;
  /** Stretch to fill the container width. @default false */
  fullWidth?: boolean;
  /** Icon node rendered before the label. */
  leftIcon?: React.ReactNode;
  /** Icon node rendered after the label. */
  rightIcon?: React.ReactNode;
  /** Render as a different element (e.g. "a" for links). @default "button" */
  as?: "button" | "a";
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): React.JSX.Element;
