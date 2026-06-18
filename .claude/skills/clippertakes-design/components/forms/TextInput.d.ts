import * as React from "react";

/**
 * Labelled text field with optional error and hint. Pairs with Formik/Yup in the
 * product; pass `error` as the validation message string. `multiline` renders a textarea.
 */
export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
  /** Field label. */
  label?: string;
  /** Error message — also turns the control red. */
  error?: string | false | null;
  /** Helper text shown when there is no error. */
  hint?: string;
  /** Show a required asterisk. @default false */
  required?: boolean;
  /** Render a textarea. @default false */
  multiline?: boolean;
  /** Textarea rows when multiline. @default 3 */
  rows?: number;
}

export function TextInput(props: TextInputProps): React.JSX.Element;
