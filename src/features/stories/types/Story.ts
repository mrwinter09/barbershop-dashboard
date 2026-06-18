/** @format */

export type StoryStatus = "upcoming" | "published" | "withdrawn";

export interface Story {
  id: string;
  number: number;
  status: StoryStatus;
  name: string;
  role: string;
  neighborhood: string;
  date: string;
  image?: string;
  question: string;
  answer: string;
}

export interface Reflection {
  text: string;
  name?: string;
  neighborhood?: string;
  date: string;
}
