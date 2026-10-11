/** @format */

type Show = { date: string; event: string; venue: string; city: string; tickets?: string };

// ── ADD NEW UPCOMING SHOWS HERE ──────────────────────────────────────────────
const UPCOMING_SHOWS: Show[] = [
  // Example:
  // { date: "DD Mon YYYY", event: "Event Name", venue: "Venue Name", city: "City", tickets: "https://..." },
];
// ─────────────────────────────────────────────────────────────────────────────

const ALL_SHOWS: Show[] = [
  { date: "19 Sep 2026", event: "Bairro Summer Closing",                     venue: "Kunstfabriek",             city: "Rotterdam" },
  { date: "25 Jul 2026", event: "ConstantMo · Summer Edition",              venue: "The Other Side",           city: "Amsterdam" },
  { date: "23 May 2026", event: "Toffler",                                   venue: "Toffler",                  city: "Rotterdam" },
  { date: "22 Oct 2025", event: "VimADE",                                    venue: "Bitterzoet",               city: "Amsterdam" },
  { date: "25 Jul 2025", event: "Toffler",                                   venue: "Toffler",                  city: "Rotterdam" },
  { date: "06 Apr 2025", event: "House of",                                  venue: "Bitterzoet",               city: "Amsterdam" },
  { date: "14 Dec 2024", event: "Woza",                                      venue: "Parallel",                 city: "Amsterdam" },
  { date: "13 Dec 2024", event: "Toffler",                                   venue: "Toffler",                  city: "Rotterdam" },
  { date: "24 Aug 2024", event: "DJ Maphorisa",                              venue: "Annabel",                  city: "Rotterdam" },
  { date: "24 Aug 2024", event: "Audio Obscura Festival",                    venue: "Van Nelle Fabriek",        city: "Rotterdam" },
  { date: "18 Aug 2024", event: "LatinVillage Festival · 20 Year Anniversary", venue: "Spaarnwoude",           city: "Velsen-Zuid" },
  { date: "26 Jul 2024", event: "Toffler",                                   venue: "Toffler",                  city: "Rotterdam" },
  { date: "21 Oct 2023", event: "Thuishaven · Day ADE",                     venue: "Thuishaven terrein",       city: "Amsterdam" },
  { date: "01 Oct 2023", event: "Private School Sunday",                     venue: "The Grit",                 city: "Rotterdam" },
  { date: "30 Sep 2023", event: "Africa Rising",                             venue: "IJland",                   city: "Amsterdam" },
  { date: "19 Aug 2023", event: "LatinVillage Festival",                     venue: "Spaarnwoude",              city: "Velsen-Zuid" },
  { date: "01–02 Jul 2023", event: "Sun Splash",                             venue: "AFAS Live",                city: "Amsterdam" },
  { date: "25 Mar 2023", event: "Cloud 8",                                   venue: "Perron",                   city: "Rotterdam" },
  { date: "28 Jan 2023", event: "Major League DJz",                          venue: "Paradiso",                 city: "Amsterdam" },
  { date: "27 Jan 2023", event: "Major League DJZ",                          venue: "Now&Wow",                  city: "Rotterdam" },
  { date: "26 Dec 2022", event: "Oak · Indoor Festival",                     venue: "Maassilo",                 city: "Rotterdam" },
  { date: "24 Dec 2022", event: "Jimmy · X-Mas Speciaaltje XL",             venue: "Now&Wow",                  city: "Rotterdam" },
  { date: "12 Nov 2022", event: "Thuishaven",                                venue: "Thuishaven terrein",       city: "Amsterdam" },
  { date: "05 Nov 2022", event: "Blends World",                              venue: "Maassilo",                 city: "Rotterdam" },
  { date: "21 Oct 2022", event: "Tribes #2 ADE",                            venue: "Paradiso",                 city: "Amsterdam" },
  { date: "24 Sep 2022", event: "Expedition Festival",                       venue: "Roel Langerakpark",        city: "Rotterdam" },
  { date: "27 Aug 2022", event: "Afro Nation · Indoor Festival",             venue: "Maassilo",                 city: "Rotterdam" },
  { date: "22–23 Jul 2022", event: "7Fest",                                  venue: "Zuiderpark",               city: "Den Haag" },
  { date: "08 Jul 2022", event: "Afro Nation",                               venue: "Paradiso",                 city: "Amsterdam" },
  { date: "13 May 2022", event: "Afro Nation",                               venue: "IKON",                     city: "Antwerpen" },
  { date: "02 Oct 2021", event: "Operator × MONO × Weelde · Carnival Special", venue: "Weelde",               city: "Rotterdam" },
  { date: "12 Sep 2020", event: "Hypnotize",                                 venue: "POING",                    city: "Rotterdam" },
  { date: "09 Aug 2020", event: "The Couch × Ice Cream's Boatparty",        venue: "Boat",                     city: "Rotterdam" },
  { date: "28 Feb 2020", event: "Superfriday",                               venue: "Superdisco",               city: "Rotterdam" },
  { date: "08 Feb 2020", event: "Hypnotize",                                 venue: "POING",                    city: "Rotterdam" },
  { date: "10 Jan 2020", event: "Superfriday · Spick & Spang",              venue: "Superdisco",               city: "Rotterdam" },
  { date: "12 Dec 2019", event: "Panchi · 2 Year Anniversary",              venue: "Superdisco",               city: "Rotterdam" },
  { date: "22 Nov 2019", event: "Superfriday × Spick & Spang",              venue: "Superdisco",               city: "Rotterdam" },
  { date: "25 Oct 2019", event: "Superfriday",                               venue: "Superdisco",               city: "Rotterdam" },
  { date: "27 Sep 2019", event: "Superfriday",                               venue: "Superdisco",               city: "Rotterdam" },
  { date: "09 Aug 2019", event: "FIlo · Tropical Juice Edition",            venue: "BIRD",                     city: "Rotterdam" },
  { date: "29 Jun 2019", event: "Confetti Fest",                             venue: "Keilecafé",                city: "Rotterdam" },
  { date: "08 Jun 2019", event: "FIlo · One Year Anniversary",              venue: "The Suicide Club",         city: "Rotterdam" },
  { date: "01 Jun 2019", event: "DONNA",                                     venue: "The Suicide Club",         city: "Rotterdam" },
  { date: "04 May 2019", event: "The Couch · Season 4",                     venue: "Superdisco",               city: "Rotterdam" },
  { date: "11 Apr 2019", event: "Panchi Club Edits · EP Release Party",     venue: "Superdisco",               city: "Rotterdam" },
  { date: "30 Mar 2019", event: "Filo · Forbidden Fruit Edition",           venue: "The Suicide Club",         city: "Rotterdam" },
  { date: "09 Mar 2019", event: "Now&Wow Club · Superbimbo",                venue: "Now&Wow",                  city: "Rotterdam" },
  { date: "02 Nov 2018", event: "Milky Way",                                 venue: "Club NYX",                 city: "Amsterdam" },
  { date: "10 Sep 2018", event: "STIR it up · End of Summer Vibes",         venue: "Altijd in de Buurt",       city: "Rotterdam" },
];

