/** @format */

import { Card, Text, Box } from "@mantine/core";
import StoryStatusTag from "./StoryStatusTag";
import type { Story } from "../types/Story";

interface Props {
  story: Story;
  total: number;
  onClick?: () => void;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function hasVideo(url?: string) {
  return !!url;
}

export default function StoryCard({ story, total, onClick }: Props) {
  const teaser =
    story.status === "published" && story.answer
      ? `"${story.answer.split(". ")[0]}."`
      : undefined;

  return (
    <Card
      shadow="sm"
      padding={0}
      radius="lg"
      withBorder
      style={{
        cursor: onClick && story.status === "published" ? "pointer" : "default",
        transition: "box-shadow 0.22s, transform 0.22s",
        overflow: "hidden",
      }}
      onClick={onClick && story.status === "published" ? onClick : undefined}
      onMouseEnter={(e) => {
        if (onClick && story.status === "published") {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)";
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "";
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      {/* portrait */}
      <Box
        style={{
          position: "relative",
          aspectRatio: "4/5",
          background: "#E0D3B8",
          overflow: "hidden",
        }}
      >
        {story.image ? (
          <img
            src={story.image}
            alt={`Portrait of ${story.name}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.4s cubic-bezier(0.16,0.84,0.44,1)",
            }}
          />
        ) : (
          <Box style={{ width: "100%", height: "100%", background: "#CBB994" }} />
        )}
        {hasVideo(story.video) && (
          <Box
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(12,42,48,.22)",
            }}
          >
            <Box
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,.2)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,.5)",
              }}
            >
              <svg width="14" height="17" viewBox="0 0 14 17" fill="white">
                <path d="M1 1.5l12 7-12 7V1.5z" />
              </svg>
            </Box>
          </Box>
        )}
        <Box
          style={{
            position: "absolute",
            left: 12,
            bottom: 12,
            background: "#F2C200",
            color: "#211A12",
            fontFamily: '"Space Mono", monospace',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 8px",
            borderRadius: 3,
          }}
        >
          Story {pad(story.number)} / {total}
        </Box>
      </Box>

      {/* body */}
      <Box p="md">
        <StoryStatusTag status={story.status} />
        <Text
          mt={8}
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontSize: 18,
            fontWeight: 600,
            color: "#211A12",
            lineHeight: 1.2,
          }}
        >
          {story.name}
        </Text>
        <Text
          size="sm"
          c="dimmed"
          mt={2}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.04em",
          }}
        >
          {story.role} · {story.neighborhood}
        </Text>
        {teaser && (
          <Text
            mt={10}
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontStyle: "italic",
              fontSize: 14,
              color: "#6A5440",
              lineHeight: 1.55,
            }}
          >
            {teaser}
          </Text>
        )}
      </Box>
    </Card>
  );
}
