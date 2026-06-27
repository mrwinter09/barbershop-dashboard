/** @format */

import { Link } from "react-router-dom";
import { Container, Box, Text, Button } from "@mantine/core";
import { useLang } from "../i18n";

export default function NotFoundPage() {
  const { t } = useLang();

  return (
    <Container size="lg" px="clamp(20px, 5vw, 56px)">
      <Box style={{ maxWidth: 480, margin: "0 auto", padding: "clamp(80px, 12vw, 140px) 0", textAlign: "center" }}>
        <Text
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C26B4A",
            marginBottom: 16,
          }}
        >
          {t("not_found_title")}
        </Text>
        <Text
          component="h1"
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontWeight: 600,
            fontSize: "clamp(32px, 6vw, 56px)",
            color: "#211A12",
            margin: "0 0 16px",
          }}
        >
          {t("not_found_body")}
        </Text>
        <Button component={Link} to="/" color="petrol" variant="filled" size="lg" mt={8}>
          {t("not_found_home")}
        </Button>
      </Box>
    </Container>
  );
}
