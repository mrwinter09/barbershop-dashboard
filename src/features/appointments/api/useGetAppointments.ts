/** @format */

import { useQuery } from "@tanstack/react-query";
import type { Appointment } from "../types/Appointment";

const mockAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "John Doe",
    service: "Fade + Beard trim",
    date: "2025-12-01",
    time: "14:00",
    barberName: "Kiru",
    status: "scheduled",
    notes: "Likes low fade",
  },
  {
    id: "2",
    clientName: "Aya Tanaka",
    service: "Cut & Style",
    date: "2025-12-01",
    time: "15:30",
    barberName: "Kami",
    status: "completed",
  },
];

async function fetchAppointments(): Promise<Appointment[]> {
  return Promise.resolve(mockAppointments);
}

export function useGetAppointments() {
  return useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
  });
}
