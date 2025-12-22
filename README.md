# GLINT Research Website

The official website for GLINT Research Group - The Pan-London Gastroenterology Research Group.

Built with [Astro](https://astro.build), [TinaCMS](https://tina.io/), and [Tailwind CSS](https://tailwindcss.com/). Hosted on [Vercel](https://vercel.com).

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4321` to view the site.

## Project Structure

```
/
├── content/              # Markdown content (projects, publications, team)
│   ├── projects/
│   ├── publications/
│   └── team/
├── public/               # Static assets
│   ├── images/
│   ├── logo.svg
│   └── favicon.svg
├── src/
│   ├── components/       # Astro components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Site pages
│   └── styles/           # Global CSS
├── tina/                 # TinaCMS configuration
│   ├── collections/      # Content schemas
│   └── config.ts
└── astro.config.mjs
```

## Managing Content

### Using TinaCMS (Recommended)

1. Go to `https://your-site.vercel.app/admin`
2. Log in with your TinaCMS Cloud credentials
3. Edit content using the visual editor
4. Save changes - they deploy automatically

### Editing Files Directly

Content is stored as Markdown/MDX files in the `content/` directory. You can edit these files directly and commit changes to trigger a rebuild.

## Setting Up Services

### 1. TinaCMS Cloud (Content Management)

1. Create account at [app.tina.io](https://app.tina.io)
2. Create a new project and connect your GitHub repo
3. Get your Client ID and Token
4. Add to environment variables:
   ```
   PUBLIC_TINA_CLIENT_ID=your_client_id
   TINA_TOKEN=your_token
   ```

### 2. Formspree (Contact Form)

1. Create account at [formspree.io](https://formspree.io)
2. Create a new form
3. Copy the form endpoint
4. Update `src/components/ContactForm.astro` with your endpoint

### 3. MailerLite (Newsletter)

1. Create account at [mailerlite.com](https://mailerlite.com)
2. Create a new subscriber group
3. Create an embedded form
4. Copy the form embed code
5. Update `src/components/NewsletterSignup.astro` with your form

## Deploying to Vercel

### Initial Deployment

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy

### Custom Domain Setup

1. In Vercel: Settings > Domains > Add Domain
2. Enter `glintresearch.com`
3. At your DNS provider, add:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 48 hours)

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server |
| `npm run dev:tina` | Start with TinaCMS admin |
| `npm run build` | Build for production |
| `npm run build:tina` | Build with TinaCMS (requires cloud credentials) |
| `npm run preview` | Preview production build |

## Tech Stack

- **Framework**: Astro 5.x
- **CMS**: TinaCMS
- **Styling**: Tailwind CSS 4.x
- **Hosting**: Vercel
- **Contact Form**: Formspree
- **Newsletter**: MailerLite

## Support

For questions about GLINT Research, visit [glintresearch.com](https://glintresearch.com) or contact us through the website.
