/** @format */

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "nl";

export const translations = {
  en: {
    // Navbar
    nav_home: "Home",
    nav_stories: "The Stories",
    nav_chair: "The Chair",
    nav_recommend: "Recommend someone",
    nav_tell: "Tell your story",
    // Footer
    footer_tagline: "A travelling barber chair collecting fifty voices from Rotterdam, one conversation, one haircut, one story at a time.",
    footer_project: "The project",
    footer_admin: "Studio admin",
    // Home
    home_eyebrow: "Rotterdam · A living archive · 2026",
    home_hero: "50 Voices. One City.",
    home_sub: "A barber chair travels through Rotterdam. People sit down, the clippers start, and we ask one question. The conversation becomes a short portrait, a voice from the neighbourhood, kept for everyone.",
    home_cta: "Explore the stories",
    home_about_btn: "About the chair",
    home_in_chair: "In the chair",
    home_counter_body: "Every story published brings the archive closer to fifty. This is the count a funder, a neighbour, or a future participant sees first.",
    home_recent: "Recently in the chair",
    home_voices: "Voices from the neighbourhood",
    home_see_all: "See all stories →",
    home_where: "Where the chair has been",
    home_where_sub: "Rotterdam, neighbourhood by neighbourhood",
    home_moves: "The chair moves on. Each neighbourhood adds its own accent to the archive.",
    // Stories
    stories_eyebrow: "The archive · {count} of 50 collected",
    stories_title: "The Stories",
    stories_all: "All of Rotterdam",
    // Story detail
    story_not_found: "Story not found.",
    story_back: "Back to the stories",
    story_back_arrow: "← Back to the stories",
    story_reflections: "Reflections",
    story_reflection_placeholder: "Read this story? Leave a short response, a sentence is plenty. Like a word dropped in the barbershop on your way out.",
    story_no_reflections: "No reflections yet. Be the first to respond.",
    story_recommend_cta: "Know who should sit in the chair next? →",
    // About
    about_eyebrow: "The chair · The format · The maker",
    about_hero: "A barbershop is where a neighbourhood talks to itself.",
    about_body1: "ClipperTakes takes that idea on the road. Ivan Winter, a barber and theatre maker, brings a travelling chair to Rotterdam's streets, markets and festivals. You sit down for a haircut. While the clippers run, he asks one question. The conversation becomes a two-to-three minute portrait.",
    about_body2: "Fifty portraits, numbered one to fifty, building a public archive of the city's ordinary, extraordinary voices, neighbours, makers, organisers. Not influencers. Not celebrities. People you'd recognise before you'd follow.",
    about_tell: "Tell your story",
    about_archive: "See the archive →",
    about_step1_title: "The chair arrives",
    about_step1_body: "It travels to a neighbourhood, a market square, a festival, a quiet street corner, and sets up where people already are.",
    about_step2_title: "One question",
    about_step2_body: "You take a seat in the chair. During a real haircut, we ask one question, and give you the time to actually answer it.",
    about_step3_title: "A portrait is kept",
    about_step3_body: "The conversation becomes a short film, numbered and added to the archive of fifty, for the city to keep and come back to.",
    about_count: "The archive is {count} of 50, and growing.",
    about_count_sub: "Every session adds a voice. Want to be one of them, or point us toward someone who should be?",
    // Submit
    submit_eyebrow: "An invitation, not a booking",
    submit_title: "Tell us who you are.",
    submit_sub: "If you'd like to sit in the chair, leave a few details and we'll be in touch. There's no form to perfect here, just the start of a conversation.",
    submit_name: "Your name",
    submit_name_ph: "First and last",
    submit_email: "Email",
    submit_email_ph: "We'll reach out here",
    submit_hood: "Your neighbourhood",
    submit_hood_ph: "Where in Rotterdam?",
    submit_role: "You are a…",
    submit_role_ph: "Pick the closest",
    submit_about: "What might your story be about?",
    submit_about_ph: "A sentence or two, what you'd talk about while the clippers run.",
    submit_about_hint: "Optional, we'll talk more when we meet.",
    submit_touch: "I'd like to stay in touch about the project",
    submit_filmed: "Happy to be filmed in the chair",
    submit_send: "Send it in",
    submit_no_spam: "We read every one. No spam, ever.",
    submit_thanks: "Thank you, {name}.",
    submit_thanks_body: "You're pencilled in as Story {number} / 50, waiting in the chair. We'll reach out to find a time and a place. No haircut is mandatory, but it's encouraged.",
    submit_see_archive: "See the archive →",
    // Recommend
    recommend_title: "Help us decide who's next",
    recommend_sub: "Know a Rotterdammer whose story deserves the chair? Tell us about them. This is how the archive stays the city's, not ours.",
    recommend_who: "Who should we speak to?",
    recommend_name: "Their name",
    recommend_how: "How do you know them?",
    recommend_how_ph: "Neighbour, colleague, the baker on your corner…",
    recommend_why: "Why does their story matter?",
    recommend_why_hint: "One or two sentences is plenty.",
    recommend_your_name: "Your name (optional)",
    recommend_your_name_hint: "So we can thank you",
    recommend_send: "Send recommendation",
    recommend_private: "Goes to us privately, nothing is published automatically.",
    recommend_thanks: "Noted, thank you.",
    recommend_thanks_body: "We'll look into {name}. Rotterdam helps decide who sits in the chair next, and that's exactly how it should be.",
    recommend_back: "Back to the archive →",
    // 404
    not_found_title: "404 · Not found",
    not_found_body: "This page doesn't exist.",
    not_found_home: "Go back home",
    // Roles
    role_resident: "Resident",
    role_entrepreneur: "Entrepreneur",
    role_volunteer: "Volunteer",
    role_maker: "Maker",
    role_organiser: "Organiser",
    role_other: "Other",
  },
  nl: {
    // Navbar
    nav_home: "Home",
    nav_stories: "De Verhalen",
    nav_chair: "De Stoel",
    nav_recommend: "Iemand aandragen",
    nav_tell: "Vertel je verhaal",
    // Footer
    footer_tagline: "Een reizende kappersstoel die vijftig stemmen verzamelt uit Rotterdam, één gesprek, één knipbeurt, één verhaal tegelijk.",
    footer_project: "Het project",
    footer_admin: "Studio beheer",
    // Home
    home_eyebrow: "Rotterdam · Een levend archief · 2026",
    home_hero: "50 Stemmen. Één Stad.",
    home_sub: "Een kappersstoel reist door Rotterdam. Mensen gaan zitten, de tondeuse gaat aan, en we stellen één vraag. Het gesprek wordt een kort portret, een stem uit de buurt, bewaard voor iedereen.",
    home_cta: "Bekijk de verhalen",
    home_about_btn: "Over de stoel",
    home_in_chair: "In de stoel",
    home_counter_body: "Elk gepubliceerd verhaal brengt het archief dichter bij de vijftig. Dit is de telling die een financier, een buur of een toekomstige deelnemer als eerste ziet.",
    home_recent: "Onlangs in de stoel",
    home_voices: "Stemmen uit de buurt",
    home_see_all: "Alle verhalen bekijken →",
    home_where: "Waar de stoel is geweest",
    home_where_sub: "Rotterdam, wijk voor wijk",
    home_moves: "De stoel trekt verder. Elke wijk voegt zijn eigen accent toe aan het archief.",
    // Stories
    stories_eyebrow: "Het archief · {count} van 50 verzameld",
    stories_title: "De Verhalen",
    stories_all: "Heel Rotterdam",
    // Story detail
    story_not_found: "Verhaal niet gevonden.",
    story_back: "Terug naar de verhalen",
    story_back_arrow: "← Terug naar de verhalen",
    story_reflections: "Reflecties",
    story_reflection_placeholder: "Dit verhaal gelezen? Laat een korte reactie achter, één zin is genoeg. Als een woord dat je meeneemt uit de kapper.",
    story_no_reflections: "Nog geen reflecties. Wees de eerste die reageert.",
    story_recommend_cta: "Weet jij wie er volgende in de stoel moet? →",
    // About
    about_eyebrow: "De stoel · Het format · De maker",
    about_hero: "Een kapper is de plek waar een buurt met zichzelf praat.",
    about_body1: "ClipperTakes neemt dat idee mee de straat op. Ivan Winter, kapper en theatermaker, brengt een reizende stoel naar de straten, markten en festivals van Rotterdam. Je gaat zitten voor een echte knipbeurt. Terwijl de tondeuse loopt, stelt hij één vraag. Het gesprek wordt een portret van twee à drie minuten.",
    about_body2: "Vijftig portretten, genummerd van één tot vijftig, die samen een openbaar archief vormen van de gewone, buitengewone stemmen van de stad, buren, makers, organisatoren. Geen influencers. Geen beroemdheden. Mensen die je herkent nog voor je ze volgt.",
    about_tell: "Vertel je verhaal",
    about_archive: "Bekijk het archief →",
    about_step1_title: "De stoel arriveert",
    about_step1_body: "Hij reist naar een wijk, een marktplein, een festival, een rustige straathoek, en zet zich op waar mensen al zijn.",
    about_step2_title: "Één vraag",
    about_step2_body: "Je neemt plaats in de stoel. Tijdens een echte knipbeurt stellen we één vraag, en geven we je de tijd om hem echt te beantwoorden.",
    about_step3_title: "Een portret bewaard",
    about_step3_body: "Het gesprek wordt een korte film, genummerd en toegevoegd aan het archief van vijftig, voor de stad om te bewaren en op terug te komen.",
    about_count: "Het archief staat op {count} van 50, en groeit.",
    about_count_sub: "Elke sessie voegt een stem toe. Wil jij er een van zijn, of wijs je ons naar iemand die dat zou moeten zijn?",
    // Submit
    submit_eyebrow: "Een uitnodiging, geen boeking",
    submit_title: "Vertel ons wie je bent.",
    submit_sub: "Als je in de stoel wil zitten, laat dan je gegevens achter en we nemen contact op. Er is hier geen formulier om te perfectioneren, alleen het begin van een gesprek.",
    submit_name: "Je naam",
    submit_name_ph: "Voor- en achternaam",
    submit_email: "E-mail",
    submit_email_ph: "We nemen hier contact op",
    submit_hood: "Je wijk",
    submit_hood_ph: "Waar in Rotterdam?",
    submit_role: "Je bent een…",
    submit_role_ph: "Kies wat het beste past",
    submit_about: "Waar zou je verhaal over kunnen gaan?",
    submit_about_ph: "Een zin of twee, wat je zou bespreken terwijl de tondeuse loopt.",
    submit_about_hint: "Optioneel, we praten er meer over als we elkaar ontmoeten.",
    submit_touch: "Ik wil op de hoogte blijven van het project",
    submit_filmed: "Ik word graag gefilmd in de stoel",
    submit_send: "Insturen",
    submit_no_spam: "We lezen ze allemaal. Geen spam, ooit.",
    submit_thanks: "Bedankt, {name}.",
    submit_thanks_body: "Je staat voorlopig genoteerd als Verhaal {number} / 50, wachtend in de stoel. We nemen contact op om een tijd en plaats te vinden. Een knipbeurt is niet verplicht, maar wel aangeraden.",
    submit_see_archive: "Bekijk het archief →",
    // Recommend
    recommend_title: "Help ons beslissen wie er volgende komt",
    recommend_sub: "Ken je een Rotterdammer wiens verhaal de stoel verdient? Vertel het ons. Zo blijft het archief van de stad, niet van ons.",
    recommend_who: "Met wie moeten we spreken?",
    recommend_name: "Hun naam",
    recommend_how: "Hoe ken je hen?",
    recommend_how_ph: "Buur, collega, de bakker op je hoek…",
    recommend_why: "Waarom is hun verhaal belangrijk?",
    recommend_why_hint: "Één of twee zinnen is genoeg.",
    recommend_your_name: "Je eigen naam (optioneel)",
    recommend_your_name_hint: "Zodat we je kunnen bedanken",
    recommend_send: "Aanbeveling insturen",
    recommend_private: "Gaat privé naar ons, er wordt niets automatisch gepubliceerd.",
    recommend_thanks: "Genoteerd, bedankt.",
    recommend_thanks_body: "We bekijken {name}. Rotterdam helpt beslissen wie er volgende in de stoel zit, en dat is precies zoals het hoort.",
    recommend_back: "Terug naar het archief →",
    // 404
    not_found_title: "404 · Niet gevonden",
    not_found_body: "Deze pagina bestaat niet.",
    not_found_home: "Terug naar home",
    // Roles
    role_resident: "Bewoner",
    role_entrepreneur: "Ondernemer",
    role_volunteer: "Vrijwilliger",
    role_maker: "Maker",
    role_organiser: "Organisator",
    role_other: "Anders",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LangContext = createContext<LangContextType>({
  lang: "nl",
  setLang: () => {},
  t: (key) => key,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("nl");
  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    let str = translations[lang][key] as string;
    if (vars) Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, String(v)); });
    return str;
  };
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() { return useContext(LangContext); }
