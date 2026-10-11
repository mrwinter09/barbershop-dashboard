/** @format */

import { Link } from "react-router-dom";

const PRESS_LOGOS = ["OkayAfrica", "Mixmag", "Beatport", "Trax Magazine", "Music In Africa"];

const STATS = [
  { value: "50+", label: "Countries Played" },
  { value: "200+", label: "Shows Per Year" },
  { value: "10M+", label: "Streams" },
  { value: "5★", label: "Artist Rating" },
];

const PAST_SHOWS = [
  { venue: "Fabric London", city: "London, UK", year: "2024" },
  { venue: "Razzmatazz", city: "Barcelona, ES", year: "2024" },
  { venue: "Hï Ibiza", city: "Ibiza, ES", year: "2024" },
  { venue: "De School", city: "Amsterdam, NL", year: "2023" },
  { venue: "Output", city: "New York, US", year: "2023" },
  { venue: "Rex Club", city: "Paris, FR", year: "2023" },
];

export default function HomePage() {
  return (
    <div style={{ background: "#0A0A0A", color: "#E8E8E8" }}>

      {/* ─── Hero ─── */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
      }}>
        {/* Dark gradient background — placeholder for real photo/video */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #0A0A0A 0%, #1A1200 40%, #0A0A0A 100%)",
        }} />
        {/* Gold radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(242,194,0,0.12) 0%, transparent 70%)",
        }} />
        {/* Scanline texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
          pointerEvents: "none",
        }} />

        <div style={{
          position: "relative", zIndex: 2,
          padding: "clamp(100px,14vw,160px) clamp(20px,6vw,80px) clamp(64px,8vw,100px)",
          maxWidth: 1200, width: "100%", margin: "0 auto",
        }}>
          <p className="ds-fade-up" style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#F2C200",
            marginBottom: 20,
          }}>Amapiano · DJ & Producer · South Africa</p>

          <h1 className="ds-fade-up ds-fade-up-2" style={{
            fontFamily: '"Space Mono", monospace',
            fontWeight: 700,
            fontSize: "clamp(52px, 9vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            margin: "0 0 32px",
          }}>
            DONN<br />
            <span style={{ color: "#F2C200" }}>STONE</span>
          </h1>

          <p className="ds-fade-up ds-fade-up-3" style={{
            fontSize: "clamp(16px, 1.8vw, 20px)",
            lineHeight: 1.65,
            color: "#888888",
            maxWidth: "44ch",
            marginBottom: 40,
          }}>
            Shaping the global sound of Amapiano. From Johannesburg to the world's biggest stages — one beat at a time.
          </p>

          <div className="ds-fade-up ds-fade-up-3" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <Link to="/booking" style={{
              textDecoration: "none",
              background: "#F2C200",
              color: "#0A0A0A",
              fontFamily: '"Space Mono", monospace',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              display: "inline-block",
              transition: "background 0.2s",
            }}>Book Donn Stone</Link>
            <Link to="/press" style={{
              textDecoration: "none",
              background: "transparent",
              color: "#E8E8E8",
              fontFamily: '"Space Mono", monospace',
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "16px 32px",
              border: "1px solid #333333",
              display: "inline-block",
              transition: "border-color 0.2s, color 0.2s",
            }}>Download EPK</Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2,
        }}>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: "0.2em", color: "#444444", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #444444, transparent)" }} />
        </div>
      </section>

      {/* ─── Stats strip ─── */}
      <section style={{
        background: "#111111",
        borderTop: "1px solid #1A1A1A",
        borderBottom: "1px solid #1A1A1A",
        padding: "clamp(32px,5vw,48px) clamp(20px,6vw,80px)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 32,
        }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                color: "#F2C200",
                lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                marginTop: 8,
                fontFamily: '"Space Mono", monospace',
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#555555",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── About / Bio ─── */}
      <section className="ds-section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px, 6vw, 80px)",
          alignItems: "center",
        }} className="ds-about-grid">
          {/* Photo placeholder */}
          <div style={{
            aspectRatio: "3/4",
            background: "linear-gradient(160deg, #1A1200, #0A0A0A)",
            border: "1px solid #1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(242,194,0,0.08), transparent)",
            }} />
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              color: "#333333",
            }}>Artist Photo</span>
          </div>

          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "#F2C200", marginBottom: 20 }}>
              The Artist
            </p>
            <h2 style={{
              fontFamily: '"Space Mono", monospace',
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.1,
              color: "#FFFFFF",
              marginBottom: 24,
            }}>
              The sound that moves<br />a generation.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#888888", marginBottom: 18 }}>
              Donn Stone is an internationally acclaimed Amapiano DJ and producer whose music bridges the vibrant streets of South Africa with the world's most prestigious stages. With a sound rooted in deep log drum rhythms, soulful piano lines and infectious grooves, Donn has become one of the most sought-after acts in the global Amapiano movement.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#888888", marginBottom: 32 }}>
              From headline sets at Fabric London and Hï Ibiza to packed dance floors across Europe, the Americas and the African continent, Donn Stone delivers an experience that transcends language and borders.
            </p>
            <Link to="/press" style={{
              textDecoration: "none",
              fontFamily: '"Space Mono", monospace',
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#F2C200",
              borderBottom: "1px solid #F2C200",
              paddingBottom: 2,
            }}>Full bio & press kit →</Link>
          </div>
        </div>
      </section>

      {/* ─── Music / Mix embed ─── */}
      <section style={{
        background: "#0D0D0D",
        borderTop: "1px solid #1A1A1A",
        borderBottom: "1px solid #1A1A1A",
        padding: "clamp(64px,8vw,96px) clamp(20px,6vw,80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
            <div>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "#F2C200", marginBottom: 12 }}>Latest Mix</p>
              <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", color: "#FFFFFF" }}>
                Hear the Sound
              </h2>
            </div>
            <Link to="/music" style={{
              textDecoration: "none",
              fontFamily: '"Space Mono", monospace',
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#666666",
              borderBottom: "1px solid #333333",
              paddingBottom: 2,
            }}>All releases →</Link>
          </div>

          {/* SoundCloud embed placeholder */}
          <div style={{
            background: "#111111",
            border: "1px solid #1A1A1A",
            padding: 32,
            display: "flex", alignItems: "center", gap: 24,
            flexWrap: "wrap",
          }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#F2C200", marginBottom: 8 }}>
                Donn Stone — Amapiano Mix 2025
              </p>
              <p style={{ fontSize: 13, color: "#555555" }}>Add your SoundCloud or Mixcloud link in the admin panel to embed your latest mix here.</p>
            </div>
            <a href="https://soundcloud.com" target="_blank" rel="noopener noreferrer" style={{
              textDecoration: "none",
              background: "#F2C200",
              color: "#0A0A0A",
              fontFamily: '"Space Mono", monospace',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "12px 24px",
              whiteSpace: "nowrap",
            }}>Listen on SoundCloud</a>
          </div>
        </div>
      </section>

      {/* ─── Past shows ─── */}
      <section className="ds-section" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "#F2C200", marginBottom: 12 }}>On Stage</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
          <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", color: "#FFFFFF" }}>
            Where the Music Has Been
          </h2>
          <Link to="/tour" style={{
            textDecoration: "none",
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#666666",
            borderBottom: "1px solid #333333",
            paddingBottom: 2,
          }}>Upcoming dates →</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {PAST_SHOWS.map((show, i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #1A1A1A",
              gap: 16,
              flexWrap: "wrap",
            }}>
              <div>
                <span style={{ fontSize: 16, fontWeight: 600, color: "#E8E8E8" }}>{show.venue}</span>
                <span style={{ marginLeft: 16, fontSize: 14, color: "#555555" }}>{show.city}</span>
              </div>
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "#444444",
              }}>{show.year}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Press logos ─── */}
      <section style={{
        background: "#0D0D0D",
        borderTop: "1px solid #1A1A1A",
        padding: "clamp(40px,6vw,64px) clamp(20px,6vw,80px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{
            fontFamily: '"Space Mono", monospace', fontSize: 10,
            letterSpacing: "0.24em", textTransform: "uppercase",
            color: "#333333", textAlign: "center", marginBottom: 32,
          }}>As Featured In</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "clamp(24px,4vw,56px)" }}>
            {PRESS_LOGOS.map(logo => (
              <span key={logo} style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: "clamp(11px,1.4vw,14px)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#333333",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "#666666")}
                onMouseLeave={e => (e.currentTarget.style.color = "#333333")}
              >{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Booking CTA ─── */}
      <section style={{
        padding: "clamp(80px,10vw,120px) clamp(20px,6vw,80px)",
        textAlign: "center",
        background: "linear-gradient(to bottom, #0A0A0A, #0D0800)",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "#F2C200", marginBottom: 20 }}>
            Available Worldwide
          </p>
          <h2 style={{
            fontFamily: '"Space Mono", monospace',
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 52px)",
            color: "#FFFFFF",
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Ready to book<br />Donn Stone?
          </h2>
          <p style={{ fontSize: 16, color: "#555555", lineHeight: 1.7, marginBottom: 40 }}>
            For festival bookings, club nights, private events and international tours — reach out to the management team directly.
          </p>
          <Link to="/booking" style={{
            textDecoration: "none",
            background: "#F2C200",
            color: "#0A0A0A",
            fontFamily: '"Space Mono", monospace',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            padding: "18px 40px",
            display: "inline-block",
          }}>Send Booking Enquiry</Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .ds-about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
