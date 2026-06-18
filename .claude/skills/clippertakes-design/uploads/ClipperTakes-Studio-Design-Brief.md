# ClipperTakes Studio — App Redesign Brief (v2)

**For: Claude (Design pass)**
**Next step after this: implementation in Codex, on top of an existing React codebase**
**Author: Ivan Winter, Founder Vereemo / Haar en Hem**

---

## 0. Why this is a v2

A first design pass was run directly against the existing barbershop codebase, and it came back as a faithful reverse-engineering of that codebase's current visual language: monochrome ink scale, a single Mantine blue accent, "Barber OS" dashboard naming, scheduled/completed/no-show status badges. That's a correct read of the *existing app* — but it's the wrong target. It re-skinned a booking dashboard instead of building a community platform.

The instruction for this pass is the opposite: keep the underlying React/Mantine/TanStack component patterns (card, form, list, status badge) because they're structurally reusable, but throw out the visual identity, the color system, and the product framing entirely. Nothing in the final result should read as "barbershop SaaS dashboard with new copy." If a reviewer could mistake a screen for an appointment-booking tool, that screen has failed.

## 1. What this is

I have an existing app — a barbershop appointment dashboard — that I want to repurpose as the live online face of **ClipperTakes Studio**, a Rotterdam community storytelling project.

This is not a request to design something from zero. It's a request to take an existing booking/CRM-style app and reframe it as a cultural storytelling platform, keeping the parts of the underlying logic that already work (a list of "people," a form that creates an entry, a counter of entries) and rebuilding the presentation layer around a completely different emotional register.

The existing app is a barbershop dashboard: appointments, clients, services, a landing page with a hero/offers/plan/shop layout. Functionally, "book an appointment for a client" is structurally the same as "schedule a story session with a participant." That's the frame I want you to work from.

## 2. The actual goal, plainly stated

There are two goals stacked on top of each other, and the design needs to serve both without favoring one over the other visually.

**Goal A — funding credibility.** I'm applying for cultural funding (VSBfonds and similar Dutch funds) for an artistic storytelling project called ClipperTakes. Funders for this category check for an online presence before approving funding. Right now ClipperTakes has no live digital footprint — just a PDF project plan. A fund reviewer landing on the site needs to immediately understand "this is about people, stories, and a Rotterdam neighborhood, not a tech product," in under 10 seconds of scrolling.

**Goal B — becoming a community staple.** A neighborhood barbershop is a fixture: people don't visit once, they come back, they run into each other, they leave knowing something they didn't before. I want this platform to be the digital version of that — not a content archive someone scrolls through once and forgets, but a place Rotterdam keeps coming back to. That means the design has to support return visits and small acts of participation, not just one-time browsing: leaving a reflection on someone's story, pointing us toward the next person who should sit in the chair. The platform should feel like it's *theirs*, not something being broadcast at them.

These two goals are not in tension if the design is honest: a funder who sees genuine, light community activity (a handful of real reflections, a couple of recommended-next-story notes) reads that as stronger validation than a polished but static archive would. So Goal B, done well, directly strengthens Goal A.

## 3. The concept, in one paragraph

ClipperTakes is built around a mobile barber chair that travels through Rotterdam (and later, the Netherlands). The founder, Ivan Winter — a barber and theatre maker — sits people down in the chair and asks them one simple question. The conversation that happens while the clippers are running becomes a short audiovisual portrait (2–3 minutes). The project's goal is to produce 50 of these portraits, each one numbered (Story 1/50, Story 2/50, etc.), building a public archive of voices from Rotterdam: neighbors, entrepreneurs, volunteers, makers, community organizers — not influencers, not celebrities. The emotional throughline is "I know people like this" → "I want to tell my story too."

## 4. What the app needs to actually contain

### 4.1 Stories Board (this is the centerpiece)
A grid/feed of story cards. Each card shows:
- A portrait image or video thumbnail
- The person's name
- Their neighborhood (e.g. Nieuwe Binnenweg, Blijdorp, Delfshaven, Afrikaanderwijk, Noord)
- Their role (resident, entrepreneur, volunteer, organizer, etc.)
- A story number, formatted as **"Story 07 / 50"**

This 07/50 framing is not cosmetic — it's the core mechanic. It visually communicates that this is a living, growing archive with a defined finish line, not an open-ended content feed. The number on each card should be easy for me to update manually as new stories get recorded — I'm not building a backend right now, this needs to work off a simple local data structure I can edit story by story.

