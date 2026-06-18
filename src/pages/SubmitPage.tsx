/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Box, Text, TextInput, Textarea, Select, Button } from "@mantine/core";
import { useCreateStory } from "../features/stories/api/useCreateStory";
import { TARGET, NEIGHBORHOODS } from "../features/stories/api/seed";

const ROLES = ["Resident", "Entrepreneur", "Volunteer", "Maker", "Organiser", "Other"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function SubmitPage() {
  const { mutate: createStory } = useCreateStory();
  const [form, setForm] = useState({
    name: "",
    neighborhood: "",
    role: "",
    date: "",
    about: "",
  });
  const [done, setDone] = useState<{ name: string; number: number } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    createStory(
      {
        name: form.name.trim(),
        role: form.role || "Resident",
        neighborhood: form.neighborhood || "Rotterdam",
        date: form.date || "Date to be confirmed",
        question: "What did this city teach you that nobody sat you down to explain?",
        answer: "",
      },
      {
        onSuccess: (story) => {
          setDone({ name: form.name.trim(), number: story.number });
        },
      }
    );
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
            Thank you, {done.name.split(" ")[0]}.
          </Text>
          <Text style={{ color: "#3F2D20", lineHeight: 1.6, maxWidth: "44ch", margin: "12px auto 0" }}>
            You're pencilled in as{" "}
            <strong>Story {pad(done.number)} / {TARGET}</strong>, waiting in the chair. We'll
            reach out to find a time and a place. No haircut is mandatory — but it's encouraged.
          </Text>
          <Button component={Link} to="/stories" color="petrol" variant="outline" mt={28}>
            See the archive →
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
          An invitation — not a booking
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
          Tell us who you are.
        </Text>
        <Text
          mt={16}
          mb={30}
          style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.6, color: "#3F2D20" }}
        >
          If you'd like to sit in the chair, leave a few details and we'll be in touch. There's
          no form to perfect here — just the start of a conversation.
        </Text>

        <Box component="form" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <TextInput
            label="Your name"
            placeholder="First and last"
            value={form.name}
            onChange={set("name")}
            required
          />
          <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="ct-form-grid">
            <Select
              label="Your neighbourhood"
              placeholder="Where in Rotterdam?"
              value={form.neighborhood}
              onChange={(v) => setForm((f) => ({ ...f, neighborhood: v ?? "" }))}
              data={NEIGHBORHOODS}
            />
            <Select
              label="You are a…"
              placeholder="Pick the closest"
              value={form.role}
              onChange={(v) => setForm((f) => ({ ...f, role: v ?? "" }))}
              data={ROLES}
            />
          </Box>
          <TextInput
            label="A time that might suit you"
            type="date"
            value={form.date}
            onChange={set("date")}
            description="Just a rough preference — we'll confirm."
          />
          <Textarea
            label="What might your story be about?"
            placeholder="A sentence or two — what you'd talk about while the clippers run."
            value={form.about}
            onChange={set("about")}
            rows={3}
          />
          <Box style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
            <Button type="submit" color="yellow" variant="filled" size="lg" styles={{ root: { color: "#211A12", fontWeight: 600 } }}>
              Send it in
            </Button>
            <Text size="sm" c="dimmed">We read every one. No spam, ever.</Text>
          </Box>
        </Box>
      </Box>
      <style>{`@media (max-width: 560px) { .ct-form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </Container>
  );
}
