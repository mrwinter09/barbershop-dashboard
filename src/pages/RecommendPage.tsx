/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Box, Text, TextInput, Textarea, Button } from "@mantine/core";
import { loadRecommendations, saveRecommendations } from "../features/stories/api/stories.storage";

export default function RecommendPage() {
  const [form, setForm] = useState({ who: "", how: "", why: "", from: "" });
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.who.trim() || !form.why.trim()) return;
    const rec = {
      id: crypto.randomUUID(),
      who: form.who.trim(),
      how: form.how.trim() || undefined,
      why: form.why.trim(),
      from: form.from.trim() || undefined,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(),
      status: "new" as const,
    };
    saveRecommendations([...loadRecommendations(), rec]);
    setDone(true);
  };

  if (done) {
    return (
      <Container size="lg" px="clamp(20px, 5vw, 56px)">
        <Box style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(40px, 6vw, 72px) 0 90px", textAlign: "center" }}>
          <Box
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#DEE3CC",
              color: "#5E6E44",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              marginBottom: 18,
            }}
          >
            ✓
          </Box>
          <Text
            component="h2"
            style={{
              fontFamily: '"Newsreader", Georgia, serif',
              fontWeight: 600,
              fontSize: "clamp(24px, 3vw, 32px)",
              color: "#211A12",
              margin: "0 0 16px",
            }}
          >
            Noted, thank you.
          </Text>
          <Text style={{ color: "#3F2D20", lineHeight: 1.6, maxWidth: "44ch", margin: "12px auto 0" }}>
            We'll look into <strong>{form.who.trim()}</strong>. Rotterdam helps decide who sits
            in the chair next, and that's exactly how it should be.
          </Text>
          <Button component={Link} to="/stories" color="petrol" variant="outline" mt={28}>
            Back to the archive →
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container size="lg" px="clamp(20px, 5vw, 56px)">
      <Box style={{ maxWidth: 640, margin: "0 auto", padding: "clamp(40px, 6vw, 72px) 0 90px" }}>
        <Text
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C26B4A",
          }}
        >
          Help us decide who's next
        </Text>
        <Text
          component="h1"
          mt={12}
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 40px)",
            letterSpacing: "-0.01em",
            color: "#211A12",
            margin: "12px 0 0",
          }}
        >
          Point us toward someone.
        </Text>
        <Text
          mt={16}
          mb={30}
          style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.6, color: "#3F2D20" }}
        >
          Know a Rotterdammer whose story deserves the chair? Tell us about them. This is how
          the archive stays the city's, not ours.
        </Text>

        <Box component="form" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <TextInput
            label="Who should we speak to?"
            placeholder="Their name"
            value={form.who}
            onChange={set("who")}
            required
          />
          <TextInput
            label="How do you know them?"
            placeholder="Neighbour, colleague, the baker on your corner…"
            value={form.how}
            onChange={set("how")}
          />
          <Textarea
            label="Why does their story matter?"
            placeholder="One or two sentences is plenty."
            value={form.why}
            onChange={set("why")}
            rows={3}
            required
          />
          <TextInput
            label="Your name (optional)"
            placeholder="So we can thank you"
            value={form.from}
            onChange={set("from")}
          />
          <Box style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
            <Button type="submit" color="petrol" variant="filled" size="lg">
              Send recommendation
            </Button>
            <Text size="sm" c="dimmed">Goes to us privately, nothing is published automatically.</Text>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