### 4.2 Global progress counter
Somewhere prominent (hero or top of the stories board): a large "**23 / 50 Stories Collected**" indicator with a progress bar. This is the single most important visual element for a funder skimming the site — it should be unmissable, and it should update automatically based on however many story entries exist in the data.

### 4.3 Story request / session form
A form where I (or someone I've approached) can submit themselves as a future participant. This reuses the existing appointment-form logic almost directly: instead of booking a haircut, it books a story session. Fields should cover: name, neighborhood, role/occupation, preferred date, a short note on what their story is about, and optionally a way to attach or link a video later (I may upload the raw clip to Instagram first and just need a link/embed field here, not a full video hosting pipeline).

Once someone submits this form, they should show up as a new entry in the Stories Board (initially as "upcoming" / not yet published, then flip to a published story card once the portrait is ready). This is the same state pattern as "scheduled / completed / cancelled" appointments in the existing app, just relabeled.

### 4.4 Individual story page
Clicking a card opens a dedicated page for that story: portrait/video, the one question that was asked, their answer (this is the emotional core of the page — give it room), neighborhood, date, and story number. Should feel like a small documentary page, not a product page.

### 4.5 Neighborhood context
A simple way to see which Rotterdam neighborhoods are represented so far (Blijdorp, Nieuwe Binnenweg, Delfshaven, Afrikaanderwijk, Noord, Rotterdam West, etc.) — doesn't need to be a real interactive map yet, a tagged list or simple visual grouping is enough for this stage.

### 4.6 Reflections on a story
On each individual story page, a lightweight space for visitors to leave a short reflection — a sentence or two, not a comment-section free-for-all. This is the "barbershop conversation" mechanic translated online: someone reads a portrait and adds their own small response to it. Design this as a quiet, considered space (think guestbook, not Twitter replies) — name, one short text field, that's it. No likes, no reply threads, no upvotes. The presence of a few real reflections under a story should feel like proof the project has a pulse, not like social media engagement metrics.

### 4.7 Recommend someone for the chair
A short, separate form (distinct from the "submit your own story" form in 4.3) where anyone — not just future participants — can nominate someone else for a future ClipperTakes session: their name, how the visitor knows them, and a sentence on why their story matters. This is the mechanism that makes the platform feel community-owned rather than founder-curated: Rotterdam is helping decide who sits in the chair next. Treat submissions here the same way the form in 4.3 treats them — they land as a new (unpublished, internal-only) entry I can review, not something that auto-publishes.

## 5. What this must NOT feel like

This is the most important constraint, and the one the previous pass got wrong, so it's worth being blunt about it.

Avoid entirely:
- Corporate SaaS dashboard aesthetics
- Startup/tech landing page tropes (gradient blobs, generic stock photography, oversized rounded buttons)
- Crypto/Web3 visual language
- Dark "hacker" themes
- Anything that reads as a content-marketing or influencer platform
- Anything that looks like it's selling a service or trying to convert a visitor into a customer
- **A monochrome ink scale with a single corporate accent color (e.g. a default UI-library blue).** This was the exact failure mode last time: the visual identity got reverse-engineered straight from the existing barbershop dashboard's current look, which is functional and clean for a booking tool but reads as generic SaaS the moment it's applied to a cultural project. The color system in section 6 below (petrol, coffee brown, clay, moss green, Rotterdam yellow) replaces that monochrome+blue system entirely — it isn't a secondary accent layered on top of it.
- **Dashboard-style naming and microcopy** ("Barber OS," status badges like "Scheduled / Completed / No show," "New appointment," "Save appointment"). None of that vocabulary survives into ClipperTakes. A story is not a booking; a participant is not a client; nobody is checking anyone in.

This is a cultural artifact and a community space, not a SaaS product. A funder should never get the sense they're looking at a startup pitching for users, and a Rotterdammer browsing it should never get the sense they're looking at a tool. They should feel like they've landed on an independent Dutch cultural platform — something closer to a documentary archive crossed with a neighborhood notice board than an app.

## 6. Visual direction

**Tone:** Dutch, contemporary, cultural, independent, warm, editorial, human. Tactile rather than slick.

**Reference points** (for tone, not literal copying): Dutch Design Week, WORM Rotterdam, VPRO, De Correspondent, Vers Beton, Subbacultcha, Nieuwe Instituut, independent Dutch cultural magazines, hip neighborhood cafés.

**Color system:**
- Primary: deep petrol blue, warm off-white
- Secondary: coffee brown, clay, moss green
- Accent: bright Rotterdam yellow, warm orange
- Backgrounds: natural paper-like texture, soft neutral surfaces — should feel physical, not flat-digital

**Typography:**
- Headlines: an editorial serif (something with character, not a generic web-safe serif)
- Body: a clean, legible sans-serif
- The pairing should read as "culture + trust," explicitly not "tech + startup"

**Texture and material:** lean into paper grain, warm photography, slight imperfection. This should feel like it could exist printed as a zine as much as it exists as a website.

## 7. Suggested page structure

**Home / Hero**
A large statement headline — something in the register of "50 Conversations. One City." or "Stories From Rotterdam." Below it, immediately, the progress counter (23/50). Then a short framing paragraph (2–3 sentences max) explaining the barber chair concept in plain language. CTA: "Explore the Stories."

**Stories Board**
The grid of story cards described in 4.1, filterable or sortable by neighborhood if that's not too much added complexity for this pass.

**Individual Story pages**
As described in 4.4, with the reflections space (4.6) built directly into the page — not hidden behind a click or a separate tab. It's part of the story, not an afterthought.

**About / The Chair**
A short page explaining the physical concept — the mobile barber chair, the one-question format, who Ivan Winter is and why a barbershop became an art practice. This is where the "physical meets digital" idea lives: photos from real sessions, explanation of how the chair travels to festivals and events.

**Submit Your Story / Get Involved**
The form from 4.3, framed as an invitation rather than a sales funnel — "Tell us who you are and we'll reach out" rather than "Book now."

**Recommend Someone**
The form from 4.7. This can live as its own small page, or as a secondary tab/section next to "Submit Your Story" — both are invitations into the project, just from different angles (telling your own story vs. pointing at someone else's). Keep them visually related but clearly distinct in their copy, so it's obvious which one a visitor wants.

## 8. Technical context (for continuity into the Codex implementation step)

The existing codebase is React 19 + Vite + TypeScript, using Mantine v8 for UI components, TanStack Query for data fetching, Formik + Zod/Yup for form handling, and React Router for navigation. There is currently no real backend — appointment and client data are persisted to `localStorage` via a small storage utility, and `useGetAppointments` / `useCreateAppointment` hooks wrap that storage layer to mimic an async API.

For this redesign pass, please design with that constraint in mind: the data model should be simple enough to keep living in local storage or a static JSON file for now (no auth, no real backend, no video hosting pipeline). The "appointment" entity becomes a "story" entity; the "client" entity becomes a "participant" entity. Status states like scheduled/completed/cancelled map directly onto something like upcoming/published/withdrawn for a story entry.

I'll hand your design output to Codex afterward to wire up the actual JSX components and adapt the existing hooks/storage layer — so the most useful output from this pass is: page layouts, component breakdown, the visual/design system (colors, type, spacing, card anatomy), and copy direction for headlines and microcopy. You don't need to produce production-ready code, but concrete component structure (what's a card, what's a hero, what's a form) will save a step later.

## 9. Eventual context (not needed now, just so the structure doesn't paint us into a corner)

Down the line this may expand into a "ClipperTakes Studio" layer — events, live recordings, workshops, and a possible physical Rotterdam location. It will technically run on the same underlying infrastructure as Vereemo (my identity-verification company), but the branding must stay fully independent — nobody visiting this should sense a tech company behind it. No need to build any of this now; just don't design something so narrow that an events calendar or a "where's the chair this week" feature couldn't be added later without a rebuild.

## 10. What I actually need from you

1. A clear visual/design system: colors, type pairing, card anatomy, spacing rhythm. **This replaces the monochrome+blue system entirely — see section 5.**
2. Page-by-page layout direction for Home, Stories Board, Story detail (with reflections built in), About, Submit Your Story form, Recommend Someone form.
3. Component breakdown so it maps cleanly onto the existing React structure (StoryCard, ProgressCounter, StoryForm, ReflectionForm, RecommendForm, etc.).
4. Copy direction — headline tone, microcopy tone — short and editorial, never sales-y. No dashboard vocabulary (see section 5).

I'll take this output straight into Codex to build out the actual components on top of the existing app.

## 11. One framing note, for context

The instinct behind this isn't "build another content archive" — it's closer to the idea of a focused, vertical community platform for a specific audience, the way niche communities work for professional or hobby groups (a space built around one group's actual needs, not a generic social feed). The audience here is geographic and cultural rather than professional: Rotterdam, specifically the people who'd recognize themselves in a story before they'd follow an account. A neighborhood barbershop works because it's a fixture people return to, not a venue they visit once — that's the feeling this needs to replicate online. Keep that in mind when making layout and interaction decisions: every choice should ask "does this make someone want to come back," not just "does this look good on first load."
