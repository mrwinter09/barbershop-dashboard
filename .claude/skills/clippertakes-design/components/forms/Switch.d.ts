import * as React from "react";

/**
 * Boolean toggle with an inline label (e.g. "Existing client from the list?").
 * Controlled — pass `checked` and `onChange`.
 */
export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Inline label text. */
  label?: string;
  /** Checked state. */
  checked?: boolean;
  /** Change handler. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Disable interaction. @default false */
  disabled?: boolean;
}

export function Switch(props: SwitchProps): React.JSX.Element;
