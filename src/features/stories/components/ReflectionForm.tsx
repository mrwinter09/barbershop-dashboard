/** @format */

import { useState } from "react";
import { Textarea, TextInput, Button, Box, Text } from "@mantine/core";

interface Props {
  onSubmit: (r: { text: string; name?: string; neighborhood?: string; date: string }) => void;
}

export default function ReflectionForm({ onSubmit }: Props) {
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({
      text: text.trim(),
      name: name.trim() || undefined,
      date: new Date()
        .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
        .toUpperCase(),
    });
    setSent(true);
  };

  if (sent) {
    return (
      <Box py="md">
        <Text
          style={{
            fontFamily: '"Newsreader", Georgia, serif',
            fontStyle: "italic",
            color: "#5E6E44",
            fontSize: 16,
          }}
        >
          ✓ Your reflection has been added. Thank you.
        </Text>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Textarea
        placeholder="A sentence is plenty. Like a word dropped in the barbershop on your way out."
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        rows={3}
        required
        styles={{ input: { fontFamily: '"Newsreader", Georgia, serif', fontSize: 15 } }}
      />
      <TextInput
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <Box>
        <Button type="submit" color="petrol" variant="outline">
          Leave a reflection
        </Button>
      </Box>
    </Box>
  );
}
