import type { Collection } from "tinacms";

export const EventCollection: Collection = {
  name: "event",
  label: "Events",
  path: "content/events",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Event Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "string",
      name: "time",
      label: "Time",
      description: "e.g. 'TBC', '18:00-20:00'",
    },
    {
      type: "string",
      name: "location",
      label: "Location",
      description: "e.g. 'Central London'",
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      options: [
        { value: "coming-soon", label: "Coming Soon" },
        { value: "open", label: "Open" },
        { value: "sold-out", label: "Sold Out" },
      ],
    },
    {
      type: "boolean",
      name: "isFree",
      label: "Free Event",
      description: "Shows a 'Free' badge when enabled",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "url",
      label: "Registration URL",
      description: "External link for tickets or registration",
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
