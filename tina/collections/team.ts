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
      label: "Role / Position",
      required: true,
      description: "e.g. Chair, Vice Chair, South London Representative",
    },
    {
      type: "string",
      name: "initials",
      label: "Initials",
      description: "1-2 characters shown when no photo (e.g. 'CP')",
    },
    {
      type: "string",
      name: "bio",
      label: "Bio",
      required: true,
      ui: {
        component: "textarea",
      },
    },
    {
      type: "image",
      name: "image",
      label: "Photo",
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
