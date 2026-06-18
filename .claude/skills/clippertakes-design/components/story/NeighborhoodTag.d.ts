import * as React from "react";

/**
 * NeighborhoodTag — a Rotterdam neighborhood chip used to group / filter the
 * Stories Board (Blijdorp, Delfshaven, Afrikaanderwijk, Noord, Nieuwe
 * Binnenweg…). Set `active` for the selected filter.
 */
export interface NeighborhoodTagProps extends React.HTMLAttributes<HTMLElement> {
  /** Neighborhood name. */
  name?: string;
  /** Number of stories from this neighborhood. */
  count?: number;
  /** Selected filter state. @default false */
  active?: boolean;
  /** Element to render as. @default "button" */
  as?: "button" | "a" | "span";
}

export function NeighborhoodTag(props: NeighborhoodTagProps): React.JSX.Element;
