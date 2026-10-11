/** @format */

const QUOTES = [
  { quote: "A major figure in the Amapiano scene.", source: "Paradiso Amsterdam", date: "2024" },
  { quote: "International DJ based in Rotterdam, he's been ruling the Amapiano for a while now.", source: "Operator Radio", date: "2024" },
  { quote: "South African amapiano making it overseas — Netherlands.", source: "ECR Radio", date: "2024" },
];

const STAGES = [
  { year: "2026", venue: "Bairro", city: "Rotterdam, NL", detail: "Summer all-night residency — giving the crowd the time of their lives" },
  { year: "2026", venue: "Toffler", city: "Rotterdam, NL", detail: "All-night long — Weena Zuid 33" },
  { year: "2025", venue: "Toffler", city: "Rotterdam, NL", detail: "All-night solo set, July 2025" },
  { year: "2024", venue: "Paradiso / Parallel", city: "Amsterdam, NL", detail: "Back-to-back with Wes Lee (WaxFiend), 4 Oct 2024" },
  { year: "2024", venue: "Paradiso / Parallel — WOZA", city: "Amsterdam, NL", detail: "With Drumetic Boyz, Dec 2024" },
  { year: "2024", venue: "Toffler", city: "Rotterdam, NL", detail: "All-night solo set" },
  { year: "ADE", venue: "Amsterdam Dance Event", city: "Amsterdam, NL", detail: "Official ADE artist listing" },
  { year: "—", venue: "Various", city: "London, UK", detail: "International touring dates" },
  { year: "—", venue: "Various", city: "Paris, France", detail: "International touring dates" },
  { year: "—", venue: "Various", city: "Helsinki, Finland", detail: "International touring dates" },
  { year: "—", venue: "Various", city: "Johannesburg, SA", detail: "Connected to SA amapiano scene" },
  { year: "—", venue: "Various", city: "Antwerp, Belgium", detail: "International touring dates" },
  { year: "—", venue: "Various", city: "Luxembourg", detail: "International touring dates" },
];

const BIO_SHORT = `Donn Stone is a Rotterdam-based DJ and producer specialising in Amapiano and Afro-electronic music. After a formative trip to Cape Town, South Africa, he built direct connections with local producers and began bringing the sound to Europe. Described by Paradiso Amsterdam as "a major figure in the Amapiano scene," Stone headlines all-night sets at Toffler (Rotterdam) and Paradiso's Parallel stage (Amsterdam), and tours across the UK, France, Finland, Belgium and South Africa.`;

const BIO_LONG = `${BIO_SHORT}

Stone discovered Amapiano around 2020. A trip to Cape Town deepened his relationship with the genre, leading to direct collaborations with South African producers and the recording of his first amapiano EP. South African media, including ECR Radio and Briefly.co.za, have featured him as an example of Amapiano spreading internationally through a Dutch DJ.

Back in Rotterdam, he built a reputation for marathon all-night sets, a mark of status in the Dutch club circuit. His residency at Bairro in 2026 became one of Rotterdam's most talked-about summer series, while Toffler and Paradiso's Parallel stage remain his regular Amsterdam home. His Operator Radio session further cemented his position as one of the Netherlands' leading Amapiano voices.

Stone is also an official Amsterdam Dance Event (ADE) artist, placing him among the recognised names in the global electronic music calendar.`;

export default function PressPage() {
  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Media</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 24px" }}>Press & EPK</h1>
        <p style={{ fontSize: 16, color: "#5A3A32", maxWidth: 560, lineHeight: 1.8, margin: 0 }}>Electronic press kit for promoters, agents, labels and media. All assets cleared for editorial use. Contact management for high-resolution files.</p>
      </section>

      {/* EPK Downloads */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>Downloads</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { title: "Full EPK (PDF)", desc: "Bio, stats, rider, contacts — all in one document.", size: "3.2 MB" },
              { title: "Press Photos ZIP", desc: "High-resolution images cleared for editorial use.", size: "16.1 MB" },
              { title: "Technical Rider", desc: "Stage plot, channel list, monitor requirements.", size: "480 KB" },
              { title: "Logo & Artwork Pack", desc: "SVG, PNG and JPG in all required formats.", size: "2.0 MB" },
            ].map(f => (
              <div key={f.title} style={{ background: "#110808", border: "1px solid #1E0E0E", padding: 28, display: "flex", flexDirection: "column", gap: 12, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#9B1D20")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1E0E0E")}
              >
                <div style={{ width: 40, height: 40, background: "#1E0E0E", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v10M6 8l4 4 4-4M4 16h12" stroke="#9B1D20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: "#EAD5C8" }}>{f.title}</h3>
                  <p style={{ margin: "0 0 4px", fontSize: 13, color: "#5A3A32", lineHeight: 1.6 }}>{f.desc}</p>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#3D2020" }}>{f.size}</span>
                </div>
                <button style={{
                  marginTop: "auto", fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#9B1D20", background: "transparent", border: "1px solid #9B1D20", padding: "10px 0", cursor: "pointer", transition: "background 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#9B1D20"; e.currentTarget.style.color = "#EAD5C8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#9B1D20"; }}
                >Request File</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>Stages & Venues</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {STAGES.map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "64px 180px 1fr", gap: 24, alignItems: "start", padding: "20px 0", borderBottom: "1px solid #1E0E0E" }}>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#9B1D20", paddingTop: 2 }}>{s.year}</span>
                <div>
                  <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600, color: "#EAD5C8" }}>{s.venue}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "#5A3A32" }}>{s.city}</p>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#3D2020", lineHeight: 1.6, paddingTop: 2 }}>{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 24 }}>Short Bio (100 words)</p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#7A5A52" }}>{BIO_SHORT}</p>
            <button style={{
              marginTop: 24, fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "#EAD5C8", background: "transparent", border: "1px solid #3D2020", padding: "10px 20px", cursor: "pointer",
            }}
              onClick={() => navigator.clipboard?.writeText(BIO_SHORT)}
            >Copy Text</button>
          </div>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 24 }}>Long Bio (full)</p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#7A5A52", whiteSpace: "pre-line" }}>{BIO_LONG}</p>
          </div>
        </div>
      </section>

      {/* Press quotes */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>What They Say</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {QUOTES.map((q, i) => (
              <div key={i} style={{ borderLeft: "3px solid #9B1D20", paddingLeft: 32 }}>
                <p style={{ fontSize: 18, lineHeight: 1.7, color: "#C9A898", fontStyle: "italic", margin: "0 0 16px" }}>"{q.quote}"</p>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9B1D20" }}>{q.source}</span>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#3D2020", marginLeft: 16 }}>{q.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 40 }}>Media Contacts</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { role: "International Booking", name: "Management", email: "booking@donnstone.com", territory: "Worldwide" },
              { role: "Press & PR", name: "Management", email: "press@donnstone.com", territory: "Global" },
              { role: "General", name: "Management", email: "mgmt@donnstone.com", territory: "All enquiries" },
            ].map(c => (
              <div key={c.role} style={{ background: "#110808", border: "1px solid #1E0E0E", padding: 28 }}>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9B1D20", margin: "0 0 12px" }}>{c.role}</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#EAD5C8", margin: "0 0 4px" }}>{c.name}</p>
                <p style={{ fontSize: 13, color: "#5A3A32", margin: "0 0 16px" }}>{c.territory}</p>
                <a href={`mailto:${c.email}`} style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#9B1D20", textDecoration: "none", letterSpacing: "0.1em" }}>{c.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
