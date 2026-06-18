import * as React from "react";

/**
 * ReflectionForm — the minimal "leave a reflection" composer on a story page.
 * Built from TextInput + Button: a name, one short text, a submit. Wire
 * onSubmit({ name, text }) into the host's local storage.
 */
export interface ReflectionFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /** Heading. @default "Leave a reflection" */
  title?: string;
  /** Supporting hint under the heading. */
  hint?: string;
  /** Called with { name, text } on submit; the form clears afterwards. */
  onSubmit?: (value: { name: string; text: string }) => void;
}

export function ReflectionForm(props: ReflectionFormProps): React.JSX.Element;
