import React from "react";

/* Inject Button styles once (vanilla — references global CSS custom properties). */
if (typeof document !== "undefined" && !document.getElementById("ct-button-styles")) {
  const el = document.createElement("style");
  el.id = "ct-button-styles";
  el.textContent = `
  .ct-btn {
    --_h: 44px; --_px: 22px; --_fs: 15px;
    display: inline-flex; align-items: center; justify-content: center;
    gap: 9px; height: var(--_h); padding: 0 var(--_px);
    font-family: var(--font-sans); font-size: var(--_fs);
    font-weight: var(--weight-semibold); line-height: 1;
    letter-spacing: 0.005em;
    border-radius: var(--radius-md); border: 1.5px solid transparent;
    cursor: pointer; white-space: nowrap; text-decoration: none;
    transition: background-color var(--duration-base) var(--ease-standard),
      border-color var(--duration-base) var(--ease-standard),
      color var(--duration-base) var(--ease-standard),
      box-shadow var(--duration-fast) var(--ease-standard),
      transform var(--duration-fast) var(--ease-standard);
  }
  .ct-btn:focus-visible { outline: none; box-shadow: var(--ring-focus); }
  .ct-btn:active { transform: translateY(1px); }
  .ct-btn[disabled] { opacity: .5; cursor: not-allowed; transform: none; }
  .ct-btn--sm { --_h: 36px; --_px: 16px; --_fs: 14px; }
  .ct-btn--lg { --_h: 52px; --_px: 30px; --_fs: 17px; }
  .ct-btn--block { display: flex; width: 100%; }

  /* Primary — deep petrol, the default cultural CTA */
  .ct-btn--primary { background: var(--petrol-700); color: var(--paper-0); }
  .ct-btn--primary:hover:not([disabled]) { background: var(--petrol-600); }

  /* Accent — Rotterdam yellow, ink text. The loud invitation. */
  .ct-btn--accent { background: var(--yellow-500); color: var(--ink-900); }
  .ct-btn--accent:hover:not([disabled]) { background: var(--yellow-400); }

  /* Outline — coffee hairline, fills petrol on hover */
  .ct-btn--outline { background: transparent; color: var(--coffee-700); border-color: var(--coffee-700); }
  .ct-btn--outline:hover:not([disabled]) { background: var(--coffee-700); color: var(--paper-0); }

  /* Ghost — quiet text action */
  .ct-btn--ghost { background: transparent; color: var(--petrol-700); }
  .ct-btn--ghost:hover:not([disabled]) { background: var(--petrol-50); }

  /* On-dark — for use over petrol/photo panels */
  .ct-btn--on-dark { background: var(--paper-0); color: var(--petrol-900); }
  .ct-btn--on-dark:hover:not([disabled]) { background: var(--paper-100); }
  `;
  document.head.appendChild(el);
}

/**
 * Button — the primary action control across the platform.
 * variant: primary | accent | outline | ghost | on-dark
 * size: sm | md | lg
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  as = "button",
  className = "",
  children,
  ...props
}) {
  const Tag = as;
  const cls = [
    "ct-btn",
    `ct-btn--${variant}`,
    size !== "md" ? `ct-btn--${size}` : "",
    fullWidth ? "ct-btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Tag className={cls} {...props}>
      {leftIcon != null && <span className="ct-btn__icon" aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon != null && <span className="ct-btn__icon" aria-hidden="true">{rightIcon}</span>}
    </Tag>
  );
}
