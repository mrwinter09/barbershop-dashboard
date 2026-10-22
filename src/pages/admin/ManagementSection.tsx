/** @format */

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChecklistItem {
  id: number; phase: string; task: string; owner: string; due: string; done: boolean;
}
interface Showcase {
  id: number; name: string; location: string; when: string; deadline: string;
  type: string; fit: string; status: string; notes: string;
}
interface MarketingData {
  pillars: { id: number; pillar: string; description: string; formats: string[]; frequency: string }[];
  collabs: { id: number; target: string; type: string; platform: string; priority: string; status: string }[];
  kpis: { id: number; metric: string; target: string; current: number; unit: string }[];
}
interface AgentGate {
  threshold: number;
  indicators: { id: number; label: string; description: string; met: boolean }[];
}
interface Agency {
  name: string; base: string; what: string; fit: string; website: string; when: string; status: string;
}
interface Festival {
  id: string; name: string; city: string; country: string; region: string; genre: string;
  tier: string; timing: string; dates2027: string; pitchBy: string; entryRoute: string;
  target: string; status: string; website: string; contact: string; lastContact: string;
  nextAction: string; notes: string; pitchRoute: string;
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const T = {
  bg: "#0A0504", bg2: "#110808", border: "#1E0E0E", border2: "#2A1414",
  accent: "#9B1D20", text: "#EAD5C8", muted: "#7A6060", font: '"Space Mono", monospace',
};

const card: React.CSSProperties = {
  background: T.bg, border: `1px solid ${T.border}`, padding: "16px", marginBottom: "12px",
};
const label9: React.CSSProperties = {
  fontFamily: T.font, fontSize: 9, letterSpacing: "0.18em",
  textTransform: "uppercase", color: T.muted,
};
const inputStyle: React.CSSProperties = {
  background: T.bg2, border: `1px solid ${T.border2}`, color: T.text,
  padding: "6px 10px", fontFamily: T.font, fontSize: 12, outline: "none",
};
const btn: React.CSSProperties = {
  background: T.accent, color: T.text, border: "none", padding: "8px 16px",
  fontFamily: T.font, fontSize: 11, letterSpacing: "0.1em", cursor: "pointer",
};
const ghostBtn: React.CSSProperties = {
  background: "transparent", color: T.accent, border: `1px solid ${T.accent}`,
  padding: "6px 12px", fontFamily: T.font, fontSize: 11, cursor: "pointer",
};

// ─── Data hooks ───────────────────────────────────────────────────────────────

function useSection<T>(section: string) {
  const [data, setData] = useState<T | null>(null);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setLoading(true);
    fetch(`/api/content?section=${section}`)
      .then(r => r.json())
      .then(({ data, sha }) => { setData(data); setSha(sha); })
      .finally(() => setLoading(false));
  }, [section]);

  useEffect(() => { load(); }, [load]);

  const save = useCallback(async (newData: T) => {
    await fetch(`/api/content?section=${section}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: newData, sha }),
    });
    load();
  }, [section, sha, load]);

  return { data, loading, save };
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color = T.accent }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div style={{ background: T.border, height: 6, borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color, transition: "width 0.3s" }} />
    </div>
  );
}

// ─── Fit badge ────────────────────────────────────────────────────────────────

function FitBadge({ fit }: { fit: string }) {
  const f = fit.toLowerCase();
  let bg = T.border2, color = T.muted;
  if (f.includes("very high")) { bg = "#1a3a1a"; color = "#4CAF50"; }
  else if (f.includes("high")) { bg = "#1a2a1a"; color = "#4CAF50"; }
  else if (f.includes("medium")) { bg = "#3a3a1a"; color = "#FFD700"; }
  else if (f.includes("aspirational")) { bg = "#2A1414"; color = T.muted; }
  return (
    <span style={{
      background: bg, color, padding: "2px 8px", fontSize: 10,
      fontFamily: T.font, letterSpacing: "0.1em", whiteSpace: "nowrap",
    }}>{fit}</span>
  );
}

// ─── Dashboard view ───────────────────────────────────────────────────────────

function DashboardView({ onNavigate }: { onNavigate: (view: string) => void }) {
  const { data: checklist } = useSection<ChecklistItem[]>("checklist");
  const { data: gate } = useSection<AgentGate>("agentgate");
  const { data: festivals } = useSection<Festival[]>("festivals");

  const done = checklist ? checklist.filter(t => t.done).length : 0;
  const total = checklist ? checklist.length : 30;
  const pitched = festivals ? festivals.filter(f => f.status !== "Not started").length : 0;
  const gateMet = gate ? gate.indicators.filter(i => i.met).length : 0;

  const stats = [
    { label: "Checklist", value: `${done}/${total}`, sub: "tasks done", view: "Checklist", pct: done / total },
    { label: "Festivals", value: `${pitched}`, sub: "in pipeline", view: "Festivals", pct: pitched / 70 },
    { label: "Agent Gate", value: `${gateMet}/8`, sub: "indicators met", view: "Agencies", pct: gateMet / 8 },
    { label: "Phase", value: "A", sub: "Brand Setup — Oct 2026", view: "Timeline", pct: 0.05 },
  ];

  return (
    <div>
      <p style={{ ...label9, marginBottom: 20 }}>Overview — Oct 2026</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ ...card, cursor: "pointer", marginBottom: 0 }}
            onClick={() => onNavigate(s.view)}>
            <div style={{ ...label9, marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontFamily: T.font, fontSize: 24, color: T.accent, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginBottom: 10 }}>{s.sub}</div>
            <ProgressBar value={s.pct * 100} max={100} />
          </div>
        ))}
      </div>
      <div style={{ ...card }}>
        <div style={{ ...label9, marginBottom: 12 }}>Current Focus — Phase A</div>
        <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, lineHeight: 1.8 }}>
          → Define brand identity + register all social handles<br />
          → Produce 3–5 release-ready tracks<br />
          → Build EPK and link-in-bio page<br />
          → Research NL Afro/urban bookers & promoters<br />
          → Secure first 3 paid gigs (local/regional)
        </div>
      </div>
    </div>
  );
}

// ─── Timeline view ────────────────────────────────────────────────────────────

function TimelineView() {
  const milestones = [
    { date: "Oct 2026", label: "Brand Setup (Phase A start)", phase: "A", active: true },
    { date: "Nov 2026", label: "First Tracks & EPK", phase: "A", active: false },
    { date: "Dec 2026", label: "First Paid Gigs", phase: "A", active: false },
    { date: "Jan 2027", label: "First Single Release", phase: "B", active: false },
    { date: "Feb 2027", label: "NL Booking Push", phase: "B", active: false },
    { date: "Mar 2027", label: "Festival Submissions", phase: "B", active: false },
    { date: "Apr 2027", label: "Industry Showcases", phase: "B", active: false },
    { date: "Jun 2027", label: "Summer Festival Season", phase: "B", active: false },
    { date: "Jul 2027", label: "EP Release", phase: "C", active: false },
    { date: "Sep 2027", label: "Post-summer Agency Pitch", phase: "C", active: false },
    { date: "Oct 2027", label: "ADE 2027", phase: "C", active: false },
    { date: "Dec 2027", label: "Management / Agency Deal", phase: "C", active: false },
    { date: "Jan 2028", label: "EU Tour Planning (Phase C end)", phase: "C", active: false },
  ];

  const phaseColor: Record<string, string> = { A: "#4CAF50", B: "#FFD700", C: T.accent };

  return (
    <div>
      <p style={{ ...label9, marginBottom: 20 }}>13-Month Plan</p>
      <div style={{ position: "relative", paddingLeft: 32 }}>
        <div style={{
          position: "absolute", left: 8, top: 8, bottom: 8,
          width: 2, background: T.border2,
        }} />
        {milestones.map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", marginBottom: 20, position: "relative" }}>
            <div style={{
              position: "absolute", left: -28, top: 4,
              width: 12, height: 12, borderRadius: "50%",
              background: m.active ? phaseColor[m.phase] : T.border2,
              border: `2px solid ${phaseColor[m.phase]}`,
              boxSizing: "border-box",
            }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: T.font, fontSize: 10, color: T.muted, minWidth: 70 }}>{m.date}</span>
                <span style={{ fontFamily: T.font, fontSize: 12, color: m.active ? T.text : T.muted }}>{m.label}</span>
                <span style={{
                  fontFamily: T.font, fontSize: 9, padding: "1px 6px",
                  background: `${phaseColor[m.phase]}22`, color: phaseColor[m.phase],
                  letterSpacing: "0.1em",
                }}>Phase {m.phase}</span>
                {m.active && (
                  <span style={{ fontFamily: T.font, fontSize: 9, color: T.accent, letterSpacing: "0.12em" }}>◆ NOW</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Checklist view ───────────────────────────────────────────────────────────

function ChecklistView() {
  const { data, loading, save } = useSection<ChecklistItem[]>("checklist");
  const [items, setItems] = useState<ChecklistItem[]>([]);

  useEffect(() => { if (data) setItems(data); }, [data]);

  const toggle = (id: number) => {
    const updated = items.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setItems(updated);
    save(updated);
  };

  if (loading || !items.length) return <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>Loading...</div>;

  const phases = ["A", "B", "C"] as const;
  const phaseLabel: Record<string, string> = { A: "Phase A — Foundation (Oct–Dec 2026)", B: "Phase B — Build (Jan–Jul 2027)", C: "Phase C — Pitch (Jul–Dec 2027)" };
  const done = items.filter(t => t.done).length;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <p style={{ ...label9, margin: 0 }}>Master Checklist</p>
        <span style={{ fontFamily: T.font, fontSize: 11, color: T.accent }}>{done}/{items.length} done</span>
      </div>
      <ProgressBar value={done} max={items.length} />
      <div style={{ marginTop: 24 }}>
        {phases.map(phase => {
          const phaseItems = items.filter(t => t.phase === phase);
          const phaseDone = phaseItems.filter(t => t.done).length;
          return (
            <div key={phase} style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ ...label9 }}>{phaseLabel[phase]}</span>
                <span style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>{phaseDone}/{phaseItems.length}</span>
              </div>
              {phaseItems.map(item => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0",
                  borderBottom: `1px solid ${T.border}`, cursor: "pointer",
                  opacity: item.done ? 0.5 : 1,
                }} onClick={() => toggle(item.id)}>
                  <div style={{
                    width: 14, height: 14, border: `1px solid ${item.done ? T.accent : T.border2}`,
                    background: item.done ? T.accent : "transparent", flexShrink: 0, marginTop: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.done && <span style={{ color: T.text, fontSize: 10 }}>✓</span>}
                  </div>
                  <span style={{
                    fontFamily: T.font, fontSize: 12, color: T.text, flex: 1,
                    textDecoration: item.done ? "line-through" : "none",
                  }}>{item.task}</span>
                  <span style={{
                    fontFamily: T.font, fontSize: 10,
                    color: item.owner === "Donn" ? T.accent : T.muted,
                    flexShrink: 0,
                  }}>{item.owner}</span>
                  <span style={{ fontFamily: T.font, fontSize: 10, color: T.muted, flexShrink: 0 }}>{item.due}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Festivals view ───────────────────────────────────────────────────────────

function FestivalsView() {
  const { data, loading, save } = useSection<Festival[]>("festivals");
  const [items, setItems] = useState<Festival[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => { if (data) setItems(data); }, [data]);

  const updateStatus = (id: string, status: string) => {
    const updated = items.map(f => f.id === id ? { ...f, status } : f);
    setItems(updated);
    save(updated);
  };

  if (loading || !items.length) return <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>Loading...</div>;

  const statuses = ["Not started", "Pitched", "Confirmed", "Rejected", "On hold"];
  const cols = statuses.slice(0, 4);
  const filtered = filter
    ? items.filter(f => f.name.toLowerCase().includes(filter.toLowerCase()) || f.country.toLowerCase().includes(filter.toLowerCase()))
    : items;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <p style={{ ...label9, margin: 0 }}>Festival Pipeline ({items.length})</p>
        <input
          style={{ ...inputStyle, width: 180 }}
          placeholder="Filter by name / country…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        {cols.map(col => {
          const colItems = filtered.filter(f => f.status === col);
          return (
            <div key={col}>
              <div style={{ ...label9, marginBottom: 8 }}>{col} ({colItems.length})</div>
              {colItems.map(f => (
                <div key={f.id} style={{ ...card, padding: "10px 12px" }}>
                  <div style={{ fontFamily: T.font, fontSize: 11, color: T.text, marginBottom: 4 }}>{f.name}</div>
                  <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginBottom: 6 }}>{f.city}, {f.country}</div>
                  <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginBottom: 8 }}>{f.dates2027}</div>
                  <select
                    value={f.status}
                    onChange={e => updateStatus(f.id, e.target.value)}
                    style={{ ...inputStyle, width: "100%", fontSize: 10 }}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Showcases view ───────────────────────────────────────────────────────────

function ShowcasesView() {
  const { data, loading, save } = useSection<Showcase[]>("showcases");
  const [items, setItems] = useState<Showcase[]>([]);

  useEffect(() => { if (data) setItems(data); }, [data]);

  const updateStatus = (id: number, status: string) => {
    const updated = items.map(s => s.id === id ? { ...s, status } : s);
    setItems(updated);
    save(updated);
  };

  if (loading || !items.length) return <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>Loading...</div>;

  const statuses = ["Not started", "Research", "Applied", "Confirmed", "Rejected"];

  return (
    <div>
      <p style={{ ...label9, marginBottom: 16 }}>Industry Showcases & Key Festivals</p>
      {items.map(s => (
        <div key={s.id} style={{ ...card, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 180px", minWidth: 0 }}>
            <div style={{ fontFamily: T.font, fontSize: 13, color: T.text, marginBottom: 4 }}>{s.name}</div>
            <div style={{ fontFamily: T.font, fontSize: 11, color: T.muted }}>{s.location} · {s.when}</div>
            <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginTop: 4 }}>{s.notes}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
            <FitBadge fit={s.fit} />
            <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>Deadline: {s.deadline}</div>
            <select
              value={s.status}
              onChange={e => updateStatus(s.id, e.target.value)}
              style={{ ...inputStyle, fontSize: 10 }}
            >
              {statuses.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Outreach view ────────────────────────────────────────────────────────────

function OutreachView() {
  const [copied, setCopied] = useState<number | null>(null);

  const steps = [
    {
      n: 1, label: "Research",
      body: "Find the right contact — promoter, talent buyer, or booker. Check socials and past line-ups to confirm fit before reaching out.",
    },
    {
      n: 2, label: "First Email",
      body: `Subject: DJ Donn Stone — [Event/Festival Name] 2027 Booking Inquiry

Hi [Name],

My name is Ivan, I manage DJ Donn Stone — a Rotterdam-based Afro house & Afro tech DJ with a growing profile in the NL scene.

Donn brings a high-energy Afro house sound rooted in SA culture, built for festival floors and club nights. He's currently booking for 2027.

I'd love to explore whether Donn could be a fit for [Event] 2027. Would you be open to a quick call or email exchange? I'll keep it brief.

Best,
Ivan`,
    },
    {
      n: 3, label: "Follow-up 1 (Day 5)",
      body: `Hi [Name],

Just a short follow-up on my email below. Happy to send over our EPK or a set recording — whatever's most useful for your review.

Best,
Ivan`,
    },
    {
      n: 4, label: "Follow-up 2 (Day 10)",
      body: `Hi [Name],

Last nudge from me. If timing isn't right for [Event] this cycle, I'd still love to keep the conversation open for a future edition.

Here's a recent mix: [link]

Best,
Ivan`,
    },
    {
      n: 5, label: "EPK Send (on response)",
      body: `Hi [Name],

Great to hear from you! Attaching our EPK with bio, links, and tech rider. Happy to answer any questions.

Best,
Ivan`,
    },
    {
      n: 6, label: "Deal Discussion",
      body: `Hi [Name],

Thanks for your interest! For [Event] we're looking at a fee of €[X] + travel. Happy to discuss.

What does your typical deal structure look like?

Best,
Ivan`,
    },
    {
      n: 7, label: "Confirmation",
      body: `Hi [Name],

Great — let's confirm the booking for [date / event name]. Can you send over the contract? We'll get it signed and back to you quickly.

Looking forward to it.

Best,
Ivan`,
    },
  ];

  const copy = (n: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(n);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <p style={{ ...label9, marginBottom: 20 }}>Cold Outreach Flow — 7 Steps</p>
      {steps.map(s => (
        <div key={s.n} style={{ ...card, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{
                fontFamily: T.font, fontSize: 10, background: T.accent,
                color: T.text, padding: "2px 8px",
              }}>STEP {s.n}</span>
              <span style={{ fontFamily: T.font, fontSize: 12, color: T.text }}>{s.label}</span>
            </div>
            <button style={ghostBtn} onClick={() => copy(s.n, s.body)}>
              {copied === s.n ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <pre style={{
            fontFamily: T.font, fontSize: 11, color: T.muted,
            whiteSpace: "pre-wrap", margin: 0, lineHeight: 1.7,
          }}>{s.body}</pre>
        </div>
      ))}
    </div>
  );
}

// ─── Marketing view ───────────────────────────────────────────────────────────

function MarketingView() {
  const { data, loading, save } = useSection<MarketingData>("marketing");
  const [tab, setTab] = useState<"pillars" | "collabs" | "kpis">("pillars");
  const [items, setItems] = useState<MarketingData | null>(null);

  useEffect(() => { if (data) setItems(data); }, [data]);

  if (loading || !items) return <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>Loading...</div>;

  const tabs: { key: "pillars" | "collabs" | "kpis"; label: string }[] = [
    { key: "pillars", label: "Content Pillars" },
    { key: "collabs", label: "Collabs" },
    { key: "kpis", label: "KPIs" },
  ];

  const updateCollab = (id: number, status: string) => {
    const updated = { ...items, collabs: items.collabs.map(c => c.id === id ? { ...c, status } : c) };
    setItems(updated);
    save(updated);
  };

  const updateKpi = (id: number, current: number) => {
    const updated = { ...items, kpis: items.kpis.map(k => k.id === id ? { ...k, current } : k) };
    setItems(updated);
    save(updated);
  };

  const collabStatuses = ["Not started", "Identified", "Reached out", "In talks", "Done"];
  const priorities: Record<string, { bg: string; color: string }> = {
    High: { bg: "#1a2a1a", color: "#4CAF50" },
    Medium: { bg: "#3a3a1a", color: "#FFD700" },
    Low: { bg: T.border2, color: T.muted },
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: `1px solid ${T.border}` }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            fontFamily: T.font, fontSize: 11, letterSpacing: "0.1em",
            background: "none", border: "none", color: tab === t.key ? T.text : T.muted,
            padding: "8px 16px", cursor: "pointer",
            borderBottom: tab === t.key ? `2px solid ${T.accent}` : "2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      {tab === "pillars" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {items.pillars.map(p => (
            <div key={p.id} style={{ ...card, marginBottom: 0 }}>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.accent, marginBottom: 6 }}>{p.pillar}</div>
              <div style={{ fontFamily: T.font, fontSize: 11, color: T.text, marginBottom: 8 }}>{p.description}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                {p.formats.map(f => (
                  <span key={f} style={{ fontFamily: T.font, fontSize: 9, background: T.border2, color: T.muted, padding: "2px 6px" }}>{f}</span>
                ))}
              </div>
              <div style={{ ...label9 }}>{p.frequency}</div>
            </div>
          ))}
        </div>
      )}

      {tab === "collabs" && items.collabs.map(c => (
        <div key={c.id} style={{ ...card, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <div style={{ flex: "1 1 180px", minWidth: 0 }}>
            <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, marginBottom: 4 }}>{c.target}</div>
            <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>{c.type} · {c.platform}</div>
          </div>
          <span style={{
            fontFamily: T.font, fontSize: 10, padding: "2px 8px",
            background: priorities[c.priority]?.bg ?? T.border2,
            color: priorities[c.priority]?.color ?? T.muted,
          }}>{c.priority}</span>
          <select value={c.status} onChange={e => updateCollab(c.id, e.target.value)} style={{ ...inputStyle, fontSize: 10 }}>
            {collabStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      ))}

      {tab === "kpis" && items.kpis.map(k => {
        const targetNum = parseInt(k.target);
        const pct = targetNum > 0 ? Math.min(100, (k.current / targetNum) * 100) : 0;
        return (
          <div key={k.id} style={{ ...card }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
              <span style={{ fontFamily: T.font, fontSize: 12, color: T.text, flex: 1 }}>{k.metric}</span>
              <span style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>Target: {k.target} {k.unit}</span>
              <input
                type="number"
                value={k.current}
                onChange={e => updateKpi(k.id, parseInt(e.target.value) || 0)}
                style={{ ...inputStyle, width: 70 }}
              />
            </div>
            <ProgressBar value={pct} max={100} color={pct >= 100 ? "#4CAF50" : T.accent} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Calculator view ──────────────────────────────────────────────────────────

function CalculatorView() {
  const [phase, setPhase] = useState<1 | 2>(1);
  const [base, setBase] = useState(phase === 1 ? 200 : 500);
  const [travel, setTravel] = useState(false);
  const [equipment, setEquipment] = useState(false);
  const [agentPct, setAgentPct] = useState(15);

  useEffect(() => { setBase(phase === 1 ? 200 : 500); }, [phase]);

  const gross = base + (travel ? 150 : 0) + (equipment ? 100 : 0);
  const agentCut = Math.round(gross * agentPct / 100);
  const net = gross - agentCut;

  const standards = [
    "Minimum set time: 60 minutes",
    "Soundcheck required: minimum 30 min before doors",
    "Travel: economy flights or fuel reimbursement",
    "Accommodation: hotel if >100km from Rotterdam",
    "Meals: hot meal or €25 buyout day-of-show",
    "Billing: name on flyer minimum 48h before event",
    "Promo package: artwork/bio within 5 days of signing",
    "Set time confirmation: 48h before event",
    "Payment: 50% deposit on signing, 50% day-of-show",
    "Cancellation <14 days: 50% kill fee; <7 days: 100%",
    "Tech rider: venue responsible for compliance",
    "Social: venue tags @donnstone on all promo posts",
  ];

  return (
    <div>
      <p style={{ ...label9, marginBottom: 16 }}>Deal Calculator</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {([1, 2] as const).map(p => (
          <button key={p} onClick={() => setPhase(p)} style={{
            ...phase === p ? btn : ghostBtn,
          }}>Phase {p} — {p === 1 ? "Emerging" : "Established"}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        <div style={{ ...card }}>
          <div style={{ ...label9, marginBottom: 12 }}>Quote Builder</div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ ...label9, marginBottom: 4 }}>Base Fee (€)</div>
            <input
              type="number"
              value={base}
              onChange={e => setBase(parseInt(e.target.value) || 0)}
              style={{ ...inputStyle, width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={travel} onChange={e => setTravel(e.target.checked)} />
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.text }}>Travel + Accommodation (+€150)</span>
            </label>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" checked={equipment} onChange={e => setEquipment(e.target.checked)} />
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.text }}>Equipment Rider (+€100)</span>
            </label>
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ ...label9, marginBottom: 4 }}>Agent % (if signed): {agentPct}%</div>
            <input
              type="range" min={15} max={20} value={agentPct}
              onChange={e => setAgentPct(parseInt(e.target.value))}
              style={{ width: "100%", accentColor: T.accent }}
            />
          </div>
        </div>

        <div style={{ ...card }}>
          <div style={{ ...label9, marginBottom: 16 }}>Result</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.muted }}>Gross Offer</span>
              <span style={{ fontFamily: T.font, fontSize: 16, color: T.text }}>€{gross}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.muted }}>Agent Cut ({agentPct}%)</span>
              <span style={{ fontFamily: T.font, fontSize: 14, color: "#FF6B6B" }}>-€{agentCut}</span>
            </div>
            <div style={{ height: 1, background: T.border2 }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: T.font, fontSize: 11, color: T.muted }}>Your Net</span>
              <span style={{ fontFamily: T.font, fontSize: 20, color: T.accent }}>€{net}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...card, marginTop: 4 }}>
        <div style={{ ...label9, marginBottom: 12 }}>Booking Standard — 12 Non-Negotiables</div>
        {standards.map((s, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, padding: "6px 0",
            borderBottom: i < standards.length - 1 ? `1px solid ${T.border}` : "none",
          }}>
            <span style={{ fontFamily: T.font, fontSize: 10, color: T.accent, flexShrink: 0, minWidth: 16 }}>{i + 1}.</span>
            <span style={{ fontFamily: T.font, fontSize: 11, color: T.text }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Agencies view ────────────────────────────────────────────────────────────

function AgenciesView() {
  const { data: gateData, loading: gateLoading, save: saveGate } = useSection<AgentGate>("agentgate");
  const { data: agencyData, loading: agencyLoading, save: saveAgencies } = useSection<Agency[]>("agencies");
  const [gate, setGate] = useState<AgentGate | null>(null);
  const [agencies, setAgencies] = useState<Agency[]>([]);

  useEffect(() => { if (gateData) setGate(gateData); }, [gateData]);
  useEffect(() => { if (agencyData) setAgencies(agencyData); }, [agencyData]);

  if (gateLoading || agencyLoading || !gate) return <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>Loading...</div>;

  const metCount = gate.indicators.filter(i => i.met).length;
  const locked = metCount < gate.threshold;

  const toggleIndicator = (id: number) => {
    const updated = { ...gate, indicators: gate.indicators.map(i => i.id === id ? { ...i, met: !i.met } : i) };
    setGate(updated);
    saveGate(updated);
  };

  const updateAgencyStatus = (name: string, status: string) => {
    const updated = agencies.map(a => a.name === name ? { ...a, status } : a);
    setAgencies(updated);
    saveAgencies(updated);
  };

  const agencyStatuses = ["Not started", "Researching", "Reached out", "In talks", "Signed"];

  return (
    <div>
      {/* Agent Gate */}
      <div style={{ ...card, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ ...label9 }}>Agent Gate</span>
          <span style={{ fontFamily: T.font, fontSize: 12, color: locked ? "#FF6B6B" : "#4CAF50" }}>
            {metCount}/{gate.threshold} — {locked ? "LOCKED" : "UNLOCKED"}
          </span>
        </div>
        <ProgressBar value={metCount} max={8} color={locked ? "#FF6B6B" : "#4CAF50"} />
        {locked && (
          <div style={{
            marginTop: 12, padding: "8px 12px", background: "#3a0a0a",
            border: `1px solid ${T.accent}`, fontFamily: T.font, fontSize: 11, color: "#FF6B6B",
          }}>
            ⚠ Meet {gate.threshold}/8 indicators before approaching agencies
          </div>
        )}
        <div style={{ marginTop: 16 }}>
          {gate.indicators.map(ind => (
            <div key={ind.id} style={{
              display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0",
              borderBottom: `1px solid ${T.border}`, cursor: "pointer",
            }} onClick={() => toggleIndicator(ind.id)}>
              <div style={{
                width: 14, height: 14, border: `1px solid ${ind.met ? "#4CAF50" : T.border2}`,
                background: ind.met ? "#4CAF50" : "transparent", flexShrink: 0, marginTop: 2,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {ind.met && <span style={{ color: "#000", fontSize: 10 }}>✓</span>}
              </div>
              <div>
                <div style={{ fontFamily: T.font, fontSize: 12, color: T.text }}>{ind.label}</div>
                <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>{ind.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agency list */}
      <div style={{ position: "relative" }}>
        {locked && (
          <div style={{
            position: "absolute", inset: 0, background: "rgba(10,5,4,0.8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10,
          }}>
            <div style={{ fontFamily: T.font, fontSize: 14, color: T.accent, letterSpacing: "0.2em" }}>
              🔒 LOCKED — {gate.threshold - metCount} more indicators needed
            </div>
          </div>
        )}
        <p style={{ ...label9, marginBottom: 12 }}>Agency List ({agencies.length})</p>
        {agencies.map(a => (
          <div key={a.name} style={{ ...card, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
            <div style={{ flex: "1 1 200px", minWidth: 0 }}>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, marginBottom: 4 }}>{a.name}</div>
              <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginBottom: 4 }}>{a.base}</div>
              <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>{a.what}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
              <FitBadge fit={a.fit} />
              <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>{a.when}</div>
              <select
                value={a.status}
                onChange={e => updateAgencyStatus(a.name, e.target.value)}
                style={{ ...inputStyle, fontSize: 10 }}
                disabled={locked}
              >
                {agencyStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

type View =
  | "Timeline" | "Dashboard"
  | "Checklist" | "Festivals" | "Showcases"
  | "Outreach" | "Marketing"
  | "Calculator"
  | "Agencies";

interface NavGroup {
  label: string;
  items: View[];
}

const NAV: NavGroup[] = [
  { label: "OVERVIEW", items: ["Timeline", "Dashboard"] },
  { label: "EXECUTION", items: ["Checklist", "Festivals", "Showcases"] },
  { label: "OUTREACH", items: ["Outreach", "Marketing"] },
  { label: "DEALS", items: ["Calculator"] },
  { label: "AGENCIES", items: ["Agencies"] },
];

export default function ManagementSection() {
  const [active, setActive] = useState<View>("Timeline");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navigate = (view: View) => {
    setActive(view);
    setMobileNavOpen(false);
  };

  const sidebar = (
    <div style={{
      width: 200, flexShrink: 0, borderRight: `1px solid ${T.border}`,
      background: T.bg, overflowY: "auto", padding: "16px 0",
    }}>
      {NAV.map(group => (
        <div key={group.label} style={{ marginBottom: 16 }}>
          <div style={{ ...label9, padding: "0 16px", marginBottom: 6 }}>{group.label}</div>
          {group.items.map(item => (
            <button key={item} onClick={() => navigate(item)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none",
              borderLeft: active === item ? `3px solid ${T.accent}` : "3px solid transparent",
              color: active === item ? T.text : T.muted,
              fontFamily: T.font, fontSize: 11,
              padding: "7px 16px", cursor: "pointer",
              letterSpacing: "0.05em",
            }}>{item}</button>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        .mgmt-wrapper { display: flex; height: calc(100vh - 120px); overflow: hidden; }
        .mgmt-sidebar { display: flex; flex-direction: column; }
        .mgmt-content { flex: 1; overflow-y: auto; padding: 24px; width: 0; }
        .mgmt-mobile-nav { display: none; }
        @media (max-width: 640px) {
          .mgmt-wrapper { flex-direction: column; height: auto; }
          .mgmt-sidebar { display: none; }
          .mgmt-mobile-nav { display: flex; gap: 0; overflow-x: auto; padding: 8px 0; border-bottom: 1px solid #1E0E0E; flex-shrink: 0; }
          .mgmt-content { padding: 16px 12px; width: 100%; }
        }
      `}</style>

      <div className="mgmt-wrapper">
        <div className="mgmt-sidebar">{sidebar}</div>

        {/* Mobile horizontal nav */}
        <div className="mgmt-mobile-nav">
          {NAV.flatMap(g => g.items).map(item => (
            <button key={item} onClick={() => setActive(item)} style={{
              background: "none", border: "none", flexShrink: 0,
              borderBottom: active === item ? `2px solid ${T.accent}` : "2px solid transparent",
              color: active === item ? T.text : T.muted,
              fontFamily: T.font, fontSize: 10, padding: "6px 12px", cursor: "pointer",
              whiteSpace: "nowrap",
            }}>{item}</button>
          ))}
        </div>

        <div className="mgmt-content">
          {active === "Dashboard" && <DashboardView onNavigate={v => setActive(v as View)} />}
          {active === "Timeline" && <TimelineView />}
          {active === "Checklist" && <ChecklistView />}
          {active === "Festivals" && <FestivalsView />}
          {active === "Showcases" && <ShowcasesView />}
          {active === "Outreach" && <OutreachView />}
          {active === "Marketing" && <MarketingView />}
          {active === "Calculator" && <CalculatorView />}
          {active === "Agencies" && <AgenciesView />}
        </div>
      </div>
    </>
  );
}
