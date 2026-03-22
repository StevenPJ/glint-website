import type { Collection } from "tinacms";

export const ProjectCollection: Collection = {
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
      required: true,
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
        { value: "upcoming", label: "Upcoming" },
      ],
    },
    {
      type: "string",
      name: "statusLabel",
      label: "Status Badge Label",
      description: "Text shown in the status badge (e.g. 'Data Analysis', 'Write-Up Phase')",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      required: true,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      name: "objectives",
      label: "Objectives",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.text || "New Objective",
        }),
      },
      fields: [
        {
          type: "string",
          name: "text",
          label: "Objective",
          required: true,
        },
      ],
    },
    {
      type: "string",
      name: "timeline",
      label: "Timeline",
      description: "e.g. '2025 - Ongoing'",
    },
    {
      type: "string",
      name: "network",
      label: "Network",
      description: "e.g. '10+ London centres'",
    },
    {
      type: "string",
      name: "milestone",
      label: "Milestone",
      description: "e.g. 'Presented at MESSE Conference, Berlin, October 2025'",
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Additional Content",
      isBody: true,
    },
  ],
};
