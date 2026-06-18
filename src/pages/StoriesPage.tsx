/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Text, SimpleGrid } from "@mantine/core";
import { useGetStories } from "../features/stories/api/useGetStories";
import { TARGET } from "../features/stories/api/seed";
import ProgressCounter from "../features/stories/components/ProgressCounter";
import StoryCard from "../features/stories/components/StoryCard";
import NeighborhoodTag from "../features/stories/components/NeighborhoodTag";

export default function StoriesPage() {
  const { data: stories = [] } = useGetStories();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const published = stories.filter((s) => s.status === "published");
  const collected = published.length;

  const hoodCounts: Record<string, number> = {};
  stories.forEach((s) => {
    hoodCounts[s.neighborhood] = (hoodCounts[s.neighborhood] || 0) + 1;
  });

  const visible = filter === "all" ? stories : stories.filter((s) => s.neighborhood === filter);

  return (
    <Container size="lg" px="clamp(20px, 5vw, 56px)">
      {/* Board header */}
      <Box pt="clamp(36px, 5vw, 64px)" pb={8}>
        <Text
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9C8466",
          }}
        >
          The archive · {collected} of {TARGET} collected
        </Text>
        <Text
          component="h1"
          mt={10}
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "-0.02em",
            color: "#211A12",
            margin: "10px 0 0",
          }}
        >
          The Stories
        </Text>
        <Box mt={10} style={{ maxWidth: 560 }}>
          <ProgressCounter count={collected} total={TARGET} size="md" />
        </Box>
      </Box>

      {/* Sticky filter bar */}
      <Box
        style={{
          position: "sticky",
          top: 65,
          zIndex: 10,
          padding: "18px 0",
          marginBottom: 8,
          backgroundColor: "rgba(245, 238, 223, 0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #E0D3B8",
        }}
      >
        <Box style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <NeighborhoodTag
            name="All of Rotterdam"
            count={stories.length}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {Object.keys(hoodCounts).map((h) => (
            <NeighborhoodTag
              key={h}
              name={h}
              count={hoodCounts[h]}
              active={filter === h}
              onClick={() => setFilter(h)}
            />
          ))}
        </Box>
      </Box>

      {/* Story grid */}
      <Box py="xl" pb={88}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="clamp(16px, 2vw, 26px)">
          {visible.map((s) => (
            <StoryCard
              key={s.id}
              story={s}
              total={TARGET}
              onClick={s.status === "published" ? () => navigate(`/stories/${s.id}`) : undefined}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
}
