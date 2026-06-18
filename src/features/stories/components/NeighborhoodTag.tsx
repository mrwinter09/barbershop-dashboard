/** @format */

import { Button } from "@mantine/core";

interface Props {
  name: string;
  count?: number;
  active?: boolean;
  onClick?: () => void;
}

export default function NeighborhoodTag({ name, count, active, onClick }: Props) {
  return (
    <Button
      variant={active ? "filled" : "outline"}
      color="petrol"
      size="xs"
      radius="xl"
      onClick={onClick}
      styles={{
        root: {
          fontFamily: '"Space Mono", monospace',
          fontSize: 11,
          letterSpacing: "0.04em",
        },
      }}
    >
      {name}{count !== undefined ? ` (${count})` : ""}
    </Button>
  );
}
