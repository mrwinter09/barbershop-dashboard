/** @format */

export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  barberName: string;
  notes?: string;
  status: AppointmentStatus;
}
