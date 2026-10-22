/** @format */

import { useState } from "react";

const VIDEOS = [
  { id: "ZBYdlg3qv40", title: "Donn Stone | Afro House | BAIRRO | Juli 2026",           venue: "Bairro",               year: "2026" },
  { id: "KJiH8x8cAeM", title: "Donn Stone | 3 Step Afro House | BAIRRO | Mar 2026",    venue: "Bairro",               year: "2026" },
  { id: "jgG7z-1uxj8", title: "Objektives Tv Presents Donn Stone",                      venue: "Objektives Tv",        year: "" },
  { id: "nvPEU_9iboA", title: "Donn Stone | BSMNT | Live Mix",                          venue: "BSMNT",                year: "" },
  { id: "3US8qZb2cP8", title: "DJ Set Donn Stone - KAZ - La Rotonde",                   venue: "KAZ",                  year: "" },
  { id: "qLkOGAb2omU", title: "Donn Stone | Operator 18.02.2025",                       venue: "Operator Radio",       year: "2025" },
  { id: "dudLs9Ueru4", title: "My Living Room Ep 1 [Donn Stone]",                       venue: "Living Room",          year: "" },
];

export default function VideoPage() {
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const active = VIDEOS.find(v => v.id === activeId) ?? VIDEOS[0];

  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "120px clamp(20px,5vw,64px) 48px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 12 }}>Performances</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(32px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: 0 }}>Video</h1>
      </section>

      {/* Player + sidebar layout */}
      <section style={{ padding: "48px clamp(20px,5vw,64px) 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div className="ds-video-layout">
            {/* Big player */}
            <div className="ds-video-player">
              <div style={{ border: "1px solid #1E0E0E" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#110808" }}>
                  <iframe
                    key={active.id}
                    src={`https://www.youtube-nocookie.com/embed/${active.id}?rel=0&modestbranding=1&autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                    title={active.title}
                  />
                </div>
                <div style={{ padding: "16px 20px", borderTop: "1px solid #1E0E0E", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h2 style={{ margin: "0 0 4px", fontSize: "clamp(13px,2vw,17px)", fontWeight: 600, color: "#EAD5C8", lineHeight: 1.3 }}>{active.title}</h2>
                    {(active.venue || active.year) && (
                      <p style={{ margin: 0, fontSize: 12, color: "#5A3A32" }}>{[active.venue, active.year].filter(Boolean).join(" · ")}</p>
                    )}
                  </div>
                  <a href={`https://www.youtube.com/watch?v=${active.id}`} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: '"Space Mono", monospace', fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "8px 14px", whiteSpace: "nowrap",
                  }}>↗ YouTube</a>
                </div>
              </div>
            </div>

            {/* Sidebar playlist */}
            <div className="ds-video-sidebar">
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#3D2020", marginBottom: 12 }}>All Videos</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {VIDEOS.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setActiveId(v.id)}
                    style={{
                      display: "flex", gap: 12, alignItems: "flex-start", textAlign: "left",
                      background: v.id === activeId ? "#1E0E0E" : "transparent",
                      border: v.id === activeId ? "1px solid #9B1D20" : "1px solid transparent",
                      padding: "10px 12px", cursor: "pointer", transition: "background 0.15s, border-color 0.15s",
                      width: "100%",
                    }}
                    onMouseEnter={e => { if (v.id !== activeId) e.currentTarget.style.background = "#110808"; }}
                    onMouseLeave={e => { if (v.id !== activeId) e.currentTarget.style.background = "transparent"; }}
                  >
                    {/* Thumbnail */}
                    <div style={{ flexShrink: 0, width: 80, aspectRatio: "16/9", background: "#1E0E0E", position: "relative", overflow: "hidden" }}>
                      <img
                        src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                        alt=""
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      {v.id === activeId && (
                        <div style={{ position: "absolute", inset: 0, background: "rgba(155,29,32,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "#EAD5C8", fontSize: 16 }}>▶</span>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 500, color: v.id === activeId ? "#EAD5C8" : "#7A5A52", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{v.title}</p>
                      {v.venue && <p style={{ margin: 0, fontSize: 11, color: "#3D2020" }}>{v.venue}</p>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SoundCloud CTA */}
      <section style={{ borderTop: "1px solid #1E0E0E", padding: "56px clamp(20px,5vw,64px)", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 12 }}>Mixes</p>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(18px,3vw,28px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 12px" }}>Full Sets on SoundCloud</h2>
        <p style={{ fontSize: 14, color: "#5A3A32", maxWidth: 380, margin: "0 auto 28px", lineHeight: 1.7 }}>Recorded sets including the Operator Radio session.</p>
        <a href="https://soundcloud.com/don-stone-2" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#EAD5C8", background: "#FF5500", textDecoration: "none", padding: "14px 32px",
        }}>Open SoundCloud</a>
      </section>

      <style>{`
        .ds-video-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 24px;
          align-items: start;
        }
        .ds-video-player { min-width: 0; }
        .ds-video-sidebar { min-width: 0; }

        @media (max-width: 768px) {
          .ds-video-layout {
            grid-template-columns: 1fr;
          }
          .ds-video-sidebar {
            display: flex;
            flex-direction: column;
          }
          .ds-video-sidebar > div {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px !important;
          }
        }
        @media (max-width: 420px) {
          .ds-video-sidebar > div {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
