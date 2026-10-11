/** @format */

const RELEASES = [
  {
    title: "Amanzi",
    type: "Single",
    year: 2024,
    label: "Amapiano Worldwide",
    streams: "2.4M",
    cover: null,
    spotify: "https://open.spotify.com/",
    apple: "https://music.apple.com/",
  },
  {
    title: "Sgubhu Sessions Vol. 3",
    type: "EP",
    year: 2024,
    label: "Amapiano Worldwide",
    streams: "1.8M",
    cover: null,
    spotify: "https://open.spotify.com/",
    apple: "https://music.apple.com/",
  },
  {
    title: "Langa (feat. Kabza)",
    type: "Single",
    year: 2023,
    label: "Amapiano Worldwide",
    streams: "3.1M",
    cover: null,
    spotify: "https://open.spotify.com/",
    apple: "https://music.apple.com/",
  },
  {
    title: "Roots & Routes",
    type: "Album",
    year: 2023,
    label: "Self-released",
    streams: "5.2M",
    cover: null,
    spotify: "https://open.spotify.com/",
    apple: "https://music.apple.com/",
  },
];

const MIXES = [
  {
    title: "Fabric Live — London 2024",
    desc: "Recorded live at Fabric, Room 1. Full 3-hour set.",
    youtubeId: null,
    soundcloud: "https://soundcloud.com/",
  },
  {
    title: "Boiler Room Amsterdam",
    desc: "Amapiano takeover. 90-minute set, recorded 2023.",
    youtubeId: null,
    soundcloud: "https://soundcloud.com/",
  },
];

export default function MusicPage() {
  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{
        paddingTop: 140, paddingBottom: 80,
        padding: "140px clamp(20px,5vw,64px) 80px",
        borderBottom: "1px solid #1A1A1A",
      }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>DISCOGRAPHY</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: 0 }}>Music</h1>
      </section>

      {/* Releases */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>Releases</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {RELEASES.map(r => (
              <div key={r.title} style={{ background: "#110808", border: "1px solid #1A1A1A", padding: 24, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#9B1D20")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1E0E0E")}
              >
                <div style={{ width: "100%", aspectRatio: "1", background: "#1E0E0E", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 40, color: "#9B1D20", fontWeight: 700 }}>DS</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#EAD5C8" }}>{r.title}</h3>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.14em", color: "#9B1D20", textTransform: "uppercase", whiteSpace: "nowrap", marginLeft: 12 }}>{r.type}</span>
                </div>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: "#5A3A32" }}>{r.label} · {r.year}</p>
                <p style={{ margin: "0 0 20px", fontSize: 13, color: "#3D2020" }}>{r.streams} streams</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <a href={r.spotify} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#1DB954", textDecoration: "none", border: "1px solid #1DB954", padding: "8px 14px" }}>Spotify</a>
                  <a href={r.apple} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FC3C44", textDecoration: "none", border: "1px solid #FC3C44", padding: "8px 14px" }}>Apple</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mixes */}
      <section style={{ padding: "0 clamp(20px,5vw,64px) 80px", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 80 }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>Live Mixes & Sets</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {MIXES.map(m => (
              <div key={m.title} style={{ background: "#110808", border: "1px solid #1A1A1A", padding: 32 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
                  <div>
                    <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600, color: "#EAD5C8" }}>{m.title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: "#5A3A32" }}>{m.desc}</p>
                  </div>
                  <a href={m.soundcloud} target="_blank" rel="noopener noreferrer" style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#FF5500", textDecoration: "none", border: "1px solid #FF5500", padding: "10px 18px", whiteSpace: "nowrap" }}>SoundCloud</a>
                </div>
                <div style={{ width: "100%", aspectRatio: "16/9", background: "#0A0504", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #1A1A1A" }}>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, letterSpacing: "0.14em", color: "#3D2020", textTransform: "uppercase" }}>Video embed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streaming CTA */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", background: "#050505", borderTop: "1px solid #1A1A1A", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Stream Now</p>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px,4vw,40px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 40px" }}>Find Donn Stone On Every Platform</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {[
            { label: "Spotify", color: "#1DB954", href: "https://open.spotify.com/" },
            { label: "Apple Music", color: "#FC3C44", href: "https://music.apple.com/" },
            { label: "SoundCloud", color: "#FF5500", href: "https://soundcloud.com/" },
            { label: "YouTube", color: "#FF0000", href: "https://youtube.com/" },
            { label: "Beatport", color: "#02FF95", href: "https://beatport.com/" },
          ].map(p => (
            <a key={p.label} href={p.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
              color: p.color, textDecoration: "none", border: `1px solid ${p.color}`, padding: "14px 28px", transition: "background 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = "#0A0504"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.color; }}
            >{p.label}</a>
          ))}
        </div>
      </section>
    </div>
  );
}
