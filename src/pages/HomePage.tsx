/** @format */

import { Link, useNavigate } from "react-router-dom";
import { Container, Button, Box, Text, SimpleGrid } from "@mantine/core";
import { useGetStories } from "../features/stories/api/useGetStories";
import { TARGET } from "../features/stories/api/seed";
import ProgressCounter from "../features/stories/components/ProgressCounter";
import StoryCard from "../features/stories/components/StoryCard";
import NeighborhoodTag from "../features/stories/components/NeighborhoodTag";
import heroImg from "../assets/hero.jpg";
import { useLang } from "../i18n";

const PAPER_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E\")";

export default function HomePage() {
  const { data: stories = [] } = useGetStories();
  const navigate = useNavigate();
  const { t } = useLang();

  const published = stories.filter((s) => s.status === "published");
  const collected = published.length;
  const recent = published.slice(0, 4);
  const lead = published[0];

  const hoodCounts: Record<string, number> = {};
  published.forEach((s) => {
    hoodCounts[s.neighborhood] = (hoodCounts[s.neighborhood] || 0) + 1;
  });

  return (
    <div>
      {/* Hero */}
      <Container size="lg" px="clamp(20px, 5vw, 56px)">
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
            padding: "clamp(40px, 6vw, 88px) 0 clamp(36px, 5vw, 64px)",
          }}
          className="ct-hero"
        >
          <div>
            <Text
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9C8466",
              }}
            >
              {t("home_eyebrow")}
            </Text>
            <Text
              component="h1"
              mt={14}
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 600,
                fontSize: "clamp(40px, 6vw, 72px)",
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                color: "#211A12",
                margin: "14px 0 0",
              }}
            >
              {t("home_hero")}
            </Text>
            <Text
              mt={22}
              style={{
                fontSize: "clamp(16px, 1.8vw, 20px)",
                lineHeight: 1.65,
                color: "#3F2D20",
                maxWidth: "46ch",
              }}
            >
              {t("home_sub")}
            </Text>
            <Box mt={28} style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button component={Link} to="/stories" color="petrol" variant="filled" size="lg">
                {t("home_cta")}
              </Button>
              <Button component={Link} to="/about" color="petrol" variant="outline" size="lg">
                {t("home_about_btn")}
              </Button>
            </Box>
          </div>

          <Box
            style={{
              position: "relative",
              aspectRatio: "4/5",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)",
            }}
          >
            <img
              src={lead?.image ?? heroImg}
              alt={t("home_in_chair")}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <Box
              style={{
                position: "absolute",
                left: 16,
                bottom: 16,
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
              Story {String(lead?.number ?? 1).padStart(2, "0")} / {TARGET}
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Counter band */}
      <Box
        style={{
          backgroundColor: "#0C2A30",
          backgroundImage: PAPER_TEXTURE,
        }}
      >
        <Container size="lg" px="clamp(20px, 5vw, 56px)">
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 28,
              padding: "clamp(36px, 5vw, 64px) 0",
            }}
          >
            <ProgressCounter count={collected} total={TARGET} size="lg" onDark />
            <Text
              style={{
                maxWidth: "34ch",
                color: "#A9CACE",
                lineHeight: 1.6,
                fontSize: 16,
              }}
            >
              {t("home_counter_body")}
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Recent stories */}
      <Container size="lg" px="clamp(20px, 5vw, 56px)">
        <Box py="clamp(48px, 7vw, 96px)">
          <Box
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 20,
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <div>
              <Text
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#9C8466",
                }}
              >
                {t("home_recent")}
              </Text>
              <Text
                component="h2"
                mt={8}
                style={{
                  fontFamily: '"Newsreader", Georgia, serif',
                  fontWeight: 600,
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  color: "#211A12",
                  letterSpacing: "-0.01em",
                  margin: "8px 0 0",
                }}
              >
                {t("home_voices")}
              </Text>
            </div>
            <Button component={Link} to="/stories" color="petrol" variant="subtle">
              {t("home_see_all")}
            </Button>
          </Box>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="clamp(16px, 2vw, 26px)">
            {recent.map((s) => (
              <StoryCard
                key={s.id}
                story={s}
                total={TARGET}
                onClick={() => navigate(`/stories/${s.id}`)}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Neighbourhoods */}
        <Box pb="clamp(48px, 7vw, 96px)">
          <Box mb={28}>
            <Text
              style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#9C8466",
              }}
            >
              {t("home_where")}
            </Text>
            <Text
              component="h2"
              mt={8}
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 600,
                fontSize: "clamp(24px, 3.5vw, 36px)",
                color: "#211A12",
                letterSpacing: "-0.01em",
                margin: "8px 0 4px",
              }}
            >
              {t("home_where_sub")}
            </Text>
            <Text c="dimmed" style={{ maxWidth: "52ch", lineHeight: 1.6 }}>
              {t("home_moves")}
            </Text>
          </Box>
          <Box style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {Object.keys(hoodCounts).map((h) => (
              <NeighborhoodTag
                key={h}
                name={h}
                count={hoodCounts[h]}
                onClick={() => navigate("/stories")}
              />
            ))}
          </Box>
        </Box>
      </Container>

      <style>{`@media (max-width: 860px) { .ct-hero { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
