import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return "/";
      }
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    // SEO Fields (shared)
    {
      name: "seoTitle",
      label: "SEO Title",
      type: "string",
      required: true,
      description: "Title shown in browser tab and search results",
    },
    {
      name: "seoDescription",
      label: "SEO Description",
      type: "string",
      description: "Description shown in search results",
    },

    // Hero Section (shared)
    {
      name: "heroTitle",
      label: "Hero Title",
      type: "string",
      description: "Main page heading (for About page)",
    },
    {
      name: "heroHighlight",
      label: "Hero Highlight Text",
      type: "string",
      description: "Text to highlight in gradient (e.g., 'Team')",
    },
    {
      name: "heroSubtitle",
      label: "Hero Subtitle",
      type: "string",
      description: "Subtitle text below the main heading",
    },

    // Home Page Hero Fields
    {
      name: "heroTitlePart1",
      label: "Hero Title Part 1",
      type: "string",
      description: "First part of home page title (e.g., 'The')",
    },
    {
      name: "heroHighlight1",
      label: "Hero Highlight 1",
      type: "string",
      description: "First gradient highlighted text (e.g., 'Pan-London')",
    },
    {
      name: "heroHighlight2",
      label: "Hero Highlight 2",
      type: "string",
      description: "Second gradient highlighted text (e.g., 'Gastroenterology')",
    },
    {
      name: "heroTitlePart2",
      label: "Hero Title Part 2",
      type: "string",
      description: "Last part of home page title (e.g., 'Research Group')",
    },
    {
      name: "heroCTA",
      label: "Hero CTA Button Text",
      type: "string",
    },
    {
      name: "heroCTALink",
      label: "Hero CTA Button Link",
      type: "string",
    },

    // Feature Cards (Home Page)
    {
      name: "featureCards",
      label: "Feature Cards",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || "New Feature Card",
        }),
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          required: true,
          ui: {
            component: "textarea",
          },
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
        {
          name: "linkText",
          label: "Link Text",
          type: "string",
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          options: [
            { value: "clipboard", label: "Clipboard (Projects)" },
            { value: "trending", label: "Trending Up (Growth)" },
            { value: "lightbulb", label: "Lightbulb (Ideas)" },
          ],
        },
      ],
    },

    // Updates/Dates Section (Home Page)
    {
      name: "datesSectionLabel",
      label: "Dates Section Label",
      type: "string",
    },
    {
      name: "datesSectionTitle",
      label: "Dates Section Title",
      type: "string",
    },
    {
      name: "datesSectionSubtitle",
      label: "Dates Section Subtitle",
      type: "string",
    },
    {
      name: "updates",
      label: "Updates/News Items",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || "New Update",
        }),
      },
      fields: [
        {
          name: "date",
          label: "Date/Label",
          type: "string",
          required: true,
        },
        {
          name: "badgeText",
          label: "Badge Text",
          type: "string",
        },
        {
          name: "badgeType",
          label: "Badge Type",
          type: "string",
          options: [
            { value: "primary", label: "Primary (Blue)" },
            { value: "secondary", label: "Secondary (Teal)" },
            { value: "warning", label: "Warning (Amber)" },
          ],
        },
        {
          name: "title",
          label: "Title",
          type: "string",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          required: true,
          ui: {
            component: "textarea",
          },
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          options: [
            { value: "calendar", label: "Calendar" },
            { value: "document", label: "Document" },
            { value: "bell", label: "Bell (Notifications)" },
          ],
        },
      ],
    },

    // About Section (Home Page)
    {
      name: "aboutSectionLabel",
      label: "About Section Label",
      type: "string",
    },
    {
      name: "aboutSectionTitle",
      label: "About Section Title",
      type: "string",
    },
    {
      name: "aboutDescription1",
      label: "About Description Paragraph 1",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      name: "aboutDescription2",
      label: "About Description Paragraph 2",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      name: "committeeSectionTitle",
      label: "Committee Section Title",
      type: "string",
    },

    // Contact Section (Home Page)
    {
      name: "contactSectionLabel",
      label: "Contact Section Label",
      type: "string",
    },
    {
      name: "contactSectionTitle",
      label: "Contact Section Title",
      type: "string",
    },
    {
      name: "contactSectionSubtitle",
      label: "Contact Section Subtitle",
      type: "string",
    },
    {
      name: "contactFormTitle",
      label: "Contact Form Title",
      type: "string",
    },
    {
      name: "contactFormSubtitle",
      label: "Contact Form Subtitle",
      type: "string",
    },
    {
      name: "mailingListTitle",
      label: "Mailing List Title",
      type: "string",
    },
    {
      name: "mailingListSubtitle",
      label: "Mailing List Subtitle",
      type: "string",
    },

    // About Page Fields
    {
      name: "missionTitle",
      label: "Mission Section Title",
      type: "string",
    },
    {
      name: "missionContent",
      label: "Mission Content",
      type: "string",
      ui: {
        component: "textarea",
      },
      description: "Main mission/about content paragraphs",
    },
    {
      name: "features",
      label: "Feature Cards (About Page)",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || "New Feature",
        }),
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "string",
          required: true,
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          options: [
            { value: "collaborate", label: "Collaborate (People)" },
            { value: "trainee", label: "Trainee (Person)" },
            { value: "career", label: "Career (Growth)" },
            { value: "patient", label: "Patient (Heart)" },
          ],
        },
      ],
    },
    {
      name: "teamSectionTitle",
      label: "Team Section Title",
      type: "string",
    },
    {
      name: "teamSectionSubtitle",
      label: "Team Section Subtitle",
      type: "string",
    },
    {
      name: "ctaText",
      label: "CTA Text",
      type: "string",
      description: "Text shown below the team grid",
    },
    {
      name: "ctaButtonText",
      label: "CTA Button Text",
      type: "string",
    },
    {
      name: "ctaButtonLink",
      label: "CTA Button Link",
      type: "string",
    },

    // Projects Page Fields
    {
      name: "currentProjectsLabel",
      label: "Current Projects Section Label",
      type: "string",
    },
    {
      name: "currentProjectsTitle",
      label: "Current Projects Section Title",
      type: "string",
    },
    {
      name: "pastProjectsLabel",
      label: "Past Projects Section Label",
      type: "string",
    },
    {
      name: "pastProjectsTitle",
      label: "Past Projects Section Title",
      type: "string",
    },
    {
      name: "pastProjectsSubtitle",
      label: "Past Projects Section Subtitle",
      type: "string",
    },
    {
      name: "projectsCTATitle",
      label: "Projects CTA Title",
      type: "string",
    },
    {
      name: "projectsCTADescription",
      label: "Projects CTA Description",
      type: "string",
      ui: {
        component: "textarea",
      },
    },
    {
      name: "projectsCTAButton1Text",
      label: "Projects CTA Button 1 Text",
      type: "string",
    },
    {
      name: "projectsCTAButton1Link",
      label: "Projects CTA Button 1 Link",
      type: "string",
    },
    {
      name: "projectsCTAButton2Text",
      label: "Projects CTA Button 2 Text",
      type: "string",
    },
    {
      name: "projectsCTAButton2Link",
      label: "Projects CTA Button 2 Link",
      type: "string",
    },

    // Body content
    {
      name: "body",
      label: "Additional Content",
      type: "rich-text",
      isBody: true,
    },
  ],
};
