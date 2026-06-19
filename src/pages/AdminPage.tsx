/** @format */

import { useState, useReducer, useRef, useEffect } from "react";
import {
  Box, Text, TextInput, Textarea, Select, Button, Badge, PasswordInput, SimpleGrid,
} from "@mantine/core";
import { loadStories, saveStories } from "../features/stories/api/stories.storage";
import { SEED_STORIES, TARGET, NEIGHBORHOODS } from "../features/stories/api/seed";
import StoryStatusTag from "../features/stories/components/StoryStatusTag";
import type { Story, StoryStage, StoryStatus, Recommendation } from "../features/stories/types/Story";

const ROLES = ["Resident", "Entrepreneur", "Volunteer", "Maker", "Organizer", "Other"];

const PAPER = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")";

function pad(n: number) { return String(n).padStart(2, "0"); }
function today() { return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(); }

// ─── Pipeline definition ─────────────────────────────────────────────────────

const STAGES: { key: StoryStage; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "confirmed", label: "Confirmed" },
  { key: "shooting", label: "Filming" },
  { key: "producing", label: "Producing" },
  { key: "published", label: "Published" },
];

const STAGE_LABEL: Record<string, string> = Object.fromEntries(STAGES.map((s) => [s.key, s.label]));

const STAGE_DOT: Record<string, string> = {
  draft: "#C26B4A",
  confirmed: "#2A6E79",
  shooting: "#C26B4A",
  producing: "#5E6E44",
  published: "#15454F",
};

type CheckDef = { key: string; label: string; field?: { key: string; placeholder: string; hard?: boolean } };
type FieldDef = { key: string; label: string; placeholder?: string; type?: string; required?: boolean };
type StageSpec = {
  next: StoryStage | null;
  intro: string;
  fields?: FieldDef[];
  gcal?: boolean;
  checks: CheckDef[];
};

const STAGE_SPEC: Record<string, StageSpec> = {
  draft: {
    next: "confirmed",
    intro: "Decide if this voice belongs in the archive. If it came from a recommendation, resolve that recommendation.",
    checks: [
      { key: "worthPursuing", label: "Confirmed this story is worth pursuing" },
    ],
  },
  confirmed: {
    next: "shooting",
    intro: "Lock the logistics before the chair travels.",
    fields: [
      { key: "email", label: "Participant email", placeholder: "name@email.com", required: true },
      { key: "phone", label: "Phone", placeholder: "+31 6 …" },
      { key: "appointment", label: "Appointment", type: "datetime-local" },
    ],
    gcal: true,
    checks: [
      { key: "contactComplete", label: "Contact details complete" },
      { key: "inviteSent", label: "Calendar invite sent to participant" },
      { key: "camera", label: "Camera operator assigned", field: { key: "cameraOperator", placeholder: "Who is filming?" } },
      { key: "location", label: "Location set", field: { key: "locationName", placeholder: "Where in Rotterdam?" } },
      { key: "script", label: "Question / script ready" },
    ],
  },
  shooting: {
    next: "producing",
    intro: "Filming done — hand off to the edit. The participant now shows publicly as 'in the chair soon'.",
    checks: [
      { key: "editor", label: "Editor assigned", field: { key: "editorName", placeholder: "Who edits?" } },
      { key: "editEta", label: "Edit time estimated", field: { key: "editDuration", placeholder: "e.g. 2 weeks" } },
      { key: "drive", label: "Upload drive set", field: { key: "driveName", placeholder: "Which drive / folder?" } },
    ],
  },
  producing: {
    next: "published",
    intro: "Final cut only. A story cannot go live until its video is uploaded.",
    checks: [
      { key: "videoUploaded", label: "Final video uploaded", field: { key: "video", placeholder: "Video link / embed URL", hard: true } },
    ],
  },
  published: { next: null, intro: "Live on the public archive.", checks: [] },
};

function stageComplete(story: Story, stageKey: string): boolean {
  const spec = STAGE_SPEC[stageKey];
  if (!spec) return true;
  const checks = story.checklist ?? {};
  for (const c of spec.checks) {
    if (!checks[c.key]) return false;
    if (c.field && !(story as unknown as Record<string, unknown>)[c.field.key]?.toString().trim()) return false;
  }
  for (const f of (spec.fields ?? [])) {
    if (f.required && !(story as unknown as Record<string, unknown>)[f.key]?.toString().trim()) return false;
  }
  return true;
}

function missingCount(story: Story, stageKey: string): number {
  const spec = STAGE_SPEC[stageKey];
  if (!spec) return 0;
  let n = 0;
  spec.checks.forEach((c) => {
    const ok = (story.checklist ?? {})[c.key] && (!c.field || !!(story as unknown as Record<string, unknown>)[c.field.key]?.toString().trim());
    if (!ok) n++;
  });
  (spec.fields ?? []).forEach((f) => { if (f.required && !(story as unknown as Record<string, unknown>)[f.key]?.toString().trim()) n++; });
  return n;
}

function totalChecks(stageKey: string): number {
  const spec = STAGE_SPEC[stageKey];
  if (!spec) return 0;
  return spec.checks.length + (spec.fields ?? []).filter((f) => f.required).length;
}

function statusForStage(stage: StoryStage): StoryStatus {
  if (stage === "published") return "published";
  return "upcoming";
}

