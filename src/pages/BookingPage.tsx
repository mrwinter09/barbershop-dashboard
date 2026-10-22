/** @format */

import { useState } from "react";

const EVENT_TYPES = ["Club Night", "Festival", "Private Event", "Label Showcase", "Corporate", "Residency", "Other"];

type Mode = "booking" | "epk";

const inputStyle: React.CSSProperties = {
  width: "100%", background: "#110808", border: "1px solid #2A1414", color: "#EAD5C8",
  padding: "14px 16px", fontSize: 14, fontFamily: "inherit", outline: "none",
  transition: "border-color 0.2s", boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em",
  textTransform: "uppercase", color: "#7A6060", display: "block", marginBottom: 8,
};

function focus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#9B1D20";
}
function blur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = "#2A1414";
}

export default function BookingPage() {
  const [mode, setMode] = useState<Mode>("booking");

  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1A1A1A" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Get In Touch</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 24px" }}>Book Donn Stone</h1>
        <p style={{ fontSize: 16, color: "#BFA8A0", maxWidth: 560, lineHeight: 1.8, margin: 0 }}>
          Available for club residencies, festival headliners, private events and brand activations worldwide. Fill in the form and management will respond within 48 hours.
        </p>
      </section>

      <div className="ds-booking-layout" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px clamp(20px,5vw,64px)" }}>
        {/* Left: toggle + form */}
        <div>
          {/* Toggle */}
          <div style={{ display: "flex", marginBottom: 48, borderBottom: "1px solid #1E0E0E" }}>
            {(["booking", "epk"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: mode === m ? "#EAD5C8" : "#3D2020",
                  background: "none", border: "none",
                  borderBottom: mode === m ? "2px solid #9B1D20" : "2px solid transparent",
                  padding: "0 0 16px",
                  marginRight: 32, cursor: "pointer",
                  transition: "color 0.2s",
                }}
              >
                {m === "booking" ? "Booking Request" : "EPK Request"}
              </button>
            ))}
          </div>

          {mode === "booking" ? <BookingForm /> : <EpkForm />}
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <div style={{ background: "#110808", border: "1px solid #1E0E0E", padding: 28 }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9B1D20", margin: "0 0 20px" }}>Key Stats</p>
            {[
              { label: "Countries Played", value: "50+" },
              { label: "Shows Per Year", value: "200+" },
              { label: "Total Streams", value: "10M+" },
              { label: "Response Time", value: "48h" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #1E0E0E" }}>
                <span style={{ fontSize: 13, color: "#7A6060" }}>{s.label}</span>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 14, fontWeight: 700, color: "#EAD5C8" }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "#110808", border: "1px solid #1E0E0E", padding: 28 }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9B1D20", margin: "0 0 16px" }}>Technical Rider</p>
            <p style={{ fontSize: 13, color: "#BFA8A0", lineHeight: 1.7, margin: "0 0 20px" }}>Full stage plot, channel list and monitor requirements available on request or in the press kit download.</p>
            <a href="/press" style={{
              fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "#EAD5C8", textDecoration: "none", border: "1px solid #333", padding: "10px 18px", display: "inline-block",
            }}>View Press Kit</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- BOOKING FORM ----------

function BookingForm() {
  const [form, setForm] = useState({
    name: "", email: "", org: "", eventType: "", date: "", venue: "", city: "", country: "", capacity: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const body = [
        `**Name:** ${form.name}`,
        `**Email:** ${form.email}`,
        `**Organisation / Promoter:** ${form.org || "—"}`,
        `**Event type:** ${form.eventType}`,
        `**Date:** ${form.date}`,
        `**Venue:** ${form.venue || "—"}`,
        `**City:** ${form.city || "—"}`,
        `**Country:** ${form.country}`,
        `**Expected capacity:** ${form.capacity || "—"}`,
        `**Budget range:** ${form.budget || "—"}`,
        "",
        `**Additional information:**`,
        form.message || "—",
        "",
        `---`,
        `*Submitted: ${new Date().toISOString()}*`,
      ].join("\n");

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.org || form.name} — ${form.date}`,
          email: form.email,
          date: form.date,
          venue: form.venue,
          details: body,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email booking@donnstone.com.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, background: "#9B1D20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l7 7L23 7" stroke="#0A0504" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>Enquiry Sent</h2>
        <p style={{ fontSize: 15, color: "#BFA8A0", lineHeight: 1.7, maxWidth: 400, margin: "0 auto" }}>
          Thank you. Management will review your booking request and get back to you within 48 hours at {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Organisation / Promoter</label>
        <input name="org" value={form.org} onChange={handleChange} placeholder="Club, festival or company name" style={inputStyle} onFocus={focus} onBlur={blur} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>Event Type *</label>
          <select name="eventType" value={form.eventType} onChange={handleChange} required style={{ ...inputStyle, cursor: "pointer" }} onFocus={focus} onBlur={blur}>
            <option value="">Select type</option>
            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Event Date *</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} required style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Venue Name</label>
        <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue or location name" style={inputStyle} onFocus={focus} onBlur={blur} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>City</label>
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={labelStyle}>Country *</label>
          <input name="country" value={form.country} onChange={handleChange} required placeholder="Country" style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={labelStyle}>Expected Capacity</label>
          <input name="capacity" value={form.capacity} onChange={handleChange} placeholder="e.g. 500, 2000" style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
        <div>
          <label style={labelStyle}>Budget Range</label>
          <input name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. €3,000 – €6,000" style={inputStyle} onFocus={focus} onBlur={blur} />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Additional Information</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={5}
          placeholder="Event concept, lineup context, special requirements, etc."
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={focus} onBlur={blur}
        />
      </div>

      {error && <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: "#9B1D20", margin: 0 }}>{error}</p>}

      <button type="submit" disabled={sending} style={{
        fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
        color: "#0A0504", background: sending ? "#5A1012" : "#9B1D20", border: "none", padding: "18px 40px", cursor: sending ? "not-allowed" : "pointer",
        transition: "background 0.2s", alignSelf: "flex-start",
      }}
        onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#B5252A"; }}
        onMouseLeave={e => { if (!sending) e.currentTarget.style.background = "#9B1D20"; }}
      >
        {sending ? "Sending..." : "Submit Enquiry"}
      </button>
    </form>
  );
}

// ---------- EPK FORM ----------

function EpkForm() {
  const [form, setForm] = useState({ name: "", email: "", org: "", role: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const issueBody = [
        `**Name:** ${form.name}`,
        `**Email:** ${form.email}`,
        `**Organisation:** ${form.org || "—"}`,
        `**Role / Context:** ${form.role || "—"}`,
        "",
        `**Reason for request:**`,
        form.reason || "—",
        "",
        `---`,
        `*Submitted: ${new Date().toISOString()}*`,
      ].join("\n");

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `EPK Request: ${form.name}${form.org ? ` — ${form.org}` : ""}`,
          email: form.email,
          date: new Date().toISOString().split("T")[0],
          venue: form.org || "—",
          details: issueBody,
          type: "epk",
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email press@donnstone.com.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <div style={{ width: 64, height: 64, background: "#9B1D20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l7 7L23 7" stroke="#0A0504" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: 24, letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>EPK Request Received</h2>
        <p style={{ fontSize: 15, color: "#BFA8A0", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
          Thank you. We'll send the Electronic Press Kit to {form.email} within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p style={{ fontSize: 15, color: "#BFA8A0", lineHeight: 1.8, margin: "0 0 36px", maxWidth: 520 }}>
        Request Donn Stone's Electronic Press Kit — includes bio, hi-res photos, press quotes, technical rider and mix links.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={labelStyle}>Organisation</label>
            <input name="org" value={form.org} onChange={handleChange} placeholder="Media, label, festival..." style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>
          <div>
            <label style={labelStyle}>Your Role</label>
            <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. Journalist, Booker, Label A&R" style={inputStyle} onFocus={focus} onBlur={blur} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Reason for Request</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} rows={4}
            placeholder="Tell us briefly what the EPK will be used for."
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={focus} onBlur={blur}
          />
        </div>

        {error && <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: "#9B1D20", margin: 0 }}>{error}</p>}

        <button type="submit" disabled={sending} style={{
          fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#0A0504", background: sending ? "#5A1012" : "#9B1D20", border: "none", padding: "18px 40px", cursor: sending ? "not-allowed" : "pointer",
          transition: "background 0.2s", alignSelf: "flex-start",
        }}
          onMouseEnter={e => { if (!sending) e.currentTarget.style.background = "#B5252A"; }}
          onMouseLeave={e => { if (!sending) e.currentTarget.style.background = "#9B1D20"; }}
        >
          {sending ? "Sending..." : "Request EPK"}
        </button>
      </form>
    </div>
  );
}
