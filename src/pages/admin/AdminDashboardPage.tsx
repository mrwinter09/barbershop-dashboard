/** @format */

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminGuard from "./AdminGuard";

const SECTIONS = ["Home", "Video", "Tour", "Bio", "Bookings"] as const;
type Section = (typeof SECTIONS)[number];

const S = {
  input: {
    width: "100%",
    background: "#110808",
    border: "1px solid #2A1414",
    color: "#EAD5C8",
    padding: "10px 14px",
    fontFamily: '"Space Mono", monospace',
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box" as const,
  },
  label: {
    fontFamily: '"Space Mono", monospace',
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "#7A6060",
    display: "block",
    marginBottom: 6,
  },
  btn: {
    fontFamily: '"Space Mono", monospace',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "#EAD5C8",
    background: "#9B1D20",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  },
  btnGhost: {
    fontFamily: '"Space Mono", monospace',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase" as const,
    color: "#7A6060",
    background: "none",
    border: "1px solid #2A1414",
    padding: "8px 14px",
    cursor: "pointer",
  },
  field: { marginBottom: 24 },
  heading: {
    fontFamily: '"Space Mono", monospace',
    fontSize: 10,
    letterSpacing: "0.22em",
    textTransform: "uppercase" as const,
    color: "#9B1D20",
    marginBottom: 8,
  },
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={S.field}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

function useFocus(base: React.CSSProperties) {
  return {
    style: base,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.currentTarget.style.borderColor = "#9B1D20"),
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      (e.currentTarget.style.borderColor = "#2A1414"),
  };
}

// ---------- HOME SECTION ----------

interface HomeData {
  heroSubtitle: string;
  heroVideoId: string;
  heroUseVideo: boolean;
  bioHeading: string;
  bioParagraph1: string;
  bioParagraph2: string;
}

function HomeEditor() {
  const [data, setData] = useState<HomeData | null>(null);
  const [sha, setSha] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?section=home")
      .then((r) => r.json())
      .then((j) => {
        setData(j.data);
        setSha(j.sha);
      });
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const r = await fetch("/api/content?section=home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, sha }),
    });
    setSaving(false);
    if (r.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (!data)
    return (
      <p style={{ color: "#7A6060", fontFamily: '"Space Mono", monospace', fontSize: 12 }}>
        Loading...
      </p>
    );

  const fi = useFocus(S.input);

  return (
    <div>
      <Field label="Hero subtitle">
        <input
          {...fi}
          value={data.heroSubtitle}
          onChange={(e) => setData({ ...data, heroSubtitle: e.target.value })}
        />
      </Field>
      <Field label="Use video as hero background">
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={data.heroUseVideo}
            onChange={(e) => setData({ ...data, heroUseVideo: e.target.checked })}
            style={{ accentColor: "#9B1D20", width: 16, height: 16 }}
          />
          <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: "#EAD5C8" }}>
            Show video instead of photo
          </span>
        </label>
      </Field>
      {data.heroUseVideo && (
        <Field label="YouTube Video ID">
          <input
            {...fi}
            value={data.heroVideoId}
            onChange={(e) => setData({ ...data, heroVideoId: e.target.value })}
            placeholder="e.g. dQw4w9WgXcQ"
          />
        </Field>
      )}
      <Field label="Bio heading">
        <input
          {...fi}
          value={data.bioHeading}
          onChange={(e) => setData({ ...data, bioHeading: e.target.value })}
        />
      </Field>
      <Field label="Bio paragraph 1">
        <textarea
          {...useFocus({ ...S.input, minHeight: 80, resize: "vertical" })}
          value={data.bioParagraph1}
          onChange={(e) => setData({ ...data, bioParagraph1: e.target.value })}
        />
      </Field>
      <Field label="Bio paragraph 2">
        <textarea
          {...useFocus({ ...S.input, minHeight: 80, resize: "vertical" })}
          value={data.bioParagraph2}
          onChange={(e) => setData({ ...data, bioParagraph2: e.target.value })}
        />
      </Field>
      <button
        style={{ ...S.btn, opacity: saving ? 0.6 : 1 }}
        onClick={save}
        disabled={saving}
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save"}
      </button>
    </div>
  );
}

// ---------- VIDEO SECTION ----------

interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  date: string;
}

