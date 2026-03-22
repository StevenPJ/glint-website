import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") return "/";
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    // SEO (all pages)
    {
      name: "seoTitle",
      label: "SEO Title",
      type: "string",
      required: true,
    },
    {
      name: "seoDescription",
      label: "SEO Description",
      type: "string",
      ui: { component: "textarea" },
    },

    // Hero (all pages)
    {
      name: "heroTitle",
      label: "Hero Title",
      type: "string",
      required: true,
    },
    {
      name: "heroSubtitle",
      label: "Hero Subtitle",
      type: "string",
      ui: { component: "textarea" },
    },

    // Home page fields
    {
      name: "heroBadge",
      label: "Hero Badge Text",
      type: "string",
      description: "Text shown in the badge above the title (Home page only)",
    },
    {
      name: "heroCTA1Text",
      label: "Hero CTA 1 Text",
      type: "string",
      description: "e.g. 'Explore Our Research'",
    },
    {
      name: "heroCTA1Link",
      label: "Hero CTA 1 Link",
      type: "string",
    },
    {
      name: "heroCTA2Text",
      label: "Hero CTA 2 Text",
      type: "string",
      description: "e.g. 'Join Our Network'",
    },
    {
      name: "heroCTA2Link",
      label: "Hero CTA 2 Link",
      type: "string",
    },
    {
      name: "stats",
      label: "Stats",
      type: "object",
      list: true,
      description: "Home page stats bar",
      ui: {
        itemProps: (item) => ({ label: `${item?.value} ${item?.label}` || "New Stat" }),
      },
      fields: [
        { name: "value", label: "Value", type: "string", required: true },
        { name: "label", label: "Label", type: "string", required: true },
      ],
    },
    {
      name: "whatWeDoTitle",
      label: "What We Do Title",
      type: "string",
    },
    {
      name: "whatWeDoSubtitle",
      label: "What We Do Subtitle",
      type: "string",
      ui: { component: "textarea" },
    },
    {
      name: "whatWeDoCards",
      label: "What We Do Cards",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "New Card" }),
      },
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
    {
      name: "currentProjectsTitle",
      label: "Current Projects Section Title",
      type: "string",
    },
    {
      name: "currentProjectsSubtitle",
      label: "Current Projects Section Subtitle",
      type: "string",
    },

    // CTA section (Home, Current Projects, Events pages)
    {
      name: "ctaTitle",
      label: "CTA Section Title",
      type: "string",
    },
    {
      name: "ctaSubtitle",
      label: "CTA Section Subtitle",
      type: "string",
      ui: { component: "textarea" },
    },
    {
      name: "ctaCTA1Text",
      label: "CTA Button 1 Text",
      type: "string",
    },
    {
      name: "ctaCTA1Link",
      label: "CTA Button 1 Link",
      type: "string",
    },
    {
      name: "ctaCTA2Text",
      label: "CTA Button 2 Text",
      type: "string",
    },
    {
      name: "ctaCTA2Link",
      label: "CTA Button 2 Link",
      type: "string",
    },

    // About page fields
    {
      name: "missionTitle",
      label: "Mission Title",
      type: "string",
    },
    {
      name: "missionContent",
      label: "Mission Content",
      type: "string",
      ui: { component: "textarea" },
    },
    {
      name: "valuesTitle",
      label: "Values Section Title",
      type: "string",
    },
    {
      name: "values",
      label: "Values",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "New Value" }),
      },
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
    {
      name: "teamTitle",
      label: "Team Section Title",
      type: "string",
    },
    {
      name: "teamSubtitle",
      label: "Team Section Subtitle",
      type: "string",
      ui: { component: "textarea" },
    },

    // Contact page fields
    {
      name: "formTitle",
      label: "Form Title",
      type: "string",
    },
    {
      name: "formSubtitle",
      label: "Form Subtitle",
      type: "string",
      ui: { component: "textarea" },
    },
    {
      name: "sidebarTitle",
      label: "Sidebar Title",
      type: "string",
      description: "e.g. 'Why Join GLINT?'",
    },
    {
      name: "benefits",
      label: "Benefits",
      type: "object",
      list: true,
      description: "Why Join GLINT? items",
      ui: {
        itemProps: (item) => ({ label: item?.text || "New Benefit" }),
      },
      fields: [
        { name: "text", label: "Benefit", type: "string", required: true },
      ],
    },
    {
      name: "connectEmail",
      label: "Contact Email",
      type: "string",
    },
    {
      name: "connectTwitter",
      label: "Twitter Handle",
      type: "string",
      description: "e.g. '@GLINT_Research'",
    },

    // Body
    {
      name: "body",
      label: "Additional Content",
      type: "rich-text",
      isBody: true,
    },
  ],
};
