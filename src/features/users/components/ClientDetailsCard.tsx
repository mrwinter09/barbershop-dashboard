/** @format */

import { Card, Group, Text, Badge, Stack } from "@mantine/core";
import type { User } from "../api/useUsers";

interface ClientDetailsCardProps {
  user: User | null;
}

export default function ClientDetailsCard({ user }: ClientDetailsCardProps) {
  if (!user) {
    return (
      <Card withBorder radius="md" p="md" mb="md">
        <Text c="dimmed">Select a client to see details.</Text>
      </Card>
    );
  }

  const { address } = user;

  return (
    <Card withBorder radius="md" p="md" mb="md">
      <Group justify="space-between" mb="xs">
        <Text fw={600}>{user.name}</Text>
        {address && <Badge variant="light">{address.city}</Badge>}
      </Group>

      <Stack gap={4}>
        <Text size="sm">
          <Text span fw={500}>
            Email:{" "}
          </Text>
          {user.email}
        </Text>

        {user.username && (
          <Text size="sm">
            <Text span fw={500}>
              Username:{" "}
            </Text>
            {user.username}
          </Text>
        )}

        {user.phone && (
          <Text size="sm">
            <Text span fw={500}>
              Phone:{" "}
            </Text>
            {user.phone}
          </Text>
        )}

        {address && (
          <Text size="sm">
            <Text span fw={500}>
              Address:{" "}
            </Text>
            {address.street}, {address.suite}, {address.zipcode}
          </Text>
        )}

        {user.website && (
          <Text size="sm">
            <Text span fw={500}>
              Website:{" "}
            </Text>
            {user.website}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
