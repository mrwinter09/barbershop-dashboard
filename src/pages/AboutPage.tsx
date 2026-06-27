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
import { useLang } from "../i18n";

export default function AboutPage() {
  const { data: stories = [] } = useGetStories();
  const collected = stories.filter((s) => s.status === "published").length;
  const { t } = useLang();

  const STEPS = [
    { n: "01", title: t("about_step1_title"), body: t("about_step1_body") },
    { n: "02", title: t("about_step2_title"), body: t("about_step2_body") },
    { n: "03", title: t("about_step3_title"), body: t("about_step3_body") },
  ];

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
              {t("about_eyebrow")}
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
              {t("about_hero")}
            </Text>
            <Text
              mt={20}
              style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.65, color: "#3F2D20" }}
            >
              {t("about_body1")}
            </Text>
            <Text mt={16} style={{ lineHeight: 1.65, color: "#3F2D20" }}>
              {t("about_body2")}
            </Text>
            <Box mt={26} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Button component={Link} to="/submit" color="petrol" variant="filled">
                {t("about_tell")}
              </Button>
              <Button component={Link} to="/stories" color="petrol" variant="subtle">
                {t("about_archive")}
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
                  {t("about_count", { count: collected })}
                </Text>
                <Text style={{ color: "#6A5440", lineHeight: 1.6 }}>
                  {t("about_count_sub")}
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
