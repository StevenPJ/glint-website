# GLINT Website Rebuild — Lovable Site Recreation

## Overview

Replace the current GLINT Astro website with a pixel-perfect recreation of the Lovable site at `glintresearchlondon.lovable.app`. All content will be editable via TinaCMS. The work is split into two stages: first a static Astro rebuild, then CMS integration.

## Reference

- **Target:** https://glintresearchlondon.lovable.app
- **Existing repo:** Astro 5 + React + TinaCMS + Tailwind CSS
- **Hosting:** Vercel (unchanged)

## Clean Slate Approach

This is a full rewrite. We delete `src/`, `tina/`, and `content/` entirely and rebuild from scratch.

**Kept:**
- `package.json` (same dependencies)
- `astro.config.mjs` (same integrations, may need minor edits)
- `astro-tina-directive/` (needed for Stage 2)
- `.env.example`, `.gitignore`, `tsconfig.json`
- `public/` folder (contents replaced with new assets)
- Git and Vercel configuration

**Deleted:**
- `src/` — all pages, components, layouts, styles, content
- `tina/` — all collections, page components, generated types
- `content/` — all project and team MDX files

---

## Stage 1: Static Astro Rebuild

Recreate the Lovable site as pure Astro components with hardcoded content. No CMS, no React. Validate with screenshot comparison against the Lovable site.

### Pages (6 total)

| Page | Route | Key Sections |
|------|-------|--------------|
| Home | `/` | Hero (badge, "GLINT" title, subtitle, 2 CTAs), Stats bar (3 stats — hardcoded numbers), "What We Do" (3 feature cards), Current Projects preview (2 hardcoded cards), "Ready to Get Involved?" CTA, Footer |
| Current Projects | `/current-projects` | Hero banner, 2 project cards each with: title, status badge, description, objectives list, timeline, network info, "Get Involved"/"Interested in Collaborating?" CTA |
| Past Projects | `/past-projects` | Hero banner, Publications section (5 papers with authors/journal/year/DOI), Conference Presentations section |
| Events | `/events` | Hero banner, Upcoming Events (card with badges, date, time, location, description), Past Events (compact list with year and status), "Don't Miss Our Next Event" CTA |
| About Us | `/about` | Hero banner, Our Mission, Our Values (3 cards: Collaboration, Excellence, Development), Our Team (10 member cards with photo/initials, name, role, bio) |
| Contact | `/contact` | Hero banner, "Join Our Network" form (name, email, institution, area of interest, message), "Why Join GLINT?" sidebar with 5 benefits, "Connect With Us" (email + Twitter) |

### Navigation

Fixed header with: GLINT logo (left), nav links (Home, Current Projects, Past Projects, Events, About Us, Contact). Sticky on scroll with white background + subtle shadow. Mobile hamburger menu.

### Footer

3-column layout on dark background:
- Left: "G GLINT" square logo + description text
- Middle: Quick Links (Current Projects, Past Projects, Events, About Us)
- Right: Connect ("Join Our Mailing List" link pointing to `/contact`, Twitter icon, Email icon)
- Bottom bar: "© 2026 GLINT. All rights reserved."

Footer is hardcoded — not CMS-editable.

### Visual Design

**Color palette (from Lovable — exact values to be extracted from CSS bundle in Stage 1):**
- Hero/CTA gradient: dark teal-to-navy (approximately `#1a3a4a` to `#0f2a36`)
- Hero pattern: repeating translucent circle/ring SVG overlay
- Body background: light gray (`#f8f9fa` range)
- Cards: white `#ffffff` with subtle border (no heavy shadow)
- Primary text: dark navy
- Muted text: medium gray
- Badge backgrounds: light teal tint
- Badge text: teal/dark teal

**Typography (to be confirmed from Lovable CSS bundle early in Stage 1):**
- Headings: Bold serif font (likely Playfair Display — must confirm before building)
- "GLINT" hero title: extra bold serif, very large
- Body: sans-serif (Inter or system)
- Section headings: bold serif
- Card text: sans-serif

**Layout patterns:**
- Every page has a full-width dark teal gradient hero with white text
- Home page: wave/curve SVG divider between hero and stats section
- Cards have light borders, subtle rounded corners, no heavy shadows
- Feature icons: outlined icons in light blue-tinted rounded squares
- Status badges: small rounded pills with tinted backgrounds
- Dark background CTAs: white outline buttons
- Light background CTAs: teal/dark solid buttons

