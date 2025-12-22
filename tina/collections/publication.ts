import type { Collection } from "tinacms";

export const PublicationCollection: Collection = {
  name: "publication",
  label: "Publications",
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
      name: "authors",
      label: "Authors",
      required: true,
      description: "Full author list as it appears in the publication",
    },
    {
      type: "string",
      name: "journal",
      label: "Journal/Publication",
      required: true,
    },
    {
      type: "number",
      name: "year",
      label: "Year",
      required: true,
    },
    {
      type: "string",
      name: "volume",
      label: "Volume",
    },
    {
      type: "string",
      name: "issue",
      label: "Issue",
    },
    {
      type: "string",
      name: "pages",
      label: "Pages",
    },
    {
      type: "string",
      name: "doi",
      label: "DOI",
    },
    {
      type: "string",
      name: "link",
      label: "External Link",
      description: "URL to the full paper",
    },
    {
      type: "string",
      name: "pubType",
      label: "Publication Type",
      options: [
        { value: "journal", label: "Journal Article" },
        { value: "poster", label: "Poster Presentation" },
        { value: "abstract", label: "Conference Abstract" },
        { value: "other", label: "Other" },
      ],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Abstract / Summary",
      isBody: true,
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first (leave empty to sort by year)",
    },
  ],
};
