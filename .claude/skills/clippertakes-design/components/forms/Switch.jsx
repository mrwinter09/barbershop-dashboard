import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-switch-styles")) {
  const el = document.createElement("style");
  el.id = "ct-switch-styles";
  el.textContent = `
  .ct-switch { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-sans); cursor: pointer; user-select: none; }
  .ct-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
  .ct-switch__track {
    position: relative; width: 38px; height: 22px; flex: none;
    background: var(--paper-300); border-radius: var(--radius-full);
    transition: background-color var(--duration-base) var(--ease-standard);
  }
  .ct-switch__thumb {
    position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
    background: var(--paper-0); border-radius: 50%; box-shadow: var(--shadow-sm);
    transition: transform var(--duration-base) var(--ease-standard);
  }
  .ct-switch input:checked + .ct-switch__track { background: var(--petrol-700); }
  .ct-switch input:checked + .ct-switch__track .ct-switch__thumb { transform: translateX(16px); }
  .ct-switch input:focus-visible + .ct-switch__track { box-shadow: var(--ring-focus); }
  .ct-switch input:disabled + .ct-switch__track { opacity: .5; }
  .ct-switch__label { font-size: var(--text-sm); color: var(--text-strong); }
  `;
  document.head.appendChild(el);
}

/**
 * Switch — boolean toggle (e.g. "I'd like to stay in touch about the project").
 */
export function Switch({ label, checked, onChange, disabled = false, className = "", ...props }) {
  const cls = ["ct-switch", className].filter(Boolean).join(" ");
  return (
    <label className={cls}>
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled} {...props} />
      <span className="ct-switch__track">
        <span className="ct-switch__thumb"></span>
      </span>
      {label && <span className="ct-switch__label">{label}</span>}
    </label>
  );
}
