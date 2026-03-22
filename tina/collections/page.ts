import type { Collection } from "tinacms";

const seoFields = [
  { name: "seoTitle", label: "SEO Title", type: "string" as const, required: true },
  { name: "seoDescription", label: "SEO Description", type: "string" as const, ui: { component: "textarea" as const } },
];

const heroFields = [
  { name: "heroTitle", label: "Hero Title", type: "string" as const, required: true },
  { name: "heroSubtitle", label: "Hero Subtitle", type: "string" as const, ui: { component: "textarea" as const } },
];

export const HomePageCollection: Collection = {
  name: "homePage",
  label: "Home Page",
  path: "src/content/page/home",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/",
  },
  fields: [
    ...seoFields,
    ...heroFields,
    {
      name: "heroBadge",
      label: "Hero Badge Text",
      type: "string",
      description: "Text in the badge above the title",
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
        { name: "label", label: "Label", type: "string", required: true },
      ],
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
          { value: "calendar", label: "Calendar (Events)" },
        ]},
        { name: "title", label: "Title", type: "string", required: true },
        { name: "description", label: "Description", type: "string", required: true, ui: { component: "textarea" } },
      ],
    },
    { name: "currentProjectsTitle", label: "Current Projects Title", type: "string" },
    { name: "currentProjectsSubtitle", label: "Current Projects Subtitle", type: "string" },
    { name: "ctaTitle", label: "CTA Title", type: "string" },
    { name: "ctaSubtitle", label: "CTA Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "ctaCTA1Text", label: "CTA Button 1 Text", type: "string" },
    { name: "ctaCTA1Link", label: "CTA Button 1 Link", type: "string" },
    { name: "ctaCTA2Text", label: "CTA Button 2 Text", type: "string" },
    { name: "ctaCTA2Link", label: "CTA Button 2 Link", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true },
  ],
};

export const CurrentProjectsPageCollection: Collection = {
  name: "currentProjectsPage",
  label: "Current Projects Page",
  path: "src/content/page/current-projects",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/current-projects",
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "ctaTitle", label: "CTA Title", type: "string" },
    { name: "ctaSubtitle", label: "CTA Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "ctaButtonText", label: "CTA Button Text", type: "string" },
    { name: "ctaButtonLink", label: "CTA Button Link", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true },
  ],
};

export const PastProjectsPageCollection: Collection = {
  name: "pastProjectsPage",
  label: "Past Projects Page",
  path: "src/content/page/past-projects",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/past-projects",
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true },
  ],
};

export const EventsPageCollection: Collection = {
  name: "eventsPage",
  label: "Events Page",
  path: "src/content/page/events",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/events",
  },
  fields: [
    ...seoFields,
    ...heroFields,
    { name: "ctaTitle", label: "CTA Title", type: "string" },
    { name: "ctaSubtitle", label: "CTA Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "ctaButtonText", label: "CTA Button Text", type: "string" },
    { name: "ctaButtonLink", label: "CTA Button Link", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true },
  ],
};

export const AboutPageCollection: Collection = {
  name: "aboutPage",
  label: "About Us Page",
  path: "src/content/page/about",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/about",
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
          { value: "activity", label: "Activity (Development)" },
        ]},
        { name: "title", label: "Title", type: "string", required: true },
        { name: "description", label: "Description", type: "string", required: true, ui: { component: "textarea" } },
      ],
    },
    { name: "teamTitle", label: "Team Section Title", type: "string" },
    { name: "teamSubtitle", label: "Team Section Subtitle", type: "string", ui: { component: "textarea" } },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true },
  ],
};

export const ContactPageCollection: Collection = {
  name: "contactPage",
  label: "Contact Page",
  path: "src/content/page/contact",
  format: "mdx",
  ui: {
    allowedActions: { create: false, delete: false },
    router: () => "/contact",
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
        { name: "text", label: "Benefit", type: "string", required: true },
      ],
    },
    { name: "connectEmail", label: "Contact Email", type: "string" },
    { name: "connectTwitter", label: "Twitter Handle", type: "string" },
    { name: "body", label: "Additional Content", type: "rich-text", isBody: true },
  ],
};