function VideoEditor() {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [sha, setSha] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?section=videos")
      .then((r) => r.json())
      .then((j) => {
        setItems(j.data);
        setSha(j.sha);
      });
  }, []);

  function addVideo() {
    setItems([
      { id: Date.now().toString(), title: "", youtubeId: "", date: "" },
      ...items,
    ]);
  }

  function remove(id: string) {
    setItems(items.filter((v) => v.id !== id));
  }

  function moveUp(i: number) {
    if (i === 0) return;
    const next = [...items];
    [next[i - 1], next[i]] = [next[i], next[i - 1]];
    setItems(next);
  }

  function moveDown(i: number) {
    if (i === items.length - 1) return;
    const next = [...items];
    [next[i], next[i + 1]] = [next[i + 1], next[i]];
    setItems(next);
  }

  function update(id: string, field: keyof VideoItem, value: string) {
    setItems(items.map((v) => (v.id === id ? { ...v, [field]: value } : v)));
  }

  async function save() {
    setSaving(true);
    const r = await fetch("/api/content?section=videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: items, sha }),
    });
    setSaving(false);
    if (r.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  const fi = useFocus(S.input);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <button style={S.btn} onClick={addVideo}>
          + Add video
        </button>
      </div>
      {items.map((v, i) => (
        <div
          key={v.id}
          style={{
            background: "#0D0606",
            border: "1px solid #1E0E0E",
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={S.btnGhost} onClick={() => moveUp(i)} title="Move up">
                ↑
              </button>
              <button style={S.btnGhost} onClick={() => moveDown(i)} title="Move down">
                ↓
              </button>
            </div>
            <button
              style={{ ...S.btnGhost, color: "#9B1D20", borderColor: "#3D1010" }}
              onClick={() => remove(v.id)}
            >
              Remove
            </button>
          </div>
          <Field label="Title">
            <input
              {...fi}
              value={v.title}
              onChange={(e) => update(v.id, "title", e.target.value)}
            />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="YouTube ID">
              <input
                {...fi}
                value={v.youtubeId}
                onChange={(e) => update(v.id, "youtubeId", e.target.value)}
                placeholder="e.g. dQw4w9WgXcQ"
              />
            </Field>
            <Field label="Date">
              <input
                {...fi}
                type="date"
                value={v.date}
                onChange={(e) => update(v.id, "date", e.target.value)}
              />
            </Field>
          </div>
        </div>
      ))}
      <button
        style={{ ...S.btn, opacity: saving ? 0.6 : 1 }}
        onClick={save}
        disabled={saving}
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save order & videos"}
      </button>
    </div>
  );
}

// ---------- TOUR SECTION ----------

interface TourItem {
  id: string;
  date: string;
  venue: string;
  city: string;
  country: string;
  ticketUrl: string;
  active: boolean;
}

function TourEditor() {
  const [items, setItems] = useState<TourItem[]>([]);
  const [sha, setSha] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?section=tour")
      .then((r) => r.json())
      .then((j) => {
        setItems(j.data);
        setSha(j.sha);
      });
  }, []);

  function addRow() {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        date: "",
        venue: "",
        city: "",
        country: "",
        ticketUrl: "",
        active: true,
      },
    ]);
  }

  function remove(id: string) {
    setItems(items.filter((t) => t.id !== id));
  }

  function update(id: string, field: keyof TourItem, value: string | boolean) {
    setItems(items.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }

  async function save() {
    setSaving(true);
    const r = await fetch("/api/content?section=tour", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: items, sha }),
    });
    setSaving(false);
    if (r.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  const fi = useFocus(S.input);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <button style={S.btn} onClick={addRow}>
          + Add date
        </button>
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          style={{
            background: "#0D0606",
            border: "1px solid #1E0E0E",
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={t.active}
                onChange={(e) => update(t.id, "active", e.target.checked)}
                style={{ accentColor: "#9B1D20", width: 14, height: 14 }}
              />
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#7A6060", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Active / visible
              </span>
            </label>
            <button
              style={{ ...S.btnGhost, color: "#9B1D20", borderColor: "#3D1010" }}
              onClick={() => remove(t.id)}
            >
              Remove
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
            <Field label="Date">
              <input {...fi} type="date" value={t.date} onChange={(e) => update(t.id, "date", e.target.value)} />
            </Field>
            <Field label="Venue">
              <input {...fi} value={t.venue} onChange={(e) => update(t.id, "venue", e.target.value)} />
            </Field>
            <Field label="City">
              <input {...fi} value={t.city} onChange={(e) => update(t.id, "city", e.target.value)} />
            </Field>
            <Field label="Country">
              <input {...fi} value={t.country} onChange={(e) => update(t.id, "country", e.target.value)} placeholder="NL" />
            </Field>
          </div>
          <Field label="Ticket URL">
            <input {...fi} value={t.ticketUrl} onChange={(e) => update(t.id, "ticketUrl", e.target.value)} placeholder="https://..." />
          </Field>
        </div>
      ))}
      <button
        style={{ ...S.btn, opacity: saving ? 0.6 : 1 }}
        onClick={save}
        disabled={saving}
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save tour dates"}
      </button>
    </div>
  );
}

