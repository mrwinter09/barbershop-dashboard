/** @format */

const STORAGE_KEY = "appointments-storage";

export function loadAppointments() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveAppointments(data: unknown) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
