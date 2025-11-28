/** @format */

export const serviceOptions = [
  { value: "fade_beard_trim", label: "Fade + Beard trim" },
  { value: "cut_style", label: "Cut & Style" },
  { value: "buzz_cut", label: "Buzz cut" },
  { value: "kids_cut", label: "Kids cut" },
] as const;

export const barberOptions = [
  { value: "kami", label: "Kami" },
  { value: "kiru", label: "Kiru" },
  { value: "ivan", label: "Ivan" },
] as const;

export const serviceLabelByValue = Object.fromEntries(
  serviceOptions.map((o) => [o.value, o.label])
) as Record<string, string>;

export const barberLabelByValue = Object.fromEntries(
  barberOptions.map((o) => [o.value, o.label])
) as Record<string, string>;
