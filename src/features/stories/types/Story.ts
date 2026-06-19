/** @format */

export type StoryStatus = "upcoming" | "published" | "withdrawn";
export type StoryStage = "draft" | "confirmed" | "shooting" | "producing" | "published";

export interface Story {
  id: string;
  number: number;
  status: StoryStatus;
  stage?: StoryStage;
  checklist?: Record<string, boolean>;
  contactEmail?: string;
  appointmentDate?: string;
  name: string;
  role: string;
  neighborhood: string;
  date: string;
  image?: string;
  video?: string;
  question: string;
  answer: string;
  about?: string;
  link?: string;
  keep?: boolean;
  fromRecommendation?: string;
}

export interface Reflection {
  text: string;
  name?: string;
  neighborhood?: string;
  date: string;
}

export interface Recommendation {
  id: string;
  who: string;
  how?: string;
  why: string;
  from?: string;
  date: string;
  status: "new" | "reviewed" | "picked-up" | "declined";
}
