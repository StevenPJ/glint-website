import type { Collection } from "tinacms";

export const PublicationCollection: Collection = {
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
      required: true,
    },
    {
      type: "string",
      name: "type",
      label: "Type",
      required: true,
      options: [
        { value: "publication", label: "Publication" },
        { value: "conference", label: "Conference Presentation" },
      ],
    },
    {
      type: "string",
      name: "authors",
      label: "Authors",
      description: "Full author string",
    },
    {
      type: "string",
      name: "journal",
      label: "Journal",
      description: "Journal name (for publications)",
    },
    {
      type: "string",
      name: "year",
      label: "Year",
    },
    {
      type: "string",
      name: "volume",
      label: "Volume",
      description: "e.g. '2(6):309-317'",
    },
    {
      type: "string",
      name: "doi",
      label: "DOI",
      description: "e.g. '10.1002/ygh2.427'",
    },
    {
      type: "string",
      name: "venue",
      label: "Venue",
      description: "Where the paper was presented (for conference presentations)",
    },
    {
      type: "string",
      name: "venueDate",
      label: "Venue Date",
      description: "When the paper was presented, e.g. 'October 2025'",
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
