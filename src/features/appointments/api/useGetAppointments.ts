/** @format */

import { useQuery } from "@tanstack/react-query";
import {
  AppointmentsListZod,
  type AppointmentFromApi,
} from "../../../lib/appointmentSchema.zod";
import { loadAppointments, saveAppointments } from "./appointments.storage";

async function fetchAppointments(): Promise<AppointmentFromApi[]> {
  const stored = loadAppointments();
  if (stored) {
    const parsed = AppointmentsListZod.parse(stored);
    return parsed;
  }

  const res = await fetch("/appointments.json");
  const json = await res.json();

  const parsed = AppointmentsListZod.parse(json);

  saveAppointments(parsed);

  return parsed;
}

export function useGetAppointments() {
  return useQuery<AppointmentFromApi[]>({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });
}
