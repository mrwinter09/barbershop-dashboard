import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-hoodtag-styles")) {
  const el = document.createElement("style");
  el.id = "ct-hoodtag-styles";
  el.textContent = `
  .ct-hoodtag {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 13px; font-family: var(--font-sans);
    font-size: var(--text-sm); font-weight: var(--weight-medium);
    line-height: 1; color: var(--coffee-700);
    background: transparent; border: 1.5px solid var(--border-default);
    border-radius: var(--radius-full); cursor: pointer; white-space: nowrap;
    transition: var(--transition-colors), border-color var(--duration-base) var(--ease-standard);
  }
  .ct-hoodtag__mark { width: 7px; height: 7px; border-radius: 50%; background: var(--clay-500); flex: none; }
  .ct-hoodtag:hover { border-color: var(--coffee-700); background: var(--surface-card); }
  .ct-hoodtag__count { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint); }
  .ct-hoodtag--active { color: var(--paper-0); background: var(--petrol-700); border-color: var(--petrol-700); }
  .ct-hoodtag--active .ct-hoodtag__mark { background: var(--yellow-500); }
  .ct-hoodtag--active:hover { background: var(--petrol-600); border-color: var(--petrol-600); }
  .ct-hoodtag--active .ct-hoodtag__count { color: var(--petrol-100); }
  `;
  document.head.appendChild(el);
}

/**
 * NeighborhoodTag — a Rotterdam neighborhood chip used to group / filter
 * the Stories Board (Blijdorp, Delfshaven, Afrikaanderwijk, Noord …).
 * Set `active` for the selected filter; `count` shows how many stories.
 */
export function NeighborhoodTag({
  name,
  count,
  active = false,
  as = "button",
  className = "",
  ...props
}) {
  const Tag = as;
  const cls = ["ct-hoodtag", active ? "ct-hoodtag--active" : "", className].filter(Boolean).join(" ");
  return (
    <Tag className={cls} type={as === "button" ? "button" : undefined} {...props}>
      <span className="ct-hoodtag__mark" aria-hidden="true"></span>
      {name}
      {count != null && <span className="ct-hoodtag__count">{count}</span>}
    </Tag>
  );
}
