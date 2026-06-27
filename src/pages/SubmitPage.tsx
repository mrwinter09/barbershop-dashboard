/** @format */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Box, Text, TextInput, Textarea, Select, Button, Switch } from "@mantine/core";
import { useCreateStory } from "../features/stories/api/useCreateStory";
import { NEIGHBORHOODS } from "../features/stories/api/seed";
import { useLang } from "../i18n";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function SubmitPage() {
  const { mutate: createStory } = useCreateStory();
  const { t } = useLang();

  const ROLES = [
    t("role_resident"),
    t("role_entrepreneur"),
    t("role_volunteer"),
    t("role_maker"),
    t("role_organiser"),
    t("role_other"),
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    neighborhood: "",
    role: "",
    date: "",
    about: "",
  });
  const [touch, setTouch] = useState(false);
  const [filmed, setFilmed] = useState(false);
  const [done, setDone] = useState<{ name: string; number: number } | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const FORMSPREE = import.meta.env.VITE_FORMSPREE_URL as string | undefined;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    if (FORMSPREE) {
      await fetch(FORMSPREE, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, stayInTouch: touch, happyToBeFilmed: filmed }),
      }).catch(() => null);
    }
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
            {t("submit_thanks", { name: done.name.split(" ")[0] })}
          </Text>
          <Text style={{ color: "#3F2D20", lineHeight: 1.6, maxWidth: "44ch", margin: "12px auto 0" }}>
            {t("submit_thanks_body", { number: pad(done.number) })}
          </Text>
          <Button component={Link} to="/stories" color="petrol" variant="outline" mt={28}>
            {t("submit_see_archive")}
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
          {t("submit_eyebrow")}
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
          {t("submit_title")}
        </Text>
        <Text
          mt={16}
          mb={30}
          style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.6, color: "#3F2D20" }}
        >
          {t("submit_sub")}
        </Text>

        <Box component="form" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <TextInput
            label={t("submit_name")}
            placeholder={t("submit_name_ph")}
            value={form.name}
            onChange={set("name")}
            required
          />
          <TextInput
            label={t("submit_email")}
            type="email"
            placeholder={t("submit_email_ph")}
            value={form.email}
            onChange={set("email")}
          />
          <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="ct-form-grid">
            <Select
              label={t("submit_hood")}
              placeholder={t("submit_hood_ph")}
              value={form.neighborhood}
              onChange={(v) => setForm((f) => ({ ...f, neighborhood: v ?? "" }))}
              data={NEIGHBORHOODS}
            />
            <Select
              label={t("submit_role")}
              placeholder={t("submit_role_ph")}
              value={form.role}
              onChange={(v) => setForm((f) => ({ ...f, role: v ?? "" }))}
              data={ROLES}
            />
          </Box>
          <Textarea
            label={t("submit_about")}
            placeholder={t("submit_about_ph")}
            description={t("submit_about_hint")}
            value={form.about}
            onChange={set("about")}
            rows={3}
          />
          <Box style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 4 }}>
            <Switch
              label={t("submit_touch")}
              checked={touch}
              onChange={(e) => setTouch(e.currentTarget.checked)}
              color="petrol"
            />
            <Switch
              label={t("submit_filmed")}
              checked={filmed}
              onChange={(e) => setFilmed(e.currentTarget.checked)}
              color="petrol"
            />
          </Box>
          <Box style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
            <Button type="submit" color="yellow" variant="filled" size="lg" styles={{ root: { color: "#211A12", fontWeight: 600 } }}>
              {t("submit_send")}
            </Button>
            <Text size="sm" c="dimmed">{t("submit_no_spam")}</Text>
          </Box>
        </Box>
      </Box>
      <style>{`@media (max-width: 560px) { .ct-form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </Container>
  );
}
