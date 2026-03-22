# Stage 1: Static Astro Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the GLINT website as a pixel-perfect static Astro site matching https://glintresearchlondon.lovable.app, with hardcoded content and no CMS.

**Architecture:** Clean-slate rewrite. Delete `src/`, `tina/`, `content/` directories. Build 6 Astro pages with shared layout, header, footer, and hero banner components. All content is hardcoded in `.astro` files. No React, no TinaCMS in this stage.

**Tech Stack:** Astro 5, Tailwind CSS 4, Playfair Display + Inter fonts (Google Fonts)

**Spec:** `docs/superpowers/specs/2026-03-22-lovable-site-rebuild-design.md`

**Reference site:** https://glintresearchlondon.lovable.app

**Content reference:** `docs/superpowers/plans/2026-03-22-stage1-content-reference.md` — all hardcoded text content for pages 7-11

---

## Extracted Design Tokens (from Lovable CSS)

```
Fonts:
  Headings: "Playfair Display", Georgia, serif (weight 700)
  Body: Inter, system-ui, sans-serif

HSL Theme (Lovable uses shadcn/Tailwind HSL convention):
  --background:          210 20% 98%     (body bg — very light blue-gray)
  --foreground:          210 40% 12%     (body text — dark navy #121F2B)
  --card:                0 0% 100%       (white cards)
  --primary:             192 70% 25%     (dark teal #135B6C)
  --secondary:           42 80% 55%      (golden/amber accent)
  --muted:               210 15% 94%     (light muted bg)
  --muted-foreground:    210 20% 45%     (gray text)
  --accent:              192 50% 92%     (light teal bg for badges)
  --accent-foreground:   192 70% 20%     (dark teal for badge text)
  --border:              210 20% 88%     (subtle border)
  --radius:              0.5rem

Hero gradient: linear-gradient(135deg, hsl(192 70% 25%) 0%, hsl(200 55% 18%) 50%, hsl(210 60% 15%) 100%)
  = rgb(19,91,108) → rgb(16,56,76) → rgb(15,38,61)

Card shadow: rgba(18,31,43, 0.08) 0px 4px 20px -4px
Card border-radius: 12px

Logo: PNG at /assets/glint-logo-BM-irO1o.png (250x277)
```

---

## File Structure

```
src/
  layouts/
    BaseLayout.astro           — HTML shell, head, body, imports header+footer
  components/
    Header.astro               — Sticky nav, logo, 6 links, mobile hamburger
    Footer.astro               — 3-col dark footer, social icons, copyright
    HeroBanner.astro           — Reusable teal gradient hero with wave divider (props: title, subtitle)
  pages/
    index.astro                — Home page (hero, stats, what we do, projects preview, CTA)
    current-projects.astro     — Current Projects page
    past-projects.astro        — Past Projects (publications + presentations)
    events.astro               — Events page (upcoming + past)
    about.astro                — About Us (mission, values, team)
    contact.astro              — Contact form + sidebar
  styles/
    global.css                 — Tailwind config, HSL theme, font imports, component classes
public/
  glint-logo.png               — Header logo (downloaded from Lovable)
  favicon.ico                  — Favicon (downloaded from Lovable)
```

---

## Task 0: Clean Slate — Delete Old Code & Download Assets

**Files:**
- Delete: `src/` (entire directory)
- Delete: `tina/` (entire directory)
- Delete: `content/` (entire directory)
- Create: `public/glint-logo.png`
- Create: `public/favicon.ico`

- [ ] **Step 1: Create a working branch**

```bash
git checkout -b stage1-static-rebuild
```

- [ ] **Step 2: Delete old source directories**

```bash
rm -rf src/ tina/ content/
```

- [ ] **Step 3: Clean public directory (remove all old assets)**

```bash
# Remove everything except .gitkeep or essential files
rm -rf public/admin public/fonts public/images public/team
rm -f public/logo*.svg public/logo*.png public/logo-*.svg
rm -f public/llama.svg public/favicon.svg
rm -f public/blog-placeholder-*.jpg
```

- [ ] **Step 4: Download logo from Lovable**

```bash
curl -o public/glint-logo.png "https://glintresearchlondon.lovable.app/assets/glint-logo-BM-irO1o.png"
```

