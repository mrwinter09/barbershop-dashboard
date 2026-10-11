/** @format */

const VIDEOS = [
  { id: "KJiH8x8cAeM", title: "Donn Stone — Live Set",          venue: "",              year: "" },
  { id: "jgG7z-1uxj8", title: "Donn Stone — Performance",       venue: "",              year: "" },
  { id: "nvPEU_9iboA", title: "Donn Stone — Live",              venue: "",              year: "" },
  { id: "3US8qZb2cP8", title: "Donn Stone — Set",               venue: "",              year: "" },
  { id: "qLkOGAb2omU", title: "Donn Stone — Performance",       venue: "",              year: "" },
  { id: "dudLs9Ueru4", title: "Donn Stone — Live",              venue: "",              year: "" },
  { id: "QN3_M4wJx2Q", title: "Donn Stone — Set",               venue: "",              year: "" },
  { id: "ZBYdlg3qv40", title: "Donn Stone — Live Performance",  venue: "",              year: "" },
];

function YTEmbed({ id, startAt }: { id: string; startAt?: number }) {
  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1${startAt ? `&start=${startAt}` : ""}`;
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#110808" }}>
      <iframe
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        title="Donn Stone video"
      />
    </div>
  );
}

export default function VideoPage() {
  const [featured, ...rest] = VIDEOS;

  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Performances</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: 0 }}>Video</h1>
      </section>

      {/* Featured */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 24 }}>Featured</p>
          <div style={{ border: "1px solid #1E0E0E" }}>
            <YTEmbed id={featured.id} />
            <div style={{ padding: "20px 24px", borderTop: "1px solid #1E0E0E", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 600, color: "#EAD5C8" }}>{featured.title}</h2>
                {(featured.venue || featured.year) && <p style={{ margin: 0, fontSize: 13, color: "#5A3A32" }}>{[featured.venue, featured.year].filter(Boolean).join(" · ")}</p>}
              </div>
              <a href={`https://www.youtube.com/watch?v=${featured.id}`} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "10px 20px",
              }}>Watch on YouTube</a>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: "64px clamp(20px,5vw,64px) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 32 }}>More Performances</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {rest.map(v => (
              <div key={v.id} style={{ border: "1px solid #1E0E0E", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#9B1D20")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1E0E0E")}
              >
                <YTEmbed id={v.id} />
                <div style={{ padding: "16px 20px", borderTop: "1px solid #1E0E0E", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <div>
                    <h3 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 600, color: "#EAD5C8" }}>{v.title}</h3>
                    {(v.venue || v.year) && <p style={{ margin: 0, fontSize: 12, color: "#5A3A32" }}>{[v.venue, v.year].filter(Boolean).join(" · ")}</p>}
                  </div>
                  <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9B1D20", textDecoration: "none", whiteSpace: "nowrap" }}
                  >↗ YouTube</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SoundCloud CTA */}
      <section style={{ borderTop: "1px solid #1E0E0E", padding: "64px clamp(20px,5vw,64px)", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Mixes</p>
        <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(20px,3vw,32px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>Full Sets on SoundCloud</h2>
        <p style={{ fontSize: 15, color: "#5A3A32", maxWidth: 400, margin: "0 auto 32px", lineHeight: 1.7 }}>Catch Donn Stone's recorded sets and mixes including the Operator Radio session.</p>
        <a href="https://soundcloud.com/don-stone-2" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
          color: "#EAD5C8", background: "#FF5500", textDecoration: "none", padding: "16px 36px",
        }}>Open SoundCloud</a>
      </section>
    </div>
  );
}