function gcalLink(story: Story & Record<string, unknown>): string {
  const pad2 = (n: number) => String(n).padStart(2, "0");
  const fmtDate = (d: Date) => `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}T${pad2(d.getHours())}${pad2(d.getMinutes())}00`;
  let dates = "";
  const appt = (story["appointment"] as string) ?? "";
  if (appt) {
    const d = new Date(appt);
    if (!isNaN(d.getTime())) {
      const e = new Date(d.getTime() + 90 * 60000);
      dates = `&dates=${fmtDate(d)}/${fmtDate(e)}`;
    }
  }
  const text = encodeURIComponent(`ClipperTakes — filming with ${story.name || "participant"}`);
  const locName = (story["locationName"] as string) ?? "";
  const details = encodeURIComponent(`ClipperTakes session. One question while the clippers run.${locName ? `\nLocation: ${locName}` : ""}`);
  const loc = locName ? `&location=${encodeURIComponent(locName)}` : "";
  const email = (story["email"] as string) ? `&add=${encodeURIComponent(story["email"] as string)}` : "";
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}${dates}${loc}${email}`;
}

// ─── Social media video player (TikTok / Instagram style) ─────────────────────

function NativeVideoPlayer({ url }: { url: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => { ref.current?.play().catch(() => {}); }, [url]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (muted) { v.muted = false; setMuted(false); if (!playing) v.play().catch(() => {}); }
    else { v.muted ? (v.muted = false, setMuted(false)) : (v.paused ? v.play().catch(() => {}) : v.pause()); }
  };

  return (
    <Box
      onClick={toggle}
      style={{
        position: "relative", aspectRatio: "9/16", background: "#000",
        borderRadius: 12, overflow: "hidden", cursor: "pointer", userSelect: "none",
      }}
    >
      <video
        ref={ref}
        src={url}
        muted
        loop
        playsInline
        autoPlay
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => {
          const v = ref.current;
          if (v && v.duration) setProgress((v.currentTime / v.duration) * 100);
        }}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* pause overlay */}
      {!playing && (
        <Box style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <Box style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(0,0,0,.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 22, marginLeft: 3 }}>▶</span>
          </Box>
        </Box>
      )}
      {/* sound badge */}
      <Box
        style={{
          position: "absolute", bottom: 10, right: 10,
          background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)",
          borderRadius: 6, padding: "3px 8px",
          fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#fff",
          pointerEvents: "none",
        }}
      >
        {muted ? "🔇 tap to unmute" : "🔊"}
      </Box>
      {/* progress bar */}
      <Box style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,.15)" }}>
        <Box style={{ height: "100%", width: `${progress}%`, background: "#F2C200", transition: "width .1s linear" }} />
      </Box>
    </Box>
  );
}

function VideoPlayer({ url }: { url?: string }) {
  if (!url) return null;

  const isYT = /youtube\.com|youtu\.be/.test(url);
  const isVimeo = /vimeo\.com/.test(url);
  const containerStyle: React.CSSProperties = {
    position: "relative", aspectRatio: "9/16",
    background: "#000", borderRadius: 12, overflow: "hidden",
  };

  if (isYT) {
    const id = url.match(/(?:v=|youtu\.be\/)([^&\s?]+)/)?.[1];
    if (id) return (
      <Box style={containerStyle}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&controls=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          style={{ width: "100%", height: "100%", border: 0 }}
          title="Video"
        />
      </Box>
    );
  }

  if (isVimeo) {
    const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
    if (id) return (
      <Box style={containerStyle}>
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0`}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ width: "100%", height: "100%", border: 0 }}
          title="Video"
        />
      </Box>
    );
  }

  return <NativeVideoPlayer url={url} />;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Ck({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: 15, color: "#3F2D20", userSelect: "none" }}>
      <Box
        onClick={() => onChange(!checked)}
        style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0,
          border: checked ? "none" : "1.5px solid #CBB994",
          background: checked ? "#5E6E44" : "#FCF8F0",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background .15s, border-color .15s",
        }}
      >
        {checked && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
      </Box>
      <span>{label}</span>
    </label>
  );
}

// ─── Edit Drawer ──────────────────────────────────────────────────────────────

type EditableStory = Story & Record<string, unknown>;

