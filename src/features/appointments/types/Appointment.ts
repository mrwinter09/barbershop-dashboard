/** @format */

export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  clientId?: number;
  clientName: string;
  service: string;
  date: string;
  time: string;
  barberName: string;
  notes?: string | null;
  status: AppointmentStatus;
}

export interface AppointmentFormValues {
  clientName: string;
  service: string;
  barberName: string;
  date: string;
  time: string;
  notes?: string | null;
}
