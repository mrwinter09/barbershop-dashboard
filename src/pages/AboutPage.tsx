/** @format */

import { Link } from "react-router-dom";
import { Container, Box, Text, Button, Card, SimpleGrid } from "@mantine/core";
import { useGetStories } from "../features/stories/api/useGetStories";
import { TARGET } from "../features/stories/api/seed";
import ProgressCounter from "../features/stories/components/ProgressCounter";
import img1 from "../assets/interior-1.jpg";
import img2 from "../assets/hero.jpg";
import img3 from "../assets/interior-3.jpg";
import img4 from "../assets/shop-2.jpg";

const STEPS = [
  {
    n: "01",
    title: "The chair arrives",
    body: "It travels to a neighbourhood — a market square, a festival, a quiet street corner — and sets up where people already are.",
  },
  {
    n: "02",
    title: "One question",
    body: "You sit down for a real haircut. While the clippers run, there's one question, and time to actually answer it.",
  },
  {
    n: "03",
    title: "A portrait is kept",
    body: "The conversation becomes a short film, numbered and added to the archive of fifty — for the city to keep and come back to.",
  },
];

export default function AboutPage() {
  const { data: stories = [] } = useGetStories();
  const collected = stories.filter((s) => s.status === "published").length;

  return (
    <div>
      <Container size="lg" px="clamp(20px, 5vw, 56px)">
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(28px, 5vw, 64px)",
            alignItems: "center",
            padding: "clamp(40px, 6vw, 80px) 0",
          }}
          className="ct-about-hero"
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
              The chair · The format · The maker
            </Text>
            <Text
              component="h1"
              mt={14}
              style={{
                fontFamily: '"Newsreader", Georgia, serif',
                fontWeight: 600,
                fontSize: "clamp(28px, 4vw, 48px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "#211A12",
                margin: "14px 0 0",
              }}
            >
              A barbershop is where a neighbourhood talks to itself.
            </Text>
            <Text
              mt={20}
              style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.65, color: "#3F2D20" }}
            >
              ClipperTakes takes that idea on the road. Ivan Winter — a barber and theatre
              maker — brings a travelling chair to Rotterdam's streets, markets and festivals.
              You sit down for a haircut. While the clippers run, he asks one question. The
              conversation becomes a two-to-three minute portrait.
            </Text>
            <Text mt={16} style={{ lineHeight: 1.65, color: "#3F2D20" }}>
              Fifty portraits, numbered one to fifty, building a public archive of the city's
              ordinary, extraordinary voices — neighbours, makers, organisers. Not influencers.
              Not celebrities. People you'd recognise before you'd follow.
            </Text>
            <Box mt={26} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button component={Link} to="/submit" color="petrol" variant="filled">
                Tell your story
              </Button>
              <Button component={Link} to="/stories" color="petrol" variant="subtle">
                See the archive →
              </Button>
            </Box>
          </div>
          <Box
            style={{
              aspectRatio: "5/4",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)",
            }}
          >
            <img src={img1} alt="The travelling chair" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
        </Box>

        <Box pb="clamp(48px, 7vw, 72px)">
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="clamp(16px, 2.5vw, 28px)">
            {STEPS.map((s) => (
              <Box
                key={s.n}
                style={{
                  backgroundColor: "#FCF8F0",
                  border: "1px solid #E0D3B8",
                  borderRadius: 12,
                  padding: "26px 24px",
                }}
              >
                <Text
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#C26B4A",
                    letterSpacing: "0.1em",
                  }}
                >
                  {s.n}
                </Text>
                <Text
                  component="h4"
                  style={{
                    fontFamily: '"Newsreader", Georgia, serif',
                    fontWeight: 600,
                    fontSize: 20,
                    color: "#211A12",
                    margin: "12px 0 8px",
                  }}
                >
                  {s.title}
                </Text>
                <Text style={{ fontSize: 15, lineHeight: 1.6, color: "#3F2D20" }}>{s.body}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box pb="clamp(48px, 7vw, 72px)">
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing={12}>
            {[img1, img2, img3, img4].map((src, i) => (
              <Box
                key={i}
                style={{
                  aspectRatio: "1",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 1px 2px rgba(38,26,18,.06)",
                }}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box pb="clamp(48px, 7vw, 72px)">
          <Card shadow="sm" padding="lg">
            <Box
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 28,
                justifyContent: "space-between",
              }}
            >
              <div style={{ maxWidth: "32ch" }}>
                <Text
                  component="h3"
                  style={{
                    fontFamily: '"Newsreader", Georgia, serif',
                    fontSize: 22,
                    color: "#211A12",
                    margin: "0 0 8px",
                  }}
                >
                  The archive is {collected} of {TARGET}, and growing.
                </Text>
                <Text style={{ color: "#6A5440", lineHeight: 1.6 }}>
                  Every session adds a voice. Want to be one of them, or point us toward
                  someone who should be?
                </Text>
              </div>
              <Box style={{ minWidth: 240, flex: 1 }}>
                <ProgressCounter count={collected} total={TARGET} size="md" />
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>

      <style>{`@media (max-width: 860px) { .ct-about-hero { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
