/** @format */

import { z } from "zod";

export const AppointmentZod = z.object({
  id: z.string(),
  clientName: z.string(),
  service: z.string(),
  barberName: z.string(),
  date: z.string(),
  time: z.string(),
  status: z.enum(["scheduled", "completed", "cancelled"]),
  notes: z.string().optional().nullable(),
});

export const AppointmentsListZod = z.array(AppointmentZod);

export type AppointmentFromApi = z.infer<typeof AppointmentZod>;
