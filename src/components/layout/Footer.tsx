/** @format */

import { Link } from "react-router-dom";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/donnstone/" },
  { label: "SoundCloud", href: "https://soundcloud.com/don-stone-2" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=ZBYdlg3qv40" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0A0504", borderTop: "1px solid #1E0E0E", padding: "clamp(48px,7vw,80px) clamp(20px,5vw,64px) 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 48, justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ maxWidth: 300 }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 22, fontWeight: 700, letterSpacing: "0.1em" }}>
            <span style={{ color: "#9B1D20" }}>DONN</span>
            <span style={{ color: "#EAD5C8" }}> STONE</span>
          </div>
          <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7, color: "#5A3A32" }}>
            Electronic powerhouse DJ from Rotterdam. Bringing a culturally rich Afro-electronic sound to stages across 50+ countries worldwide.
          </p>
        </div>

        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3D2020", marginBottom: 16 }}>Navigate</p>
            {[
              { to: "/video", label: "Video" },
              { to: "/tour", label: "Tour" },
              { to: "/booking", label: "Bookings" },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{ display: "block", textDecoration: "none", color: "#5A3A32", fontSize: 14, marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#EAD5C8")}
                onMouseLeave={e => (e.currentTarget.style.color = "#5A3A32")}
              >{l.label}</Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#3D2020", marginBottom: 16 }}>Follow</p>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textDecoration: "none", color: "#5A3A32", fontSize: 14, marginBottom: 10, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#9B1D20")}
                onMouseLeave={e => (e.currentTarget.style.color = "#5A3A32")}
              >{s.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "40px auto 0", borderTop: "1px solid #1E0E0E", paddingTop: 24, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.12em", color: "#3D2020", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} Donn Stone. All rights reserved.
        </span>
        <a href="mailto:booking@donnstone.com" style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.12em", color: "#9B1D20", textTransform: "uppercase", textDecoration: "none" }}>
          booking@donnstone.com
        </a>
      </div>
    </footer>
  );
}
