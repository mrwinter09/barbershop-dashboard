/* @ds-bundle: {"format":3,"namespace":"KiruBarbershopDesignSystem_db9aa3","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"},{"name":"NeighborhoodTag","sourcePath":"components/story/NeighborhoodTag.jsx"},{"name":"ProgressCounter","sourcePath":"components/story/ProgressCounter.jsx"},{"name":"ReflectionForm","sourcePath":"components/story/ReflectionForm.jsx"},{"name":"ReflectionItem","sourcePath":"components/story/ReflectionItem.jsx"},{"name":"StoryCard","sourcePath":"components/story/StoryCard.jsx"},{"name":"StoryStatusTag","sourcePath":"components/story/StoryStatusTag.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"feddc2bf94d6","components/core/Badge.jsx":"197fa81ce6ee","components/core/Button.jsx":"d617c9c97cc5","components/core/Card.jsx":"6e00c8313f45","components/forms/Select.jsx":"4f66dd5531d6","components/forms/Switch.jsx":"6b350d098c75","components/forms/TextInput.jsx":"fdeb4e93c3a7","components/story/NeighborhoodTag.jsx":"b6882b2b364f","components/story/ProgressCounter.jsx":"b60d4ef31e00","components/story/ReflectionForm.jsx":"0be8ebf1682e","components/story/ReflectionItem.jsx":"0d769f9c0302","components/story/StoryCard.jsx":"bd1351970080","components/story/StoryStatusTag.jsx":"b3a20ae9800f","ui_kits/site/chrome.jsx":"b86ef6122960","ui_kits/site/data.js":"08920a46f221","ui_kits/site/forms.jsx":"5065400a18e0","ui_kits/site/screens.jsx":"67c614ba7204"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KiruBarbershopDesignSystem_db9aa3 = window.KiruBarbershopDesignSystem_db9aa3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || "").join("").toUpperCase();
}

/**
 * Avatar — a person's identity chip. Shows a portrait image, else initials.
 * size: xs | sm | md | lg · tone: neutral | petrol | clay | moss
 */
