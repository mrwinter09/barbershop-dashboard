import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-card-styles")) {
  const el = document.createElement("style");
  el.id = "ct-card-styles";
  el.textContent = `
  .ct-card {
    background-color: var(--surface-card);
    background-image: var(--paper-texture);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .ct-card--border { border: 1px solid var(--border-hairline); }
  .ct-card--sh-none { box-shadow: none; }
  .ct-card--sh-sm { box-shadow: var(--shadow-sm); }
  .ct-card--sh-md { box-shadow: var(--shadow-md); }
  .ct-card--pad-sm { padding: var(--space-3); }
  .ct-card--pad-md { padding: var(--space-5); }
  .ct-card--pad-lg { padding: var(--space-8); }
  .ct-card--hover { transition: box-shadow var(--duration-base) var(--ease-standard),
    transform var(--duration-base) var(--ease-out),
    border-color var(--duration-base) var(--ease-standard); }
  .ct-card--hover:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); border-color: var(--border-default); }
  `;
  document.head.appendChild(el);
}

/**
 * Card — the standard warm-paper surface container.
 * shadow: none | sm | md · padding: none | sm | md | lg
 */
export function Card({
  withBorder = true,
  shadow = "sm",
  padding = "md",
  hoverable = false,
  className = "",
  children,
  ...props
}) {
  const cls = [
    "ct-card",
    withBorder ? "ct-card--border" : "",
    `ct-card--sh-${shadow}`,
    padding !== "none" ? `ct-card--pad-${padding}` : "",
    hoverable ? "ct-card--hover" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...props}>
      {children}
    </div>
  );
}
