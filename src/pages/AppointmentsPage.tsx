/** @format */

import hero from "../assets/hero.jpg";
import { Title, Text, Container, Group, Button, Paper } from "@mantine/core";
import { useGetAppointments } from "../features/appointments/api/useGetAppointments";
import { useState } from "react";
import AppointmentsTable from "../features/appointments/components/AppointmentsTable";
import AddAppointmentModal from "../features/appointments/components/AddAppointmentModel";

export default function AppointmentsPage() {
  const { data, isLoading, isError } = useGetAppointments();
  const [opened, setOpened] = useState(false);

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
                <Title order={2}>Appointments dashboard</Title>
                <Text c="white" size="xl">
                  Manage bookings, see the schedule, and add new appointments.
                </Text>
              </div>
            </Group>
          </Container>
        </div>
      </div>

      {/* Main content */}
      <Container size="lg" py="xl">
        <div className="flex flex-row justify-end mb-8">
          <Button onClick={() => setOpened(true)}>New appointment</Button>
        </div>

        <Paper withBorder radius="md" p="md">
          <AppointmentsTable
            appointments={data ?? []}
            isLoading={isLoading}
            isError={isError}
          />
        </Paper>
      </Container>

      <AddAppointmentModal opened={opened} onClose={() => setOpened(false)} />
    </>
  );
}
