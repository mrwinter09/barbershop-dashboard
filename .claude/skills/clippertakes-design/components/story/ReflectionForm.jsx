import React from "react";
import { TextInput } from "../forms/TextInput.jsx";
import { Button } from "../core/Button.jsx";

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
export function ReflectionForm({
  title = "Leave a reflection",
  hint = "A sentence or two — what this story left with you.",
  onSubmit,
  className = "",
  ...props
}) {
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const handle = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit && onSubmit({ name: name.trim(), text: text.trim() });
    setName("");
    setText("");
  };
  const cls = ["ct-reflectionform", className].filter(Boolean).join(" ");
  return (
    <form className={cls} onSubmit={handle} {...props}>
      <div className="ct-reflectionform__head">
        <div className="ct-reflectionform__title">{title}</div>
        <div className="ct-reflectionform__hint">{hint}</div>
      </div>
      <TextInput
        label="Your name"
        placeholder="First name, or how the neighborhood knows you"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        label="Your reflection"
        multiline
        rows={3}
        placeholder="Write a short response…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="ct-reflectionform__row">
        <Button type="submit" variant="primary">Add reflection</Button>
      </div>
    </form>
  );
}
