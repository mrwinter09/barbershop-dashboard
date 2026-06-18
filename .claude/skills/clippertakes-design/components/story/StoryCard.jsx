import React from "react";

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
export function StoryCard({
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
  return (
    <Tag className={cls} {...props}>
      <div className="ct-storycard__media">
        {image ? (
          <img className="ct-storycard__img" src={image} alt={name ? `Portrait of ${name}` : "Story portrait"} />
        ) : null}
        {number != null && (
          <span className="ct-storycard__num">Story {pad(number)} / {total}</span>
        )}
        {statusTag && <span className="ct-storycard__status">{statusTag}</span>}
      </div>
      <div className="ct-storycard__body">
        <div className="ct-storycard__name">{name}</div>
        <div className="ct-storycard__meta">
          {role && <b>{role}</b>}
          {role && neighborhood && <span className="ct-dot" aria-hidden="true"></span>}
          {neighborhood && <span>{neighborhood}</span>}
        </div>
        {teaser && <p className="ct-storycard__teaser">{teaser}</p>}
      </div>
    </Tag>
  );
}
