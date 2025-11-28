/** @format */

import { Table, Loader, Center, Text, Badge, Select } from "@mantine/core";
import { useUpdateAppointmentStatus } from "../api/useUpdateAppointmentStatus";
import type { Appointment } from "../types/Appointment";
import {
  serviceLabelByValue,
  barberLabelByValue,
} from "../../../features/appointments/constants";

const statusOptions = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "No show" },
];

interface AppointmentsTableProps {
  appointments: Appointment[];
  isLoading: boolean;
  isError: boolean;
}

export default function AppointmentsTable({
  appointments,
  isLoading,
  isError,
}: AppointmentsTableProps) {
  const { mutate: updateStatus, isPending } = useUpdateAppointmentStatus();

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  if (!appointments.length) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        No appointments yet.
      </Text>
    );
  }

  if (isError) {
    return (
      <Center py="xl">
        <Text c="red">Could not load appointments.</Text>
      </Center>
    );
  }

  if (!appointments.length) {
    return (
      <Center py="xl">
        <Text c="dimmed">No appointments yet. Create your first booking.</Text>
      </Center>
    );
  }

  const rows = appointments.map((appt) => (
    <Table.Tr key={appt.id}>
      <Table.Td>{appt.clientName}</Table.Td>
      <Table.Td>{serviceLabelByValue[appt.service] ?? appt.service}</Table.Td>
      <Table.Td>
        {barberLabelByValue[appt.barberName] ?? appt.barberName}
      </Table.Td>
      <Table.Td>{appt.date}</Table.Td>
      <Table.Td>{appt.time}</Table.Td>
      <Table.Td>
        <Badge
          color={
            appt.status === "scheduled"
              ? "blue"
              : appt.status === "completed"
              ? "green"
              : "red"
          }>
          {appt.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Select
          data={statusOptions}
          value={appt.status}
          size="xs"
          onChange={(value) => {
            if (!value) return;
            updateStatus({
              id: appt.id,
              status: value as Appointment["status"],
            });
          }}
          disabled={isPending}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Client</Table.Th>
          <Table.Th>Service</Table.Th>
          <Table.Th>Barber</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Time</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Confirm</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
