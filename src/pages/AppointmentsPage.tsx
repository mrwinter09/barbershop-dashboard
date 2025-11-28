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
      <div className="relative w-full h-[260px]">
        <img className="w-full h-full object-cover" alt="/" src={hero} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-0 left-0 w-full h-screen bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-screen flex flex-col items-center text-white">
          <Container size="lg" py="xl" my={64}>
            <Group justify="space-between" mb="md">
              <div className="text-center">
                <Title order={2}>Appointments dashboard</Title>
                <Text c="white" size="xl">
                  Manage bookings, see the schedule, and add new appointments.
                </Text>
              </div>
            </Group>
          </Container>
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
      </div>
    </>
  );
}
