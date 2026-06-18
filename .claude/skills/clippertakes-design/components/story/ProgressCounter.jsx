import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-progress-styles")) {
  const el = document.createElement("style");
  el.id = "ct-progress-styles";
  el.textContent = `
  .ct-progress { font-family: var(--font-sans); display: flex; flex-direction: column; gap: 12px; }
  .ct-progress__row { display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap; }
  .ct-progress__count { font-family: var(--font-serif); font-weight: var(--weight-semibold);
    line-height: 0.9; letter-spacing: var(--tracking-tight); color: var(--text-strong); }
  .ct-progress__count em { font-style: normal; color: var(--clay-600); }
  .ct-progress__count .sep { color: var(--text-faint); }
  .ct-progress__label { font-family: var(--font-mono); text-transform: uppercase;
    letter-spacing: var(--tracking-wider); color: var(--text-muted); }

  .ct-progress__bar { position: relative; width: 100%; background: var(--paper-200);
    border-radius: var(--radius-full); overflow: hidden; }
  .ct-progress__fill { height: 100%; background: var(--petrol-700); border-radius: var(--radius-full);
    transition: width var(--duration-slow) var(--ease-out); }

  .ct-progress--lg .ct-progress__count { font-size: clamp(3.2rem, 8vw, 6.5rem); }
  .ct-progress--lg .ct-progress__label { font-size: var(--text-sm); }
  .ct-progress--lg .ct-progress__bar { height: 12px; }

  .ct-progress--md .ct-progress__count { font-size: clamp(2.2rem, 5vw, 3.4rem); }
  .ct-progress--md .ct-progress__label { font-size: var(--text-xs); }
  .ct-progress--md .ct-progress__bar { height: 9px; }

  .ct-progress--on-dark .ct-progress__count { color: var(--paper-0); }
  .ct-progress--on-dark .ct-progress__count em { color: var(--yellow-500); }
  .ct-progress--on-dark .ct-progress__label { color: var(--petrol-100); }
  .ct-progress--on-dark .ct-progress__bar { background: rgba(255,255,255,0.16); }
  .ct-progress--on-dark .ct-progress__fill { background: var(--yellow-500); }
  `;
  document.head.appendChild(el);
}

/**
 * ProgressCounter — the "23 / 50 Stories Collected" indicator with a bar.
 * The single most important signal for a funder skimming the site.
 * size: lg (hero) | md · onDark for petrol/photo panels.
 */
export function ProgressCounter({
  count = 0,
  total = 50,
  label = "Stories Collected",
  size = "lg",
  onDark = false,
  className = "",
  ...props
}) {
  const pct = Math.max(0, Math.min(100, Math.round((count / total) * 100)));
  const cls = ["ct-progress", `ct-progress--${size}`, onDark ? "ct-progress--on-dark" : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} {...props}>
      <div className="ct-progress__row">
        <div className="ct-progress__count">
          <em>{count}</em> <span className="sep">/</span> {total}
        </div>
        <div className="ct-progress__label">{label}</div>
      </div>
      <div
        className="ct-progress__bar"
        role="progressbar"
        aria-valuenow={count}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div className="ct-progress__fill" style={{ width: `${pct}%` }}></div>
      </div>
    </div>
  );
}
