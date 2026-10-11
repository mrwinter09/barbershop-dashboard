/** @format */

const UPCOMING = [
  { date: "2026-05-23", city: "Rotterdam", venue: "Toffler", country: "Netherlands", tickets: "https://ra.co/events/2398076" },
  { date: "2026-07-25", city: "Rotterdam", venue: "Bairro", country: "Netherlands", tickets: "https://ra.co/" },
];

const PAST = [
  { date: "2025-07-25", city: "Rotterdam", venue: "Toffler", country: "Netherlands", note: "All-night set" },
  { date: "2024-12-14", city: "Amsterdam", venue: "Paradiso / Parallel — WOZA", country: "Netherlands", note: "With Drumetic Boyz" },
  { date: "2024-10-04", city: "Amsterdam", venue: "Paradiso / Parallel", country: "Netherlands", note: "B2B with Wes Lee (WaxFiend)" },
  { date: "2024", city: "Rotterdam", venue: "Toffler", country: "Netherlands", note: "All-night solo set" },
  { date: "ADE", city: "Amsterdam", venue: "Amsterdam Dance Event", country: "Netherlands", note: "Official ADE artist" },
  { date: "—", city: "London", venue: "Various", country: "United Kingdom", note: "" },
  { date: "—", city: "Paris", venue: "Various", country: "France", note: "" },
  { date: "—", city: "Helsinki", venue: "Various", country: "Finland", note: "" },
  { date: "—", city: "Johannesburg", venue: "Various", country: "South Africa", note: "" },
  { date: "—", city: "Antwerp", venue: "Various", country: "Belgium", note: "" },
  { date: "—", city: "Luxembourg", venue: "Various", country: "Luxembourg", note: "" },
];

function formatDate(iso: string) {
  if (!iso.match(/^\d{4}-\d{2}-\d{2}$/)) return iso;
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
}

export default function TourPage() {
  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Live</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: 0 }}>Tour Dates</h1>
      </section>

      {/* Upcoming */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>Upcoming Shows</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {UPCOMING.map((show, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr auto", alignItems: "center", gap: 24, padding: "24px 0", borderBottom: "1px solid #1E0E0E" }}>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, letterSpacing: "0.1em", color: "#9B1D20" }}>{formatDate(show.date)}</span>
                <div>
                  <span style={{ fontSize: 18, fontWeight: 600, color: "#EAD5C8", marginRight: 12 }}>{show.city}</span>
                  <span style={{ fontSize: 14, color: "#5A3A32" }}>{show.venue}, {show.country}</span>
                </div>
                <a href={show.tickets} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "10px 20px", whiteSpace: "nowrap",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#B5252A")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#9B1D20")}
                >Tickets</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past */}
      <section style={{ padding: "0 clamp(20px,5vw,64px) 80px", borderTop: "1px solid #1E0E0E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 80 }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>Past Shows</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {PAST.map((show, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr auto", alignItems: "center", gap: 24, padding: "18px 0", borderBottom: "1px solid #1E0E0E" }}>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.1em", color: "#3D2020" }}>{formatDate(show.date)}</span>
                <div>
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#7A5A52", marginRight: 12 }}>{show.city}</span>
                  <span style={{ fontSize: 13, color: "#3D2020" }}>{show.venue}, {show.country}</span>
                </div>
                {show.note && <span style={{ fontSize: 12, color: "#3D2020", fontStyle: "italic", textAlign: "right" }}>{show.note}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", background: "#110808", borderTop: "1px solid #1E0E0E", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Book a Show</p>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px,4vw,40px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>Bring Donn Stone To Your City</h2>
        <p style={{ fontSize: 16, color: "#5A3A32", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>Available for club nights, festivals, private events and label showcases worldwide.</p>
        <a href="/booking" style={{
          display: "inline-block", fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "16px 40px",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#B5252A")}
          onMouseLeave={e => (e.currentTarget.style.background = "#9B1D20")}
        >Send Booking Enquiry</a>
      </section>
    </div>
  );
}