- [ ] **Step 5: Download favicon from Lovable**

```bash
curl -o public/favicon.ico "https://glintresearchlondon.lovable.app/favicon.ico"
```

- [ ] **Step 6: Update package.json build script for Stage 1 (no TinaCMS)**

In `package.json`, change the `build` script to just `astro build` (TinaCMS will be re-added in Stage 2):

```json
"build": "astro build",
```

Also remove the `dev:tina` script for now. Keep `build:local` as-is.

- [ ] **Step 7: Recreate src directory structure**

```bash
mkdir -p src/layouts src/components src/pages src/styles
```

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: clean slate — delete old src/tina/content for rebuild"
```

---

## Task 1: Global Styles & Tailwind Theme

**Files:**
- Create: `src/styles/global.css`

This file sets up the Tailwind theme with the exact HSL color tokens extracted from the Lovable site, imports Google Fonts, and defines reusable component classes.

- [ ] **Step 1: Create global.css**

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700;900&display=swap');

@import "tailwindcss";

/* Theme — exact HSL values from Lovable site */
@theme {
  --color-background: hsl(210 20% 98%);
  --color-foreground: hsl(210 40% 12%);
  --color-card: hsl(0 0% 100%);
  --color-card-foreground: hsl(210 40% 12%);
  --color-primary: hsl(192 70% 25%);
  --color-primary-foreground: hsl(0 0% 100%);
  --color-secondary: hsl(42 80% 55%);
  --color-secondary-foreground: hsl(210 40% 12%);
  --color-muted: hsl(210 15% 94%);
  --color-muted-foreground: hsl(210 20% 45%);
  --color-accent: hsl(192 50% 92%);
  --color-accent-foreground: hsl(192 70% 20%);
  --color-border: hsl(210 20% 88%);
  --color-destructive: hsl(0 80% 55%);

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-serif: 'Playfair Display', Georgia, serif;

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  --shadow-card: 0 4px 20px -4px rgba(18, 31, 43, 0.08);
}

/* Base */
html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--color-foreground);
  line-height: 1.2;
}

/* Container */
.container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

/* Hero gradient */
.hero-gradient {
  background: linear-gradient(135deg, hsl(192 70% 25%) 0%, hsl(200 55% 18%) 50%, hsl(210 60% 15%) 100%);
}

/* Hero circle pattern overlay */
.hero-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='white' stroke-opacity='0.07' stroke-width='1'/%3E%3C/svg%3E");
  background-size: 60px 60px;
}

/* Card */
.card-elevated {
  background-color: var(--color-card);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-card);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}

.badge-primary {
  background-color: var(--color-accent);
  color: var(--color-accent-foreground);
}

.badge-secondary {
  background-color: hsl(42 80% 92%);
  color: hsl(42 80% 35%);
}

.badge-success {
  background-color: hsl(142 50% 92%);
  color: hsl(142 60% 30%);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.9375rem;
  font-family: var(--font-sans);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-outline-white {
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
  background: transparent;
}

.btn-outline-white:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-outline {
  border: 1px solid var(--color-border);
  color: var(--color-foreground);
  background: transparent;
}

.btn-outline:hover {
  background: var(--color-muted);
}

/* Form */
.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-foreground);
  margin-bottom: 0.375rem;
}

.form-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  background-color: var(--color-card);
  transition: border-color 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px hsl(192 70% 25% / 0.1);
}

.form-input::placeholder {
  color: var(--color-muted-foreground);
}

/* Icon container (for feature cards) */
.icon-box {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--radius-md);
  background-color: var(--color-accent);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Footer */
.footer {
  background-color: hsl(210 60% 12%);
  color: white;
}
```

- [ ] **Step 2: Verify Tailwind processes the file**

```bash
npx astro build 2>&1 | head -5
```

Expected: may fail (no pages yet), but should not error on CSS. We'll verify fully later.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global styles with Lovable theme tokens"
```

---

## Task 2: Base Layout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/BaseHead.astro`

- [ ] **Step 1: Create BaseHead.astro**

