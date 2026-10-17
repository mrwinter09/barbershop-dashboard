/** @format */

const QUOTES = [
  { quote: "A major figure in the Afro-Electronic dance music scene.", source: "Paradiso Amsterdam", date: "2024" },
  { quote: "International DJ based in Rotterdam, he's been ruling the Afro-electronic scene for a while now.", source: "Operator Radio", date: "2024" },
  { quote: "South African Afro-electronic music making it overseas — Netherlands.", source: "ECR Radio", date: "2024" },
];

const BIO_SHORT = `Donn Stone is an Electronic powerhouse from Rotterdam. Known for his expensive musical taste and undeniable dancefloor energy, his unique style has resonated with audiences worldwide. Bringing a masterful fusion of rhythmic, melodic and uplifting electronic selections with an energetic and culturally rich vibe to every set. Described by Paradiso Amsterdam as "a major figure in the Afro-Electronic dance music scene," Stone headlines all-night sets at Toffler (Rotterdam) and Paradiso's Parallel stage (Amsterdam), and tours across the UK, France, Finland, Belgium and South Africa.`;

const BIO_LONG = `Donn Stone is an Electronic powerhouse from Rotterdam. Known for his expensive musical taste and undeniable dancefloor energy. His unique style has resonated with audiences worldwide. Bringing a masterful fusion of rhythmic/melodic and uplifting electronic selections with an energetic and culturally rich vibe to every set.

Stone's journey into Afro-electronic music was sparked by a formative trip to Cape Town, South Africa, where he built direct connections with local producers and immersed himself in the roots of the sound. This experience led to direct collaborations with South African producers and a deep commitment to bringing this culturally rich music to Europe and beyond. South African media, including ECR Radio and Briefly.co.za, have featured him as an example of Afro-electronic music spreading internationally through a Dutch artist.

Back in Rotterdam, he built a reputation for marathon all-night sets, a mark of status in the Dutch club circuit. His residency at Bairro in 2026 became one of Rotterdam's most talked-about summer series, while Toffler and Paradiso's Parallel stage remain his regular Amsterdam home. His Operator Radio session further cemented his position as one of the Netherlands' leading electronic music voices.

Stone is also an official Amsterdam Dance Event (ADE) artist, placing him among the recognised names in the global electronic music calendar. With performances across 50+ countries and 200+ shows per year, Donn Stone continues to push the boundaries of Afro-electronic music on the world stage.`;

export default function PressPage() {
  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Media</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: 0 }}>Bio</h1>
      </section>

      {/* Bio */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E" }}>
        <div className="ds-bio-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060", marginBottom: 24 }}>Short Bio (100 words)</p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#BFA8A0" }}>{BIO_SHORT}</p>
            <button style={{
              marginTop: 24, fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "#EAD5C8", background: "transparent", border: "1px solid #3D2020", padding: "10px 20px", cursor: "pointer",
            }}
              onClick={() => navigator.clipboard?.writeText(BIO_SHORT)}
            >Copy Text</button>
          </div>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060", marginBottom: 24 }}>Long Bio (full)</p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#BFA8A0", whiteSpace: "pre-line" }}>{BIO_LONG}</p>
          </div>
        </div>
      </section>

      {/* Press quotes */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060", marginBottom: 40 }}>What They Say</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {QUOTES.map((q, i) => (
              <div key={i} style={{ borderLeft: "3px solid #9B1D20", paddingLeft: 32 }}>
                <p style={{ fontSize: 18, lineHeight: 1.7, color: "#EAD5C8", fontStyle: "italic", margin: "0 0 16px" }}>"{q.quote}"</p>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9B1D20" }}>{q.source}</span>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#7A6060", marginLeft: 16 }}>{q.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060", marginBottom: 40 }}>Media Contacts</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { role: "International Booking", name: "Management", email: "booking@donnstone.com", territory: "Worldwide" },
              { role: "Press & PR", name: "Management", email: "press@donnstone.com", territory: "Global" },
              { role: "General", name: "Management", email: "mgmt@donnstone.com", territory: "All enquiries" },
            ].map(c => (
              <div key={c.role} style={{ background: "#110808", border: "1px solid #1E0E0E", padding: 28 }}>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9B1D20", margin: "0 0 12px" }}>{c.role}</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#EAD5C8", margin: "0 0 4px" }}>{c.name}</p>
                <p style={{ fontSize: 13, color: "#7A6060", margin: "0 0 16px" }}>{c.territory}</p>
                <a href={`mailto:${c.email}`} style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#9B1D20", textDecoration: "none", letterSpacing: "0.1em" }}>{c.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
