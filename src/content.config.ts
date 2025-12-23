import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Content collections that load from TinaCMS content directories
const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content/projects" }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['ongoing', 'completed', 'upcoming']),
    recruiting: z.boolean().optional(),
    shortDescription: z.string().optional(),
    collaborators: z.string().optional(),
    contact: z.string().optional(),
    contactEmail: z.string().optional(),
    image: z.string().optional(),
    publicationUrl: z.string().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    order: z.number().optional(),
  }),
});

// Publications and team collections - commented out until content directories exist
// const publications = defineCollection({
//   loader: glob({ pattern: "**/*.mdx", base: "./content/publications" }),
//   schema: z.object({
//     title: z.string(),
//     authors: z.string(),
//     journal: z.string(),
//     year: z.number(),
//     volume: z.string().optional(),
//     issue: z.string().optional(),
//     pages: z.string().optional(),
//     doi: z.string().optional(),
//     link: z.string().optional(),
//     pubType: z.enum(['journal', 'poster', 'abstract', 'other']).optional(),
//     order: z.number().optional(),
//   }),
// });

// const team = defineCollection({
//   loader: glob({ pattern: "**/*.mdx", base: "./content/team" }),
//   schema: z.object({
//     name: z.string(),
//     role: z.string(),
//     region: z.string().optional(),
//     memberType: z.enum(['current', 'founding', 'alumni']),
//     interests: z.string().optional(),
//     image: z.string().optional(),
//     email: z.string().optional(),
//     twitter: z.string().optional(),
//     order: z.number().optional(),
//   }),
// });

export const collections = { projects };