function EditDrawer({
  story,
  onSave,
  onClose,
  onDelete,
  onAdvance,
}: {
  story: EditableStory;
  onSave: (s: EditableStory) => void;
  onClose: () => void;
  onDelete: (s: EditableStory) => void;
  onAdvance: (s: EditableStory) => void;
}) {
  const [f, setF] = useState<EditableStory>({ ...story, checklist: { ...(story.checklist ?? {}) } });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));
  const setCheck = (k: string) => (v: boolean) =>
    setF((prev) => ({ ...prev, checklist: { ...(prev.checklist ?? {}), [k]: v } }));

  const stage = (f.stage ?? "draft") as string;
  const spec = STAGE_SPEC[stage] ?? STAGE_SPEC["draft"];
  const curIdx = STAGES.findIndex((s) => s.key === stage);
  const done = stageComplete(f as Story, stage);
  const missing = missingCount(f as Story, stage);
  const total = totalChecks(stage);
  const isNew = !!(story as unknown as Record<string, unknown>)["_isNew"];
  const isRequest = stage === "request";

  const onImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setF((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  return (
    <Box
      style={{ position: "fixed", inset: 0, background: "rgba(33,26,18,.5)", display: "flex", justifyContent: "flex-end", zIndex: 50 }}
      onClick={onClose}
    >
      <Box
        style={{
          width: "min(560px, 96vw)",
          backgroundColor: "#F5EEDF",
          backgroundImage: PAPER,
          height: "100%",
          overflowY: "auto",
          padding: "24px 28px 60px",
          boxShadow: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C26B4A" }}>
          {isNew ? "New entry" : isRequest ? "Story request" : `Story ${pad(f.number)} / ${TARGET}`}
        </Text>
        <Text mt={4} mb={4} style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 26, fontWeight: 600, color: "#211A12" }}>
          {f.name || (isNew ? "New story" : "Untitled")}
        </Text>

        {/* Stage stepper */}
        {!isRequest && (
          <Box style={{ display: "flex", gap: 4, margin: "16px 0 8px" }}>
            {STAGES.map((s, i) => (
              <Box key={s.key} style={{
                flex: 1, textAlign: "center",
                fontFamily: '"Space Mono", monospace', fontSize: 9.5, letterSpacing: "0.06em", textTransform: "uppercase",
                padding: "7px 2px", borderRadius: 4,
                background: i < curIdx ? "#DEE3CC" : i === curIdx ? "#15454F" : "#F5EEDF",
                border: i < curIdx ? "1px solid transparent" : i === curIdx ? "1px solid transparent" : "1px solid #E0D3B8",
                color: i < curIdx ? "#5E6E44" : i === curIdx ? "#FCF8F0" : "#B7A079",
              }}>
                {s.label}
              </Box>
            ))}
          </Box>
        )}

        {/* Checklist gate */}
        {!isRequest && spec && (
          <Box style={{ background: "#FCF8F0", backgroundImage: PAPER, border: "1px solid #E0D3B8", borderRadius: 12, padding: "18px 20px", margin: "14px 0 8px" }}>
            <Text style={{ fontSize: 14, color: "#9C8466", lineHeight: 1.55, marginBottom: 14 }}>{spec.intro}</Text>

            {/* Required fields */}
            {(spec.fields ?? []).map((fl) => (
              <Box key={fl.key} mb={12}>
                <TextInput
                  label={fl.label + (fl.required ? " *" : "")}
                  type={fl.type ?? "text"}
                  placeholder={fl.placeholder}
                  value={(f[fl.key] as string) ?? ""}
                  onChange={set(fl.key)}
                />
              </Box>
            ))}

            {/* GCal link */}
            {spec.gcal && (
              <a
                href={gcalLink(f)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "#1C5862", fontWeight: 600, textDecoration: "none", marginBottom: 12, marginLeft: 2 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Add to Google Calendar &amp; send invite
              </a>
            )}

            {/* Checklist items */}
            {spec.checks.map((c) => (
              <Box key={c.key} style={{ paddingTop: 11, borderTop: "1px solid #E0D3B8", display: "flex", flexDirection: "column", gap: 8 }}>
                <Ck
                  checked={!!(f.checklist ?? {})[c.key]}
                  onChange={setCheck(c.key)}
                  label={c.label}
                />
                {c.field && (
                  <Box ml={30}>
                    <TextInput
                      placeholder={c.field.placeholder}
                      value={(f[c.field.key] as string) ?? ""}
                      onChange={set(c.field.key)}
                      styles={c.field.hard ? { label: { color: "#C26B4A" } } : {}}
                    />
                    {c.field.hard && (
                      <Text size="xs" c="dimmed" mt={4}>Required before this story can be published.</Text>
                    )}
                  </Box>
                )}
              </Box>
            ))}

            {/* Advance bar */}
            <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 16, paddingTop: 14, borderTop: "1.5px solid #E0D3B8" }}>
              <Text style={{ fontSize: 13, color: "#9C8466" }}>
                {spec.next
                  ? (done
                    ? <span>All done — ready for <strong style={{ color: "#211A12" }}>{STAGE_LABEL[spec.next]}</strong>.</span>
                    : <span><strong style={{ color: "#211A12" }}>{missing}</strong> of {total} left before <strong style={{ color: "#211A12" }}>{STAGE_LABEL[spec.next]}</strong>.</span>)
                  : <span>This story is <strong style={{ color: "#211A12" }}>live</strong> on the public archive.</span>
                }
              </Text>
              {spec.next && (
                <Button
                  size="xs"
                  color="petrol"
                  variant={done ? "filled" : "outline"}
                  disabled={!done}
                  onClick={() => onAdvance(f)}
                >
                  Advance to {STAGE_LABEL[spec.next]} →
                </Button>
              )}
            </Box>
          </Box>
        )}

        {/* Portrait & video */}
        <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C8466", marginTop: 22, paddingTop: 16, borderTop: "1px solid #E0D3B8" }}>
          Portrait &amp; video
        </Text>

        <Box style={{ display: "flex", gap: 14, alignItems: "flex-start", marginTop: 12 }}>
          {f.image
            ? <img src={f.image} alt="" style={{ width: 84, height: 104, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />
            : <Box style={{ width: 84, height: 104, borderRadius: 5, background: "#CBB994", flexShrink: 0 }} />
          }
          <Box style={{ flex: 1 }}>
            <input type="file" accept="image/*" onChange={onImgFile} style={{ fontSize: 13, color: "#9C8466" }} />
            <Text size="xs" c="dimmed" mt={4} mb={8}>Or paste a URL below.</Text>
            <TextInput placeholder="Image URL" value={f.image ?? ""} onChange={set("image")} />
          </Box>
        </Box>

        <Box mt={14}>
          <TextInput
            label="Video / portrait clip"
            placeholder="YouTube, Vimeo, or direct mp4 link…"
            value={(f.video as string) ?? ""}
            onChange={set("video")}
          />
        </Box>

        {/* Social media video preview */}
        {f.video && (
          <Box mt={14} style={{ maxWidth: 220, margin: "14px auto 0" }}>
            <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C8466", marginBottom: 8 }}>
              Video preview
            </Text>
            <VideoPlayer url={f.video as string} />
          </Box>
        )}

        {/* Story details */}
        <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C8466", marginTop: 22, paddingTop: 16, borderTop: "1px solid #E0D3B8" }}>
          Story details
        </Text>

        <Box style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12 }}>
          <SimpleGrid cols={2} spacing="md">
            <TextInput
              label="Number"
              type="number"
              value={f.number}
              onChange={(e) => setF((prev) => ({ ...prev, number: parseInt(e.target.value || "0", 10) }))}
            />
            <Select
              label="Neighbourhood"
              value={f.neighborhood}
              onChange={(v) => setF((prev) => ({ ...prev, neighborhood: v ?? "" }))}
              data={NEIGHBORHOODS}
              placeholder="Pick one"
            />
          </SimpleGrid>
          <TextInput label="Name" value={f.name} onChange={set("name")} />
          <Select
            label="Role"
            value={f.role}
            onChange={(v) => setF((prev) => ({ ...prev, role: v ?? "" }))}
            data={ROLES}
            placeholder="Pick one"
          />
          <TextInput label="Date / caption" value={f.date} onChange={set("date")} />
          <Textarea label="The question" rows={2} value={f.question} onChange={set("question")} />
          <Textarea label="The answer" rows={5} value={f.answer} onChange={set("answer")} description="The emotional core of the published story page." />
        </Box>

        {/* Footer */}
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginTop: 22, paddingTop: 18, borderTop: "1px solid #E0D3B8" }}>
          <button
            onClick={() => onDelete(f)}
            style={{ background: "none", border: 0, color: "#C0392B", fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 14, cursor: "pointer" }}
          >
            {isNew ? "Discard" : isRequest ? "Decline request" : "Withdraw story"}
          </button>
          <Box style={{ display: "flex", gap: 10 }}>
            <Button variant="subtle" color="petrol" onClick={onClose}>Cancel</Button>
            <Button color="petrol" onClick={() => onSave(f)}>{isNew ? "Create story" : "Save changes"}</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Pipeline card ────────────────────────────────────────────────────────────

