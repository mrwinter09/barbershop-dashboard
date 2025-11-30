/** @format */

import hero from "../assets/hero.jpg";
import { Title, Text, Container, Group, Paper, Button } from "@mantine/core";

import UsersTable from "../features/users/components/UsersTable";
import { useUsers } from "../features/users/api/useUsers";
import { useState } from "react";
import AddUserModal from "../features/users/components/AddUserModal";

export default function AppointmentsPage() {
  const { data, isLoading, isError } = useUsers();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <div className="relative w-full h-[260px]">
        <img className="w-full h-full object-cover" alt="/" src={hero} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-0 left-0 w-full h-screen bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center text-white">
          <Container size="lg" py="xl" my={64}>
            <Group justify="space-between" mb="md">
              <div className="text-center">
                <Title order={2}>Clients dashboard</Title>
                <Text c="white" size="xl">
                  All barbershop clients loaded from the JSONPlaceholder /users
                  API.
                </Text>
              </div>
            </Group>
          </Container>
        </div>

        {/* Main content */}
        <Container size="lg" py="xl">
          <div className="flex flex-row justify-end mb-8">
            <Button onClick={() => setOpened(true)}>New Clients</Button>
          </div>
          <Paper withBorder radius="md" p="md">
            <UsersTable
              users={data ?? []}
              isLoading={isLoading}
              isError={isError}
            />
          </Paper>
        </Container>
        <AddUserModal opened={opened} onClose={() => setOpened(false)} />
      </div>
    </>
  );
}
