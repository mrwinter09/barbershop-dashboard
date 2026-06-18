/** @format */

import { useState, useReducer } from "react";
import {
  Box, Text, TextInput, Textarea, Select, Button, Badge,
  PasswordInput, SimpleGrid,
} from "@mantine/core";
import {
  loadStories, saveStories,
  loadRecommendations, saveRecommendations,
} from "../features/stories/api/stories.storage";
import { SEED_STORIES, TARGET, NEIGHBORHOODS } from "../features/stories/api/seed";
import StoryStatusTag from "../features/stories/components/StoryStatusTag";
import type { Story, StoryStatus, Recommendation } from "../features/stories/types/Story";

const ROLES = ["Resident", "Entrepreneur", "Volunteer", "Maker", "Organiser", "Other"];
const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")";

function pad(n: number) { return String(n).padStart(2, "0"); }

// ─── Storage helpers ────────────────────────────────────────────────────────

function loadAll(): Story[] {
  return loadStories() ?? SEED_STORIES;
}

// ─── Edit Drawer ─────────────────────────────────────────────────────────────

interface EditDrawerProps {
  story: Story;
  onSave: (s: Story) => void;
  onDelete: (s: Story) => void;
  onClose: () => void;
}

function EditDrawer({ story, onSave, onDelete, onClose }: EditDrawerProps) {
  const [f, setF] = useState<Story>({ ...story });
  const set = (k: keyof Story) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  const onImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setF((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  return (
    <Box
      style={{ position: "fixed", inset: 0, background: "rgba(33,26,18,0.5)", display: "flex", justifyContent: "flex-end", zIndex: 50 }}
      onClick={onClose}
    >
      <Box
        style={{
          width: "min(520px, 94vw)",
          backgroundColor: "#F5EEDF",
          backgroundImage: PAPER_TEXTURE,
          height: "100%",
          overflowY: "auto",
          padding: "26px 28px 60px",
          boxShadow: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C26B4A" }}>
          Story {pad(f.number)} / {TARGET}
        </Text>
        <Text mt={4} mb={20} style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 26, fontWeight: 600, color: "#211A12" }}>
          {f.name || "Untitled story"}
        </Text>

        <Box style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Portrait */}
          <Box style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            {f.image && (
              <img src={f.image} alt="" style={{ width: 84, height: 104, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />
            )}
            {!f.image && (
              <Box style={{ width: 84, height: 104, borderRadius: 5, background: "#CBB994", flexShrink: 0 }} />
            )}
            <Box style={{ flex: 1 }}>
              <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C26B4A", marginBottom: 6 }}>
                Portrait
              </Text>
              <input type="file" accept="image/*" onChange={onImgFile} style={{ fontSize: 13, color: "#9C8466" }} />
              <Text size="xs" c="dimmed" mt={4} mb={8}>Or paste a URL below.</Text>
              <TextInput placeholder="Image URL" value={f.image ?? ""} onChange={set("image")} />
            </Box>
          </Box>

          {/* Video */}
          <Box>
            <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C26B4A", marginBottom: 6 }}>
              Video / portrait clip
            </Text>
            <TextInput placeholder="Link or embed (Instagram, YouTube, Vimeo…)" value={f.video ?? ""} onChange={set("video")} />
            <Text size="xs" c="dimmed" mt={4}>A URL is enough — the brief keeps video as a link/embed.</Text>
          </Box>

          {/* Number + Status */}
          <SimpleGrid cols={2} spacing="md">
            <TextInput
              label="Number"
              type="number"
              value={f.number}
              onChange={(e) => setF((prev) => ({ ...prev, number: parseInt(e.target.value || "0", 10) }))}
            />
            <Select
              label="Status"
              value={f.status}
              onChange={(v) => setF((prev) => ({ ...prev, status: (v ?? "upcoming") as StoryStatus }))}
              data={[
                { value: "upcoming", label: "Upcoming" },
                { value: "published", label: "Published" },
                { value: "withdrawn", label: "Withdrawn" },
              ]}
            />
          </SimpleGrid>

          <TextInput label="Name" value={f.name} onChange={set("name")} />

          <SimpleGrid cols={2} spacing="md">
            <Select
              label="Neighbourhood"
              value={f.neighborhood}
              onChange={(v) => setF((prev) => ({ ...prev, neighborhood: v ?? "" }))}
              data={NEIGHBORHOODS}
              placeholder="Pick one"
            />
            <Select
              label="Role"
              value={f.role}
              onChange={(v) => setF((prev) => ({ ...prev, role: v ?? "" }))}
              data={ROLES}
              placeholder="Pick one"
            />
          </SimpleGrid>

          <TextInput label="Date / caption" value={f.date} onChange={set("date")} />

          <Textarea
            label="The question"
            rows={2}
            value={f.question}
            onChange={set("question")}
          />

          <Textarea
            label="The answer"
            rows={5}
            value={f.answer}
            onChange={set("answer")}
            description="The emotional core of the story page."
          />
        </Box>

        {/* Footer */}
        <Box
          mt={26}
          pt={18}
          style={{ borderTop: "1px solid #E0D3B8", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}
        >
          <button
            onClick={() => onDelete(story)}
            style={{ background: "none", border: 0, color: "#C0392B", fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 14, cursor: "pointer" }}
          >
            {story.id.startsWith("req-") ? "Delete entry" : "Withdraw story"}
          </button>
          <Box style={{ display: "flex", gap: 10 }}>
            <Button variant="subtle" color="petrol" onClick={onClose}>Cancel</Button>
            <Button color="petrol" onClick={() => onSave(f)}>Save changes</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Stat card ───────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <Box
      style={{
        backgroundColor: "#FCF8F0",
        backgroundImage: PAPER_TEXTURE,
        border: "1px solid #E0D3B8",
        borderRadius: 12,
        padding: "18px 20px",
      }}
    >
      <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 38, fontWeight: 600, color: "#211A12", lineHeight: 1 }}>
        {value}
      </Text>
      <Text mt={8} style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C8466" }}>
        {label}
      </Text>
    </Box>
  );
}

// ─── Main admin app ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<"overview" | "stories" | "recommend" | "requests">("overview");
  const [editing, setEditing] = useState<Story | null>(null);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const stories: Story[] = loadAll();
  const recommendations: Recommendation[] = loadRecommendations();
  const requests: Story[] = stories.filter((s) => s.id.startsWith("req-"));

  const published = stories.filter((s) => s.status === "published").length;
  const upcoming = stories.filter((s) => s.status === "upcoming").length;
  const newRecs = recommendations.filter((r) => r.status === "new").length;

  const saveStory = (f: Story) => {
    const all = loadAll();
    const idx = all.findIndex((s) => s.id === f.id);
    if (idx >= 0) { all[idx] = f; } else { all.push(f); }
    saveStories(all);
    setEditing(null);
    forceUpdate();
  };

  const deleteStory = (s: Story) => {
    const all = loadAll();
    if (s.id.startsWith("req-")) {
      saveStories(all.filter((x) => x.id !== s.id));
    } else {
      saveStories(all.map((x) => x.id === s.id ? { ...x, status: "withdrawn" as StoryStatus } : x));
    }
    setEditing(null);
    forceUpdate();
  };

  const recAction = (rec: Recommendation, action: "chair" | "reviewed" | "dismiss") => {
    const recs = loadRecommendations();
    if (action === "dismiss") {
      saveRecommendations(recs.filter((r) => r.id !== rec.id));
    } else if (action === "reviewed") {
      saveRecommendations(recs.map((r) => r.id === rec.id ? { ...r, status: "reviewed" as const } : r));
    } else if (action === "chair") {
      const all = loadAll();
      const nextNum = Math.max(...all.map((s) => s.number), 0) + 1;
      const entry: Story = {
        id: "req-" + crypto.randomUUID(),
        number: nextNum,
        status: "upcoming",
        name: rec.who,
        role: "Resident",
        neighborhood: "Rotterdam",
        date: "Recommended " + rec.date,
        question: "What did this city teach you that nobody sat you down to explain?",
        answer: "",
        fromRecommendation: rec.from || "a neighbour",
      };
      saveStories([...all, entry]);
      saveRecommendations(recs.map((r) => r.id === rec.id ? { ...r, status: "reviewed" as const } : r));
      forceUpdate();
    }
    forceUpdate();
  };

  // ── Login gate ──
  if (!authed) {
    return (
      <Box style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Box
          component="form"
          onSubmit={(e: React.FormEvent) => { e.preventDefault(); setAuthed(true); }}
          style={{
            backgroundColor: "#FCF8F0",
            backgroundImage: PAPER_TEXTURE,
            border: "1px solid #E0D3B8",
            borderRadius: 12,
            boxShadow: "0 2px 4px rgba(38,26,18,.05), 0 8px 20px rgba(38,26,18,.10)",
            padding: 36,
            width: "min(400px, 100%)",
          }}
        >
          <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 26, color: "#211A12", letterSpacing: "-0.02em" }}>
            Clipper<em style={{ fontStyle: "italic", color: "#C26B4A" }}>Takes</em>
          </Text>
          <Text mt={4} mb={22} style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C8466" }}>
            Studio admin · private
          </Text>
          <PasswordInput
            label="Passphrase"
            placeholder="••••••••"
            value={pw}
            onChange={(e) => setPw(e.currentTarget.value)}
            description="Demo: any value gets you in."
          />
          <Button type="submit" color="petrol" fullWidth mt="md">
            Enter the studio
          </Button>
        </Box>
      </Box>
    );
  }

  const NAV = [
    { key: "overview" as const, label: "Overview" },
    { key: "stories" as const, label: "Stories", count: stories.length },
    { key: "recommend" as const, label: "Recommendations", count: newRecs || undefined },
    { key: "requests" as const, label: "Story requests", count: requests.length || undefined },
  ];

  // ── Tab bodies ──

  let body: React.ReactNode;

  if (tab === "overview") {
    body = (
      <div>
        <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>
          Overview
        </Text>
        <Text c="dimmed" mt={6} mb={26}>Where the archive stands today.</Text>
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={14} mb={30}>
          <StatCard value={published} label={`Published of ${TARGET}`} />
          <StatCard value={upcoming} label="In the chair soon" />
          <StatCard value={newRecs} label="New recommendations" />
          <StatCard value={requests.length} label="Story requests" />
        </SimpleGrid>
        <Box
          style={{
            backgroundColor: "#FCF8F0",
            backgroundImage: PAPER_TEXTURE,
            border: "1px solid #E0D3B8",
            borderRadius: 12,
            padding: "20px 22px",
          }}
        >
          <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 20, fontWeight: 600, color: "#211A12", marginBottom: 6 }}>
            Next up
          </Text>
          <Text style={{ color: "#9C8466", lineHeight: 1.6 }}>
            {newRecs > 0
              ? `You have ${newRecs} new recommendation${newRecs > 1 ? "s" : ""} to review.`
              : "No new recommendations right now."}
            {" "}Open <strong>Stories</strong> to edit a portrait, change its picture, add a video link, or move it from upcoming to published.
          </Text>
        </Box>
      </div>
    );

  } else if (tab === "stories") {
    const rows = stories
      .filter((s) => statusFilter === "all" || s.status === statusFilter)
      .filter((s) => !q || s.name.toLowerCase().includes(q.toLowerCase()) || s.neighborhood.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => a.number - b.number);

    body = (
      <div>
        <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>
          Stories
        </Text>
        <Text c="dimmed" mt={6} mb={18}>Every portrait in the archive. Click Edit to change copy, picture, video or status.</Text>

        <Box style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 18 }}>
          <input
            placeholder="Search name or neighbourhood…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{
              height: 40, padding: "0 13px",
              border: "1.5px solid #E0D3B8", borderRadius: 5,
              background: "#FCF8F0", fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: 15, color: "#211A12", minWidth: 220,
              outline: "none",
            }}
          />
          <Select
            size="sm"
            value={statusFilter}
            onChange={(v) => setStatusFilter(v ?? "all")}
            data={[
              { value: "all", label: "All statuses" },
              { value: "published", label: "Published" },
              { value: "upcoming", label: "Upcoming" },
              { value: "withdrawn", label: "Withdrawn" },
            ]}
            style={{ width: 180 }}
          />
        </Box>

        <Box
          style={{
            width: "100%",
            backgroundColor: "#FCF8F0",
            backgroundImage: PAPER_TEXTURE,
            border: "1px solid #E0D3B8",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <Box
            style={{
              display: "grid",
              gridTemplateColumns: "54px 1.6fr 1.1fr 0.9fr 130px 92px",
              gap: 14,
              alignItems: "center",
              padding: "11px 16px",
              background: "#F5EEDF",
            }}
          >
            {["", "Name", "Neighbourhood", "Role", "Status", ""].map((h, i) => (
              <Text key={i} style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C8466" }}>
                {h}
              </Text>
            ))}
          </Box>

          {rows.length === 0 ? (
            <Text style={{ padding: 24, fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#B7A079", fontSize: 18 }}>
              No stories match.
            </Text>
          ) : rows.map((s) => (
            <Box
              key={s.id}
              style={{
                display: "grid",
                gridTemplateColumns: "54px 1.6fr 1.1fr 0.9fr 130px 92px",
                gap: 14,
                alignItems: "center",
                padding: "11px 16px",
                borderTop: "1px solid #E0D3B8",
              }}
            >
              {s.image
                ? <img src={s.image} alt="" style={{ width: 42, height: 52, borderRadius: 5, objectFit: "cover" }} />
                : <Box style={{ width: 42, height: 52, borderRadius: 5, background: "#CBB994" }} />
              }
              <div>
                <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, color: "#C26B4A", fontWeight: 700 }}>
                  STORY {pad(s.number)} / {TARGET}
                </Text>
                <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 18, fontWeight: 600, color: "#211A12", lineHeight: 1.2 }}>
                  {s.name}
                </Text>
                <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.08em", color: "#9C8466" }}>
                  {s.video ? "● video attached" : "○ no video yet"}
                </Text>
              </div>
              <Text style={{ fontSize: 13, color: "#9C8466" }}>{s.neighborhood}</Text>
              <Text style={{ fontSize: 13, color: "#9C8466" }}>{s.role}</Text>
              <StoryStatusTag status={s.status} />
              <Button size="xs" variant="outline" color="petrol" onClick={() => setEditing(s)}>Edit</Button>
            </Box>
          ))}
        </Box>
      </div>
    );

  } else if (tab === "recommend") {
    const recs = loadRecommendations();
    body = (
      <div>
        <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>
          Recommendations
        </Text>
        <Text c="dimmed" mt={6} mb={26}>Rotterdam pointing you toward who should sit in the chair next.</Text>

        {recs.length === 0 ? (
          <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#B7A079", fontSize: 18, padding: "30px 0" }}>
            No recommendations yet. They'll arrive here from the public site.
          </Text>
        ) : recs.map((r) => (
          <Box
            key={r.id}
            mb={14}
            style={{
              backgroundColor: "#FCF8F0",
              backgroundImage: PAPER_TEXTURE,
              border: r.status === "new" ? "1px solid #E0D3B8" : "1px solid #E0D3B8",
              borderLeft: r.status === "new" ? "3px solid #F2C200" : "1px solid #E0D3B8",
              borderRadius: 12,
              padding: "20px 22px",
            }}
          >
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 22, fontWeight: 600, color: "#211A12" }}>
                {r.who}
              </Text>
              <Badge color={r.status === "new" ? "yellow" : "moss"} variant="light">
                {r.status === "new" ? "New" : "Reviewed"}
              </Badge>
            </Box>
            <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 18, lineHeight: 1.5, color: "#6A5440", fontStyle: "italic", margin: "10px 0" }}>
              "{r.why}"
            </Text>
            <Box style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", fontSize: 13, color: "#9C8466", marginBottom: 12 }}>
              {r.how && <span><strong style={{ color: "#211A12" }}>How they know them:</strong> {r.how}</span>}
              <span><strong style={{ color: "#211A12" }}>Suggested by:</strong> {r.from || "anonymous"}</span>
              <span><strong style={{ color: "#211A12" }}>Received:</strong> {r.date}</span>
            </Box>
            <Box style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Button size="xs" color="petrol" onClick={() => recAction(r, "chair")}>Add to the chair</Button>
              {r.status === "new" && (
                <Button size="xs" color="petrol" variant="outline" onClick={() => recAction(r, "reviewed")}>Mark reviewed</Button>
              )}
              <Button size="xs" color="petrol" variant="subtle" onClick={() => recAction(r, "dismiss")}>Dismiss</Button>
            </Box>
          </Box>
        ))}
      </div>
    );

  } else {
    body = (
      <div>
        <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>
          Story requests
        </Text>
        <Text c="dimmed" mt={6} mb={26}>People who put themselves forward for the chair. Edit to confirm details, then publish when the portrait is ready.</Text>

        {requests.length === 0 ? (
          <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#B7A079", fontSize: 18, padding: "30px 0" }}>
            No requests yet. They'll arrive here from "Tell your story".
          </Text>
        ) : requests.map((s) => (
          <Box
            key={s.id}
            mb={14}
            style={{
              backgroundColor: "#FCF8F0",
              backgroundImage: PAPER_TEXTURE,
              border: "1px solid #E0D3B8",
              borderRadius: 12,
              padding: "20px 22px",
            }}
          >
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 22, fontWeight: 600, color: "#211A12" }}>
                {s.name}
              </Text>
              <StoryStatusTag status={s.status} />
            </Box>
            {s.about && (
              <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 18, lineHeight: 1.5, color: "#6A5440", fontStyle: "italic", margin: "10px 0" }}>
                "{s.about}"
              </Text>
            )}
            <Box style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", fontSize: 13, color: "#9C8466", marginBottom: 12 }}>
              <span><strong style={{ color: "#211A12" }}>Neighbourhood:</strong> {s.neighborhood}</span>
              <span><strong style={{ color: "#211A12" }}>Role:</strong> {s.role}</span>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11 }}>{s.date}</span>
              {s.link && <span><strong style={{ color: "#211A12" }}>Clip:</strong> {s.link}</span>}
              {s.fromRecommendation && <span><strong style={{ color: "#211A12" }}>Via recommendation</strong></span>}
            </Box>
            <Box style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Button size="xs" color="petrol" onClick={() => setEditing(s)}>Open &amp; edit</Button>
              {s.status !== "published" && (
                <Button size="xs" color="petrol" variant="outline" onClick={() => saveStory({ ...s, status: "published" })}>
                  Publish
                </Button>
              )}
              <Button size="xs" color="petrol" variant="subtle" onClick={() => deleteStory(s)}>Delete</Button>
            </Box>
          </Box>
        ))}
      </div>
    );
  }

  // ── Shell ──
  return (
    <Box style={{ display: "grid", gridTemplateColumns: "248px 1fr", minHeight: "calc(100vh - 60px)" }}>
      {/* Sidebar */}
      <Box
        component="aside"
        style={{
          backgroundColor: "#0C2A30",
          backgroundImage: PAPER_TEXTURE,
          color: "#A9CACE",
          padding: "26px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          position: "sticky",
          top: 60,
          height: "calc(100vh - 60px)",
          boxSizing: "border-box",
          overflowY: "auto",
        }}
      >
        <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 22, color: "#FCF8F0", letterSpacing: "-0.02em" }}>
          Clipper<em style={{ fontStyle: "italic", color: "#F2C200" }}>Takes</em>
        </Text>
        <Text mb={22} style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5E9099" }}>
          Studio admin
        </Text>

        {NAV.map((n) => (
          <button
            key={n.key}
            onClick={() => setTab(n.key)}
            style={{
              background: tab === n.key ? "#1C5862" : "none",
              border: 0,
              textAlign: "left",
              color: tab === n.key ? "#FCF8F0" : "#A9CACE",
              fontFamily: '"Hanken Grotesk", sans-serif',
              fontSize: 15,
              fontWeight: 500,
              padding: "10px 12px",
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              transition: "background .18s, color .18s",
            }}
          >
            <span>{n.label}</span>
            {n.count != null && (
              <Text
                span
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 11,
                  background: tab === n.key ? "#FCF8F0" : "#F2C200",
                  color: "#211A12",
                  borderRadius: 99,
                  padding: "1px 7px",
                  fontWeight: 700,
                }}
              >
                {n.count}
              </Text>
            )}
          </button>
        ))}

        <Box style={{ flex: 1 }} />

        <button
          onClick={() => setAuthed(false)}
          style={{
            background: "none", border: 0, textAlign: "left",
            color: "#5E9099", fontSize: 13, cursor: "pointer",
            fontFamily: '"Hanken Grotesk", sans-serif', padding: "6px 0",
          }}
        >
          Sign out
        </button>
      </Box>

      {/* Main */}
      <Box style={{ padding: "32px clamp(20px, 4vw, 48px) 80px", maxWidth: 1100 }}>
        {body}
      </Box>

      {editing && (
        <EditDrawer
          story={editing}
          onSave={saveStory}
          onClose={() => setEditing(null)}
          onDelete={deleteStory}
        />
      )}
    </Box>
  );
}
