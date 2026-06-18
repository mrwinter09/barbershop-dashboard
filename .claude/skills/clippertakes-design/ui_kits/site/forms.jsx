/* ClipperTakes Studio — About + the two invitation forms. */
(function () {
  const NS = window.KiruBarbershopDesignSystem_db9aa3;
  const { Button, TextInput, Select, Switch, Card, ProgressCounter } = NS;
  const { NEIGHBORHOODS, TARGET } = window.CT_DATA;

  if (!document.getElementById("ct-forms-styles")) {
    const el = document.createElement("style");
    el.id = "ct-forms-styles";
    el.textContent = `
    .about-hero { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px,5vw,64px); align-items: center;
      padding: clamp(40px,6vw,80px) 0; }
    .about-hero h1 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-display);
      line-height: 1.05; letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 14px 0 0; }
    .about-hero p { font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--text-body); margin-top: 20px; }
    .about-media { aspect-ratio: 5/4; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-image); }
    .about-media img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 860px){ .about-hero { grid-template-columns: 1fr; } }

    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px,2.5vw,28px); }
    .step { background-color: var(--surface-card); background-image: var(--paper-texture);
      border: 1px solid var(--border-hairline); border-radius: var(--radius-lg); padding: 26px 24px; }
    .step__n { font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: var(--clay-600); letter-spacing: .1em; }
    .step h4 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h4); color: var(--text-strong); margin: 12px 0 8px; }
    .step p { font-size: 15px; line-height: 1.6; color: var(--text-body); }
    @media (max-width: 760px){ .steps { grid-template-columns: 1fr; } }

    .photo-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    .photo-strip div { aspect-ratio: 1; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); }
    .photo-strip img { width: 100%; height: 100%; object-fit: cover; }
    @media (max-width: 760px){ .photo-strip { grid-template-columns: repeat(2, 1fr); } }

    .form-page { max-width: 640px; margin: 0 auto; padding: clamp(40px,6vw,72px) 0 90px; }
    .form-page__kick { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-wider);
      text-transform: uppercase; color: var(--clay-600); }
    .form-page h1 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h1);
      letter-spacing: var(--tracking-snug); color: var(--text-strong); margin: 12px 0 0; }
    .form-page__lead { font-size: var(--text-lg); line-height: 1.6; color: var(--text-body); margin: 16px 0 30px; }
    .form-fields { display: flex; flex-direction: column; gap: 18px; }
    .form-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    @media (max-width: 560px){ .form-grid2 { grid-template-columns: 1fr; } }
    .form-actions { margin-top: 8px; display: flex; align-items: center; gap: 16px; }
    .form-note { font-size: 13px; color: var(--text-muted); }

    .done { text-align: center; padding: 30px 8px; }
    .done__mark { width: 56px; height: 56px; border-radius: 50%; background: var(--moss-100); color: var(--moss-700);
      display: inline-flex; align-items: center; justify-content: center; font-size: 26px; margin-bottom: 18px; }
    .done h2 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h2); color: var(--text-strong); }
    .done p { color: var(--text-body); line-height: 1.6; margin: 12px auto 0; max-width: 44ch; }
    `;
    document.head.appendChild(el);
  }

  const ROLES = ["Resident", "Entrepreneur", "Volunteer", "Maker", "Organizer", "Other"];

  /* ---------------- About / The Chair ---------------- */
  function About({ go, collected }) {
    const imgs = ["interior-1.jpg", "hero.jpg", "interior-3.jpg", "shop-2.jpg"].map((n) => `../../assets/img/${n}`);
    return (
      <div>
        <div className="wrap">
          <section className="about-hero">
            <div>
              <span className="eyebrow" style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>The chair · The format · The maker</span>
              <h1>A barbershop is where a neighbourhood talks to itself.</h1>
              <p>
                ClipperTakes takes that idea on the road. Ivan Winter — a barber and theatre
                maker — brings a travelling chair to Rotterdam's streets, markets and festivals.
                You sit down for a haircut. While the clippers run, he asks one question. The
                conversation becomes a two-to-three minute portrait.
              </p>
              <p style={{ marginTop: 16 }}>
                Fifty portraits, numbered one to fifty, building a public archive of the city's
                ordinary, extraordinary voices — neighbours, makers, organisers. Not influencers.
                Not celebrities. People you'd recognise before you'd follow.
              </p>
              <div style={{ marginTop: 26, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button variant="primary" onClick={() => go("submit")}>Tell your story</Button>
                <Button variant="ghost" onClick={() => go("stories")}>See the archive →</Button>
              </div>
            </div>
            <div className="about-media"><img src={imgs[0]} alt="The travelling chair" /></div>
          </section>
        </div>

        <div className="wrap">
          <section className="section" style={{ paddingTop: 0 }}>
            <div className="steps">
              <div className="step"><div className="step__n">01</div><h4>The chair arrives</h4><p>It travels to a neighbourhood — a market square, a festival, a quiet street corner — and sets up where people already are.</p></div>
              <div className="step"><div className="step__n">02</div><h4>One question</h4><p>You sit down for a real haircut. While the clippers run, there's one question, and time to actually answer it.</p></div>
              <div className="step"><div className="step__n">03</div><h4>A portrait is kept</h4><p>The conversation becomes a short film, numbered and added to the archive of fifty — for the city to keep and come back to.</p></div>
            </div>
          </section>

          <section className="section" style={{ paddingTop: 0 }}>
            <div className="photo-strip">
              {imgs.map((src, i) => (<div key={i}><img src={src} alt="" /></div>))}
            </div>
          </section>

          <section className="section" style={{ paddingTop: 0 }}>
            <Card padding="lg" shadow="sm">
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 28, justifyContent: "space-between" }}>
                <div style={{ maxWidth: "32ch" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-h3)", color: "var(--text-strong)", marginBottom: 8 }}>The archive is {collected} of {TARGET}, and growing.</h3>
                  <p style={{ color: "var(--text-body)", lineHeight: 1.6 }}>Every session adds a voice. Want to be one of them, or point us toward someone who should be?</p>
                </div>
                <div style={{ minWidth: 240, flex: 1 }}>
                  <ProgressCounter count={collected} total={TARGET} size="md" />
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    );
  }

  /* ---------------- Submit Your Story ---------------- */
  function SubmitStory({ onSubmit }) {
    const [f, setF] = React.useState({ name: "", neighborhood: "", role: "", date: "", about: "", link: "", keep: true });
    const [done, setDone] = React.useState(null);
    const set = (k) => (e) => setF({ ...f, [k]: e.currentTarget ? e.currentTarget.value : e.target.value });
    const submit = (e) => {
      e.preventDefault();
      if (!f.name.trim()) return;
      const number = onSubmit(f);
      setDone({ name: f.name.trim(), number });
    };
    if (done) {
      return (
        <div className="wrap"><div className="form-page">
          <div className="done">
            <div className="done__mark">✓</div>
            <h2>Thank you, {done.name.split(" ")[0]}.</h2>
            <p>You're pencilled in as <b>Story {String(done.number).padStart(2, "0")} / {TARGET}</b>, waiting in the chair. We'll reach out to find a time and a place. No haircut is mandatory — but it's encouraged.</p>
          </div>
        </div></div>
      );
    }
    return (
      <div className="wrap"><div className="form-page">
        <span className="form-page__kick">An invitation — not a booking</span>
        <h1>Tell us who you are.</h1>
        <p className="form-page__lead">If you'd like to sit in the chair, leave a few details and we'll be in touch. There's no form to perfect here — just the start of a conversation.</p>
        <form className="form-fields" onSubmit={submit}>
          <TextInput label="Your name" placeholder="First and last" value={f.name} onChange={set("name")} required />
          <div className="form-grid2">
            <Select label="Your neighbourhood" placeholder="Where in Rotterdam?" value={f.neighborhood} onChange={set("neighborhood")} data={NEIGHBORHOODS} />
            <Select label="You are a…" placeholder="Pick the closest" value={f.role} onChange={set("role")} data={ROLES} />
          </div>
          <TextInput label="A time that might suit you" type="date" value={f.date} onChange={set("date")} hint="Just a rough preference — we'll confirm." />
          <TextInput label="What might your story be about?" multiline rows={3} placeholder="A sentence or two — what you'd talk about while the clippers run." value={f.about} onChange={set("about")} />
          <TextInput label="A video link (optional)" placeholder="Instagram / YouTube link, if you have a clip already" value={f.link} onChange={set("link")} hint="You can always add this later." />
          <Switch label="I'd like to stay in touch about the project" checked={f.keep} onChange={(e) => setF({ ...f, keep: e.currentTarget.checked })} />
          <div className="form-actions">
            <Button variant="accent" size="lg" type="submit">Send it in</Button>
            <span className="form-note">We read every one. No spam, ever.</span>
          </div>
        </form>
      </div></div>
    );
  }

  /* ---------------- Recommend Someone ---------------- */
  function Recommend({ onSubmit }) {
    const [f, setF] = React.useState({ who: "", how: "", why: "", from: "" });
    const [done, setDone] = React.useState(false);
    const set = (k) => (e) => setF({ ...f, [k]: e.currentTarget.value });
    const submit = (e) => {
      e.preventDefault();
      if (!f.who.trim() || !f.why.trim()) return;
      onSubmit(f);
      setDone(true);
    };
    if (done) {
      return (
        <div className="wrap"><div className="form-page">
          <div className="done">
            <div className="done__mark">✓</div>
            <h2>Noted — thank you.</h2>
            <p>We'll look into <b>{f.who.trim()}</b>. Rotterdam helps decide who sits in the chair next, and that's exactly how it should be.</p>
          </div>
        </div></div>
      );
    }
    return (
      <div className="wrap"><div className="form-page">
        <span className="form-page__kick">Help us decide who's next</span>
        <h1>Point us toward someone.</h1>
        <p className="form-page__lead">Know a Rotterdammer whose story deserves the chair? Tell us about them. This is how the archive stays the city's, not ours.</p>
        <form className="form-fields" onSubmit={submit}>
          <TextInput label="Who should we speak to?" placeholder="Their name" value={f.who} onChange={set("who")} required />
          <TextInput label="How do you know them?" placeholder="Neighbour, colleague, the baker on your corner…" value={f.how} onChange={set("how")} />
          <TextInput label="Why does their story matter?" multiline rows={3} placeholder="One or two sentences is plenty." value={f.why} onChange={set("why")} required />
          <TextInput label="Your name (optional)" placeholder="So we can thank you" value={f.from} onChange={set("from")} />
          <div className="form-actions">
            <Button variant="primary" size="lg" type="submit">Send recommendation</Button>
            <span className="form-note">Goes to us privately — nothing is published automatically.</span>
          </div>
        </form>
      </div></div>
    );
  }

  window.CTForms = { About, SubmitStory, Recommend };
})();
