/** @format */

import * as Yup from "yup";

export interface AppointmentFormValues {
  clientName: string;
  service: string;
  barberName: string;
  date: string;
  time: string;
  notes?: string;
}

export const appointmentSchema = Yup.object({
  clientName: Yup.string().required("Client name is required"),
  service: Yup.string().required("Service is required"),
  barberName: Yup.string().required("Barber is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  notes: Yup.string().optional(),
});