```astro
---
interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content={description} />
<meta name="keywords" content="gastroenterology, hepatology, research, trainees, London, medical research, GLINT" />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<link rel="icon" href="/favicon.ico" />
<title>{title}</title>
```

- [ ] **Step 2: Create BaseLayout.astro**

```astro
---
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/ src/components/BaseHead.astro
git commit -m "feat: add BaseLayout and BaseHead components"
```

---

## Task 3: Header Component

**Files:**
- Create: `src/components/Header.astro`

The header has: logo (left), 6 nav links (right), sticky behavior with white bg on scroll, mobile hamburger menu.

- [ ] **Step 1: Create Header.astro**

```astro
---
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/current-projects', label: 'Current Projects' },
  { href: '/past-projects', label: 'Past Projects' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const currentPath = Astro.url.pathname;
---

<header id="header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
  <div class="container">
    <nav class="flex items-center justify-between h-16 md:h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center hover:opacity-80 transition-opacity">
        <img src="/glint-logo.png" alt="GLINT - Gastro London Investigative Network for Trainees" class="h-12 md:h-14 w-auto" />
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            href={link.href}
            class:list={[
              "text-sm font-medium transition-colors py-2",
              currentPath === link.href
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            ]}
          >
            {link.label}
          </a>
        ))}
      </div>

      <!-- Mobile Menu Button -->
      <button
        id="mobile-menu-btn"
        class="lg:hidden p-2 text-muted-foreground hover:text-foreground"
        aria-label="Toggle menu"
        aria-expanded="false"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  </div>

  <!-- Mobile Navigation -->
  <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-border shadow-lg">
    <div class="container py-4 space-y-1">
      {navLinks.map((link) => (
        <a
          href={link.href}
          class:list={[
            "block py-3 px-4 rounded-lg text-sm font-medium transition-colors",
            currentPath === link.href
              ? "text-primary bg-accent"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          ]}
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
</header>

<!-- Spacer for fixed header -->
<div class="h-16 md:h-20"></div>

<style>
  #header.scrolled {
    background-color: white;
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.08);
  }
</style>

<script>
  function handleScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function initHeader() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    handleScroll();

    if (menuBtn && mobileMenu) {
      menuBtn.onclick = () => {
        mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded',
          mobileMenu.classList.contains('hidden') ? 'false' : 'true');
      };

      mobileMenu.querySelectorAll('a').forEach(link => {
        (link as HTMLElement).onclick = () => {
          mobileMenu.classList.add('hidden');
          menuBtn.setAttribute('aria-expanded', 'false');
        };
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  initHeader();
  document.addEventListener('astro:page-load', initHeader);
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: add Header component with sticky nav and mobile menu"
```

---

## Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.astro`

3-column footer matching Lovable: brand/description, quick links, connect section, copyright bar.

- [ ] **Step 1: Create Footer.astro**

```astro
---
const quickLinks = [
  { href: '/current-projects', label: 'Current Projects' },
  { href: '/past-projects', label: 'Past Projects' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About Us' },
];
---

<footer class="footer">
  <div class="container py-12 lg:py-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-lg">G</div>
          <span class="text-white font-serif text-xl font-bold">GLINT</span>
        </div>
        <p class="text-white/70 text-sm leading-relaxed max-w-xs">
          Gastroenterology London Investigative Network for Trainees. A trainee-led collaborative delivering high-quality, multicentre research and service evaluation across gastroenterology and hepatology.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <h3 class="text-white font-semibold mb-4">Quick Links</h3>
        <ul class="space-y-2">
          {quickLinks.map((link) => (
            <li>
              <a href={link.href} class="text-white/70 hover:text-white text-sm transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <!-- Connect -->
      <div>
        <h3 class="text-white font-semibold mb-4">Connect</h3>
        <a href="/contact" class="text-white/70 hover:text-white text-sm transition-colors block mb-4">
          Join Our Mailing List
        </a>
        <div class="flex items-center gap-3">
          <!-- Twitter/X -->
          <a
            href="https://twitter.com/GLINT_Research"
            target="_blank"
            rel="noopener noreferrer"
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Follow us on Twitter"
          >
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <!-- Email -->
          <a
            href="mailto:glint.research@gmail.com"
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Email us"
          >
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-white/10 mt-8 pt-8 text-center">
      <p class="text-white/50 text-sm">&copy; 2026 GLINT. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add Footer component with quick links and social icons"
```

