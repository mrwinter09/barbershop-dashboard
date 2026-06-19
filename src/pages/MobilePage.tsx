/** @format */

import { useState, useRef, useEffect } from "react";
import { loadStories, loadReflections } from "../features/stories/api/stories.storage";
import { SEED_STORIES, SEED_REFLECTIONS, TARGET, NEIGHBORHOODS } from "../features/stories/api/seed";
import type { Story, Reflection } from "../features/stories/types/Story";

// ─── Design tokens (inline — no Mantine, pure mobile shell) ─────────────────

const T = {
  serif: '"Newsreader", Georgia, serif',
  sans: '"Hanken Grotesk", system-ui, sans-serif',
  mono: '"Space Mono", monospace',
  paper: "#F5EEDF",
  paper0: "#FCF8F0",
  petrol7: "#15454F",
  petrol9: "#0C2A30",
  petrol1: "#CBDEE0",
  clay6: "#C26B4A",
  moss6: "#5E6E44",
  moss1: "#DEE3CC",
  yellow: "#F2C200",
  ink: "#211A12",
  body: "#3F2D20",
  muted: "#9C8466",
  faint: "#CBB994",
  border: "#E0D3B8",
  card: "#FCF8F0",
};

const PAPER_TEX = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")";

function pad(n: number) { return String(n).padStart(2, "0"); }

// ─── Data helpers ─────────────────────────────────────────────────────────────

function getStories(): Story[] {
  return (loadStories() as Story[] | null) ?? SEED_STORIES;
}
function getReflections(): Record<string, Reflection[]> {
  const r = loadReflections();
  return Object.keys(r).length ? r : SEED_REFLECTIONS;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const Ico = {
  stories: (a: boolean) => (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16M4 12h16M4 19h10"/>
    </svg>
  ),
  about: (a: boolean) => (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>
    </svg>
  ),
  tell: (a: boolean) => (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={a ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.5 15.5M14.5 14.5 20 20M8.5 8.5 11 11"/>
    </svg>
  ),
};

// ─── Bottom tab bar ───────────────────────────────────────────────────────────

type Tab = "stories" | "about" | "tell";

function TabBar({ active, onNav, dark }: { active: Tab; onNav: (t: Tab) => void; dark?: boolean }) {
  const TABS: [Tab, string][] = [["stories", "Stories"], ["about", "The Chair"], ["tell", "Tell yours"]];
  const bg = dark ? "linear-gradient(to top, rgba(0,0,0,.65), transparent)" : "rgba(252,248,240,.88)";
  const activeCl = dark ? "#fff" : T.petrol7;
  const inactiveCl = dark ? "rgba(255,255,255,.55)" : T.muted;
  return (
    <div style={{ display: "flex", padding: "8px 12px calc(16px + env(safe-area-inset-bottom, 0px))", gap: 4, background: bg, backdropFilter: "blur(12px)", borderTop: dark ? "none" : `1px solid ${T.border}` }}>
      {TABS.map(([k, label]) => (
        <button
          key={k}
          onClick={() => onNav(k)}
          style={{ flex: 1, background: "none", border: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "5px 0", fontFamily: T.sans, fontSize: 10, fontWeight: 600, color: active === k ? activeCl : inactiveCl }}
        >
          {Ico[k](active === k)}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Sticky branded header ────────────────────────────────────────────────────

function MHead({ count, back, onBack }: { count?: number; back?: boolean; onBack?: () => void }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 8,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "52px 20px 12px",
      background: "rgba(245,238,223,.88)", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {back && (
          <button onClick={onBack} style={{ width: 32, height: 32, borderRadius: "50%", border: 0, background: T.card, boxShadow: "0 1px 4px rgba(33,26,18,.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginRight: 4 }}>
            <svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M10 2 2 10l8 8" stroke={T.ink} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}
        <span style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 19, letterSpacing: "-.02em", color: T.ink }}>
          Clipper<em style={{ fontStyle: "italic", color: T.clay6 }}>Takes</em>
        </span>
      </div>
      {count != null
        ? <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: ".08em", color: T.ink, background: T.yellow, padding: "4px 9px", borderRadius: 99, fontWeight: 700 }}>{count} / {TARGET}</span>
        : <span />
      }
    </div>
  );
}

// ─── Progress counter ─────────────────────────────────────────────────────────

function ProgressBar({ count, dark }: { count: number; dark?: boolean }) {
  return (
    <div style={{ padding: dark ? "26px 20px" : "16px 20px 8px", background: dark ? T.petrol9 : "transparent", backgroundImage: dark ? PAPER_TEX : "none" }}>
      <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: dark ? T.petrol1 : T.muted, marginBottom: 6 }}>
        {count} / {TARGET} Stories Collected
      </div>
      <div style={{ height: 6, borderRadius: 3, background: dark ? "rgba(255,255,255,.15)" : T.border }}>
        <div style={{ height: "100%", width: `${(count / TARGET) * 100}%`, background: T.yellow, borderRadius: 3, transition: "width .4s" }} />
      </div>
      {dark && <p style={{ color: T.petrol1, marginTop: 14, lineHeight: 1.6, fontSize: 15 }}>Every story brings the archive closer to fifty.</p>}
    </div>
  );
}

// ─── Home screen ──────────────────────────────────────────────────────────────

function MobileHome({ onNav }: { onNav: (t: Tab) => void }) {
  const stories = getStories();
  const published = stories.filter((s) => s.status === "published");
  const lead = published[0];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.paper, backgroundImage: PAPER_TEX }}>
      <MHead count={published.length} />
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" as "touch" }}>
        <div style={{ padding: "22px 20px 6px" }}>
          <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.muted }}>Rotterdam · A living archive</div>
          <h1 style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 40, lineHeight: 1.02, letterSpacing: "-.025em", color: T.ink, margin: "10px 0 0" }}>50 Conversations.<br />One City.</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: T.body, marginTop: 14 }}>A barber chair travels the city. People sit down, the clippers start, and we ask one question. Each answer becomes a short portrait — kept for everyone.</p>
          <button
            onClick={() => onNav("stories")}
            style={{ display: "block", width: "100%", marginTop: 18, padding: 15, border: 0, borderRadius: 8, background: T.yellow, color: T.ink, fontFamily: T.sans, fontSize: 16, fontWeight: 600, cursor: "pointer" }}
          >
            Explore the Stories
          </button>
        </div>
        {lead && (
          <div style={{ position: "relative", margin: "22px 0 0", aspectRatio: "16/12", overflow: "hidden" }}>
            <img src={lead.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(33,26,18,.55), transparent 52%)" }} />
            <span style={{ position: "absolute", left: 16, bottom: 16, fontFamily: T.mono, fontWeight: 700, fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: T.ink, background: T.yellow, padding: "4px 9px", borderRadius: 4 }}>
              Story {pad(lead.number)} / {TARGET}
            </span>
          </div>
        )}
        <ProgressBar count={published.length} dark />
        <div style={{ height: 12 }} />
      </div>
      <TabBar active="about" onNav={onNav} />
    </div>
  );
}

