/** @format */

import { Modal } from "@mantine/core";
import UserForm from "./UserForm";
import { useCreateUser } from "../api/useCreateUser";
import type { UserFormValues } from "../validation/userSchema";

interface AddUserModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function AddUserModal({ opened, onClose }: AddUserModalProps) {
  const { mutateAsync, isPending } = useCreateUser();

  async function handleSubmit(values: UserFormValues) {
    await mutateAsync(values);
    onClose();
  }

  return (
    <Modal opened={opened} onClose={onClose} title="New client" centered>
      <UserForm onSubmit={handleSubmit} isSubmitting={isPending} />
    </Modal>
  );
}