function PipelineCard({ story, onClick }: { story: EditableStory; onClick: () => void }) {
  const stage = (story.stage ?? "draft") as string;
  const tc = totalChecks(stage);
  const mc = missingCount(story as Story, stage);
  const complete = mc === 0 && tc > 0;

  return (
    <button
      onClick={onClick}
      style={{
        display: "block", width: "100%", textAlign: "left",
        background: "#FCF8F0", backgroundImage: PAPER,
        border: "1px solid #E0D3B8", borderRadius: 8,
        padding: 10, marginBottom: 10, cursor: "pointer",
        fontFamily: '"Hanken Grotesk", sans-serif',
        transition: "box-shadow .18s, transform .18s, border-color .18s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(33,26,18,.12)"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
    >
      <Box style={{ display: "flex", gap: 9 }}>
        {story.image
          ? <img src={story.image} alt="" style={{ width: 40, height: 50, borderRadius: 4, objectFit: "cover", flexShrink: 0 }} />
          : <Box style={{ width: 40, height: 50, borderRadius: 4, background: "#CBB994", flexShrink: 0 }} />
        }
        <div>
          <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#C26B4A", fontWeight: 700, letterSpacing: "0.04em" }}>
            STORY {pad(story.number)}
          </Text>
          <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 16, fontWeight: 600, color: "#211A12", lineHeight: 1.15, marginTop: 2 }}>
            {story.name || "Untitled"}
          </Text>
          <Text style={{ fontSize: 12, color: "#9C8466", marginTop: 2 }}>{story.neighborhood}</Text>
        </div>
      </Box>
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 9 }}>
        {stage === "published"
          ? <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#5E6E44" }}>● live</Text>
          : <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: complete ? "#5E6E44" : "#9C8466" }}>
              {tc === 0 ? "" : complete ? "✓ ready to advance" : `${tc - mc}/${tc} done`}
            </Text>
        }
        {story.video && stage !== "published" && (
          <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, color: "#5E6E44" }} title="video attached">●</Text>
        )}
      </Box>
    </button>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <Box style={{ backgroundColor: "#FCF8F0", backgroundImage: PAPER, border: "1px solid #E0D3B8", borderRadius: 12, padding: "16px 18px" }}>
      <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 34, fontWeight: 600, color: "#211A12", lineHeight: 1 }}>
        {value}
      </Text>
      <Text mt={8} style={{ fontFamily: '"Space Mono", monospace', fontSize: 10, letterSpacing: "0.10em", textTransform: "uppercase", color: "#9C8466" }}>
        {label}
      </Text>
    </Box>
  );
}

// ─── Seeded pipeline stories ──────────────────────────────────────────────────

