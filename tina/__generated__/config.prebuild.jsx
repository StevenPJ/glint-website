// tina/config.ts
import { defineConfig } from "tinacms";

// tina/collections/project.ts
var ProjectCollection = {
  name: "project",
  label: "Current Projects",
  path: "content/projects",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      options: [
        { value: "data-collection", label: "Data Collection" },
        { value: "write-up", label: "Write-Up Phase" },
        { value: "data-analysis", label: "Data Analysis" },
        { value: "completed", label: "Completed" },
        { value: "upcoming", label: "Upcoming" }
      ]
    },
    {
      type: "string",
      name: "statusLabel",
      label: "Status Badge Label",
      description: "Text shown in the status badge (e.g. 'Data Analysis', 'Write-Up Phase')"
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      required: true,
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      name: "objectives",
      label: "Objectives",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.text || "New Objective"
        })
      },
      fields: [
        {
          type: "string",
          name: "text",
          label: "Objective",
          required: true
        }
      ]
    },
    {
      type: "string",
      name: "timeline",
      label: "Timeline",
      description: "e.g. '2025 - Ongoing'"
    },
    {
      type: "string",
      name: "network",
      label: "Network",
      description: "e.g. '10+ London centres'"
    },
    {
      type: "string",
      name: "milestone",
      label: "Milestone",
      description: "e.g. 'Presented at MESSE Conference, Berlin, October 2025'"
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Additional Content",
      isBody: true
    }
  ]
};

// tina/collections/team.ts
var TeamCollection = {
  name: "team",
  label: "Team Members",
  path: "content/team",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "name",
      label: "Full Name",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "role",
      label: "Role / Position",
      required: true,
      description: "e.g. Chair, Vice Chair, South London Representative"
    },
    {
      type: "string",
      name: "initials",
      label: "Initials",
      description: "1-2 characters shown when no photo (e.g. 'CP')"
    },
    {
      type: "string",
      name: "bio",
      label: "Bio",
      required: true,
      ui: {
        component: "textarea"
      }
    },
    {
      type: "image",
      name: "image",
      label: "Photo"
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Additional Content",
      isBody: true
    }
  ]
};

// tina/collections/event.ts
var EventCollection = {
  name: "event",
  label: "Events",
  path: "content/events",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Event Title",
      isTitle: true,
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true
    },
    {
      type: "string",
      name: "time",
      label: "Time",
      description: "e.g. 'TBC', '18:00-20:00'"
    },
    {
      type: "string",
      name: "location",
      label: "Location",
      description: "e.g. 'Central London'"
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      options: [
        { value: "coming-soon", label: "Coming Soon" },
        { value: "open", label: "Open" },
        { value: "sold-out", label: "Sold Out" }
      ]
    },
    {
      type: "boolean",
      name: "isFree",
      label: "Free Event",
      description: "Shows a 'Free' badge when enabled"
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "url",
      label: "Registration URL",
      description: "External link for tickets or registration"
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Additional Content",
      isBody: true
    }
  ]
};

// tina/collections/publication.ts
var PublicationCollection = {
  name: "publication",
  label: "Publications & Presentations",
  path: "content/publications",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "type",
      label: "Type",
      required: true,
      options: [
        { value: "publication", label: "Publication" },
        { value: "conference", label: "Conference Presentation" }
      ]
    },
    {
      type: "string",
      name: "authors",
      label: "Authors",
      description: "Full author string"
    },
    {
      type: "string",
      name: "journal",
      label: "Journal",
      description: "Journal name (for publications)"
    },
    {
      type: "string",
      name: "year",
      label: "Year"
    },
    {
      type: "string",
      name: "volume",
      label: "Volume",
      description: "e.g. '2(6):309-317'"
    },
    {
      type: "string",
      name: "doi",
      label: "DOI",
      description: "e.g. '10.1002/ygh2.427'"
    },
    {
      type: "string",
      name: "venue",
      label: "Venue",
      description: "Where the paper was presented (for conference presentations)"
    },
    {
      type: "string",
      name: "venueDate",
      label: "Venue Date",
      description: "When the paper was presented, e.g. 'October 2025'"
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Additional Content",
      isBody: true
    }
  ]
};

