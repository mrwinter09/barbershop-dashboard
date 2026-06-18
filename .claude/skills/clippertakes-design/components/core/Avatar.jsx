import React from "react";

if (typeof document !== "undefined" && !document.getElementById("ct-avatar-styles")) {
  const el = document.createElement("style");
  el.id = "ct-avatar-styles";
  el.textContent = `
  .ct-avatar {
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--petrol-100); color: var(--petrol-700);
    font-family: var(--font-sans); font-weight: var(--weight-semibold);
    border-radius: var(--radius-full); overflow: hidden;
    user-select: none; flex: none;
  }
  .ct-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .ct-avatar--xs { width: 24px; height: 24px; font-size: 10px; }
  .ct-avatar--sm { width: 32px; height: 32px; font-size: 12px; }
  .ct-avatar--md { width: 40px; height: 40px; font-size: 14px; }
  .ct-avatar--lg { width: 56px; height: 56px; font-size: 18px; }
  .ct-avatar--petrol { background: var(--petrol-700); color: var(--paper-0); }
  .ct-avatar--clay   { background: var(--clay-100); color: var(--clay-600); }
  .ct-avatar--moss   { background: var(--moss-100); color: var(--moss-700); }
  `;
  document.head.appendChild(el);
}

function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || "")
    .join("")
    .toUpperCase();
}

/**
 * Avatar — a person's identity chip. Shows a portrait image, else initials.
 * size: xs | sm | md | lg · tone: neutral | petrol | clay | moss
 */
export function Avatar({ src, name = "", size = "md", tone = "neutral", className = "", ...props }) {
  const cls = [
    "ct-avatar",
    `ct-avatar--${size}`,
    tone !== "neutral" ? `ct-avatar--${tone}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} title={name} {...props}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}
