/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Appointment } from "../types/Appointment";

export type NewAppointment = Omit<Appointment, "id" | "status"> & {
  status?: Appointment["status"];
};

async function createAppointment(data: NewAppointment): Promise<Appointment> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        status: data.status ?? "scheduled",
        ...data,
      });
    }, 300);
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: (newAppointment) => {
      queryClient.setQueryData<Appointment[] | undefined>(
        ["appointments"],
        (old) => (old ? [...old, newAppointment] : [newAppointment])
      );
    },
  });
}
