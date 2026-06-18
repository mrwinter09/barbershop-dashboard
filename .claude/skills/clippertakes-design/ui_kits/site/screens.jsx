/* ClipperTakes Studio — primary screens: Home, Stories Board, Story detail. */
(function () {
  const NS = window.KiruBarbershopDesignSystem_db9aa3;
  const { Button, ProgressCounter, StoryCard, StoryStatusTag, NeighborhoodTag, ReflectionItem, ReflectionForm } = NS;
  const { TARGET } = window.CT_DATA;

  if (!document.getElementById("ct-screens-styles")) {
    const el = document.createElement("style");
    el.id = "ct-screens-styles";
    el.textContent = `
    .wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 56px); }
    .section { padding: clamp(48px, 7vw, 96px) 0; }
    .eyebrow { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-wider);
      text-transform: uppercase; color: var(--text-muted); }

    /* hero */
    .hero { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: clamp(28px, 5vw, 64px); align-items: center;
      padding: clamp(40px, 6vw, 88px) 0 clamp(36px, 5vw, 64px); }
    .hero__title { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-hero);
      line-height: var(--leading-tight); letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 14px 0 0; }
    .hero__lead { font-size: var(--text-lg); line-height: var(--leading-relaxed); color: var(--text-body);
      max-width: 46ch; margin-top: 22px; }
    .hero__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    .hero__media { position: relative; aspect-ratio: 4/5; border-radius: var(--radius-xl); overflow: hidden;
      box-shadow: var(--shadow-image); }
    .hero__media img { width: 100%; height: 100%; object-fit: cover; }
    .hero__stamp { position: absolute; left: 16px; bottom: 16px; font-family: var(--font-mono); font-weight: 700;
      font-size: var(--text-xs); letter-spacing: var(--tracking-wide); text-transform: uppercase;
      color: var(--ink-900); background: var(--yellow-500); padding: 5px 10px; border-radius: var(--radius-sm); }
    @media (max-width: 860px) { .hero { grid-template-columns: 1fr; } .hero__media { max-width: 420px; } }

    /* counter band */
    .band { background-color: var(--petrol-900); background-image: var(--paper-texture); }
    .band__inner { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 28px;
      padding: clamp(36px, 5vw, 64px) 0; }
    .band__note { max-width: 34ch; color: var(--petrol-100); line-height: 1.6; font-size: var(--text-base); }

    /* section heads */
    .shead { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
    .shead h2 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h1); color: var(--text-strong); letter-spacing: var(--tracking-snug); }
    .shead p { color: var(--text-muted); margin-top: 8px; max-width: 52ch; line-height: 1.6; }

    .grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(248px, 1fr)); gap: clamp(16px, 2vw, 26px); }

    .hoods { display: flex; flex-wrap: wrap; gap: 10px; }

    /* stories board header */
    .board-head { padding: clamp(36px, 5vw, 64px) 0 8px; }
    .board-head h1 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-display);
      letter-spacing: var(--tracking-tight); color: var(--text-strong); }
    .board-filter { position: sticky; top: 65px; z-index: 10; padding: 18px 0; margin-bottom: 8px;
      background: color-mix(in srgb, var(--surface-page) 90%, transparent); backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--border-hairline); }

    /* story detail */
    .back { display: inline-flex; align-items: center; gap: 8px; margin: 28px 0 0; font-size: 14px; color: var(--text-muted);
      background: none; border: 0; cursor: pointer; font-family: var(--font-sans); }
    .back:hover { color: var(--text-strong); }
    .detail-hero { display: grid; grid-template-columns: 0.92fr 1.08fr; gap: clamp(28px, 4vw, 56px); align-items: start;
      padding: 24px 0 clamp(36px, 5vw, 56px); }
    .detail-media { position: relative; aspect-ratio: 4/5; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-image); }
    .detail-media img { width: 100%; height: 100%; object-fit: cover; }
    .detail-media .stamp { position: absolute; left: 16px; top: 16px; font-family: var(--font-mono); font-weight: 700;
      font-size: var(--text-xs); letter-spacing: var(--tracking-wide); text-transform: uppercase;
      color: var(--ink-900); background: var(--yellow-500); padding: 5px 10px; border-radius: var(--radius-sm); }
    .detail-name { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-display);
      line-height: 1.04; letter-spacing: var(--tracking-tight); color: var(--text-strong); margin: 14px 0 0; }
    .detail-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px; margin-top: 14px; color: var(--text-muted); font-size: 15px; }
    .detail-meta b { color: var(--clay-600); font-weight: 600; }
    .detail-meta .d { width: 3px; height: 3px; border-radius: 50%; background: var(--paper-300); }
    .qa { margin-top: 30px; border-top: 1.5px solid var(--border-default); padding-top: 26px; }
    .qa__q { font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--text-muted); }
    .qa__a { font-family: var(--font-serif); font-size: var(--text-quote); line-height: var(--leading-quote);
      color: var(--coffee-900); margin-top: 14px; }
    @media (max-width: 860px) { .detail-hero { grid-template-columns: 1fr; } .detail-media { max-width: 420px; } }

    .reflections { max-width: 720px; }
    .reflections h3 { font-family: var(--font-serif); font-weight: 600; font-size: var(--text-h2); color: var(--text-strong); margin-bottom: 6px; }
    .reflections__sub { color: var(--text-muted); margin-bottom: 18px; }
    .reflections__list { margin-bottom: 26px; }
    .reflections__empty { color: var(--text-faint); font-style: italic; font-family: var(--font-serif); font-size: 18px; padding: 14px 0 26px; }
    `;
    document.head.appendChild(el);
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  /* ---------------- Home ---------------- */
  function Home({ stories, collected, go, openStory }) {
    const recent = stories.filter((s) => s.status === "published").slice(0, 4);
    const lead = stories[0];
    const hoodCounts = {};
    stories.filter((s) => s.status === "published").forEach((s) => {
      hoodCounts[s.neighborhood] = (hoodCounts[s.neighborhood] || 0) + 1;
    });
    return (
      <div>
        <div className="wrap">
          <section className="hero">
            <div>
              <span className="eyebrow">Rotterdam · A living archive · 2026</span>
              <h1 className="hero__title">50 Conversations.<br />One City.</h1>
              <p className="hero__lead">
                A barber chair travels through Rotterdam. People sit down, the clippers
                start, and we ask one question. The conversation becomes a short portrait —
                a voice from the neighbourhood, kept for everyone.
              </p>
              <div className="hero__cta">
                <Button variant="primary" size="lg" onClick={() => go("stories")}>Explore the Stories</Button>
                <Button variant="outline" size="lg" onClick={() => go("about")}>About the chair</Button>
              </div>
            </div>
            <div className="hero__media">
              <img src={lead.image} alt="In the chair" />
              <span className="hero__stamp">Story {pad(lead.number)} / {TARGET}</span>
            </div>
          </section>
        </div>

        <div className="band">
          <div className="wrap band__inner">
            <ProgressCounter count={collected} total={TARGET} size="lg" onDark />
            <p className="band__note">
              Every story published brings the archive closer to fifty. This is the count a
              funder, a neighbour, or a future participant sees first.
            </p>
          </div>
        </div>

        <div className="wrap">
          <section className="section">
            <div className="shead">
              <div>
                <span className="eyebrow">Recently in the chair</span>
                <h2>Voices from the neighbourhood</h2>
              </div>
              <Button variant="ghost" onClick={() => go("stories")}>See all stories →</Button>
            </div>
            <div className="grid-cards">
              {recent.map((s) => (
                <StoryCard key={s.id} number={s.number} total={TARGET} name={s.name} role={s.role}
                  neighborhood={s.neighborhood} image={s.image} teaser={`“${s.answer.split(". ")[0]}.”`}
                  statusTag={<StoryStatusTag status="published" />}
                  as="button" onClick={() => openStory(s.id)} />
              ))}
            </div>
          </section>

          <section className="section" style={{ paddingTop: 0 }}>
            <div className="shead">
              <div>
                <span className="eyebrow">Where the chair has been</span>
                <h2>Rotterdam, neighbourhood by neighbourhood</h2>
                <p>The chair moves on. Each neighbourhood adds its own accent to the archive.</p>
              </div>
            </div>
            <div className="hoods">
              {Object.keys(hoodCounts).map((h) => (
                <NeighborhoodTag key={h} name={h} count={hoodCounts[h]} as="button" onClick={() => go("stories")} />
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  /* ---------------- Stories Board ---------------- */
  function StoriesBoard({ stories, collected, openStory }) {
    const [filter, setFilter] = React.useState("all");
    const hoods = {};
    stories.forEach((s) => { hoods[s.neighborhood] = (hoods[s.neighborhood] || 0) + 1; });
    const visible = stories.filter((s) => filter === "all" || s.neighborhood === filter);
    return (
      <div className="wrap">
        <section className="board-head">
          <span className="eyebrow">The archive · {collected} of {TARGET} collected</span>
          <h1>The Stories</h1>
          <div style={{ maxWidth: 560, marginTop: 10 }}>
            <ProgressCounter count={collected} total={TARGET} size="md" />
          </div>
        </section>
        <div className="board-filter">
          <div className="hoods">
            <NeighborhoodTag name="All of Rotterdam" count={stories.length} active={filter === "all"}
              as="button" onClick={() => setFilter("all")} />
            {Object.keys(hoods).map((h) => (
              <NeighborhoodTag key={h} name={h} count={hoods[h]} active={filter === h}
                as="button" onClick={() => setFilter(h)} />
            ))}
          </div>
        </div>
        <section style={{ padding: "20px 0 88px" }}>
          <div className="grid-cards">
            {visible.map((s) => (
              <StoryCard key={s.id} number={s.number} total={TARGET} name={s.name} role={s.role}
                neighborhood={s.neighborhood} image={s.image}
                teaser={s.status === "published" ? `“${s.answer.split(". ")[0]}.”` : undefined}
                status={s.status}
                statusTag={<StoryStatusTag status={s.status} />}
                as="button" onClick={() => s.status === "published" && openStory(s.id)} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  /* ---------------- Story Detail ---------------- */
  function StoryDetail({ story, reflections, onReflect, back, go }) {
    return (
      <div className="wrap">
        <button className="back" onClick={back}>← Back to the stories</button>
        <section className="detail-hero">
          <div className="detail-media">
            <img src={story.image} alt={`Portrait of ${story.name}`} />
            <span className="stamp">Story {pad(story.number)} / {TARGET}</span>
          </div>
          <div>
            <StoryStatusTag status={story.status} />
            <h1 className="detail-name">{story.name}</h1>
            <div className="detail-meta">
              <b>{story.role}</b><span className="d"></span>
              <span>{story.neighborhood}</span><span className="d"></span>
              <span>{story.date}</span>
            </div>
            <div className="qa">
              <div className="qa__q">{story.question}</div>
              <p className="qa__a">“{story.answer}”</p>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: "clamp(28px,4vw,56px)" }}>
          <div className="reflections">
            <h3>Reflections</h3>
            <p className="reflections__sub">
              Read this story? Leave a short response — a sentence is plenty. Like a word
              dropped in the barbershop on your way out.
            </p>
            <div className="reflections__list">
              {reflections.length === 0 ? (
                <div className="reflections__empty">No reflections yet. Be the first to respond.</div>
              ) : (
                reflections.map((r, i) => (
                  <ReflectionItem key={i} text={r.text} name={r.name} neighborhood={r.neighborhood} date={r.date} />
                ))
              )}
            </div>
            <ReflectionForm onSubmit={onReflect} />
          </div>
          <div style={{ marginTop: 40 }}>
            <Button variant="outline" onClick={() => go("recommend")}>Know who should sit in the chair next? →</Button>
          </div>
        </section>
      </div>
    );
  }

  window.CTScreens = { Home, StoriesBoard, StoryDetail };
})();
