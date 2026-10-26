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
      n: 0, label: "Verkenning Email (2027 nog onzeker)",
      body: `Subject: DJ Donn Stone — [Festival Naam] 2027 — Orientatie

Hi [Name],

Mijn naam is Ivan, ik manage DJ Donn Stone — een Rotterdam-gebaseerde Afro-electronic DJ die de afgelopen jaren een sterke naam heeft opgebouwd in de NL clubscene.

Donn speelde o.a. bij Paradiso Amsterdam (Parallel stage), Toffler Rotterdam (all-night sets), Bairro (zomerresidentie 2026) en is een officieel Amsterdam Dance Event artist. Zijn geluid is geworteld in de SA Afro-electronic scene en brengt een cultureel rijke, dansbare energie naar elk podium.

We zijn momenteel onze festivalkalender voor 2027 aan het opbouwen en [Festival Naam] staat hoog op onze lijst — het publiek en de sfeer passen perfect bij wat Donn brengt.

Mijn vraag: gaat [Festival Naam] in 2027 door, en zo ja — wanneer openen de artist applications of hoe kunnen artiesten zich aanmelden?

Alvast onze EPK voor je referentie: donnstone.com

Dank je wel en graag tot contact.

Met vriendelijke groet,
Ivan
Management DJ Donn Stone
mgmt@donnstone.com`,
    },
    {
      n: 1, label: "Research",
      body: "Find the right contact — promoter, talent buyer, or booker. Check socials and past line-ups to confirm fit before reaching out.",
    },
    {
      n: 2, label: "First Email",
      body: `Subject: DJ Donn Stone — [Event/Festival Name] 2027 Booking Inquiry

Hi [Name],

My name is Ivan, I manage DJ Donn Stone — a Rotterdam-based Afro-electronic DJ with a growing profile in the NL scene.

Donn brings a high-energy Afro-electronic sound rooted in SA culture, built for festival floors and club nights. He's currently booking for 2027.

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

const FEE_RANGES = [
  { market: "NL / Europe", type: "Club night", low: 800, high: 1500, currency: "EUR", note: "Year-round" },
  { market: "NL / Europe", type: "Festival slot", low: 1500, high: 3000, currency: "EUR", note: "May–Sep; undercard often lower" },
  { market: "NL / Europe", type: "Residency (per night)", low: 600, high: 1200, currency: "EUR", note: "Year-round" },
  { market: "Dubai", type: "Club night", low: 5000, high: 12000, currency: "AED", note: "Oct–Apr only" },
  { market: "Dubai", type: "Private / brand", low: 8000, high: 20000, currency: "AED", note: "Oct–Apr only" },
  { market: "USA", type: "Club night", low: 1000, high: 2500, currency: "USD", note: "Year-round; P-1/O-1 visa needed" },
  { market: "USA", type: "Festival / showcase", low: 2000, high: 5000, currency: "USD", note: "SXSW showcases usually unpaid" },
  { market: "Australia", type: "Club night", low: 1500, high: 3500, currency: "AUD", note: "Club season Jun–Aug; festivals Dec–Feb" },
  { market: "Japan", type: "Club night", low: 150000, high: 400000, currency: "JPY", note: "Flights + hotel separate" },
  { market: "Ibiza", type: "Warm-up / B2B", low: 1000, high: 2500, currency: "EUR", note: "May–Oct; first season often below this" },
];

const COUNTRY_PLAYBOOK = [
  { country: "Netherlands", lang: "Dutch / English", currency: "EUR", permit: "None", tax: "None for NL residents", travel: "—", offerNote: "Home base: one monthly night", leadTime: "4–8 weeks", priority: "Base" },
  { country: "Belgium", lang: "Dutch / French", currency: "EUR", permit: "None (EU)", tax: "Non-resident artist withholding (verify rate)", travel: "Train, ~1–2h", offerNote: "Train for 2, often no hotel needed", leadTime: "2–3 months", priority: "High" },
  { country: "Germany", lang: "German / English", currency: "EUR", permit: "None (EU)", tax: "~15.8% (§50a EStG incl. solidarity surcharge) — verify", travel: "Train, 2–6h", offerNote: "Ask promoter to handle §50a filing", leadTime: "2–3 months", priority: "High" },
  { country: "United Kingdom", lang: "English", currency: "GBP", permit: "Visitor route with permitted paid engagement / ETA required — verify per gig", tax: "20% (Foreign Entertainers Unit) above threshold — verify", travel: "Flight or Eurostar", offerNote: "Quote in GBP; Notting Hill & Birmingham Aug", leadTime: "3–4 months", priority: "High" },
  { country: "France", lang: "French", currency: "EUR", permit: "None (EU)", tax: "~15% retenue à la source — verify", travel: "Train (Thalys) ~3h", offerNote: "Pitch opening line in French", leadTime: "3 months", priority: "Medium" },
  { country: "Portugal", lang: "Portuguese / English", currency: "EUR", permit: "None (EU)", tax: "Non-resident withholding (verify)", travel: "Flight", offerNote: "Afro Nation week 8–12 Jun", leadTime: "3–5 months", priority: "High" },
  { country: "Spain / Ibiza", lang: "Spanish / English", currency: "EUR", permit: "None (EU)", tax: "~19% for EU residents (verify)", travel: "Flight", offerNote: "Ibiza: promoters, not clubs directly", leadTime: "4–6 months", priority: "High" },
  { country: "Switzerland", lang: "German / French / English", currency: "CHF", permit: "Short-term work notification may apply — verify", tax: "Source tax varies by canton — verify", travel: "Train/flight", offerNote: "Strong fees; quote CHF", leadTime: "3 months", priority: "Medium" },
  { country: "United States", lang: "English", currency: "USD", permit: "O-1B / P-category work visa (US immigration attorney)", tax: "30% unless reduced by treaty — verify", travel: "Flight", offerNote: "Route Vegas + Miami as one trip", leadTime: "6–9 months (visa)", priority: "Strategic" },
  { country: "Canada", lang: "English / French", currency: "CAD", permit: "Check work-permit exemption for performers — verify", tax: "~15% (Reg. 105) — verify", travel: "Flight", offerNote: "Pair with US trip if possible", leadTime: "4–6 months", priority: "Low" },
  { country: "UAE (Dubai)", lang: "English", currency: "AED", permit: "Promoter arranges entertainment permit — verify", tax: "None (no income tax) — verify", travel: "Flight", offerNote: "Season Oct–Apr only", leadTime: "2–3 months", priority: "Q4 2027" },
  { country: "Japan", lang: "Japanese (translated) / English", currency: "JPY", permit: "Entertainer status / COE via promoter — verify", tax: "~20.42% — verify", travel: "Flight", offerNote: "Club tour via promoters; translated pitch", leadTime: "4–6 months", priority: "2028" },
  { country: "Australia", lang: "English", currency: "AUD", permit: "Temporary Activity visa (subclass 408) via sponsor — verify", tax: "Withholding applies — verify", travel: "Flight", offerNote: "Their winter Jun–Aug = club season", leadTime: "4–6 months", priority: "2028" },
  { country: "South Africa", lang: "English", currency: "ZAR", permit: "Check visa rules for performing — verify", tax: "~15% foreign entertainer withholding — verify", travel: "Flight", offerNote: "Credibility play, fees lower", leadTime: "3 months", priority: "Story" },
  { country: "Ghana / Nigeria", lang: "English", currency: "GHS / NGN (quote USD)", permit: "Visa required — verify", tax: "Verify", travel: "Flight", offerNote: "December circuit; quote in USD", leadTime: "3–4 months", priority: "Dec 2027" },
];

const BOOKING_TERMS = [
  { item: "Fee", p1: "Agreed amount, currency stated, excl. VAT", p2: "Same", rule: "Never confirm without a number in writing" },
  { item: "Deposit", p1: "50% on signing; balance before or on the night", p2: "50% on signing", rule: "No deposit = not confirmed" },
  { item: "Travel", p1: "Return travel for 2 (artist + manager): economy flight, or train where under ~5h", p2: "Return travel for 1", rule: "Booked by promoter in passport names, or included in all-in" },
  { item: "Accommodation", p1: "2 rooms (or 1 twin by agreement), min. 3★, near venue, 1 night (2 for long-haul)", p2: "1 room", rule: "Hotel ref in advance email" },
  { item: "Ground transport", p1: "Airport/station ⇄ hotel ⇄ venue", p2: "Same", rule: "Driver contact 48h before" },
  { item: "Set & tech", p1: "Set length, slot, CDJ/mixer model in writing", p2: "Same", rule: "Rider attached" },
  { item: "Hospitality", p1: "Drinks, meal, guest list [2–4]", p2: "Same", rule: "—" },
  { item: "Filming", p1: "Right to film for Donn's socials", p2: "Same", rule: "Ask promoter for their footage too" },
  { item: "Billing", p1: "Name spelled 'Donn Stone', poster position", p2: "Same", rule: "—" },
  { item: "Cancellation", p1: "Promoter cancels <30 days: full fee; force majeure clause", p2: "Same", rule: "—" },
  { item: "Tax & paperwork", p1: "Withholding tax handled per Country playbook; promoter provides certificate", p2: "Same", rule: "Certificate needed to claim credit in NL" },
  { item: "Visa / permit", p1: "Promoter supports visa/permit paperwork where needed (US, UK, JP, AU, AE)", p2: "Same", rule: "Start months ahead" },
];

function CalculatorView() {
  // Deal calculator state
  const [grossFee, setGrossFee] = useState(1200);
  const [managerPct] = useState(15);
  const [agentPct, setAgentPct] = useState(0);
  const [commBase, setCommBase] = useState<1 | 2>(1);
  const [directCosts, setDirectCosts] = useState(0);

  // Quote builder state
  const [travelPhase, setTravelPhase] = useState<1 | 2>(1);
  const [perfFee, setPerfFee] = useState(1200);
  const [flightPP, setFlightPP] = useState(180);
  const [hotelPP, setHotelPP] = useState(110);
  const [rooms, setRooms] = useState(2);
  const [nights, setNights] = useState(1);
  const [groundTransport, setGroundTransport] = useState(80);
  const [perDiem, setPerDiem] = useState(35);
  const [daysAway, setDaysAway] = useState(2);
  const [contingency] = useState(0.1);

  const [tab, setTab] = useState<"deal" | "quote" | "terms" | "countries" | "fees">("deal");

  // Deal calculator
  const commissionBase = commBase === 1 ? grossFee : Math.max(0, grossFee - directCosts);
  const managerTake = Math.round(commissionBase * managerPct / 100);
  const agentTake = Math.round(commissionBase * agentPct / 100);
  const donnNet = grossFee - managerTake - agentTake - directCosts;
  const donnNetPct = grossFee > 0 ? (donnNet / grossFee * 100).toFixed(1) : "0";

  // Quote builder
  const persons = travelPhase === 1 ? 2 : 1;
  const travelTotal = Math.round(
    (flightPP * persons + hotelPP * rooms * nights + groundTransport + perDiem * persons * daysAway) * (1 + contingency)
  );
  const offerA = perfFee;
  const offerB = Math.ceil((perfFee + travelTotal) / 50) * 50;
  const managerTravelHotel = Math.round((flightPP + hotelPP * nights + perDiem * daysAway) * (1 + contingency));

  const tabs = [
    { id: "deal", label: "Deal Calculator" },
    { id: "quote", label: "Quote Builder" },
    { id: "terms", label: "Booking Standard" },
    { id: "fees", label: "Fee Ranges" },
    { id: "countries", label: "Country Playbook" },
  ] as const;

  const Row = ({ label, value, color = T.text, large = false }: { label: string; value: string; color?: string; large?: boolean }) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
      <span style={{ fontFamily: T.font, fontSize: 11, color: T.muted }}>{label}</span>
      <span style={{ fontFamily: T.font, fontSize: large ? 20 : 14, color }}>{value}</span>
    </div>
  );

  return (
    <div>
      <p style={{ ...label9, marginBottom: 16 }}>Deals & Booking</p>

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, flexWrap: "wrap", borderBottom: `1px solid ${T.border}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none", borderBottom: tab === t.id ? `2px solid ${T.accent}` : "2px solid transparent",
            color: tab === t.id ? T.text : T.muted,
            fontFamily: T.font, fontSize: 10, letterSpacing: "0.08em",
            padding: "8px 14px", cursor: "pointer", whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── DEAL CALCULATOR ── */}
      {tab === "deal" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <div style={{ ...card }}>
            <div style={{ ...label9, marginBottom: 14 }}>Inputs</div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ ...label9, marginBottom: 4 }}>Gross fee (EUR)</div>
              <input type="number" value={grossFee} onChange={e => setGrossFee(+e.target.value || 0)} style={{ ...inputStyle, width: "100%" }} />
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ ...label9, marginBottom: 4 }}>Booking agent commission (0 until signed)</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="range" min={0} max={20} step={0.5} value={agentPct}
                  onChange={e => setAgentPct(+e.target.value)}
                  style={{ flex: 1, accentColor: T.accent }} />
                <span style={{ fontFamily: T.font, fontSize: 12, color: T.text, minWidth: 36 }}>{agentPct}%</span>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ ...label9, marginBottom: 6 }}>Commission base</div>
              <div style={{ display: "flex", gap: 8 }}>
                {([1, 2] as const).map(v => (
                  <button key={v} onClick={() => setCommBase(v)} style={{
                    ...commBase === v ? btn : ghostBtn, fontSize: 10, padding: "4px 10px",
                  }}>{v === 1 ? "Gross" : "Gross − costs"}</button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 4 }}>
              <div style={{ ...label9, marginBottom: 4 }}>Direct costs paid by Donn (EUR)</div>
              <input type="number" value={directCosts} onChange={e => setDirectCosts(+e.target.value || 0)} style={{ ...inputStyle, width: "100%" }} />
            </div>
          </div>

          <div style={{ ...card }}>
            <div style={{ ...label9, marginBottom: 14 }}>Result</div>
            <Row label="Gross fee" value={`€${grossFee.toLocaleString()}`} />
            <Row label={`Manager (Ivan) — ${managerPct}%`} value={`−€${managerTake.toLocaleString()}`} color="#FF6B6B" />
            <Row label={`Agent — ${agentPct}%`} value={`−€${agentTake.toLocaleString()}`} color="#FF6B6B" />
            {directCosts > 0 && <Row label="Direct costs" value={`−€${directCosts.toLocaleString()}`} color="#FF6B6B" />}
            <div style={{ height: 1, background: T.border2, margin: "4px 0" }} />
            <Row label="Donn net" value={`€${donnNet.toLocaleString()}`} color={T.accent} large />
            <Row label="Donn net as % of gross" value={`${donnNetPct}%`} color={donnNet > 0 ? "#4CAF50" : "#FF6B6B"} />
            <div style={{ marginTop: 12, padding: "8px 10px", background: T.bg2, border: `1px solid ${T.border2}` }}>
              <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, lineHeight: 1.6 }}>
                Manager commission base: {commBase === 1 ? "gross fee" : "gross fee minus direct costs"}.<br />
                Travel is not commissionable (management agreement 4.2.2).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── QUOTE BUILDER ── */}
      {tab === "quote" && (
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {([1, 2] as const).map(p => (
              <button key={p} onClick={() => setTravelPhase(p)} style={{ ...travelPhase === p ? btn : ghostBtn, fontSize: 10 }}>
                Phase {p}: {p === 1 ? "Artist + Manager" : "Artist only"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            <div style={{ ...card }}>
              <div style={{ ...label9, marginBottom: 14 }}>Inputs</div>
              {[
                { label: "Base performance fee (EUR)", val: perfFee, set: setPerfFee },
                { label: "Return flight / train per person (EUR)", val: flightPP, set: setFlightPP },
                { label: "Hotel per room per night (EUR)", val: hotelPP, set: setHotelPP },
                { label: "Rooms", val: rooms, set: setRooms },
                { label: "Nights", val: nights, set: setNights },
                { label: "Ground transport total (EUR)", val: groundTransport, set: setGroundTransport },
                { label: "Per diem per person per day (EUR)", val: perDiem, set: setPerDiem },
                { label: "Days away", val: daysAway, set: setDaysAway },
              ].map(({ label, val, set }) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <div style={{ ...label9, marginBottom: 3 }}>{label}</div>
                  <input type="number" value={val} onChange={e => set(+e.target.value || 0)} style={{ ...inputStyle, width: "100%" }} />
                </div>
              ))}
            </div>

            <div style={{ ...card }}>
              <div style={{ ...label9, marginBottom: 14 }}>Result — {travelPhase === 1 ? "Artist + Manager" : "Artist only"}</div>
              <Row label="Persons travelling" value={String(persons)} />
              <Row label="Travel & accommodation total (EUR)" value={`€${travelTotal.toLocaleString()}`} />
              <div style={{ marginTop: 4, padding: "6px 10px", background: T.bg2, border: `1px solid ${T.border2}`, marginBottom: 12 }}>
                <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted }}>Includes 10% contingency. Travel is not commissionable (management agreement 4.2.2).</div>
              </div>
              <Row label="Offer A — fee only (promoter books travel)" value={`€${offerA.toLocaleString()}`} color="#FFD700" />
              <Row label="Offer B — all-in quote (rounded to €50)" value={`€${offerB.toLocaleString()}`} color={T.accent} large />
              {travelPhase === 1 && (
                <Row label="Of which: manager's travel & hotel" value={`€${managerTravelHotel.toLocaleString()}`} color={T.muted} />
              )}
              <div style={{ marginTop: 16 }}>
                <div style={{ ...label9, marginBottom: 8, color: T.accent }}>FALLBACK LADDER — manager travel (Phase 1)</div>
                {[
                  "Promoter books and pays travel + hotel for both (Offer A).",
                  "Promoter pays an all-in fee that includes travel buyout (Offer B).",
                  "Promoter covers Donn's travel; manager travel added as a smaller buyout.",
                  "Promoter covers Donn only. Ivan stays home, or pays own trip — Donn pays only with written approval (management agreement 6.6).",
                  "Walk away: offer doesn't cover Donn's own travel and hotel abroad.",
                ].map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontFamily: T.font, fontSize: 10, color: i === 4 ? "#FF6B6B" : T.accent, flexShrink: 0 }}>{i === 4 ? "✗" : `${i + 1}.`}</span>
                    <span style={{ fontFamily: T.font, fontSize: 11, color: i === 4 ? "#FF6B6B" : T.text }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKING STANDARD ── */}
      {tab === "terms" && (
        <div>
          <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginBottom: 16, lineHeight: 1.6 }}>
            Phase 1 = Ivan travels as representative. Phase 2 = Donn travels alone (when Ivan decides to stop attending).
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.font, fontSize: 11 }}>
              <thead>
                <tr>
                  {["Item", "Phase 1: Artist + Manager", "Phase 2: Artist only", "Rule"].map(h => (
                    <th key={h} style={{
                      ...label9, textAlign: "left", padding: "8px 10px",
                      borderBottom: `1px solid ${T.border2}`, color: T.accent,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BOOKING_TERMS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? T.bg : T.bg2 }}>
                    <td style={{ padding: "10px", color: T.text, fontWeight: 700, verticalAlign: "top", whiteSpace: "nowrap", borderBottom: `1px solid ${T.border}` }}>{row.item}</td>
                    <td style={{ padding: "10px", color: T.text, verticalAlign: "top", lineHeight: 1.6, borderBottom: `1px solid ${T.border}` }}>{row.p1}</td>
                    <td style={{ padding: "10px", color: T.muted, verticalAlign: "top", lineHeight: 1.6, borderBottom: `1px solid ${T.border}` }}>{row.p2}</td>
                    <td style={{ padding: "10px", color: T.muted, verticalAlign: "top", lineHeight: 1.6, borderBottom: `1px solid ${T.border}`, fontSize: 10 }}>{row.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── FEE RANGES ── */}
      {tab === "fees" && (
        <div>
          <div style={{ fontFamily: T.font, fontSize: 10, color: "#FF6B6B", marginBottom: 14, lineHeight: 1.6, padding: "8px 12px", border: `1px solid ${T.accent}`, background: "#1a0808" }}>
            ⚠ Source caveat: cited pages were wedding/private-hire DJ pricing, not club or festival booking data. Replace with real offers as they come in.
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.font, fontSize: 11 }}>
              <thead>
                <tr>
                  {["Market", "Booking type", "Low", "High", "Currency", "Season note", "Real offers received"].map(h => (
                    <th key={h} style={{ ...label9, textAlign: "left", padding: "8px 10px", borderBottom: `1px solid ${T.border2}`, color: T.accent }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEE_RANGES.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? T.bg : T.bg2 }}>
                    <td style={{ padding: "10px", color: T.text, borderBottom: `1px solid ${T.border}`, fontWeight: 700, whiteSpace: "nowrap" }}>{row.market}</td>
                    <td style={{ padding: "10px", color: T.text, borderBottom: `1px solid ${T.border}` }}>{row.type}</td>
                    <td style={{ padding: "10px", color: "#4CAF50", borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{row.low.toLocaleString()}</td>
                    <td style={{ padding: "10px", color: "#4CAF50", borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{row.high.toLocaleString()}</td>
                    <td style={{ padding: "10px", color: T.muted, borderBottom: `1px solid ${T.border}` }}>{row.currency}</td>
                    <td style={{ padding: "10px", color: T.muted, borderBottom: `1px solid ${T.border}`, fontSize: 10 }}>{row.note}</td>
                    <td style={{ padding: "10px", color: T.muted, borderBottom: `1px solid ${T.border}`, fontSize: 10, fontStyle: "italic" }}>—</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── COUNTRY PLAYBOOK ── */}
      {tab === "countries" && (
        <div>
          <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginBottom: 14, lineHeight: 1.6 }}>
            Assumes Donn travels on an EU (Dutch) passport — confirm. Tax and visa figures are starting points from general knowledge, NOT advice: verify with an accountant / immigration adviser before quoting. Withholding tax is taken from the fee abroad; keep the certificate to claim credit in NL.
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: T.font, fontSize: 10 }}>
              <thead>
                <tr>
                  {["Country", "Language", "Currency", "Work permit", "Withholding tax", "Travel", "Offer note", "Lead time", "Priority"].map(h => (
                    <th key={h} style={{ ...label9, textAlign: "left", padding: "7px 8px", borderBottom: `1px solid ${T.border2}`, color: T.accent, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COUNTRY_PLAYBOOK.map((row, i) => {
                  const priColor = row.priority === "High" ? "#4CAF50" : row.priority === "Strategic" ? "#a78bfa" : row.priority === "Base" ? T.accent : T.muted;
                  return (
                    <tr key={i} style={{ background: i % 2 === 0 ? T.bg : T.bg2 }}>
                      <td style={{ padding: "9px 8px", color: T.text, borderBottom: `1px solid ${T.border}`, fontWeight: 700, whiteSpace: "nowrap" }}>{row.country}</td>
                      <td style={{ padding: "9px 8px", color: T.muted, borderBottom: `1px solid ${T.border}` }}>{row.lang}</td>
                      <td style={{ padding: "9px 8px", color: T.text, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{row.currency}</td>
                      <td style={{ padding: "9px 8px", color: T.muted, borderBottom: `1px solid ${T.border}`, lineHeight: 1.5 }}>{row.permit}</td>
                      <td style={{ padding: "9px 8px", color: T.muted, borderBottom: `1px solid ${T.border}`, lineHeight: 1.5 }}>{row.tax}</td>
                      <td style={{ padding: "9px 8px", color: T.muted, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{row.travel}</td>
                      <td style={{ padding: "9px 8px", color: T.text, borderBottom: `1px solid ${T.border}`, lineHeight: 1.5 }}>{row.offerNote}</td>
                      <td style={{ padding: "9px 8px", color: T.muted, borderBottom: `1px solid ${T.border}`, whiteSpace: "nowrap" }}>{row.leadTime}</td>
                      <td style={{ padding: "9px 8px", color: priColor, borderBottom: `1px solid ${T.border}`, fontWeight: 700, whiteSpace: "nowrap" }}>{row.priority}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ fontFamily: T.font, fontSize: 10, color: T.muted, marginTop: 14, lineHeight: 1.6 }}>
            Also: for work in other EU countries, ask the SVB about an A1 certificate (social security) — verify if it applies to Donn's set-up.
          </div>
        </div>
      )}
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

export default function ManagementSection({
  activeView = "Timeline",
  onNavigate,
}: {
  activeView?: string;
  onNavigate?: (view: string) => void;
}) {
  const active = activeView as View;
  const setActive = (v: View) => onNavigate?.(v);

  return (
    <div style={{ padding: "0" }}>
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
  );
}
