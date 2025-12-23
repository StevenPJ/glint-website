import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/${document._sys.filename}`;
    },
  },
  fields: [
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
    {
      name: "heroTitle",
      label: "Hero Title",
      type: "string",
      description: "Main page heading",
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
      label: "Feature Cards",
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
    {
      name: "body",
      label: "Additional Content",
      type: "rich-text",
      isBody: true,
    },
  ],
};
