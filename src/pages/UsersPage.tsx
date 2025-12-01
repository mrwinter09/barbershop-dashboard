/** @format */

import { useState, useMemo } from "react";
import hero from "../assets/hero.jpg";
import {
  Title,
  Text,
  Container,
  Group,
  Paper,
  Button,
  Select,
} from "@mantine/core";

import UsersTable from "../features/users/components/UsersTable";
import { useUsers } from "../features/users/api/useUsers";
import AddUserModal from "../features/users/components/AddUserModal";
import ClientDetailsCard from "../features/users/components/ClientDetailsCard";

export default function UsersPage() {
  const { data, isLoading, isError } = useUsers();
  const [opened, setOpened] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = data ?? [];

  const clientOptions = useMemo(
    () =>
      users.map((user) => ({
        value: String(user.id),
        label: user.name,
      })),
    [users]
  );

  const selectedClient =
    users.find((user) => String(user.id) === selectedClientId) ?? null;

  return (
    <>
      {/* Hero */}
      <div className="relative w-full h-[260px]">
        <img className="w-full h-full object-cover" alt="/" src={hero} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center text-white">
          <Container size="lg">
            <Group justify="space-between">
              <div className="text-center w-full">
                <Title order={2}>Clients dashboard</Title>
                <Text c="white" size="xl">
                  All barbershop clients loaded from the JSONPlaceholder
                  <code> /users</code> API.
                </Text>
              </div>
            </Group>
          </Container>
        </div>
      </div>

      {/* Main content */}
      <Container size="lg" py="xl">
        <Group justify="space-between" mb="md">
          <Select
            placeholder="Select client to view details"
            data={clientOptions}
            value={selectedClientId}
            onChange={setSelectedClientId}
            searchable
            nothingFoundMessage="No clients found"
            w="60%"
          />
          <Button onClick={() => setOpened(true)}>New client</Button>
        </Group>

        <ClientDetailsCard user={selectedClient} />

        <Paper withBorder radius="md" p="md">
          <UsersTable users={users} isLoading={isLoading} isError={isError} />
        </Paper>
      </Container>

      <AddUserModal opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}
