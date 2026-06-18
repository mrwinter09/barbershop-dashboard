# Applying ClipperTakes to the Mantine app

This skill is a **design system + reference**, not a patch. To put it onto the existing
`barbershop-dashboard` codebase (React 19 + Vite + TS + **Mantine v8** + TanStack Query +
React Router, `localStorage`-backed fake API), follow these steps. The goal is to push the
tokens into **Mantine's theme** — not to replace Mantine with the plain-CSS components in
`components/` (those are visual references for anatomy, states and copy).

> Work in this order. After each step, run the app and eyeball it against `ui_kits/site/`.

---

## 0. Orient
- Read `README.md` (voice, color, type, imagery, motion, data model) and the relevant
  `components/*/*.prompt.md`. Keep `ui_kits/site/index.html` open as the visual target.
- The structural rename is the spine of the whole job:
  `appointment → story`, `client → participant`,
  `scheduled / completed / cancelled → upcoming / published / withdrawn`,
  `useGetAppointments/useCreateAppointment → useGetStories/useCreateStory` (same storage).

## 1. Fonts
Add to `index.html` `<head>` (or import in the app entry):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500&family=Hanken+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

## 2. Mantine theme
Replace the current `theme` (the one carrying Mantine blue) with this. Values come straight
from `tokens/colors.css`, `tokens/typography.css`, `tokens/effects.css`.

```ts
import { createTheme, rem } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "petrol",
  primaryShade: 7, // #15454F is index 7 below
  colors: {
    petrol: ["#E9F1F1","#CBDEE0","#A9CACE","#86B0B6","#5E9099","#2A6E79","#1C5862","#15454F","#103840","#0C2A30"],
    paper:  ["#FCF8F0","#F5EEDF","#ECE2CC","#E0D3B8","#CBB994","#B7A079","#9C8466","#7E6A52","#5E4F3E","#3F352A"],
    clay:   ["#FBEFE8","#F1DACB","#E6BFA6","#DDA488","#D08964","#C26B4A","#AE5234","#8E4128","#6E331F","#4F2516"],
    moss:   ["#F1F3E8","#DEE3CC","#C7CFAB","#A9B58E","#8C9B6E","#74855A","#5E6E44","#4C5A34","#3A4527","#28301A"],
    yellow: ["#FBEFBF","#FAE48A","#FFD83E","#FFD22E","#F2C200","#D9AE00","#B89400","#937600","#6E5800","#4A3B00"],
    coffee: ["#F3ECE4","#E2D2C2","#C8AD96","#A9866A","#8A6549","#6A5440","#3F2D20","#322318","#261A12","#1A110B"],
  },
  white: "#FCF8F0",
  black: "#211A12",
  fontFamily: '"Hanken Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace: '"Space Mono", ui-monospace, Menlo, monospace',
  headings: {
    fontFamily: '"Newsreader", Georgia, serif',
    fontWeight: "600",
  },
  defaultRadius: "sm", // Mantine sm ~ our editorial 5px feel; see below
  radius: { xs: rem(3), sm: rem(5), md: rem(8), lg: rem(12), xl: rem(16) },
  shadows: {
    sm: "0 1px 2px rgba(38,26,18,.06), 0 2px 6px rgba(38,26,18,.05)",
    md: "0 2px 4px rgba(38,26,18,.05), 0 8px 20px rgba(38,26,18,.10)",
    lg: "0 6px 12px rgba(38,26,18,.08), 0 18px 40px rgba(12,42,48,.16)",
  },
  components: {
    Button: { defaultProps: { radius: "sm" } },
    Card:   { defaultProps: { radius: "lg", withBorder: true } },
    Badge:  { defaultProps: { radius: "xl" } },
  },
});
```
Accent = Rotterdam **yellow** is loud — use it sparingly (the "Tell your story" CTA, the
"Story NN / 50" stamp, the progress fill on dark). Most buttons stay petrol.

## 3. Global CSS (the paper ground + grain)
Add to the app's global stylesheet (and remove any white `body` background):
```css
:root { --paper-texture: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E"); }
body { background-color: #F5EEDF; background-image: var(--paper-texture); color: #3F2D20; }
```
Use `tokens/*.css` as the source of truth for any custom CSS you add (e.g. story-number
stamps, the question/answer hero) — copy the rules from the matching `components/` file.

## 4. Rebuild the screens
Match `ui_kits/site/` view-for-view, composing Mantine components themed above:
- **Home** — hero ("50 Conversations. One City.") → **ProgressCounter band (23/50)** →
  recent stories → neighbourhoods. (`ui_kits/site/screens.jsx` → `Home`.)
- **Stories Board** — `md` counter + neighbourhood filter row + card grid. (`StoriesBoard`.)
- **Story detail** — portrait + "Story NN / 50" stamp, name, role · neighbourhood · date,
  the **question** then the **answer** in large serif, **reflections built inline**. (`StoryDetail`.)
- **About / The Chair**, **Submit Your Story**, **Recommend Someone** — `ui_kits/site/forms.jsx`.
Rebuild these custom pieces as small components (they're not Mantine primitives): `StoryCard`,
`ProgressCounter`, `StoryStatusTag`, `NeighborhoodTag`, `ReflectionItem`, `ReflectionForm` —
each has a `.jsx` reference + `.prompt.md` in `components/story/`.

## 5. Data + copy
- Reshape the entity: `{ id, number, status, name, role, neighborhood, date, image, question,
  answer }`. `number` is hand-edited; published entries count toward 50. Submit/Recommend
  forms create **upcoming / unpublished** entries for review — never auto-publish. See
  `ui_kits/site/data.js` for the worked shape and seed content.
- Purge all dashboard vocabulary from strings, routes and component names ("Barber OS",
  "appointment", "Book", "Save", "No show"). Copy rules + examples are in `README.md`
  → *Content fundamentals*. Invitational, editorial, sentence-case; no emoji.

## 6. Check
Against `ui_kits/site/`: petrol/paper never reads as white-SaaS; the 23/50 counter is
unmissable; serif headlines + mono numbers are present; nothing says "booking". If a screen
could be mistaken for an appointment tool, it's not done.
