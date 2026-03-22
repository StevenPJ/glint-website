import { defineConfig } from "tinacms";
import { ProjectCollection } from "./collections/project";
import { TeamCollection } from "./collections/team";
import { EventCollection } from "./collections/event";
import { PublicationCollection } from "./collections/publication";
import { PageCollection } from "./collections/page";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      PageCollection,
      ProjectCollection,
      TeamCollection,
      EventCollection,
      PublicationCollection,
    ],
  },
});
