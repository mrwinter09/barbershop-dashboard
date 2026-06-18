# ClipperTakes Studio — Design System

The brand and UI system for **ClipperTakes Studio**, a Rotterdam community storytelling
project. A travelling barber chair moves through the city; people sit down, the clippers
start, and the founder — **Ivan Winter**, a barber and theatre maker — asks one question.
Each conversation becomes a short audiovisual portrait. The goal is **50 portraits**, each
numbered (*Story 07 / 50*), building a public archive of Rotterdam voices.

This design system dresses an existing React/Mantine app (originally a barbershop booking
dashboard) as an **independent Dutch cultural platform** — a documentary archive crossed
with a neighbourhood notice board. It is deliberately **not** a SaaS dashboard.

> **Two jobs at once.** (A) *Funding credibility* — a VSBfonds-style reviewer must grasp
> "people, stories, a Rotterdam neighbourhood" in under ten seconds, with the **23 / 50**
> counter as the unmissable proof of a living project. (B) *A community staple* — a place
> Rotterdam returns to: leaving a reflection on a story, recommending who sits in the chair
> next. Light, genuine activity reads as stronger validation than a polished static archive.

---

## Sources

- **Brief:** `uploads/ClipperTakes-Studio-Design-Brief.md` (v2) — the controlling document.
- **Underlying app structure (reused logic, discarded visuals):**
  GitHub `mrwinter09/barbershop-dashboard` — https://github.com/mrwinter09/barbershop-dashboard
  React 19 + Vite + TS, Mantine v8, TanStack Query, Formik + Zod/Yup, React Router,
  `localStorage`-backed fake API. The *appointment → story* and *client → participant*
  entity mapping comes from here. Explore it to wire the redesign onto the real hooks.

The v1 pass reverse-engineered that repo's *visual* language (monochrome ink + Mantine blue,
"Barber OS", scheduled/completed badges). **v2 throws all of that out** and keeps only the
structural component patterns (card, form, list, counter, status state).

---

## What's in here (index)

| Path | What |
|---|---|
| `styles.css` | Global entry — `@import` manifest only. Consumers link this one file. |
| `tokens/` | `colors.css` · `typography.css` · `fonts.css` · `spacing.css` · `effects.css` · `base.css` |
| `components/core/` | Button, Card, Badge, Avatar |
| `components/forms/` | TextInput, Select, Switch |
| `components/story/` | **StoryCard, ProgressCounter, StoryStatusTag, NeighborhoodTag, ReflectionItem, ReflectionForm** |
| `guidelines/` | Foundation specimen cards (colors, type, spacing, brand) |
| `ui_kits/site/` | The ClipperTakes platform — Home, Stories Board, Story detail, About, Submit, Recommend |
| `assets/img/` | Warm session photography (placeholders — swap for real ClipperTakes shots) |
| `SKILL.md` | Agent-Skill manifest for downloading into Claude Code |

