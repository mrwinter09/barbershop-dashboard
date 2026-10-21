/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        navigate("/admin/dashboard");
      } else {
        setError("Incorrect password.");
      }
    } catch {
      setError("Connection error. Try again.");
    }
    setLoading(false);
  }

  return (
    <div style={{
      background: "#0A0504", minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      padding: "clamp(20px,5vw,64px)",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: '"Space Mono", monospace', fontSize: 20, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 8 }}>
            <span style={{ color: "#9B1D20" }}>DONN</span>
            <span style={{ color: "#EAD5C8" }}> STONE</span>
          </div>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020" }}>Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A6060", display: "block", marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              style={{
                width: "100%", background: "#110808", border: "1px solid #2A1414",
                color: "#EAD5C8", padding: "14px 16px", fontSize: 14,
                fontFamily: "inherit", outline: "none", boxSizing: "border-box",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#9B1D20")}
              onBlur={e => (e.currentTarget.style.borderColor = "#2A1414")}
            />
          </div>

          {error && (
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#9B1D20", margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#EAD5C8", background: loading ? "#3D2020" : "#9B1D20",
              border: "none", padding: "16px", cursor: loading ? "default" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
