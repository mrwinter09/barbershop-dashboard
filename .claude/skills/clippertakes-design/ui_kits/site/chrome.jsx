/* ClipperTakes Studio — app chrome (header + footer).
   Shares components via window for the other babel scripts. */
(function () {
  const { Button } = window.KiruBarbershopDesignSystem_db9aa3;

  if (!document.getElementById("ct-site-styles")) {
    const el = document.createElement("style");
    el.id = "ct-site-styles";
    el.textContent = `
    .site { min-height: 100vh; display: flex; flex-direction: column; }
    .site__main { flex: 1; }

    .nav { position: sticky; top: 0; z-index: 20;
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px clamp(20px, 5vw, 56px);
      background: color-mix(in srgb, var(--surface-page) 86%, transparent);
      backdrop-filter: blur(10px) saturate(1.1);
      border-bottom: 1px solid var(--border-hairline); }
    .nav__mark { font-family: var(--font-serif); font-weight: 600; font-size: 22px;
      letter-spacing: -.02em; color: var(--text-strong); cursor: pointer; background: none; border: 0; padding: 0; }
    .nav__mark em { font-style: italic; color: var(--clay-600); }
    .nav__links { display: flex; align-items: center; gap: clamp(14px, 2.4vw, 30px); }
    .nav__link { font-size: 15px; font-weight: 500; color: var(--text-body); background: none; border: 0;
      cursor: pointer; padding: 6px 0; font-family: var(--font-sans);
      border-bottom: 2px solid transparent; transition: color .2s, border-color .2s; }
    .nav__link:hover { color: var(--text-strong); }
    .nav__link--active { color: var(--petrol-700); border-color: var(--yellow-500); }
    @media (max-width: 720px) { .nav__links .nav__link { display: none; } }

    .foot { background-color: var(--petrol-900); background-image: var(--paper-texture); color: var(--petrol-100);
      padding: clamp(40px, 6vw, 72px) clamp(20px, 5vw, 56px) 36px; }
    .foot__grid { display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-between; align-items: flex-start; }
    .foot__mark { font-family: var(--font-serif); font-weight: 600; font-size: 30px; color: var(--paper-0); letter-spacing: -.02em; }
    .foot__mark em { font-style: italic; color: var(--yellow-500); }
    .foot__tag { margin-top: 10px; max-width: 360px; line-height: 1.6; color: var(--petrol-100); }
    .foot__col h5 { font-family: var(--font-mono); font-size: 11px; letter-spacing: var(--tracking-wider);
      text-transform: uppercase; color: var(--petrol-300); margin-bottom: 12px; }
    .foot__col button { display: block; background: none; border: 0; color: var(--petrol-100); font-size: 15px;
      cursor: pointer; padding: 5px 0; font-family: var(--font-sans); text-align: left; }
    .foot__col button:hover { color: var(--paper-0); }
    .foot__rule { border: 0; border-top: 1px solid rgba(255,255,255,0.12); margin: 36px 0 18px; }
    .foot__base { display: flex; flex-wrap: wrap; gap: 8px 18px; justify-content: space-between;
      font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase; color: var(--petrol-300); }
    `;
    document.head.appendChild(el);
  }

  const NAV = [
    { key: "home", label: "Home" },
    { key: "stories", label: "The Stories" },
    { key: "about", label: "The Chair" },
    { key: "recommend", label: "Recommend someone" },
  ];

  function Header({ route, go }) {
    return (
      <nav className="nav">
        <button className="nav__mark" onClick={() => go("home")}>
          Clipper<em>Takes</em>
        </button>
        <div className="nav__links">
          {NAV.map((n) => (
            <button
              key={n.key}
              className={"nav__link" + (route === n.key ? " nav__link--active" : "")}
              onClick={() => go(n.key)}
            >
              {n.label}
            </button>
          ))}
          <Button variant="accent" size="sm" onClick={() => go("submit")}>Tell your story</Button>
        </div>
      </nav>
    );
  }

  function Footer({ go }) {
    return (
      <footer className="foot">
        <div className="foot__grid">
          <div>
            <div className="foot__mark">Clipper<em>Takes</em></div>
            <p className="foot__tag">
              A travelling barber chair collecting fifty voices from Rotterdam — one
              conversation, one haircut, one story at a time.
            </p>
          </div>
          <div className="foot__col">
            <h5>The project</h5>
            <button onClick={() => go("stories")}>The Stories</button>
            <button onClick={() => go("about")}>The Chair</button>
            <button onClick={() => go("submit")}>Tell your story</button>
            <button onClick={() => go("recommend")}>Recommend someone</button>
          </div>
          <div className="foot__col">
            <h5>Rotterdam</h5>
            <button onClick={() => go("stories")}>Afrikaanderwijk</button>
            <button onClick={() => go("stories")}>Delfshaven</button>
            <button onClick={() => go("stories")}>Nieuwe Binnenweg</button>
            <button onClick={() => go("stories")}>Noord</button>
          </div>
        </div>
        <hr className="foot__rule" />
        <div className="foot__base">
          <span>ClipperTakes Studio · Rotterdam · 2026</span>
          <span>An independent cultural project</span>
        </div>
      </footer>
    );
  }

  window.CTChrome = { Header, Footer };
})();