### Assets to Download

From the Lovable site:
- Logo (header — GLINT swan/scope icon + "GLINT" text + subtitle)
- Footer logo ("G" square + "GLINT" text, white version)
- Favicon
- Team member photos (if any are real images vs. initials)

Icons are inline SVGs — recreated in code.

### Contact Form

- Route: `/contact`
- Fields: Full Name*, Email Address*, Institution/Hospital, Area of Interest, Message (Optional)
- Submit to: `https://formspree.io/f/xrezokpn` (existing endpoint)
- Hidden field: `_subject` = "GLINT Website Contact Form"
- No mailing list tool integration — Formspree handles email delivery

### Stage 1 File Structure

```
src/
  layouts/
    BaseLayout.astro          — html/head/body shell
  components/
    Header.astro              — fixed nav with mobile menu
    Footer.astro              — 3-column footer
    HeroBanner.astro          — reusable dark teal hero (title, subtitle props)
  pages/
    index.astro               — Home
    current-projects.astro    — Current Projects
    past-projects.astro       — Past Projects
    events.astro              — Events
    about.astro               — About Us
    contact.astro             — Contact
  styles/
    global.css                — Tailwind + custom theme + component styles
public/
  logo.svg                    — Header logo
  logo-footer.svg             — Footer logo
  favicon.ico                 — Favicon
```

### Stage 1 Validation

For each page:
1. Take screenshot of Lovable page (full page, scrolled)
2. Take screenshot of our Astro page at same viewport
3. Compare side-by-side
4. Fix discrepancies and re-screenshot
5. Iterate until they match

---

## Stage 2: TinaCMS Integration

Convert hardcoded Astro components into CMS-driven React components. All page text and collection data becomes editable via TinaCMS UI.

### Collections (5 total)

All collection content lives under `content/` (TinaCMS convention). Page content lives under `src/content/page/` (Astro content convention). This split is inherited from TinaCMS + Astro integration patterns.

#### 1. `page` — Page Content

Uses TinaCMS `templates` to give each page its own field set, so CMS editors only see fields relevant to the page they're editing.

- **Path:** `src/content/page`
- **Format:** MDX
- **Documents:** `home`, `current-projects`, `past-projects`, `events`, `about`, `contact`

**Home page template fields:**
- `seoTitle`, `seoDescription`
- `heroBadge` (string — "Trainee-Led Gastroenterology Research")
- `heroTitle` (string — "GLINT")
- `heroSubtitle` (string)
- `heroCTA1Text`, `heroCTA1Link` (Explore Our Research button)
- `heroCTA2Text`, `heroCTA2Link` (Join Our Network button)
- `stats` (object list: `value` string, `label` string) — e.g. {value: "5", label: "Publications"}
- `whatWeDoTitle`, `whatWeDoSubtitle`
- `whatWeDoCards` (object list: `icon` select, `title`, `description`)
- `currentProjectsTitle`, `currentProjectsSubtitle`
- `ctaTitle`, `ctaSubtitle`, `ctaCTA1Text`, `ctaCTA1Link`, `ctaCTA2Text`, `ctaCTA2Link`

**Current Projects page template fields:**
- `seoTitle`, `seoDescription`
- `heroTitle`, `heroSubtitle`
- `ctaTitle`, `ctaSubtitle`, `ctaButtonText`, `ctaButtonLink`

(Project cards are driven by the `project` collection.)

**Past Projects page template fields:**
- `seoTitle`, `seoDescription`
- `heroTitle`, `heroSubtitle`

(Content driven by `publication` collection.)

**Events page template fields:**
- `seoTitle`, `seoDescription`
- `heroTitle`, `heroSubtitle`
- `ctaTitle`, `ctaSubtitle`, `ctaButtonText`, `ctaButtonLink`

(Event cards driven by `event` collection.)

**About page template fields:**
- `seoTitle`, `seoDescription`
- `heroTitle`, `heroSubtitle`
- `missionTitle`, `missionContent` (textarea)
- `valuesTitle`
- `values` (object list: `icon` select, `title`, `description`)
- `teamTitle`, `teamSubtitle`

(Team cards driven by `team` collection.)

**Contact page template fields:**
- `seoTitle`, `seoDescription`
- `heroTitle`, `heroSubtitle`
- `formTitle`, `formSubtitle`
- `sidebarTitle`
- `benefits` (object list: `text` string) — the "Why Join GLINT?" items
- `connectEmail`, `connectTwitter`