export default function TourPage() {
  return (
    <div style={{ background: "#0A0504", minHeight: "100vh", color: "#EAD5C8" }}>
      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", borderBottom: "1px solid #1E0E0E" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 16 }}>Live</p>
        <h1 style={{ fontFamily: '"Space Mono", monospace', fontWeight: 700, fontSize: "clamp(36px,6vw,72px)", letterSpacing: "0.04em", textTransform: "uppercase", color: "#EAD5C8", margin: "0 0 16px" }}>Tour Dates</h1>
        <p style={{ fontSize: 15, color: "#5A3A32", margin: 0 }}>{ALL_SHOWS.length} shows · 2018 – 2026</p>
      </section>

      {/* Upcoming shows */}
      {UPCOMING_SHOWS.length > 0 && (
        <section style={{ padding: "64px clamp(20px,5vw,64px) 0", borderBottom: "1px solid #1E0E0E" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B1D20", marginBottom: 24 }}>Upcoming</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {UPCOMING_SHOWS.map((s, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "130px 1fr 200px 140px auto", gap: 16, alignItems: "center", padding: "22px 0", borderBottom: "1px solid #1E0E0E" }}>
                  <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#9B1D20" }}>{s.date}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#EAD5C8" }}>{s.event}</span>
                  <span style={{ fontSize: 13, color: "#5A3A32" }}>{s.venue}</span>
                  <span style={{ fontSize: 13, color: "#3D2020" }}>{s.city}</span>
                  {s.tickets && (
                    <a href={s.tickets} target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: '"Space Mono", monospace', fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "#EAD5C8", background: "#9B1D20", textDecoration: "none", padding: "10px 18px", whiteSpace: "nowrap",
                    }}>Tickets</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All shows */}
      <section style={{ padding: "64px clamp(20px,5vw,64px) 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020", marginBottom: 32 }}>All Shows — Most Recent First</p>

          {/* Column headers */}
          <div className="ds-tour-head" style={{ marginBottom: 4 }}>
            {["Date", "Event", "Venue", "City"].map((h, i) => (
              <span key={h} className={i === 2 ? "ds-tour-venue" : i === 3 ? "ds-tour-city" : ""} style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3D2020" }}>{h}</span>
            ))}
          </div>

          {ALL_SHOWS.map((s, i) => (
            <div key={i} className="ds-tour-row"
              style={{ transition: "background 0.15s", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#110808")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.08em", color: "#9B1D20", whiteSpace: "nowrap" }}>{s.date}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#EAD5C8" }}>{s.event}</span>
              <span className="ds-tour-venue" style={{ fontSize: 13, color: "#5A3A32" }}>{s.venue}</span>
              <span className="ds-tour-city" style={{ fontSize: 13, color: "#3D2020" }}>{s.city}</span>
            </div>
          ))}
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
