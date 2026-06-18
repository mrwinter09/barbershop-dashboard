import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-field-styles")) {
  const el = document.createElement("style");
  el.id = "ct-field-styles";
  el.textContent = `
  .ct-field { display: flex; flex-direction: column; gap: 7px; font-family: var(--font-sans); }
  .ct-field__label { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--text-strong); }
  .ct-field__req { color: var(--danger-fg); margin-left: 2px; }
  .ct-field__control {
    height: var(--control-h-lg); padding: 0 14px;
    font-family: inherit; font-size: var(--text-base); color: var(--text-strong);
    background: var(--surface-card); border: 1.5px solid var(--border-default);
    border-radius: var(--radius-sm); width: 100%;
    transition: border-color var(--duration-base) var(--ease-standard),
      box-shadow var(--duration-fast) var(--ease-standard);
  }
  textarea.ct-field__control { height: auto; padding: 11px 14px; line-height: var(--leading-normal); resize: vertical; }
  .ct-field__control::placeholder { color: var(--text-faint); }
  .ct-field__control:hover { border-color: var(--coffee-300); }
  .ct-field__control:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--ring-focus); }
  .ct-field__control:disabled { background: var(--fill-quiet); color: var(--text-faint); cursor: not-allowed; }
  .ct-field--error .ct-field__control { border-color: var(--danger-border); }
  .ct-field--error .ct-field__control:focus { box-shadow: 0 0 0 3px rgba(168,59,44,.22); }
  .ct-field__msg { font-size: var(--text-xs); color: var(--danger-fg); }
  .ct-field__hint { font-size: var(--text-xs); color: var(--text-muted); }
  `;
  document.head.appendChild(el);
}

let _uid = 0;

/**
 * TextInput — labelled text field with error + hint. Set `multiline` for a textarea.
 */
export function TextInput({
  label,
  error,
  hint,
  required = false,
  multiline = false,
  rows = 3,
  id,
  className = "",
  ...props
}) {
  const fieldId = id || `ct-field-${++_uid}`;
  const Control = multiline ? "textarea" : "input";
  const cls = ["ct-field", error ? "ct-field--error" : "", className].filter(Boolean).join(" ");
  return (
    <div className={cls}>
      {label && (
        <label className="ct-field__label" htmlFor={fieldId}>
          {label}
          {required && <span className="ct-field__req" aria-hidden="true">*</span>}
        </label>
      )}
      <Control
        id={fieldId}
        className="ct-field__control"
        rows={multiline ? rows : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {error ? (
        <span className="ct-field__msg">{error}</span>
      ) : hint ? (
        <span className="ct-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}