// tina/collections/page.ts
var PageCollection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") return "/";
      return `/${document._sys.filename}`;
    }
  },
  fields: [
    // SEO (all pages)
    {
      name: "seoTitle",
      label: "SEO Title",
      type: "string",
      required: true
    },
    {
      name: "seoDescription",
      label: "SEO Description",
      type: "string",
      ui: { component: "textarea" }
    },
    // Hero (all pages)
    {
      name: "heroTitle",
      label: "Hero Title",
      type: "string",
      required: true
    },
    {
      name: "heroSubtitle",
      label: "Hero Subtitle",
      type: "string",
      ui: { component: "textarea" }
    },
    // Home page fields
    {
      name: "heroBadge",
      label: "Hero Badge Text",
      type: "string",
      description: "Text shown in the badge above the title (Home page only)"
    },
    {
      name: "heroCTA1Text",
      label: "Hero CTA 1 Text",
      type: "string",
      description: "e.g. 'Explore Our Research'"
    },
    {
      name: "heroCTA1Link",
      label: "Hero CTA 1 Link",
      type: "string"
    },
    {
      name: "heroCTA2Text",
      label: "Hero CTA 2 Text",
      type: "string",
      description: "e.g. 'Join Our Network'"
    },
    {
      name: "heroCTA2Link",
      label: "Hero CTA 2 Link",
      type: "string"
    },
    {
      name: "stats",
      label: "Stats",
      type: "object",
      list: true,
      description: "Home page stats bar",
      ui: {
        itemProps: (item) => ({ label: `${item?.value} ${item?.label}` || "New Stat" })
      },
      fields: [
        { name: "value", label: "Value", type: "string", required: true },
        { name: "label", label: "Label", type: "string", required: true }
      ]
    },
    {
      name: "whatWeDoTitle",
      label: "What We Do Title",
      type: "string"
    },
    {
      name: "whatWeDoSubtitle",
      label: "What We Do Subtitle",
      type: "string",
      ui: { component: "textarea" }
    },
    {
      name: "whatWeDoCards",
      label: "What We Do Cards",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "New Card" })
      },
      fields: [
        { name: "icon", label: "Icon", type: "string", options: [
          { value: "book", label: "Book (Research)" },
          { value: "users", label: "Users (Development)" },
          { value: "calendar", label: "Calendar (Events)" }
        ] },
        { name: "title", label: "Title", type: "string", required: true },
        { name: "description", label: "Description", type: "string", required: true, ui: { component: "textarea" } }
      ]
    },
    {
      name: "currentProjectsTitle",
      label: "Current Projects Section Title",
      type: "string"
    },
    {
      name: "currentProjectsSubtitle",
      label: "Current Projects Section Subtitle",
      type: "string"
    },
    // CTA section (Home, Current Projects, Events pages)
    {
      name: "ctaTitle",
      label: "CTA Section Title",
      type: "string"
    },
    {
      name: "ctaSubtitle",
      label: "CTA Section Subtitle",
      type: "string",
      ui: { component: "textarea" }
    },
    {
      name: "ctaCTA1Text",
      label: "CTA Button 1 Text",
      type: "string"
    },
    {
      name: "ctaCTA1Link",
      label: "CTA Button 1 Link",
      type: "string"
    },
    {
      name: "ctaCTA2Text",
      label: "CTA Button 2 Text",
      type: "string"
    },
    {
      name: "ctaCTA2Link",
      label: "CTA Button 2 Link",
      type: "string"
    },
    // About page fields
    {
      name: "missionTitle",
      label: "Mission Title",
      type: "string"
    },
    {
      name: "missionContent",
      label: "Mission Content",
      type: "string",
      ui: { component: "textarea" }
    },
    {
      name: "valuesTitle",
      label: "Values Section Title",
      type: "string"
    },
    {
      name: "values",
      label: "Values",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "New Value" })
      },
      fields: [
        { name: "icon", label: "Icon", type: "string", options: [
          { value: "users", label: "Users (Collaboration)" },
          { value: "star", label: "Star (Excellence)" },
          { value: "activity", label: "Activity (Development)" }
        ] },
        { name: "title", label: "Title", type: "string", required: true },
        { name: "description", label: "Description", type: "string", required: true, ui: { component: "textarea" } }
      ]
    },
    {
      name: "teamTitle",
      label: "Team Section Title",
      type: "string"
    },
    {
      name: "teamSubtitle",
      label: "Team Section Subtitle",
      type: "string",
      ui: { component: "textarea" }
    },
    // Contact page fields
    {
      name: "formTitle",
      label: "Form Title",
      type: "string"
    },
    {
      name: "formSubtitle",
      label: "Form Subtitle",
      type: "string",
      ui: { component: "textarea" }
    },
    {
      name: "sidebarTitle",
      label: "Sidebar Title",
      type: "string",
      description: "e.g. 'Why Join GLINT?'"
    },
    {
      name: "benefits",
      label: "Benefits",
      type: "object",
      list: true,
      description: "Why Join GLINT? items",
      ui: {
        itemProps: (item) => ({ label: item?.text || "New Benefit" })
      },
      fields: [
        { name: "text", label: "Benefit", type: "string", required: true }
      ]
    },
    {
      name: "connectEmail",
      label: "Contact Email",
      type: "string"
    },
    {
      name: "connectTwitter",
      label: "Twitter Handle",
      type: "string",
      description: "e.g. '@GLINT_Research'"
    },
    // Body
    {
      name: "body",
      label: "Additional Content",
      type: "rich-text",
      isBody: true
    }
  ]
};

// tina/config.ts
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      PageCollection,
      ProjectCollection,
      TeamCollection,
      EventCollection,
      PublicationCollection
    ]
  }
});
export {
  config_default as default
};
