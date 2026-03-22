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
var seoFields = [
  { name: "seoTitle", label: "SEO Title", type: "string", required: true },
  { name: "seoDescription", label: "SEO Description", type: "string", ui: { component: "textarea" } }
];
var heroFields = [
  { name: "heroTitle", label: "Hero Title", type: "string", required: true },
  { name: "heroSubtitle", label: "Hero Subtitle", type: "string", ui: { component: "textarea" } }
];
var HomePageCollection = {
  name: "homePage",
  label: "Home Page",
  path: "src/content/page/home",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/"
  },
  fields: [
    ...seoFields,
    ...heroFields,
    {
      name: "heroBadge",
      label: "Hero Badge Text",
      type: "string",
      description: "Text in the badge above the title"
    },
    { name: "heroCTA1Text", label: "Hero Button 1 Text", type: "string" },
    { name: "heroCTA1Link", label: "Hero Button 1 Link", type: "string" },
    { name: "heroCTA2Text", label: "Hero Button 2 Text", type: "string" },
    { name: "heroCTA2Link", label: "Hero Button 2 Link", type: "string" },
    {
      name: "stats",
      label: "Stats Bar",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: `${item?.value} ${item?.label}` || "New Stat" }) },
      fields: [
        { name: "value", label: "Value", type: "string", required: true },
        { name: "label", label: "Label", type: "string", required: true }
      ]
    },
    { name: "whatWeDoTitle", label: "What We Do Title", type: "string" },
    { name: "whatWeDoSubtitle", label: "What We Do Subtitle", type: "string", ui: { component: "textarea" } },
    {
      name: "whatWeDoCards",
      label: "What We Do Cards",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "New Card" }) },
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
    { name: "currentProjectsTitle", label: "Current Projects Title", type: "string" },
    { name: "currentProjectsSubtitle", label: "Current Projects Subtitle", type: "string" },
    { name: "ctaTitle", label: "CTA Title", type: "string" },
    { name: "ctaSubtitle", label: "CTA Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "ctaCTA1Text", label: "CTA Button 1 Text", type: "string" },
    { name: "ctaCTA1Link", label: "CTA Button 1 Link", type: "string" },
    { name: "ctaCTA2Text", label: "CTA Button 2 Text", type: "string" },
    { name: "ctaCTA2Link", label: "CTA Button 2 Link", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true }
  ]
};
var CurrentProjectsPageCollection = {
  name: "currentProjectsPage",
  label: "Current Projects Page",
  path: "src/content/page/current-projects",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/current-projects"
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "ctaTitle", label: "CTA Title", type: "string" },
    { name: "ctaSubtitle", label: "CTA Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "ctaButtonText", label: "CTA Button Text", type: "string" },
    { name: "ctaButtonLink", label: "CTA Button Link", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true }
  ]
};
var PastProjectsPageCollection = {
  name: "pastProjectsPage",
  label: "Past Projects Page",
  path: "src/content/page/past-projects",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/past-projects"
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true }
  ]
};
var EventsPageCollection = {
  name: "eventsPage",
  label: "Events Page",
  path: "src/content/page/events",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/events"
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "ctaTitle", label: "CTA Title", type: "string" },
    { name: "ctaSubtitle", label: "CTA Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "ctaButtonText", label: "CTA Button Text", type: "string" },
    { name: "ctaButtonLink", label: "CTA Button Link", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true }
  ]
};
var AboutPageCollection = {
  name: "aboutPage",
  label: "About Us Page",
  path: "src/content/page/about",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/about"
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "missionTitle", label: "Mission Title", type: "string" },
    { name: "missionContent", label: "Mission Content", type: "string", ui: { component: "textarea" } },
    { name: "valuesTitle", label: "Values Section Title", type: "string" },
    {
      name: "values",
      label: "Values",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "New Value" }) },
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
    { name: "teamTitle", label: "Team Section Title", type: "string" },
    { name: "teamSubtitle", label: "Team Section Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true }
  ]
};
var ContactPageCollection = {
  name: "contactPage",
  label: "Contact Page",
  path: "src/content/page/contact",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/contact"
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "formTitle", label: "Form Title", type: "string" },
    { name: "formSubtitle", label: "Form Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "sidebarTitle", label: "Sidebar Title", type: "string" },
    {
      name: "benefits",
      label: "Benefits (Why Join GLINT?)",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.text || "New Benefit" }) },
      fields: [
        { name: "text", label: "Benefit", type: "string", required: true }
      ]
    },
    { name: "connectEmail", label: "Contact Email", type: "string" },
    { name: "connectTwitter", label: "Twitter Handle", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true }
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
      HomePageCollection,
      CurrentProjectsPageCollection,
      PastProjectsPageCollection,
      EventsPageCollection,
      AboutPageCollection,
      ContactPageCollection,
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