// ─── Stories list ─────────────────────────────────────────────────────────────

function MobileStories({ onOpen, onNav }: { onOpen: (s: Story) => void; onNav: (t: Tab) => void }) {
  const stories = getStories();
  const published = stories.filter((s) => s.status === "published");
  const [filter, setFilter] = useState("All");
  const hoods = ["All", ...NEIGHBORHOODS.slice(0, 6)];
  const list = stories
    .filter((s) => s.status === "published" || s.status === "upcoming")
    .filter((s) => filter === "All" || s.neighborhood === filter);

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.paper, backgroundImage: PAPER_TEX }}>
      <MHead count={published.length} />
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" as "touch" }}>
        {/* Big counter */}
        <div style={{ padding: "20px 20px 10px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, lineHeight: 1 }}>
            <span style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 56, color: T.clay6, letterSpacing: "-.03em" }}>{published.length}</span>
            <span style={{ fontFamily: T.serif, fontWeight: 400, fontSize: 40, color: T.faint, letterSpacing: "-.02em" }}>/ {TARGET}</span>
            <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: T.muted, alignSelf: "flex-end", paddingBottom: 8, marginLeft: 4 }}>Stories collected</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: T.border, marginTop: 8 }}>
            <div style={{ height: "100%", width: `${(published.length / TARGET) * 100}%`, background: T.petrol7, borderRadius: 3 }} />
          </div>
        </div>
        {/* Neighbourhood filter chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "10px 20px 4px", scrollbarWidth: "none" }}>
          {hoods.map((h) => (
            <button
              key={h}
              onClick={() => setFilter(h)}
              style={{
                flexShrink: 0, padding: "8px 14px", borderRadius: 99,
                border: `1.5px solid ${filter === h ? T.petrol7 : T.border}`,
                background: filter === h ? T.petrol7 : "transparent",
                fontFamily: T.sans, fontSize: 13, fontWeight: 600,
                color: filter === h ? T.paper0 : T.body, cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              {h === "All" ? "All of Rotterdam" : h}
            </button>
          ))}
        </div>
        {/* Story rows */}
        <div style={{ padding: "12px 20px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {list.map((s) => (
            <button
              key={s.id}
              onClick={() => s.status === "published" && onOpen(s)}
              style={{
                display: "flex", gap: 14, alignItems: "stretch",
                background: T.card, backgroundImage: PAPER_TEX,
                border: `1px solid ${T.border}`, borderRadius: 12,
                overflow: "hidden", cursor: s.status === "published" ? "pointer" : "default",
                textAlign: "left", padding: 0, fontFamily: T.sans,
                opacity: s.status === "upcoming" ? 0.8 : 1,
              }}
            >
              <img src={s.image} alt={s.name} style={{ width: 92, flexShrink: 0, objectFit: "cover", filter: s.status === "upcoming" ? "grayscale(.5)" : "none" }} />
              <div style={{ padding: "12px 12px 12px 0", display: "flex", flexDirection: "column", gap: 3, minWidth: 0, flex: 1 }}>
                <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, color: T.clay6, letterSpacing: ".04em" }}>STORY {pad(s.number)} / {TARGET}</span>
                <span style={{ fontFamily: T.serif, fontSize: 19, fontWeight: 600, color: T.ink, lineHeight: 1.12 }}>{s.name}</span>
                <span style={{ fontSize: 12.5, color: T.muted }}>{s.role} · {s.neighborhood}</span>
                {s.status === "published" && s.answer
                  ? <span style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 14, color: T.body, lineHeight: 1.4, marginTop: 2, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                      "{s.answer.split(". ")[0]}."
                    </span>
                  : <span style={{ marginTop: 4, fontSize: 12, fontFamily: T.mono, letterSpacing: ".06em", textTransform: "uppercase", color: "#2A6E79" }}>In the chair soon</span>
                }
              </div>
            </button>
          ))}
        </div>
      </div>
      <TabBar active="stories" onNav={onNav} />
    </div>
  );
}