---

## Task 5: Hero Banner Component

**Files:**
- Create: `src/components/HeroBanner.astro`

Reusable component used on every page. Dark teal gradient background with circle pattern overlay and wave divider at bottom.

- [ ] **Step 1: Create HeroBanner.astro**

```astro
---
interface Props {
  title: string;
  subtitle?: string;
}

const { title, subtitle } = Astro.props;
---

<section class="hero-gradient relative overflow-hidden">
  <!-- Circle pattern overlay -->
  <div class="absolute inset-0 hero-pattern opacity-100"></div>

  <!-- Content -->
  <div class="container py-16 md:py-20 lg:py-24 relative">
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-serif">
      {title}
    </h1>
    {subtitle && (
      <p class="text-white/80 text-lg md:text-xl max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>

  <!-- Wave divider -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 20% 98%)"></path>
    </svg>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroBanner.astro
git commit -m "feat: add HeroBanner component with gradient and wave divider"
```

---

## Task 6: Home Page

**Files:**
- Create: `src/pages/index.astro`

The home page is the most complex page. It has: a unique hero (centered content with badge, large "GLINT" title, subtitle, 2 CTAs), stats bar, "What We Do" cards, current projects preview, and a dark CTA section.

- [ ] **Step 1: Create index.astro**

The home page hero is unique (not using HeroBanner) — it's centered with a badge, large serif title, and two CTA buttons.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="GLINT | Gastroenterology London Investigative Network for Trainees"
  description="GLINT is a trainee-led collaborative delivering high-quality, multicentre research and service evaluation across gastroenterology and hepatology in London."
>
  <!-- Hero Section (unique to home page) -->
  <section class="hero-gradient relative overflow-hidden">
    <div class="absolute inset-0 hero-pattern"></div>
    <div class="container py-24 md:py-32 lg:py-40 relative">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          <span class="text-white/90 text-sm font-medium">Trainee-Led Gastroenterology Research</span>
        </div>

        <!-- Title -->
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif">
          GLINT
        </h1>

        <!-- Subtitle -->
        <p class="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
          Delivering high-quality, multicentre research and service evaluation across gastroenterology and hepatology. Generating impactful evidence while supporting trainees in developing research skills.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/current-projects" class="btn btn-outline-white">
            Explore Our Research
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a href="/contact" class="btn btn-outline-white">
            Join Our Network
          </a>
        </div>
      </div>
    </div>

    <!-- Wave divider -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(210 20% 98%)"></path>
      </svg>
    </div>
  </section>

  <!-- Stats Bar -->
  <section class="py-16 md:py-20">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
        <div>
          <div class="text-4xl md:text-5xl font-bold text-primary font-serif">5</div>
          <div class="text-muted-foreground mt-1">Publications</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-primary font-serif">10+</div>
          <div class="text-muted-foreground mt-1">Collaborating Centres</div>
        </div>
        <div>
          <div class="text-4xl md:text-5xl font-bold text-primary font-serif">2+</div>
          <div class="text-muted-foreground mt-1">National Presentations</div>
        </div>
      </div>
    </div>
  </section>

  <!-- What We Do -->
  <section class="py-16 md:py-20">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold font-serif mb-4">What We Do</h2>
        <p class="text-muted-foreground text-lg max-w-2xl mx-auto">
          GLINT brings together gastroenterology trainees across London to collaborate on meaningful research that improves patient outcomes.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <!-- Card 1: Multicentre Research -->
        <div class="card-elevated p-6 lg:p-8">
          <div class="icon-box mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-lg font-bold font-serif mb-2">Multicentre Research</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            We design and conduct high-quality studies across multiple centres, generating evidence that matters for patient care.
          </p>
        </div>

        <!-- Card 2: Trainee Development -->
        <div class="card-elevated p-6 lg:p-8">
          <div class="icon-box mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold font-serif mb-2">Trainee Development</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            Supporting the next generation of researchers with mentorship, training, and hands-on experience in academic gastroenterology.
          </p>
        </div>

        <!-- Card 3: Events & Education -->
        <div class="card-elevated p-6 lg:p-8">
          <div class="icon-box mb-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold font-serif mb-2">Events & Education</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            Organising conferences, workshops, and networking events to foster collaboration and knowledge sharing.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Current Projects Preview -->
  <section class="py-16 md:py-20">
    <div class="container">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-3xl md:text-4xl font-bold font-serif">Current Projects</h2>
          <p class="text-muted-foreground mt-2">Explore our ongoing research initiatives making an impact.</p>
        </div>
        <a href="/current-projects" class="btn btn-outline hidden sm:inline-flex">
          View All Projects
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Dose & Dispose -->
        <div class="card-elevated p-6 lg:p-8">
          <span class="badge badge-primary mb-4">Data Collection</span>
          <h3 class="text-xl font-bold font-serif mb-3">Dose & Dispose</h3>
          <p class="text-muted-foreground text-sm leading-relaxed mb-4">
            The Hidden Cost of Wasted Sedation in Endoscopy – a multicentre service evaluation across 10+ London centres.
          </p>
          <a href="/current-projects" class="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
            Learn more
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <!-- BOS Study -->
        <div class="card-elevated p-6 lg:p-8">
          <span class="badge badge-secondary mb-4">Write-Up Phase</span>
          <h3 class="text-xl font-bold font-serif mb-3">BOS Study</h3>
          <p class="text-muted-foreground text-sm leading-relaxed mb-4">
            Endoscopic dilation of benign oesophageal strictures – a large multicentre evaluation across 11+ UK centres.
          </p>
          <a href="/current-projects" class="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
            Learn more
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Ready to Get Involved CTA -->
  <section class="hero-gradient relative overflow-hidden">
    <div class="absolute inset-0 hero-pattern"></div>
    <div class="container py-20 md:py-28 relative">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white font-serif mb-4">Ready to Get Involved?</h2>
        <p class="text-white/80 text-lg mb-8">
          Join our network of gastroenterology trainees and contribute to research that makes a difference.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/contact" class="btn btn-outline-white">
            Join GLINT
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a href="/events" class="btn btn-outline-white">
            Upcoming Events
          </a>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 2: Run dev server and verify**

