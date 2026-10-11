/** @format */

// ── Replace YOUR_SPACE_ID with your Testimonial.to space id ──────────────────
// Sign up at testimonial.to → create a Space → copy the id from the embed code
const TESTIMONIAL_SPACE_ID = "YOUR_SPACE_ID";
const TESTIMONIAL_SUBMIT_URL = `https://testimonial.to/r/${TESTIMONIAL_SPACE_ID}`;
// ─────────────────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>The Crowd</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 24px" }}>Experience</h1>
        <p style={{ fontSize: 16, color: "#BFA8A0", maxWidth: 560, lineHeight: 1.8, margin: 0 }}>
          Promoters, venue owners and fans — share your experience. Record a quick video directly from your phone.
        </p>
      </section>

      {/* Leave a review CTA */}
      <section style={{ padding: "64px clamp(20px,5vw,64px)", borderBottom: "1px solid #1E0E0E", background: "#110808" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 20 }}>Share Your Experience</p>
          <h2 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(20px,3vw,32px)", letterSpacing: "0.06em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>
            Been at one of his sets?
          </h2>
          <p style={{ fontSize: 15, color: "#BFA8A0", lineHeight: 1.8, margin: "0 0 36px" }}>
            Record a short video review straight from your phone — no app needed. Takes less than 2 minutes.
          </p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <a
              href={TESTIMONIAL_SUBMIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "18px 48px",
                display: "inline-block",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#B5252A")}
              onMouseLeave={e => (e.currentTarget.style.background = "#9B1D20")}
            >
              Leave a Video Review
            </a>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#7A6060", letterSpacing: "0.12em" }}>
              Record on phone · Upload video · Works on any device
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial.to embed wall */}
      <section style={{ padding: "80px clamp(20px,5vw,64px) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#7A6060", marginBottom: 48 }}>What People Say</p>

          {TESTIMONIAL_SPACE_ID === "YOUR_SPACE_ID" ? (
            /* Placeholder shown until space ID is configured */
            <div style={{ border: "1px dashed #2A1414", padding: "64px 40px", textAlign: "center" }}>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Setup Required</p>
              <p style={{ fontSize: 14, color: "#7A6060", lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
                Sign up at testimonial.to, create a Space named "donnstone", then replace <code style={{ color: "#BFA8A0" }}>YOUR_SPACE_ID</code> in ExperiencePage.tsx with your actual space ID.
              </p>
            </div>
          ) : (
            /* Live embed once space ID is set */
            <div
              className="testimonial-to-embed"
              dangerouslySetInnerHTML={{
                __html: `<div id="testimonial-to-embed" data-url="https://embed.testimonial.to/w/${TESTIMONIAL_SPACE_ID}?theme=dark&card=base&loadmore=on&initialcount=20"></div><script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"></script><script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, '#testimonial-to-embed')</script>`,
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
}
