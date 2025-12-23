# GLINT Research Website

The official website for GLINT Research Group - The Pan-London Gastroenterology Research Group.

Built with [Astro](https://astro.build), [TinaCMS](https://tina.io/), and [Tailwind CSS](https://tailwindcss.com/). Hosted on [Vercel](https://vercel.com).

## Quick Start

```bash
# Install dependencies
npm install

# Start development server with TinaCMS
npm run dev:tina

# Or start without TinaCMS admin
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4321` to view the site, or `http://localhost:4321/admin` for the CMS.

## Project Structure

```
/
├── content/              # TinaCMS-managed content
│   ├── projects/         # Research project MDX files
│   └── team/             # Team member MDX files
├── public/               # Static assets
│   ├── admin/            # TinaCMS admin interface
│   └── images/           # Site images
├── src/
│   ├── components/       # Astro/React components
│   ├── content/
│   │   └── page/         # Page content (home, about, projects)
│   ├── layouts/          # Page layouts
│   └── pages/            # Site pages
├── tina/                 # TinaCMS configuration
│   ├── collections/      # Content schemas
│   ├── components/       # TinaCMS custom components
│   └── pages/            # React components for visual editing
└── astro.config.mjs
```

---

## Site Administration Guide

### Accessing the CMS

1. Go to `https://glintresearch.com/admin` (or your site URL + `/admin`)
2. Log in with your TinaCMS Cloud credentials
3. You'll see the content management dashboard

### Editing Pages

The site has three main pages with CMS-editable content:

#### Home Page
Navigate to **Pages > home** to edit:
- **Hero Section**: Main title, highlighted text (gradient), subtitle, CTA button
- **Feature Cards**: The 3 cards below the hero (Projects, Future Projects, Got an Idea?)
- **Updates Section**: News items with date, badge, title, and description
- **About Section**: GLINT description and "Meet our Committee" title
- **Contact Section**: Section titles and form labels

#### About Page
Navigate to **Pages > about** to edit:
- **Hero Section**: Page title and subtitle
- **Mission Section**: Mission title and content
- **Feature Cards**: The 4 feature highlights (Collaborative Research, Trainee-Led, etc.)
- **Team Section**: Section title and subtitle
- **CTA Section**: Bottom call-to-action text and button

#### Projects Page
Navigate to **Pages > projects** to edit:
- **Section Labels & Titles**: "Current Projects" and "Past Projects" headings
- **CTA Section**: "Got a Research Idea?" section at the bottom

### Managing Projects

Navigate to **Projects** in the sidebar to manage research projects.

#### Adding a New Project
1. Click **Create New** in the Projects section
2. Fill in the required fields:
   - **Title**: Project name
   - **Status**: ongoing, completed, or upcoming
   - **Currently Recruiting**: Toggle if actively seeking participants
3. Fill in optional fields:
   - **Short Description**: Brief summary
   - **Collaborators**: Partner organizations
   - **Contact Person/Email**: Project contact details
   - **Featured Image**: Upload or select an image
   - **Publication URL**: Link to published paper (for completed projects)
   - **Start/End Dates**: Project timeline
   - **Display Order**: Lower numbers appear first
4. Add the full project description in the **Full Description** rich text editor
5. Click **Save**

#### Editing Projects
1. Click on any project in the list
2. Make your changes
3. Click **Save**

### Managing Team Members

Navigate to **Team Members** in the sidebar.

#### Adding a Team Member
1. Click **Create New**
2. Fill in required fields:
   - **Full Name**: Member's name (with title, e.g., "Dr. John Smith")
   - **Role/Position**: Their committee role
   - **Member Type**: current, founding, or alumni
3. Fill in optional fields:
   - **Region**: Their NHS region
   - **Research Interests**: Brief description
   - **Photo**: Upload their photo (recommended: square image, min 200x200px)
   - **Email/Twitter**: Contact details
   - **Display Order**: Lower numbers appear first (Chair = 0, Vice-Chair = 1, etc.)
4. Click **Save**

#### Photo Guidelines
- Use square images for best results
- Minimum 200x200 pixels, recommended 400x400
- Supported formats: JPG, PNG, WebP
- Images are stored in `/public/images/` via TinaCMS media manager

### Visual Editing (Click-to-Edit)

The Home and About pages support visual editing:

1. In the CMS, navigate to the page you want to edit
2. Click the **Preview** button (eye icon) in the top right
3. The page will open in a preview pane
4. Click directly on any highlighted element to edit it
5. Changes appear in real-time
6. Click **Save** when done

---

## Form Configuration

### Contact Form & Mailing List (Formspree)

Both the contact form and mailing list use [Formspree](https://formspree.io) for form handling.

#### Current Configuration
The forms submit to Formspree endpoint: `https://formspree.io/f/xrezokpn`

#### Setting Up Your Own Formspree
1. Create account at [formspree.io](https://formspree.io)
2. Create a new form project
3. Copy your form endpoint (looks like `https://formspree.io/f/xxxxxxxx`)
4. Update the form action URLs in:
   - `tina/pages/HomePage.tsx` (lines with `formspree.io`)

#### Form Submissions
- View submissions in your Formspree dashboard
- Configure email notifications in Formspree settings
- Forms include hidden fields to distinguish between contact and mailing list submissions:
  - Contact form: `_subject: "GLINT Website Contact Form"`
  - Mailing list: `_subject: "GLINT Mailing List Signup"`, `form_type: "mailing_list"`

#### Alternative: MailerLite for Newsletters
If you prefer dedicated email marketing:
1. Create account at [mailerlite.com](https://mailerlite.com)
2. Create a subscriber group for GLINT
3. Create an embedded form
4. Replace the mailing list form in `HomePage.tsx` with MailerLite embed code

---

## TinaCMS Cloud Setup

### Initial Setup

1. Create account at [app.tina.io](https://app.tina.io)
2. Create a new project
3. Connect your GitHub repository
4. Note your Client ID from the project settings

### Environment Variables

Add these to your Vercel deployment (or `.env` file for local development):

```
PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### Local Development with TinaCMS

```bash
# Run with TinaCMS admin interface
npm run dev:tina
```

This starts both the Astro dev server and TinaCMS local GraphQL server.

---

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - `PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
5. Deploy

### Custom Domain

1. In Vercel: Settings > Domains > Add Domain
2. Add `glintresearch.com`
3. Configure DNS:
   - A record: `@` → `76.76.21.21`
   - CNAME: `www` → `cname.vercel-dns.com`

---

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start local dev server |
| `npm run dev:tina` | Start with TinaCMS admin |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## Tech Stack

- **Framework**: Astro 5.x
- **CMS**: TinaCMS 2.x
- **Styling**: Tailwind CSS 4.x
- **Hosting**: Vercel
- **Forms**: Formspree

---

## Known Issues

### Security Vulnerabilities
The TinaCMS dependencies have known vulnerabilities. These are in the CMS build tooling and don't affect the production site. To fix, upgrade to TinaCMS 3.x (breaking changes may apply):

```bash
npm audit fix --force
```

Note: This may require code changes. Test thoroughly before deploying.

---

## Support

For questions about GLINT Research, visit [glintresearch.com](https://glintresearch.com) or contact us through the website.
