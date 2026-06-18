import * as React from "react";

/**
 * The standard surface container — bordered, lightly elevated, rounded.
 * Wraps dashboard panels (tables, client details) and marketing tiles.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hairline border. @default true */
  withBorder?: boolean;
  /** Elevation. @default "sm" */
  shadow?: "none" | "sm" | "md";
  /** Inner padding. @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
  /** Lift + deepen shadow on hover. @default false */
  hoverable?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): React.JSX.Element;