Components are consumed as `window.KiruBarbershopDesignSystem_db9aa3.<Name>` (the namespace
is a legacy internal handle from the project's original title; it has no user-facing meaning).

---

## Content fundamentals — how ClipperTakes writes

**Voice:** Dutch, contemporary, cultural, independent, warm, editorial, human. Tactile, not
slick. Reference register: De Correspondent, Vers Beton, WORM, VPRO, Nieuwe Instituut.

- **Address:** speak *to* the reader and *for* the project — "we ask one question",
  "tell us who you are". Warm and plain, never corporate-plural or hypey.
- **Invitational, never transactional.** "Tell your story", "Point us toward someone",
  "Send it in" — **never** "Book now", "Sign up", "Save appointment", "Submit booking".
- **Editorial brevity.** Headlines are short and declarative: *"50 Conversations. One City."*,
  *"A barbershop is where a neighbourhood talks to itself."* Body copy is 2–3 sentences.
- **The number is sacred.** Always *"Story 07 / 50"* and *"23 / 50 Stories Collected"* —
  the count is the spine of the whole project, not decoration.
- **Casing:** sentence case everywhere. Mono overlines are UPPERCASE with wide tracking
  ("ROTTERDAM · 2026"). Serif headlines never shout in all-caps.
- **No dashboard vocabulary.** A story is not a booking; a participant is not a client;
  status is *upcoming / published / withdrawn*, never *scheduled / completed / no-show*.
- **Emoji:** none. A single ✓ glyph appears only on a form's success state.
- **Spelling:** British/Dutch-English flavour ("neighbourhood", "colour" optional) is fine
  and on-brand; keep it consistent within a surface.

**Examples in use** — hero lead: *"A barber chair travels through Rotterdam. People sit down,
the clippers start, and we ask one question."* · Submit success: *"You're pencilled in as
Story 24 / 50, waiting in the chair."* · Reflections prompt: *"Leave a short response — a
sentence is plenty. Like a word dropped in the barbershop on your way out."*

---

## Visual foundations

**Palette** (full scales in `tokens/colors.css`; specimens in `guidelines/color-*`):
- **Primary — Petrol** `#15454F`: the deep teal-blue that anchors the brand; CTAs, dark
  bands, the footer (`petrol-900`). **Paper** `#F5EEDF` / `#FCF8F0`: the warm off-white
  ground — *never* clinical white.
- **Secondary — Coffee** `#3F2D20` (body ink), **Clay** `#C26B4A` (terracotta accents,
  roles, the "Takes" in the wordmark), **Moss** `#5E6E44` (published state, quiet greens).
- **Accent — Rotterdam yellow** `#F2C200` (the loud invitation: the *Tell your story*
  button, the "Story NN" stamp, the progress fill on dark) and **warm orange** `#E47B3C`,
  both used sparingly.
- **Story status:** upcoming = clay, published = moss, withdrawn = muted paper.

**Typography** (`tokens/typography.css`, `tokens/fonts.css`):
- **Display — Newsreader** (editorial serif, optical sizing, roman + italic): headlines,
  story names, the question and the answer. Italic carries quotes and teasers.
- **Body — Hanken Grotesk** (clean humanist sans): everything readable, UI, forms.
- **Mono — Space Mono**: story numbers, eyebrows, dates, the counter — an archival,
  catalogued feel. The pairing reads "culture + trust", explicitly not "tech + startup".

**Backgrounds & texture:** a faint warm **paper grain** (`--paper-texture`, an inline SVG
fractal-noise data URI) sits under the body and every card/panel so nothing is flat digital
white. Hero and detail media are full-bleed photography with a petrol-tinted scrim and serif
captions. No gradient blobs, no mesh gradients.

**Photography vibe:** warm, close, documentary — the clippers running, hands, faces, the
travelling chair, real Rotterdam light and grain. Golden-hour / interior warmth. Never flat
product shots, never generic stock. Current `assets/img/*` are placeholders that happen to be
on-concept (a chair, clippers on a neck); **swap in real session photography.**

**Shape language:** corners are nearly square — `radius-sm 3px`, `md 5px`, `lg 8px`,
`xl 12px` (a printed-zine feel), pills only for tags/counter. Borders are warm paper
hairlines (`--border-hairline`), not grey.

**Elevation:** soft, warm, **petrol-tinted** shadows (`--shadow-sm…lg`), never hard grey
drop-shadows. Cards rest on `sm`, lift to `lg` on hover.

**Cards:** warm paper fill + grain + 1px hairline + `radius-lg` + soft shadow. `StoryCard`
adds a 4:5 portrait, a yellow mono number stamp, and an italic answer teaser; it lifts and
its image scales subtly on hover.

**Motion:** calm and human — gentle fades and small lifts (`translateY(-3px)`), image
scale `1.035` on hover, the progress bar animates its fill on mount. Easing
`cubic-bezier(0.16,0.84,0.44,1)`. No springy bounce, no infinite decorative loops.

**Interaction states:** hover deepens petrol / warms yellow / fills outline buttons with
coffee; active nudges down 1px; focus shows a petrol ring (`--ring-focus`). Nav links
underline in Rotterdam yellow when active.

**Transparency & blur:** the sticky nav and the Stories filter bar use a translucent
paper background with `backdrop-filter: blur`. Used only for sticky chrome over content,
nowhere else.

**Layout:** content maxes at 1280px with `clamp()` gutters; sections breathe with
`clamp(48px,7vw,96px)` vertical rhythm. Story grid is `auto-fill minmax(248px,1fr)`.

---

## Iconography

ClipperTakes is **typographic and photographic first** — it leans on the serif/mono pairing,
the paper texture, and real photography far more than on icons. There is no brand icon font.

- **Status & place markers** are simple geometric dots in `currentColor` (the status-tag
  dot, the neighbourhood-tag clay marker, meta separators) — drawn in CSS, not as icon art.
- **The "Story NN / 50" stamp** is the closest thing to a signature mark — a mono label on
  a yellow chip, not a logo glyph.
- **Inline UI glyphs** (a back arrow `←`, a CTA arrow `→`, the success `✓`) are Unicode
  characters set in the type, used sparingly.
- **When you genuinely need line icons** (rare), use **Lucide** (https://lucide.dev) via CDN
  — its calm humanist 2px stroke matches the system. *Substitution flag:* Lucide is a
  suggested match, not an established ClipperTakes icon set; confirm before leaning on it.
- **No emoji** in product UI. **No hand-drawn SVG illustrations** — the brand's "illustration"
  is photography and type.

---

## The story data model (for the Codex implementation step)

Keep it local — `localStorage` or a static JSON array, no backend, no auth, no video
pipeline. The existing app's entities map directly:

| Barbershop app | ClipperTakes |
|---|---|
| appointment | **story** (a numbered portrait entry) |
| client | **participant** |
| scheduled / completed / cancelled | **upcoming / published / withdrawn** |
| `useGetAppointments` / `useCreateAppointment` | `useGetStories` / `useCreateStory` (same storage layer) |

A story entry: `{ id, number, status, name, role, neighborhood, date, image, question,
answer }`. `number` is edited by hand as stories are recorded; published entries count toward
the 50. Submissions from the Submit/Recommend forms land as **upcoming / unpublished**
entries for review — they never auto-publish. `ui_kits/site/data.js` is a worked example.

---

## Fonts — substitution note

The brief specified a *direction* (editorial serif + clean sans, "character, not generic"),
not exact typefaces. The chosen interpretation — **Newsreader**, **Hanken Grotesk**,
**Space Mono** — is served from Google Fonts via `tokens/fonts.css`. Swap in licensed faces
later if desired (e.g. a GT/Production Type display serif); the token aliases
(`--font-serif`, `--font-sans`, `--font-mono`) mean nothing downstream needs to change.

---

## Using the system

Link the one stylesheet and read components off the namespace:

```html
<link rel="stylesheet" href="styles.css" />
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { StoryCard, ProgressCounter, StoryStatusTag } = window.KiruBarbershopDesignSystem_db9aa3;
</script>
```

Each component directory has a `.prompt.md` with a one-line "what & when" and a usage
example. Start from `ui_kits/site/` for full-page composition.

Want to explore the underlying app structure to wire this onto real hooks? See
`mrwinter09/barbershop-dashboard` — the redesign is presentation-layer only.
