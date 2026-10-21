/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminGuard from "./AdminGuard";

const SECTIONS = ["Home", "Video", "Tour", "Bio"] as const;
type Section = typeof SECTIONS[number];

export default function AdminDashboardPage() {
  const [active, setActive] = useState<Section>("Home");
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("/api/admin-auth", { method: "DELETE" });
    navigate("/admin");
  }

  return (
    <AdminGuard>
      <div style={{ background: "#0A0504", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Top bar */}
        <header style={{
          background: "#110808", borderBottom: "1px solid #1E0E0E",
          padding: "0 clamp(20px,4vw,48px)", height: 56,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 14, fontWeight: 700, letterSpacing: "0.1em" }}>
            <span style={{ color: "#9B1D20" }}>DONN</span>
            <span style={{ color: "#EAD5C8" }}> STONE</span>
            <span style={{ color: "#3D2020", fontSize: 10, marginLeft: 12, letterSpacing: "0.16em", textTransform: "uppercase" }}>Admin</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700,
              letterSpacing: "0.14em", textTransform: "uppercase",
              color: "#7A6060", background: "none", border: "1px solid #2A1414",
              padding: "8px 16px", cursor: "pointer",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#EAD5C8")}
            onMouseLeave={e => (e.currentTarget.style.color = "#7A6060")}
          >
            Log out
          </button>
        </header>

        <div style={{ display: "flex", flex: 1 }}>

          {/* Sidebar */}
          <nav style={{
            width: 200, background: "#0D0707", borderRight: "1px solid #1E0E0E",
            padding: "32px 0", flexShrink: 0,
          }}>
            {SECTIONS.map(s => (
              <button
                key={s}
                onClick={() => setActive(s)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: active === s ? "#EAD5C8" : "#3D2020",
                  background: active === s ? "#1E0E0E" : "none",
                  border: "none", borderLeft: active === s ? "3px solid #9B1D20" : "3px solid transparent",
                  padding: "14px 24px", cursor: "pointer", transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (active !== s) e.currentTarget.style.color = "#7A6060"; }}
                onMouseLeave={e => { if (active !== s) e.currentTarget.style.color = "#3D2020"; }}
              >
                {s}
              </button>
            ))}
          </nav>

          {/* Main content */}
          <main style={{ flex: 1, padding: "48px clamp(20px,4vw,48px)" }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>
              Section
            </p>
            <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: 28, letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 40px" }}>
              {active}
            </h1>

            {/* Placeholder — each section gets built here next */}
            <div style={{ border: "1px dashed #2A1414", padding: "64px 40px", textAlign: "center" }}>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>
                Coming next
              </p>
              <p style={{ fontSize: 14, color: "#7A6060", lineHeight: 1.8 }}>
                The {active} editor will be built here. Auth is live — you're in.
              </p>
            </div>
          </main>

        </div>
      </div>
    </AdminGuard>
  );
}
