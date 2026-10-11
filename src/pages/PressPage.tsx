/** @format */

const QUOTES = [
  { quote: "Donn Stone delivers the kind of set that reminds you why Amapiano is taking over the world.", source: "Mixmag", date: "2024" },
  { quote: "A masterclass in log drum percussion and vocal layering. One of the most exciting exports from Pretoria.", source: "OkayAfrica", date: "2024" },
  { quote: "The room doesn't stop moving. Stone reads a crowd like few DJs his age can.", source: "Resident Advisor", date: "2023" },
];

const PHOTOS = [
  { label: "Press Photo 01 — Portrait", size: "4.2 MB", format: "JPG, 300 DPI" },
  { label: "Press Photo 02 — Live at Fabric", size: "6.1 MB", format: "JPG, 300 DPI" },
  { label: "Press Photo 03 — Studio", size: "3.8 MB", format: "JPG, 300 DPI" },
  { label: "Logo Pack — Black, White, Gold", size: "2.0 MB", format: "SVG + PNG" },
];

const BIO_SHORT = `Donn Stone is an internationally touring Amapiano DJ and producer from Pretoria, South Africa. Since 2019 he has performed at Fabric (London), Boiler Room (Amsterdam), Hï Ibiza, Rex Club (Paris) and stages across North America, the Middle East and East Asia. Known for his log-drum-driven sound and effortless genre fusions, Stone has accumulated over 10 million streams across platforms and holds residencies at two of Europe's top clubs.`;

const BIO_LONG = `${BIO_SHORT}

Growing up in Pretoria's vibrant kwaito and house scene, Stone began DJing at 16 and released his first self-produced EP at 19. His early sets blended classic South African house with the emerging sound of Amapiano, earning him a loyal local following before international bookings followed.

The breakthrough moment came in 2022 with the single "Langa", which reached the top 10 on Beatport's Afro House chart and caught the attention of European promoters. Since then, Stone has headlined across 50+ countries, sharing bills with Kabza De Small, Uncle Waffles, Themba and Black Coffee.

In the studio, Stone is known for his meticulous approach to production, layering live recorded percussion with synthesized bass lines and carefully selected vocal samples. His releases span club tools, concept EPs and full-length works that tell a broader story of the South African urban experience.`;

export default function PressPage() {
  return (
    <div style={{ background: "#0A0A0A", minHeight: "100vh", color: "#E8E8E8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1A1A1A" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F2C200", marginBottom: 16 }}>Media</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#E8E8E8", margin: "0 0 24px" }}>Press & EPK</h1>
        <p style={{ fontSize: 16, color: "#666", maxWidth: 560, lineHeight: 1.8, margin: 0 }}>Electronic press kit for promoters, agents, labels and media. All assets are cleared for editorial use. For high-resolution files, contact management.</p>
      </section>

      {/* EPK Downloads */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 40 }}>Downloads</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { title: "Full EPK (PDF)", desc: "Bio, stats, rider, contacts — all in one document.", size: "3.2 MB" },
              { title: "Press Photos ZIP", desc: "4 high-resolution images cleared for editorial use.", size: "16.1 MB" },
              { title: "Technical Rider", desc: "Stage plot, channel list, monitor requirements.", size: "480 KB" },
              { title: "Logo & Artwork Pack", desc: "SVG, PNG and JPG in all required formats.", size: "2.0 MB" },
            ].map(f => (
              <div key={f.title} style={{ background: "#111", border: "1px solid #1A1A1A", padding: 28, display: "flex", flexDirection: "column", gap: 12, transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#F2C200")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
              >
                <div style={{ width: 40, height: 40, background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v10M6 8l4 4 4-4M4 16h12" stroke="#F2C200" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 600, color: "#E8E8E8" }}>{f.title}</h3>
                  <p style={{ margin: "0 0 4px", fontSize: 13, color: "#555", lineHeight: 1.6 }}>{f.desc}</p>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#333" }}>{f.size}</span>
                </div>
                <button style={{
                  marginTop: "auto", fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#F2C200", background: "transparent", border: "1px solid #F2C200", padding: "10px 0", cursor: "pointer", transition: "background 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#F2C200"; e.currentTarget.style.color = "#0A0A0A"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#F2C200"; }}
                >Request File</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 24 }}>Short Bio (100 words)</p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#888" }}>{BIO_SHORT}</p>
            <button style={{
              marginTop: 24, fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
              color: "#E8E8E8", background: "transparent", border: "1px solid #333", padding: "10px 20px", cursor: "pointer",
            }}
              onClick={() => navigator.clipboard?.writeText(BIO_SHORT)}
            >Copy Text</button>
          </div>
          <div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 24 }}>Long Bio (full)</p>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: "#888", whiteSpace: "pre-line" }}>{BIO_LONG}</p>
          </div>
        </div>
      </section>

      {/* Press quotes */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 40 }}>What Press Say</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {QUOTES.map((q, i) => (
              <div key={i} style={{ borderLeft: "3px solid #F2C200", paddingLeft: 32 }}>
                <p style={{ fontSize: 18, lineHeight: 1.7, color: "#C9C9C9", fontStyle: "italic", margin: "0 0 16px" }}>"{q.quote}"</p>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F2C200" }}>{q.source}</span>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#333", marginLeft: 16 }}>{q.date}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1A1A1A" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 40 }}>Photo Assets</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {PHOTOS.map((p, i) => (
              <div key={i} style={{ background: "#111", border: "1px solid #1A1A1A", overflow: "hidden" }}>
                <div style={{ width: "100%", aspectRatio: "3/4", background: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 32, color: "#333", fontWeight: 700 }}>DS</span>
                </div>
                <div style={{ padding: "16px" }}>
                  <p style={{ margin: "0 0 4px", fontSize: 13, fontWeight: 500, color: "#C9C9C9" }}>{p.label}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#444", fontFamily: '"Space Mono", monospace' }}>{p.format} · {p.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#444", marginBottom: 40 }}>Media Contacts</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { role: "International Booking", name: "M. Van Rooyen", email: "booking@donnstone.com", territory: "Worldwide" },
              { role: "Press & PR", name: "L. Dlamini", email: "press@donnstone.com", territory: "Global" },
              { role: "Management", name: "K. Nkosi", email: "mgmt@donnstone.com", territory: "All enquiries" },
            ].map(c => (
              <div key={c.role} style={{ background: "#111", border: "1px solid #1A1A1A", padding: 28 }}>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F2C200", margin: "0 0 12px" }}>{c.role}</p>
                <p style={{ fontSize: 16, fontWeight: 600, color: "#E8E8E8", margin: "0 0 4px" }}>{c.name}</p>
                <p style={{ fontSize: 13, color: "#555", margin: "0 0 16px" }}>{c.territory}</p>
                <a href={`mailto:${c.email}`} style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#F2C200", textDecoration: "none", letterSpacing: "0.1em" }}>{c.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
