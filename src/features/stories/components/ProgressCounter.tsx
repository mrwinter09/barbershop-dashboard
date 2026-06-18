/** @format */

import { Box, Text, Progress } from "@mantine/core";

interface Props {
  count: number;
  total: number;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
}

export default function ProgressCounter({ count, total, size = "md", onDark }: Props) {
  const pct = Math.round((count / total) * 100);
  const numSize = size === "lg" ? 56 : size === "md" ? 40 : 28;
  const textColor = onDark ? "#FCF8F0" : "#15454F";
  const mutedColor = onDark ? "#A9CACE" : "#5E9099";

  return (
    <Box>
      <Text
        style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: numSize,
          fontWeight: 700,
          color: textColor,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {count}{" "}
        <span style={{ fontSize: numSize * 0.5, color: mutedColor }}>/ {total}</span>
      </Text>
      <Text
        size="xs"
        mt={6}
        style={{
          fontFamily: '"Space Mono", monospace',
          color: mutedColor,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Stories collected
      </Text>
      <Progress
        value={pct}
        color="yellow"
        size="sm"
        mt={10}
        styles={{
          root: { background: onDark ? "rgba(255,255,255,0.12)" : "#E0D3B8" },
        }}
      />
    </Box>
  );
}
