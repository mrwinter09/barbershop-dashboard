/** @format */

import { Box, Text } from "@mantine/core";
import type { Reflection } from "../types/Story";

export default function ReflectionItem({ text, name, neighborhood, date }: Reflection) {
  return (
    <Box py="md" style={{ borderBottom: "1px solid #E0D3B8" }}>
      <Text
        style={{
          fontFamily: '"Newsreader", Georgia, serif',
          fontStyle: "italic",
          fontSize: 16,
          color: "#3F2D20",
          lineHeight: 1.6,
        }}
      >
        "{text}"
      </Text>
      <Text
        size="xs"
        mt={6}
        style={{
          fontFamily: '"Space Mono", monospace',
          color: "#9C8466",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {name ?? "Anonymous"}
        {neighborhood ? ` · ${neighborhood}` : ""}
        {date ? ` · ${date}` : ""}
      </Text>
    </Box>
  );
}