// ─── Immersive story player (TikTok / Reels style) ───────────────────────────

function MobileStory({ story, onNav, onBack }: { story: Story; onNav: (t: Tab) => void; onBack: () => void }) {
  const reflections = getReflections()[story.id] ?? [];
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate progress for portrait image (no real video)
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress((p) => p >= 100 ? 0 : p + 0.3), 80);
    return () => clearInterval(id);
  }, [playing]);

  const MuteIcon = muted
    ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg>
    : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>;

  return (
    <div style={{ position: "relative", height: "100%", width: "100%", overflow: "hidden", background: "#000", fontFamily: T.sans }}>
      {/* Full-screen media */}
      {story.video ? (
        <video
          ref={videoRef}
          src={story.video}
          muted={muted}
          autoPlay
          loop
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          onTimeUpdate={() => {
            const v = videoRef.current;
            if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
          }}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={() => setPlaying((p) => !p)}
        />
      ) : (
        <img
          src={story.image}
          alt={story.name}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          onClick={() => setPlaying((p) => !p)}
        />
      )}

      {/* Gradients */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 220, background: "linear-gradient(to bottom, rgba(0,0,0,.55), transparent)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "62%", background: "linear-gradient(to top, rgba(0,0,0,.88) 4%, rgba(0,0,0,.5) 38%, transparent)", pointerEvents: "none" }} />

      {/* Top bar */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 6, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 18px 0" }}>
        <button
          onClick={onBack}
          style={{ width: 38, height: 38, borderRadius: "50%", border: 0, background: "rgba(255,255,255,.16)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <svg width="11" height="18" viewBox="0 0 12 20" fill="none"><path d="M10 2 2 10l8 8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 18, letterSpacing: "-.02em", color: "#fff" }}>
          Clipper<em style={{ fontStyle: "italic", color: T.yellow }}>Takes</em>
        </span>
        <span style={{ width: 38 }} />
      </div>

      {/* Story stamp */}
      <div style={{ position: "absolute", top: 104, left: 18, zIndex: 6, fontFamily: T.mono, fontWeight: 700, fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: T.ink, background: T.yellow, padding: "4px 9px", borderRadius: 4 }}>
        Story {pad(story.number)} / {TARGET}
      </div>

      {/* Center play/pause */}
      <button
        onClick={() => {
          if (videoRef.current) {
            videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
          }
          setPlaying((p) => !p);
        }}
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 6,
          width: 76, height: 76, borderRadius: "50%", border: 0, cursor: "pointer",
          background: "rgba(255,255,255,.18)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: playing ? 0 : 1, transition: "opacity .25s, transform .25s",
          pointerEvents: playing ? "none" : "auto",
          boxShadow: "0 6px 24px rgba(0,0,0,.3)",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>
      </button>

      {/* Right action rail */}
      <div style={{ position: "absolute", right: 12, bottom: 200, zIndex: 6, display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
        <button
          onClick={() => {
            setMuted((m) => !m);
            if (videoRef.current) videoRef.current.muted = !muted;
          }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: 0, cursor: "pointer", color: "#fff" }}
        >
          <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,.16)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {MuteIcon}
          </span>
          <span style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: ".04em", color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.5)" }}>{muted ? "Muted" : "Sound"}</span>
        </button>
        <button style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: 0, cursor: "pointer", color: "#fff" }}>
          <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,.16)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"/></svg>
          </span>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.5)" }}>{reflections.length}</span>
        </button>
        <button style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: 0, cursor: "pointer", color: "#fff" }}>
          <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,.16)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M16 6 12 2 8 6M12 2v13"/></svg>
          </span>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.5)" }}>Share</span>
        </button>
      </div>

      {/* Bottom caption */}
      <div style={{ position: "absolute", left: 18, right: 78, bottom: 100, zIndex: 6, color: "#fff" }}>
        <div style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 30, lineHeight: 1.05, letterSpacing: "-.02em", textShadow: "0 2px 10px rgba(0,0,0,.4)" }}>{story.name}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 8px", alignItems: "center", marginTop: 7, fontSize: 13, color: "rgba(255,255,255,.92)" }}>
          <strong>{story.role}</strong>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.55)", display: "inline-block" }} />
          <span>{story.neighborhood}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,.55)", display: "inline-block" }} />
          <span>{story.date}</span>
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 16, lineHeight: 1.42, color: "rgba(255,255,255,.96)", marginTop: 12, textShadow: "0 1px 6px rgba(0,0,0,.45)" }}>
          <span style={{ display: "block", fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.yellow, marginBottom: 5 }}>{story.question}</span>
          <span style={expanded ? {} : { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
            "{story.answer}"
          </span>
        </div>
        {story.answer && story.answer.length > 120 && (
          <button onClick={() => setExpanded((e) => !e)} style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: "#fff", opacity: 0.85, marginTop: 6, background: "none", border: 0, cursor: "pointer", padding: 0 }}>
            {expanded ? "Less" : "Read full story"}
          </button>
        )}
      </div>

      {/* Progress scrubber */}
      <div style={{ position: "absolute", left: 14, right: 14, bottom: 84, zIndex: 6, height: 3, borderRadius: 2, background: "rgba(255,255,255,.25)" }}>
        <div style={{ height: "100%", borderRadius: 2, background: T.yellow, width: `${progress}%`, transition: "width .08s linear" }} />
      </div>

      {/* Tab bar over video */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 6 }}>
        <TabBar active="stories" onNav={onNav} dark />
      </div>
    </div>
  );
}

