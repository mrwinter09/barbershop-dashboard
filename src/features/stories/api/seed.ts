/** @format */

import type { Story, Reflection } from "../types/Story";

import img1 from "../../../assets/interior-1.jpg";
import img2 from "../../../assets/hero.jpg";
import img3 from "../../../assets/shop-1.jpg";
import img4 from "../../../assets/interior-2.jpg";
import img5 from "../../../assets/shop-2.jpg";
import img6 from "../../../assets/interior-3.jpg";
import img7 from "../../../assets/shop-3.jpg";
import img8 from "../../../assets/interior-4.jpg";

export const SEED_STORIES: Story[] = [
  {
    id: "1", number: 1, status: "published",
    name: "Fatima El Amrani", role: "Community organizer", neighborhood: "Afrikaanderwijk", date: "14 MAR 2026",
    image: img1,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "The market taught me the whole city in one street. You learn every language by the time you've bought your vegetables. That's Rotterdam, nobody explains it, you just stand in it long enough.",
  },
  {
    id: "2", number: 2, status: "published",
    name: "Thomas Dijkstra", role: "Harbour electrician", neighborhood: "Delfshaven", date: "09 MAR 2026",
    image: img2,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "That you fix the thing in front of you and you don't make a speech about it. The harbour doesn't care how you feel. I like that, honestly. It's honest work and an honest city.",
  },
  {
    id: "3", number: 3, status: "published",
    name: "Sanne Bakker", role: "Baker", neighborhood: "Nieuwe Binnenweg", date: "02 MAR 2026",
    image: img3,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Open early, stay kind. Half my regulars came in sad once and came back because nobody rushed them. A bakery is just an excuse to keep the street talking to itself.",
  },
  {
    id: "4", number: 4, status: "published",
    name: "Joran Visser", role: "Bus driver", neighborhood: "Noord", date: "24 FEB 2026",
    image: img4,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Everybody's carrying something heavier than their bag. You drive the same route ten years, you see the whole life of a neighbourhood through one windscreen.",
  },
  {
    id: "5", number: 5, status: "published",
    name: "Amira Haddad", role: "Nurse", neighborhood: "Blijdorp", date: "17 FEB 2026",
    image: img5,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "How to be calm for two people at once, the patient, and myself. Rotterdam is blunt but it shows up. When it matters, people here show up.",
  },
  {
    id: "6", number: 6, status: "published",
    name: "Wesley Boateng", role: "Football coach", neighborhood: "Rotterdam West", date: "10 FEB 2026",
    image: img6,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Twenty kids, twenty stories, one ball. You learn fast that talent is everywhere and patience is the rare thing. I coach patience more than football.",
  },
  {
    id: "7", number: 7, status: "published",
    name: "Lieke de Wit", role: "Bookshop owner", neighborhood: "Nieuwe Binnenweg", date: "03 FEB 2026",
    image: img7,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "That a small shop is a public service you happen to charge for. People come in for a book and leave something of themselves on the counter. I keep both.",
  },
  {
    id: "8", number: 8, status: "published",
    name: "Mehmet Yılmaz", role: "Greengrocer", neighborhood: "Afrikaanderwijk", date: "27 JAN 2026",
    image: img8,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "Thirty years on the same corner. The city changed around me four times. You stay put and friendly and eventually you're the landmark people give directions by.",
  },
  {
    id: "9", number: 24, status: "upcoming",
    name: "In the chair soon", role: "Maker", neighborhood: "Noord", date: "Recording in April",
    image: img4,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "",
  },
  {
    id: "10", number: 25, status: "upcoming",
    name: "In the chair soon", role: "Volunteer", neighborhood: "Delfshaven", date: "Recording in April",
    image: img3,
    question: "What did this city teach you that nobody sat you down to explain?",
    answer: "",
  },
];

export const SEED_REFLECTIONS: Record<string, Reflection[]> = {
  "1": [
    { text: "I grew up two streets from here. This is exactly how I remember the market on a Saturday.", name: "Sanne", neighborhood: "Afrikaanderwijk", date: "15 MAR 2026" },
    { text: "Made me want to call my grandmother. Thank you for this.", name: "Marco", date: "16 MAR 2026" },
  ],
  "3": [
    { text: "The bakery on the corner really is the heart of the street. Lovely to see it said out loud.", name: "Joost", neighborhood: "Nieuwe Binnenweg", date: "04 MAR 2026" },
  ],
};

export const TARGET = 50;
export const NEIGHBORHOODS = ["Afrikaanderwijk", "Nieuwe Binnenweg", "Delfshaven", "Blijdorp", "Noord", "Rotterdam West"];