```bash
npx astro dev &
sleep 3
```

Open http://localhost:4321 and take a screenshot to compare with the Lovable home page.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Home page with hero, stats, features, projects preview, CTA"
```

---

## Task 7: Current Projects Page

**Files:**
- Create: `src/pages/current-projects.astro`

- [ ] **Step 1: Create current-projects.astro**

Uses HeroBanner, then 2 expanded project cards with objectives/timeline/network, and a CTA section.

Content: Dose & Dispose (Data Analysis status) and BOS Study (Write-Up Phase). Refer to `docs/superpowers/plans/2026-03-22-stage1-content-reference.md` for all project content including objectives, timeline, and network details.

Each project card has: title + status badge, description paragraph, then a 3-column row showing Objectives (bulleted list), Timeline (date range + milestone), and Network (centre count).

- [ ] **Step 2: Commit**

```bash
git add src/pages/current-projects.astro
git commit -m "feat: add Current Projects page with project detail cards"
```

---

## Task 8: Past Projects Page

**Files:**
- Create: `src/pages/past-projects.astro`

- [ ] **Step 1: Create past-projects.astro**

Uses HeroBanner. Two sections: Publications (5 papers — each showing title, authors, journal/year/volume, DOI link) and Conference Presentations (1 entry — title + venue/date). All publication data (titles, authors, journals, DOIs) is in `docs/superpowers/plans/2026-03-22-stage1-content-reference.md` under "Past Projects Page".

- [ ] **Step 2: Commit**

```bash
git add src/pages/past-projects.astro
git commit -m "feat: add Past Projects page with publications and presentations"
```

---

## Task 9: Events Page

**Files:**
- Create: `src/pages/events.astro`

- [ ] **Step 1: Create events.astro**

Uses HeroBanner. Upcoming Events section (1 card: "Passing the Scope" with Coming Soon + Free badges, date 16th April 2026, TBC time, Central London location, description). Past Events section (compact list: 3 events with title, date, "Sold out" badge). "Don't Miss Our Next Event" CTA at bottom. All event content is in `docs/superpowers/plans/2026-03-22-stage1-content-reference.md` under "Events Page".

- [ ] **Step 2: Commit**

```bash
git add src/pages/events.astro
git commit -m "feat: add Events page with upcoming and past events"
```

---

## Task 10: About Us Page

**Files:**
- Create: `src/pages/about.astro`

- [ ] **Step 1: Create about.astro**

Uses HeroBanner. Our Mission section (centered paragraph). Our Values section (3 cards: Collaboration, Excellence, Development — each with icon, title, description). Our Team section (grid of 10 member cards — each with photo or initials circle, name, role, bio paragraph).

11 team members with full bios. All content is in `docs/superpowers/plans/2026-03-22-stage1-content-reference.md` under "About Us Page > Team Members".

All members show initials fallback (no real photos on Lovable site). Derive initials from the first letter of first name + first letter of last name. For "Chris Palmer-Jones" use "CP".

- [ ] **Step 2: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add About Us page with mission, values, and team grid"
```

