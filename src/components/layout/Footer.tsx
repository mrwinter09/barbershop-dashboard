/** @format */

import { Link } from "react-router-dom";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Spotify", href: "https://spotify.com" },
  { label: "SoundCloud", href: "https://soundcloud.com" },
];

export default function Footer() {
  return (
    <footer style={{
      background: "#050505",
      borderTop: "1px solid #1A1A1A",
      padding: "clamp(48px,7vw,80px) clamp(20px,5vw,64px) 32px",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "flex", flexWrap: "wrap", gap: 48,
        justifyContent: "space-between", alignItems: "flex-start",
      }}>
        {/* Brand */}
        <div style={{ maxWidth: 300 }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 22, fontWeight: 700, letterSpacing: "0.1em" }}>
            <span style={{ color: "#F2C200" }}>DONN</span>
            <span style={{ color: "#E8E8E8" }}> STONE</span>
          </div>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: "#666666" }}>
            International Amapiano DJ & producer. Bringing the sound of South Africa to stages worldwide.
          </p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#444444", marginBottom: 16 }}>Navigate</p>
            {[
              { to: "/music", label: "Music" },
              { to: "/tour", label: "Tour" },
              { to: "/press", label: "Press & EPK" },
              { to: "/booking", label: "Bookings" },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{ display: "block", textDecoration: "none", color: "#666666", fontSize: 14, marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#E8E8E8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#666666")}
              >{l.label}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#444444", marginBottom: 16 }}>Follow</p>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none", color: "#666666", fontSize: 14, marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F2C200")}
                onMouseLeave={e => (e.currentTarget.style.color = "#666666")}
              >{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "40px auto 0", borderTop: "1px solid #1A1A1A", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.12em", color: "#333333", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} Donn Stone. All rights reserved.
        </span>
        <a href="mailto:booking@donnstone.com" style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.12em", color: "#F2C200", textTransform: "uppercase", textDecoration: "none" }}>
          booking@donnstone.com
        </a>
      </div>
    </footer>
  );
}