#### 2. `project` — Current Projects
- **Path:** `content/projects`
- **Format:** MDX
- **Fields:**
  - `title` (string, isTitle, required)
  - `status` (string, required, options: Data Collection / Write-Up Phase / Data Analysis / Completed / Upcoming)
  - `description` (string, textarea) — full project description paragraph
  - `objectives` (object list) — each with a `text` string field
  - `timeline` (string) — e.g. "2025 - Ongoing"
  - `network` (string) — e.g. "10+ London centres"
  - `milestone` (string, optional) — single notable milestone, e.g. "Presented at MESSE Conference, Berlin, October 2025"
  - `order` (number) — lower numbers appear first

Note: The Lovable site does not have individual project detail pages. Projects are shown as expanded cards on the Current Projects page.

#### 3. `team` — Team Members
- **Path:** `content/team`
- **Format:** MDX
- **Fields:**
  - `name` (string, isTitle, required)
  - `role` (string, required) — e.g. "Chair", "Vice Chair", "South London Representative"
  - `initials` (string) — 1-2 character fallback when no photo (e.g. "CP")
  - `bio` (string, textarea) — the paragraph displayed on the card
  - `image` (image) — optional headshot
  - `order` (number) — lower numbers appear first

Note: The existing `memberType`, `region`, `interests`, `email`, and `twitter` fields are intentionally not carried over — the Lovable design does not use them. All members shown are current committee members.

#### 4. `event` — Events
- **Path:** `content/events`
- **Format:** MDX
- **Fields:**
  - `title` (string, isTitle, required)
  - `date` (datetime, required)
  - `time` (string) — e.g. "TBC", "18:00-20:00"
  - `location` (string) — e.g. "Central London"
  - `status` (string, required, options: Coming Soon / Open / Sold Out)
  - `isFree` (boolean) — shows "Free" badge when true
  - `description` (string, textarea)
  - `url` (string, optional) — external link for registration/tickets
  - `order` (number)

Events are split into upcoming vs past based on comparing `date` to the current date at build time. Since the site is statically built on Vercel, events will transition from upcoming to past on the next deploy after their date passes. For time-sensitive transitions, trigger a Vercel redeploy (e.g. via a daily cron or manual deploy).

#### 5. `publication` — Publications & Presentations
- **Path:** `content/publications`
- **Format:** MDX
- **Fields:**
  - `title` (string, isTitle, required)
  - `type` (string, required, options: Publication / Conference Presentation)
  - `authors` (string) — full author string
  - `journal` (string) — journal name (publications only)
  - `year` (string)
  - `volume` (string) — e.g. "2(6):309-317" (publications only)
  - `doi` (string) — e.g. "10.1002/ygh2.427" (publications only)
  - `venue` (string, description: "Where the paper was presented") — conference presentations only
  - `venueDate` (string, description: "When the paper was presented, e.g. October 2025") — conference presentations only
  - `order` (number) — lower numbers appear first

Displayed on Past Projects page, grouped by `type` (Publications section, then Conference Presentations section).

### CMS Page Architecture

Each Astro page (`.astro`) will:
1. Fetch page content from TinaCMS via the generated client
2. Fetch relevant collection data (projects, team, events, publications)
3. Pass data to a React component that wraps content with `useTina` and `tinaField` for live editing

Pattern:
```
src/pages/about.astro          — Astro page, fetches data, renders layout
tina/pages/AboutPage.tsx       — React component with TinaCMS field annotations
```

### Stage 2 Validation

For each collection:
1. Open TinaCMS admin UI (`/admin`)
2. Verify only relevant fields are shown for each page/item
3. Add/edit/remove an item
4. Verify the change renders correctly on the site
5. Verify field labels and descriptions are clear for non-technical users

### Content Seeding

All collections will be seeded with the actual content from the Lovable site:
- 2 current projects (Dose & Dispose, BOS Study) with full details
- 5 publications + 1 conference presentation with all metadata
- 10 team members with roles and bios
- 1 upcoming event (Passing the Scope) + 3 past events
- All page text (heroes, section headings, descriptions, CTAs, stats)

---

## Out of Scope

- Mailing list provider integration (contact form uses Formspree only)
- Individual project detail pages (card view only)
- CMS-driven navigation (nav is hardcoded)
- CMS-driven footer (hardcoded)
- Privacy policy page
- Animations/transitions beyond simple hover effects
- Dark mode
- Team member social links / email on cards
