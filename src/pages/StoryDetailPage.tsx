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
import { useState } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function StoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: stories = [], isLoading } = useGetStories();

  const story = stories.find((s) => s.id === id);

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
        <Text>Story not found.</Text>
        <Button mt="md" component={Link} to="/stories" color="petrol" variant="outline">
          Back to the stories
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
        ← Back to the stories
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
        {/* Portrait */}
        <Box
          style={{
            position: "relative",
            aspectRatio: "4/5",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)",
          }}
        >
          {story.image && (
            <img
              src={story.image}
              alt={`Portrait of ${story.name}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
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
          Reflections
        </Text>
        <Text c="dimmed" mb={18} style={{ lineHeight: 1.6 }}>
          Read this story? Leave a short response, a sentence is plenty. Like a word
          dropped in the barbershop on your way out.
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
              No reflections yet. Be the first to respond.
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
            Know who should sit in the chair next? →
          </Button>
        </Box>
      </Box>

      <style>{`@media (max-width: 860px) { .ct-detail-hero { grid-template-columns: 1fr !important; } }`}</style>
    </Container>
  );
}
