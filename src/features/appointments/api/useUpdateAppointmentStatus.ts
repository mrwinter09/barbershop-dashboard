/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Appointment } from "../types/Appointment";

type AppointmentStatus = Appointment["status"];

interface UpdateStatusPayload {
  id: string;
  status: AppointmentStatus;
}

// Fake API for now – just resolves the new status payload
async function updateAppointmentStatus(
  payload: UpdateStatusPayload
): Promise<UpdateStatusPayload> {
  return Promise.resolve(payload);
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: ({ id, status }) => {
      queryClient.setQueryData<Appointment[] | undefined>(
        ["appointments"],
        (old) =>
          old
            ? old.map((appt) => (appt.id === id ? { ...appt, status } : appt))
            : old
      );
    },
  });
}
