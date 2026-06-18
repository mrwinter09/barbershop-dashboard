import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-select-styles")) {
  const el = document.createElement("style");
  el.id = "ct-select-styles";
  el.textContent = `
  .ct-select { display: flex; flex-direction: column; gap: 7px; font-family: var(--font-sans); }
  .ct-select__label { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--text-strong); }
  .ct-select__req { color: var(--danger-fg); margin-left: 2px; }
  .ct-select__wrap { position: relative; }
  .ct-select__wrap::after {
    content: ""; position: absolute; right: 14px; top: 50%; pointer-events: none;
    width: 9px; height: 9px; margin-top: -6px;
    border-right: 1.6px solid var(--coffee-500); border-bottom: 1.6px solid var(--coffee-500);
    transform: rotate(45deg);
  }
  .ct-select__control {
    appearance: none; -webkit-appearance: none;
    height: var(--control-h-lg); padding: 0 36px 0 14px; width: 100%;
    font-family: inherit; font-size: var(--text-base); color: var(--text-strong);
    background: var(--surface-card); border: 1.5px solid var(--border-default);
    border-radius: var(--radius-sm); cursor: pointer;
    transition: border-color var(--duration-base) var(--ease-standard),
      box-shadow var(--duration-fast) var(--ease-standard);
  }
  .ct-select__control:hover { border-color: var(--coffee-300); }
  .ct-select__control:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--ring-focus); }
  .ct-select__control:disabled { background: var(--fill-quiet); color: var(--text-faint); cursor: not-allowed; }
  .ct-select__control[data-placeholder="true"] { color: var(--text-faint); }
  .ct-select--sm .ct-select__control { height: var(--control-h-md); font-size: var(--text-sm); }
  .ct-select--error .ct-select__control { border-color: var(--danger-border); }
  .ct-select__msg { font-size: var(--text-xs); color: var(--danger-fg); }
  `;
  document.head.appendChild(el);
}

let _sid = 0;

/**
 * Select — labelled native dropdown styled to match the field system.
 * data: array of { value, label } (or strings).
 */
export function Select({
  label,
  data = [],
  value,
  placeholder,
  error,
  required = false,
  size = "md",
  id,
  className = "",
  ...props
}) {
  const fieldId = id || `ct-select-${++_sid}`;
  const options = data.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const isPlaceholder = value === "" || value == null;
  const cls = [
    "ct-select",
    size === "sm" ? "ct-select--sm" : "",
    error ? "ct-select--error" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      {label && (
        <label className="ct-select__label" htmlFor={fieldId}>
          {label}
          {required && <span className="ct-select__req" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="ct-select__wrap">
        <select
          id={fieldId}
          className="ct-select__control"
          value={value}
          data-placeholder={isPlaceholder ? "true" : "false"}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="ct-select__msg">{error}</span>}
    </div>
  );
}
