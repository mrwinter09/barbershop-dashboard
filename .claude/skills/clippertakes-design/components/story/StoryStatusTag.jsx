import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-statustag-styles")) {
  const el = document.createElement("style");
  el.id = "ct-statustag-styles";
  el.textContent = `
  .ct-statustag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 11px; font-family: var(--font-sans);
    font-size: var(--text-xs); font-weight: var(--weight-semibold);
    line-height: 1.4; border-radius: var(--radius-full);
    letter-spacing: .02em; white-space: nowrap;
    backdrop-filter: saturate(1.1);
  }
  .ct-statustag::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex: none; }
  .ct-statustag--upcoming  { color: var(--status-upcoming-fg);  background: var(--status-upcoming-bg); }
  .ct-statustag--published { color: var(--status-published-fg); background: var(--status-published-bg); }
  .ct-statustag--withdrawn { color: var(--status-withdrawn-fg); background: var(--status-withdrawn-bg); }
  `;
  document.head.appendChild(el);
}

const LABELS = { upcoming: "In the chair soon", published: "Story published", withdrawn: "Withdrawn" };

/**
 * StoryStatusTag — where a story sits in its lifecycle.
 * status: upcoming | published | withdrawn (replaces scheduled/completed/cancelled).
 * Pass `label` to override the default copy.
 */
export function StoryStatusTag({ status = "published", label, className = "", ...props }) {
  const cls = ["ct-statustag", `ct-statustag--${status}`, className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...props}>
      {label || LABELS[status] || status}
    </span>
  );
}
