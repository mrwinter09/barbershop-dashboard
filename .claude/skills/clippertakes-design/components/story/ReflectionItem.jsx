import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-reflection-styles")) {
  const el = document.createElement("style");
  el.id = "ct-reflection-styles";
  el.textContent = `
  .ct-reflection { font-family: var(--font-sans); padding: var(--space-5) 0;
    border-top: 1px solid var(--border-hairline); display: flex; flex-direction: column; gap: 8px; }
  .ct-reflection:first-child { border-top: none; }
  .ct-reflection__text { font-family: var(--font-serif); font-size: var(--text-lg);
    line-height: var(--leading-relaxed); color: var(--coffee-700); }
  .ct-reflection__meta { display: flex; align-items: center; gap: 9px;
    font-size: var(--text-sm); color: var(--text-muted); }
  .ct-reflection__name { font-weight: var(--weight-semibold); color: var(--text-strong); }
  .ct-reflection__hood { color: var(--clay-600); }
  .ct-reflection__date { font-family: var(--font-mono); font-size: var(--text-xs);
    letter-spacing: var(--tracking-wide); color: var(--text-faint); }
  .ct-reflection__dot { width: 3px; height: 3px; border-radius: 50%; background: var(--paper-300); flex: none; }
  `;
  document.head.appendChild(el);
}

/**
 * ReflectionItem — one guestbook-style response left under a story.
 * Quiet and considered: a short text, then who left it and when.
 * No likes, no threads, no upvotes.
 */
export function ReflectionItem({ text, name, neighborhood, date, className = "", ...props }) {
  const cls = ["ct-reflection", className].filter(Boolean).join(" ");
  return (
    <div className={cls} {...props}>
      <p className="ct-reflection__text">{text}</p>
      <div className="ct-reflection__meta">
        {name && <span className="ct-reflection__name">{name}</span>}
        {neighborhood && <span className="ct-reflection__hood">{neighborhood}</span>}
        {date && <span className="ct-reflection__dot" aria-hidden="true"></span>}
        {date && <span className="ct-reflection__date">{date}</span>}
      </div>
    </div>
  );
}