---

## Task 11: Contact Page

**Files:**
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create contact.astro**

Uses HeroBanner. Two-column layout: left is the "Join Our Network" form (Full Name*, Email*, Institution/Hospital, Area of Interest, Message Optional, Submit button), right is "Why Join GLINT?" card with 5 benefits (checkmark icon + text each). Below: "Connect With Us" section showing email and Twitter.

Form submits to `https://formspree.io/f/xrezokpn` via POST. All form fields, placeholders, sidebar benefits, and contact details are in `docs/superpowers/plans/2026-03-22-stage1-content-reference.md` under "Contact Page".

- [ ] **Step 2: Commit**

```bash
git add src/pages/contact.astro
git commit -m "feat: add Contact page with Formspree form and benefits sidebar"
```

---

## Task 12: Visual Validation & Polish

- [ ] **Step 1: Screenshot every page and compare with Lovable**

For each page (Home, Current Projects, Past Projects, Events, About Us, Contact):
1. Open the Lovable page and take a full-page screenshot
2. Open the local Astro page at the same viewport width and screenshot
3. Compare and note discrepancies

- [ ] **Step 2: Fix color/spacing/typography discrepancies**

Common issues to check:
- Font weight on headings (should be 700 for Playfair Display)
- Hero padding (py-24 md:py-32 lg:py-40 on home, py-16 md:py-20 lg:py-24 on others)
- Card border vs shadow (Lovable uses subtle shadow, not border)
- Badge colors (teal for Data Collection/Coming Soon, amber for Write-Up Phase)
- Stats section number weight and color
- Footer background darkness
- Mobile responsive layout at 375px

- [ ] **Step 3: Commit fixes**

```bash
git add -A
git commit -m "fix: polish styling to match Lovable site exactly"
```

---

## Task 13: Build & Verify

- [ ] **Step 1: Run production build**

```bash
npx astro build
```

Expected: Successful build with 6 HTML pages.

- [ ] **Step 2: Preview production build**

```bash
npx astro preview
```

Open http://localhost:4321 and verify all 6 pages render correctly.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "chore: Stage 1 complete — static Astro rebuild matching Lovable"
```

---

## Notes for Implementer

- The home page hero is unique and does NOT use the HeroBanner component. All other pages do.
- Badge color mapping: "Data Collection" / "Data Analysis" / "Coming Soon" / "Free" → `badge-primary` (teal). "Write-Up Phase" → `badge-secondary` (amber). "Sold Out" → use a neutral gray badge.
- The Lovable site uses Tailwind utility classes extensively. Our approach uses a mix of utility classes and component classes in `global.css` for reusable patterns.
- Team member initials: extract first letter of first name + first letter of last name. For "Chris Palmer-Jones" the Lovable site shows "CP". There are 11 team members total (not 10 as originally estimated in the spec — the spec should be updated).
- The wave divider SVG uses `fill="hsl(210 20% 98%)"` which matches `--background` — this creates the smooth transition from hero gradient to page background.
- `astro.config.mjs` may need the `site` URL updated if building for production, but this is a deployment concern, not a Stage 1 concern.
