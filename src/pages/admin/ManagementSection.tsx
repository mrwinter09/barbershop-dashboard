/** @format */

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChecklistItem {
  id: number; phase: string; task: string; owner: string; due: string; done: boolean;
}
interface Showcase {
  id: number; name: string; city: string; country: string;
  dates2027: string; artistApplication: string;
  deadline: string; deadlineNote: string;
  whyItMatters: string; recommendedMove: string;
  status: string; source: string; website: string;
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

const TIMELINE_MONTHS = [
  {
    date: "Oct 2026", phase: "1 · Foundation", active: true,
    headline: "Make Donn bookable",
    deliverable: "EPK live + 15 outreach emails sent",
    tasks: [
      "Register all social handles (IG, TikTok, SoundCloud, YouTube) under a consistent name",
      "Build a 1-page EPK: bio, mix link, genre, tech rider, contact",
      "Finalise 3 release-ready tracks — at minimum mixes approved",
      "Draft the cold email template (see Outreach tab)",
      "Build a target list: Tier A festivals + local NL promoters",
      "Send 15 first-contact emails to NL venues / local promoters",
      "Set up booking email address (booking@… or manager@…)",
      "Confirm IG profile looks like a working artist (photo, link, bio)",
    ],
  },
  {
    date: "Nov 2026", phase: "1 · Foundation",
    headline: "Decide on the big asks",
    deliverable: "Tier A festivals pitched, follow-ups logged",
    tasks: [
      "Send Tier A festival pitches (Rotterdam Caribbean, Afro Nation, Woo Hah etc.)",
      "Follow up October emails (Day 5 + Day 10 cadence)",
      "First NL paid gig booked or confirmed",
      "Secure a local Afro/urban photographer for EPK shoot",
      "Record a 30-min live set for EPK — clean audio + video",
      "Publish first 2 pieces of content from the Content Pillar plan",
      "Start SoundCloud + Spotify distribution pipeline (DistroKid / TuneCore)",
    ],
  },
  {
    date: "Dec 2026", phase: "2 · Pitch Season",
    headline: "Tier A + early Tier B pitched",
    deliverable: "10+ festivals pitched, first track on streaming",
    tasks: [
      "Release first single on Spotify / Apple Music / SoundCloud",
      "Pitch early-deadline Tier B festivals (Afronation Portugal Dec deadline etc.)",
      "Apply for The Great Escape showcase (deadline ~Dec 2026)",
      "First local paid gig played — collect content + testimonial",
      "Submit to Groover Afro playlist curators",
      "Send year-end recap email to all contacts pitched so far",
      "Review and update EPK with streaming links",
    ],
  },
  {
    date: "Jan 2027", phase: "2 · Pitch Season",
    headline: "ESNS + NL spring festivals",
    deliverable: "Industry meetings logged from ESNS",
    tasks: [
      "Attend ESNS (Eurosonic) as delegate — pre-book 10–15 meetings",
      "Target Afro/urban bookers and NL festival programmers at ESNS",
      "Pitch NL spring festivals (Pinkpop, Into The Great Wide Open — check deadlines)",
      "Follow up all December pitches",
      "Release second track or remix",
      "First Spotify editorial pitch (via distributor dashboard)",
    ],
  },
  {
    date: "Feb 2027", phase: "2 · Pitch Season",
    headline: "Home market lock-in",
    deliverable: "3–5 NL bookings confirmed",
    tasks: [
      "Target: 3–5 confirmed NL bookings by end of month",
      "Pitch mid-tier NL festivals (Dekmantel, Lowlands — check deadlines)",
      "Follow up all January meetings from ESNS",
      "Send EPK to ADE satellite venue promoters (early outreach)",
      "Reach out to NL booking agencies for introductory meeting",
      "Post 2× per week on IG — live energy + studio content",
    ],
  },
  {
    date: "Mar 2027", phase: "3 · Routing",
    headline: "Side events + season structure",
    deliverable: "Afro Nation Portugal week booked",
    tasks: [
      "Book Afro Nation Portugal (Jun 2027) or confirm status",
      "Build a routing map: string gigs/festivals into logical geographic routes",
      "Pitch Sonar Barcelona via agent or direct",
      "Follow up all NL pitches — close open conversations",
      "Apply for SXSW 2027 (if not done — deadline Jan/Feb for 2027 edition)",
      "Connect with at least one NL booking agent for a formal intro meeting",
    ],
  },
  {
    date: "Apr 2027", phase: "3 · Routing",
    headline: "Route the summer",
    deliverable: "Routing map complete — summer calendar set",
    tasks: [
      "Confirm routing map: festival run Jun–Aug in logical sequence",
      "All summer travel/logistics pre-booked (flights, accommodation)",
      "EP or second single in final mix — release date set",
      "Brief photographer / videographer for festival season coverage",
      "Pitch Kwaku Summer Festival Amsterdam (Aug 2027)",
      "Update EPK with confirmed bookings + streaming stats",
    ],
  },
  {
    date: "May 2027", phase: "4 · Season",
    headline: "Spring warm-up gigs",
    deliverable: "Content library ready for summer",
    tasks: [
      "Play 2–3 warm-up gigs in NL ahead of festival season",
      "Batch-produce content from gig nights (reels, behind-scenes)",
      "Release EP / second single",
      "Pitch EP to editorial playlists + press contacts",
      "Confirm all summer festival logistics",
      "Final outreach push to any un-responded festival targets",
    ],
  },
  {
    date: "Jun 2027", phase: "4 · Season",
    headline: "Afro Nation week + summer start",
    deliverable: "Afro Nation content + next booking from the set",
    tasks: [
      "Play Afro Nation Portugal — document everything",
      "Post daily from festival — stories, reels, TikToks",
      "Collect contact details of fellow artists, bookers encountered",
      "Follow up with any booker/programmer who attended the set",
      "Pitch any remaining summer festival spots",
    ],
  },
  {
    date: "Jul 2027", phase: "4 · Season",
    headline: "Festival run peak",
    deliverable: "Gig log with contacts, footage, and data",
    tasks: [
      "Execute festival bookings — maintain energy and professionalism",
      "Log every gig: venue, promoter contact, fee, attendance, video clip",
      "Collect testimonials from promoters after each show",
      "Keep posting: 3× per week minimum through the season",
      "Track streaming stats weekly — note any spikes after gigs",
    ],
  },
  {
    date: "Aug 2027", phase: "4 · Season",
    headline: "Festival run + UK push",
    deliverable: "Rebook list + UK intro emails sent",
    tasks: [
      "Final summer festival gigs",
      "Build rebook list: promoters to contact for 2028 immediately",
      "Send UK intro emails using ESNS contacts (Great Escape connection)",
      "Compile post-summer data: streams, gig count, audience size",
      "Update EPK with summer results",
      "Begin evaluating booking agencies — who makes sense now?",
    ],
  },
  {
    date: "Sep 2027", phase: "5 · Leverage",
    headline: "Turn summer into an agent deal",
    deliverable: "Agent shortlist + formal intro meetings",
    tasks: [
      "Compile the 'summer deck': stats, footage, press, rebook list",
      "Identify 3–5 target booking agencies (see Agencies tab)",
      "Send formal intro / pitch to each target agency",
      "Follow up ESNS delegate contacts from January",
      "Prepare for ADE October — book satellite show + conference pass",
      "Release post-summer single or EP update track",
    ],
  },
  {
    date: "Oct–Dec 2027", phase: "5 · Leverage",
    headline: "ADE + World Tour legs",
    deliverable: "Agent signed or in final negotiation — 2028 plan ready",
    tasks: [
      "Play ADE satellite show — maximise industry visibility",
      "Attend ADE conference: agent meetings, label meetings",
      "Close agency deal or finalise terms",
      "Plan 2028 routing: EU tour legs, UK return, potential US/MENA leg",
      "Set 2028 festival pitch targets — this time with an agent",
      "Brief agent on 2028 strategy",
    ],
  },
];

function TimelineView() {
  const [expanded, setExpanded] = useState<string>("Oct 2026");
  const phaseColor: Record<string, string> = {
    "1": "#4CAF50", "2": "#FFD700", "3": "#f59e0b", "4": T.accent, "5": "#a78bfa",
  };

  const getPhaseNum = (phase: string) => phase.split(" ")[0];

  return (
    <div>
      <p style={{ ...label9, marginBottom: 20 }}>13-Month Plan — click a month to expand</p>
      <div style={{ position: "relative", paddingLeft: 32 }}>
        <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: T.border2 }} />
        {TIMELINE_MONTHS.map((m) => {
          const isOpen = expanded === m.date;
          const pNum = getPhaseNum(m.phase);
          const pColor = phaseColor[pNum] || T.muted;
          const isPast = false;
          return (
            <div key={m.date} style={{ position: "relative", marginBottom: 12 }}>
              <div style={{
                position: "absolute", left: -28, top: 10,
                width: 12, height: 12, borderRadius: "50%",
                background: m.active ? pColor : T.border2,
                border: `2px solid ${pColor}`,
                boxSizing: "border-box",
              }} />
              <div
                onClick={() => setExpanded(isOpen ? "" : m.date)}
                style={{
                  ...card, marginBottom: 0, cursor: "pointer",
                  borderColor: m.active ? T.accent : isOpen ? T.border2 : T.border,
                  background: m.active ? "#1a0808" : T.bg,
                  opacity: isPast ? 0.5 : 1,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: T.font, fontSize: 11, color: m.active ? T.text : T.muted, minWidth: 80 }}>{m.date}</span>
                  <span style={{
                    fontFamily: T.font, fontSize: 9, padding: "1px 6px",
                    background: `${pColor}22`, color: pColor, letterSpacing: "0.1em", flexShrink: 0,
                  }}>Phase {m.phase}</span>
                  <span style={{ fontFamily: T.font, fontSize: 12, color: m.active ? T.text : T.muted, flex: 1 }}>{m.headline}</span>
                  {m.active && <span style={{ fontFamily: T.font, fontSize: 9, color: T.accent, letterSpacing: "0.12em", flexShrink: 0 }}>◆ NOW</span>}
                  <span style={{ fontFamily: T.font, fontSize: 10, color: T.muted, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontFamily: T.font, fontSize: 10, color: pColor, marginBottom: 10, letterSpacing: "0.1em" }}>
                      DELIVERABLE: {m.deliverable}
                    </div>
                    {m.tasks.map((t, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 10, paddingBottom: 8,
                        borderBottom: i < m.tasks.length - 1 ? `1px solid ${T.border}` : "none",
                        marginBottom: 8,
                      }}>
                        <span style={{ fontFamily: T.font, fontSize: 10, color: T.accent, flexShrink: 0, marginTop: 1 }}>→</span>
                        <span style={{ fontFamily: T.font, fontSize: 12, color: T.text, lineHeight: 1.6 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"board" | "list">("list");

  useEffect(() => { if (data) setItems(data); }, [data]);

  const updateStatus = (id: string, status: string) => {
    const updated = items.map(f => f.id === id ? { ...f, status } : f);
    setItems(updated);
    save(updated);
  };

  if (loading || !items.length) return <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>Loading...</div>;

  const statuses = ["Not started", "Pitched", "Confirmed", "Rejected", "On hold"];
  const filtered = filter
    ? items.filter(f =>
        f.name.toLowerCase().includes(filter.toLowerCase()) ||
        f.country.toLowerCase().includes(filter.toLowerCase()) ||
        f.tier.toLowerCase().includes(filter.toLowerCase()) ||
        f.region.toLowerCase().includes(filter.toLowerCase())
      )
    : items;

  const tierOrder: Record<string, number> = { A: 0, B: 1, C: 2 };
  const sorted = [...filtered].sort((a, b) => (tierOrder[a.tier] ?? 9) - (tierOrder[b.tier] ?? 9));

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <p style={{ ...label9, margin: 0 }}>Festival Pipeline ({items.length})</p>
        <input
          style={{ ...inputStyle, width: 200 }}
          placeholder="Filter name / country / tier / region…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <div style={{ display: "flex", gap: 0, marginLeft: "auto" }}>
          {(["list", "board"] as const).map(m => (
            <button key={m} onClick={() => setViewMode(m)} style={{
              ...ghostBtn,
              background: viewMode === m ? T.accent : "transparent",
              color: viewMode === m ? T.text : T.accent,
              borderRadius: 0, padding: "4px 12px", fontSize: 10,
            }}>{m.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {viewMode === "list" ? (
        <div>
          {["A", "B", "C"].map(tier => {
            const tierItems = sorted.filter(f => f.tier === tier);
            if (!tierItems.length) return null;
            return (
              <div key={tier} style={{ marginBottom: 20 }}>
                <div style={{ ...label9, marginBottom: 8, color: tier === "A" ? "#4CAF50" : tier === "B" ? "#FFD700" : T.muted }}>
                  TIER {tier} — {tierItems.length} festivals
                </div>
                {tierItems.map(f => {
                  const isOpen = expandedId === f.id;
                  return (
                    <div key={f.id} style={{ ...card, marginBottom: 8 }}>
                      <div
                        onClick={() => setExpandedId(isOpen ? null : f.id)}
                        style={{ cursor: "pointer", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}
                      >
                        <div style={{ flex: "1 1 180px", minWidth: 0 }}>
                          <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, marginBottom: 3 }}>{f.name}</div>
                          <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>{f.city}, {f.country} · {f.timing}</div>
                          <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginTop: 2 }}>{f.genre}</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
                          <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>Pitch by {f.pitchBy}</div>
                          <select
                            value={f.status}
                            onChange={e => { e.stopPropagation(); updateStatus(f.id, e.target.value); }}
                            onClick={e => e.stopPropagation()}
                            style={{ ...inputStyle, fontSize: 10 }}
                          >
                            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <span style={{ fontFamily: T.font, fontSize: 9, color: T.muted }}>{isOpen ? "▲" : "▼ details"}</span>
                        </div>
                      </div>
                      {isOpen && (
                        <div style={{ marginTop: 12, borderTop: `1px solid ${T.border}`, paddingTop: 12 }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginBottom: 10 }}>
                            <div><span style={{ ...label9, marginRight: 4 }}>Entry:</span><span style={{ fontFamily: T.font, fontSize: 11, color: T.text }}>{f.entryRoute}</span></div>
                            <div><span style={{ ...label9, marginRight: 4 }}>Target:</span><span style={{ fontFamily: T.font, fontSize: 11, color: T.text }}>{f.target}</span></div>
                            <div><span style={{ ...label9, marginRight: 4 }}>2027 Dates:</span><span style={{ fontFamily: T.font, fontSize: 11, color: T.text }}>{f.dates2027 || "TBC"}</span></div>
                            <div><span style={{ ...label9, marginRight: 4 }}>Website:</span><span style={{ fontFamily: T.font, fontSize: 11, color: T.accent }}>{f.website}</span></div>
                          </div>
                          {f.notes && (
                            <div style={{ marginBottom: 8 }}>
                              <div style={{ ...label9, marginBottom: 4 }}>NOTES</div>
                              <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, lineHeight: 1.6 }}>{f.notes}</div>
                            </div>
                          )}
                          {f.pitchRoute && (
                            <div>
                              <div style={{ ...label9, marginBottom: 4, color: T.accent }}>HOW TO PITCH</div>
                              <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{f.pitchRoute}</div>
                            </div>
                          )}
                          {f.contact && (
                            <div style={{ marginTop: 8 }}>
                              <span style={{ ...label9, marginRight: 4 }}>Contact:</span>
                              <span style={{ fontFamily: T.font, fontSize: 11, color: T.accent }}>{f.contact}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ) : (
        /* Board view — kanban by status */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {statuses.slice(0, 4).map(col => {
            const colItems = sorted.filter(f => f.status === col);
            return (
              <div key={col}>
                <div style={{ ...label9, marginBottom: 8 }}>{col} ({colItems.length})</div>
                {colItems.map(f => (
                  <div key={f.id} style={{ ...card, padding: "10px 12px" }}>
                    <div style={{ fontFamily: T.font, fontSize: 11, color: T.text, marginBottom: 4 }}>{f.name}</div>
                    <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginBottom: 4 }}>{f.city}, {f.country}</div>
                    <div style={{ fontFamily: T.font, fontSize: 9, color: T.muted, marginBottom: 6 }}>Tier {f.tier} · {f.timing}</div>
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
      )}
    </div>
  );
}

// ─── Showcases view ───────────────────────────────────────────────────────────

function ShowcasesView() {
  const { data, loading, save } = useSection<Showcase[]>("showcases");
  const [items, setItems] = useState<Showcase[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => { if (data) setItems(data); }, [data]);

  const updateStatus = (id: number, status: string) => {
    const updated = items.map(s => s.id === id ? { ...s, status } : s);
    setItems(updated);
    save(updated);
  };

  if (loading || !items.length) return <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>Loading...</div>;

  const statuses = ["Not started", "Research", "Applied", "Confirmed", "Rejected"];
  const deadlineUrgent = (dl: string) => {
    if (!dl) return false;
    const d = new Date(dl);
    const now = new Date();
    return (d.getTime() - now.getTime()) < 90 * 24 * 60 * 60 * 1000;
  };

  return (
    <div>
      <p style={{ ...label9, marginBottom: 16 }}>Industry Showcases ({items.length}) — click to expand</p>
      {items.map(s => {
        const isOpen = expanded === s.id;
        const urgent = deadlineUrgent(s.deadline);
        return (
          <div key={s.id} style={{ ...card, marginBottom: 10 }}>
            <div
              onClick={() => setExpanded(isOpen ? null : s.id)}
              style={{ cursor: "pointer" }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
                <div style={{ flex: "1 1 200px", minWidth: 0 }}>
                  <div style={{ fontFamily: T.font, fontSize: 13, color: T.text, marginBottom: 4 }}>{s.name}</div>
                  <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>{s.city}, {s.country} · {s.dates2027}</div>
                  <div style={{
                    fontFamily: T.font, fontSize: 10, marginTop: 4,
                    color: urgent ? "#FFD700" : T.muted,
                  }}>{s.deadlineNote}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
                  <select
                    value={s.status}
                    onChange={e => { e.stopPropagation(); updateStatus(s.id, e.target.value); }}
                    onClick={e => e.stopPropagation()}
                    style={{ ...inputStyle, fontSize: 10 }}
                  >
                    {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                  <span style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>
                    {isOpen ? "▲ collapse" : "▼ details"}
                  </span>
                </div>
              </div>
            </div>
            {isOpen && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${T.border}`, paddingTop: 14 }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...label9, marginBottom: 4, color: T.accent }}>APPLICATION</div>
                  <div style={{ fontFamily: T.font, fontSize: 11, color: T.text }}>{s.artistApplication}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...label9, marginBottom: 4, color: "#4CAF50" }}>WHY IT MATTERS</div>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, lineHeight: 1.7 }}>{s.whyItMatters}</div>
                </div>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ ...label9, marginBottom: 4, color: "#FFD700" }}>RECOMMENDED MOVE</div>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: T.text, lineHeight: 1.7 }}>{s.recommendedMove}</div>
                </div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <div>
                    <span style={{ ...label9, marginRight: 6 }}>Source:</span>
                    <span style={{ fontFamily: T.font, fontSize: 11, color: T.muted }}>{s.source}</span>
                  </div>
                  <div>
                    <span style={{ ...label9, marginRight: 6 }}>Website:</span>
                    <span style={{ fontFamily: T.font, fontSize: 11, color: T.accent }}>{s.website}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
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
  const [, setMobileNavOpen] = useState(false);

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
          <div style={{ ...label9, padding: "0 16px", marginBottom: 6, color: T.text, fontWeight: 700 }}>{group.label}</div>
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
