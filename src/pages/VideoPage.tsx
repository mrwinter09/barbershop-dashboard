/** @format */

const VIDEOS = [
  {
    id: "ZBYdlg3qv40",
    title: "Donn Stone — Live Performance",
    venue: "Live Set",
    year: "2024",
    desc: "Donn Stone live, showcasing his Amapiano selections.",
  },
];

function YTEmbed({ id }: { id: string }) {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#110808" }}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        title="Donn Stone video"
      />
    </div>
  );
}

export default function VideoPage() {
  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Performances</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: 0 }}>Video</h1>
      </section>

      {/* Featured video */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {VIDEOS.length > 0 && (
            <div style={{ marginBottom: 64 }}>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 24 }}>Featured</p>
              <div style={{ border: "1px solid #1E0E0E" }}>
                <YTEmbed id={VIDEOS[0].id} />
                <div style={{ padding: "24px 28px", borderTop: "1px solid #1E0E0E" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 600, color: "#EAD5C8" }}>{VIDEOS[0].title}</h2>
                      <p style={{ margin: 0, fontSize: 14, color: "#5A3A32" }}>{VIDEOS[0].venue} · {VIDEOS[0].year}</p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${VIDEOS[0].id}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{
                        fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase",
                        color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "10px 20px",
                      }}
                    >Watch on YouTube</a>
                  </div>
                  {VIDEOS[0].desc && <p style={{ marginTop: 12, fontSize: 14, color: "#5A3A32", lineHeight: 1.7 }}>{VIDEOS[0].desc}</p>}
                </div>
              </div>
            </div>
          )}

          {/* More videos grid */}
          {VIDEOS.length > 1 && (
            <>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 24 }}>More Performances</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                {VIDEOS.slice(1).map(v => (
                  <div key={v.id} style={{ border: "1px solid #1E0E0E" }}>
                    <YTEmbed id={v.id} />
                    <div style={{ padding: "20px 24px", borderTop: "1px solid #1E0E0E" }}>
                      <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 600, color: "#EAD5C8" }}>{v.title}</h3>
                      <p style={{ margin: 0, fontSize: 13, color: "#5A3A32" }}>{v.venue} · {v.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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