// ---------- BIO SECTION ----------

interface Quote {
  id: string;
  text: string;
  source: string;
}

interface BioData {
  shortBio: string;
  longBio: string;
  quotes: Quote[];
}

function BioEditor() {
  const [data, setData] = useState<BioData | null>(null);
  const [sha, setSha] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/content?section=bio")
      .then((r) => r.json())
      .then((j) => {
        setData(j.data);
        setSha(j.sha);
      });
  }, []);

  function addQuote() {
    if (!data) return;
    setData({
      ...data,
      quotes: [...data.quotes, { id: Date.now().toString(), text: "", source: "" }],
    });
  }

  function removeQuote(id: string) {
    if (!data) return;
    setData({ ...data, quotes: data.quotes.filter((q) => q.id !== id) });
  }

  function updateQuote(id: string, field: keyof Quote, value: string) {
    if (!data) return;
    setData({
      ...data,
      quotes: data.quotes.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    });
  }

  async function save() {
    if (!data) return;
    setSaving(true);
    const r = await fetch("/api/content?section=bio", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data, sha }),
    });
    setSaving(false);
    if (r.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  if (!data)
    return (
      <p style={{ color: "#7A6060", fontFamily: '"Space Mono", monospace', fontSize: 12 }}>
        Loading...
      </p>
    );

  const fi = useFocus(S.input);

  return (
    <div>
      <Field label="Short bio (for press kit)">
        <textarea
          {...useFocus({ ...S.input, minHeight: 100, resize: "vertical" })}
          value={data.shortBio}
          onChange={(e) => setData({ ...data, shortBio: e.target.value })}
        />
      </Field>
      <Field label="Long bio (full version)">
        <textarea
          {...useFocus({ ...S.input, minHeight: 180, resize: "vertical" })}
          value={data.longBio}
          onChange={(e) => setData({ ...data, longBio: e.target.value })}
        />
      </Field>

      <div style={{ marginTop: 8, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={S.heading}>Quotes</p>
          <button style={S.btn} onClick={addQuote}>
            + Add quote
          </button>
        </div>
        {data.quotes.map((q) => (
          <div
            key={q.id}
            style={{ background: "#0D0606", border: "1px solid #1E0E0E", padding: 16, marginBottom: 12 }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
              <button
                style={{ ...S.btnGhost, color: "#9B1D20", borderColor: "#3D1010" }}
                onClick={() => removeQuote(q.id)}
              >
                Remove
              </button>
            </div>
            <Field label="Quote text">
              <textarea
                {...useFocus({ ...S.input, minHeight: 60, resize: "vertical" })}
                value={q.text}
                onChange={(e) => updateQuote(q.id, "text", e.target.value)}
              />
            </Field>
            <Field label="Source">
              <input
                {...fi}
                value={q.source}
                onChange={(e) => updateQuote(q.id, "source", e.target.value)}
                placeholder="e.g. DJ Mag NL"
              />
            </Field>
          </div>
        ))}
      </div>

      <button
        style={{ ...S.btn, opacity: saving ? 0.6 : 1 }}
        onClick={save}
        disabled={saving}
      >
        {saving ? "Saving..." : saved ? "Saved!" : "Save bio"}
      </button>
    </div>
  );
}

// ---------- BOOKINGS SECTION ----------

interface Booking {
  number: number;
  title: string;
  body: string;
  labels: Array<{ name: string }>;
  created_at: string;
  html_url: string;
}

const STATUS_COLORS: Record<string, string> = {
  new: "#9B1D20",
  "in discussion": "#7A4A10",
  confirmed: "#1A5C1A",
  completed: "#3D2060",
  declined: "#3D2020",
};

function getStatus(booking: Booking): string {
  const label = booking.labels.find((l) => l.name.startsWith("status:"));
  return label ? label.name.replace("status: ", "") : "new";
}

function parseName(title: string): string {
  const m = title.match(/^Booking: (.+?) —/);
  return m ? m[1] : title;
}

function parseDate(title: string): string {
  const m = title.match(/— (.+)$/);
  return m ? m[1] : "";
}

function BookingsSection() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/booking")
      .then((r) => r.json())
      .then((j) => {
        setBookings(j.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function changeStatus(issueNumber: number, status: string) {
    setUpdating(issueNumber);
    await fetch("/api/booking", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ issueNumber, status }),
    });
    setUpdating(null);
    load();
  }

  if (loading)
    return (
      <p style={{ color: "#7A6060", fontFamily: '"Space Mono", monospace', fontSize: 12 }}>
        Loading bookings...
      </p>
    );

  if (bookings.length === 0)
    return (
      <div style={{ border: "1px dashed #2A1414", padding: "64px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7A6060" }}>
          No booking requests yet
        </p>
      </div>
    );

  return (
    <div>
      {bookings.map((b) => {
        const status = getStatus(b);
        return (
          <div
            key={b.number}
            style={{
              background: "#0D0606",
              border: "1px solid #1E0E0E",
              padding: 20,
              marginBottom: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 13, color: "#EAD5C8", margin: "0 0 4px", fontWeight: 700 }}>
                  {parseName(b.title)}
                </p>
                <p style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#7A6060", margin: 0, letterSpacing: "0.1em" }}>
                  {parseDate(b.title)} &nbsp;·&nbsp; {new Date(b.created_at).toLocaleDateString("nl-NL")}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#EAD5C8",
                    background: STATUS_COLORS[status] || "#3D2020",
                    padding: "4px 10px",
                  }}
                >
                  {status}
                </span>
                <select
                  disabled={updating === b.number}
                  onChange={(e) => changeStatus(b.number, e.target.value)}
                  defaultValue=""
                  style={{
                    ...S.input,
                    width: "auto",
                    fontSize: 10,
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled>
                    Change status…
                  </option>
                  {["new", "in discussion", "confirmed", "completed", "declined"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {b.body && (
              <details style={{ marginTop: 16 }}>
                <summary style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#7A6060", cursor: "pointer", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  View details
                </summary>
                <pre
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 11,
                    color: "#BFA8A0",
                    background: "#0A0504",
                    border: "1px solid #1E0E0E",
                    padding: 16,
                    marginTop: 12,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {b.body}
                </pre>
              </details>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ---------- MAIN DASHBOARD ----------

export default function AdminDashboardPage() {
  const [active, setActive] = useState<Section>("Home");
  const navigate = useNavigate();

  async function handleLogout() {
    await fetch("/api/admin-auth", { method: "DELETE" });
    navigate("/admin");
  }

  return (
    <AdminGuard>
      <div style={{ background: "#0A0504", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header
          style={{
            background: "#110808",
            borderBottom: "1px solid #1E0E0E",
            padding: "0 clamp(20px,4vw,48px)",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            <span style={{ color: "#9B1D20" }}>DONN</span>
            <span style={{ color: "#EAD5C8" }}> STONE</span>
            <span
              style={{
                color: "#3D2020",
                fontSize: 10,
                marginLeft: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7A6060",
              background: "none",
              border: "1px solid #2A1414",
              padding: "8px 16px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#EAD5C8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#7A6060")}
          >
            Log out
          </button>
        </header>

        <div style={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <nav
            style={{
              width: 200,
              background: "#0D0707",
              borderRight: "1px solid #1E0E0E",
              padding: "32px 0",
              flexShrink: 0,
            }}
          >
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setActive(s)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: active === s ? "#EAD5C8" : "#3D2020",
                  background: active === s ? "#1E0E0E" : "none",
                  border: "none",
                  borderLeft: active === s ? "3px solid #9B1D20" : "3px solid transparent",
                  padding: "14px 24px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (active !== s) e.currentTarget.style.color = "#7A6060";
                }}
                onMouseLeave={(e) => {
                  if (active !== s) e.currentTarget.style.color = "#3D2020";
                }}
              >
                {s}
              </button>
            ))}
          </nav>

          {/* Main content */}
          <main style={{ flex: 1, padding: "48px clamp(20px,4vw,48px)", maxWidth: 800 }}>
            <p
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#9B1D20",
                marginBottom: 16,
              }}
            >
              Section
            </p>
            <h1
              style={{
                fontFamily: '"Space Mono", monospace',
                fontWeight: 700,
                fontSize: 28,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#EAD5C8",
                margin: "0 0 40px",
              }}
            >
              {active}
            </h1>

            {active === "Home" && <HomeEditor />}
            {active === "Video" && <VideoEditor />}
            {active === "Tour" && <TourEditor />}
            {active === "Bio" && <BioEditor />}
            {active === "Bookings" && <BookingsSection />}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}
