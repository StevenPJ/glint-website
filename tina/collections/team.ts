import type { Collection } from "tinacms";

export const TeamCollection: Collection = {
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
      required: true,
    },
    {
      type: "string",
      name: "role",
      label: "Role/Position",
      required: true,
      description: "e.g., Chair, Vice-Chair, Treasurer, Regional Representative",
    },
    {
      type: "string",
      name: "region",
      label: "Region",
      description: "e.g., North Central, South, etc.",
    },
    {
      type: "string",
      name: "memberType",
      label: "Member Type",
      required: true,
      options: [
        { value: "current", label: "Current Committee" },
        { value: "founding", label: "Founding Committee" },
        { value: "alumni", label: "Alumni" },
      ],
    },
    {
      type: "string",
      name: "interests",
      label: "Research Interests",
      description: "Brief description of research interests",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Bio",
      isBody: true,
    },
    {
      type: "image",
      name: "image",
      label: "Photo",
    },
    {
      type: "string",
      name: "email",
      label: "Email",
      description: "Optional contact email",
    },
    {
      type: "string",
      name: "twitter",
      label: "Twitter Handle",
      description: "Without the @ symbol",
    },
    {
      type: "number",
      name: "order",
      label: "Display Order",
      description: "Lower numbers appear first",
    },
  ],
};
