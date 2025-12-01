/** @format */

import { Modal } from "@mantine/core";
import AppointmentForm from "./AppointmentForm";
import { useCreateAppointment } from "../api/useCreateAppointment";
import type { AppointmentFormValues } from "../types/Appointment";
import { useUsers } from "../../users/api/useUsers";

interface AddAppointmentModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddAppointmentModal({
  opened,
  onClose,
}: AddAppointmentModalProps) {
  const { mutateAsync, isPending } = useCreateAppointment();
  const { data: clients } = useUsers();

  async function handleSubmit(values: AppointmentFormValues) {
    await mutateAsync(values);
    onClose();
  }

  return (
    <Modal opened={opened} onClose={onClose} title="New appointment" centered>
      <AppointmentForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        clients={clients ?? []}
      />
    </Modal>
  );
}
