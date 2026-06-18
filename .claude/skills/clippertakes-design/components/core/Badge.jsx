import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-badge-styles")) {
  const el = document.createElement("style");
  el.id = "ct-badge-styles";
  el.textContent = `
  .ct-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 3px 11px; font-family: var(--font-sans);
    font-size: var(--text-xs); font-weight: var(--weight-semibold);
    line-height: 1.5; border-radius: var(--radius-full);
    letter-spacing: .01em; white-space: nowrap;
  }
  .ct-badge--dot::before {
    content: ""; width: 6px; height: 6px; border-radius: 50%;
    background: currentColor; flex: none;
  }
  .ct-badge--neutral { color: var(--coffee-700); background: var(--fill-quiet); }
  .ct-badge--petrol  { color: var(--paper-0); background: var(--petrol-700); }
  .ct-badge--accent  { color: var(--ink-900); background: var(--yellow-500); }
  .ct-badge--clay    { color: var(--clay-600); background: var(--clay-100); }
  .ct-badge--moss    { color: var(--moss-700); background: var(--moss-100); }
  .ct-badge--outline { color: var(--coffee-700); background: transparent; box-shadow: inset 0 0 0 1px var(--border-default); }
  `;
  document.head.appendChild(el);
}

/**
 * Badge — compact label / tone pill.
 * tone: neutral | petrol | accent | clay | moss | outline
 */
export function Badge({ tone = "neutral", dot = false, className = "", children, ...props }) {
  const cls = ["ct-badge", `ct-badge--${tone}`, dot ? "ct-badge--dot" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} {...props}>
      {children}
    </span>
  );
}
