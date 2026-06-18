---
name: clippertakes-design
description: Use this skill to generate well-branded interfaces and assets for ClipperTakes Studio, a Rotterdam community storytelling project (a travelling barber chair collecting 50 numbered portrait-stories) — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the platform.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

**Applying this to the existing `barbershop-dashboard` React/Mantine codebase?** Read
`APPLYING.md` — it's a step-by-step guide (Mantine theme code, fonts, global CSS, the
entity rename, screen-by-screen mapping). Do that before editing the repo.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create
static HTML files for the user to view. If working on production code, you can copy assets and read
the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production
code, depending on the need.

## Quick map
- `README.md` — the full design guide: voice, color, type, spacing, imagery, motion, iconography, data model.
- `styles.css` — link this one file to inherit every token (`@import`s `tokens/*`).
- `tokens/` — CSS custom properties: `colors.css`, `typography.css`, `fonts.css`, `spacing.css`, `effects.css`, `base.css`.
- `components/` — React primitives: `core/` (Button, Card, Badge, Avatar), `forms/` (TextInput, Select, Switch), `story/` (StoryCard, ProgressCounter, StoryStatusTag, NeighborhoodTag, ReflectionItem, ReflectionForm). Each has a `.d.ts` + `.prompt.md`.
- `ui_kits/site/` — the full ClipperTakes platform (Home, Stories Board, Story detail, About, Submit, Recommend) to copy and adapt.
- `guidelines/` — foundation specimen cards.
- `assets/img/` — warm session photography (placeholders — swap for real ClipperTakes shots).

## The brand in six rules
1. **Petrol + paper, warm not white.** Deep petrol blue (`#15454F`) anchors; everything sits on warm
   off-white paper (`#F5EEDF`) with a faint grain (`--paper-texture`). Never clinical white, never a
   monochrome ink scale, never a generic UI blue.
2. **Editorial type pairing.** Newsreader serif for headlines / story names / the question & answer;
   Hanken Grotesk sans for body; Space Mono for story numbers, eyebrows and the counter. "Culture +
   trust", not "tech + startup".
3. **The number is the spine.** Always "Story 07 / 50" and "23 / 50 Stories Collected" — the
   ProgressCounter is the single most important element a funder sees.
4. **Photography-led & documentary.** Full-bleed warm session photos with a petrol scrim and serif
   captions. No gradient blobs, no stock, no hand-drawn illustration.
5. **Invitational copy, never transactional.** "Tell your story", "Point us toward someone". Never
   "Book now". A story is not a booking; status is upcoming / published / withdrawn.
6. **Calm, tactile motion.** Soft petrol-tinted shadows, near-square corners, gentle fades and small
   lifts (~260ms). No emoji (one ✓ on form success), no bounce.

When composing screens, reuse the design-system components rather than re-implementing them. Accent
(Rotterdam yellow) is loud — use it sparingly for the primary invitation and the story stamp. If you
need line icons (rare), pull from Lucide (CDN) — but the brand is typographic and photographic first.

This dresses an existing barbershop-booking React/Mantine app as a cultural platform; the
appointment→story and client→participant mapping lives in README.md. Underlying app:
github.com/mrwinter09/barbershop-dashboard.
