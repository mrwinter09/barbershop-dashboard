/** @format */

import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{
      background: "#0A0504", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", textAlign: "center", padding: "0 clamp(20px,5vw,64px)",
    }}>
      <p style={{ fontFamily: '"Space Mono", monospace', fontSize: "clamp(80px,15vw,160px)", fontWeight: 700, color: "#1E0E0E", margin: 0, lineHeight: 1 }}>404</p>
      <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(20px,3vw,32px)", letterSpacing: "0.08em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>Page Not Found</h1>
      <p style={{ fontSize: 15, color: "#5A3A32", maxWidth: 360, lineHeight: 1.7, margin: "0 0 40px" }}>The page you're looking for doesn't exist. Head back to the homepage or check the tour dates.</p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/" style={{
          fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "14px 32px",
        }}>Go Home</Link>
        <Link to="/tour" style={{
          fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#EAD5C8", textDecoration: "none", border: "1px solid #3D2020", padding: "14px 32px",
        }}>Tour Dates</Link>
      </div>
    </div>
  );
}
