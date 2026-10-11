/** @format */

const UPCOMING = [
  { date: "2025-01-18", city: "Amsterdam", venue: "Shelter", country: "Netherlands", region: "Europe", tickets: "https://ra.co/" },
  { date: "2025-02-01", city: "London", venue: "Fabric", country: "UK", region: "Europe", tickets: "https://ra.co/" },
  { date: "2025-02-14", city: "Paris", venue: "Rex Club", country: "France", region: "Europe", tickets: "https://ra.co/" },
  { date: "2025-03-08", city: "New York", venue: "Output", country: "USA", region: "Americas", tickets: "https://ra.co/" },
  { date: "2025-03-22", city: "São Paulo", venue: "D-Edge", country: "Brazil", region: "Americas", tickets: "https://ra.co/" },
  { date: "2025-04-05", city: "Dubai", venue: "White Dubai", country: "UAE", region: "Middle East", tickets: "https://ra.co/" },
  { date: "2025-04-19", city: "Cape Town", venue: "Grand Café", country: "South Africa", region: "Africa", tickets: "https://ra.co/" },
  { date: "2025-05-03", city: "Berlin", venue: "Tresor", country: "Germany", region: "Europe", tickets: "https://ra.co/" },
];

const PAST = [
  { date: "2024-11-09", city: "Barcelona", venue: "Razzmatazz", country: "Spain", region: "Europe" },
  { date: "2024-10-26", city: "Ibiza", venue: "Hï Ibiza", country: "Spain", region: "Europe" },
  { date: "2024-09-14", city: "Amsterdam", venue: "De School", country: "Netherlands", region: "Europe" },
  { date: "2024-08-24", city: "Johannesburg", venue: "The Venue", country: "South Africa", region: "Africa" },
  { date: "2024-07-20", city: "London", venue: "Fabric", country: "UK", region: "Europe" },
  { date: "2024-06-15", city: "Tokyo", venue: "Womb", country: "Japan", region: "Asia" },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
}

export default function TourPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#E8E8E8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1A1A1A" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F2C200", marginBottom: 16 }}>Live</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#E8E8E8", margin: 0 }}>Tour Dates</h1>
      </section>

      {/* Upcoming */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 40 }}>Upcoming Shows</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {UPCOMING.map((show, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "160px 1fr auto", alignItems: "center", gap: 24,
                padding: "24px 0", borderBottom: "1px solid #1A1A1A",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "#111")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, letterSpacing: "0.1em", color: "#F2C200" }}>{formatDate(show.date)}</span>
                <div>
                  <span style={{ fontSize: 18, fontWeight: 600, color: "#E8E8E8", marginRight: 12 }}>{show.city}</span>
                  <span style={{ fontSize: 14, color: "#666" }}>{show.venue}, {show.country}</span>
                </div>
                <a href={show.tickets} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#0A0A0A", background: "#F2C200", textDecoration: "none", padding: "10px 20px", whiteSpace: "nowrap", transition: "background 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#D4AA00")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#F2C200")}
                >Tickets</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past */}
      <section style={{ padding: "0 clamp(20px,5vw,64px) 80px", borderTop: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 80 }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 40 }}>Past Shows</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {PAST.map((show, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "160px 1fr", alignItems: "center", gap: 24,
                padding: "20px 0", borderBottom: "1px solid #111",
              }}>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.1em", color: "#444" }}>{formatDate(show.date)}</span>
                <div>
                  <span style={{ fontSize: 16, fontWeight: 500, color: "#777", marginRight: 12 }}>{show.city}</span>
                  <span style={{ fontSize: 13, color: "#444" }}>{show.venue}, {show.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", background: "#050505", borderTop: "1px solid #1A1A1A", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F2C200", marginBottom: 16 }}>Book a Show</p>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(24px,4vw,40px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#E8E8E8", margin: "0 0 16px" }}>Bring Donn Stone To Your City</h2>
        <p style={{ fontSize: 16, color: "#666", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>Available for club nights, festivals, private events and label showcases worldwide.</p>
        <a href="/booking" style={{
          display: "inline-block", fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#0A0A0A", background: "#F2C200", textDecoration: "none", padding: "16px 40px", transition: "background 0.2s",
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "#D4AA00")}
          onMouseLeave={e => (e.currentTarget.style.background = "#F2C200")}
        >Send Booking Enquiry</a>
      </section>
    </div>
  );
}
