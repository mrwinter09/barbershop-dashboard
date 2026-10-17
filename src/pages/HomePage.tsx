/** @format */

import { Link } from "react-router-dom";

const HERO_VIDEO_ID = "ZBYdlg3qv40";

const SHOWS = [
  { year: "2026", venue: "Bairro", city: "Rotterdam", note: "Summer all-night residency" },
  { year: "2026", venue: "Toffler", city: "Rotterdam", note: "All-night long" },
  { year: "2024", venue: "Paradiso / Parallel", city: "Amsterdam", note: "Back-to-back with Wes Lee (WaxFiend)" },
  { year: "2024", venue: "Paradiso / Parallel — WOZA", city: "Amsterdam", note: "With Drumetic Boyz" },
  { year: "2024", venue: "Toffler", city: "Rotterdam", note: "All-night solo set" },
  { year: "ADE", venue: "Amsterdam Dance Event", city: "Amsterdam", note: "Official ADE artist" },
];

const CITIES = ["Rotterdam", "Amsterdam", "London", "Paris", "Johannesburg", "Helsinki", "Antwerp", "Luxembourg"];

export default function HomePage() {
  return (
    <div style={{ background: "#0A0504", color: "#EAD5C8" }}>

      {/* ── Fullscreen video hero ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${HERO_VIDEO_ID}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
          allow="autoplay; encrypted-media"
          style={{
            position: "absolute", top: "50%", left: "50%",
            width: "100vw", height: "56.25vw",
            minHeight: "100vh", minWidth: "177.78vh",
            transform: "translate(-50%, -50%)",
            border: "none", pointerEvents: "none",
          }}
          title="Donn Stone live"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,5,4,0.5) 0%, rgba(10,5,4,0.25) 40%, rgba(10,5,4,0.88) 100%)" }} />

        <div style={{
          position: "relative", zIndex: 2, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 clamp(20px,5vw,64px) clamp(48px,8vh,96px)",
        }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16, animation: "fadeUp 0.8s ease both" }}>Rotterdam · Netherlands</p>
          <h1 style={{
            fontFamily: '"Space Mono", monospace', fontWeight: 700,
            fontSize: "clamp(48px,10vw,120px)", lineHeight: 0.9, letterSpacing: "0.04em",
            textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 8px",
            animation: "fadeUp 0.9s ease 0.1s both",
          }}>
            <span style={{ display: "block" }}>DONN</span>
            <span style={{ display: "block", color: "#9B1D20" }}>STONE</span>
          </h1>
          <p style={{ fontSize: "clamp(14px,2vw,18px)", color: "rgba(234,213,200,0.65)", marginBottom: 40, letterSpacing: "0.06em", animation: "fadeUp 1s ease 0.2s both" }}>
            Electronic Powerhouse &amp; DJ
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 1s ease 0.3s both" }}>
            <Link to="/booking" style={{
              fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "16px 36px",
            }}>Book Donn Stone</Link>
          </div>
        </div>
      </section>

      {/* ── Cities strip ── */}
      <section style={{ borderTop: "1px solid #1E0E0E", borderBottom: "1px solid #1E0E0E", padding: "20px clamp(20px,5vw,64px)" }}>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {CITIES.map(c => (
            <span key={c} style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7A6060" }}>{c}</span>
          ))}
        </div>
      </section>

      {/* ── Bio ── */}
      <section style={{ padding: "clamp(64px,10vw,120px) clamp(20px,5vw,64px)" }}>
        <div className="ds-home-bio" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 24 }}>About</p>
            <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px,4vw,40px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 24px", lineHeight: 1.1 }}>Electronic Powerhouse from Rotterdam</h2>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#BFA8A0", marginBottom: 16 }}>
              Donn Stone is an Electronic powerhouse from Rotterdam. Known for his expensive musical taste and undeniable dancefloor energy. His unique style has resonated with audiences worldwide.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: "#BFA8A0", marginBottom: 32 }}>
              Bringing a masterful fusion of rhythmic, melodic and uplifting electronic selections with an energetic and culturally rich vibe to every set. From Rotterdam's Toffler and Amsterdam's Paradiso to stages across 50+ countries worldwide.
            </p>
            <Link to="/press" style={{
              fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#9B1D20", textDecoration: "none", borderBottom: "1px solid #9B1D20", paddingBottom: 4,
            }}>Full Bio</Link>
          </div>
          <div className="ds-home-bio-photo" style={{ aspectRatio: "3/4", background: "#110808", border: "1px solid #1E0E0E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 56, color: "#1E0E0E", fontWeight: 700 }}>DS</span>
          </div>
        </div>
      </section>

      {/* ── Past shows ── */}
      <section style={{ borderTop: "1px solid #1E0E0E", padding: "clamp(64px,10vw,120px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 48 }}>Select Shows</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SHOWS.map((s, i) => (
              <div key={i} className="ds-shows-row">
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: "#9B1D20" }}>{s.year}</span>
                <div>
                  <span style={{ fontSize: 17, fontWeight: 600, color: "#EAD5C8", marginRight: 12 }}>{s.venue}</span>
                  <span style={{ fontSize: 14, color: "#BFA8A0" }}>{s.city}</span>
                </div>
                <span className="ds-shows-row-note" style={{ fontSize: 13, color: "#7A6060", fontStyle: "italic" }}>{s.note}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <Link to="/tour" style={{
              fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#EAD5C8", textDecoration: "none", border: "1px solid #3D2020", padding: "12px 24px",
            }}>All Tour Dates</Link>
          </div>
        </div>
      </section>

      {/* ── Press logos strip ── */}
      <section style={{ borderTop: "1px solid #1E0E0E", padding: "48px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060", marginBottom: 32, textAlign: "center" }}>Supported by</p>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
            {["Paradiso Amsterdam", "Toffler Rotterdam", "ADE", "Operator Radio", "ECR Radio"].map(p => (
              <span key={p} style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#7A6060" }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section style={{ background: "#9B1D20", padding: "clamp(64px,10vw,120px) clamp(20px,5vw,64px)", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(234,213,200,0.55)", marginBottom: 16 }}>Worldwide Bookings</p>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px,5vw,56px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 32px" }}>Book Donn Stone</h2>
        <Link to="/booking" style={{
          fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#9B1D20", background: "#EAD5C8", textDecoration: "none", padding: "18px 48px",
        }}>Send Enquiry</Link>
      </section>
    </div>
  );
}