// ─── About screen ──────────────────────────────────────────────────────────────

function MobileAbout({ onNav }: { onNav: (t: Tab) => void }) {
  const stories = getStories();
  const published = stories.filter((s) => s.status === "published");
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.paper, backgroundImage: PAPER_TEX }}>
      <MHead back onBack={() => onNav("stories")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 24px" }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.clay6 }}>The Chair</span>
        <h1 style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 34, lineHeight: 1.06, letterSpacing: "-.02em", color: T.ink, margin: "12px 0 16px" }}>One question.<br />One haircut.<br />One story.</h1>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: T.body }}>
          ClipperTakes is a mobile barber chair that travels through Rotterdam. Founder Ivan Winter — barber and theatre maker — sits people down and asks one question. The conversation that happens while the clippers run becomes a short audiovisual portrait.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: T.body, marginTop: 16 }}>
          The goal is fifty portraits. {published.length} collected so far.
        </p>
        <ProgressBar count={published.length} />
        <button
          onClick={() => onNav("tell")}
          style={{ display: "block", width: "100%", marginTop: 24, padding: 15, border: 0, borderRadius: 8, background: T.petrol7, color: T.paper0, fontFamily: T.sans, fontSize: 16, fontWeight: 600, cursor: "pointer" }}
        >
          Tell your story →
        </button>
      </div>
      <TabBar active="about" onNav={onNav} />
    </div>
  );
}