const PIPELINE_SEEDS: EditableStory[] = [
  {
    id: "pipe-draft-1", number: 11, status: "upcoming", stage: "draft",
    name: "Aïsha Diallo", role: "Volunteer", neighborhood: "Delfshaven",
    date: "TBC", question: "What did this city teach you that nobody sat you down to explain?",
    answer: "", checklist: {}, fromRecommendation: "Greet Vermeer",
  },
  {
    id: "pipe-draft-2", number: 12, status: "upcoming", stage: "draft",
    name: "Pieter van Loon", role: "Entrepreneur", neighborhood: "Noord",
    date: "TBC", question: "What did this city teach you that nobody sat you down to explain?",
    answer: "", checklist: { worthPursuing: true },
  },
  {
    id: "pipe-conf-1", number: 13, status: "upcoming", stage: "confirmed",
    name: "Dilan Şahin", role: "Organizer", neighborhood: "Nieuwe Binnenweg",
    date: "TBC", question: "What did this city teach you that nobody sat you down to explain?",
    answer: "", email: "dilan@email.com", phone: "+31 6 1234 5678",
    checklist: { contactComplete: true }, cameraOperator: "", locationName: "",
  },
  {
    id: "pipe-conf-2", number: 14, status: "upcoming", stage: "confirmed",
    name: "Bram Kuipers", role: "Maker", neighborhood: "Afrikaanderwijk",
    date: "TBC", question: "What did this city teach you that nobody sat you down to explain?",
    answer: "", email: "bram@email.com", phone: "+31 6 8765 4321",
    appointment: "2026-07-10T14:00",
    checklist: { contactComplete: true, inviteSent: true, camera: true, location: true, script: true },
    cameraOperator: "Jan de Vries", locationName: "Afrikaanderwijk park",
  },
  {
    id: "pipe-shoot-1", number: 15, status: "upcoming", stage: "shooting",
    name: "Mehmet Yılmaz", role: "Resident", neighborhood: "Rotterdam West",
    date: "7 Jul 2026", question: "What did this city teach you that nobody sat you down to explain?",
    answer: "", checklist: { editor: true }, editorName: "Sofia Meijer", editDuration: "", driveName: "",
  },
  {
    id: "pipe-prod-1", number: 16, status: "upcoming", stage: "producing",
    name: "Lieke de Wit", role: "Volunteer", neighborhood: "Blijdorp",
    date: "20 Jun 2026", question: "What did this city teach you that nobody sat you down to explain?",
    answer: "", checklist: { editor: true, editEta: true, drive: true }, editorName: "Tom Bakker",
    video: "",
  },
];

const SEED_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "seed-rec-1", who: "Greet Vermeer", why: "She's been organising neighbourhood dinners in Delfshaven for fifteen years. The stories she carries are the street itself.", how: "Knows her from the street committee", from: "Pieter van Loon", date: "15 Jun 2026", status: "new",
  },
  {
    id: "seed-rec-2", who: "Youssef El Alami", why: "Started a bicycle repair cooperative out of nothing. Half the neighbourhood learned to fix a flat tyre because of him.", how: "Regular customer", from: "Aisha K.", date: "17 Jun 2026", status: "new",
  },
];

const SEED_REQUESTS: EditableStory[] = [
  {
    id: "req-seed-1", number: 17, status: "upcoming", stage: undefined,
    name: "Hassan Oubari", role: "Entrepreneur", neighborhood: "Afrikaanderwijk",
    date: "TBC", question: "What did this city teach you that nobody sat you down to explain?",
    answer: "", about: "I run a small textile studio out of my garage. Rotterdam gave me the space to do something no one back home expected.", keep: true,
  },
];

// ─── Storage helpers ──────────────────────────────────────────────────────────

const ADMIN_KEY = "ct_admin_v1";

type AdminStore = {
  overrides: Record<string, Partial<EditableStory>>;
  submissions: EditableStory[];
  recommendations: Recommendation[];
  recStatus: Record<string, Recommendation["status"]>;
};

