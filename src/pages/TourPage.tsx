/** @format */

import { useState, useEffect } from "react";

type Show = { id: string; date: string; event: string; venue: string; city: string; tickets?: string };

export default function TourPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?section=tour")
      .then((r) => r.json())
      .then((j) => {
        setShows(j.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Live</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>Tour Dates</h1>
        <p style={{ fontSize: 15, color: "#7A6060", margin: 0 }}>
          {loading ? "Loading..." : `${shows.length} shows`}
        </p>
      </section>

      {/* All shows */}
      <section style={{ padding: "64px clamp(20px,5vw,64px) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060", marginBottom: 32 }}>All Shows — Most Recent First</p>

          {/* Column headers */}
          <div className="ds-tour-head" style={{ marginBottom: 4 }}>
            {["Date", "Event", "Venue", "City"].map((h, i) => (
              <span key={h} className={i === 2 ? "ds-tour-venue" : i === 3 ? "ds-tour-city" : ""} style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060" }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: "#7A6060", padding: "40px 0" }}>Loading shows...</p>
          ) : (
            shows.map((s) => (
              <div key={s.id} className="ds-tour-row"
                style={{ transition: "background 0.15s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#110808")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.08em", color: "#9B1D20", whiteSpace: "nowrap" }}>{s.date}</span>
                <span style={{ fontSize: 14, fontWeight: 500, color: "#EAD5C8" }}>{s.event}</span>
                <span className="ds-tour-venue" style={{ fontSize: 13, color: "#BFA8A0" }}>{s.venue}</span>
                <span className="ds-tour-city" style={{ fontSize: 13, color: "#7A6060" }}>{s.city}</span>
                {s.tickets && (
                  <a href={s.tickets} target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "10px 18px", whiteSpace: "nowrap",
                  }}>Tickets</a>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", background: "#9B1D20", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(234,213,200,0.7)", marginBottom: 16 }}>Book a Show</p>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px,4vw,40px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>Bring Donn Stone To Your City</h2>
        <p style={{ fontSize: 16, color: "rgba(234,213,200,0.8)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>Available for club nights, festivals, private events and label showcases worldwide.</p>
        <a href="/booking" style={{
          display: "inline-block", fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#9B1D20", background: "#EAD5C8", textDecoration: "none", padding: "16px 40px",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#FAF5F2")}
          onMouseLeave={e => (e.currentTarget.style.background = "#EAD5C8")}
        >Send Booking Enquiry</a>
      </section>
    </div>
  );
}
