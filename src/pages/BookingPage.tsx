/** @format */

import { useState } from "react";

const EVENT_TYPES = ["Club Night", "Festival", "Private Event", "Label Showcase", "Corporate", "Residency", "Other"];

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "", email: "", org: "", eventType: "", date: "", venue: "", city: "", country: "", capacity: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "#111", border: "1px solid #1A1A1A", color: "#E8E8E8",
    padding: "14px 16px", fontSize: 14, fontFamily: "inherit", outline: "none",
    transition: "border-color 0.2s", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em",
    textTransform: "uppercase", color: "#444", display: "block", marginBottom: 8,
  };

  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#E8E8E8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1A1A1A" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F2C200", marginBottom: 16 }}>Get In Touch</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#E8E8E8", margin: "0 0 24px" }}>Book Donn Stone</h1>
        <p style={{ fontSize: 16, color: "#666", maxWidth: 560, lineHeight: 1.8, margin: 0 }}>Available for club residencies, festival headliners, private events and brand activations worldwide. Fill in the form and management will respond within 48 hours.</p>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px clamp(20px,5vw,64px)", display: "grid", gridTemplateColumns: "2fr 1fr", gap: 80, alignItems: "start" }}>
        {/* Form */}
        <div>
          {submitted ? (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, background: "#F2C200", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l7 7L23 7" stroke="#0A0A0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", textTransform: "uppercase", color: "#E8E8E8", margin: "0 0 16px" }}>Enquiry Sent</h2>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>Thank you. Management will review your enquiry and get back to you within 48 hours at {form.email || "the address you provided"}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Organisation / Promoter</label>
                <input name="org" value={form.org} onChange={handleChange} placeholder="Club, festival or company name" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Event Type *</label>
                  <select name="eventType" value={form.eventType} onChange={handleChange} required style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  >
                    <option value="">Select type</option>
                    {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Event Date *</label>
                  <input name="date" type="date" value={form.date} onChange={handleChange} required style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Venue Name</label>
                <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue or location name" style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>City</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Country *</label>
                  <input name="country" value={form.country} onChange={handleChange} required placeholder="Country" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <label style={labelStyle}>Expected Capacity</label>
                  <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="e.g. 500, 2000" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Budget Range</label>
                  <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. €3,000 – €6,000" style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Additional Information</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                  placeholder="Event concept, lineup context, special requirements, etc."
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#F2C200")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                />
              </div>

              <button type="submit" style={{
                fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#0A0A0A", background: "#F2C200", border: "none", padding: "18px 40px", cursor: "pointer",
                transition: "background 0.2s", alignSelf: "flex-start",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#D4AA00")}
                onMouseLeave={e => (e.currentTarget.style.background = "#F2C200")}
              >Submit Enquiry</button>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ background: "#111", border: "1px solid #1A1A1A", padding: 28 }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F2C200", margin: "0 0 20px" }}>Direct Contact</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { role: "International Booking", email: "booking@donnstone.com" },
                { role: "Management", email: "mgmt@donnstone.com" },
                { role: "Press Enquiries", email: "press@donnstone.com" },
              ].map(c => (
                <div key={c.role}>
                  <p style={{ fontSize: 12, color: "#444", margin: "0 0 4px", fontFamily: '"Space Mono", monospace', letterSpacing: "0.1em" }}>{c.role}</p>
                  <a href={`mailto:${c.email}`} style={{ fontSize: 14, color: "#F2C200", textDecoration: "none" }}>{c.email}</a>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#111", border: "1px solid #1A1A1A", padding: 28 }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F2C200", margin: "0 0 20px" }}>Key Stats</p>
            {[
              { label: "Countries Played", value: "50+" },
              { label: "Shows Per Year", value: "200+" },
              { label: "Total Streams", value: "10M+" },
              { label: "Response Time", value: "48h" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #1A1A1A" }}>
                <span style={{ fontSize: 13, color: "#666" }}>{s.label}</span>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 14, fontWeight: 700, color: "#E8E8E8" }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#111", border: "1px solid #1A1A1A", padding: 28 }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F2C200", margin: "0 0 16px" }}>Technical Rider</p>
            <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 20px" }}>Full stage plot, channel list and monitor requirements available on request or in the press kit download.</p>
            <a href="/press" style={{
              fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "#E8E8E8", textDecoration: "none", border: "1px solid #333", padding: "10px 18px", display: "inline-block",
            }}>View Press Kit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