function loadAdmin(): AdminStore {
  try { return JSON.parse(localStorage.getItem(ADMIN_KEY) ?? "null") || { overrides: {}, submissions: [], recommendations: [], recStatus: {} }; } catch { return { overrides: {}, submissions: [], recommendations: [], recStatus: {} }; }
}
function saveAdmin(s: AdminStore) {
  try { localStorage.setItem(ADMIN_KEY, JSON.stringify(s)); } catch {}
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<"overview" | "pipeline" | "recommend" | "requests">("overview");
  const [editing, setEditing] = useState<EditableStory | null>(null);
  const [q, setQ] = useState("");
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  const storeRef = useRef<AdminStore>(loadAdmin());
  const persist = () => { saveAdmin(storeRef.current); forceUpdate(); };

  // Merge pipeline seeds + public stories + submissions with overrides
  const publicStories = loadStories() ?? SEED_STORIES;
  const { overrides, submissions, recStatus } = storeRef.current;

  const merge = (s: EditableStory): EditableStory =>
    overrides[s.id] ? { ...s, ...overrides[s.id] } : s;

  const allEntries: EditableStory[] = [
    ...PIPELINE_SEEDS.map(merge),
    ...(publicStories as EditableStory[]).filter(
      (s) => !PIPELINE_SEEDS.some((p) => p.id === s.id) && s.id !== "req-seed-1"
    ).map(merge),
    ...(submissions as EditableStory[]).map(merge),
  ];

  const pipeline = allEntries.filter((s) => !s.id.startsWith("req-") || s.stage);
  const requests: EditableStory[] = [
    ...SEED_REQUESTS.map(merge).filter(
      (r) => !pipeline.some((p) => (p as unknown as Record<string, unknown>)["fromRequest"] === r.id)
    ),
    ...(publicStories as EditableStory[]).filter((s) => s.id.startsWith("req-")),
    ...(submissions as EditableStory[]).filter((s) => s.id.startsWith("req-")),
  ].filter((s) => !s.stage);

  const allRecs: Recommendation[] = [
    ...SEED_RECOMMENDATIONS.map((r) => ({ ...r, status: recStatus[r.id] ?? r.status })),
    ...(storeRef.current.recommendations as Recommendation[]),
  ].filter((r) => r.status !== "declined");

  const newRecs = allRecs.filter((r) => r.status === "new").length;
  const published = pipeline.filter((s) => (s.stage ?? "published") === "published").length;

  const writeEntry = (entry: EditableStory, advanceStage?: StoryStage) => {
    const stage = advanceStage ?? (entry.stage as StoryStage) ?? "draft";
    const status = statusForStage(stage);
    const payload = { ...entry, stage, status };
    const isSeed = [...PIPELINE_SEEDS, ...SEED_STORIES].some((s) => s.id === entry.id);

    if (isSeed) {
      storeRef.current.overrides = { ...overrides, [entry.id]: payload };
    } else {
      const exists = submissions.some((s) => s.id === entry.id);
      storeRef.current.submissions = exists
        ? submissions.map((s) => s.id === entry.id ? payload : s)
        : [...submissions, payload];
    }

    // Also sync to ct-stories so public site sees it
    const all = loadStories() ?? SEED_STORIES;
    const idx = (all as Story[]).findIndex((s) => s.id === entry.id);
    if (idx >= 0) { (all as Story[])[idx] = { ...(all as Story[])[idx], ...payload }; saveStories(all); }
    else { saveStories([...(all as Story[]), payload as Story]); }

    persist();
  };

  const saveStory = (f: EditableStory) => { writeEntry(f); setEditing(null); };
  const advanceStory = (f: EditableStory) => {
    const spec = STAGE_SPEC[f.stage as string ?? "draft"];
    if (spec?.next) writeEntry(f, spec.next as StoryStage);
    setEditing(null);
  };

  const deleteStory = (s: EditableStory) => {
    const isSeed = PIPELINE_SEEDS.some((p) => p.id === s.id) || SEED_STORIES.some((p) => p.id === s.id);
    if (isSeed) {
      storeRef.current.overrides = { ...overrides, [s.id]: { ...overrides[s.id], status: "withdrawn", stage: "withdrawn" as StoryStage } };
    } else {
      storeRef.current.submissions = submissions.filter((x) => x.id !== s.id);
    }
    // Remove from ct-stories
    const all = loadStories() ?? SEED_STORIES;
    saveStories((all as Story[]).filter((x) => x.id !== s.id));
    persist(); setEditing(null);
  };

  const newDraft = () => {
    const maxNum = allEntries.reduce((m, s) => Math.max(m, s.number || 0), 0);
    setEditing({
      _isNew: true, id: "sub-" + Date.now(),
      number: maxNum + 1, stage: "draft" as StoryStage, status: "upcoming",
      name: "", role: "", neighborhood: "", date: today(),
      question: "What did this city teach you that nobody sat you down to explain?",
      answer: "", checklist: {},
    } as EditableStory);
  };

  const pickUpRequest = (s: EditableStory) => {
    writeEntry({ ...s, stage: "draft" as StoryStage, status: "upcoming" });
    // Remove from requests
    const all = loadStories() ?? SEED_STORIES;
    const updated = (all as Story[]).map((x) => x.id === s.id ? { ...x, stage: "draft" as StoryStage } : x);
    saveStories(updated);
    forceUpdate();
  };

  const recAction = (rec: Recommendation, action: "pickup" | "decline" | "dismiss") => {
    const isSeedRec = SEED_RECOMMENDATIONS.some((r) => r.id === rec.id);
    const setStatus = (st: Recommendation["status"]) => {
      if (isSeedRec) {
        storeRef.current.recStatus = { ...recStatus, [rec.id]: st };
      } else {
        storeRef.current.recommendations = storeRef.current.recommendations.map(
          (r) => r.id === rec.id ? { ...r, status: st } : r
        );
      }
    };

    if (action === "pickup") {
      const maxNum = allEntries.reduce((m, s) => Math.max(m, s.number || 0), 0);
      const entry: EditableStory = {
        id: "sub-rec-" + rec.id, number: maxNum + 1, stage: "draft" as StoryStage, status: "upcoming",
        name: rec.who, role: "Resident", neighborhood: "Rotterdam", date: "Recommended " + rec.date,
        question: "What did this city teach you that nobody sat you down to explain?",
        answer: "", checklist: {}, fromRecommendation: rec.from || "a neighbour", about: rec.why,
      };
      storeRef.current.submissions = [...submissions, entry as EditableStory];
      saveStories([...(loadStories() ?? SEED_STORIES) as Story[], entry as unknown as Story]);
      setStatus("picked-up");
    } else if (action === "decline") {
      setStatus("declined");
    } else {
      if (isSeedRec) storeRef.current.recStatus = { ...recStatus, [rec.id]: "declined" };
      else storeRef.current.recommendations = storeRef.current.recommendations.filter((r) => r.id !== rec.id);
    }
    persist();
  };

  // ── Login gate ──
  if (!authed) {
    return (
      <Box style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Box
          component="form"
          onSubmit={(e: React.FormEvent) => { e.preventDefault(); setAuthed(true); }}
          style={{ backgroundColor: "#FCF8F0", backgroundImage: PAPER, border: "1px solid #E0D3B8", borderRadius: 12, boxShadow: "0 2px 4px rgba(38,26,18,.05), 0 8px 20px rgba(38,26,18,.10)", padding: 36, width: "min(400px, 100%)" }}
        >
          <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 26, color: "#211A12", letterSpacing: "-0.02em" }}>
            Clipper<em style={{ fontStyle: "italic", color: "#C26B4A" }}>Takes</em>
          </Text>
          <Text mt={4} mb={22} style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9C8466" }}>
            Studio admin · private
          </Text>
          <PasswordInput label="Passphrase" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.currentTarget.value)} description="Demo: any value gets you in." />
          <Button type="submit" color="petrol" fullWidth mt="md">Enter the studio</Button>
        </Box>
      </Box>
    );
  }

  const NAV = [
    { key: "overview" as const, label: "Overview" },
    { key: "pipeline" as const, label: "Production", count: pipeline.length },
    { key: "recommend" as const, label: "Recommendations", count: newRecs || undefined },
    { key: "requests" as const, label: "Story requests", count: requests.length || undefined },
  ];

  // ── Tab bodies ──
  let body: React.ReactNode;

  if (tab === "overview") {
    const byStage = Object.fromEntries(STAGES.map((s) => [s.key, pipeline.filter((p) => (p.stage ?? "published") === s.key).length]));
    body = (
      <div>
        <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>Overview</Text>
        <Text c="dimmed" mt={6} mb={26} style={{ maxWidth: "64ch", lineHeight: 1.6 }}>
          Where the archive stands today. A story becomes visible on the public site at <strong>Filming</strong>, and can only be published once its video is uploaded.
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={14} mb={30}>
          <StatCard value={published} label={`Published of ${TARGET}`} />
          {STAGES.filter((s) => s.key !== "published").map((s) => (
            <StatCard key={s.key} value={byStage[s.key] ?? 0} label={s.label} />
          ))}
          <StatCard value={newRecs} label="New recommendations" />
          <StatCard value={requests.length} label="Open requests" />
        </SimpleGrid>
        <Box style={{ backgroundColor: "#FCF8F0", backgroundImage: PAPER, border: "1px solid #E0D3B8", borderRadius: 12, padding: "20px 22px", maxWidth: 640 }}>
          <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 20, fontWeight: 600, color: "#211A12", marginBottom: 6 }}>Next up</Text>
          <Text style={{ color: "#9C8466", lineHeight: 1.6 }}>
            {newRecs > 0 ? `${newRecs} new recommendation${newRecs > 1 ? "s" : ""} and ` : ""}
            {requests.length} open request{requests.length !== 1 ? "s" : ""} waiting to enter the pipeline. Open <strong>Production</strong> to move stories through their stages.
          </Text>
        </Box>
      </div>
    );

  } else if (tab === "pipeline") {
    const rows = pipeline.filter(
      (s) => !q || (s.name ?? "").toLowerCase().includes(q.toLowerCase()) || (s.neighborhood ?? "").toLowerCase().includes(q.toLowerCase())
    );
    body = (
      <div>
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
          <div>
            <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>Production</Text>
            <Text c="dimmed" mt={6} mb={18}>Every story, by stage. Click a card to work its checklist and advance it.</Text>
          </div>
        </Box>
        <Box mb={18}>
          <input
            className="ct-admin-search"
            placeholder="Search name or neighbourhood…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ height: 40, padding: "0 13px", border: "1.5px solid #E0D3B8", borderRadius: 5, background: "#FCF8F0", fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 15, color: "#211A12", minWidth: 220, outline: "none" }}
          />
        </Box>
        <Box style={{ overflowX: "auto" }}>
          <Box style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(200px, 1fr))", gap: 12, minWidth: 1000, alignItems: "start" }}>
            {STAGES.map((st) => {
              const items = rows.filter((s) => (s.stage ?? "published") === st.key).sort((a, b) => a.number - b.number);
              return (
                <Box key={st.key} style={{ background: "#F5EEDF", border: "1px solid #E0D3B8", borderRadius: 12, padding: 12, minHeight: 120 }}>
                  <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#3F2D20", display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: STAGE_DOT[st.key], display: "inline-block" }} />
                      {st.label}
                    </Text>
                    <Text style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, color: "#B7A079" }}>{items.length}</Text>
                  </Box>
                  {items.length === 0 && <Text style={{ fontSize: 12, color: "#B7A079", fontStyle: "italic", padding: "8px 6px" }}>—</Text>}
                  {items.map((s) => <PipelineCard key={s.id} story={s} onClick={() => setEditing(s)} />)}
                </Box>
              );
            })}
          </Box>
        </Box>
      </div>
    );

  } else if (tab === "recommend") {
    body = (
      <div>
        <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>Recommendations</Text>
        <Text c="dimmed" mt={6} mb={26} style={{ maxWidth: "64ch", lineHeight: 1.6 }}>
          Rotterdam pointing you toward who should sit in the chair next — from the public "Recommend someone" form.
        </Text>
        {allRecs.length === 0
          ? <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#B7A079", fontSize: 18, padding: "30px 0" }}>No recommendations yet.</Text>
          : allRecs.map((r) => (
          <Box key={r.id} mb={14} style={{ backgroundColor: "#FCF8F0", backgroundImage: PAPER, border: r.status === "new" ? "1px solid #E0D3B8" : "1px solid #E0D3B8", borderLeft: r.status === "new" ? "3px solid #F2C200" : "1px solid #E0D3B8", borderRadius: 12, padding: "20px 22px", maxWidth: 760 }}>
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 22, fontWeight: 600, color: "#211A12" }}>{r.who}</Text>
              <Badge color={r.status === "new" ? "yellow" : r.status === "picked-up" ? "moss" : "paper"} variant="light">
                {r.status === "new" ? "New" : r.status === "picked-up" ? "Picked up" : "Reviewed"}
              </Badge>
            </Box>
            <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 18, lineHeight: 1.5, color: "#6A5440", fontStyle: "italic", margin: "10px 0" }}>"{r.why}"</Text>
            <Box style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", fontSize: 13, color: "#9C8466", marginBottom: 12 }}>
              {r.how && <span><strong style={{ color: "#211A12" }}>How they know them:</strong> {r.how}</span>}
              <span><strong style={{ color: "#211A12" }}>Suggested by:</strong> {r.from || "anonymous"}</span>
              <span><strong style={{ color: "#211A12" }}>Received:</strong> {r.date}</span>
            </Box>
            {r.status === "new"
              ? <Box style={{ display: "flex", gap: 10 }}>
                  <Button size="xs" color="petrol" onClick={() => recAction(r, "pickup")}>Pick up → Draft</Button>
                  <Button size="xs" color="petrol" variant="outline" onClick={() => recAction(r, "decline")}>Decline</Button>
                </Box>
              : <Box style={{ display: "flex", gap: 10 }}>
                  <Button size="xs" color="petrol" variant="subtle" onClick={() => recAction(r, "dismiss")}>Remove from list</Button>
                </Box>
            }
          </Box>
        ))}
      </div>
    );

  } else {
    body = (
      <div>
        <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 6 }}>
          <div>
            <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontWeight: 600, fontSize: 34, color: "#211A12", letterSpacing: "-0.01em" }}>Story requests</Text>
            <Text c="dimmed" mt={6} mb={18} style={{ maxWidth: "64ch", lineHeight: 1.6 }}>
              People who put themselves forward via "Tell your story". Pick one up to start its Draft — or add someone yourself.
            </Text>
          </div>
          <Button color="yellow" variant="filled" styles={{ root: { color: "#211A12", fontWeight: 600 } }} onClick={newDraft}>+ New story</Button>
        </Box>
        {requests.length === 0
          ? <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontStyle: "italic", color: "#B7A079", fontSize: 18, padding: "30px 0" }}>No open requests yet.</Text>
          : requests.map((s) => (
          <Box key={s.id} mb={14} style={{ backgroundColor: "#FCF8F0", backgroundImage: PAPER, border: "1px solid #E0D3B8", borderRadius: 12, padding: "20px 22px", maxWidth: 760 }}>
            <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 22, fontWeight: 600, color: "#211A12" }}>{s.name}</Text>
              <StoryStatusTag status="upcoming" />
            </Box>
            {s.about && <Text style={{ fontFamily: '"Newsreader", Georgia, serif', fontSize: 18, lineHeight: 1.5, color: "#6A5440", fontStyle: "italic", margin: "10px 0" }}>"{s.about}"</Text>}
            <Box style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", fontSize: 13, color: "#9C8466", marginBottom: 12 }}>
              <span><strong style={{ color: "#211A12" }}>Neighbourhood:</strong> {s.neighborhood}</span>
              <span><strong style={{ color: "#211A12" }}>Role:</strong> {s.role}</span>
              <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11 }}>{s.date}</span>
            </Box>
            <Box style={{ display: "flex", gap: 10 }}>
              <Button size="xs" color="petrol" onClick={() => pickUpRequest(s)}>Pick up → Draft</Button>
              <Button size="xs" color="petrol" variant="outline" onClick={() => setEditing(s)}>Open details</Button>
              <Button size="xs" color="petrol" variant="subtle" onClick={() => deleteStory(s)}>Decline</Button>
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
        style={{ backgroundColor: "#0C2A30", backgroundImage: PAPER, color: "#A9CACE", padding: "26px 18px", display: "flex", flexDirection: "column", gap: 6, position: "sticky", top: 60, height: "calc(100vh - 60px)", boxSizing: "border-box", overflowY: "auto" }}
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
              background: tab === n.key ? "#1C5862" : "none", border: 0, textAlign: "left",
              color: tab === n.key ? "#FCF8F0" : "#A9CACE",
              fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 15, fontWeight: 500,
              padding: "10px 12px", borderRadius: 8, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
              transition: "background .18s, color .18s",
            }}
          >
            <span>{n.label}</span>
            {n.count != null && (
              <Text span style={{ fontFamily: '"Space Mono", monospace', fontSize: 11, background: tab === n.key ? "#FCF8F0" : "#F2C200", color: "#211A12", borderRadius: 99, padding: "1px 7px", fontWeight: 700 }}>
                {n.count}
              </Text>
            )}
          </button>
        ))}
        <Box style={{ flex: 1 }} />
        <button onClick={() => setAuthed(false)} style={{ background: "none", border: 0, textAlign: "left", color: "#5E9099", fontSize: 13, cursor: "pointer", fontFamily: '"Hanken Grotesk", sans-serif', padding: "6px 0" }}>
          Sign out
        </button>
      </Box>

      {/* Main */}
      <Box style={{ padding: "32px clamp(20px, 4vw, 48px) 80px" }}>
        {body}
      </Box>

      {editing && (
        <EditDrawer
          story={editing}
          onSave={saveStory}
          onAdvance={advanceStory}
          onClose={() => setEditing(null)}
          onDelete={deleteStory}
        />
      )}
    </Box>
  );
}