// ─── Tell your story screen ───────────────────────────────────────────────────

function MobileTell({ onNav }: { onNav: (t: Tab) => void }) {
  const [form, setForm] = useState({ name: "", neighborhood: "", role: "", about: "" });
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const inputStyle: React.CSSProperties = { display: "block", width: "100%", boxSizing: "border-box", padding: "13px 14px", border: `1.5px solid ${T.border}`, borderRadius: 8, background: T.card, fontFamily: T.sans, fontSize: 16, color: T.ink, outline: "none", marginTop: 6 };

  if (done) return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.paper, backgroundImage: PAPER_TEX }}>
      <MHead />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
        <div>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.moss1, color: T.moss6, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18 }}>✓</div>
          <h2 style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 28, color: T.ink, margin: "0 0 16px" }}>Thank you, {form.name.split(" ")[0]}.</h2>
          <p style={{ color: T.body, lineHeight: 1.6 }}>We'll be in touch to find a time and place for the chair.</p>
          <button onClick={() => onNav("stories")} style={{ marginTop: 24, padding: "14px 28px", border: 0, borderRadius: 8, background: T.petrol7, color: T.paper0, fontFamily: T.sans, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>Back to the stories →</button>
        </div>
      </div>
      <TabBar active="tell" onNav={onNav} />
    </div>
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: T.paper, backgroundImage: PAPER_TEX }}>
      <MHead back onBack={() => onNav("stories")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px 24px" }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: T.clay6 }}>An invitation — not a booking</span>
        <h1 style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 32, lineHeight: 1.06, letterSpacing: "-.02em", color: T.ink, margin: "12px 0 6px" }}>Tell us who you are.</h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: T.body, marginBottom: 22 }}>Leave a few details and we'll reach out. No form to perfect — just the start of a conversation.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.body }}>Your name *</label>
            <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="First and last" />
          </div>
          <div>
            <label style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.body }}>Your neighbourhood</label>
            <select style={{ ...inputStyle, appearance: "none" }} value={form.neighborhood} onChange={set("neighborhood")}>
              <option value="">Where in Rotterdam?</option>
              {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontFamily: T.sans, fontSize: 13, fontWeight: 600, color: T.body }}>What might your story be about?</label>
            <textarea style={{ ...inputStyle, minHeight: 88, resize: "vertical" }} value={form.about} onChange={set("about")} placeholder="A sentence or two." />
          </div>
          <button
            onClick={() => { if (form.name.trim()) setDone(true); }}
            style={{ display: "block", width: "100%", padding: 15, border: 0, borderRadius: 8, background: T.yellow, color: T.ink, fontFamily: T.sans, fontSize: 16, fontWeight: 600, cursor: "pointer", marginTop: 4 }}
          >
            Send it in
          </button>
        </div>
      </div>
      <TabBar active="tell" onNav={onNav} />
    </div>
  );
}

// ─── Mobile App shell ─────────────────────────────────────────────────────────

type Route = { screen: "home" | "stories" | "story" | "about" | "tell"; story?: Story };

export default function MobilePage() {
  const [route, setRoute] = useState<Route>({ screen: "home" });

  const nav = (t: Tab) => {
    if (t === "stories") setRoute({ screen: "stories" });
    else if (t === "about") setRoute({ screen: "home" });
    else if (t === "tell") setRoute({ screen: "tell" });
  };

  return (
    <div style={{ position: "fixed", inset: 0, fontFamily: T.sans, overflow: "hidden" }}>
      {route.screen === "home" && <MobileHome onNav={nav} />}
      {route.screen === "stories" && <MobileStories onOpen={(s) => setRoute({ screen: "story", story: s })} onNav={nav} />}
      {route.screen === "story" && route.story && <MobileStory story={route.story} onNav={nav} onBack={() => setRoute({ screen: "stories" })} />}
      {route.screen === "about" && <MobileAbout onNav={nav} />}
      {route.screen === "tell" && <MobileTell onNav={nav} />}
    </div>
  );
}
