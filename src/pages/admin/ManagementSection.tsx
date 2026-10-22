/** @format */

import { useState, useEffect, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Festival {
  id: string;
  name: string;
  city: string;
  country: string;
  region: string;
  genre: string;
  tier: string;
  timing: string;
  dates2027: string;
  pitchBy: string;
  entryRoute: string;
  target: string;
  status: string;
  website: string;
  contact: string;
  lastContact: string;
  nextAction: string;
  notes: string;
  pitchRoute: string;
}

interface Agency {
  name: string;
  base: string;
  what: string;
  fit: string;
  website: string;
  when: string;
  status: string;
}

// ─── Style tokens ─────────────────────────────────────────────────────────────

const S = {
  input: {
    width: "100%", background: "#110808", border: "1px solid #2A1414",
    color: "#EAD5C8", padding: "8px 12px",
    fontFamily: '"Space Mono", monospace', fontSize: 12,
    outline: "none", boxSizing: "border-box" as const,
  },
  label: {
    fontFamily: '"Space Mono", monospace', fontSize: 9,
    letterSpacing: "0.18em", textTransform: "uppercase" as const,
    color: "#7A6060", display: "block", marginBottom: 4,
  },
  btn: {
    fontFamily: '"Space Mono", monospace', fontSize: 9, fontWeight: 700,
    letterSpacing: "0.14em", textTransform: "uppercase" as const,
    color: "#EAD5C8", background: "#9B1D20", border: "none",
    padding: "8px 16px", cursor: "pointer",
  },
  btnGhost: {
    fontFamily: '"Space Mono", monospace', fontSize: 9, fontWeight: 700,
    letterSpacing: "0.14em", textTransform: "uppercase" as const,
    color: "#7A6060", background: "none", border: "1px solid #2A1414",
    padding: "6px 12px", cursor: "pointer",
  },
};

const STATUSES = ["Not started", "Researching", "Pitched", "Follow-up", "In talks", "Confirmed", "Declined", "Next year"];
const TIER_COLORS: Record<string, string> = { A: "#9B1D20", B: "#7A4A10", C: "#3D2060", S: "#1A5C1A" };
const STATUS_COLORS: Record<string, string> = {
  "Not started": "#2A1414",
  Researching: "#4A3010",
  Pitched: "#1A3A5C",
  "Follow-up": "#5C4A10",
  "In talks": "#3A5C1A",
  Confirmed: "#1A5C1A",
  Declined: "#3D2020",
  "Next year": "#2A1450",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / 86400000);
}

