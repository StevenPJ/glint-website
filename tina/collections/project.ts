import type { Collection } from "tinacms";

export const ProjectCollection: Collection = {
  name: "project",
  label: "Projects",
  path: "content/projects",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/projects/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      options: [
        { value: "ongoing", label: "Ongoing" },
        { value: "completed", label: "Completed" },
        { value: "upcoming", label: "Coming Soon" },
      ],
    },
    {
      type: "string",
      name: "shortDescription",
      label: "Short Description",
      description: "Brief summary for project cards (max 200 characters)",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "rich-text",
      name: "body",
      label: "Full Description",
      isBody: true,
    },
    {
      type: "string",
      name: "collaborators",
      label: "Collaborators",
      description: "Partner organizations or research groups",
    },
    {
      type: "string",
      name: "contact",
      label: "Contact Person",
      description: "Who to contact for more information",
    },
    {
      type: "string",
      name: "contactEmail",
      label: "Contact Email",
    },
    {
      type: "image",
      name: "image",
      label: "Featured Image",
    },
    {
      type: "datetime",
      name: "startDate",
      label: "Start Date",
    },
    {
      type: "datetime",
      name: "endDate",
      label: "End Date",
      description: "Leave empty for ongoing projects",
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first",
    },
  ],
};
