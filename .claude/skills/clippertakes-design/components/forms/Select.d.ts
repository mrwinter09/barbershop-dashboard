import * as React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Labelled dropdown styled to match the field system — used for service, barber,
 * client, and status pickers. Accepts an array of {value,label} or plain strings.
 */
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Field label. */
  label?: string;
  /** Options. */
  data?: SelectOption[] | string[];
  /** Placeholder shown as a disabled first option. */
  placeholder?: string;
  /** Error message — also turns the control red. */
  error?: string | false | null;
  /** Show a required asterisk. @default false */
  required?: boolean;
  /** Control height. @default "md" */
  size?: "sm" | "md";
}

export function Select(props: SelectProps): React.JSX.Element;