function deadlineColor(days: number | null): string {
  if (days === null) return "#7A6060";
  if (days < 0) return "#9B1D20";
  if (days <= 30) return "#B87A20";
  return "#4A7A4A";
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function cleanUrl(url: string): string {
  if (!url || url === "Verify" || url === "—" || url.startsWith("Verify")) return "";
  if (url.startsWith("http")) return url;
  // strip annotation text after space/dash
  const clean = url.split(" ")[0].split("—")[0].trim();
  if (clean.includes(".")) return `https://${clean}`;
  return "";
}

// ─── Sub-tab toggle ───────────────────────────────────────────────────────────

type Tab = "pipeline" | "calculator" | "agencies";

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function ManagementSection() {
  const [tab, setTab] = useState<Tab>("pipeline");

  return (
    <div>
      {/* Sub-tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #1E0E0E", marginBottom: 36, gap: 0 }}>
        {(["pipeline", "agencies", "calculator"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontFamily: '"Space Mono", monospace', fontSize: 9, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: tab === t ? "#EAD5C8" : "#3D2020",
              background: "none", border: "none",
              borderBottom: tab === t ? "2px solid #9B1D20" : "2px solid transparent",
              padding: "0 0 14px", marginRight: 28, cursor: "pointer",
            }}
          >
            {t === "pipeline" ? "Festival Pipeline" : t === "agencies" ? "Agents & Agencies" : "Deal Calculator"}
          </button>
        ))}
      </div>

      {tab === "pipeline" && <PipelineTab />}
      {tab === "agencies" && <AgenciesTab />}
      {tab === "calculator" && <CalculatorTab />}
    </div>
  );
}

// ─── PIPELINE TAB ─────────────────────────────────────────────────────────────

function PipelineTab() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("All");
  const [filterRegion, setFilterRegion] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content?section=festivals")
      .then((r) => r.json())
      .then((j) => { setFestivals(j.data || []); setSha(j.sha || ""); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function save(updated: Festival[]) {
    setSaving(true);
    const r = await fetch("/api/content?section=festivals", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: updated, sha }),
    });
    if (r.ok) {
      const j = await r.json();
      setSha(j.sha || sha);
    }
    setSaving(false);
  }

  function updateFestival(id: string, patch: Partial<Festival>) {
    const updated = festivals.map((f) => f.id === id ? { ...f, ...patch } : f);
    setFestivals(updated);
    save(updated);
  }

  const regions = useMemo(() => ["All", ...Array.from(new Set(festivals.map((f) => f.region).filter(Boolean)))], [festivals]);

  const urgent = festivals.filter((f) => {
    const d = daysUntil(f.pitchBy);
    return d !== null && d <= 30 && f.status === "Not started";
  });

  const filtered = useMemo(() => festivals.filter((f) => {
    if (filterTier !== "All" && f.tier !== filterTier) return false;
    if (filterRegion !== "All" && f.region !== filterRegion) return false;
    if (filterStatus !== "All" && f.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.city.toLowerCase().includes(q) || f.country.toLowerCase().includes(q) || f.genre.toLowerCase().includes(q);
    }
    return true;
  }), [festivals, filterTier, filterRegion, filterStatus, search]);

  // Group by status for kanban
  const byStatus = useMemo(() => {
    const map: Record<string, Festival[]> = {};
    STATUSES.forEach((s) => { map[s] = []; });
    filtered.forEach((f) => { (map[f.status] || (map["Not started"] = [])).push(f); });
    return map;
  }, [filtered]);

  if (loading) return <p style={{ color: "#7A6060", fontFamily: '"Space Mono", monospace', fontSize: 12 }}>Loading pipeline...</p>;

  return (
    <div>
      {/* Urgent alert */}
      {urgent.length > 0 && (
        <div style={{ background: "#3D1010", border: "1px solid #9B1D20", padding: "12px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9B1D20" }}>
            ⚠ {urgent.length} deadline{urgent.length > 1 ? "s" : ""} within 30 days
          </span>
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#BFA8A0" }}>
            {urgent.map((f) => `${f.name} (${daysUntil(f.pitchBy)}d)`).join(" · ")}
          </span>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search festivals..."
          style={{ ...S.input, width: 200, padding: "8px 12px" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#9B1D20")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#2A1414")}
        />
        {[
          { label: "Tier", value: filterTier, setter: setFilterTier, opts: ["All", "A", "B", "C", "S"] },
          { label: "Region", value: filterRegion, setter: setFilterRegion, opts: regions },
          { label: "Status", value: filterStatus, setter: setFilterStatus, opts: ["All", ...STATUSES] },
        ].map(({ label, value, setter, opts }) => (
          <select key={label} value={value} onChange={(e) => setter(e.target.value)}
            style={{ ...S.input, width: "auto", padding: "8px 12px", cursor: "pointer" }}>
            {opts.map((o) => <option key={o} value={o}>{label}: {o}</option>)}
          </select>
        ))}
        <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#7A6060", marginLeft: "auto" }}>
          {filtered.length} / {festivals.length} festivals {saving ? "· saving..." : ""}
        </span>
      </div>

      {/* Kanban columns */}
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 16 }}>
        {STATUSES.filter((s) => byStatus[s]?.length > 0 || filterStatus === "All").map((status) => (
          <div key={status} style={{ minWidth: 260, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "0 4px" }}>
              <span style={{
                fontFamily: '"Space Mono", monospace', fontSize: 8, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#EAD5C8", background: STATUS_COLORS[status] || "#2A1414",
                padding: "4px 8px",
              }}>{status}</span>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#7A6060" }}>
                {byStatus[status]?.length || 0}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {(byStatus[status] || []).map((f) => (
                <FestivalCard
                  key={f.id}
                  festival={f}
                  expanded={expanded === f.id}
                  editingContact={editingContact === f.id}
                  onToggle={() => setExpanded(expanded === f.id ? null : f.id)}
                  onEditContact={() => setEditingContact(editingContact === f.id ? null : f.id)}
                  onUpdate={(patch) => { updateFestival(f.id, patch); if (patch.contact !== undefined) setEditingContact(null); }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FestivalCard({ festival: f, expanded, editingContact, onToggle, onEditContact, onUpdate }: {
  festival: Festival;
  expanded: boolean;
  editingContact: boolean;
  onToggle: () => void;
  onEditContact: () => void;
  onUpdate: (patch: Partial<Festival>) => void;
}) {
  const days = daysUntil(f.pitchBy);
  const url = cleanUrl(f.website);
  const [contactVal, setContactVal] = useState(f.contact);
  const [nextActionVal, setNextActionVal] = useState(f.nextAction);

  return (
    <div style={{ background: "#0D0606", border: "1px solid #1E0E0E", padding: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{
              fontFamily: '"Space Mono", monospace', fontSize: 8, fontWeight: 700,
              color: "#EAD5C8", background: TIER_COLORS[f.tier] || "#3D2020",
              padding: "2px 6px", flexShrink: 0,
            }}>T{f.tier}</span>
            {f.contact && (
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 8, color: "#4A7A4A" }}>●</span>
            )}
          </div>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#EAD5C8", margin: "0 0 2px", fontWeight: 700, wordBreak: "break-word" }}>
            {f.name}
          </p>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#7A6060", margin: 0 }}>
            {f.city}, {f.country}
          </p>
        </div>
        <button onClick={onToggle} style={{ ...S.btnGhost, padding: "4px 8px", fontSize: 9, flexShrink: 0 }}>
          {expanded ? "▲" : "▼"}
        </button>
      </div>

      {/* Deadline */}
      {f.pitchBy && (
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 8, color: deadlineColor(days), margin: "0 0 8px" }}>
          Pitch by {f.pitchBy} {days !== null ? `(${days >= 0 ? `${days}d left` : `${Math.abs(days)}d ago`})` : ""}
        </p>
      )}

      {/* Status dropdown */}
      <select
        value={f.status}
        onChange={(e) => onUpdate({ status: e.target.value })}
        style={{ ...S.input, fontSize: 10, padding: "6px 8px", marginBottom: 8, cursor: "pointer" }}
      >
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Expanded details */}
      {expanded && (
        <div style={{ borderTop: "1px solid #1E0E0E", paddingTop: 12, marginTop: 4 }}>
          {/* Genre / target */}
          <p style={{ ...S.label, marginBottom: 4 }}>{f.genre}</p>
          <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#BFA8A0", margin: "0 0 10px" }}>
            Target: {f.target}
          </p>

          {/* Website */}
          {url && (
            <div style={{ marginBottom: 10 }}>
              <a href={url} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#9B1D20", textDecoration: "none", wordBreak: "break-all" }}>
                ↗ {url.replace("https://", "")}
              </a>
            </div>
          )}

          {/* Contact */}
          <div style={{ marginBottom: 10 }}>
            <label style={S.label}>Contact</label>
            {editingContact ? (
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  value={contactVal}
                  onChange={(e) => setContactVal(e.target.value)}
                  placeholder="name / email"
                  style={{ ...S.input, flex: 1, fontSize: 11 }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#9B1D20")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#2A1414")}
                />
                <button onClick={() => onUpdate({ contact: contactVal })} style={{ ...S.btn, padding: "6px 10px" }}>✓</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: f.contact ? "#EAD5C8" : "#3D2020", flex: 1 }}>
                  {f.contact || "— not set"}
                </span>
                {f.contact && f.contact.includes("@") && (
                  <button onClick={() => copyToClipboard(f.contact)}
                    style={{ ...S.btnGhost, padding: "4px 8px", fontSize: 8 }}>Copy</button>
                )}
                <button onClick={onEditContact} style={{ ...S.btnGhost, padding: "4px 8px", fontSize: 8 }}>Edit</button>
              </div>
            )}
          </div>

          {/* Next action */}
          <div style={{ marginBottom: 10 }}>
            <label style={S.label}>Next action</label>
            <textarea
              value={nextActionVal}
              onChange={(e) => setNextActionVal(e.target.value)}
              onBlur={() => { if (nextActionVal !== f.nextAction) onUpdate({ nextAction: nextActionVal }); }}
              rows={2}
              placeholder="What's the next step?"
              style={{ ...S.input, resize: "vertical", fontSize: 11 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#9B1D20")}
            />
          </div>

          {/* Pitch route */}
          {f.pitchRoute && (
            <div style={{ background: "#0A0504", border: "1px solid #1E0E0E", padding: 10 }}>
              <label style={{ ...S.label, marginBottom: 6 }}>How to pitch</label>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#BFA8A0", margin: 0, lineHeight: 1.7 }}>
                {f.pitchRoute}
              </p>
            </div>
          )}

          {f.notes && (
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#7A6060", margin: "10px 0 0", fontStyle: "italic" }}>
              {f.notes}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── AGENCIES TAB ─────────────────────────────────────────────────────────────

const AGENCY_STATUSES = ["Not started", "Researching", "Contacted", "In talks", "Signed", "Pass"];
const FIT_COLORS: Record<string, string> = {
  High: "#1A5C1A", "High (genre)": "#1A5C1A", "High (NL + genre)": "#1A5C1A",
  "Medium–high": "#4A5C1A", Medium: "#5C4A10", "Medium (SA market)": "#5C4A10",
  "Medium (promoter, not agency)": "#5C4A10", "Low–medium (house-leaning)": "#3D3010",
  Aspirational: "#3D2060",
};

function AgenciesTab() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/content?section=agencies")
      .then((r) => r.json())
      .then((j) => { setAgencies(j.data || []); setSha(j.sha || ""); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function updateAgency(idx: number, patch: Partial<Agency>) {
    const updated = agencies.map((a, i) => i === idx ? { ...a, ...patch } : a);
    setAgencies(updated);
    await fetch("/api/content?section=agencies", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: updated, sha }),
    });
  }

  if (loading) return <p style={{ color: "#7A6060", fontFamily: '"Space Mono", monospace', fontSize: 12 }}>Loading agencies...</p>;

  return (
    <div>
      <div style={{ background: "#110808", border: "1px solid #1E0E0E", padding: "12px 16px", marginBottom: 24 }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#7A6060", margin: 0, lineHeight: 1.6 }}>
          Don't approach agencies cold. Build proof first: live video, rebook list, content numbers. Approach the specific agent (via roster → LinkedIn), never the company inbox.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {agencies.map((a, i) => {
          const url = cleanUrl(a.website);
          const fitColor = FIT_COLORS[a.fit] || "#3D2020";
          return (
            <div key={a.name} style={{ background: "#0D0606", border: "1px solid #1E0E0E", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                    <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: "#EAD5C8", margin: 0, fontWeight: 700 }}>
                      {a.name}
                    </p>
                    <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 8, color: "#EAD5C8", background: fitColor, padding: "2px 8px" }}>
                      {a.fit}
                    </span>
                  </div>
                  <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#7A6060", margin: "0 0 4px" }}>
                    {a.base} · {a.what}
                  </p>
                  <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#BFA8A0", margin: "0 0 8px", fontStyle: "italic" }}>
                    When: {a.when}
                  </p>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    {url && (
                      <a href={url} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#9B1D20", textDecoration: "none" }}>
                        ↗ {url.replace("https://", "")}
                      </a>
                    )}
                  </div>
                </div>
                <select
                  value={a.status}
                  onChange={(e) => updateAgency(i, { status: e.target.value })}
                  style={{ ...S.input, width: 160, fontSize: 10, padding: "6px 8px", cursor: "pointer", flexShrink: 0 }}
                >
                  {AGENCY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DEAL CALCULATOR TAB ──────────────────────────────────────────────────────

const MARKET_RATES = [
  { market: "NL / Europe", type: "Club night", low: 800, high: 1500, currency: "EUR", note: "Year-round" },
  { market: "NL / Europe", type: "Festival slot", low: 1500, high: 3000, currency: "EUR", note: "May–Sep" },
  { market: "NL / Europe", type: "Residency (per night)", low: 600, high: 1200, currency: "EUR", note: "Year-round" },
  { market: "Dubai", type: "Club night", low: 5000, high: 12000, currency: "AED", note: "Oct–Apr only" },
  { market: "Dubai", type: "Private / brand", low: 8000, high: 20000, currency: "AED", note: "Oct–Apr only" },
];

function CalculatorTab() {
  const [gross, setGross] = useState(1500);
  const [mgmtPct, setMgmtPct] = useState(15);
  const [agentPct, setAgentPct] = useState(0);
  const [costs, setCosts] = useState(0);

  const mgmtTake = Math.round(gross * mgmtPct / 100);
  const agentTake = Math.round(gross * agentPct / 100);
  const net = gross - mgmtTake - agentTake - costs;
  const netPct = gross > 0 ? Math.round((net / gross) * 100) : 0;

  return (
    <div style={{ maxWidth: 560 }}>
      <div style={{ background: "#0D0606", border: "1px solid #1E0E0E", padding: 24, marginBottom: 24 }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#9B1D20", margin: "0 0 20px" }}>
          Deal Calculator
        </p>

        {[
          { label: "Gross Fee (EUR)", value: gross, setter: setGross, min: 0, max: 50000, step: 50 },
          { label: "Management commission %", value: mgmtPct, setter: setMgmtPct, min: 0, max: 25, step: 1 },
          { label: "Booking agent commission %", value: agentPct, setter: setAgentPct, min: 0, max: 20, step: 1 },
          { label: "Direct costs (travel, visa, gear) EUR", value: costs, setter: setCosts, min: 0, max: 10000, step: 50 },
        ].map(({ label, value, setter, min, max, step }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label style={S.label}>{label}</label>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={(e) => setter(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#9B1D20" }}
              />
              <input
                type="number" value={value}
                onChange={(e) => setter(Number(e.target.value))}
                style={{ ...S.input, width: 90, textAlign: "right" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#9B1D20")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#2A1414")}
              />
            </div>
          </div>
        ))}

        <div style={{ borderTop: "1px solid #1E0E0E", paddingTop: 20, marginTop: 8 }}>
          {[
            { label: "Ivan (management)", value: mgmtTake, color: "#7A6060" },
            { label: "Agent", value: agentTake, color: "#7A6060" },
            { label: "Direct costs", value: costs, color: "#7A6060" },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #1E0E0E" }}>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color }}>{label}</span>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color }}>€ {value.toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0" }}>
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 13, fontWeight: 700, color: "#EAD5C8" }}>Donn net</span>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 20, fontWeight: 700, color: net >= 0 ? "#4A7A4A" : "#9B1D20" }}>
                € {net.toLocaleString()}
              </span>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#7A6060", display: "block" }}>
                {netPct}% of gross
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Market rate reference */}
      <div style={{ background: "#0D0606", border: "1px solid #1E0E0E", padding: 20 }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "#9B1D20", margin: "0 0 16px" }}>
          Market rates reference
        </p>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#3D2020", margin: "0 0 14px", lineHeight: 1.6 }}>
          Unvalidated estimates — replace with real offers as they come in.
        </p>
        {MARKET_RATES.map((r) => (
          <div key={r.market + r.type} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1E0E0E", gap: 8, flexWrap: "wrap" }}>
            <div>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#EAD5C8", margin: "0 0 2px" }}>{r.market} · {r.type}</p>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 9, color: "#7A6060", margin: 0 }}>{r.note}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, fontWeight: 700, color: "#BFA8A0" }}>
                {r.currency} {r.low.toLocaleString()} – {r.high.toLocaleString()}
              </span>
              <button
                onClick={() => setGross(r.currency === "EUR" ? Math.round((r.low + r.high) / 2) : gross)}
                style={{ ...S.btnGhost, display: "block", marginTop: 4, fontSize: 8, padding: "3px 8px" }}
                title="Use midpoint in calculator"
              >
                {r.currency === "EUR" ? "Use midpoint" : "AED"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
