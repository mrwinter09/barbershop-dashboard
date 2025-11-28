/** @format */

import { Modal } from "@mantine/core";
import AppointmentForm from "./AppointmentForm";
import { useCreateAppointment } from "../api/useCreateAppointment";
import type { AppointmentFormValues } from "../validation/appointmentSchema";

interface AddAppointmentModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddAppointmentModal({
  opened,
  onClose,
}: AddAppointmentModalProps) {
  const { mutateAsync, isPending } = useCreateAppointment();

  async function handleSubmit(values: AppointmentFormValues) {
    await mutateAsync(values);
    onClose();
  }

  return (
    <Modal opened={opened} onClose={onClose} title="New appointment" centered>
      <AppointmentForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </Modal>
  );
}