function Avatar({
  src,
  name = "",
  size = "md",
  tone = "neutral",
  className = "",
  ...props
}) {
  const cls = ["ct-avatar", `ct-avatar--${size}`, tone !== "neutral" ? `ct-avatar--${tone}` : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, props), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Badge({
  tone = "neutral",
  dot = false,
  className = "",
  children,
  ...props
}) {
  const cls = ["ct-badge", `ct-badge--${tone}`, dot ? "ct-badge--dot" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const cls = ["ct-btn", `ct-btn--${variant}`, size !== "md" ? `ct-btn--${size}` : "", fullWidth ? "ct-btn--block" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, props), leftIcon != null && /*#__PURE__*/React.createElement("span", {
    className: "ct-btn__icon",
    "aria-hidden": "true"
  }, leftIcon), children, rightIcon != null && /*#__PURE__*/React.createElement("span", {
    className: "ct-btn__icon",
    "aria-hidden": "true"
  }, rightIcon));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
  withBorder = true,
  shadow = "sm",
  padding = "md",
  hoverable = false,
  className = "",
  children,
  ...props
}) {
  const cls = ["ct-card", withBorder ? "ct-card--border" : "", `ct-card--sh-${shadow}`, padding !== "none" ? `ct-card--pad-${padding}` : "", hoverable ? "ct-card--hover" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Select({
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
  const options = data.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  const isPlaceholder = value === "" || value == null;
  const cls = ["ct-select", size === "sm" ? "ct-select--sm" : "", error ? "ct-select--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ct-select__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "ct-select__req",
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/React.createElement("div", {
    className: "ct-select__wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    className: "ct-select__control",
    value: value,
    "data-placeholder": isPlaceholder ? "true" : "false"
  }, props), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)))), error && /*#__PURE__*/React.createElement("span", {
    className: "ct-select__msg"
  }, error));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Switch({
  label,
  checked,
  onChange,
  disabled = false,
  className = "",
  ...props
}) {
  const cls = ["ct-switch", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("label", {
    className: cls
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, props)), /*#__PURE__*/React.createElement("span", {
    className: "ct-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ct-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "ct-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
if (typeof document !== "undefined" && !document.getElementById("ct-field-styles")) {
  const el = document.createElement("style");
  el.id = "ct-field-styles";
  el.textContent = `
  .ct-field { display: flex; flex-direction: column; gap: 7px; font-family: var(--font-sans); }
  .ct-field__label { font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--text-strong); }
  .ct-field__req { color: var(--danger-fg); margin-left: 2px; }
  .ct-field__control {
    height: var(--control-h-lg); padding: 0 14px;
    font-family: inherit; font-size: var(--text-base); color: var(--text-strong);
    background: var(--surface-card); border: 1.5px solid var(--border-default);
    border-radius: var(--radius-sm); width: 100%;
    transition: border-color var(--duration-base) var(--ease-standard),
      box-shadow var(--duration-fast) var(--ease-standard);
  }
  textarea.ct-field__control { height: auto; padding: 11px 14px; line-height: var(--leading-normal); resize: vertical; }
  .ct-field__control::placeholder { color: var(--text-faint); }
  .ct-field__control:hover { border-color: var(--coffee-300); }
  .ct-field__control:focus { outline: none; border-color: var(--border-focus); box-shadow: var(--ring-focus); }
  .ct-field__control:disabled { background: var(--fill-quiet); color: var(--text-faint); cursor: not-allowed; }
  .ct-field--error .ct-field__control { border-color: var(--danger-border); }
  .ct-field--error .ct-field__control:focus { box-shadow: 0 0 0 3px rgba(168,59,44,.22); }
  .ct-field__msg { font-size: var(--text-xs); color: var(--danger-fg); }
  .ct-field__hint { font-size: var(--text-xs); color: var(--text-muted); }
  `;
  document.head.appendChild(el);
}
let _uid = 0;

/**
 * TextInput — labelled text field with error + hint. Set `multiline` for a textarea.
 */
function TextInput({
  label,
  error,
  hint,
  required = false,
  multiline = false,
  rows = 3,
  id,
  className = "",
  ...props
}) {
  const fieldId = id || `ct-field-${++_uid}`;
  const Control = multiline ? "textarea" : "input";
  const cls = ["ct-field", error ? "ct-field--error" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "ct-field__label",
    htmlFor: fieldId
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "ct-field__req",
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/React.createElement(Control, _extends({
    id: fieldId,
    className: "ct-field__control",
    rows: multiline ? rows : undefined,
    "aria-invalid": error ? true : undefined
  }, props)), error ? /*#__PURE__*/React.createElement("span", {
    className: "ct-field__msg"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "ct-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// components/story/NeighborhoodTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function NeighborhoodTag({
  name,
  count,
  active = false,
  as = "button",
  className = "",
  ...props
}) {
  const Tag = as;
  const cls = ["ct-hoodtag", active ? "ct-hoodtag--active" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls,
    type: as === "button" ? "button" : undefined
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "ct-hoodtag__mark",
    "aria-hidden": "true"
  }), name, count != null && /*#__PURE__*/React.createElement("span", {
    className: "ct-hoodtag__count"
  }, count));
}
Object.assign(__ds_scope, { NeighborhoodTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/story/NeighborhoodTag.jsx", error: String((e && e.message) || e) }); }

// components/story/ProgressCounter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function ProgressCounter({
  count = 0,
  total = 50,
  label = "Stories Collected",
  size = "lg",
  onDark = false,
  className = "",
  ...props
}) {
  const pct = Math.max(0, Math.min(100, Math.round(count / total * 100)));
  const cls = ["ct-progress", `ct-progress--${size}`, onDark ? "ct-progress--on-dark" : "", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ct-progress__row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-progress__count"
  }, /*#__PURE__*/React.createElement("em", null, count), " ", /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/"), " ", total), /*#__PURE__*/React.createElement("div", {
    className: "ct-progress__label"
  }, label)), /*#__PURE__*/React.createElement("div", {
    className: "ct-progress__bar",
    role: "progressbar",
    "aria-valuenow": count,
    "aria-valuemin": 0,
    "aria-valuemax": total
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-progress__fill",
    style: {
      width: `${pct}%`
    }
  })));
}
Object.assign(__ds_scope, { ProgressCounter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/story/ProgressCounter.jsx", error: String((e && e.message) || e) }); }

// components/story/ReflectionForm.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
if (typeof document !== "undefined" && !document.getElementById("ct-reflectionform-styles")) {
  const el = document.createElement("style");
  el.id = "ct-reflectionform-styles";
  el.textContent = `
  .ct-reflectionform { font-family: var(--font-sans); display: flex; flex-direction: column; gap: 14px;
    background-color: var(--surface-sunken); background-image: var(--paper-texture);
    border: 1px solid var(--border-hairline); border-radius: var(--radius-lg);
    padding: var(--space-6); }
  .ct-reflectionform__head { display: flex; flex-direction: column; gap: 4px; }
  .ct-reflectionform__title { font-family: var(--font-serif); font-size: var(--text-h4);
    font-weight: var(--weight-semibold); color: var(--text-strong); }
  .ct-reflectionform__hint { font-size: var(--text-sm); color: var(--text-muted); }
  .ct-reflectionform__row { display: flex; justify-content: flex-end; }
  `;
  document.head.appendChild(el);
}

/**
 * ReflectionForm — the quiet "leave a reflection" composer on a story page.
 * Deliberately minimal: a name, one short text, a button. Built from
 * TextInput + Button. Wire onSubmit({ name, text }) into the host's storage.
 */
function ReflectionForm({
  title = "Leave a reflection",
  hint = "A sentence or two — what this story left with you.",
  onSubmit,
  className = "",
  ...props
}) {
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const handle = e => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit && onSubmit({
      name: name.trim(),
      text: text.trim()
    });
    setName("");
    setText("");
  };
  const cls = ["ct-reflectionform", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("form", _extends({
    className: cls,
    onSubmit: handle
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ct-reflectionform__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-reflectionform__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "ct-reflectionform__hint"
  }, hint)), /*#__PURE__*/React.createElement(__ds_scope.TextInput, {
    label: "Your name",
    placeholder: "First name, or how the neighborhood knows you",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(__ds_scope.TextInput, {
    label: "Your reflection",
    multiline: true,
    rows: 3,
    placeholder: "Write a short response\u2026",
    value: text,
    onChange: e => setText(e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    className: "ct-reflectionform__row"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    variant: "primary"
  }, "Add reflection")));
}
Object.assign(__ds_scope, { ReflectionForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/story/ReflectionForm.jsx", error: String((e && e.message) || e) }); }

// components/story/ReflectionItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function ReflectionItem({
  text,
  name,
  neighborhood,
  date,
  className = "",
  ...props
}) {
  const cls = ["ct-reflection", className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("p", {
    className: "ct-reflection__text"
  }, text), /*#__PURE__*/React.createElement("div", {
    className: "ct-reflection__meta"
  }, name && /*#__PURE__*/React.createElement("span", {
    className: "ct-reflection__name"
  }, name), neighborhood && /*#__PURE__*/React.createElement("span", {
    className: "ct-reflection__hood"
  }, neighborhood), date && /*#__PURE__*/React.createElement("span", {
    className: "ct-reflection__dot",
    "aria-hidden": "true"
  }), date && /*#__PURE__*/React.createElement("span", {
    className: "ct-reflection__date"
  }, date)));
}
Object.assign(__ds_scope, { ReflectionItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/story/ReflectionItem.jsx", error: String((e && e.message) || e) }); }

// components/story/StoryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
if (typeof document !== "undefined" && !document.getElementById("ct-storycard-styles")) {
  const el = document.createElement("style");
  el.id = "ct-storycard-styles";
  el.textContent = `
  .ct-storycard {
    display: flex; flex-direction: column; text-align: left;
    background-color: var(--surface-card); background-image: var(--paper-texture);
    border: 1px solid var(--border-hairline); border-radius: var(--radius-lg);
    overflow: hidden; cursor: pointer; text-decoration: none; color: inherit;
    font-family: var(--font-sans); width: 100%; padding: 0;
    transition: box-shadow var(--duration-base) var(--ease-standard),
      transform var(--duration-base) var(--ease-out),
      border-color var(--duration-base) var(--ease-standard);
  }
  .ct-storycard:hover { box-shadow: var(--shadow-lg); transform: translateY(-3px); border-color: var(--border-default); }
  .ct-storycard:focus-visible { outline: none; box-shadow: var(--ring-focus); }

  .ct-storycard__media { position: relative; aspect-ratio: 4 / 5; overflow: hidden; background: var(--petrol-100); }
  .ct-storycard__img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--duration-slow) var(--ease-out); }
  .ct-storycard:hover .ct-storycard__img { transform: scale(1.035); }
  .ct-storycard__num {
    position: absolute; top: 12px; left: 12px;
    font-family: var(--font-mono); font-size: var(--text-xs); font-weight: 700;
    letter-spacing: var(--tracking-wide); text-transform: uppercase;
    color: var(--ink-900); background: var(--yellow-500);
    padding: 4px 9px; border-radius: var(--radius-sm);
  }
  .ct-storycard__status { position: absolute; top: 12px; right: 12px; }
  .ct-storycard--upcoming .ct-storycard__img { filter: grayscale(0.55) contrast(0.96); opacity: .9; }

  .ct-storycard__body { padding: var(--space-5) var(--space-5) var(--space-6); display: flex; flex-direction: column; gap: 8px; }
  .ct-storycard__name { font-family: var(--font-serif); font-size: var(--text-h3); font-weight: var(--weight-semibold);
    line-height: var(--leading-snug); color: var(--text-strong); letter-spacing: var(--tracking-snug); }
  .ct-storycard__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 6px;
    font-size: var(--text-sm); color: var(--text-muted); }
  .ct-storycard__meta b { color: var(--clay-600); font-weight: var(--weight-semibold); }
  .ct-storycard__meta .ct-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--paper-300); flex: none; }
  .ct-storycard__teaser { margin-top: 4px; font-family: var(--font-serif); font-style: italic;
    font-size: var(--text-lg); line-height: var(--leading-quote); color: var(--coffee-700);
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  `;
  document.head.appendChild(el);
}
function pad(n) {
  return String(n).padStart(2, "0");
}

/**
 * StoryCard — the centerpiece unit of the Stories Board.
 * A portrait, a mono "STORY 07 / 50" stamp, name, role · neighborhood,
 * and an optional italic answer teaser. `status="upcoming"` desaturates
 * the portrait to read as not-yet-published.
 */
function StoryCard({
  number,
  total = 50,
  name,
  role,
  neighborhood,
  image,
  teaser,
  status = "published",
  statusTag,
  as = "a",
  className = "",
  ...props
}) {
  const Tag = as;
  const cls = ["ct-storycard", `ct-storycard--${status}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, props), /*#__PURE__*/React.createElement("div", {
    className: "ct-storycard__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    className: "ct-storycard__img",
    src: image,
    alt: name ? `Portrait of ${name}` : "Story portrait"
  }) : null, number != null && /*#__PURE__*/React.createElement("span", {
    className: "ct-storycard__num"
  }, "Story ", pad(number), " / ", total), statusTag && /*#__PURE__*/React.createElement("span", {
    className: "ct-storycard__status"
  }, statusTag)), /*#__PURE__*/React.createElement("div", {
    className: "ct-storycard__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-storycard__name"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "ct-storycard__meta"
  }, role && /*#__PURE__*/React.createElement("b", null, role), role && neighborhood && /*#__PURE__*/React.createElement("span", {
    className: "ct-dot",
    "aria-hidden": "true"
  }), neighborhood && /*#__PURE__*/React.createElement("span", null, neighborhood)), teaser && /*#__PURE__*/React.createElement("p", {
    className: "ct-storycard__teaser"
  }, teaser)));
}
Object.assign(__ds_scope, { StoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/story/StoryCard.jsx", error: String((e && e.message) || e) }); }

// components/story/StoryStatusTag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const LABELS = {
  upcoming: "In the chair soon",
  published: "Story published",
  withdrawn: "Withdrawn"
};

/**
 * StoryStatusTag — where a story sits in its lifecycle.
 * status: upcoming | published | withdrawn (replaces scheduled/completed/cancelled).
 * Pass `label` to override the default copy.
 */
function StoryStatusTag({
  status = "published",
  label,
  className = "",
  ...props
}) {
  const cls = ["ct-statustag", `ct-statustag--${status}`, className].filter(Boolean).join(" ");
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, props), label || LABELS[status] || status);
}
Object.assign(__ds_scope, { StoryStatusTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/story/StoryStatusTag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/chrome.jsx
try { (() => {
/* ClipperTakes Studio — app chrome (header + footer).
   Shares components via window for the other babel scripts. */
(function () {
  const {
    Button
  } = window.KiruBarbershopDesignSystem_db9aa3;
  if (!document.getElementById("ct-site-styles")) {
    const el = document.createElement("style");
    el.id = "ct-site-styles";
    el.textContent = `
    .site { min-height: 100vh; display: flex; flex-direction: column; }
    .site__main { flex: 1; }

    .nav { position: sticky; top: 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px clamp(20px, 5vw, 56px);
      background: color-mix(in srgb, var(--surface-page) 86%, transparent);
      backdrop-filter: blur(10px) saturate(1.1);
      border-bottom: 1px solid var(--border-hairline); }
    .nav__mark { font-family: var(--font-serif); font-weight: 600; font-size: 22px;
      letter-spacing: -.02em; color: var(--text-strong); cursor: pointer; background: none; border: 0; padding: 0; }
    .nav__mark em { font-style: italic; color: var(--clay-600); }
    .nav__links { display: flex; align-items: center; gap: clamp(14px, 2.4vw, 30px); }
    .nav__link { font-size: 15px; font-weight: 500; color: var(--text-body); background: none; border: 0;
      cursor: pointer; padding: 6px 0; font-family: var(--font-sans);
      border-bottom: 2px solid transparent; transition: color .2s, border-color .2s; }
    .nav__link:hover { color: var(--text-strong); }
    .nav__link--active { color: var(--petrol-700); border-color: var(--yellow-500); }
    @media (max-width: 720px) { .nav__links .nav__link { display: none; } }

    .foot { background-color: var(--petrol-900); background-image: var(--paper-texture); color: var(--petrol-100);
      padding: clamp(40px, 6vw, 72px) clamp(20px, 5vw, 56px) 36px; }
    .foot__grid { display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-between; align-items: flex-start; }
    .foot__mark { font-family: var(--font-serif); font-weight: 600; font-size: 30px; color: var(--paper-0); letter-spacing: -.02em; }
    .foot__mark em { font-style: italic; color: var(--yellow-500); }
    .foot__tag { margin-top: 10px; max-width: 360px; line-height: 1.6; color: var(--petrol-100); }
    .foot__col h5 { font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-wider);
      text-transform: uppercase; color: var(--petrol-300); margin-bottom: 12px; }
    .foot__col button { display: block; background: none; border: 0; color: var(--petrol-100); font-size: 15px;
      cursor: pointer; padding: 5px 0; font-family: var(--font-sans); text-align: left; }
    .foot__col button:hover { color: var(--paper-0); }
    .foot__rule { border: 0; border-top: 1px solid rgba(255,255,255,0.12); margin: 36px 0 18px; }
    .foot__base { display: flex; flex-wrap: wrap; gap: 8px 18px; justify-content: space-between;
      font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--petrol-300); }
    `;
    document.head.appendChild(el);
  }
  const NAV = [{
    key: "home",
    label: "Home"
  }, {
    key: "stories",
    label: "The Stories"
  }, {
    key: "about",
    label: "The Chair"
  }, {
    key: "recommend",
    label: "Recommend someone"
  }];
  function Header({
    route,
    go
  }) {
    return /*#__PURE__*/React.createElement("nav", {
      className: "nav"
    }, /*#__PURE__*/React.createElement("button", {
      className: "nav__mark",
      onClick: () => go("home")
    }, "Clipper", /*#__PURE__*/React.createElement("em", null, "Takes")), /*#__PURE__*/React.createElement("div", {
      className: "nav__links"
    }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
      key: n.key,
      className: "nav__link" + (route === n.key ? " nav__link--active" : ""),
      onClick: () => go(n.key)
    }, n.label)), /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "sm",
      onClick: () => go("submit")
    }, "Tell your story")));
  }
  function Footer({
    go
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      className: "foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "foot__grid"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "foot__mark"
    }, "Clipper", /*#__PURE__*/React.createElement("em", null, "Takes")), /*#__PURE__*/React.createElement("p", {
      className: "foot__tag"
    }, "A travelling barber chair collecting fifty voices from Rotterdam \u2014 one conversation, one haircut, one story at a time.")), /*#__PURE__*/React.createElement("div", {
      className: "foot__col"
    }, /*#__PURE__*/React.createElement("h5", null, "The project"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("stories")
    }, "The Stories"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("about")
    }, "The Chair"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("submit")
    }, "Tell your story"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("recommend")
    }, "Recommend someone")), /*#__PURE__*/React.createElement("div", {
      className: "foot__col"
    }, /*#__PURE__*/React.createElement("h5", null, "Rotterdam"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("stories")
    }, "Afrikaanderwijk"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("stories")
    }, "Delfshaven"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("stories")
    }, "Nieuwe Binnenweg"), /*#__PURE__*/React.createElement("button", {
      onClick: () => go("stories")
    }, "Noord"))), /*#__PURE__*/React.createElement("hr", {
      className: "foot__rule"
    }), /*#__PURE__*/React.createElement("div", {
      className: "foot__base"
    }, /*#__PURE__*/React.createElement("span", null, "ClipperTakes Studio \xB7 Rotterdam \xB7 2026"), /*#__PURE__*/React.createElement("span", null, "An independent cultural project")));
  }
  window.CTChrome = {
    Header,
    Footer
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/data.js
try { (() => {
/* ClipperTakes Studio — seed data for the UI kit.
   A simple local structure that mirrors the brief's "edit story by
   story" constraint: one array of story entries, each with a status
   (upcoming → published → withdrawn) and a manual `number`.
   Exposed on window for the babel screen scripts to share. */
(function () {
  const IMG = n => `../../assets/img/${n}`;
  const NEIGHBORHOODS = ["Afrikaanderwijk", "Nieuwe Binnenweg", "Delfshaven", "Blijdorp", "Noord", "Rotterdam West"];

  // published stories count toward the 23 / 50. Numbers are manual.
  const STORIES = [{
    id: 1,
    number: 1,
    status: "published",
    name: "Fatima El Amrani",
    role: "Community organizer",
    neighborhood: "Afrikaanderwijk",
    date: "14 MAR 2026",
    image: IMG("interior-1.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "The market taught me the whole city in one street. You learn every language by the time you've bought your vegetables. That's Rotterdam — nobody explains it, you just stand in it long enough."
  }, {
    id: 2,
    number: 2,
    status: "published",
    name: "Thomas Dijkstra",
    role: "Harbour electrician",
    neighborhood: "Delfshaven",
    date: "09 MAR 2026",
    image: IMG("hero.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "That you fix the thing in front of you and you don't make a speech about it. The harbour doesn't care how you feel. I like that, honestly. It's honest work and an honest city."
  }, {
    id: 3,
    number: 3,
    status: "published",
    name: "Sanne Bakker",
    role: "Baker",
    neighborhood: "Nieuwe Binnenweg",
    date: "02 MAR 2026",
    image: IMG("shop-1.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Open early, stay kind. Half my regulars came in sad once and came back because nobody rushed them. A bakery is just an excuse to keep the street talking to itself."
  }, {
    id: 4,
    number: 4,
    status: "published",
    name: "Joran Visser",
    role: "Bus driver",
    neighborhood: "Noord",
    date: "24 FEB 2026",
    image: IMG("interior-2.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Everybody's carrying something heavier than their bag. You drive the same route ten years, you see the whole life of a neighbourhood through one windscreen."
  }, {
    id: 5,
    number: 5,
    status: "published",
    name: "Amira Haddad",
    role: "Nurse",
    neighborhood: "Blijdorp",
    date: "17 FEB 2026",
    image: IMG("shop-2.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "How to be calm for two people at once — the patient, and myself. Rotterdam is blunt but it shows up. When it matters, people here show up."
  }, {
    id: 6,
    number: 6,
    status: "published",
    name: "Wesley Boateng",
    role: "Football coach",
    neighborhood: "Rotterdam West",
    date: "10 FEB 2026",
    image: IMG("interior-3.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Twenty kids, twenty stories, one ball. You learn fast that talent is everywhere and patience is the rare thing. I coach patience more than football."
  }, {
    id: 7,
    number: 7,
    status: "published",
    name: "Lieke de Wit",
    role: "Bookshop owner",
    neighborhood: "Nieuwe Binnenweg",
    date: "03 FEB 2026",
    image: IMG("shop-3.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "That a small shop is a public service you happen to charge for. People come in for a book and leave something of themselves on the counter. I keep both."
  }, {
    id: 8,
    number: 8,
    status: "published",
    name: "Mehmet Yılmaz",
    role: "Greengrocer",
    neighborhood: "Afrikaanderwijk",
    date: "27 JAN 2026",
    image: IMG("interior-4.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Thirty years on the same corner. The city changed around me four times. You stay put and friendly and eventually you're the landmark people give directions by."
  },
  // upcoming — submitted, not yet recorded
  {
    id: 9,
    number: 24,
    status: "upcoming",
    name: "In the chair soon",
    role: "Maker",
    neighborhood: "Noord",
    date: "Recording in April",
    image: IMG("interior-2.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: ""
  }, {
    id: 10,
    number: 25,
    status: "upcoming",
    name: "In the chair soon",
    role: "Volunteer",
    neighborhood: "Delfshaven",
    date: "Recording in April",
    image: IMG("shop-1.jpg"),
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: ""
  }];
  const SEED_REFLECTIONS = {
    1: [{
      text: "I grew up two streets from here. This is exactly how I remember the market on a Saturday.",
      name: "Sanne",
      neighborhood: "Afrikaanderwijk",
      date: "15 MAR 2026"
    }, {
      text: "Made me want to call my grandmother. Thank you for this.",
      name: "Marco",
      date: "16 MAR 2026"
    }],
    3: [{
      text: "The bakery on the corner really is the heart of the street. Lovely to see it said out loud.",
      name: "Joost",
      neighborhood: "Nieuwe Binnenweg",
      date: "04 MAR 2026"
    }]
  };
  const TARGET = 50;
  const collected = STORIES.filter(s => s.status === "published").length;
  window.CT_DATA = {
    NEIGHBORHOODS,
    STORIES,
    SEED_REFLECTIONS,
    TARGET,
    collected
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/data.js", error: String((e && e.message) || e) }); }

// ui_kits/site/forms.jsx
try { (() => {
/* ClipperTakes Studio — About + the two invitation forms. */
(function () {
  const NS = window.KiruBarbershopDesignSystem_db9aa3;
  const {
    Button,
    TextInput,
    Select,
    Switch,
    Card,
    ProgressCounter
  } = NS;
  const {
    NEIGHBORHOODS,
    TARGET
  } = window.CT_DATA;
  if (!document.getElementById("ct-forms-styles")) {
    const el = document.createElement("style");
    el.id = "ct-forms-styles";
    el.textContent = `
    .about-hero { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px,5vw,64px); align-items: center;
      padding: clamp(40px,6vw,80px) 0; }
    .about-hero h1 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-display);
      line-height: 1.05; letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 14px 0 0; }
    .about-hero p { font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--text-body); margin-top: 20px; }
    .about-media { aspect-ratio: 5/4; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-image); }
    .about-media img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 860px){ .about-hero { grid-template-columns: 1fr; } }

    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px,2.5vw,28px); }
    .step { background-color: var(--surface-card); background-image: var(--paper-texture);
      border: 1px solid var(--border-hairline); border-radius: var(--radius-lg); padding: 26px 24px; }
    .step__n { font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: var(--clay-600); letter-spacing: .1em; }
    .step h4 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h4); color: var(--text-strong); margin: 12px 0 8px; }
    .step p { font-size: 15px; line-height: 1.6; color: var(--text-body); }
    @media (max-width: 760px){ .steps { grid-template-columns: 1fr; } }

    .photo-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .photo-strip div { aspect-ratio: 1; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); }
    .photo-strip img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 760px){ .photo-strip { grid-template-columns: repeat(2, 1fr); } }

    .form-page { max-width: 640px; margin: 0 auto; padding: clamp(40px,6vw,72px) 0 90px; }
    .form-page__kick { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-wider);
      text-transform: uppercase; color: var(--clay-600); }
    .form-page h1 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h1);
      letter-spacing: var(--tracking-snug); color: var(--text-strong); margin: 12px 0 0; }
    .form-page__lead { font-size: var(--text-lg); line-height: 1.6; color: var(--text-body); margin: 16px 0 30px; }
    .form-fields { display: flex; flex-direction: column; gap: 18px; }
    .form-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    @media (max-width: 560px){ .form-grid2 { grid-template-columns: 1fr; } }
    .form-actions { margin-top: 8px; display: flex; align-items: center; gap: 16px; }
    .form-note { font-size: 13px; color: var(--text-muted); }

    .done { text-align: center; padding: 30px 8px; }
    .done__mark { width: 56px; height: 56px; border-radius: 50%; background: var(--moss-100); color: var(--moss-700);
      display: inline-flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 18px; }
    .done h2 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h2); color: var(--text-strong); }
    .done p { color: var(--text-body); line-height: 1.6; margin: 12px auto 0; max-width: 44ch; }
    `;
    document.head.appendChild(el);
  }
  const ROLES = ["Resident", "Entrepreneur", "Volunteer", "Maker", "Organizer", "Other"];

  /* ---------------- About / The Chair ---------------- */
  function About({
    go,
    collected
  }) {
    const imgs = ["interior-1.jpg", "hero.jpg", "interior-3.jpg", "shop-2.jpg"].map(n => `../../assets/img/${n}`);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("section", {
      className: "about-hero"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow",
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--text-muted)"
      }
    }, "The chair \xB7 The format \xB7 The maker"), /*#__PURE__*/React.createElement("h1", null, "A barbershop is where a neighbourhood talks to itself."), /*#__PURE__*/React.createElement("p", null, "ClipperTakes takes that idea on the road. Ivan Winter \u2014 a barber and theatre maker \u2014 brings a travelling chair to Rotterdam's streets, markets and festivals. You sit down for a haircut. While the clippers run, he asks one question. The conversation becomes a two-to-three minute portrait."), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 16
      }
    }, "Fifty portraits, numbered one to fifty, building a public archive of the city's ordinary, extraordinary voices \u2014 neighbours, makers, organisers. Not influencers. Not celebrities. People you'd recognise before you'd follow."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 26,
        display: "flex",
        gap: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => go("submit")
    }, "Tell your story"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => go("stories")
    }, "See the archive \u2192"))), /*#__PURE__*/React.createElement("div", {
      className: "about-media"
    }, /*#__PURE__*/React.createElement("img", {
      src: imgs[0],
      alt: "The travelling chair"
    })))), /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "steps"
    }, /*#__PURE__*/React.createElement("div", {
      className: "step"
    }, /*#__PURE__*/React.createElement("div", {
      className: "step__n"
    }, "01"), /*#__PURE__*/React.createElement("h4", null, "The chair arrives"), /*#__PURE__*/React.createElement("p", null, "It travels to a neighbourhood \u2014 a market square, a festival, a quiet street corner \u2014 and sets up where people already are.")), /*#__PURE__*/React.createElement("div", {
      className: "step"
    }, /*#__PURE__*/React.createElement("div", {
      className: "step__n"
    }, "02"), /*#__PURE__*/React.createElement("h4", null, "One question"), /*#__PURE__*/React.createElement("p", null, "You sit down for a real haircut. While the clippers run, there's one question, and time to actually answer it.")), /*#__PURE__*/React.createElement("div", {
      className: "step"
    }, /*#__PURE__*/React.createElement("div", {
      className: "step__n"
    }, "03"), /*#__PURE__*/React.createElement("h4", null, "A portrait is kept"), /*#__PURE__*/React.createElement("p", null, "The conversation becomes a short film, numbered and added to the archive of fifty \u2014 for the city to keep and come back to.")))), /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "photo-strip"
    }, imgs.map((src, i) => /*#__PURE__*/React.createElement("div", {
      key: i
    }, /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: ""
    }))))), /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement(Card, {
      padding: "lg",
      shadow: "sm"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 28,
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "32ch"
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "var(--font-serif)",
        fontSize: "var(--text-h3)",
        color: "var(--text-strong)",
        marginBottom: 8
      }
    }, "The archive is ", collected, " of ", TARGET, ", and growing."), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--text-body)",
        lineHeight: 1.6
      }
    }, "Every session adds a voice. Want to be one of them, or point us toward someone who should be?")), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 240,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement(ProgressCounter, {
      count: collected,
      total: TARGET,
      size: "md"
    })))))));
  }

  /* ---------------- Submit Your Story ---------------- */
  function SubmitStory({
    onSubmit
  }) {
    const [f, setF] = React.useState({
      name: "",
      neighborhood: "",
      role: "",
      date: "",
      about: "",
      link: "",
      keep: true
    });
    const [done, setDone] = React.useState(null);
    const set = k => e => setF({
      ...f,
      [k]: e.currentTarget ? e.currentTarget.value : e.target.value
    });
    const submit = e => {
      e.preventDefault();
      if (!f.name.trim()) return;
      const number = onSubmit(f);
      setDone({
        name: f.name.trim(),
        number
      });
    };
    if (done) {
      return /*#__PURE__*/React.createElement("div", {
        className: "wrap"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-page"
      }, /*#__PURE__*/React.createElement("div", {
        className: "done"
      }, /*#__PURE__*/React.createElement("div", {
        className: "done__mark"
      }, "\u2713"), /*#__PURE__*/React.createElement("h2", null, "Thank you, ", done.name.split(" ")[0], "."), /*#__PURE__*/React.createElement("p", null, "You're pencilled in as ", /*#__PURE__*/React.createElement("b", null, "Story ", String(done.number).padStart(2, "0"), " / ", TARGET), ", waiting in the chair. We'll reach out to find a time and a place. No haircut is mandatory \u2014 but it's encouraged."))));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-page"
    }, /*#__PURE__*/React.createElement("span", {
      className: "form-page__kick"
    }, "An invitation \u2014 not a booking"), /*#__PURE__*/React.createElement("h1", null, "Tell us who you are."), /*#__PURE__*/React.createElement("p", {
      className: "form-page__lead"
    }, "If you'd like to sit in the chair, leave a few details and we'll be in touch. There's no form to perfect here \u2014 just the start of a conversation."), /*#__PURE__*/React.createElement("form", {
      className: "form-fields",
      onSubmit: submit
    }, /*#__PURE__*/React.createElement(TextInput, {
      label: "Your name",
      placeholder: "First and last",
      value: f.name,
      onChange: set("name"),
      required: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "form-grid2"
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Your neighbourhood",
      placeholder: "Where in Rotterdam?",
      value: f.neighborhood,
      onChange: set("neighborhood"),
      data: NEIGHBORHOODS
    }), /*#__PURE__*/React.createElement(Select, {
      label: "You are a\u2026",
      placeholder: "Pick the closest",
      value: f.role,
      onChange: set("role"),
      data: ROLES
    })), /*#__PURE__*/React.createElement(TextInput, {
      label: "A time that might suit you",
      type: "date",
      value: f.date,
      onChange: set("date"),
      hint: "Just a rough preference \u2014 we'll confirm."
    }), /*#__PURE__*/React.createElement(TextInput, {
      label: "What might your story be about?",
      multiline: true,
      rows: 3,
      placeholder: "A sentence or two \u2014 what you'd talk about while the clippers run.",
      value: f.about,
      onChange: set("about")
    }), /*#__PURE__*/React.createElement(TextInput, {
      label: "A video link (optional)",
      placeholder: "Instagram / YouTube link, if you have a clip already",
      value: f.link,
      onChange: set("link"),
      hint: "You can always add this later."
    }), /*#__PURE__*/React.createElement(Switch, {
      label: "I'd like to stay in touch about the project",
      checked: f.keep,
      onChange: e => setF({
        ...f,
        keep: e.currentTarget.checked
      })
    }), /*#__PURE__*/React.createElement("div", {
      className: "form-actions"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      size: "lg",
      type: "submit"
    }, "Send it in"), /*#__PURE__*/React.createElement("span", {
      className: "form-note"
    }, "We read every one. No spam, ever.")))));
  }

  /* ---------------- Recommend Someone ---------------- */
  function Recommend({
    onSubmit
  }) {
    const [f, setF] = React.useState({
      who: "",
      how: "",
      why: "",
      from: ""
    });
    const [done, setDone] = React.useState(false);
    const set = k => e => setF({
      ...f,
      [k]: e.currentTarget.value
    });
    const submit = e => {
      e.preventDefault();
      if (!f.who.trim() || !f.why.trim()) return;
      onSubmit(f);
      setDone(true);
    };
    if (done) {
      return /*#__PURE__*/React.createElement("div", {
        className: "wrap"
      }, /*#__PURE__*/React.createElement("div", {
        className: "form-page"
      }, /*#__PURE__*/React.createElement("div", {
        className: "done"
      }, /*#__PURE__*/React.createElement("div", {
        className: "done__mark"
      }, "\u2713"), /*#__PURE__*/React.createElement("h2", null, "Noted \u2014 thank you."), /*#__PURE__*/React.createElement("p", null, "We'll look into ", /*#__PURE__*/React.createElement("b", null, f.who.trim()), ". Rotterdam helps decide who sits in the chair next, and that's exactly how it should be."))));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-page"
    }, /*#__PURE__*/React.createElement("span", {
      className: "form-page__kick"
    }, "Help us decide who's next"), /*#__PURE__*/React.createElement("h1", null, "Point us toward someone."), /*#__PURE__*/React.createElement("p", {
      className: "form-page__lead"
    }, "Know a Rotterdammer whose story deserves the chair? Tell us about them. This is how the archive stays the city's, not ours."), /*#__PURE__*/React.createElement("form", {
      className: "form-fields",
      onSubmit: submit
    }, /*#__PURE__*/React.createElement(TextInput, {
      label: "Who should we speak to?",
      placeholder: "Their name",
      value: f.who,
      onChange: set("who"),
      required: true
    }), /*#__PURE__*/React.createElement(TextInput, {
      label: "How do you know them?",
      placeholder: "Neighbour, colleague, the baker on your corner\u2026",
      value: f.how,
      onChange: set("how")
    }), /*#__PURE__*/React.createElement(TextInput, {
      label: "Why does their story matter?",
      multiline: true,
      rows: 3,
      placeholder: "One or two sentences is plenty.",
      value: f.why,
      onChange: set("why"),
      required: true
    }), /*#__PURE__*/React.createElement(TextInput, {
      label: "Your name (optional)",
      placeholder: "So we can thank you",
      value: f.from,
      onChange: set("from")
    }), /*#__PURE__*/React.createElement("div", {
      className: "form-actions"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      type: "submit"
    }, "Send recommendation"), /*#__PURE__*/React.createElement("span", {
      className: "form-note"
    }, "Goes to us privately \u2014 nothing is published automatically.")))));
  }
  window.CTForms = {
    About,
    SubmitStory,
    Recommend
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/forms.jsx", error: String((e && e.message) || e) }); }

// ui_kits/site/screens.jsx
try { (() => {
/* ClipperTakes Studio — primary screens: Home, Stories Board, Story detail. */
(function () {
  const NS = window.KiruBarbershopDesignSystem_db9aa3;
  const {
    Button,
    ProgressCounter,
    StoryCard,
    StoryStatusTag,
    NeighborhoodTag,
    ReflectionItem,
    ReflectionForm
  } = NS;
  const {
    TARGET
  } = window.CT_DATA;
  if (!document.getElementById("ct-screens-styles")) {
    const el = document.createElement("style");
    el.id = "ct-screens-styles";
    el.textContent = `
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 56px); }
    .section { padding: clamp(48px, 7vw, 96px) 0; }
    .eyebrow { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-wider);
      text-transform: uppercase; color: var(--text-muted); }

    /* hero */
    .hero { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: clamp(28px, 5vw, 64px); align-items: center;
      padding: clamp(40px, 6vw, 88px) 0 clamp(36px, 5vw, 64px); }
    .hero__title { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-hero);
      line-height: var(--leading-tight); letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 14px 0 0; }
    .hero__lead { font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--text-body);
      max-width: 46ch; margin-top: 22px; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    .hero__media { position: relative; aspect-ratio: 4/5; border-radius: var(--radius-xl); overflow: hidden;
      box-shadow: var(--shadow-image); }
    .hero__media img { width: 100%; height: 100%; object-fit: cover; }
    .hero__stamp { position: absolute; left: 16px; bottom: 16px; font-family: var(--font-mono); font-weight: 700;
      font-size: var(--text-xs); letter-spacing: var(--tracking-wide); text-transform: uppercase;
      color: var(--ink-900); background: var(--yellow-500); padding: 5px 10px; border-radius: var(--radius-sm); }
    @media (max-width: 860px) { .hero { grid-template-columns: 1fr; } .hero__media { max-width: 420px; } }

    /* counter band */
    .band { background-color: var(--petrol-900); background-image: var(--paper-texture); }
    .band__inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px;
      padding: clamp(36px, 5vw, 64px) 0; }
    .band__note { max-width: 34ch; color: var(--petrol-100); line-height: 1.6; font-size: var(--text-base); }

    /* section heads */
    .shead { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
    .shead h2 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h1); color: var(--text-strong); letter-spacing: var(--tracking-snug); }
    .shead p { color: var(--text-muted); margin-top: 8px; max-width: 52ch; line-height: 1.6; }

    .grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(248px, 1fr)); gap: clamp(16px, 2vw, 26px); }

    .hoods { display: flex; flex-wrap: wrap; gap: 10px; }

    /* stories board header */
    .board-head { padding: clamp(36px, 5vw, 64px) 0 8px; }
    .board-head h1 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-display);
      letter-spacing: var(--tracking-tight); color: var(--text-strong); }
    .board-filter { position: sticky; top: 65px; z-index: 10; padding: 18px 0; margin-bottom: 8px;
      background: color-mix(in srgb, var(--surface-page) 90%, transparent); backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-hairline); }

    /* story detail */
    .back { display: inline-flex; align-items: center; gap: 8px; margin: 28px 0 0; font-size: 14px; color: var(--text-muted);
      background: none; border: 0; cursor: pointer; font-family: var(--font-sans); }
    .back:hover { color: var(--text-strong); }
    .detail-hero { display: grid; grid-template-columns: 0.92fr 1.08fr; gap: clamp(28px, 4vw, 56px); align-items: start;
      padding: 24px 0 clamp(36px, 5vw, 56px); }
    .detail-media { position: relative; aspect-ratio: 4/5; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-image); }
    .detail-media img { width: 100%; height: 100%; object-fit: cover; }
    .detail-media .stamp { position: absolute; left: 16px; top: 16px; font-family: var(--font-mono); font-weight: 700;
      font-size: var(--text-xs); letter-spacing: var(--tracking-wide); text-transform: uppercase;
      color: var(--ink-900); background: var(--yellow-500); padding: 5px 10px; border-radius: var(--radius-sm); }
    .detail-name { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-display);
      line-height: 1.04; letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 14px 0 0; }
    .detail-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-top: 14px; color: var(--text-muted); font-size: 15px; }
    .detail-meta b { color: var(--clay-600); font-weight: 600; }
    .detail-meta .d { width: 3px; height: 3px; border-radius: 50%; background: var(--paper-300); }
    .qa { margin-top: 30px; border-top: 1.5px solid var(--border-default); padding-top: 26px; }
    .qa__q { font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-muted); }
    .qa__a { font-family: var(--font-serif); font-size: var(--text-quote); line-height: var(--leading-quote);
      color: var(--coffee-900); margin-top: 14px; }
    @media (max-width: 860px) { .detail-hero { grid-template-columns: 1fr; } .detail-media { max-width: 420px; } }

    .reflections { max-width: 720px; }
    .reflections h3 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h2); color: var(--text-strong); margin-bottom: 6px; }
    .reflections__sub { color: var(--text-muted); margin-bottom: 18px; }
    .reflections__list { margin-bottom: 26px; }
    .reflections__empty { color: var(--text-faint); font-style: italic; font-family: var(--font-serif); font-size: 18px; padding: 14px 0 26px; }
    `;
    document.head.appendChild(el);
  }
  function pad(n) {
    return String(n).padStart(2, "0");
  }

  /* ---------------- Home ---------------- */
  function Home({
    stories,
    collected,
    go,
    openStory
  }) {
    const recent = stories.filter(s => s.status === "published").slice(0, 4);
    const lead = stories[0];
    const hoodCounts = {};
    stories.filter(s => s.status === "published").forEach(s => {
      hoodCounts[s.neighborhood] = (hoodCounts[s.neighborhood] || 0) + 1;
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("section", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow"
    }, "Rotterdam \xB7 A living archive \xB7 2026"), /*#__PURE__*/React.createElement("h1", {
      className: "hero__title"
    }, "50 Conversations.", /*#__PURE__*/React.createElement("br", null), "One City."), /*#__PURE__*/React.createElement("p", {
      className: "hero__lead"
    }, "A barber chair travels through Rotterdam. People sit down, the clippers start, and we ask one question. The conversation becomes a short portrait \u2014 a voice from the neighbourhood, kept for everyone."), /*#__PURE__*/React.createElement("div", {
      className: "hero__cta"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "lg",
      onClick: () => go("stories")
    }, "Explore the Stories"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "lg",
      onClick: () => go("about")
    }, "About the chair"))), /*#__PURE__*/React.createElement("div", {
      className: "hero__media"
    }, /*#__PURE__*/React.createElement("img", {
      src: lead.image,
      alt: "In the chair"
    }), /*#__PURE__*/React.createElement("span", {
      className: "hero__stamp"
    }, "Story ", pad(lead.number), " / ", TARGET)))), /*#__PURE__*/React.createElement("div", {
      className: "band"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrap band__inner"
    }, /*#__PURE__*/React.createElement(ProgressCounter, {
      count: collected,
      total: TARGET,
      size: "lg",
      onDark: true
    }), /*#__PURE__*/React.createElement("p", {
      className: "band__note"
    }, "Every story published brings the archive closer to fifty. This is the count a funder, a neighbour, or a future participant sees first."))), /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("section", {
      className: "section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "shead"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow"
    }, "Recently in the chair"), /*#__PURE__*/React.createElement("h2", null, "Voices from the neighbourhood")), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => go("stories")
    }, "See all stories \u2192")), /*#__PURE__*/React.createElement("div", {
      className: "grid-cards"
    }, recent.map(s => /*#__PURE__*/React.createElement(StoryCard, {
      key: s.id,
      number: s.number,
      total: TARGET,
      name: s.name,
      role: s.role,
      neighborhood: s.neighborhood,
      image: s.image,
      teaser: `“${s.answer.split(". ")[0]}.”`,
      statusTag: /*#__PURE__*/React.createElement(StoryStatusTag, {
        status: "published"
      }),
      as: "button",
      onClick: () => openStory(s.id)
    })))), /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        paddingTop: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "shead"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow"
    }, "Where the chair has been"), /*#__PURE__*/React.createElement("h2", null, "Rotterdam, neighbourhood by neighbourhood"), /*#__PURE__*/React.createElement("p", null, "The chair moves on. Each neighbourhood adds its own accent to the archive."))), /*#__PURE__*/React.createElement("div", {
      className: "hoods"
    }, Object.keys(hoodCounts).map(h => /*#__PURE__*/React.createElement(NeighborhoodTag, {
      key: h,
      name: h,
      count: hoodCounts[h],
      as: "button",
      onClick: () => go("stories")
    }))))));
  }

  /* ---------------- Stories Board ---------------- */
  function StoriesBoard({
    stories,
    collected,
    openStory
  }) {
    const [filter, setFilter] = React.useState("all");
    const hoods = {};
    stories.forEach(s => {
      hoods[s.neighborhood] = (hoods[s.neighborhood] || 0) + 1;
    });
    const visible = stories.filter(s => filter === "all" || s.neighborhood === filter);
    return /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("section", {
      className: "board-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "eyebrow"
    }, "The archive \xB7 ", collected, " of ", TARGET, " collected"), /*#__PURE__*/React.createElement("h1", null, "The Stories"), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 560,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement(ProgressCounter, {
      count: collected,
      total: TARGET,
      size: "md"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "board-filter"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hoods"
    }, /*#__PURE__*/React.createElement(NeighborhoodTag, {
      name: "All of Rotterdam",
      count: stories.length,
      active: filter === "all",
      as: "button",
      onClick: () => setFilter("all")
    }), Object.keys(hoods).map(h => /*#__PURE__*/React.createElement(NeighborhoodTag, {
      key: h,
      name: h,
      count: hoods[h],
      active: filter === h,
      as: "button",
      onClick: () => setFilter(h)
    })))), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "20px 0 88px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid-cards"
    }, visible.map(s => /*#__PURE__*/React.createElement(StoryCard, {
      key: s.id,
      number: s.number,
      total: TARGET,
      name: s.name,
      role: s.role,
      neighborhood: s.neighborhood,
      image: s.image,
      teaser: s.status === "published" ? `“${s.answer.split(". ")[0]}.”` : undefined,
      status: s.status,
      statusTag: /*#__PURE__*/React.createElement(StoryStatusTag, {
        status: s.status
      }),
      as: "button",
      onClick: () => s.status === "published" && openStory(s.id)
    })))));
  }

  /* ---------------- Story Detail ---------------- */
  function StoryDetail({
    story,
    reflections,
    onReflect,
    back,
    go
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "wrap"
    }, /*#__PURE__*/React.createElement("button", {
      className: "back",
      onClick: back
    }, "\u2190 Back to the stories"), /*#__PURE__*/React.createElement("section", {
      className: "detail-hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail-media"
    }, /*#__PURE__*/React.createElement("img", {
      src: story.image,
      alt: `Portrait of ${story.name}`
    }), /*#__PURE__*/React.createElement("span", {
      className: "stamp"
    }, "Story ", pad(story.number), " / ", TARGET)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(StoryStatusTag, {
      status: story.status
    }), /*#__PURE__*/React.createElement("h1", {
      className: "detail-name"
    }, story.name), /*#__PURE__*/React.createElement("div", {
      className: "detail-meta"
    }, /*#__PURE__*/React.createElement("b", null, story.role), /*#__PURE__*/React.createElement("span", {
      className: "d"
    }), /*#__PURE__*/React.createElement("span", null, story.neighborhood), /*#__PURE__*/React.createElement("span", {
      className: "d"
    }), /*#__PURE__*/React.createElement("span", null, story.date)), /*#__PURE__*/React.createElement("div", {
      className: "qa"
    }, /*#__PURE__*/React.createElement("div", {
      className: "qa__q"
    }, story.question), /*#__PURE__*/React.createElement("p", {
      className: "qa__a"
    }, "\u201C", story.answer, "\u201D")))), /*#__PURE__*/React.createElement("section", {
      className: "section",
      style: {
        paddingTop: "clamp(28px,4vw,56px)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "reflections"
    }, /*#__PURE__*/React.createElement("h3", null, "Reflections"), /*#__PURE__*/React.createElement("p", {
      className: "reflections__sub"
    }, "Read this story? Leave a short response \u2014 a sentence is plenty. Like a word dropped in the barbershop on your way out."), /*#__PURE__*/React.createElement("div", {
      className: "reflections__list"
    }, reflections.length === 0 ? /*#__PURE__*/React.createElement("div", {
      className: "reflections__empty"
    }, "No reflections yet. Be the first to respond.") : reflections.map((r, i) => /*#__PURE__*/React.createElement(ReflectionItem, {
      key: i,
      text: r.text,
      name: r.name,
      neighborhood: r.neighborhood,
      date: r.date
    }))), /*#__PURE__*/React.createElement(ReflectionForm, {
      onSubmit: onReflect
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 40
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      onClick: () => go("recommend")
    }, "Know who should sit in the chair next? \u2192"))));
  }
  window.CTScreens = {
    Home,
    StoriesBoard,
    StoryDetail
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/site/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextInput = __ds_scope.TextInput;

__ds_ns.NeighborhoodTag = __ds_scope.NeighborhoodTag;

__ds_ns.ProgressCounter = __ds_scope.ProgressCounter;

__ds_ns.ReflectionForm = __ds_scope.ReflectionForm;

__ds_ns.ReflectionItem = __ds_scope.ReflectionItem;

__ds_ns.StoryCard = __ds_scope.StoryCard;

__ds_ns.StoryStatusTag = __ds_scope.StoryStatusTag;

})();
