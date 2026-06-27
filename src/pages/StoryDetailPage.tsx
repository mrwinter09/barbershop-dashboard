/** @format */

import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Box, Text, Button, Loader, Center } from "@mantine/core";
import { useGetStories } from "../features/stories/api/useGetStories";
import { loadReflections, saveReflections } from "../features/stories/api/stories.storage";
import { TARGET } from "../features/stories/api/seed";
import StoryStatusTag from "../features/stories/components/StoryStatusTag";
import ReflectionItem from "../features/stories/components/ReflectionItem";
import ReflectionForm from "../features/stories/components/ReflectionForm";
import type { Reflection } from "../features/stories/types/Story";
import { useState, useRef } from "react";
import { useLang } from "../i18n";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function youtubeId(url: string): string | null {
  // Handles: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/shorts/ID, youtube.com/embed/ID
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|v\/))([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

export default function StoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: stories = [], isLoading } = useGetStories();
  const { t } = useLang();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const story = stories.find((s) => s.id === id);
  const ytId = story?.video ? youtubeId(story.video) : null;
  const isYoutube = !!ytId;
  const isDirectVideo = !!story?.video && !isYoutube;

  const [reflections, setReflections] = useState<Reflection[]>(() => {
    if (!id) return [];
    return loadReflections()[id] ?? [];
  });

  const handleReflect = (r: Reflection) => {
    const all = loadReflections();
    const updated = [...(all[id!] ?? []), r];
    all[id!] = updated;
    saveReflections(all);
    setReflections(updated);
  };

  if (isLoading) {
    return <Center py={80}><Loader color="petrol" /></Center>;
  }

  if (!story) {
    return (
      <Container size="lg" py="xl">
        <Text>{t("story_not_found")}</Text>
        <Button mt="md" component={Link} to="/stories" color="petrol" variant="outline">
          {t("story_back")}
        </Button>
      </Container>
    );
  }

  return (
    <Container size="lg" px="clamp(20px, 5vw, 56px)">
      <Button
        variant="subtle"
        color="petrol"
        mt={28}
        px={0}
        onClick={() => navigate("/stories")}
        styles={{ root: { fontFamily: '"Hanken Grotesk", sans-serif', fontSize: 14, color: "#9C8466" } }}
      >
        {t("story_back_arrow")}
      </Button>

      {/* Detail hero */}
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "0.92fr 1.08fr",
          gap: "clamp(28px, 4vw, 56px)",
          alignItems: "start",
          padding: "24px 0 clamp(36px, 5vw, 56px)",
        }}
        className="ct-detail-hero"
      >
        {/* Portrait / Video */}
        <Box
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)",
            background: "#0C2A30",
            cursor: isDirectVideo && !videoPlaying ? "pointer" : "default",
          }}
          onClick={() => {
            if (!isDirectVideo) return;
            if (videoPlaying) {
              videoRef.current?.pause();
            } else {
              setVideoPlaying(true);
              setTimeout(() => videoRef.current?.play(), 0);
            }
          }}
        >
          {/* Poster image — hidden when playing direct video or YouTube is open */}
          {story.image && !videoPlaying && !isYoutube && (
            <img
              src={story.image}
              alt={`Portrait of ${story.name}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}

          {/* YouTube Shorts / video iframe — always mounted when YouTube link present */}
          {isYoutube && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
              title={story.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          )}

          {/* Direct MP4 video element */}
          {isDirectVideo && videoPlaying && (
            <video
              ref={videoRef}
              src={story.video}
              poster={story.image}
              autoPlay
              playsInline
              muted={muted}
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
              onEnded={() => setVideoPlaying(false)}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}

          {/* Play button overlay — shown when there's a direct video not yet playing */}
          {isDirectVideo && !videoPlaying && (
            <Box
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(12,42,48,.28)",
              }}
            >
              <Box
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,.18)",
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(255,255,255,.55)",
                }}
              >
                <svg width="22" height="26" viewBox="0 0 22 26" fill="white">
                  <path d="M2 2l18 11L2 24V2z" />
                </svg>
              </Box>
            </Box>
          )}

          {/* Mute/unmute for direct video only */}
          {isDirectVideo && videoPlaying && (
            <Box
              style={{ position: "absolute", bottom: 56, right: 14, zIndex: 4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  v.muted = !v.muted;
                  setMuted(v.muted);
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: 0,
                  background: "rgba(255,255,255,.18)",
                  backdropFilter: "blur(6px)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                {muted ? "🔇" : "🔊"}
              </button>
            </Box>
          )}

          {/* Story number badge */}
          <Box
            style={{
              position: "absolute",
              left: 16,
              top: 16,
              background: "#F2C200",
              color: "#211A12",
              fontFamily: '"Space Mono", monospace',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "5px 10px",
              borderRadius: 3,
              zIndex: 5,
            }}
          >
            Story {pad(story.number)} / {TARGET}
          </Box>
        </Box>

        {/* Info */}
        <div>
          <StoryStatusTag status={story.status} />
          <Text
            component="h1"
            mt={14}
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              color: "#211A12",
              margin: "14px 0 0",
            }}
          >
            {story.name}
          </Text>

          <Box
            mt={14}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "8px 12px",
              color: "#9C8466",
              fontSize: 15,
            }}
          >
            <Text component="b" style={{ color: "#C26B4A", fontWeight: 600 }}>{story.role}</Text>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#CBB994", display: "inline-block" }} />
            <span>{story.neighborhood}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#CBB994", display: "inline-block" }} />
            <span style={{ fontFamily: '"Space Mono", monospace', fontSize: 12, letterSpacing: "0.06em" }}>{story.date}</span>
          </Box>

          {/* Q&A */}
          <Box
            mt={30}
            pt={26}
            style={{ borderTop: "1.5px solid #E0D3B8" }}
          >
            <Text
              style={{
                fontFamily: '"Hanken Grotesk", sans-serif',
                fontSize: 15,
                fontWeight: 600,
                color: "#9C8466",
              }}
            >
              {story.question}
            </Text>
            {story.answer && (
              <Text
                mt={14}
                style={{
                  fontFamily: '"Newsreader", Georgia, serif',
                  fontSize: "clamp(18px, 2vw, 24px)",
                  lineHeight: 1.6,
                  color: "#3F2D20",
                  fontStyle: "italic",
                }}
              >
                "{story.answer}"
              </Text>
            )}
          </Box>
        </div>
      </Box>

      {/* Reflections */}
      <Box pb={88} style={{ maxWidth: 720 }}>
        <Text
          component="h3"
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontWeight: 600,
            fontSize: "clamp(20px, 2.5vw, 28px)",
            color: "#211A12",
            marginBottom: 6,
          }}
        >
          {t("story_reflections")}
        </Text>
        <Text c="dimmed" mb={18} style={{ lineHeight: 1.6 }}>
          {t("story_reflection_placeholder")}
        </Text>

        <Box mb={26}>
          {reflections.length === 0 ? (
            <Text
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontStyle: "italic",
                color: "#B7A079",
                fontSize: 18,
                padding: "14px 0 26px",
              }}
            >
              {t("story_no_reflections")}
            </Text>
          ) : (
            reflections.map((r, i) => (
              <ReflectionItem key={i} {...r} />
            ))
          )}
        </Box>

        <ReflectionForm onSubmit={handleReflect} />

        <Box mt={40}>
          <Button
            component={Link}
            to="/recommend"
            color="petrol"
            variant="outline"
          >
            {t("story_recommend_cta")}
          </Button>
        </Box>
      </Box>

      <style>{`@media (max-width: 860px) { .ct-detail-hero { grid-template-columns: 1fr !important; } }`}</style>
    </Container>
  );
}
