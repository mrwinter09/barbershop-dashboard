/** @format */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { path: "/video", label: "Video" },
  { path: "/tour", label: "Tour" },
  { path: "/press", label: "Bio" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(20px, 5vw, 64px)",
      height: 68,
      background: open ? "#110808" : "linear-gradient(to bottom, rgba(10,5,4,0.92), rgba(10,5,4,0))",
      transition: "background 0.3s",
    }}>
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }} onClick={() => setOpen(false)}>
        <span style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9B1D20" }}>DONN</span>
        <span style={{ fontFamily: '"Space Mono", monospace', fontWeight: 400, fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", color: "#EAD5C8" }}>STONE</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="ds-desktop-nav">
        {NAV.map(n => {
          const active = pathname.startsWith(n.path);
          return (
            <Link key={n.path} to={n.path} style={{
              textDecoration: "none", fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase",
              color: active ? "#9B1D20" : "#7A5A52", transition: "color 0.2s",
              borderBottom: active ? "1px solid #9B1D20" : "1px solid transparent", paddingBottom: 2,
            }}>{n.label}</Link>
          );
        })}
        <Link to="/booking" style={{
          textDecoration: "none", background: "#9B1D20", color: "#EAD5C8",
          fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          padding: "10px 22px", transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#B5252A")}
          onMouseLeave={e => (e.currentTarget.style.background = "#9B1D20")}
        >Book Now</Link>
      </div>

      <button onClick={() => setOpen(o => !o)} className="ds-mobile-menu-btn" aria-label="Menu"
        style={{ background: "none", border: 0, cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: "block", width: 24, height: 2, background: "#EAD5C8",
            transition: "transform 0.2s, opacity 0.2s",
            transform: open ? i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "none" : "none",
            opacity: open && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {open && (
        <div style={{
          position: "absolute", top: 68, left: 0, right: 0, background: "#110808",
          borderTop: "1px solid #1E0E0E", display: "flex", flexDirection: "column",
          padding: "24px clamp(20px,5vw,64px) 32px", gap: 24,
        }}>
          {NAV.map(n => (
            <Link key={n.path} to={n.path} onClick={() => setOpen(false)} style={{
              textDecoration: "none", fontFamily: '"Space Mono", monospace', fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase",
              color: pathname.startsWith(n.path) ? "#9B1D20" : "#EAD5C8",
            }}>{n.label}</Link>
          ))}
          <Link to="/booking" onClick={() => setOpen(false)} style={{
            textDecoration: "none", background: "#9B1D20", color: "#EAD5C8",
            fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
            padding: "14px 22px", textAlign: "center", marginTop: 8,
          }}>Book Now</Link>
        </div>
      )}

      <style>{`
        .ds-mobile-menu-btn { display: none; }
        @media (max-width: 720px) {
          .ds-desktop-nav { display: none !important; }
          .ds-mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
