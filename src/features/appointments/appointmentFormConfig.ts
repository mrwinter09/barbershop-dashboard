/** @format */

export const appointmentFields = [
  {
    type: "text" as const,
    name: "clientName",
    label: "Client name",
  },
  {
    type: "select" as const,
    name: "service",
    label: "Service",
    options: [
      { value: "fade_beard_trim", label: "Fade + Beard trim" },
      { value: "cut_style", label: "Cut & Style" },
      { value: "buzz_cut", label: "Buzz cut" },
      { value: "kids_cut", label: "Kids cut" },
    ],
  },
  {
    type: "select" as const,
    name: "barberName",
    label: "Barber",
    options: [
      { value: "kami", label: "Kami" },
      { value: "kiru", label: "Kiru" },
      { value: "ivan", label: "Ivan" },
    ],
  },
  {
    type: "date" as const,
    name: "date",
    label: "Date",
  },
  {
    type: "time" as const,
    name: "time",
    label: "Time",
  },
  {
    type: "textarea" as const,
    name: "notes",
    label: "Notes",
  },
];
